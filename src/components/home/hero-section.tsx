"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
                            <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            Over 5,000+ Active Tutors
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Master New Skills with <span className="text-primary">Expert Tutors</span>
                        </h1>
                        <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                            Connect with verified experts for 1-on-1 lessons. From coding to languages, find the perfect tutor to reach your goals.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="h-12 px-8 text-base" asChild>
                                <Link href="/register">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                <Link href="/tutors">Browse Tutors</Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <span className="font-medium text-foreground">4.9/5</span>
                                <span>(2k+ reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                        <div className="relative rounded-2xl border bg-background p-2 shadow-2xl">
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/50 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                                    alt="Students learning"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
