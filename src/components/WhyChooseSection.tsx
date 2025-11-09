import { Lightbulb, Shield, HeadphonesIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  { number: '47+', label: 'Happy Clients' },
  { number: '50+', label: 'Projects' },
  { number: '2,500+', label: 'Hours Of Support' },
  { number: '25+', label: 'Team Members' },
];

const features = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay at the forefront of technology trends to deliver cutting-edge solutions that give you a competitive advantage.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Our rigorous quality assurance processes ensure that every solution we deliver meets the highest standards of excellence.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you, ensuring your business operations run smoothly around the clock.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/70 via-sky-50/50 to-cyan-50/70 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-sky-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-300 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">Why choose us?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with innovative solutions to deliver exceptional results for our clients
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} variant="scaleIn" delay={index * 0.1}>
              <div className="p-8 bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl text-center border border-sky-200 flex flex-col items-center justify-center h-[200px]">
                <div className="text-6xl lg:text-7xl mb-3 bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent leading-tight">
                  {stat.number}
                </div>
                <p className="text-gray-700 h-[48px] flex items-center justify-center">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
