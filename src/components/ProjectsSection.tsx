import React from 'react';
import Project from './Project';
import projectsData from '@/data/projectsList.json';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      data-theme="light"
      className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark relative z-20 pt-0 pb-24 px-4"
    >
      {/* Outer row fit content */}
      <div className="w-full h-auto flex flex-col justify-start items-start -mx-4">
        {/* Dark Row Aligned to Top, 100vw wide, 50px high with rounded borders */}
        <div className="w-screen h-[50px] bg-dark rounded-b-3xl md:rounded-b-[40px]" />
      </div>

      <div className="w-full text-left flex flex-col gap-6 max-w-5xl pt-12 md:pt-16">
        <h2 className="font-bebas text-6xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-wide uppercase text-dark">
          PROJECTS
        </h2>

        <div className="flex flex-col gap-5 max-w-xl pt-8 md:pt-14">
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#555555] font-semibold leading-relaxed">
            Explore our latest work building high-performance AI web applications, mobile platforms, and enterprise software.
          </p>
        </div>
      </div>

      {/* Projects List Container - Full Width */}
      <div className="w-full flex flex-col pt-14 md:pt-20">
        {projectsData.map((item) => (
          <Project key={item.id} project={item} />
        ))}
      </div>
    </section>
  );
}
