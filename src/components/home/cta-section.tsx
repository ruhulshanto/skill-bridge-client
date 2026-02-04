"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-32 relative overflow-hidden bg-white">
            {/* Elite Background Composition */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <Container className="relative z-10">
                <div className="max-w-6xl mx-auto relative group">
                    {/* Decorative Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[4rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative overflow-hidden rounded-[4rem] bg-white/70 backdrop-blur-3xl border border-white p-10 md:py-20 md:px-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] text-center transition-all duration-700 group-hover:shadow-[0_80px_150px_-50px_rgba(0,0,0,0.15)]">

                        <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
                            {/* Elite Badge */}
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.25em] shadow-sm animate-in fade-in slide-in-from-bottom-4">
                                <Sparkles className="h-3.5 w-3.5 fill-blue-600 animate-pulse" />
                                <span>Start Your Transformation Today</span>
                            </div>

                            <h2 className="font-black tracking-tight text-slate-950 leading-[1.1] text-4xl md:text-6xl lg:text-[95px]">
                                Ready to Start Your <br />
                                <span className="text-blue-600 relative inline-block mt-2 lg:text-[80px]">
                                    Learning Journey?
                                    {/* High-End Decorative Underline */}
                                    <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-3 text-blue-400/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="12" fill="none" />
                                    </svg>
                                </span>
                            </h2>

                            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                                Join over <span className="text-slate-950 font-black">12,000+ active scholars</span> building their future with the world's most elite mentors.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-16 px-10 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                                >
                                    <Link href="/register">
                                        Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-16 px-10 text-lg font-black rounded-2xl border-slate-200 bg-white shadow-sm text-slate-950 hover:bg-white hover:border-blue-600 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link href="/tutors">
                                        Explore Experts
                                    </Link>
                                </Button>
                            </div>

                            {/* Refined Trust Indicators */}
                            <div className="pt-16 flex items-center justify-center gap-12 border-t border-slate-100">
                                <div className="text-center group/stat">
                                    <div className="text-3xl font-black text-slate-950 group-hover/stat:text-blue-600 transition-colors">24/7</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Dedicated Support</div>
                                </div>
                                <div className="w-px h-12 bg-slate-100" />
                                <div className="text-center group/stat">
                                    <div className="text-3xl font-black text-slate-950 group-hover/stat:text-blue-600 transition-colors">100%</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Secure Tracking</div>
                                </div>
                                <div className="w-px h-12 bg-slate-100" />
                                <div className="text-center group/stat">
                                    <div className="text-3xl font-black text-slate-950 group-hover/stat:text-blue-600 transition-colors">Elite</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Verified Tutors</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
