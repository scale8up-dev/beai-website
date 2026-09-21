'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import servicesData from '@/data/servicesList.json';

const CIRCLE_LAYERS = [
  { count: 6, radius: 42, offset: 0 },
  { count: 12, radius: 84, offset: Math.PI / 12 },
  { count: 18, radius: 126, offset: 0 },
  { count: 24, radius: 168, offset: Math.PI / 24 },
  { count: 30, radius: 210, offset: 0 },
  { count: 36, radius: 252, offset: Math.PI / 36 },
];

function getQuadrant(cx: number, cy: number): number {
  const dx = cx - 300;
  const dy = cy - 300;
  if (dx < 0 && dy < 0) return 1; // Top-Left: Q1
  if (dx >= 0 && dy < 0) return 2; // Top-Right: Q2
  if (dx >= 0 && dy >= 0) return 3; // Bottom-Right: Q3
  return 4; // Bottom-Left: Q4
}

function StaggeredServicesTagline({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <p className="font-jakarta text-xl sm:text-2xl md:text-3xl text-[#9A9A9A] font-semibold leading-snug sm:leading-relaxed max-w-xl flex flex-wrap justify-center gap-x-[0.25em] gap-y-0 text-center">
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
                className={`inline-block transition-all duration-500 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                  }`}
                style={{ transitionDelay: `${550 + charDelay}ms` }}
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

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;

      if (rect.top <= 0) {
        const scrollVh = (-rect.top / winHeight) * 100;
        if (scrollVh < 25) {
          setActiveCount(0);
        } else if (scrollVh < 105) {
          setActiveCount(1);
        } else if (scrollVh < 185) {
          setActiveCount(2);
        } else if (scrollVh < 265) {
          setActiveCount(3);
        } else {
          setActiveCount(4);
        }
      } else {
        setActiveCount(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Services Hero Section (100dvh Light Container, No Outside Padding) */}
      <section
        id="services-hero"
        className="w-full h-[100dvh] min-h-[100dvh] bg-light z-10 relative flex items-center justify-center"
      >
        {/* Dark Inner Section (100% Width & Height, Rounded Bottom Borders) */}
        <div
          data-theme="dark"
          className="w-full h-full bg-dark text-light rounded-b-3xl md:rounded-b-[40px] relative overflow-hidden flex flex-col justify-between items-center text-center px-4 pt-20 md:pt-24 pb-6 sm:pb-8"
        >
          {/* Title at the top */}
          <div className="w-full flex flex-col items-center justify-start pt-2 sm:pt-4">
            <h1 className="font-bebas text-[45vw] sm:text-[40vw] md:text-[36vw] lg:text-[32vw] xl:text-[440px] 2xl:text-[520px] leading-[0.80] tracking-tighter uppercase text-light flex flex-col items-center gap-1 sm:gap-3 md:gap-4 select-none">
              <span
                className={`block transition-all duration-700 ease-out transform-gpu ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 sm:translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                OUR
              </span>
              <span
                className={`block transition-all duration-700 ease-out transform-gpu ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 sm:translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                SERVICES
              </span>
            </h1>
          </div>

          {/* Description at the bottom */}
          <div className="w-full flex justify-center pb-0 sm:pb-1">
            <StaggeredServicesTagline
              text="Four Divisions. One Connected Growth Engine."
              mounted={mounted}
            />
          </div>
        </div>
      </section>

      {/* Services Circle Section (Sticky Scroll: 415vh total) */}
      <section
        ref={sectionRef}
        id="services-circle"
        data-theme="light"
        className="relative w-full h-[415vh] bg-light text-dark z-20"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 w-full h-screen min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="relative w-[92vw] max-w-[620px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
              {/* Center Circle */}
              <circle
                cx="300"
                cy="300"
                r="7"
                className={`transition-colors duration-500 ease-out ${activeCount >= 1 ? 'text-dark/[0.14]' : 'text-dark/[0.03]'
                  }`}
                fill="currentColor"
              />

              {/* Concentric Circle Layers */}
              {CIRCLE_LAYERS.map((layer, layerIdx) =>
                Array.from({ length: layer.count }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / layer.count - Math.PI / 2 + layer.offset;
                  const cx = Math.round((300 + layer.radius * Math.cos(angle)) * 100) / 100;
                  const cy = Math.round((300 + layer.radius * Math.sin(angle)) * 100) / 100;
                  const q = getQuadrant(cx, cy);
                  const isDark = q <= activeCount;
                  return (
                    <circle
                      key={`l${layerIdx}-${i}`}
                      cx={cx}
                      cy={cy}
                      r="7"
                      className={`transition-colors duration-500 ease-out ${isDark ? 'text-dark/[0.14]' : 'text-dark/[0.03]'
                        }`}
                      fill="currentColor"
                    />
                  );
                })
              )}
            </svg>

            {/* Centered Services Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 select-none">
              {servicesData.map((service, index) => {
                const isActive = activeCount === index + 1;
                const isPast = activeCount > index + 1;

                const containerTransformClass = isActive
                  ? 'translate-y-0 opacity-100'
                  : isPast
                  ? '-translate-y-12 sm:-translate-y-16 opacity-0'
                  : 'translate-y-12 sm:translate-y-16 opacity-0';

                const titleTransformClass = isActive
                  ? 'translate-y-0'
                  : isPast
                  ? '-translate-y-[120%]'
                  : 'translate-y-[120%]';

                const descTransformClass = isActive
                  ? 'translate-y-0 opacity-100'
                  : isPast
                  ? '-translate-y-[120%] opacity-0'
                  : 'translate-y-[120%] opacity-0';

                return (
                  <div
                    key={service.id || index}
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center px-2 sm:px-4 transition-all duration-700 ease-out transform-gpu ${containerTransformClass}`}
                  >
                    {/* Title */}
                    <div className="overflow-hidden py-1 max-w-[420px] sm:max-w-[540px] md:max-w-[600px]">
                      <h3
                        className={`font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-wide uppercase text-dark transition-transform duration-700 ease-out transform-gpu ${titleTransformClass}`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden mt-3 sm:mt-5 max-w-[360px] sm:max-w-[480px] md:max-w-[540px]">
                      <p
                        className={`font-jakarta text-sm sm:text-base md:text-lg text-dark/75 font-semibold leading-relaxed transition-all duration-700 ease-out transform-gpu ${descTransformClass}`}
                        style={{
                          transitionDelay: isActive ? '120ms' : '0ms',
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
