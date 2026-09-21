'use client';

import React from 'react';
import Image from 'next/image';

export interface ProjectData {
  id?: string;
  _id?: string;
  year: string;
  tag: string;
  title?: string;
  name?: string;
  link: string;
  imageLink?: string;
  image?: string;
}

export interface ProjectProps {
  year?: string;
  tag?: string;
  title?: string;
  link?: string;
  imageLink?: string;
  project?: ProjectData;
}

function ArrowUpRight({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Project({
  year,
  tag,
  title,
  link,
  imageLink,
  project,
}: ProjectProps) {
  const itemYear = year || project?.year || '';
  const itemTag = tag || project?.tag || '';
  const itemTitle = title || project?.title || project?.name || '';
  const itemLink = link || project?.link || '#';
  const itemImage = imageLink || project?.imageLink || project?.image || '';

  return (
    <a
      href={itemLink}
      target={itemLink.startsWith('http') ? '_blank' : '_self'}
      rel={itemLink.startsWith('http') ? 'noopener noreferrer' : undefined}
      data-cursor-text="VISIT PROJECT"
      className="group w-full block py-8 sm:py-10 md:py-4 sm:md:py-5 md:hover:py-12 border-b border-dark/20 text-dark transition-all duration-300 ease-out md:hover:bg-dark rounded-none"
    >
      {/* MOBILE / SMALL SCREEN LAYOUT (< md:) */}
      <div className="flex flex-col gap-4 sm:gap-5 md:hidden w-full">
        {/* Title top left & ArrowUpRight at the end */}
        <div className="flex items-center justify-between gap-4 w-full text-dark pb-1">
          <h3 className="font-bebas text-4xl sm:text-5xl leading-none uppercase text-dark">
            {itemTitle}
          </h3>
          <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-dark" />
        </div>

        {/* Picture underneath */}
        {itemImage && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-dark/5 shadow-md my-1 sm:my-2">
            <Image
              src={itemImage}
              alt={itemTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) calc(100vw - 32px), 350px"
            />
          </div>
        )}

        {/* Date and tag */}
        <div className="font-ibm-mono text-xs sm:text-sm font-semibold text-[#666666] uppercase tracking-wider pt-1 sm:pt-2">
          <span>{itemYear}</span>
          {itemYear && itemTag && <span>, </span>}
          <span>{itemTag}</span>
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= md:) */}
      <div className="hidden md:flex flex-row items-center justify-between gap-8 w-full">
        {/* Date, Tag Column */}
        <div className="w-56 lg:w-72 shrink-0 flex flex-col lg:flex-row items-start lg:items-center gap-0.5 lg:gap-1.5 font-ibm-mono text-xs sm:text-sm font-semibold text-[#666666] group-hover:text-[#9A9A9A] uppercase tracking-wider whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-6">
          <span>{itemYear}</span>
          {itemTag && (
            <>
              <span className="hidden lg:inline">,</span>
              <span className="whitespace-nowrap">{itemTag}</span>
            </>
          )}
        </div>

        {/* Title & Far-Right Hover Thumbnail Image (NO ARROWS ON DESKTOP) */}
        <div className="flex-1 flex items-center justify-between gap-4 w-full">
          {/* Title */}
          <h3 className="font-bebas text-4xl lg:text-6xl leading-none uppercase text-dark group-hover:text-light transition-colors duration-300 whitespace-nowrap shrink-0">
            {itemTitle}
          </h3>

          {/* Desktop Hover Thumbnail Image - positioned all the way to the right */}
          {itemImage && (
            <div className="relative w-0 h-0 md:group-hover:w-52 md:group-hover:h-24 lg:group-hover:w-64 lg:group-hover:h-28 rounded-sm md:rounded overflow-hidden shrink-0 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out shadow-2xl group-hover:-translate-x-6">
              <Image
                src={itemImage}
                alt={itemTitle}
                width={350}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
