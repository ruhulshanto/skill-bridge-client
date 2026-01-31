import { Container } from "@/components/ui/container";
import Link from "next/link";

const categories = [
    { name: "Programming", count: "120+ Tutors", icon: "💻", slug: "programming" },
    { name: "Languages", count: "85+ Tutors", icon: "🗣️", slug: "languages" },
    { name: "Science", count: "90+ Tutors", icon: "🔬", slug: "science" },
    { name: "Mathematics", count: "110+ Tutors", icon: "📐", slug: "mathematics" },
    { name: "Arts", count: "60+ Tutors", icon: "🎨", slug: "arts" },
    { name: "Music", count: "45+ Tutors", icon: "🎵", slug: "music" },
];

export default function CategoriesSection() {
    return (
        <section className="py-20">
            <Container>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Categories</h2>
                    <p className="mt-4 text-muted-foreground">Find the perfect tutor for any subject you want to master.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/tutors?category=${cat.slug}`}
                            className="group flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
                        >
                            <span className="mb-3 text-4xl">{cat.icon}</span>
                            <h3 className="font-semibold">{cat.name}</h3>
                            <p className="text-xs text-muted-foreground">{cat.count}</p>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
