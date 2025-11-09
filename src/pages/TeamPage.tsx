import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Plus } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ScrollReveal } from '../components/ScrollReveal';

const teamMembers = [
  {
    name: 'Sienna Hewitt',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTcwMzg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
  },
  {
    name: 'Hamza Adnan',
    role: 'Engineering Manager',
    image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE3NDYxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Lead engineering teams at Netflix, Pitch, and Protocol Labs.',
  },
  {
    name: 'Caitlyn King',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2MTgwNzE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Founding design team at Figma. Former Pleo, Stripe, and Tile.',
  },
  {
    name: 'Owen Garcia',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MTgxNzczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Former frontend dev for Linear, Coinbase, and Postscript.',
  },
  {
    name: 'Natalie Wilson',
    role: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxODA1NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Built scalable systems at Google, Amazon, and Microsoft.',
  },
  {
    name: 'Marcus Thompson',
    role: 'AI Researcher',
    image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNzQ4NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Machine learning expert with PhD from Stanford. Published research in NLP.',
  },
  {
    name: 'Sophia Chen',
    role: 'UX Researcher',
    image: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NjE4MjQ0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'User research specialist focused on creating data-driven experiences.',
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
