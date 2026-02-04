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

            <Container className="relative">
                {/* Visual Light Beams */}
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-400/5 -z-10 blur-[120px] -rotate-12 translate-x-1/2" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-400/5 -z-10 blur-[100px] animate-pulse" />

                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
                    <div className="flex flex-col justify-center space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
                        {/* Elite Trust Badge */}
                        <div className="inline-flex items-center rounded-full border border-blue-100/50 bg-white/50 backdrop-blur-xl px-6 py-2.5 text-xs font-black uppercase tracking-[0.25em] text-blue-600 w-fit shadow-sm">
                            <Sparkles className="mr-3 h-4 w-4 fill-blue-600 animate-pulse" />
                            Elite Mentorship Network
                        </div>

                        {/* Ultra-Premium Heading */}
                        <div className="space-y-8">
                            <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 relative font-black tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem] text-slate-950 leading-[0.9] lg:leading-[0.85]">
                                Unlock Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 relative">
                                    Potential
                                    <div className="absolute -bottom-4 left-0 w-full h-4 bg-blue-100/30 -rotate-1 -z-10 rounded-full blur-sm" />
                                </span>
                            </h1>
                            <p className="max-w-xl text-xl text-slate-500 md:text-2xl leading-relaxed font-medium">
                                Elevate your skills with <span className="text-slate-950 font-bold border-b-2 border-blue-500/20">world-class mentors</span>. Join a community where elite knowledge meets personal growth.
                            </p>
                        </div>

                        {/* High-Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-2">
                            <Button size="lg" className="h-16 px-10 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 active:scale-95" asChild>
                                <Link href="/register">
                                    Start Learning Now <ArrowRight className="ml-3 h-6 w-6" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-black rounded-2xl border-slate-200 bg-white/50 backdrop-blur-sm hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1.5" asChild>
                                <Link href="/tutors">Explore Experts</Link>
                            </Button>
                        </div>

                        {/* Elite Social Proof */}
                        <div className="flex items-center gap-10 pt-6">
                            <div className="flex -space-x-5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="relative group/avatar">
                                        <img
                                            className="inline-block h-14 w-14 rounded-full border-4 border-white object-cover shadow-xl transition-transform group-hover/avatar:-translate-y-2"
                                            src={`https://i.pravatar.cc/150?img=${i + 30}`}
                                            alt="User"
                                        />
                                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 text-yellow-500 mb-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-slate-950 uppercase tracking-widest">Global Top Rated Platinum</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Layered Hero Scene */}
                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-300">
                        <div className="relative z-10 rounded-[4rem] bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_80px_150px_-50px_rgba(0,0,0,0.15)] ring-1 ring-slate-100">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[3.2rem] bg-slate-100 border border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                                    alt="Collaborative learning"
                                    className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                                />

                                {/* Center Play Experience */}
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10 backdrop-blur-[1px] group">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-600 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                        <Button size="lg" className="relative h-28 w-28 rounded-full bg-white/95 backdrop-blur-xl text-blue-600 shadow-3xl hover:scale-110 transition-all duration-500 border-0 group-hover:bg-blue-600 group-hover:text-white">
                                            <Play className="h-12 w-12 ml-3" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Floating Dashboard Analytics Overlay */}
                                <div className="absolute top-8 left-8 right-8">
                                    <div className="flex justify-between items-center bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Live Session Bound</span>
                                        </div>
                                        <div className="h-8 w-24 bg-blue-600/20 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                            {/* Overlapping Glass Profile Cards */}
                            <div className="absolute -left-12 top-1/4 rounded-xl border bg-background/90 backdrop-blur-md p-4 shadow-xl animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <CheckCircle2 className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-950 leading-tight">Elite Certified</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Verified Expert status</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-8 -bottom-10 rounded-xl border bg-background/90 backdrop-blur-md p-4 shadow-xl animate-float-delayed">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <Users className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-950 leading-tight">12,480+</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Active Learners Today</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-End Background Atmospherics */}
                        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
                        <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
