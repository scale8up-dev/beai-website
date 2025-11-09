import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle } from 'lucide-react';

export function TechSolutionsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-50/60 via-white/80 to-cyan-50/60 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-200 to-sky-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl mb-6">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-gray-600 mb-6">
              We offer end-to-end technology solutions that cover every aspect of your digital transformation journey. From initial consultation to final deployment, we're with you every step of the way.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experts brings together diverse skills and experiences to deliver solutions that are not just technically sound but also aligned with your business objectives.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Strategic planning and consulting</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Custom development and implementation</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Ongoing support and maintenance</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjA0NzczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Technology Solutions"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691737387-a89bb8adf768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MDQzMDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agile Development"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl mb-6">
              Agile Development Methodology
            </h2>
            <p className="text-gray-600 mb-6">
              We follow agile development practices to ensure rapid delivery of high-quality solutions. Our iterative approach allows for continuous improvement and adaptation to changing requirements.
            </p>
            <p className="text-gray-600 mb-6">
              Regular communication and transparent processes keep you informed about project progress and ensure your vision is realized exactly as intended.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Sprint-based development cycles</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Continuous integration and delivery</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0" />
                <p className="text-gray-700">Regular stakeholder updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
