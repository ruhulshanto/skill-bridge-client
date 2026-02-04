"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

import { TutorData } from "@/types";

export default function FeaturedTutors() {
    const [tutors, setTutors] = useState<TutorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return; // Prevent running on server

        const fetchFeaturedTutors = async () => {
            try {
                const response = await apiClient.getTutors({ limit: 4 });
                if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
                    setTutors(response.data.data);
                } else if (response && response.data && Array.isArray(response.data)) {
                    setTutors(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch featured tutors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedTutors();
    }, [mounted]);

    if (!mounted || loading) {
        return (
            <section className="py-16 bg-background">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Tutors</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Learn from the very best. Our tutors are verified experts in their fields.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/5] w-full bg-muted rounded-xl mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-3 bg-muted rounded w-1/2"></div>
                                    <div className="h-3 bg-muted rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                            <Star className="h-3 w-3 fill-blue-600" />
                            <span>Top Rated Experts</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
                            Featured <span className="text-blue-600 relative inline-block">
                                Tutors
                                <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100/50 -rotate-1 -z-10 rounded-lg" />
                            </span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                            Learn from the very best. Our tutors are <span className="text-gray-900 font-bold underline decoration-blue-500/30 decoration-4 underline-offset-4">verified experts</span> in their fields, ready to help you succeed.
                        </p>
                    </div>
                    <Link
                        href="/tutors"
                        className="group hidden md:flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-2xl font-bold text-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
                    >
                        View All Tutors
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {tutors.map((tutor) => (
                        <div key={tutor.id} className="group relative flex flex-col h-full rounded-[2.5rem] bg-white border border-gray-100 p-5 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3">
                            {/* Image Container */}
                            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gray-50 relative mb-6">
                                <img
                                    src={tutor.image || "/placeholder-tutor.jpg"}
                                    alt={tutor.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 z-10">
                                    <button className="rounded-full bg-white/90 p-3 text-gray-400 backdrop-blur-md transition-all hover:text-red-500 hover:bg-white hover:scale-110 shadow-lg">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <Button className="w-full bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white font-bold h-12 rounded-xl border-0 shadow-xl" asChild>
                                        <Link href={`/tutors/${tutor.id}`}>Quick View</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 px-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">{tutor.name}</h3>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full w-fit">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                                                {tutor.tutorProfile?.subjects?.[0]?.subject?.name || 'Top Expert'}
                                            </span>
                                        </div>
                                    </div>
                                    {tutor.tutorProfile?.rating && (
                                        <div className="flex items-center gap-1 rounded-xl bg-yellow-50 px-2.5 py-1.5 text-xs font-bold text-yellow-600 border border-yellow-100/50">
                                            <Star className="h-3.5 w-3.5 fill-current" />
                                            {tutor.tutorProfile.rating}
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-500 leading-relaxed text-sm font-medium line-clamp-2 mb-6 flex-1">
                                    {tutor.tutorProfile?.bio || 'Professional industry expert dedicated to student success and skill mastery.'}
                                </p>

                                <div className="flex items-center justify-between pt-5 mt-auto border-t border-gray-50">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-gray-900">${tutor.tutorProfile?.hourlyRate || '45'}</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">/ hr</span>
                                    </div>
                                    <Link href={`/tutors/${tutor.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center md:hidden">
                    <Button size="lg" className="w-full bg-gray-900 h-14 rounded-2xl font-bold" asChild>
                        <Link href="/tutors">Discover All Tutors</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
