'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

function CountUpMetric({
  value,
  mounted,
  delay = 500,
}: {
  value: string;
  mounted: boolean;
  delay?: number;
}) {
  const match = value.match(/^([^0-9.]*)(\d+(?:,\d+)*(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : '';
  const numStr = match ? match[2].replace(/,/g, '') : '';
  const suffix = match ? match[3] : '';
  const hasDecimals = numStr.includes('.');
  const decimalPlaces = hasDecimals ? numStr.split('.')[1].length : 0;
  const target = parseFloat(numStr) || 0;
  const hasComma = match ? match[2].includes(',') : false;

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
        const currentVal = easeOut * target;

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

  const displayNum = hasDecimals
    ? count.toFixed(decimalPlaces)
    : Math.round(count);

  const formattedNum = hasComma
    ? Number(displayNum).toLocaleString()
    : displayNum;

  return (
    <span>
      {prefix}
      {formattedNum}
      {suffix}
    </span>
  );
}

interface CaseStudyDetailData {
  title: string;
  client: string;
  category: string;
  timeline?: string;
  tagline?: string;
  results: { value: string; label: string }[];
  deliverables?: string[];
  tags: string[];
  link?: string;
  markdown: string;
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = use(params);
  const [mounted, setMounted] = useState(false);
  const [study, setStudy] = useState<CaseStudyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function loadDetail() {
      try {
        setLoading(true);
        const res = await fetch(`/api/case-studies/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setStudy({
            title: d.title,
            client: d.client,
            category: d.category,
            timeline: d.duration || d.timeline || '8 Weeks',
            tagline: d.shortDescription || d.tagline || '',
            results:
              d.metrics && d.metrics.length > 0
                ? d.metrics
                : d.results || [],
            deliverables: d.deliverables || [],
            tags: d.tags || [],
            link: d.link || '#',
            markdown: d.markdown || '',
          });
          setNotFoundState(false);
        } else {
          setNotFoundState(true);
          setStudy(null);
        }
      } catch (err) {
        console.error('Failed to fetch case study from CMS:', err);
        setNotFoundState(true);
        setStudy(null);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [slug]);

  if (notFoundState) {
    notFound();
  }

  if (loading || !study) {
    return (
      <main className="w-full min-h-screen bg-light text-dark flex items-center justify-center">
        <Navbar />
        <div className="text-center font-jakarta text-gray-500">
          Loading case study...
        </div>
      </main>
    );
  }

  const markdownContent = study.markdown || '';

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Main Container */}
      <section
        id="case-study-detail"
        data-theme="light"
        className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4"
      >
        {/* Back Link */}
        <div
          className={`w-full transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666] hover:text-dark transition-colors duration-200 group mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO CASE STUDIES</span>
          </Link>
        </div>

        {/* Category & Timeline Badges */}
        <div
          className={`flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="font-ibm-mono text-xs uppercase font-semibold text-dark bg-dark/5 border border-dark/15 px-3 py-1 rounded-full">
            {study.category}
          </span>
          {study.timeline && (
            <span className="font-ibm-mono text-xs uppercase font-semibold text-[#666666] border border-dark/10 px-3 py-1 rounded-full">
              {study.timeline}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <div
          className={`w-full flex flex-col gap-4 sm:gap-6 pb-10 sm:pb-14 border-b border-dark/15 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] leading-[0.88] tracking-tight uppercase text-dark">
            {study.title}
          </h1>

          <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-[#333333] font-semibold max-w-4xl leading-relaxed">
            {study.tagline}
          </p>
        </div>

        {/* Key Metrics Row (Horizontally Centered, Unboxed, Animated Count-Up) */}
        {study.results && study.results.length > 0 && (
          <div
            className={`w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 md:gap-20 lg:gap-28 py-10 sm:py-12 md:py-14 border-b border-dark/15 transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            {study.results.map((res, idx) => (
              <div
                key={idx}
                className="w-full sm:w-auto sm:flex-1 sm:max-w-[300px] flex flex-col items-center text-center justify-center"
              >
                <span className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-dark leading-none select-none tabular-nums">
                  <CountUpMetric
                    value={res.value}
                    mounted={mounted}
                    delay={550 + idx * 120}
                  />
                </span>
                <span className="font-ibm-mono text-xs sm:text-sm uppercase tracking-wider text-[#666666] font-semibold mt-2 sm:mt-3 text-center">
                  {res.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Deep-Dive Narrative Section */}
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 sm:pt-14 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '650ms' }}
        >
          {/* Left Column: Project Metadata & Deliverables (Sticky) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28 self-start">
            <div className="bg-dark/[0.02] border border-dark/10 rounded-2xl p-6 sm:p-8 space-y-6 text-left">
              <div>
                <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#777777] block font-semibold">
                  CLIENT
                </span>
                <span className="font-jakarta text-base sm:text-lg font-bold text-dark mt-1 block">
                  {study.client}
                </span>
              </div>

              <div className="pt-4 border-t border-dark/10">
                <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#777777] block font-semibold">
                  CATEGORY
                </span>
                <span className="font-jakarta text-sm sm:text-base font-semibold text-[#444444] mt-1 block">
                  {study.category}
                </span>
              </div>

              {study.timeline && (
                <div className="pt-4 border-t border-dark/10">
                  <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#777777] block font-semibold">
                    TIMELINE
                  </span>
                  <span className="font-jakarta text-sm sm:text-base font-semibold text-[#444444] mt-1 block">
                    {study.timeline}
                  </span>
                </div>
              )}

              {/* Deliverables */}
              {study.deliverables && study.deliverables.length > 0 && (
                <div className="pt-4 border-t border-dark/10">
                  <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#777777] block font-semibold mb-3">
                    KEY DELIVERABLES
                  </span>
                  <ul className="space-y-2">
                    {study.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm font-jakarta text-dark font-medium leading-relaxed"
                      >
                        <span className="text-dark select-none text-sm leading-none mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="pt-4 border-t border-dark/10">
                <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#777777] block font-semibold mb-3">
                  TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-ibm-mono text-[11px] font-medium text-dark/80 bg-light border border-dark/15 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Link Button */}
              {study.link && (
                <div className="pt-4 border-t border-dark/10">
                  <Button
                    text="VISIT LIVE PLATFORM"
                    link={study.link}
                    size="default"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Markdown Case Narrative */}
          <div className="lg:col-span-8 flex flex-col text-left">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-bebas text-3xl sm:text-4xl text-dark tracking-wide uppercase mt-8 sm:mt-10 mb-4 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-ibm-mono text-xs sm:text-sm uppercase tracking-wider text-[#666666] font-semibold mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="font-jakarta text-base sm:text-lg text-[#444444] font-medium leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-3 mb-6 pl-0 list-none">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-3 mb-6 pl-0 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2.5 text-base sm:text-lg text-[#555555] font-jakarta font-medium leading-relaxed before:content-['•'] before:text-accent before:font-bold before:text-xl before:leading-none before:mt-0.5">
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-dark/30 pl-5 sm:pl-7 py-2 my-8 text-left space-y-2">
                    <div className="font-jakarta text-lg sm:text-xl text-dark font-medium leading-relaxed italic [&>p]:mb-2 [&>p:last-child]:mb-0">
                      {children}
                    </div>
                  </blockquote>
                ),
                hr: () => <hr className="border-t border-dark/15 my-8 sm:my-10" />,
                strong: ({ children }) => (
                  <strong className="font-bold text-dark">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="font-ibm-mono text-xs sm:text-sm bg-dark/5 text-dark px-2 py-0.5 rounded border border-dark/10">
                    {children}
                  </code>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Bottom Navigation & Action Footer */}
        <div className="w-full pt-6 sm:pt-8 mt-12 sm:mt-16 border-t border-dark/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/case-studies"
            className="font-ibm-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666] hover:text-dark transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VIEW ALL CASE STUDIES</span>
          </Link>

          <Button
            text="GET IN TOUCH"
            link="/contact"
            size="default"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
