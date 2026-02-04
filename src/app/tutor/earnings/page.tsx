"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import tutorService, { TutorStats } from "@/services/tutor.service";
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, CreditCard, Wallet, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TutorEarningsPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<TutorStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await tutorService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch tutor stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const financialCards = [
        {
            title: "Total Balance",
            value: `$${stats?.totalEarnings || 0}`,
            subtitle: "Available for withdrawal",
            icon: Wallet,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Recent Revenue",
            value: `$${Math.round((stats?.totalEarnings || 0) * 0.2)}`,
            subtitle: "Past 30 days",
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            trend: { value: "12%", up: true }
        },
        {
            title: "Avg. Session",
            value: `$${stats?.totalSessions ? Math.round(stats.totalEarnings / stats.totalSessions) : 0}`,
            subtitle: "Value per session",
            icon: DollarSign,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Withdrawals",
            value: "$0",
            subtitle: "In transit",
            icon: Landmark,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        }
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Financial Overview</h1>
                    <p className="text-slate-500 mt-2 font-medium">Track your teaching revenue and manage payouts.</p>
                </div>
                <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Request Payout
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {financialCards.map((card, index) => (
                    <Card key={index} className="border border-slate-300/60 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-500 group rounded-[2.5rem] bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden cursor-default">
                        <div className="p-8 relative">
                            {/* Decorative background element inspired by homepage */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />

                            <div className="relative">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-4 rounded-[1.5rem] bg-white text-blue-600 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-slate-200`}>
                                        <card.icon className="h-6 w-6" />
                                    </div>
                                    {card.trend && (
                                        <Badge className={card.trend.up ? "bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-bold shadow-sm" : "bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full font-bold shadow-sm"}>
                                            {card.trend.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                            {card.trend.value}
                                        </Badge>
                                    )}
                                </div>
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">{card.title}</h3>
                                <div className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tighter">
                                    {loading ? (
                                        <div className="h-10 w-24 bg-white/50 animate-pulse rounded-xl" />
                                    ) : card.value}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                    <p className="text-[10px] font-bold text-slate-500/80">{card.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Transaction History */}
                <Card className="lg:col-span-2 border border-slate-300/60 shadow-sm hover:shadow-md transition-all duration-500 rounded-[2.5rem] bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
                    <CardHeader className="p-10 border-b border-slate-200 bg-white/60 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-black text-slate-900">Revenue Stream</CardTitle>
                                <CardDescription className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Recent platform transactions</CardDescription>
                            </div>
                            <Button variant="outline" className="h-11 px-6 text-blue-600 font-bold hover:bg-blue-50 rounded-xl border-slate-300 hover:border-blue-300 transition-all shadow-sm bg-white hover:scale-105">
                                View All Activity
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 relative">
                        {/* Decorative background element inspired by homepage */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-10" />

                        {loading ? (
                            <div className="p-10 space-y-6 relative">
                                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/50 animate-pulse rounded-[2rem] border border-slate-200 shadow-sm" />)}
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200/50 relative">
                                <div className="text-center py-28 px-10">
                                    <div className="relative inline-block mb-8 group/icon">
                                        <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full group-hover/icon:bg-blue-200/50 transition-colors" />
                                        <div className="relative w-24 h-24 bg-white border border-slate-300/60 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-md transform -rotate-3 group-hover/icon:rotate-0 group-hover/icon:scale-110 transition-all duration-500">
                                            <Calendar className="h-10 w-10 text-slate-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">Your path to independence starts here</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                                        Once you complete and verify your teaching sessions, your revenue will stream directly into this dashboard.
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Payout Methods */}
                <Card className="border border-slate-300/60 shadow-sm hover:shadow-md transition-all duration-500 rounded-[3rem] bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-slate-900 overflow-hidden">
                    <CardHeader className="p-10 pb-6 bg-white/60 border-b border-slate-200 backdrop-blur-md">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-black">Payout Hub</CardTitle>
                            <CardDescription className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Destination for your earnings</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8 relative">
                        {/* Decorative background element inspired by homepage */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20" />

                        <div className="relative">
                            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-300/60 space-y-5 transition-all hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 group/method cursor-pointer shadow-sm active:scale-95">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-black text-[10px] tracking-[0.2em] shadow-lg shadow-blue-200">BANK</div>
                                        <span className="text-sm font-black text-slate-700 tracking-tight">Main Savings</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">Live</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-bold tracking-[0.4em] text-slate-900 drop-shadow-sm">•••• 4829</p>
                                    <div className="p-2 rounded-lg bg-slate-100 group-hover/method:bg-blue-600 group-hover/method:text-white transition-all transform group-hover/method:rotate-12">
                                        <Landmark className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-16 rounded-[1.8rem] border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-extrabold hover:border-blue-400 transition-all shadow-sm group hover:scale-[1.02] active:scale-98">
                            <Plus className="mr-3 h-6 w-6 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
                            Add Payout Method
                        </Button>

                        <div className="pt-4 relative">
                            <div className="p-7 rounded-[2.5rem] bg-white border border-slate-300 shadow-sm relative overflow-hidden group/tip hover:border-blue-200 transition-colors">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover/tip:scale-150" />
                                <div className="flex gap-5 relative">
                                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 h-fit border border-blue-100 shadow-sm group-hover/tip:scale-110 transition-transform">
                                        <Info className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Standard Processing</p>
                                        <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                                            Allow <span className="text-slate-900 font-bold">2-3 days</span> for funds to arrive securely in your bank.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { Info, Plus } from "lucide-react";
