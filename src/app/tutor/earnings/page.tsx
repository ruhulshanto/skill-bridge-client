"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import tutorService, { TutorStats } from "@/services/tutor.service";
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, CreditCard, Wallet, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TutorHeaderSkeleton, TutorStatsSkeleton } from "@/components/tutor/tutor-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


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
            color: "var(--accent)",
            bgColor: "var(--bg-subtle)",
        },
        {
            title: "Recent Revenue",
            value: `$${Math.round((stats?.totalEarnings || 0) * 0.2)}`,
            subtitle: "Past 30 days",
            icon: TrendingUp,
            color: "var(--accent)",
            bgColor: "var(--bg-subtle)",
            trend: { value: "12%", up: true }
        },
        {
            title: "Avg. Session",
            value: `$${stats?.totalSessions ? Math.round(stats.totalEarnings / stats.totalSessions) : 0}`,
            subtitle: "Value per session",
            icon: DollarSign,
            color: "var(--accent)",
            bgColor: "var(--bg-subtle)",
        },
        {
            title: "Withdrawals",
            value: "$0",
            subtitle: "In transit",
            icon: Landmark,
            color: "var(--accent)",
            bgColor: "var(--bg-subtle)",
        }
    ];

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">

                <TutorHeaderSkeleton />
                <TutorStatsSkeleton />
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
                            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
                                <Skeleton className="h-10 w-64 bg-white/40 rounded-xl" />
                            </CardHeader>
                            <CardContent className="p-10 space-y-6">
                                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 bg-white/40 rounded-[2rem]" />)}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-8">
                         <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
                            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
                                <Skeleton className="h-8 w-48 bg-white/40" />
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <Skeleton className="h-40 w-full rounded-[2.5rem] bg-white/60" />
                                <Skeleton className="h-14 w-full rounded-xl bg-white/40" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">



      {/* Refined Welcome Header */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
               <DollarSign className="h-3 w-3" /> Fiscal Portfolio
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A2540]">
              Earnings Report
            </h1>
            <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
              Track your instructional revenue, manage payout destinations, and monitor your financial growth within the ecosystem.
            </p>
          </div>
          <Button 
            className="rounded-xl h-14 px-8 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-primary/20 transition-all"
          >
            <CreditCard className="mr-3 h-5 w-5" />
            Request Payout
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {financialCards.map((card, index) => (
          <Card 
            key={index} 
            className="border border-[#a3c7e6] shadow-lg rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div 
                  className="p-4 rounded-2xl bg-white border border-[#a3c7e6] text-primary shadow-sm"
                >
                  <card.icon className="h-6 w-6" />
                </div>
                {card.trend && (
                  <Badge className={card.trend.up ? "bg-emerald-500/10 text-emerald-600 border-none px-3 py-1 rounded-full font-black text-[10px] shadow-sm" : "bg-red-500/10 text-red-600 border-none px-3 py-1 rounded-full font-black text-[10px] shadow-sm"}>
                    {card.trend.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {card.trend.value}
                  </Badge>
                )}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-[#2d6a9f]">{card.title}</h3>
              <div className="text-4xl font-black mb-3 tracking-tighter text-[#0A2540]">
                {loading ? (
                  <div className="h-10 w-24 bg-white/40 animate-pulse rounded-xl" />
                ) : card.value}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-60">{card.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-8">
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-[#0A2540]">Revenue Stream</CardTitle>
                  <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                    Recent platform transactions
                  </CardDescription>
                </div>
                <Button variant="ghost" className="h-11 px-6 font-black uppercase tracking-widest text-[10px] rounded-xl text-primary hover:bg-white/50">
                  View Full History
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-10 space-y-6">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 bg-white/40 rounded-[2rem]" />)}
                </div>
              ) : (
                <div className="text-center py-28 px-10">
                  <div className="w-24 h-24 border border-[#a3c7e6] rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg bg-white">
                    <Calendar className="h-10 w-10 text-[#2d6a9f] opacity-40" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight text-[#0A2540]">Secure Transaction Engine</h3>
                  <p className="max-w-sm mx-auto text-sm font-medium text-[#2d6a9f] leading-relaxed">
                    Once you complete and verify your teaching sessions, your revenue will stream directly into this ledger.
                  </p>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

        {/* Payout Methods */}
        <div className="space-y-8">
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-[#0A2540]">Payout Hub</CardTitle>
                <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                  Connected settlement accounts
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div 
                className="p-8 rounded-[2.5rem] border border-[#a3c7e6] bg-white space-y-5 transition-all hover:scale-[1.02] shadow-sm group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 rounded-xl bg-primary text-white font-black text-[10px] tracking-[0.2em] shadow-lg">BANK</div>
                    <span className="text-sm font-black tracking-tight text-[#0A2540]">Main Savings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Active</span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-black tracking-[0.2em] text-[#0A2540]">•••• 4829</p>
                  <div className="p-3 rounded-xl bg-[#e5f2ff] text-primary shadow-inner">
                    <Landmark className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-16 rounded-xl border border-[#a3c7e6] bg-white text-[#0A2540] font-black uppercase tracking-widest text-[10px] transition-all hover:bg-[#e5f2ff] shadow-sm"
              >
                <Plus className="mr-3 h-5 w-5 text-primary" />
                Add Settlement Account
              </Button>

              <div 
                className="p-8 rounded-[2.5rem] bg-white/40 border border-[#a3c7e6]/30 shadow-inner"
              >
                <div className="flex gap-5">
                  <div className="p-4 rounded-2xl bg-white border border-[#a3c7e6] text-primary shadow-sm h-fit">
                    <Info className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#0A2540]">Processing Logic</p>
                    <p className="text-xs font-medium leading-relaxed text-[#2d6a9f]">
                      Allow <span className="font-black text-[#0A2540]">2-3 business days</span> for funds to arrive securely in your bank.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    );
}

import { Info, Plus } from "lucide-react";
