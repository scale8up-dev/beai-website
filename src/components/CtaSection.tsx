'use client';

import React from 'react';

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="w-full h-screen min-h-screen bg-light p-4 z-30 relative flex items-center justify-center"
    >
      <div
        data-theme="dark"
        className="w-full h-full bg-dark text-light rounded-xl md:rounded-2xl relative overflow-hidden"
      />
    </section>
  );
}
