"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight, Code2, Globe2, Laptop, Music, Palette, Calculator } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Programming", count: "120+ Tutors", icon: Code2, slug: "programming" },
    { name: "Languages", count: "85+ Tutors", icon: Globe2, slug: "languages" },
    { name: "Science", count: "90+ Tutors", icon: Laptop, slug: "science" },
    { name: "Mathematics", count: "110+ Tutors", icon: Calculator, slug: "mathematics" },
    { name: "Arts", count: "60+ Tutors", icon: Palette, slug: "arts" },
    { name: "Music", count: "45+ Tutors", icon: Music, slug: "music" },
];

export default function CategoriesSection() {
    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Explore Categories</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Find the perfect tutor for any subject you want to master.
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="group flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View All Categories
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/tutors?category=${cat.slug}`}
                            className="group flex flex-col items-center justify-between rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                <cat.icon className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                                <p className="text-xs text-muted-foreground">{cat.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
