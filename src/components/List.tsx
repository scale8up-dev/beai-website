'use client';

import React from 'react';

export interface ListItemData {
  id?: string;
  title: string;
  mobileTitle?: string;
  description: string;
  list?: string[];
}

export interface ListProps {
  data?: ListItemData[];
  className?: string;
}

export default function List({ data = [], className = '' }: ListProps) {
  return (
    <div className={`w-full flex flex-col pt-10 md:pt-14 pb-0 ${className}`}>
      {data.map((item, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');
        const isLast = index === data.length - 1;

        const stickyTopDesktop = `calc(96px + ${index * 95}px)`;
        const stickyTopMobile = isLast
          ? `calc(72px + ${index * 64 + 4}px)`
          : `calc(72px + ${index * 64}px)`;

        // Each card has a min-height equal to the remaining viewport below its sticky point.
        // This guarantees all 4 cards space identically, dock at the exact same step intervals,
        // and the second card 04 docks, the entire stack scrolls away together.
        const minHeightDesktop = `calc(100dvh - (96px + ${index * 95}px))`;
        const minHeightMobile = isLast
          ? `calc(100dvh - (72px + ${index * 64 + 4}px))`
          : `calc(100dvh - (72px + ${index * 64}px))`;

        return (
          <div
            key={item.id || index}
            className="w-full flex flex-col sticky bg-dark pt-4 md:pt-5 pb-8 md:pb-12 border-t border-[#383838] top-[var(--sticky-top-mobile)] md:top-[var(--sticky-top-desktop)] min-h-[var(--min-h-mobile)] md:min-h-[var(--min-h-desktop)]"
            style={{
              '--sticky-top-mobile': stickyTopMobile,
              '--sticky-top-desktop': stickyTopDesktop,
              '--min-h-mobile': minHeightMobile,
              '--min-h-desktop': minHeightDesktop,
              zIndex: 10 + index * 10,
            } as React.CSSProperties}
          >
            {/* Header Row: Number on left, Title on right */}
            <div className="item-header w-full flex flex-row items-baseline justify-start gap-4 md:gap-8 mb-3 md:mb-4">
              {/* Number with dot */}
              <div className="w-16 sm:w-24 md:w-1/3 lg:w-1/4 shrink-0">
                <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-light leading-none select-none">
                  {itemNumber}.
                </span>
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-light uppercase tracking-wide leading-none">
                  <span className="md:hidden">
                    {item.mobileTitle ||
                      (index === 0
                        ? 'SOFTWARE DEVELOPMENT'
                        : index === 2
                        ? 'MARKETING'
                        : item.title)}
                  </span>
                  <span className="hidden md:inline">{item.title}</span>
                </h3>
              </div>
            </div>

            {/* Content Row: Description + Sub-list (aligned under Title on desktop, full width on mobile) */}
            <div className="w-full flex flex-col md:flex-row items-start justify-start gap-4 md:gap-8">
              {/* Empty left spacer on desktop matching number column */}
              <div className="hidden md:block md:w-1/3 lg:w-1/4 shrink-0" />

              {/* Description and Inner Sub-list */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                {/* Description */}
                <p className="font-jakarta text-sm sm:text-base md:text-lg text-[#9A9A9A] font-semibold leading-relaxed max-w-md py-1 md:py-2">
                  {item.description}
                </p>

                {/* Numbered Sub-list */}
                {item.list && item.list.length > 0 && (
                  <div className="flex flex-col gap-3 md:gap-3.5 pt-2 md:pt-3 w-full">
                    {item.list.slice(0, 5).map((subTitle, subIdx) => {
                      const subNumber = String(subIdx + 1).padStart(2, '0');
                      return (
                        <div
                          key={subIdx}
                          className="flex items-center gap-4 md:gap-5 pb-2 md:pb-2.5 border-b border-[#2D2D2D] w-full"
                        >
                          <span className="font-ibm-mono text-sm sm:text-base md:text-base text-dark-grey font-semibold select-none">
                            {subNumber}
                          </span>
                          <span className="font-bebas text-lg sm:text-xl md:text-2xl text-[#9A9A9A] tracking-wide uppercase leading-none">
                            {subTitle}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {/* Final element ends cleanly so the second the last item sticks, the entire 4-item stack scrolls away together */}
    </div>
  );
}

