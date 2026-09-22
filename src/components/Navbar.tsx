'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import HollowButton from './HollowButton';

function StaggeredText({
  text,
  isMenuOpen,
  delayIndex = 0,
}: {
  text: string;
  isMenuOpen: boolean;
  delayIndex?: number;
}) {
  const lineDelay = 120 + delayIndex * 40;

  return (
    <span
      className="inline-flex overflow-hidden select-none transition-all duration-500 ease-out transform-gpu"
      style={{
        transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)',
        opacity: isMenuOpen ? 1 : 0,
        transitionDelay: isMenuOpen ? `${lineDelay}ms` : '0ms',
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[0.85em] leading-none"
        >
          {/* Resting Character (Slides up & out) */}
          <span
            className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
          {/* Rising Character (Slides up from bottom of line height into view) */}
          <span
            aria-hidden="true"
            className="absolute inset-0 block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-accent"
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

let hasAnimatedNavbar = false;

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFirstLoad] = useState(() => !hasAnimatedNavbar);
  const [mounted, setMounted] = useState(() => hasAnimatedNavbar);

  useEffect(() => {
    hasAnimatedNavbar = true;
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-theme]');
      const sampleY = 40; // Navbar center line in viewport pixels

      // Iterate in reverse order so overlapping stacked sections take theme priority over sticky background sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();

        let offsetPx = 0;
        const offsetAttr = section.getAttribute('data-theme-offset');
        if (offsetAttr) {
          if (offsetAttr.endsWith('vh')) {
            offsetPx = (parseFloat(offsetAttr) / 100) * window.innerHeight;
          } else if (offsetAttr.endsWith('px')) {
            offsetPx = parseFloat(offsetAttr);
          } else {
            offsetPx = parseFloat(offsetAttr) || 0;
          }
        }

        const effectiveTop = rect.top - offsetPx;
        if (effectiveTop <= sampleY && rect.bottom > sampleY) {
          const sectionTheme = section.getAttribute('data-theme') as 'light' | 'dark';
          if (sectionTheme) {
            setTheme(sectionTheme);
          }
          break;
        }
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isDark = theme === 'dark';
  const buttonVariant = isDark ? 'light' : 'default';

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 py-4 bg-transparent transition-colors duration-300">
        {/* Left side: Icon & Text Logo (Slides in from Left, Click reloads clean home URL) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className={`flex items-center gap-3 cursor-pointer group transform-gpu ${isFirstLoad
            ? `transition-all duration-600 ease-out ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`
            : 'translate-x-0 opacity-100'
            }`}
          style={{ transitionDelay: isFirstLoad ? '150ms' : '0ms' }}
        >
          <Image
            src={isDark ? '/brand/icon-light.svg' : '/brand/icon-dark.svg'}
            alt="Business Evolution AI Icon"
            width={40}
            height={40}
            priority
            className="w-auto h-9 shrink-0 transition-all duration-300"
          />
          <div
            className={`flex flex-col justify-center font-bebas text-2xl leading-[0.85] tracking-wide uppercase select-none transition-colors duration-300 translate-y-[1.5px] ${isDark ? 'text-light' : 'text-dark'
              }`}
          >
            <span>BUSINESS</span>
            <span>EVOLUTION AI</span>
          </div>
        </a>

        {/* Center: 4 Hollow Buttons (Viewport Centered, Staggered Top to Bottom Entrance) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 lg:gap-3">
          <div
            className={`transform-gpu ${isFirstLoad
              ? `transition-all duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`
              : 'translate-y-0 opacity-100'
              }`}
            style={{ transitionDelay: isFirstLoad ? '300ms' : '0ms' }}
          >
            <HollowButton text="Services" link="/services" variant={buttonVariant} />
          </div>
          <div
            className={`transform-gpu ${isFirstLoad
              ? `transition-all duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`
              : 'translate-y-0 opacity-100'
              }`}
            style={{ transitionDelay: isFirstLoad ? '380ms' : '0ms' }}
          >
            <HollowButton text="Team" link="/team" variant={buttonVariant} />
          </div>
          <div
            className={`transform-gpu ${isFirstLoad
              ? `transition-all duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`
              : 'translate-y-0 opacity-100'
              }`}
            style={{ transitionDelay: isFirstLoad ? '460ms' : '0ms' }}
          >
            <HollowButton text="Work" link="/work" variant={buttonVariant} />
          </div>
          <div
            className={`transform-gpu ${isFirstLoad
              ? `transition-all duration-600 ease-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`
              : 'translate-y-0 opacity-100'
              }`}
            style={{ transitionDelay: isFirstLoad ? '540ms' : '0ms' }}
          >
            <HollowButton text="Case Studies" link="/case-studies" variant={buttonVariant} />
          </div>
        </div>

        {/* Right side: Contact button + Mobile Menu button (Right to Left Entrance) */}
        <div
          className={`flex items-center gap-2 sm:gap-3 transform-gpu ${isFirstLoad
            ? `transition-all duration-600 ease-out ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`
            : 'translate-x-0 opacity-100'
            }`}
          style={{ transitionDelay: isFirstLoad ? '600ms' : '0ms' }}
        >
          <Button text="Contact" link="/contact" variant={buttonVariant} />
          <div className="md:hidden">
            <HollowButton
              text="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant={buttonVariant}
            />
          </div>
        </div>
      </header>

      {/* Mobile Floating Card Modal Menu (Smooth Slide Up & Slide Away Down) */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end p-4 md:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        {/* Backdrop Overlay */}
        <div
          aria-hidden="true"
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Floating Rounded Card Content */}
        <div
          className={`relative w-full bg-light text-dark rounded-md px-4 py-4 flex flex-col z-10 border border-dark/15 shadow-2xl transition-all duration-300 ease-out transform-gpu ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+20px)] opacity-0'
            }`}
        >
          {/* Navigation Links with Kinetic Staggered Character Rise */}
          <nav className="flex flex-col space-y-0.5 text-left py-1">
            <a
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Home" isMenuOpen={isMenuOpen} delayIndex={0} />
            </a>
            <a
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Contact" isMenuOpen={isMenuOpen} delayIndex={1} />
            </a>
            <a
              href="/services"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Services" isMenuOpen={isMenuOpen} delayIndex={2} />
            </a>
            <a
              href="/team"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Team" isMenuOpen={isMenuOpen} delayIndex={3} />
            </a>
            <a
              href="/work"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Work" isMenuOpen={isMenuOpen} delayIndex={4} />
            </a>
            <a
              href="/case-studies"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit font-bebas text-5xl leading-[0.85] text-dark tracking-wide py-0.5 overflow-hidden"
            >
              <StaggeredText text="Case Studies" isMenuOpen={isMenuOpen} delayIndex={5} />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
