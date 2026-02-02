import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import FeaturesSection from "@/components/home/features-section";
import CategoriesSection from "@/components/home/categories-section";
import FeaturedTutors from "@/components/home/featured-tutors";
import CTASection from "@/components/home/cta-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CategoriesSection />
        <FeaturedTutors />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
