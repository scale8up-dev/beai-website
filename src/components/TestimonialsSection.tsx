import testimonials from '@/data/testimonials.json';

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-theme="light"
      className="relative z-20 w-full bg-light px-4 py-12 text-dark md:py-20"
    >
      <h2
        id="testimonials-heading"
        className="font-bebas text-6xl uppercase leading-[0.85] tracking-wide md:text-7xl lg:text-8xl"
      >
        In our clients’ words
      </h2>

      <div className="mt-8 border-t border-dark/20 md:mt-12">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="m-0 grid gap-6 border-b border-dark/20 py-8 md:grid-cols-[1fr_2fr] md:gap-12 md:py-12"
          >
            <div className="font-bebas text-4xl leading-none sm:text-5xl">
              {testimonial.company}
            </div>
            <div className="min-w-0 max-w-4xl">
              <blockquote className="font-jakarta text-lg font-medium leading-relaxed md:text-xl lg:text-2xl">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1 font-jakarta text-sm md:mt-8 md:text-base">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-grey">{testimonial.role}</span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
