import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-light">
      <Navbar />
      <Hero />
      <AboutSection />
    </main>
  );
}
