'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      data-theme="light"
      className="w-full bg-light text-dark px-4 pt-6 pb-4 sm:pt-8 sm:pb-5 z-30 relative"
    >
      <hr className="w-full border-t border-dark/15 mb-4 sm:mb-6" />

      <div className="w-full flex flex-col">
        {/* Top Row: Brand Info + Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="cursor-pointer inline-block"
            >
              <Image
                src="/brand/icon-dark.svg"
                alt="Business Evolution AI Icon"
                width={40}
                height={40}
                className="w-auto h-9 shrink-0"
              />
            </a>
            <p className="font-jakarta text-sm sm:text-base text-[#555555] font-medium leading-relaxed max-w-sm mt-1">
              Building AI-powered web applications, mobile platforms, and enterprise solutions designed to transform businesses.
            </p>
          </div>

          {/* Mobile Divider under Logo and Description */}
          <hr className="w-full border-t border-dark/15 my-2 md:hidden" />

          {/* Links Container: Same row (grid-cols-2) on mobile, 7 cols on desktop */}
          <div className="grid grid-cols-2 md:col-span-7 gap-8 sm:gap-12 items-start">
            {/* Links Column 1: Navigation */}
            <div className="flex flex-col">
              <ul className="flex flex-col gap-2.5 font-jakarta text-sm sm:text-base text-[#555555] font-medium">
                <li>
                  <a
                    href="/"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/work"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2: Connect */}
            <div className="flex flex-col">
              <ul className="flex flex-col gap-2.5 font-jakarta text-sm sm:text-base text-[#555555] font-medium">
                <li>
                  <a
                    href="/contact"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/business-evolution-ai-be-ai/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dark transition-colors duration-200 inline-block"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="w-full border-t border-dark/15 mt-6 mb-3 sm:mt-8 sm:mb-4" />

        {/* Bottom Row: Copyright + Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-ibm-mono text-xs text-[#666666] tracking-wider uppercase">
          <span>© {currentYear} Business Evolution AI</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-dark transition-colors duration-200 cursor-pointer flex items-center"
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
