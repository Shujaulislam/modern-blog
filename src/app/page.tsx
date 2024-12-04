"use client";

import React from 'react';
import Link from 'next/link';
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/moving-border";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from '@/components/ui/text-reveal-card';



const HomePage = () => {
  const words = "Welcome to my blog";
  const description = "Exploring technology, development, and digital innovation through insightful articles and tutorials.";

  const testimonials = [
    {
      quote: "Exploring the frontiers of web development, from responsive design to serverless architecture. Join me in building the future of the web.",
      name: "Web Development",
      title: "Frontend & Backend",
    },
    {
      quote: "Diving deep into artificial intelligence and machine learning algorithms. Discover how AI is reshaping our digital landscape.",
      name: "AI & Machine Learning",
      title: "Future Tech",
    },
    {
      quote: "Creating seamless mobile experiences across iOS and Android. Learn about native development and cross-platform solutions.",
      name: "Mobile Development",
      title: "iOS & Android",
    },
    {
      quote: "Mastering cloud infrastructure and DevOps practices. Scale your applications with modern cloud architecture.",
      name: "Cloud Computing",
      title: "DevOps & Infrastructure",
    },
  ];


  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <h1 className="relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight font-bold text-4xl sm:text-7xl">
            <TextGenerateEffect words={words} />
          </h1>
          
          <p className="mt-4 font-normal text-lg text-neutral-300 max-w-lg mx-auto">
            {description}
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/blog">
              <Button
                borderRadius="2.75rem"
                className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                containerClassName="p-[1px]"
                borderClassName="h-28 w-28 bg-[radial-gradient(var(--tw-gradient-stops))] from-neutral-100 via-neutral-900 to-black dark:bg-[radial-gradient(var(147,255,255,0.1)_20%,transparent_10%)]"
              >
                Start Reading
              </Button>
            </Link>
          </div>
        </div>

        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </section>

      {/* About Preview Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center bg-black antialiased">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-8">
            Discover Tech Topics
          </h2>
          <div className="h-[40rem] w-full flex flex-col antialiased items-center justify-center overflow-hidden rounded-md">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
              pauseOnHover={true}
            />
          </div>
        </div>
        <BackgroundBeams className="opacity-55" />
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* <BackgroundGradient
          containerClassName="w-full h-full rounded-3xl"
          animate={true}></BackgroundGradient> */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Let's Connect
            </h2>
            <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
              Have a project in mind or just want to chat about technology?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Contact Info Card */}
            <div className="relative w-full h-full min-h-[400px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-3xl border border-[#2A2A2A] bg-black p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="relative z-20">
                  <TextRevealCard
                    text="Get in Touch"
                    revealText="Contact Me"
                    className="w-full h-full"
                  >
                    <TextRevealCardTitle className="text-3xl">Let's Build Something Amazing</TextRevealCardTitle>
                    <TextRevealCardDescription className="text-xl mt-8">
                      Whether you have a question, project idea, or just want to say hello,
                      I'm always excited to connect with fellow tech enthusiasts.
                    </TextRevealCardDescription>
                    <div className="mt-8">
                      <Button
                        borderRadius="2.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                        containerClassName="p-[1px]"
                        borderClassName="h-28 w-28 bg-[radial-gradient(var(--tw-gradient-stops)_20%,transparent_10%)] from-emerald-500 via-blue-500 to-purple-500 dark:bg-[radial-gradient(var(147,255,255,0.1)_20%,transparent_10%)]"
                      >
                        Contact Me
                      </Button>
                    </div>
                  </TextRevealCard>
                </div>
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="relative w-full h-full min-h-[400px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-3xl border border-[#2A2A2A] bg-black p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="relative z-20">
                  <TextRevealCard
                    text="Stay Updated"
                    revealText="Subscribe"
                    className="w-full h-full"
                  >
                    <TextRevealCardTitle className="text-3xl">Join the Newsletter</TextRevealCardTitle>
                    <TextRevealCardDescription className="text-xl mt-8">
                      Get the latest tech insights, tutorials, and updates delivered straight to your inbox.
                      No spam, unsubscribe anytime.
                    </TextRevealCardDescription>

                    <div className="mt-8">
                      <Button
                        borderRadius="2.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                        containerClassName="p-[1px]"
                        borderClassName="h-28 w-28 bg-[radial-gradient(var(--tw-gradient-stops)_20%,transparent_10%)] from-emerald-500 via-blue-500 to-purple-500 dark:bg-[radial-gradient(var(147,255,255,0.1)_20%,transparent_10%)]"
                      >
                        Subscribe Now
                      </Button>
                    </div>
                  </TextRevealCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
