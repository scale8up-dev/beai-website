import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ScrollReveal } from '../components/ScrollReveal';
import { Brain, Target, TrendingUp, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceDetails = [
  {
    id: 'ai-strategy',
    icon: Target,
    title: 'AI Strategy',
    description: 'We identify where AI can create meaningful value, define the priorities, and turn them into a practical roadmap your team can execute.',
    image: 'https://images.unsplash.com/photo-1717501219716-b93a67d2f7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTgxMzUzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'AI Opportunity Discovery',
      'Prioritized AI Roadmaps',
      'AI Strategy Consulting',
      'Transformation Planning',
      'Product and Workflow Definition',
    ],
    stats: { start: 'Discovery', plan: 'Roadmap', outcome: 'Alignment' },
  },
  {
    id: 'ai-development',
    icon: Brain,
    title: 'AI Development',
    description: 'We build custom software and practical AI systems that connect your tools, reduce manual work, and support better decisions.',
    image: 'https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjE3OTYzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Custom AI Software',
      'Web and Mobile Products',
      'Workflow Automations',
      'Platform Integrations',
      'Testing and Deployment',
    ],
    stats: { delivery: '4-12 weeks', team: 'Lean', approach: 'Agile' },
  },
  {
    id: 'growth-systems',
    icon: TrendingUp,
    title: 'Marketing & Growth Systems',
    description: 'We build and manage the connected marketing engine behind predictable growth, from demand generation and lead capture through nurture, sales conversion, attribution, and reporting.',
    image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhfGVufDF8fHx8MTc2MTc2NDg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'GoHighLevel Setup and Optimization',
      'Lead Generation and Paid Media',
      'Funnels and Conversion Journeys',
      'CRM and Pipeline Automation',
      'Email and SMS Nurture',
      'Conversion Rate Optimization',
      'Attribution, Dashboards, and Reporting',
    ],
    stats: { platform: 'GHL + CRM', journey: 'Lead to Sale', focus: 'ROI' },
  },
  {
    id: 'client-success',
    icon: Users,
    title: 'Client Success',
    description: 'We stay accountable after launch with implementation support, proactive optimization, and clear ownership of the work ahead.',
    image: 'https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxNzI0ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Guided Implementation',
      'Ongoing Technical Support',
      'Performance Optimization',
      'Account Management',
      'Continuous Improvement',
    ],
    stats: { support: 'Ongoing', cadence: 'Proactive', focus: 'Optimization' },
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We start by understanding your business goals, challenges, and requirements.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'We develop a comprehensive strategy and roadmap for your project.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'A focused team builds, integrates, and tests the solution in short, visible delivery cycles.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing support and optimization.',
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                Our Services
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Four Divisions. One Connected Growth Engine.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                AI strategy, AI development, marketing and growth systems, and client success work together under one roof so ideas move into execution without handoff gaps.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24 max-w-7xl mx-auto">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <ScrollReveal 
                    variant={isEven ? 'slideLeft' : 'slideRight'}
                    className={!isEven ? 'lg:col-start-2' : ''}
                  >
                    <div className="relative group">
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Content */}
                  <ScrollReveal 
                    variant={isEven ? 'slideRight' : 'slideLeft'}
                    className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                  >
                    <div>
                      <h2 className="text-3xl lg:text-4xl mb-4">{service.title}</h2>
                      <p className="text-gray-600 mb-6 text-lg">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-blue-700" />
                            </div>
                            <p className="text-gray-700">{feature}</p>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        {Object.entries(service.stats).map(([key, value], idx) => (
                          <div key={idx}>
                            <div className="text-2xl mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {value}
                            </div>
                            <p className="text-xs text-gray-600 capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl mb-4">Our Process</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A clear delivery path that keeps business goals, product decisions, software, and growth in the same conversation.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <ScrollReveal key={index} variant="fadeUp" delay={index * 0.1}>
                  <div className="relative">
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                      <div className="text-6xl mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent opacity-20">
                        {item.step}
                      </div>
                      <h3 className="mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Arrow for desktop */}
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-8 h-8 text-blue-300" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="relative p-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center text-white">
                  <h2 className="text-3xl lg:text-4xl mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Tell us where the business needs to move. We’ll help define the right strategy, system, and growth path.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
                    >
                      View Our Work
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
