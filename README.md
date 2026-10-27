
  # Business Evolution AI Website

  This is a code bundle for Business Evolution AI Website. The original project is available at https://www.figma.com/design/shFETtLoAWOeimwmhvb9Hu/Business-Evolution-AI-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Featured testimonials

Edit quotes and attribution in `src/data/testimonials.json`. Entries appear in
file order; move an entry within the array to reorder it. These testimonials
are repository-managed, not part of the admin CMS.

The standalone `TestimonialsSection` is placed after Projects in
`src/app/page.tsx`. Move its `<TestimonialsSection />` line to change the
section's homepage position without changing the component or quote data.
