import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Plus } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ScrollReveal } from '../components/ScrollReveal';
import domingoImg from 'figma:asset/c1702c3bbf4b11c549686258235545d1fd3b9704.png';
import hamzaImg from 'figma:asset/009922434533b2c2eb51c901a0d68dac8999e920.png';
import gregImg from 'figma:asset/53da58e197f5b7fc2785eb6c426e642485020f99.png';

const teamMembers = [
  {
    name: 'Domingo M. Silvas III',
    role: 'CEO & Founder',
    image: domingoImg,
    bio: 'Visionary entrepreneur who has built and scaled ventures to eight-figure valuations across global markets.',
  },
  {
    name: 'Hamza Adnan',
    role: 'CTO and Founder',
    image: hamzaImg,
    bio: 'Machine Learning Engineer expert in GenAI, LLMs, and MLOps. AWS Solutions Architect building scalable AI-powered systems.',
  },
  {
    name: 'Gregory Vaughn',
    role: 'COO - Director of Operations',
    image: gregImg,
    bio: 'Over 30 years of leadership in large-scale project management, ensuring operational excellence and scalable AI solutions with measurable impact.',
  },
];

export function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                We're hiring!
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl lg:text-5xl mb-6">
                We are the people who make up Business Evolution AI
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our philosophy is simple; hire great people and give them the resources and support to do their best work.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.05}>
                <div className="group">
                  <div className="relative mb-5 overflow-hidden rounded-2xl bg-gray-100">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-1">{member.name}</h3>
                  <p className="text-blue-700 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Join Us Card */}
            <ScrollReveal variant="fadeUp" delay={teamMembers.length * 0.05}>
              <div className="group h-full flex flex-col">
                <div className="relative mb-5 overflow-hidden rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 aspect-[3/4] flex items-center justify-center transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-50">
                  <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="mb-1">Join our team</h3>
                <p className="text-blue-700 mb-3">Open Positions</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We're always looking for talented individuals to join our growing team.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl mb-4">Our Culture & Values</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The principles that guide how we work together and serve our clients
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="mb-3">Innovation First</h3>
                  <p className="text-gray-600">
                    We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.2}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    We believe in the power of teamwork and work closely with our clients as partners.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    We're committed to delivering the highest quality in everything we do.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-3xl lg:text-4xl mb-6">Want to join us?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We're always on the lookout for talented individuals who share our passion for innovation and excellence.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                View Open Positions
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
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
