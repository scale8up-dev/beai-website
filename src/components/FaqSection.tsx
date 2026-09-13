'use client';

import React, { useState } from 'react';
import FaqItem from './FaqItem';
import faqsData from '@/data/faqs.json';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      data-theme="light"
      className="w-full min-h-screen bg-light text-dark pt-0 pb-20 sm:pb-28 px-4 z-30 relative flex flex-col justify-start"
    >
      {/* Dark Curved Header Row Aligned to Top with data-theme="dark" for Navbar detection */}
      <div className="w-full h-auto flex flex-col justify-start items-start -mx-4 mb-12 sm:mb-16">
        <div data-theme="dark" className="w-screen h-[50px] bg-dark rounded-b-3xl md:rounded-b-[40px]" />
      </div>

      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-left">
          <h2 className="font-bebas text-6xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-wide uppercase text-dark">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqsData.map((faq, index) => (
            <FaqItem
              key={faq.id || index}
              index={index + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              isLast={index === faqsData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
