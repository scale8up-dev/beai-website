import FaqReviews from './FaqReviews';

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-theme="light"
      className="relative z-20 w-full scroll-mt-24 bg-light px-4 py-8 text-center text-dark md:py-12"
    >
      <h2
        id="testimonials-heading"
        className="font-bebas text-5xl uppercase leading-[0.9] tracking-wide md:text-6xl"
      >
        In our clients’ words
      </h2>

      <div className="mx-auto mt-6 max-w-5xl border-y border-dark/20 py-6 md:mt-8 md:py-8">
        <FaqReviews />
      </div>
    </section>
  );
}
