import FaqReviews from './FaqReviews';

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-theme="light"
      className="relative z-20 w-full scroll-mt-24 bg-light px-4 py-14 text-center text-dark md:py-20"
    >
      <h2
        id="testimonials-heading"
        className="font-bebas text-6xl uppercase leading-[0.85] tracking-wide md:text-7xl lg:text-8xl"
      >
        In our clients’ words
      </h2>

      <div className="mx-auto mt-8 max-w-6xl border-y border-dark/20 py-8 md:mt-12 md:py-12">
        <FaqReviews />
      </div>
    </section>
  );
}
