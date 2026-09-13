'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import HollowButton from './HollowButton';

const SLIDESHOW_IMAGES = [
  '/slideshow/1.jpg',
  '/slideshow/2.jpg',
  '/slideshow/3.jpg',
  '/slideshow/4.png',
  '/slideshow/5.png',
];

function HeroSlideshow() {
  const images = [...SLIDESHOW_IMAGES, ...SLIDESHOW_IMAGES];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#111111]">
      <div className="flex w-max h-full animate-hero-slideshow">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-[100cqw] h-full shrink-0 overflow-hidden"
          >
            <Image
              src={src}
              alt={`Slideshow image ${(idx % SLIDESHOW_IMAGES.length) + 1}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 260px, 340px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StaggeredHeroTitle({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <h1 className="font-bebas text-6xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-wide uppercase text-dark flex flex-wrap gap-x-[0.25em] gap-y-[0.05em] text-left max-w-[70vw] md:max-w-3xl">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden select-none py-1">
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 22;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className="relative inline-block overflow-hidden h-[0.85em] leading-none"
              >
                <span
                  className={`block transition-all duration-600 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                  style={{ transitionDelay: `${150 + charDelay}ms` }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function StaggeredHeroTagline({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-grey leading-snug font-semibold max-w-[60vw] md:max-w-lg flex flex-wrap gap-x-[0.28em] gap-y-0 text-left pl-0">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-0.5 -my-0.5 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 10;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-500 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                  }`}
                style={{ transitionDelay: `${450 + charDelay}ms` }}
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

function StaggeredByBeai({ mounted }: { mounted: boolean }) {
  const text = 'BY BEAI';
  return (
    <span className="font-bebas text-dark text-base md:text-lg tracking-wider uppercase leading-none shrink-0 select-none inline-flex overflow-hidden py-0.5">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[0.85em] leading-none"
        >
          <span
            className={`block transition-all duration-500 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: `${1250 + index * 30}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.35;
  const heroOpacity = Math.max(0, 1 - scrollY / 950);

  return (
    <section
      data-theme="light"
      className="sticky top-0 z-0 w-full min-h-screen flex flex-col justify-between items-start text-left px-4 pt-20 md:pt-24 pb-4 bg-light text-dark overflow-hidden transform-gpu will-change-transform"
      style={{
        transform: `translate3d(0, -${parallaxOffset}px, 0)`,
        opacity: heroOpacity,
      }}
    >
      {/* Top Left Title with Staggered Character Popup Animation */}
      <div className="w-full pt-6 md:pt-1">
        <StaggeredHeroTitle
          text="Transform Your Business with AI Innovation"
          mounted={mounted}
        />
      </div>

      {/* Middle & Bottom Content Container */}
      <div className="w-full flex-1 flex flex-col justify-between md:justify-between md:flex-row items-start md:items-end gap-6 md:gap-10 pt-4 md:pt-14 mt-auto md:mt-0">
        {/* Slideshow Card Container - Enters from left on mobile (-translate-x-12), from right on desktop (md:translate-x-12) */}
        <div
          className={`flex flex-col gap-1.5 w-[60vw] sm:w-[250px] md:w-[280px] lg:w-[320px] shrink-0 my-auto md:my-0 order-1 md:order-2 transition-all duration-700 ease-out transform-gpu ${
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 md:translate-x-12 opacity-0'
          }`}
          style={{ transitionDelay: '1150ms' }}
        >
          {/* Slideshow Card */}
          <div className="@container w-full aspect-[16/10] shrink-0 rounded-sm border-[2px] border-solid border-[#111111] overflow-hidden bg-[#111111] shadow-md">
            <HeroSlideshow />
          </div>

          {/* BY BEAI Subtitle Row with popup text and growing horizontal line */}
          <div className="flex items-center gap-2.5 w-full pt-0.5">
            <StaggeredByBeai mounted={mounted} />
            <div
              className={`h-[1px] bg-[#111111] flex-1 origin-left transition-transform duration-700 ease-out transform-gpu ${
                mounted ? 'scale-x-100' : 'scale-x-0'
              }`}
              style={{ transitionDelay: '1350ms' }}
            />
          </div>
        </div>

        {/* Tagline + CTA Buttons Column - Anchored at bottom on mobile (order-2), left column on desktop (order-1) */}
        <div className="flex flex-col justify-end items-start gap-4 max-w-lg w-full order-2 md:order-1 pl-0 mt-0 md:mt-0">
          <StaggeredHeroTagline
            text="AI and software engineering spanning machine learning, web, mobile, UI/UX, and cloud, backed by strategy and hands-on client success."
            mounted={mounted}
          />

          {/* CTA Buttons Row (Staggered Entrance) */}
          <div className="flex items-center gap-3 pl-0">
            <div
              className={`transition-all duration-600 ease-out transform-gpu ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '950ms' }}
            >
              <Button text="Book a call" link="#contact" />
            </div>
            <div
              className={`transition-all duration-600 ease-out transform-gpu ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '1070ms' }}
            >
              <HollowButton text="See work" link="#work" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
