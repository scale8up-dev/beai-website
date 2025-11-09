import { Brain, Globe, Smartphone, Palette, Cloud, TrendingUp, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'Leverage the power of artificial intelligence with cutting-edge machine learning and NLP solutions.',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom web solutions that combine stunning design with powerful, scalable functionality.',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design solutions that create engaging and intuitive interfaces.',
    gradient: 'from-indigo-600 to-blue-600',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Streamline operations with cloud solutions and DevOps practices for better efficiency.',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    icon: TrendingUp,
    title: 'Machine Learning',
    description: 'Advanced ML solutions for data-driven decisions and predictive analytics.',
    gradient: 'from-cyan-600 to-blue-600',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to drive your business forward and deliver measurable results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.05}>
                <div className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="flex items-center text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm mr-2">Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
