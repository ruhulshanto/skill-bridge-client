"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import tutorService, { TutorStats } from "@/services/tutor.service";
import { 
  HiOutlineAcademicCap, 
  HiOutlineBanknotes, 
  HiOutlineCalendarDays, 
  HiOutlineClock, 
  HiOutlineStar, 
  HiOutlineUsers, 
  HiOutlinePresentationChartBar,
  HiOutlineArrowTrendingUp,
  HiOutlineIdentification
} from "react-icons/hi2";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

import { TutorDashboardSkeleton } from "@/components/tutor/tutor-skeleton";


export default function TutorDashboardPage() {
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

  const statCards = [
    {
      title: "Total Sessions",
      value: stats?.totalSessions || 0,
      description: "Lifetime sessions",
      icon: HiOutlinePresentationChartBar,
      accent: "var(--accent)",
    },
    {
      title: "Completed",
      value: stats?.completedSessions || 0,
      description: "Successfully finished",
      icon: HiOutlineCalendarDays,
      accent: "var(--text)",
    },
    {
      title: "Revenue",
      value: `$${stats?.totalEarnings || 0}`,
      description: "Total earnings",
      icon: HiOutlineBanknotes,
      accent: "var(--accent)",
    },
    {
      title: "Avg. Rating",
      value: `${stats?.rating.toFixed(1) || 0}`,
      description: `${stats?.totalReviews || 0} student reviews`,
      icon: HiOutlineStar,
      accent: "var(--text)",
    },
  ];

  const quickActions = [
    {
      title: "Manage Sessions",
      description: "Track and organize your tutoring schedule",
      icon: HiOutlineCalendarDays,
      href: "/tutor/sessions",
      status: `${stats?.totalSessions || 0} Total`,
    },
    {
      title: "Availability",
      description: "Update your weekly teaching hours",
      icon: HiOutlineClock,
      href: "/tutor/availability",
      status: "Flexible",
    },
    {
      title: "My Students",
      description: "Connect and monitor student progress",
      icon: HiOutlineUsers,
      href: "/tutor/students",
      status: "Active List",
    },
    {
      title: "Profile Detail",
      description: "Optimize your professional visibility",
      icon: HiOutlineIdentification,
      href: "/tutor/profile",
      status: "Public",
    }
  ];

  if (loading) {
    return <TutorDashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">


      {/* Refined Welcome Header */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
             <Zap className="h-3 w-3" /> Instructor Command Center
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0A2540]">
            Welcome back, <span className="text-primary">{(user as { name?: string })?.name ?? "Tutor"}</span>
          </h1>
          <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
            Monitor your educational impact, manage student interactions, and optimize your teaching schedule from a single interface.
          </p>
        </div>
      </div>

      {/* Simplified Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            className="border border-[#a3c7e6] shadow-lg rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white border border-[#a3c7e6] text-primary shadow-sm">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black tracking-tighter text-[#0A2540]">
                  {loading ? <span className="inline-block w-12 h-8 bg-white/40 animate-pulse rounded" /> : stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f]">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Left Column: Actions & Insights */}
        <div className="lg:col-span-2 space-y-12">
          {/* Quick Actions */}
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-black text-[#0A2540]">Quick Actions</CardTitle>
              </div>
              <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                Essential management tools
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {quickActions.map((action, index) => (
                  <Link href={action.href} key={index}>
                    <div 
                      className="group p-6 rounded-3xl border border-[#a3c7e6] transition-all hover:bg-white hover:translate-y-[-2px] flex items-center justify-between shadow-sm bg-white/40"
                    >
                      <div className="flex items-center gap-5">
                        <div>
                          <h3 className="font-black text-[#0A2540] transition-colors group-hover:text-primary">{action.title}</h3>
                          <p className="text-xs font-medium text-[#2d6a9f] opacity-70">{action.description}</p>
                        </div>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40">
                        {action.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Placeholder */}
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <CardTitle className="text-2xl font-black text-[#0A2540]">Recent Activity</CardTitle>
              <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                Your latest interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-white border border-[#a3c7e6] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <HiOutlineCalendarDays className="h-8 w-8 text-[#2d6a9f] opacity-40" />
              </div>
              <p className="font-black text-lg text-[#0A2540]">No recent activity to show</p>
              <p className="text-sm font-medium text-[#2d6a9f] opacity-70 max-w-xs mx-auto mt-2">
                Start teaching and your session history will appear here for easy tracking.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Performance & Tips */}
        <div className="space-y-8">
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 pb-4">
              <CardTitle className="text-xl font-black text-[#0A2540]">
                Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              {/* Satisfaction */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Student Satisfaction</span>
                  <span className="text-sm font-black text-primary">{stats?.rating.toFixed(1) || 0}/5.0</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden bg-white/50 border border-[#a3c7e6]/50">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-primary"
                    style={{ 
                      width: `${Math.round((stats?.rating || 0) * 20)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Completion Rate */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Session Completion</span>
                  <span className="text-sm font-black text-emerald-600">98%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden bg-white/50 border border-[#a3c7e6]/50">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '98%' }}
                  />
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-6 rounded-3xl bg-white/50 border border-[#a3c7e6]/30">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-primary">Pro Tip</p>
                <p className="text-sm font-medium leading-relaxed text-[#2d6a9f]">
                  Updating your availability regularly can increase your student booking rate by up to <span className="font-black text-[#0A2540]">40%</span>.
                </p>
              </div>

              <Link href="/tutor/earnings">
                <Button 
                  className="w-full h-14 rounded-xl bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-black uppercase tracking-widest text-[10px] mt-4 shadow-lg transition-all hover:-translate-y-1 border-0"
                >
                  View Earnings Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
