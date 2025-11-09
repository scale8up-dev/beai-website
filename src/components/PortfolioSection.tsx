import { Badge } from './ui/badge';
import { ScrollReveal } from './ScrollReveal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    category: 'AI Projects',
    title: 'SecurRoom AI',
    description: 'AI-powered due diligence and document analysis for M&A workflows.',
    image: 'https://images.unsplash.com/photo-1653038417367-8a090dd47717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlY3VyaXR5JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxODI0MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python', 'TensorFlow', 'NLP'],
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
  {
    category: 'AI Projects',
    title: 'Scale8UP AI',
    description: 'Scalable business growth platform powered by AI analytics.',
    image: 'https://images.unsplash.com/photo-1705234384679-119488a72a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMHNjYWxlfGVufDF8fHx8MTc2MTgyNDE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Next.js', 'AI', 'Analytics'],
  },
  {
    category: 'Mobile Apps',
    title: 'OnyxFlow',
    description: 'Cross-platform workflow automation mobile application.',
    image: 'https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZmxvdyUyMGF1dG9tYXRpb24lMjBwcm9jZXNzfGVufDF8fHx8MTc2MTgyNDE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Flutter', 'Firebase', 'GraphQL'],
  },
  {
    category: 'AI Projects',
    title: 'Foreclosurebid AI',
    description: 'Real estate auction platform with predictive analytics.',
    image: 'https://images.unsplash.com/photo-1583916011819-e4b81836bb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYXVjdGlvbnxlbnwxfHx8fDE3NjE4MjQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'Python', 'ML'],
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
