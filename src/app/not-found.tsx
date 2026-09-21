'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const errorCode = '404';

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light flex flex-col justify-between">
      <Navbar />

      {/* Main 404 Content Section */}
      <section
        id="not-found-page"
        data-theme="light"
        className="w-full flex-grow flex flex-col justify-center items-center text-center pt-32 sm:pt-40 md:pt-48 pb-20 px-4"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Big Kinetic 404 Number */}
          <h1 className="font-bebas text-[110px] sm:text-[160px] md:text-[210px] lg:text-[250px] leading-[0.80] tracking-tight uppercase text-dark select-none inline-flex overflow-hidden py-2 my-2">
            {errorCode.split('').map((char, index) => (
              <span
                key={index}
                className="relative inline-block overflow-hidden h-[0.85em] leading-none"
              >
                <span
                  className={`block transition-all duration-700 ease-out transform-gpu ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${150 + index * 80}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Heading */}
          <h2
            className={`font-bebas text-3xl sm:text-4xl md:text-5xl text-dark tracking-wide uppercase mt-2 mb-4 transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            PAGE NOT FOUND
          </h2>

          {/* Description */}
          <p
            className={`font-jakarta text-base sm:text-lg text-[#555555] font-semibold max-w-lg mx-auto leading-relaxed mb-8 transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            This page does not exist.
          </p>

          {/* Action Button */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ease-out transform-gpu ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '550ms' }}
          >
            <Button text="RETURN HOME" link="/" size="lg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
