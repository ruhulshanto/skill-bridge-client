import CategoriesSection from "@/components/home/categories-section";
import FeaturedTutors from "@/components/home/featured-tutors";
import HeroSection from "@/components/home/hero-section";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <CategoriesSection />
            <FeaturedTutors />
        </>
    );
}
