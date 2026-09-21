'use client';

import React, { useState, useCallback } from 'react';
import Avatar from 'boring-avatars';

interface Review {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    id: 'susan',
    name: 'Susan Ann Marion, M.S.',
    role: 'Founder, Prep For Independence',
    quote:
      'The team at Business Evolution AI was incredible to work with. Domingo’s leadership, Hamza’s technical brilliance, Greg’s responsiveness, and Michael’s GoHighLevel mastery made everything come together beautifully. I couldn’t have asked for a better team.',
  },
  {
    id: 'mardi',
    name: 'Mardi Winder',
    role: 'Founder, Positive Communication Systems',
    quote:
      'Working with the team has been simple, easy, and such a positive experience. They quickly understood what I wanted and managed the project ahead of schedule with custom features and automation that enhanced our user experience.',
  },
  {
    id: 'michael',
    name: 'Michael Evors',
    role: 'Owner, Prime Age Fit',
    quote:
      'They took my idea for an AI-driven fitness and nutrition app and turned it into reality. The entire team was professional, met every deadline, stayed on budget, and delivered fantastic work. They are the real deal.',
  },
];

const ROTATION_INTERVAL = 5000; // 5 seconds per review
const AVATAR_COLORS = ['#111111', '#0CA3D6', '#E0DED9', '#5D5D5D', '#454545'];

export default function FaqReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToReview = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 200);
    },
    [currentIndex, isTransitioning]
  );

  const nextReview = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
      setIsTransitioning(false);
    }, 200);
  }, []);

  const currentReview = REVIEWS[currentIndex];

  return (
    <div
      className="w-full max-w-md text-left flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Label and Progress Bars */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-ibm-mono text-[10px] sm:text-xs uppercase tracking-widest text-dark/50 font-medium">
            Client Reviews
          </span>
        </div>

        {/* 5-second progress indicator bars */}
        <div className="flex items-center gap-1.5">
          {REVIEWS.map((review, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={review.id}
                type="button"
                onClick={() => goToReview(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className="group relative h-1 rounded-full overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none"
                style={{
                  width: isActive ? '28px' : '12px',
                  backgroundColor: 'rgba(17, 17, 17, 0.12)',
                }}
              >
                {isActive && (
                  <span
                    key={`bar-${currentIndex}`}
                    onAnimationEnd={nextReview}
                    className="absolute inset-0 bg-accent rounded-full origin-left"
                    style={{
                      animation: `reviewProgress ${ROTATION_INTERVAL}ms linear forwards`,
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonial Quote */}
      <div className="min-h-[75px] sm:min-h-[65px] flex items-start">
        <blockquote
          className={`font-jakarta text-xs sm:text-sm md:text-[15px] font-normal sm:font-medium text-dark/90 leading-relaxed transition-all duration-200 ease-out transform ${
            isTransitioning
              ? 'opacity-0 -translate-y-1.5'
              : 'opacity-100 translate-y-0'
          }`}
        >
          &ldquo;{currentReview.quote}&rdquo;
        </blockquote>
      </div>

      {/* Reviewer Meta */}
      <div
        className={`flex items-center gap-2.5 mt-3 sm:mt-3.5 transition-all duration-200 ease-out transform ${
          isTransitioning
            ? 'opacity-0 translate-y-1.5'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Boring Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 select-none shadow-xs ring-1 ring-dark/10 flex items-center justify-center">
          <Avatar
            size={32}
            name={currentReview.name}
            variant="beam"
            colors={AVATAR_COLORS}
          />
        </div>

        {/* Name and Designation */}
        <div className="flex flex-col text-left overflow-hidden">
          <span className="font-jakarta font-semibold text-dark text-xs sm:text-sm leading-tight truncate">
            {currentReview.name}
          </span>
          <span className="font-jakarta text-[11px] sm:text-xs text-grey font-normal mt-0.5 truncate">
            {currentReview.role}
          </span>
        </div>
      </div>

      {/* CSS Keyframe for linear progress indicator */}
      <style jsx>{`
        @keyframes reviewProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
