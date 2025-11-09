import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl mb-6">
              Ready to Transform Your Business?
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI-powered solutions and innovative technology can help you achieve your business goals and drive measurable results.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
              
              <Link to="/services">
                <button className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors border-2 border-white">
                  Explore Services
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-blue-400/30 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl mb-2">24/7</div>
                <p className="text-sm text-blue-100">Support Available</p>
              </div>
              <div>
                <div className="text-3xl mb-2">100%</div>
                <p className="text-sm text-blue-100">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-3xl mb-2">Fast</div>
                <p className="text-sm text-blue-100">Project Delivery</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
