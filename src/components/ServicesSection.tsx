import React from 'react';
import List from './List';
import servicesData from '@/data/servicesList.json';

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-theme="dark"
      className="w-full min-h-screen flex flex-col justify-start items-start bg-dark text-light rounded-t-3xl md:rounded-t-[40px] px-4 pt-24 md:pt-36 pb-0 relative z-20 shadow-2xl"
    >
      <div className="w-full text-left flex flex-col gap-6 max-w-5xl">
        <h2 className="font-bebas text-6xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-wide uppercase text-light">
          OUR SERVICES
        </h2>

        <div className="flex flex-col gap-5 max-w-xl pt-8 md:pt-14">
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#9A9A9A] font-semibold leading-relaxed">
            Four Divisions. One Connected Growth Engine.
          </p>
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#9A9A9A] font-semibold leading-relaxed">
            AI and software development is our main specialty, backed by strategy, marketing and growth systems, and client success so products move from concept to production without handoff gaps.
          </p>
        </div>
      </div>

      {/* List Component taking JSON data - Spanning full section width */}
      <List data={servicesData} className="mt-8 md:mt-16 w-full" />
    </section>
  );
}
