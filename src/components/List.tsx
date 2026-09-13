'use client';

import React from 'react';

export interface ListItemData {
  id?: string;
  title: string;
  description: string;
  list?: string[];
}

export interface ListProps {
  data?: ListItemData[];
  className?: string;
}

export default function List({ data = [], className = '' }: ListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || data.length <= 1) return;

    let rafId: number | null = null;

    const update = () => {
      const isDesktop = window.innerWidth >= 768;
      const initialClearance = isDesktop ? 96 : 72;
      const step = isDesktop ? 95 : 70;

      const lastIndex = data.length - 1;
      const lastItem = itemRefs.current[lastIndex];
      if (!lastItem || !container) return;

      const containerRect = container.getBoundingClientRect();
      const stickyTopLast = initialClearance + lastIndex * step;
      const heightLast = lastItem.offsetHeight;

      // When container bottom reaches (stickyTopLast + heightLast), native sticky begins pushing lastItem upward by deltaLast
      const deltaLast = Math.max(0, (stickyTopLast + heightLast) - containerRect.bottom);

      // Synchronize all items so all headers scroll away together in locked formation when scrolling past the section
      for (let i = 0; i < data.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const stickyTop_i = initialClearance + i * step;
        const height_i = el.offsetHeight;
        const nativeDelta_i = Math.max(0, (stickyTop_i + height_i) - containerRect.bottom);

        // Clamp to Math.max(0, ...) so items never shift downwards
        const neededShift = Math.max(0, deltaLast - nativeDelta_i);

        if (neededShift > 0.01) {
          el.style.transform = `translate3d(0, -${neededShift}px, 0)`;
        } else {
          el.style.transform = '';
        }
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    update();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data.length]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col pt-10 md:pt-14 pb-0 ${className}`}
    >
      {data.map((item, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');

        return (
          <div
            key={item.id || index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="w-full flex flex-col sticky bg-dark pt-0 pb-12 md:pb-20 top-[var(--sticky-top-mobile)] md:top-[var(--sticky-top-desktop)] transform-gpu will-change-transform"
            style={{
              '--sticky-top-mobile': `calc(72px + ${index * 70}px)`,
              '--sticky-top-desktop': `calc(96px + ${index * 95}px)`,
              zIndex: 10 + index * 10,
            } as React.CSSProperties}
          >
            {/* Full-width HR line at the top of each item matching nav px-4 padding */}
            <div className="w-full h-[1px] bg-[#383838] mb-4 md:mb-5" />

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
                  {item.title}
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
                <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#9A9A9A] font-semibold leading-relaxed max-w-md py-1 md:py-3">
                  {item.description}
                </p>

                {/* Numbered Sub-list */}
                {item.list && item.list.length > 0 && (
                  <div className="flex flex-col gap-4 pt-3 md:pt-4 w-full">
                    {item.list.map((subTitle, subIdx) => {
                      const subNumber = String(subIdx + 1).padStart(2, '0');
                      return (
                        <div key={subIdx} className="flex flex-col gap-2.5 w-full">
                          <div className="flex items-center gap-5 md:gap-6">
                            <span className="font-ibm-mono text-base sm:text-lg md:text-xl text-dark-grey font-semibold select-none">
                              {subNumber}
                            </span>
                            <span className="font-bebas text-xl sm:text-2xl md:text-3xl text-[#9A9A9A] tracking-wide uppercase leading-none">
                              {subTitle}
                            </span>
                          </div>
                          {/* HR line under each inner item matching nav px-4 padding */}
                          <div className="h-[1px] bg-[#2D2D2D] w-full" />
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

