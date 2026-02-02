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
        <section className="py-16 bg-background">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Tutors</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Learn from the very best. Our tutors are verified experts in their fields.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden sm:flex" asChild>
                        <Link href="/tutors">View All Tutors <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {tutors.map((tutor) => (
                        <div key={tutor.id} className="group relative rounded-2xl bg-card p-4 transition-all hover:shadow-xl hover:-translate-y-1 border border-border/50 hover:border-primary/20">
                            {/* Image Container */}
                            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted relative mb-4">
                                <img
                                    src={tutor.image || "/placeholder-tutor.jpg"}
                                    alt={tutor.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 z-10">
                                    <button className="rounded-full bg-background/80 p-2.5 text-muted-foreground backdrop-blur-md transition-all hover:text-red-500 hover:bg-background hover:scale-110 shadow-sm">
                                        <Heart className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{tutor.name}</h3>
                                        <p className="text-sm text-muted-foreground">{tutor.tutorProfile?.subjects?.[0]?.subject?.name || 'General'}</p>
                                    </div>
                                    {tutor.tutorProfile?.rating && (
                                        <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600">
                                            <Star className="h-3 w-3 fill-current" />
                                            {tutor.tutorProfile.rating}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-1">{tutor.tutorProfile?.bio?.substring(0, 80) + '...' || ''}</p>

                                {tutor.tutorProfile?.subjects && (
                                    <div className="flex flex-wrap gap-2">
                                        {tutor.tutorProfile.subjects.slice(0, 2).map(( s : any) => (
                                            <Badge key={s.id} variant="secondary" className="px-2 py-0.5 text-xs font-normal bg-muted text-muted-foreground hover:bg-muted">
                                                {s.subject.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-2 flex items-center justify-between border-border/50 mt-4 border-t">
                                    <div>
                                        {tutor.tutorProfile?.hourlyRate && (
                                            <>
                                                <span className="text-lg font-bold text-foreground">${tutor.tutorProfile.hourlyRate}</span>
                                                <span className="text-xs text-muted-foreground">/hr</span>
                                            </>
                                        )}
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-8 hover:bg-primary hover:text-primary-foreground group-hover:translate-x-1 transition-all" asChild>
                                        <Link href={`/tutors/${tutor.id}`}>
                                            View Profile <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/tutors">View All Tutors <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
