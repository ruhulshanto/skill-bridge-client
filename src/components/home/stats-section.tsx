"use client";

import { Container } from "@/components/ui/container";
import { Users, GraduationCap, BookOpen, Star, TrendingUp, Award, Globe, Clock } from "lucide-react";

const stats = [
    { 
        label: "Active Students", 
        value: "12,000+",
        description: "Growing daily",
        icon: Users,
        color: "text-blue-600"
    },
    { 
        label: "Expert Tutors", 
        value: "5,000+",
        description: "Verified professionals",
        icon: GraduationCap,
        color: "text-green-600"
    },
    { 
        label: "Subjects Covered", 
        value: "150+",
        description: "Across all categories",
        icon: BookOpen,
        color: "text-purple-600"
    },
    { 
        label: "Satisfaction", 
        value: "4.9/5",
        description: "Average rating",
        icon: Star,
        color: "text-orange-600"
    },
    { 
        label: "Success Rate", 
        value: "98%",
        description: "Student success",
        icon: TrendingUp,
        color: "text-blue-600"
    },
    { 
        label: "Awards Won", 
        value: "500+",
        description: "Industry recognition",
        icon: Award,
        color: "text-green-600"
    },
    { 
        label: "Countries", 
        value: "50+",
        description: "Global reach",
        icon: Globe,
        color: "text-purple-600"
    },
    { 
        label: "Support", 
        value: "24/7",
        description: "Always available",
        icon: Clock,
        color: "text-orange-600"
    },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px]" />
            <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            
            {/* Reduced floating elements for better performance */}
            <div className="absolute top-10 left-10 w-32 h-20 bg-blue-100/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-24 bg-indigo-100/20 rounded-full blur-2xl" />
            
            <Container className="relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands achieving their goals with SkillBridge
                    </p>
                </div>

                {/* Static Stats Grid - Better Performance */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.slice(0, 4).map((stat, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className={`p-3 rounded-xl bg-blue-50/80 text-blue-600`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Second Row - Static */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.slice(4, 8).map((stat, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 hover:from-blue-100/70 hover:to-indigo-100/70 transition-all duration-300 hover:scale-105 hover:border-blue-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-white/90 text-blue-600`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                            </div>
                            <div className="text-lg font-semibold text-gray-800 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
