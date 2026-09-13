'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface FaqItemProps {
  question: string;
  answer: string;
  index?: number;
  isLast?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({
  question,
  answer,
  index,
  isLast = false,
  isOpen,
  onToggle,
}: FaqItemProps) {
  const baseAngleRef = useRef(0);
  const rotationRef = useRef(0);
  const wasDirectlyClickedRef = useRef(false);
  const prevIsOpenRef = useRef(isOpen);

  if (prevIsOpenRef.current !== isOpen) {
    if (!prevIsOpenRef.current && isOpen) {
      // Opening: store current closed base angle, add 225 deg (half spin + 45 deg to land as an x)
      baseAngleRef.current = rotationRef.current;
      rotationRef.current += 225;
    } else if (prevIsOpenRef.current && !isOpen) {
      // Closing
      if (wasDirectlyClickedRef.current) {
        // Direct click to close: reverse half spin (-225 deg) back to base angle
        rotationRef.current = baseAngleRef.current;
      } else {
        // Closed because another FAQ opened: minimum 45 deg step forward (+45 deg to land as a +)
        rotationRef.current = baseAngleRef.current + 270;
      }
      wasDirectlyClickedRef.current = false;
    }
    prevIsOpenRef.current = isOpen;
  }

  const handleButtonClick = () => {
    wasDirectlyClickedRef.current = true;
    onToggle();
  };

  const rotation = rotationRef.current;

  return (
    <div
      className={`w-full border-t border-dark/15 ${
        isLast ? 'border-b' : ''
      } transition-colors duration-300`}
    >
      <button
        type="button"
        data-cursor-text={isOpen ? 'CLOSE' : 'OPEN'}
        onClick={handleButtonClick}
        className="w-full grid grid-cols-12 items-center gap-2 text-left group cursor-pointer focus:outline-none transition-all duration-300 py-2 sm:py-2.5"
      >
        {/* Numbering on Far Left (Col 1-2) */}
        <div className="col-span-2 md:col-span-2 text-left">
          {index !== undefined && (
            <span className="font-ibm-mono text-xs sm:text-sm text-dark/40 font-medium select-none">
              ({String(index).padStart(2, '0')})
            </span>
          )}
        </div>

        {/* Question Title Container Centered, Text Left-Aligned (Col 3-10) */}
        <div className="col-span-8 md:col-span-8 flex justify-center">
          <span className="font-jakarta text-sm sm:text-base md:text-lg font-semibold text-dark block text-left w-full max-w-xl">
            {question}
          </span>
        </div>

        {/* Toggle Button on Far Right (Col 11-12) */}
        <div className="col-span-2 md:col-span-2 flex justify-end">
          <div
            className={`text-dark shrink-0 transition-transform duration-400 ease-out ${
              isOpen
                ? 'translate-x-0'
                : 'group-hover:-translate-x-3 sm:group-hover:-translate-x-4'
            }`}
          >
            <div
              className="inline-flex items-center justify-center transition-transform duration-400 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <Image
                src="/misc/plus.svg"
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 select-none"
              />
            </div>
          </div>
        </div>
      </button>

      {/* Accordion Answer Content Container Centered, Text Left-Aligned (Col 3-10) */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pt-1 pb-4 sm:pb-5' : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden grid grid-cols-12 gap-2">
          <div className="col-span-2 md:col-span-2" />
          <div className="col-span-8 md:col-span-8 flex justify-center">
            <p className="font-jakarta text-sm sm:text-base md:text-lg font-semibold text-grey leading-relaxed text-left w-full max-w-xl">
              {answer}
            </p>
          </div>
          <div className="col-span-2 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}
