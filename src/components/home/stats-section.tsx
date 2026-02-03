"use client";

import { Container } from "@/components/ui/container";
import { Users, GraduationCap, BookOpen, Star, TrendingUp, Award, Globe, Zap, Target, Sparkles } from "lucide-react";

const stats = [
    { 
        label: "Learners Transformed", 
        value: "50K+",
        description: "Future leaders",
        icon: Users,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Expert Mentors", 
        value: "10K+",
        description: "Industry professionals",
        icon: GraduationCap,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Skills Mastered", 
        value: "500+",
        description: "In-demand courses",
        icon: BookOpen,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Success Stories", 
        value: "4.9/5",
        description: "Average rating",
        icon: Star,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Career Goals Achieved", 
        value: "95%",
        description: "Placement rate",
        icon: Target,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Global Impact", 
        value: "120+",
        description: "Countries reached",
        icon: Globe,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Innovation Awards", 
        value: "25+",
        description: "Industry recognition",
        icon: Award,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
    { 
        label: "Learning Velocity", 
        value: "3x",
        description: "Faster than traditional",
        icon: Zap,
        color: "from-blue-400 to-sky-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        borderColor: "border-blue-200/50"
    },
];

export default function StatsSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Modern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50" />
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            
            {/* Floating Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/15 rounded-full blur-[80px] animate-pulse delay-500" />

            <Container className="relative z-10">
                {/* Modern Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-sm mb-6">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Trusted by Global Leaders</span>
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="relative">
                            <span className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-blue-500">
                                Transforming
                            </span>
                        </span>
                        <br />
                        <span className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-blue-500">
                            Education Worldwide
                        </span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                        Join the revolution where <span className="text-blue-600 font-semibold">50,000+ learners</span> are already shaping their future with cutting-edge skills and mentorship
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.slice(0, 4).map((stat, index) => (
                        <div 
                            key={index}
                            className={`group relative ${stat.bgColor} backdrop-blur-sm rounded-3xl p-8 border ${stat.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2`}
                        >
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${stat.color.split(' ').join(', ')})`
                                }}
                            />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                        <stat.icon className="h-7 w-7" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="text-lg font-bold text-gray-800">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.slice(4, 8).map((stat, index) => (
                        <div 
                            key={index}
                            className={`group ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border ${stat.borderColor} hover:shadow-xl transition-all duration-500 hover:scale-[1.02]`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        {stat.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Zap className="h-5 w-5" />
                        <span>Be Part of the Success Story</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
