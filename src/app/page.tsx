import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-light">
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <HighlightsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
