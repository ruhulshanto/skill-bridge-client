"use client";

import { Container } from "@/components/ui/container";
import { BookOpen, Calendar, Shield, Users, Star, Award, Clock, Target } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Users,
        title: "Expert Tutors",
        description: "Learn from industry professionals and verified experts who are passionate about teaching.",
        stat: "500+ Verified Tutors",
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200"
    },
    {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Book sessions that fit your lifestyle. Learn at your own pace, anytime, anywhere.",
        stat: "24/7 Availability",
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200"
    },
    {
        icon: Shield,
        title: "Verified & Secure",
        description: "Every tutor is vetted. Payments are secure. Your satisfaction is guaranteed.",
        stat: "100% Secure Payments",
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200"
    },
    {
        icon: BookOpen,
        title: "Personalized Learning",
        description: "Get customized lesson plans tailored to your specific goals and learning style.",
        stat: "Custom Learning Paths",
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200"
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
            <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            <Container className="relative">
                <div className="mb-20 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-600 rounded-full text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Star className="h-4 w-4 fill-blue-600" />
                        <span>Trusted by 10,000+ Students Worldwide</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        <span className="block text-gray-900">Why Choose</span>
                        <span className="block text-blue-600 relative inline-block">
                            SkillBridge?
                            <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100/50 -rotate-1 -z-10 rounded-lg" />
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
                        We provide the <span className="text-gray-900 font-bold underline decoration-blue-500/30 decoration-4 underline-offset-4">best environment</span> for learning and growth. Here's what sets us apart from the rest.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] p-10 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:scale-[1.02]`}
                        >
                            {/* Glassmorphism Background elements */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 ${feature.bg} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-blue-100`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50/50 rounded-full w-fit">
                                        <Award className="h-3.5 w-3.5 text-blue-600" />
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">{feature.stat}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 leading-relaxed text-[15px] font-medium mt-auto">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-lg border border-blue-100">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <img src="https://i.ibb.co.com/84mySMQ0/526374557-17869992054410848-5829952187626490279-n.jpg" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face&auto=format" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Join 10,000+ happy learners</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300" />
                        <Link href="/tutors" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Get Started Today →</Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
