import { Badge } from './ui/badge';
import { ScrollReveal } from './ScrollReveal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import strategicDivorceImg from 'figma:asset/6d628b01b07f53f94a53f2dc1a14257265a2ec50.png';
import jvDirectoryImg from 'figma:asset/e140d4bc1bbaa0732a2f09b308bfac27b77f881f.png';
import castlrImg from 'figma:asset/526716b7215e7e465e441bddff05c46469bc2800.png';
import securRoomImg from 'figma:asset/60a105d9b0ebbed3c0d43cf45ec660a179cd7c94.png';
import prepForIndependenceImg from 'figma:asset/2a4edcceac6e7ba4c47bcd03ca73da2458e2687c.png';
import scale8upImg from 'figma:asset/585993eb048073908597f033499919a26ed91474.png';
import onyxFlowImg from 'figma:asset/a897fe10edd8cf83a0c1fa41f3f65759ca2c6ec5.png';

const projects = [
  {
    category: 'Web Solutions',
    title: 'Strategic Divorce Directory',
    description: 'With the Strategic Divorce Directory, you have one place to find the experts and resources that support you in taking control of today and building your tomorrow.',
    image: strategicDivorceImg,
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    category: 'Web Solutions',
    title: 'JV Directory',
    description: 'The leading platform connecting joint venture partners, affiliates, and influencers in the self-improvement industry.',
    image: jvDirectoryImg,
    tags: ['React', 'Express', 'MongoDB'],
  },
  {
    category: 'Mobile Apps',
    title: 'CastlR',
    description: 'CastlR connects your community with professional security teams through instant incident reporting, real-time alerts, and comprehensive documentation.',
    image: castlrImg,
    tags: ['React Native', 'Firebase', 'Real-time'],
  },
  {
    category: 'AI Projects',
    title: 'SecurRoom AI',
    description: 'AI-powered due diligence and document analysis for M&A workflows.',
    image: securRoomImg,
    tags: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    category: 'AI Projects',
    title: 'PrepForIndependence AI',
    description: 'Empowering families with essential life skills through AI-powered financial literacy, responsibility, and growth programs.',
    image: prepForIndependenceImg,
    tags: ['React', 'Python', 'AI'],
  },
  {
    category: 'Web Solutions',
    title: 'FitAI Coach',
    description: 'Hyper-personalized workout plans powered by intelligent AI.',
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMHRyYWluaW5nfGVufDF8fHx8MTc2MTgyMzE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'Node.js', 'AI'],
  },
  {
    category: 'Web Solutions',
    title: 'Envision HR 360',
    description: 'Self-service HR platform with AI-powered assistance.',
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxociUyMGh1bWFuJTIwcmVzb3VyY2VzfGVufDF8fHx8MTc2MTgxMTE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Vue.js', 'PostgreSQL', 'AI'],
  },
];

export function PortfolioSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful projects that showcase our expertise and commitment to excellence
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ScrollReveal key={index} variant="fadeUp" delay={index * 0.05}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-700/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ExternalLink className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="mb-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
