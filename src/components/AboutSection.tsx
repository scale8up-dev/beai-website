import { ImageWithFallback } from './figma/ImageWithFallback';
import { Target, Users, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/70 via-sky-50/50 to-cyan-50/70 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-300 rounded-full opacity-25 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-300 rounded-full opacity-25 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
              <span className="text-sm">About Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-4">
              Empowering Businesses Through 
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Technology Innovation</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image Grid */}
          <ScrollReveal variant="slideLeft">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBidXNpbmVzc3xlbnwxfHx8fDE3NjA0OTU0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="AI Technology"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-600 p-6 text-white shadow-xl">
                  <div className="text-4xl mb-2">5+</div>
                  <p className="text-sm opacity-90">Years of Excellence</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-6 text-white shadow-xl">
                  <div className="text-4xl mb-2">100%</div>
                  <p className="text-sm opacity-90">Client Satisfaction</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758691737387-a89bb8adf768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MDQzMDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Team Collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal variant="slideRight">
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 mb-6 text-lg">
                At Business Evolution AI, we are passionate about transforming businesses through cutting-edge technology solutions. Our team of experts combines creativity with technical excellence to deliver exceptional results.
              </p>
              <p className="text-gray-600 mb-8">
                With years of experience in the software industry, we understand the unique challenges businesses face in the digital age. Our comprehensive suite of services is designed to help you stay ahead of the competition and achieve your business goals.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 rounded-xl border-2 border-sky-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                      50+
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Projects Delivered</p>
                </div>

                <div className="p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                      25+
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Expert Team Members</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="group p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl border-2 border-sky-100 hover:border-sky-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-gray-900">Expert Team</h3>
              <p className="text-sm text-gray-600">
                Diverse technical expertise across multiple technologies and industries
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="group p-6 bg-gradient-to-br from-cyan-50 to-white rounded-2xl border-2 border-cyan-100 hover:border-cyan-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-gray-900">Customer-Centric</h3>
              <p className="text-sm text-gray-600">
                Personalized attention with dedicated round-the-clock support
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="group p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl border-2 border-sky-100 hover:border-sky-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-gray-900">Innovation Driven</h3>
              <p className="text-sm text-gray-600">
                Cutting-edge solutions that keep you ahead of the competition
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
