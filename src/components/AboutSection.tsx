import React from 'react';
import Button from './Button';

export default function AboutSection() {
  return (
    <section data-theme="dark" className="w-full min-h-[150vh] flex flex-col justify-center items-center bg-dark text-light p-6 md:p-12 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        <span className="font-ibm-mono text-xs md:text-sm text-accent uppercase tracking-widest">
          Autonomous AI Intelligence
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bebas tracking-wide text-light uppercase leading-[0.9]">
          REDEFINING ENTERPRISE WORKFLOWS
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-light/75 font-jakarta max-w-2xl leading-relaxed">
          We combine predictive intelligence, real-time data automation, and custom neural agents to scale business operations seamlessly.
        </p>

        <div className="pt-4">
          <Button text="Learn More" link="#about" variant="light" />
        </div>
      </div>
    </section>
  );
}
