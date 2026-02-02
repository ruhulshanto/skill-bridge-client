import CategoriesSection from "@/components/home/categories-section";
import FeaturedTutors from "@/components/home/featured-tutors";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <HowItWorks />
            <CategoriesSection />
            <FeaturedTutors />
        </>
    );
}
