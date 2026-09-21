'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

interface CaseStudyCardItem {
  id: string;
  slug?: string;
  _id?: string;
  title: string;
  cardTitle?: string;
  client: string;
  category: string;
  timeline?: string;
  tagline?: string;
  summary?: string;
  shortDescription?: string;
  tags: string[];
  deliverables?: string[];
  results: { value: string; label: string }[];
  link?: string;
  markdown?: string;
}

function StaggeredCaseStudiesTitle({ mounted }: { mounted: boolean }) {
  const text = 'CASE STUDIES';
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px] leading-[0.85] tracking-tight uppercase text-dark select-none flex flex-wrap gap-x-[0.25em] gap-y-0 text-left">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-1 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 22;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-700 ease-out transform-gpu ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionDelay: `${150 + charDelay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function StaggeredCaseStudiesTagline({
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

export default function CaseStudiesPage() {
  const [mounted, setMounted] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudyCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setMounted(true);
    async function loadCaseStudies() {
      try {
        setLoading(true);
        const res = await fetch('/api/case-studies');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const mapped: CaseStudyCardItem[] = data.data.map((item: {
            _id?: string;
            slug?: string;
            id?: string;
            title: string;
            cardTitle?: string;
            client: string;
            category: string;
            duration?: string;
            timeline?: string;
            shortDescription?: string;
            summary?: string;
            tagline?: string;
            tags?: string[];
            deliverables?: string[];
            metrics?: { value: string; label: string }[];
            results?: { value: string; label: string }[];
            link?: string;
            markdown?: string;
          }) => ({
            id: item.slug || item._id || item.id || '',
            slug: item.slug || item._id,
            _id: item._id,
            title: item.title,
            cardTitle: item.cardTitle || item.title,
            client: item.client,
            category: item.category,
            timeline: item.duration || item.timeline || '8 Weeks',
            summary: item.shortDescription || item.summary || '',
            tagline: item.shortDescription || item.tagline || '',
            tags: item.tags || [],
            deliverables: item.deliverables || [],
            results: item.metrics && item.metrics.length > 0 ? item.metrics : item.results || [],
            link: item.link || '#',
            markdown: item.markdown || '',
          }));
          setCaseStudies(mapped);
        } else {
          setCaseStudies([]);
        }
      } catch (err) {
        console.error('Failed to load case studies from API:', err);
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudies();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      if (cs.category) set.add(cs.category);
    });
    return ['All', ...Array.from(set)];
  }, [caseStudies]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const filteredCaseStudies = caseStudies.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const totalItems = filteredCaseStudies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCaseStudies = filteredCaseStudies.slice(startIndex, endIndex);

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Main Header & Grid Section */}
      <section
        id="case-studies-page"
        data-theme="light"
        className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4"
      >
        {/* Header: Title on the left, description on the right */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 max-w-7xl">
          <div className="flex flex-col items-start max-w-2xl">
            <StaggeredCaseStudiesTitle mounted={mounted} />
          </div>

          <div className="max-w-md lg:max-w-lg pt-0.5 md:pt-0.5 lg:pt-1 text-left">
            <StaggeredCaseStudiesTagline
              text="In-depth breakdowns of how we architect, build, and deploy production-grade AI systems, intelligent workflows, and high-impact digital platforms."
              mounted={mounted}
            />
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div
          className={`w-full flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-12 sm:pt-16 pb-6 sm:pb-8 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          {categories.map((category) => {
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

        {/* Case Studies Grid */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 pt-4 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {paginatedCaseStudies.map((study) => (
            <Link
              key={study.id || study._id}
              href={`/case-studies/${study.slug || study.id || study._id}`}
              data-cursor-text="READ STUDY"
              className="group w-full h-full flex flex-col justify-between bg-dark/[0.02] border border-dark/10 rounded-2xl p-5 sm:p-6 text-left hover:border-dark/25 transition-colors duration-300 cursor-pointer block"
            >
              {/* Top Details */}
              <div className="flex flex-col space-y-3.5 sm:space-y-4">
                {/* Title & Client */}
                <div>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-dark tracking-wide uppercase leading-tight line-clamp-1">
                    {study.cardTitle || study.title}
                  </h2>
                  <span className="font-ibm-mono text-[11px] uppercase text-[#666666] font-medium tracking-wider mt-0.5 block truncate">
                    {study.client}
                  </span>
                </div>

                {/* Description */}
                <p className="font-jakarta text-xs sm:text-sm text-[#555555] font-medium leading-relaxed line-clamp-3">
                  {study.summary}
                </p>

                {/* Key Metrics Row (2 Max) */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-dark/10 my-0.5">
                  {study.results.slice(0, 2).map((res, rIdx) => (
                    <div key={rIdx} className="flex flex-col items-start">
                      <span className="font-bebas text-xl sm:text-2xl text-dark leading-none">
                        {res.value}
                      </span>
                      <span className="font-ibm-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#666666] font-semibold mt-1">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags - Vertically Centered in Row with Equal Spacing */}
              <div className="flex-1 flex items-center pt-4 sm:pt-5">
                <div className="flex flex-wrap items-center gap-1.5 w-full">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-ibm-mono text-[10px] font-medium text-dark/70 bg-light border border-dark/15 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
          {paginatedCaseStudies.length === 0 && (
            <div className="col-span-full py-20 text-center text-[#777777] font-jakarta font-medium text-base sm:text-lg">
              {loading ? 'Loading case studies...' : 'No case studies found.'}
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
              SHOWING {startIndex + 1}–{Math.min(endIndex, totalItems)} OF {totalItems} CASE STUDIES
            </span>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  document.getElementById('case-studies-page')?.scrollIntoView({ behavior: 'smooth' });
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
                  document.getElementById('case-studies-page')?.scrollIntoView({ behavior: 'smooth' });
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
