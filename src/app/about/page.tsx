"use client";

import React from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TracingBeam } from '@/components/ui/tracing-beam';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CardGlow } from "@/components/ui/card-glow";
import { Timeline } from "@/components/ui/timeline";
import { MasonryGrid, MasonryItem } from "@/components/ui/masonry-grid";
import { cn } from "@/lib/utils";
import { 
  IconBrain, 
  IconCode, 
  IconDatabase, 
  IconPalette,
  IconSchool,
  IconBriefcase,
  IconRocket,
  IconTrophy,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFramer,
  IconBrandGit,
  IconTools,
  IconDeviceDesktop,
  IconBrandVscode,
  IconApi,
  IconDeviceLaptop,
  IconBrandCpp,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandMantine,
  IconBrandRadixUi,
  IconBrandReact,
  IconBrandGithub,
  IconBrandMongodb,
  IconBrandJavascript,
  IconBrandNodejs,
  IconServer,
  IconBrandRedux,
  IconBrandFigma,
  IconBrandDocker
} from "@tabler/icons-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const AboutPage = () => {
  const words = "Crafting Digital Experiences & Sharing Knowledge";
  const description = "Passionate about web development, technology, and creating content that helps others learn and grow.";
  

  const bentoItems = [
    {
      title: "Tech Enthusiast",
      description: "Passionate about modern web technologies and innovative solutions",
      header: "Main Focus",
      className: "md:col-span-2",
      icon: <IconCode className="h-8 w-8 text-neutral-500" />,
    },
    {
      title: "Creative Development",
      description: "Bringing ideas to life with clean, efficient code",
      header: "Approach",
      icon: <IconPalette className="h-8 w-8 text-neutral-500" />,
    },
    {
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices",
      header: "Philosophy",
      icon: <IconBrain className="h-8 w-8 text-neutral-500" />,
    },
    {
      title: "Full Stack Focus",
      description: "From frontend finesse to backend robustness",
      header: "Expertise",
      className: "md:col-span-2",
      icon: <IconDatabase className="h-8 w-8 text-neutral-500" />,
    },
  ];

  const journey = [
    {
      year: "2020",
      title: "Started Coding Journey",
      description: "Discovered my passion for web development and began learning the fundamentals of HTML, CSS, and JavaScript.",
      icon: <IconSchool className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "First Professional Project",
      description: "Completed my first professional web development project using React and Node.js.",
      icon: <IconBriefcase className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "Expanded Tech Stack",
      description: "Mastered Next.js, TypeScript, and modern web development practices. Started contributing to open source.",
      icon: <IconRocket className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "Advanced Projects",
      description: "Led development of complex web applications. Focused on performance optimization and scalability.",
      icon: <IconTrophy className="w-6 h-6" />
    }
  ];


  // const projects = [
  //   {
  //     title: "Web Development",
  //     description: "Creating responsive, modern web applications with Next.js and React",
  //     link: "#",
  //   },
  //   {
  //     title: "Technical Writing",
  //     description: "Sharing in-depth tutorials and development experiences",
  //     link: "#",
  //   },
  //   {
  //     title: "Open Source",
  //     description: "Contributing to and maintaining open source projects",
  //     link: "#",
  //   },
  //   {
  //     title: "Community Building",
  //     description: "Fostering a community of developers and learners",
  //     link: "#",
  //   },
  // ];

  const techCategories = [
    {
      title: "Languages",
      description: "Core programming languages I work with",
      items: [
        { name: "JavaScript", icon: <IconBrandJavascript className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <IconBrandTypescript className="text-[#3178C6]" /> },
        { name: "HTML5", icon: <IconBrandHtml5 className="text-[#E34F26]" /> },
        { name: "CSS3", icon: <IconBrandCss3 className="text-[#1572B6]" /> },
        { name: "C++", icon: <IconBrandCpp className="text-[#00599C]" /> }
      ]
    },
    {
      title: "Frameworks",
      description: "Modern frameworks for building scalable applications",
      items: [
        { name: "React", icon: <IconBrandReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <IconBrandNextjs className="text-neutral-800 dark:text-white" /> },
        { name: "Node.js", icon: <IconBrandNodejs className="text-[#339933]" /> },
        { name: "Express", icon: <IconServer className="text-neutral-800 dark:text-white" /> },
        { name: "Prisma", icon: <IconDatabase className="text-[#2D3748]" /> }
      ]
    },
    {
      title: "Libraries",
      description: "Essential libraries and UI components",
      items: [
        { name: "Tailwind CSS", icon: <IconBrandTailwind className="text-[#06B6D4]" /> },
        { name: "Framer Motion", icon: <IconBrandFramer className="text-[#0055FF]" /> },
        { name: "Redux", icon: <IconBrandRedux className="text-[#764ABC]" /> },
        { name: "React Query", icon: <IconApi className="text-[#FF4154]" /> },
        { name: "Zustand", icon: <IconBrain className="text-[#FFB800]" /> }
      ]
    },
    {
      title: "Tools",
      description: "Development and productivity tools",
      items: [
        { name: "Git", icon: <IconBrandGit className="text-[#F05032]" /> },
        { name: "VS Code", icon: <IconBrandVscode className="text-[#007ACC]" /> },
        { name: "Figma", icon: <IconBrandFigma className="text-[#F24E1E]" /> },
        { name: "Docker", icon: <IconBrandDocker className="text-[#2496ED]" /> },
        { name: "Postman", icon: <IconApi className="text-[#FF6C37]" /> }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
              <TextGenerateEffect words={words} />
            </h1>
            <p className="mt-4 font-normal text-lg text-neutral-700 dark:text-neutral-300 max-w-lg mx-auto">
              {description}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 relative">
            {bentoItems.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "group relative col-span-1",
                  item.className
                )}
              >
                <CardGlow>
                  <div className="flex flex-col justify-between min-h-[200px]">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <p className="text-sm text-neutral-600 dark:text-neutral-500">{item.header}</p>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                </CardGlow>
              </div>
            ))}
          </div>
        </div>
        <BackgroundBeams className="opacity-55" />
      </section>

      {/* Journey Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <TracingBeam >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent 
          bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
            My Journey
          </h2>

          {/* <TracingBeam className="px-6"> */}
            <div className="max-w-2xl mx-auto">
              <Timeline items={journey} />
            </div>
          {/* </TracingBeam> */}
          </TracingBeam>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
            Tech Stack
          </h2>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Technologies and tools I work with
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <CardContainer key={index} className="w-full">
              <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
                >
                  {category.title}
                </CardItem>
                <CardItem
                  translateZ="60"
                  className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm mt-2"
                >
                  {category.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex flex-col items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <div className="w-8 h-8 mb-2">
                          {item.icon}
                        </div>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300 text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="px-4 py-20 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            What I Do
          </h2>

          <HoverEffect items={projects} />
        </div>
      </section> */}
    </main>
  );
};

export default AboutPage;
