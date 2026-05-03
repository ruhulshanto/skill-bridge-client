import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";
import CategoriesSection from "@/components/home/categories-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TrustSection from "@/components/home/trust-section";
import FeaturedTutors from "@/components/home/featured-tutors";
import TestimonialsSection from "@/components/home/testimonials-section";
import PricingSection from "@/components/home/pricing-section";
import FAQSection from "@/components/home/faq-section";
import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TrustSection />
      <FeaturedTutors />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
