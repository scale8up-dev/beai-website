
  # Business Evolution AI Website

  This is a code bundle for Business Evolution AI Website. The original project is available at https://www.figma.com/design/shFETtLoAWOeimwmhvb9Hu/Business-Evolution-AI-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Featured testimonials

Edit quotes and attribution in `src/data/testimonials.json`. The first entry is
shown initially; visitors can select the other reviews manually. Move an entry
within the array to reorder it. These testimonials
are repository-managed, not part of the admin CMS.

The standalone `TestimonialsSection` is placed directly after the hero in
`src/app/page.tsx`. Move its `<TestimonialsSection />` line to change the
section's homepage position without changing the component or quote data.
Work and Case Studies link to the section at `/#testimonials`.
