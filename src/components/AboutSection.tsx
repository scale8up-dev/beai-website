'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stickyProgress, setStickyProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // Calculate sticky progress ONLY when 100% of section top has reached viewport top (rect.top <= 0)
      const totalScrollable = rect.height - winHeight;
      if (totalScrollable > 0 && rect.top <= 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
        setStickyProgress(progress);
      } else {
        setStickyProgress(0);
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

  // Growth Phase (0.0 -> 0.55 of pinned scroll): Card expands at center from 260x150px to 100%
  const expandProgress = Math.min(1, stickyProgress / 0.55);
  // Smooth sine ease-out for natural growth
  const easedExpand = Math.sin((expandProgress * Math.PI) / 2);

  // Text starts fading in when rectangle expansion is 80% finished (easedExpand: 0.80 -> 1.0)
  const textFadeProgress = Math.max(0, Math.min(1, (easedExpand - 0.80) / 0.20));
  const textOpacity = textFadeProgress;
  const textScale = 0.90 + textFadeProgress * 0.10;

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="light"
      className="relative w-full h-[180vh] bg-light text-dark z-30"
    >
      {/* Sticky Fullscreen Viewport - Pins when 100% of section reaches viewport top */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-light">
        {/* Animated Dark Rectangle */}
        <div
          className="relative bg-dark text-light shadow-2xl flex items-center justify-center overflow-hidden transform-gpu rounded-none will-change-[width,height]"
          style={{
            width: `calc(260px + (100% - 260px) * ${easedExpand})`,
            height: `calc(150px + (100vh - 150px) * ${easedExpand})`,
          }}
        >
          {/* Text Content (Slowly grows and expands in sync with the dark rectangle) */}
          <div
            className="w-full max-w-5xl mx-auto flex items-center justify-center px-6 md:px-12 transform-gpu will-change-[opacity,transform]"
            style={{
              opacity: textOpacity,
              transform: `scale3d(${textScale}, ${textScale}, 1)`,
              pointerEvents: textOpacity > 0.5 ? 'auto' : 'none',
            }}
          >
            {/* Mobile Layout (< sm) */}
            <div className="flex flex-col items-start text-left w-full sm:hidden">
              <Image
                src="/brand/icon-light.svg"
                alt="Business Evolution AI Icon"
                width={140}
                height={140}
                className="w-16 h-16 mb-4 shrink-0"
              />
              <h2 className="font-bebas text-[44px] min-[370px]:text-[52px] tracking-wide text-light uppercase leading-none whitespace-nowrap mb-4">
                HEY, WE&apos;RE BEAI
              </h2>
              <p className="font-jakarta text-base text-light/80 font-normal leading-relaxed text-left max-w-[340px]">
                We empower businesses through cutting-edge AI, custom software, and transformative digital solutions.
              </p>
            </div>

            {/* Desktop / Tablet Layout (>= sm) */}
            <div className="hidden sm:flex sm:items-start sm:gap-6 md:gap-8">
              <Image
                src="/brand/icon-light.svg"
                alt="Business Evolution AI Icon"
                width={140}
                height={140}
                className="sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 shrink-0"
              />
              <div className="grid grid-cols-1 w-max text-left">
                <h2 className="sm:h-24 md:h-32 lg:h-36 flex flex-col justify-between font-bebas sm:text-[54px] md:text-[72px] lg:text-[82px] tracking-wide text-light uppercase leading-none w-max">
                  <span className="leading-none sm:-translate-y-[5px] md:-translate-y-[6px]">HEY, WE&apos;RE</span>
                  <span className="leading-none sm:-translate-y-[5px] md:-translate-y-[6px]">BEAI</span>
                </h2>

                <p className="w-0 sm:min-w-[calc(100%+3.5rem)] font-jakarta sm:text-lg md:text-xl text-light/70 font-normal leading-relaxed text-left sm:mt-6">
                  We empower businesses through cutting-edge AI, custom software, and transformative digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
