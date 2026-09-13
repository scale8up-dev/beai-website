import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-light">
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
