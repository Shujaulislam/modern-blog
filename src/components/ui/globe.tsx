"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// Only extend ThreeGlobe on client side
if (typeof window !== 'undefined') {
  extend({ ThreeGlobe });
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = {
  globeConfig: GlobeConfig;
  data: Position[];
};

let numbersOfRings = [0];

const Globe = ({ globeConfig, data }: WorldProps) => {
  const { camera, gl, scene } = useThree();
  const globeRef = useRef<ThreeGlobe>();
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;
    
    // Configure globe
    globe
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .arcColor("color")
      .arcDashLength(globeConfig.arcLength || 0.9)
      .arcDashGap(2)
      .arcDashInitialGap(1)
      .arcDashAnimateTime(globeConfig.arcTime || 1000)
      .arcsData(data)
      .arcStroke(0.5);

    // Set camera position
    camera.position.z = cameraZ;

    // Add fog
    scene.fog = new Fog(0x000000, 400, 2000);

    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      points.push({
        size: globeConfig.pointSize || 1,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: globeConfig.pointSize || 1,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );

    setGlobeData(filteredPoints);
  }, [camera, gl, globeConfig, data]);

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude)
      .hexPolygonColor((e) => {
        return globeConfig.polygonColor;
      });

    globeRef.current
      .pointsData(globeData)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringMaxRadius(globeConfig.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (globeConfig.arcTime * globeConfig.arcLength) / globeConfig.rings
      );
  }, [globeRef, globeData, globeConfig]);

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return;
      numbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      );

      globeRef.current.ringsData(
        globeData.filter((d, i) => numbersOfRings.includes(i))
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [globeRef, globeData]);

  return (
    <threeGlobe
      ref={globeRef}
      scale={1}
      position={[0, 0, 0]}
    />
  );
};

export const World = ({ globeConfig, data }: WorldProps) => {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} color={globeConfig.ambientLight} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} color={globeConfig.directionalLeftLight} />
          <directionalLight position={[-10, 10, 5]} intensity={0.5} color={globeConfig.directionalTopLight} />
          <pointLight position={[-10, 10, 5]} intensity={0.8} color={globeConfig.pointLight} />
          <Globe globeConfig={globeConfig} data={data} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={globeConfig.autoRotate}
            autoRotateSpeed={globeConfig.autoRotateSpeed || 0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
