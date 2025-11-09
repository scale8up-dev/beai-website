import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ScrollReveal } from '../components/ScrollReveal';
import { Target, Zap, Users, Award, TrendingUp, Heart, Lightbulb, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { number: '50+', label: 'Projects Completed', icon: Award },
  { number: '47+', label: 'Happy Clients', icon: Users },
  { number: '98%', label: 'Success Rate', icon: TrendingUp },
  { number: '5+', label: 'Years Experience', icon: Clock },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that keep you ahead.',
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We build lasting partnerships based on trust, transparency, and exceptional results.',
  },
  {
    icon: Shield,
    title: 'Quality Excellence',
    description: 'We maintain the highest standards in everything we do, from code quality to project delivery and support.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'We believe in the power of teamwork and work closely with our clients as true partners in success.',
  },
];

const milestones = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'Started our journey with a vision to transform businesses through AI and technology.',
  },
  {
    year: '2020',
    title: 'First Major Client',
    description: 'Successfully delivered our first enterprise-level AI solution, setting the foundation for growth.',
  },
  {
    year: '2022',
    title: 'Team Expansion',
    description: 'Grew to 25+ team members across multiple specializations including AI, web, and mobile development.',
  },
  {
    year: '2024',
    title: '50+ Projects',
    description: 'Reached a milestone of 50+ successful projects with a 98% client satisfaction rate.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                About Us
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Building Tomorrow's Solutions Today
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're a team of passionate innovators dedicated to helping businesses evolve through cutting-edge AI and technology solutions.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={index} variant="scaleIn" delay={index * 0.1}>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <p className="text-sm text-gray-700">{stat.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Images */}
              <ScrollReveal variant="slideLeft">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjE3NjgyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Team Collaboration"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTc2MDc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Modern Workspace"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758518727600-2c5f48419eac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc2MTcyOTcyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Business Meeting"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjBicmFpbnN0b3JtfGVufDF8fHx8MTc2MTgyNDk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Creative Brainstorming"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal variant="slideRight">
                <div>
                  <h2 className="text-3xl lg:text-4xl mb-6">Our Story</h2>
                  <p className="text-gray-600 mb-6">
                    Founded in 2019, Business Evolution AI began with a simple yet powerful vision: to help businesses harness the transformative power of artificial intelligence and modern technology.
                  </p>
                  <p className="text-gray-600 mb-6">
                    What started as a small team of passionate technologists has grown into a full-service AI and software development company. We've had the privilege of working with businesses across various industries, helping them solve complex challenges and achieve their digital transformation goals.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Today, we're proud to be a trusted partner for companies looking to innovate, scale, and succeed in an increasingly digital world. Our commitment to excellence and client success drives everything we do.
                  </p>
                  
                  {/* Mission Box */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border-l-4 border-blue-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2">Our Mission</h3>
                        <p className="text-gray-600">
                          To empower businesses with innovative AI and technology solutions that drive growth, efficiency, and competitive advantage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl mb-4">Our Core Values</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The principles that guide our work and define who we are
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <ScrollReveal key={index} variant="fadeUp" delay={index * 0.1}>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-blue-700" />
                      </div>
                      <h3 className="mb-3">{value.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl mb-4">Our Journey</h2>
                <p className="text-lg text-gray-600">
                  Key milestones that have shaped our growth
                </p>
              </div>
            </ScrollReveal>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <ScrollReveal key={index} variant="slideLeft" delay={index * 0.1}>
                    <div className="relative flex gap-8 items-start">
                      {/* Year Marker */}
                      <div className="flex-shrink-0 w-16 md:w-32">
                        <div className="relative">
                          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg z-10 relative">
                            <span className="text-sm">{milestone.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                          <h3 className="mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal variant="slideLeft">
                <div>
                  <h2 className="text-3xl lg:text-4xl mb-6">Our Team & Culture</h2>
                  <p className="text-gray-600 mb-6">
                    We believe that great work comes from great people. Our team is our greatest asset, and we've built a culture that celebrates innovation, collaboration, and continuous learning.
                  </p>
                  <p className="text-gray-600 mb-8">
                    From flexible work arrangements to professional development opportunities, we invest in our team's growth and well-being. This commitment to our people translates directly into better outcomes for our clients.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg">Continuous Innovation</h3>
                        <p className="text-sm text-gray-600">
                          We encourage experimentation and learning from the latest technologies.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg">Collaborative Environment</h3>
                        <p className="text-sm text-gray-600">
                          Cross-functional teams working together to deliver exceptional results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg">Work-Life Balance</h3>
                        <p className="text-sm text-gray-600">
                          We support flexible working and prioritize our team's well-being.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slideRight">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYxODAwMzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Diverse Team"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-64 mt-8">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGZ1dHVyZXxlbnwxfHx8fDE3NjE3NDI4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Innovation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-3xl lg:text-4xl mb-6">
                Ready to Work with Us?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help transform your business with innovative AI and technology solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Get in Touch
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <a
                  href="/team"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Meet Our Team
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
