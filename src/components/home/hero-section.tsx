"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, CheckCircle2, Search, Star, Users, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 pt-20 pb-32 lg:pt-24 lg:pb-40">
            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse" />
            </div>

            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    <div className="flex flex-col justify-center space-y-8">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm w-fit">
                            <Sparkles className="mr-2 h-4 w-4" />
                            #1 Trusted Tutoring Platform
                            <span className="ml-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                                Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative inline-block">
                                    Expert Tutors
                                </span>
                            </h1>
                            <p className="max-w-xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                                Connect with verified mentors for personalized 1-on-1 lessons. Master new skills, ace your exams, and reach your goals faster.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/20" asChild>
                                <Link href="/register">
                                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base hover:bg-muted/50" asChild>
                                <Link href="/tutors">Find a Tutor</Link>
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-background object-cover"
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="User"
                                    />
                                ))}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                                    2k+
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                </div>
                                <span className="font-medium text-foreground">Trusted by 5,000+ students</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Interactive Content */}
                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                        <div className="relative rounded-3xl bg-white/80 backdrop-blur-sm p-3 ring-1 ring-inset ring-blue-100/50 shadow-2xl lg:p-6">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-inner">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                                    alt="Student learning"
                                    className="h-full w-full object-cover"
                                />
                                
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <Button size="lg" className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-blue-600 shadow-2xl hover:scale-110 transition-all">
                                        <Play className="h-8 w-8 ml-1" />
                                    </Button>
                                </div>
                            </div>

                            {/* Floating Card 1: Verified Tutors */}
                            <div className="absolute -left-6 top-12 rounded-xl border bg-background p-4 shadow-xl animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Verified Tutors</p>
                                        <p className="text-xs text-muted-foreground">Expert professionals</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2: Active Students */}
                            <div className="absolute -right-6 bottom-24 rounded-xl border bg-background p-4 shadow-xl animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Active Community</p>
                                        <p className="text-xs text-muted-foreground">12,000+ learners</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
