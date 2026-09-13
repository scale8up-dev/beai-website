'use client';

import React, { useState, useEffect, useRef } from 'react';
import Highlight from './Highlight';
import highlightsData from '@/data/highlights.json';

export default function HighlightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rows = containerRef.current.querySelectorAll<HTMLDivElement>('[data-highlight-row]');
      const winHeight = window.innerHeight;
      const centerY = winHeight * 0.50; // Dead center of viewport (50vh)
      const maxAllowedDistance = winHeight * 0.15; // Only activate if within 15vh of center (35vh to 65vh)

      let closestIndex: number | null = null;
      let minDistance = maxAllowedDistance;

      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        // Check if row is visible inside the viewport
        if (rect.top < winHeight && rect.bottom > 0) {
          const rowCenter = rect.top + rect.height / 2;
          const distance = Math.abs(rowCenter - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="highlights"
      data-theme="dark"
      className="w-full bg-dark text-light py-16 sm:py-24 px-4 z-30 relative"
    >
      <div className="w-full">
        <div className="flex flex-col">
          {highlightsData.map((item, index) => (
            <Highlight
              key={item.id || index}
              title={item.title}
              icon={item.icon}
              tagline={item.tagline}
              isLast={index === highlightsData.length - 1}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
