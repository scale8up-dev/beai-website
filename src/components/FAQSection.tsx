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
    answer: 'We provide a comprehensive range of technology services including AI Development, Web Development, Mobile App Development, UI/UX Design, Cloud & DevOps solutions, and Machine Learning implementations. Our goal is to deliver end-to-end technology solutions that transform your business.',
  },
  {
    question: 'How long does a typical project take to complete?',
    answer: 'Project timelines vary depending on scope and complexity. A simple web application might take 4-8 weeks, while complex AI solutions can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
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
    answer: 'We work with cutting-edge technologies including Python, JavaScript/TypeScript, React, Node.js, TensorFlow, PyTorch for AI/ML, AWS and Azure for cloud solutions, and modern DevOps tools. We stay updated with the latest technology trends to deliver the best solutions.',
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
