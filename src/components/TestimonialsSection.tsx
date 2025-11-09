import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

const testimonials = [
  {
    quote: 'Business Evolution AI transformed our business with their innovative AI solutions. The team\'s expertise and dedication to our project exceeded all expectations.',
    name: 'Jennifer Davis',
    role: 'CEO, TechStart Inc',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTcwMzg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    quote: 'The web development team delivered beyond our expectations. Their attention to detail and commitment to quality is truly outstanding. Highly recommended!',
    name: 'Marcus Thompson',
    role: 'CTO, Digital Innovations',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE3NDYxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    quote: 'Working with them on our mobile app development was a game-changer. Their expertise in cross-platform development saved us significant time and resources.',
    name: 'Sarah Mitchell',
    role: 'Product Manager, AppVenture',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2MTgwNzE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
              Don't just take our word for it - hear from the businesses we've helped transform
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
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900 mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Badges */}
        <ScrollReveal variant="fadeUp" delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-6">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              <div className="text-2xl text-gray-400">Company A</div>
              <div className="text-2xl text-gray-400">Company B</div>
              <div className="text-2xl text-gray-400">Company C</div>
              <div className="text-2xl text-gray-400">Company D</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
