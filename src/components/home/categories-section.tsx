"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight, Code2, Globe2, Laptop, Music, Palette, Calculator, Zap } from "lucide-react";
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
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />

            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Zap className="h-3 w-3 fill-blue-600" />
                            <span>Discover Your Path</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
                            Explore <span className="text-blue-600 relative inline-block">
                                Categories
                                <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100/50 -rotate-1 -z-10 rounded-lg" />
                            </span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                            Find the perfect tutor for any subject you want to master. Master new skills with <span className="text-gray-900 font-bold">personalized 1-on-1 mentorship.</span>
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-900 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
                    >
                        View All Categories
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((cat, index) => (
                        <Link
                            key={cat.slug}
                            href={`/tutors?category=${cat.slug}`}
                            className="group flex flex-col items-center justify-center rounded-[2.5rem] border border-white/40 bg-white/80 backdrop-blur-md p-8 text-center shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:scale-[1.05]"
                        >
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 scale-150" />
                                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[10deg] border border-blue-100/50">
                                    <cat.icon className="h-10 w-10" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                                <div className="inline-flex items-center px-2 py-0.5 bg-gray-50 group-hover:bg-blue-50 rounded-full transition-colors">
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">{cat.count}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
