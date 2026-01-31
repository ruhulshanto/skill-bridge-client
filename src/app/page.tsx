import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import FeaturedTutors from "@/components/home/featured-tutors";
import CategoriesSection from "@/components/home/categories-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturedTutors />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
