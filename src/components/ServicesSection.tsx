import React from 'react';
import List from './List';
import servicesData from '@/data/servicesList.json';

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-theme="dark"
      className="w-full min-h-screen flex flex-col justify-start items-start bg-dark text-light rounded-t-3xl md:rounded-t-[40px] px-4 pt-24 md:pt-36 pb-16 md:pb-24 relative z-20 shadow-2xl"
    >
      <div className="w-full text-left flex flex-col gap-6 max-w-5xl">
        <h2 className="font-bebas text-6xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-wide uppercase text-light">
          HOW WE CAN HELP
        </h2>

        <div className="flex flex-col gap-5 max-w-xl pt-8 md:pt-14">
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#9A9A9A] font-semibold leading-relaxed">
            Is outdated software holding your business back from its true growth potential?
          </p>
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#9A9A9A] font-semibold leading-relaxed">
            We build AI-powered web and mobile products designed to inspire users and grow your business.
          </p>
        </div>
      </div>

      {/* List Component taking JSON data - Spanning full section width */}
      <List data={servicesData} className="mt-8 md:mt-16 w-full" />
    </section>
  );
}
