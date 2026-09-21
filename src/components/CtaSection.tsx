'use client';

import React from 'react';
import Button from './Button';

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="w-full h-screen min-h-screen bg-light p-4 z-30 relative flex items-center justify-center"
    >
      <div
        data-theme="dark"
        className="w-full h-full bg-dark text-light rounded-xl md:rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-6 sm:p-10"
      >
        <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wide uppercase max-w-5xl mb-6 sm:mb-8">
          READY TO ELEVATE YOUR BUSINESS?
        </h2>
        <Button text="Contact Us" link="/contact" variant="light" size="lg" />
      </div>
    </section>
  );
}

