'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import testimonials from '@/data/testimonials.json';

export default function FaqReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const review = testimonials[currentIndex];
  const controlClasses = 'flex h-11 w-11 items-center justify-center rounded-full border border-dark/30 text-dark transition-colors hover:bg-dark hover:text-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark';

  return (
    <div className="mx-auto w-full max-w-5xl text-center">
      <div id="client-testimonial" aria-live="polite" aria-atomic="true">
        <figure className="m-0">
          <div className="font-bebas text-4xl leading-none sm:text-5xl">
            {review.company}
          </div>
          <blockquote className="mt-6 font-jakarta text-xl font-medium leading-relaxed sm:text-2xl md:mt-8 md:text-3xl md:leading-relaxed">
            <p>&ldquo;{review.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-6 flex flex-col gap-1 font-jakarta text-base md:mt-8 md:text-lg">
            <span className="font-semibold">{review.name}</span>
            <span className="text-grey">{review.role}</span>
          </figcaption>
        </figure>
      </div>

      <div role="group" aria-label="Choose a client testimonial" className="mt-8 flex items-center justify-center gap-3 md:mt-10">
        <button type="button" aria-label="Previous testimonial" aria-controls="client-testimonial" className={controlClasses} onClick={() => setCurrentIndex((currentIndex + testimonials.length - 1) % testimonials.length)}>
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
            onClick={() => setCurrentIndex(index)}
          >
            <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === currentIndex ? 'bg-dark' : 'border border-dark/50 bg-transparent'}`} />
          </button>
        ))}
        <button type="button" aria-label="Next testimonial" aria-controls="client-testimonial" className={controlClasses} onClick={() => setCurrentIndex((currentIndex + 1) % testimonials.length)}>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
