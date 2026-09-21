'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Project from '@/components/Project';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import projectsData from '@/data/projectsList.json';

const METRICS = [
  { value: '50+', label: 'Projects Completed' },
  { value: '47+', label: 'Happy Clients' },
  { value: '100%', label: 'Success Rate' },
  { value: '25+', label: 'Team Members' },
];

const FILTER_CATEGORIES = [
  'All',
  'AI Projects',
  'Web Solutions',
  'Mobile Apps',
] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

function StaggeredWorkTitle({ mounted }: { mounted: boolean }) {
  const text = 'WORK';
  return (
    <h1 className="font-bebas text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[170px] leading-[0.80] tracking-tight uppercase text-dark select-none inline-flex overflow-hidden py-1">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[0.85em] leading-none"
        >
          <span
            className={`block transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: `${150 + index * 45}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </h1>
  );
}

function StaggeredWorkTagline({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#555555] font-semibold leading-relaxed flex flex-wrap gap-x-[0.25em] gap-y-0 text-left">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-0.5 -my-0.5 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 8;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-500 ease-out transform-gpu ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{ transitionDelay: `${350 + charDelay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

function CountUpMetric({
  value,
  mounted,
  delay = 500,
}: {
  value: string;
  mounted: boolean;
  delay?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!mounted) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1600;

    const timer = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Smooth cubic ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOut * target);

        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, target, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function WorkPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [projects, setProjects] = useState(projectsData);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setMounted(true);

    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects from backend:', err);
      }
    }

    loadProjects();
  }, []);

  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const filteredProjects = projects.filter((item) => {
    if (activeFilter === 'All') return true;
    const tagLower = (item.tag || '').toLowerCase();
    const titleLower = (('title' in item ? item.title : '') || ('name' in item ? (item as { name?: string }).name : '') || '').toLowerCase();

    if (activeFilter === 'AI Projects') {
      return (
        tagLower.includes('ai') ||
        tagLower.includes('automation') ||
        tagLower.includes('intelligence') ||
        tagLower.includes('ml') ||
        titleLower.includes('ai')
      );
    }
    if (activeFilter === 'Web Solutions') {
      return (
        tagLower.includes('web') ||
        tagLower.includes('saas') ||
        tagLower.includes('enterprise') ||
        tagLower.includes('fintech')
      );
    }
    if (activeFilter === 'Mobile Apps') {
      return (
        tagLower.includes('mobile') ||
        tagLower.includes('ios') ||
        tagLower.includes('android') ||
        tagLower.includes('react native') ||
        tagLower.includes('flutter') ||
        (/\bmobile\b/i.test(tagLower)) ||
        (/\b(app|apps)\b/i.test(tagLower) && !tagLower.includes('web'))
      );
    }
    return true;
  });

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Work Section Container */}
      <section
        id="work-page"
        data-theme="light"
        className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4"
      >
        {/* Header: WORK on the left, description next to it */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 max-w-7xl">
          {/* Left: WORK Title with Staggered Kinetic Character Animation */}
          <div>
            <StaggeredWorkTitle mounted={mounted} />
          </div>

          {/* Right: Description next to it with Kinetic Staggered Reveal */}
          <div className="max-w-md lg:max-w-lg pt-0.5 md:pt-0.5 lg:pt-1">
            <StaggeredWorkTagline
              text="Explore our latest work building high-performance AI web applications, mobile platforms, and enterprise software."
              mounted={mounted}
            />
          </div>
        </div>

        {/* Key Metrics Grid (25% width per metric on desktop, horizontally centered, Count Up) */}
        <div
          className={`w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 py-10 sm:py-12 md:py-14 border-y border-dark/15 my-10 sm:my-14 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="w-full flex flex-col items-center text-center justify-center"
            >
              <span className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-dark leading-none select-none tabular-nums">
                <CountUpMetric
                  value={metric.value}
                  mounted={mounted}
                  delay={550 + idx * 100}
                />
              </span>
              <span className="font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666] mt-2 sm:mt-3 text-center">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Category Filters with Staggered Fade Entrance */}
        <div
          className={`w-full flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2 pb-4 sm:pb-6 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          {FILTER_CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleFilterChange(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-dark text-light border border-dark shadow-sm'
                    : 'bg-transparent text-[#555555] hover:text-dark hover:bg-dark/5 border border-dark/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects List Under It - Full Width with Smooth Reveal */}
        <div
          className={`w-full flex flex-col pt-4 sm:pt-6 md:pt-8 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {paginatedProjects.map((item) => (
            <Project
              key={
                ('id' in item ? item.id : undefined) ||
                ('_id' in item ? String((item as { _id?: string })._id) : undefined) ||
                ('name' in item ? (item as { name?: string }).name : undefined)
              }
              project={item}
            />
          ))}
          {paginatedProjects.length === 0 && (
            <div className="w-full py-16 text-center text-[#777777] font-jakarta font-medium text-base sm:text-lg">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 sm:pt-14 border-t border-dark/10 mt-8 sm:mt-10 transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {/* Showing Count */}
            <span className="font-ibm-mono text-xs sm:text-sm uppercase text-[#666666] font-medium tracking-wider">
              SHOWING {startIndex + 1}–{Math.min(endIndex, totalItems)} OF {totalItems} PROJECTS
            </span>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  document.getElementById('work-page')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-dark/20 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-dark hover:enabled:text-light cursor-pointer"
              >
                PREVIOUS
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                  document.getElementById('work-page')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-dark/20 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-dark hover:enabled:text-light cursor-pointer"
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
