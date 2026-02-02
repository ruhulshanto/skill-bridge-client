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
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <Star className="h-4 w-4" />
                        Trusted by 10,000+ Students
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Why Choose SkillBridge?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We provide the best environment for learning and growth. Here's what sets us apart from the rest.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-3xl border-2 ${feature.borderColor} ${feature.bg} p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105`}
                        >
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative z-10">
                                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <div className={`inline-flex items-center gap-1 px-3 py-1 bg-white/70 rounded-full text-xs font-semibold ${feature.color}`}>
                                        <Award className="h-3 w-3" />
                                        {feature.stat}
                                    </div>
                                </div>
                                
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                                
                                {/* Decorative element */}
                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
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
