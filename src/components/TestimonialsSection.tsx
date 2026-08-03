import { Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const testimonials = [
  {
    quote: 'The team at Business Evolution AI was incredible to work with. Domingo’s leadership, Hamza’s technical brilliance, Greg’s responsiveness, and Michael’s GoHighLevel mastery made everything come together beautifully. I couldn’t have asked for a better team.',
    name: 'Susan Ann Marion, M.S.',
    role: 'Founder of Prep For Independence',
    rating: 5,
    initials: 'SM',
  },
  {
    quote: 'Working with the team has been simple, easy, and such a positive experience. They quickly understood what I wanted, suggested possible options, and helped me to see the full potential of the website. The Business Evolution AI team is quick to respond to questions and has managed the project ahead of schedule and with features that enhance the user-experience. As a non-tech person, I was worried about working directly with a development team, but they are absolutely fantastic. Everything is explained in detail, and they are very open to answering questions, listening to my ideas, and implementing them in the project. I would highly recommend the Business Evolution AI team to anyone looking for a custom designed website that offers automation and unique features and options.',
    name: 'Mardi Winder',
    role: 'Be Your Success · Positive Communication Systems, LLC',
    rating: 5,
    initials: 'MW',
    details: ['www.poscs.com', 'www.divorcecoach4women.com'],
  },
  {
    quote: 'Before meeting Domingo and the team, I had no knowledge of how to implement my idea at creating an AI driven fitness and nutrition app. I wanted to create something unique to the market and for people over 40. There are a ton of fitness apps out there, but none that do all that our app does. After the initial meeting with Domingo, I knew this was the company that could make this happen. The entire team has been very professional. They have always met deadlines and stayed exactly on budget. Their work is fantastic and because of them, my idea has become a reality. To anyone checking these guys out, they are the real deal and can most definitely help you to bring your vision to reality.',
    name: 'Michael Evors',
    role: 'Owner, Prime Age Fit, LLC',
    rating: 5,
    initials: 'ME',
    details: ['AI-driven fitness and nutrition app'],
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from the founders who trusted us to turn their ideas into working products and systems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} variant="fadeUp" delay={index * 0.1}>
              <div className="p-8 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    {testimonial.details?.map((detail) => (
                      <p key={detail} className="text-xs text-gray-500 mt-1">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>


      </div>
    </section>
  );
}
