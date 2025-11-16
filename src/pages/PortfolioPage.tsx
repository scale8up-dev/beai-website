import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ScrollReveal } from '../components/ScrollReveal';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import strategicDivorceImg from 'figma:asset/6d628b01b07f53f94a53f2dc1a14257265a2ec50.png';
import jvDirectoryImg from 'figma:asset/e140d4bc1bbaa0732a2f09b308bfac27b77f881f.png';
import castlrImg from 'figma:asset/526716b7215e7e465e441bddff05c46469bc2800.png';
import securRoomImg from 'figma:asset/60a105d9b0ebbed3c0d43cf45ec660a179cd7c94.png';
import prepForIndependenceImg from 'figma:asset/2a4edcceac6e7ba4c47bcd03ca73da2458e2687c.png';
import scale8upImg from 'figma:asset/585993eb048073908597f033499919a26ed91474.png';
import onyxFlowImg from 'figma:asset/a897fe10edd8cf83a0c1fa41f3f65759ca2c6ec5.png';

const allProjects = [
  {
    category: 'Web Solutions',
    title: 'Strategic Divorce Directory',
    description: 'With the Strategic Divorce Directory, you have one place to find the experts and resources that support you in taking control of today and building your tomorrow.',
    image: strategicDivorceImg,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    metrics: { completion: '100%', duration: '5 months', team: '7 people' },
  },
  {
    category: 'Web Solutions',
    title: 'JV Directory',
    description: 'The leading platform connecting joint venture partners, affiliates, and influencers in the self-improvement industry.',
    image: jvDirectoryImg,
    technologies: ['React', 'Express', 'MongoDB', 'Redis'],
    metrics: { completion: '100%', duration: '4 months', team: '6 people' },
  },
  {
    category: 'Mobile Apps',
    title: 'CastlR',
    description: 'CastlR connects your community with professional security teams through instant incident reporting, real-time alerts, and comprehensive documentation.',
    image: castlrImg,
    technologies: ['React Native', 'Firebase', 'Real-time', 'Maps API'],
    metrics: { completion: '100%', duration: '6 months', team: '8 people' },
  },
  {
    category: 'AI Projects',
    title: 'SecurRoom AI',
    description: 'Streamline your M&A workflow with AI-powered due diligence, document analysis, and automated redaction.',
    image: securRoomImg,
    technologies: ['Python', 'TensorFlow', 'NLP', 'React'],
    metrics: { completion: '95%', duration: '6 months', team: '8 people' },
  },
  {
    category: 'Web Solutions',
    title: 'FitAI Coach',
    description: 'Get hyper-personalized workout plans that adapt to your progress. Experience the precision of a personal trainer powered by intelligent AI.',
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMHRyYWluaW5nfGVufDF8fHx8MTc2MTgyMzE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['React', 'Node.js', 'MongoDB', 'AI'],
    metrics: { completion: '100%', duration: '4 months', team: '6 people' },
  },
  {
    category: 'Web Solutions',
    title: 'Envision HR 360',
    description: 'Empower your SMB with self-service HR resources, AI-powered assistance, and on-demand access to human expertise.',
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxociUyMGh1bWFuJTIwcmVzb3VyY2VzfGVufDF8fHx8MTc2MTgxMTE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'AI'],
    metrics: { completion: '100%', duration: '5 months', team: '7 people' },
  },
  {
    category: 'AI Projects',
    title: 'PrepForIndependence AI',
    description: 'Empowering families with essential life skills through AI-powered financial literacy, responsibility, and growth programs designed for real-life success.',
    image: prepForIndependenceImg,
    technologies: ['React', 'Python', 'AWS', 'ML'],
    metrics: { completion: '90%', duration: '7 months', team: '10 people' },
  },
  {
    category: 'AI Projects',
    title: 'Scale8UP AI',
    description: 'AI that finds and fixes your business\'s weakest link—so you can scale faster. Diagnoses bottlenecks and builds data-driven action plans.',
    image: scale8upImg,
    technologies: ['Next.js', 'AI', 'Stripe', 'Vercel'],
    metrics: { completion: '100%', duration: '3 months', team: '5 people' },
  },
  {
    category: 'Mobile Apps',
    title: 'OnyxFlow',
    description: 'Supercharge enterprise execution. Changes how businesses handle repetitive tasks, fragmented systems, and manual approvals for streamlined operations.',
    image: onyxFlowImg,
    technologies: ['React Native', 'Firebase', 'Redux'],
    metrics: { completion: '100%', duration: '5 months', team: '6 people' },
  },
  {
    category: 'AI Projects',
    title: 'Foreclosurebid AI',
    description: 'User-centered design solutions that create engaging and intuitive interfaces. Our designs combine aesthetics with functionality.',
    image: 'https://images.unsplash.com/photo-1583916011819-e4b81836bb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYXVjdGlvbnxlbnwxfHx8fDE3NjE4MjQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['Python', 'AI', 'Real Estate API', 'React'],
    metrics: { completion: '85%', duration: '8 months', team: '9 people' },
  },
  {
    category: 'Web Solutions',
    title: 'Analytics Dashboard Pro',
    description: 'Advanced data visualization and analytics platform that transforms complex data into actionable insights for business growth.',
    image: 'https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxODAwODAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
    metrics: { completion: '100%', duration: '4 months', team: '7 people' },
  },
];

const categories = ['All', 'AI Projects', 'Web Solutions', 'Mobile Apps'];

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '47+', label: 'Happy Clients' },
  { number: '98%', label: 'Success Rate' },
  { number: '25+', label: 'Team Members' },
];

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                Our Work
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl lg:text-5xl mb-6">
                Building the Future, One Project at a Time
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our portfolio of successful projects where we've helped businesses transform through innovative AI solutions and cutting-edge technology.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} variant="scaleIn" delay={index * 0.1}>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-100">
                  <div className="text-4xl lg:text-5xl mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <p className="text-gray-700 text-sm">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={`${selectedCategory}-${index}`} variant="fadeUp" delay={index * 0.05}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="px-6 py-2.5 bg-white text-blue-700 rounded-full flex items-center gap-2 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {project.category}
                        </Badge>
                      </div>
                      
                      <h3 className="mb-3 group-hover:text-blue-700 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-sm text-blue-700 mb-1">{project.metrics.completion}</div>
                          <div className="text-xs text-gray-500">Complete</div>
                        </div>
                        <div>
                          <div className="text-sm text-blue-700 mb-1">{project.metrics.duration}</div>
                          <div className="text-xs text-gray-500">Duration</div>
                        </div>
                        <div>
                          <div className="text-sm text-blue-700 mb-1">{project.metrics.team}</div>
                          <div className="text-xs text-gray-500">Team Size</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Client Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-8 h-8 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6">
                  "Business Evolution AI transformed our vision into reality. Their expertise in AI and dedication to excellence resulted in a product that exceeded our expectations."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white">
                    JD
                  </div>
                  <div className="text-left">
                    <div className="text-gray-900">Jennifer Davis</div>
                    <div className="text-sm text-gray-600">CEO, TechStart Inc</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-3xl lg:text-4xl mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's work together to bring your vision to life with cutting-edge AI solutions and innovative technology.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
