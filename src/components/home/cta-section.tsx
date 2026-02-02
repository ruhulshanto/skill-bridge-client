"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-50">
            {/* Background Decoration: Subtle Gradient Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px]" />
            </div>

            {/* Background Pattern: Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <Container className="relative z-10">
                <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl p-8 md:p-16 text-center transform hover:scale-[1.01] transition-transform duration-500">

                    <div className="space-y-6 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-4">
                            <Zap className="h-3.5 w-3.5 fill-current" />
                            <span>Start your transformation today</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Ready to Start Your <br />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                                    Learning Journey?
                                </span>
                                {/* Decorative underline */}
                                <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-3 text-sky-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="12" fill="none" opacity="0.6" />
                                </svg>
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Join a community where knowledge flows freely. Connect with expert tutors and take your skills to the next level.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <Link href="/register">
                                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-base font-semibold rounded-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all duration-300"
                            >
                                <Link href="/tutors">
                                    Explore Tutors
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
