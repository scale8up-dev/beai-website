import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { GradientBackground } from './GradientBackground';

const faqs = [
  {
    question: 'What services does Business Evolution AI provide?',
    answer: 'We operate across four connected divisions: AI & Software Development, AI Strategy, Marketing & Growth Systems, and Client Success. AI and software development is our core specialty, including machine learning, generative AI, web and mobile products, UI/UX, cloud architecture, DevOps, MLOps, integrations, automation, and quality engineering. We also deliver roadmaps, lead generation, paid media, funnels, GoHighLevel and CRM systems, nurture, attribution, implementation, support, and ongoing optimization.',
  },
  {
    question: 'How long does a typical project take to complete?',
    answer: 'Most focused projects are delivered in 4-8 weeks. Larger, more complex systems can take up to 12 weeks. We define the scope and timeline during discovery, then provide clear progress updates throughout delivery.',
  },
  {
    question: 'What is your development process?',
    answer: 'We follow agile development methodology with iterative sprints. Our process includes: initial consultation, requirements gathering, design phase, development in sprints, quality assurance testing, deployment, and ongoing support. We maintain transparent communication throughout.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes! We offer 24/7 support for all our clients. Our dedicated support team ensures your applications run smoothly, and we provide regular maintenance, updates, and technical assistance whenever you need it.',
  },
  {
    question: 'How do you ensure project quality?',
    answer: 'Quality is our top priority. We implement rigorous quality assurance processes including code reviews, automated testing, manual testing, security audits, and performance optimization. Every solution undergoes thorough testing before deployment.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We work with Python, JavaScript and TypeScript, React, Node.js, modern AI models, AWS and Azure, GoHighLevel, leading CRM platforms, and automation tools. We select the stack around the business requirement rather than forcing every project into the same solution.',
  },
];

export function FAQSection() {
  return (
    <GradientBackground variant="subtle" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">FAQ</h2>
            <p className="text-xl text-gray-600">Frequently Asked Questions</p>
            <p className="text-gray-500 mt-2">General Information</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
