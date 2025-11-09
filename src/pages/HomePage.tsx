import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { TechSolutionsSection } from '../components/TechSolutionsSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { ContactSection } from '../components/ContactSection';
import { TechStackScroller } from '../components/TechStackScroller';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechStackScroller />
      <WhyChooseSection />
      <CTASection />
      <TechSolutionsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
