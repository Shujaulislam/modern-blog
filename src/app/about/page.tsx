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
  IconBrandMongodb
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

  const projects = [
    {
      title: "Web Development",
      description: "Creating responsive, modern web applications with Next.js and React",
      link: "#",
    },
    {
      title: "Technical Writing",
      description: "Sharing in-depth tutorials and development experiences",
      link: "#",
    },
    {
      title: "Open Source",
      description: "Contributing to and maintaining open source projects",
      link: "#",
    },
    {
      title: "Community Building",
      description: "Fostering a community of developers and learners",
      link: "#",
    },
  ];

  const techStackData = [
    {
      category: "Building Modern UIs",
      description: "Creating responsive and interactive user interfaces",
      icon: <IconDeviceDesktop className="w-6 h-6" />,
      items: [
        {
          name: "React & Next.js",
          description: "Building performant web applications with modern React patterns and Next.js features",
          icon: <IconBrandReact className="w-8 h-8" />,
          tools: ["React.js", "Next.js", "Hooks", "Server Components"]
        },
        {
          name: "UI Libraries",
          description: "Crafting beautiful interfaces with modern CSS frameworks and UI libraries",
          icon: <IconBrandTailwind className="w-8 h-8" />,
          tools: ["Tailwind CSS", "Mantine", "Material UI", "Framer Motion"]
        },
        {
          name: "Core Web Technologies",
          description: "Strong foundation in web development fundamentals",
          icon: <IconBrandHtml5 className="w-8 h-8" />,
          tools: ["HTML5", "CSS3", "JavaScript", "TypeScript"]
        },
      ]
    },
    {
      category: "Development Workflow",
      description: "Efficient development practices and tools",
      icon: <IconTools className="w-6 h-6" />,
      items: [
        {
          name: "Version Control",
          description: "Managing code and collaborating using Git and GitHub",
          icon: <IconBrandGithub className="w-8 h-8" />,
          tools: ["Git", "GitHub", "Version Control", "Collaboration"]
        },
        {
          name: "Development Tools",
          description: "Using modern development tools for efficient workflow",
          icon: <IconBrandVscode className="w-8 h-8" />,
          tools: ["VS Code", "DevTools", "Postman", "Terminal"]
        },
        {
          name: "API Integration",
          description: "Working with RESTful APIs and data fetching",
          icon: <IconApi className="w-8 h-8" />,
          tools: ["REST APIs", "Axios", "Data Fetching", "Integration"]
        },
      ]
    },
    {
      category: "Core Technologies",
      description: "Programming languages and development standards",
      icon: <IconCode className="w-6 h-6" />,
      items: [
        {
          name: "Languages",
          description: "Proficient in multiple programming languages",
          icon: <IconBrandCpp className="w-8 h-8" />,
          tools: ["JavaScript", "TypeScript", "C++", "HTML/CSS"]
        },
        {
          name: "Best Practices",
          description: "Following development standards and best practices",
          icon: <IconRocket className="w-8 h-8" />,
          tools: ["Clean Code", "Performance", "Accessibility", "SEO"]
        },
        {
          name: "Development Standards",
          description: "Modern development principles and patterns",
          icon: <IconBrain className="w-8 h-8" />,
          tools: ["Component Patterns", "State Management", "Code Organization"]
        },
      ]
    },
  ];

  const techCategories = [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces",
      technologies: [
        {
          name: "React",
          icon: <IconBrandReact className="w-8 h-8" />,
        },
        {
          name: "Next.js",
          icon: <IconBrandNextjs className="w-8 h-8" />,
        },
        {
          name: "Tailwind CSS",
          icon: <IconBrandTailwind className="w-8 h-8" />,
        },
      ],
    },
    {
      title: "Backend Development",
      description: "Building robust and scalable server-side applications",
      technologies: [
        {
          name: "Node.js",
          icon: <IconCode className="w-8 h-8" />,
        },
        {
          name: "Express.js",
          icon: <IconApi className="w-8 h-8" />,
        },
        {
          name: "MongoDB",
          icon: <IconBrandMongodb className="w-8 h-8" />,
        },
      ],
    },
    {
      title: "DevOps",
      description: "Ensuring efficient development and deployment processes",
      technologies: [
        {
          name: "Git",
          icon: <IconBrandGit className="w-8 h-8" />,
        },
        {
          name: "GitHub",
          icon: <IconBrandGithub className="w-8 h-8" />,
        },
        {
          name: "VS Code",
          icon: <IconBrandVscode className="w-8 h-8" />,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              <TextGenerateEffect words={words} />
            </h1>
            <p className="mt-4 font-normal text-lg text-neutral-300 max-w-lg mx-auto">
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
                        <p className="text-sm text-neutral-500">{item.header}</p>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-200 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400">{item.description}</p>
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
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
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

      {/* Tech Stack Section - Approach 1: CardGlow */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Tech Stack - Clean & Modern
          </h2>

          <div className="space-y-20">
            {techStackData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-neutral-400">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-200 text-center">
                    {category.category}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <CardGlow key={itemIndex}>
                      <div className="p-6 h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-neutral-400 group-hover:text-sky-400 transition-colors duration-300">
                            {item.icon}
                          </div>
                          <h4 className="text-xl font-medium text-neutral-200">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tools.map((tool, toolIndex) => (
                            <span
                              key={toolIndex}
                              className="text-sm px-2 py-1 rounded-md bg-neutral-900 text-neutral-400"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardGlow>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Approach 2: 3D Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-white">Tech Stack</h2>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Technologies and tools I work with
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <CardContainer key={index} className="w-full">
              <CardBody className="bg-zinc-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {category.title}
                </CardItem>
                <CardItem
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {category.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 dark:bg-neutral-900 rounded-lg text-sm text-white"
                      >
                        {tech.icon}
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Tech Stack Section - Approach 3: Masonry Grid */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Tech Stack - Masonry Layout
          </h2>

          {techStackData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="flex items-center gap-4 justify-center mb-12">
                <div className="text-neutral-400">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-neutral-200 text-center">
                  {category.category}
                </h3>
              </div>
              <MasonryGrid>
                {category.items.map((item, itemIndex) => (
                  <MasonryItem key={itemIndex} index={itemIndex}>
                    <CardGlow>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-neutral-400 group-hover:text-sky-400 transition-colors duration-300">
                            {item.icon}
                          </div>
                          <h4 className="text-xl font-medium text-neutral-200">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tools.map((tool, toolIndex) => (
                            <span
                              key={toolIndex}
                              className="text-sm px-2 py-1 rounded-md bg-neutral-900 text-neutral-400"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardGlow>
                  </MasonryItem>
                ))}
              </MasonryGrid>
            </div>
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
