'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import testimonials from '@/data/testimonials.json';
import styles from './FaqReviews.module.css';

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function subscribeToVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getVisible = () => document.visibilityState === 'visible';
const serverReducedMotion = () => true;
const serverVisible = () => false;

export default function FaqReviews() {
  const [{ currentIndex, direction }, setSlide] = useState({ currentIndex: 0, direction: 1 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, serverReducedMotion);
  const isVisible = useSyncExternalStore(subscribeToVisibility, getVisible, serverVisible);
  const review = testimonials[currentIndex];
  const isRotating = isPlaying && !reducedMotion && !isHovered && !isFocused && isInView && isVisible;
  // Give longer quotes more reading time; every manual selection restarts the timer.
  const readingTime = Math.max(8000, review.quote.split(/\s+/).length * 220);
  const controlClasses = 'flex h-11 w-11 items-center justify-center rounded-full border border-dark/30 text-dark transition-colors hover:bg-dark hover:text-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark';

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.25 });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRotating) return;
    const timer = window.setTimeout(() => {
      setSlide((slide) => ({ currentIndex: (slide.currentIndex + 1) % testimonials.length, direction: 1 }));
    }, readingTime);
    return () => window.clearTimeout(timer);
  }, [currentIndex, isRotating, readingTime]);

  function advance(step: number) {
    setSlide((slide) => ({ currentIndex: (slide.currentIndex + step + testimonials.length) % testimonials.length, direction: step }));
  }

  return (
    <div
      ref={container}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="mx-auto w-full max-w-4xl text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}
    >
      <div id="client-testimonial" aria-live={isRotating ? 'off' : 'polite'} aria-atomic="true" className="grid overflow-hidden" style={{ '--review-direction': direction } as CSSProperties}>
        {testimonials.map((item, index) => (
          <figure key={item.id} aria-hidden={index !== currentIndex} inert={index !== currentIndex} className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}>
            <div className="font-bebas text-3xl leading-none md:text-4xl">{item.company}</div>
            <blockquote className="mt-4 font-jakarta text-lg font-medium leading-relaxed md:mt-5 md:text-2xl md:leading-relaxed">
              <p>&ldquo;{item.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-5 flex flex-col gap-1 font-jakarta text-sm md:text-base">
              <span className="font-semibold">{item.name}</span>
              <span className="text-grey">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div role="group" aria-label="Choose a client testimonial" className="mt-5 flex flex-wrap items-center justify-center gap-2 md:mt-6">
        <button type="button" aria-label="Previous testimonial" aria-controls="client-testimonial" className={controlClasses} onClick={() => advance(-1)}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        {testimonials.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show testimonial from ${item.name}`}
            aria-pressed={index === currentIndex}
            aria-controls="client-testimonial"
            className="flex h-11 w-8 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
            onClick={() => setSlide({ currentIndex: index, direction: index >= currentIndex ? 1 : -1 })}
          >
            <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === currentIndex ? 'bg-dark' : 'border border-dark/50 bg-transparent'}`} />
          </button>
        ))}
        <button type="button" aria-label="Next testimonial" aria-controls="client-testimonial" className={controlClasses} onClick={() => advance(1)}>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        {!reducedMotion && (
          <button type="button" aria-label={isPlaying ? 'Pause automatic testimonials' : 'Play automatic testimonials'} aria-controls="client-testimonial" className={controlClasses} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
