'use client';

import React, { useState, useEffect } from 'react';
import Project from './Project';
import Button from './Button';
import defaultProjects from '@/data/projectsList.json';

export default function ProjectsSection() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects from API:', err);
      }
    }
    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      data-theme="light"
      className="w-full h-auto flex flex-col justify-start items-start bg-light text-dark relative z-20 pt-0 pb-8 md:pb-12 px-4"
    >
      {/* Outer row fit content */}
      <div className="w-full h-auto flex flex-col justify-start items-start -mx-4">
        {/* Dark Row Aligned to Top, 100vw wide, 50px high with rounded borders */}
        <div data-theme="dark" className="w-screen h-[50px] bg-dark rounded-b-3xl md:rounded-b-[40px]" />
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

      {/* Projects List Container - Full Width (Capped at 5) */}
      <div className="w-full flex flex-col pt-14 md:pt-20">
        {projects.slice(0, 5).map((item) => (
          <Project
            key={
              ('id' in item ? item.id : undefined) ||
              ('_id' in item ? String((item as { _id?: string })._id) : undefined) ||
              ('name' in item ? (item as { name?: string }).name : undefined)
            }
            project={item}
          />
        ))}
      </div>

      {/* See All Projects Button */}
      <div className="w-full flex justify-center items-center pt-10 sm:pt-14 pb-4 sm:pb-6">
        <Button
          text="SEE ALL PROJECTS"
          link="/work"
          size="lg"
          className="px-8 sm:px-10 h-[48px] sm:h-[54px] text-xl sm:text-2xl"
        />
      </div>
    </section>
  );
}
