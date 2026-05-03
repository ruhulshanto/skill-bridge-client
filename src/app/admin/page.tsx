"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import adminService, { AdminStats } from "@/services/admin.service";
import {
  Users,
  BookOpen,
  Calendar,
  Activity,
  ArrowUpRight,
  GraduationCap,
  Trophy,
  TrendingUp,
  Wallet,
  Zap,
  ChevronRight,
  Monitor,
  BarChart3,
  Smartphone,
  Palette,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: Wallet,
      description: "+20.1% vs last month",
      color: "blue"
    },
    {
      title: "Active Students",
      value: stats?.totalStudents?.toLocaleString() || "0",
      icon: Users,
      description: "+180 new learners",
      color: "purple"
    },
    {
      title: "Active Tutors",
      value: stats?.totalTutors?.toLocaleString() || "0",
      icon: GraduationCap,
      description: "+19 expert mentors",
      color: "emerald"
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings?.toLocaleString() || "0",
      icon: Zap,
      description: "+201 sessions scheduled",
      color: "amber"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Welcome Header ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm backdrop-blur-sm">
               <Trophy className="h-3.5 w-3.5" />
               SkillBridge Command Center
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A2540] mb-4 leading-tight">
                Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'Admin'}</span>
              </h1>
              <p className="text-[#2d6a9f] font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
                Platform analytics and user management portal. Your oversight keeps SkillBridge growing at <span className="font-black text-[#0A2540]">24.8% MoM</span>.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-6 shrink-0">
            <div className="flex flex-col items-start sm:items-end">
               <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-2 opacity-60">Infrastructure Status</p>
               <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-[#a3c7e6] text-emerald-600 text-[11px] font-black uppercase tracking-wider shadow-sm backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  All Systems Optimal
               </div>
            </div>
            <div className="h-px w-full sm:w-px sm:h-12 lg:h-px lg:w-32 bg-[#a3c7e6]/40"></div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-1 opacity-60">Active Uptime</p>
              <p className="text-2xl font-black text-[#0A2540]">99.98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Statistics Grid ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden border border-[#a3c7e6] rounded-[2rem] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white border border-[#a3c7e6] group-hover:border-primary/50 transition-all duration-500 shadow-sm">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-500/10">
                   <TrendingUp className="h-3 w-3" />
                   Active
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-[11px] font-black text-[#2d6a9f] uppercase tracking-widest">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black text-[#0A2540]">
                  {loading ? (
                    <div className="h-9 w-24 bg-white/50 animate-pulse rounded-lg" />
                  ) : (
                    stat.value
                  )}
                </h3>
              </div>
              
              <div className="mt-auto flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                <p className="text-xs font-bold text-[#2d6a9f]">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Analytics & Live Feed ── */}
      <div className="space-y-8">
        {/* Performance Chart */}
        <div 
          className="relative overflow-hidden border border-[#a3c7e6] rounded-[2.5rem] shadow-xl"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <div className="p-8 border-b border-[#a3c7e6]/50 bg-white/30">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-[#0A2540] flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#a3c7e6] text-primary shadow-sm">
                    <Activity className="h-5 w-5" />
                  </div>
                  System Performance
                </h2>
                <p className="text-sm text-[#2d6a9f] font-medium">Real-time data visualization of platform scalability.</p>
              </div>
              <Button variant="outline" className="rounded-xl font-bold text-xs h-10 border-[#a3c7e6] bg-white hover:bg-[#CCE7FF] transition-all shadow-sm">
                Export CSV
              </Button>
            </div>
          </div>
          <div className="p-8">
            <DashboardCharts />
          </div>
        </div>

        {/* Live Feed Row */}
        <div 
          className="relative overflow-hidden border border-[#a3c7e6] rounded-[2.5rem] shadow-xl"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <div className="p-8 border-b border-[#a3c7e6]/50 bg-white/30 flex items-center justify-between">
             <div>
                <h3 className="text-xl font-black text-[#0A2540] mb-1">Recent Registrations</h3>
                <p className="text-xs text-[#2d6a9f] font-bold uppercase tracking-widest">Real-time user onboarding queue</p>
             </div>
             <Button variant="ghost" className="rounded-xl font-bold text-xs uppercase tracking-widest text-primary hover:bg-white transition-all">
                Directory
             </Button>
          </div>
          
          <div className="p-6 overflow-x-auto">
            <div className="flex items-center gap-5 min-w-max pb-2">
              {[
                { name: "Olivia Martin", email: "olivia.martin@email.com", initials: "OM", date: "2m ago" },
                { name: "Jackson Lee", email: "jackson.lee@email.com", initials: "JL", date: "15m ago" },
                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", initials: "IN", date: "42m ago" },
                { name: "William Kim", email: "will@email.com", initials: "WK", date: "1h ago" },
                { name: "Sofia Davis", email: "sofia.davis@email.com", initials: "SD", date: "3h ago" },
                { name: "Lucas Vance", email: "lucas.vance@email.com", initials: "LV", date: "5h ago" }
              ].map((user, i) => (
                <div 
                  key={i} 
                  className="group flex flex-col items-center p-6 rounded-[2rem] bg-white hover:shadow-lg border border-transparent hover:border-[#a3c7e6] transition-all duration-300 cursor-pointer w-52 text-center"
                >
                  <div className="relative mb-4 h-16 w-16 shrink-0">
                    <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-[#a3c7e6] flex items-center justify-center text-primary font-black text-xl shadow-inner">
                      {user.initials}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-[#0A2540] truncate group-hover:text-primary transition-colors">{user.name}</p>
                    <p className="text-[10px] text-[#2d6a9f] font-bold truncate tracking-tight">{user.email}</p>
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter mt-1">{user.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Subject Popularity (Realistic Design) ── */}
      <div 
        className="relative overflow-hidden border border-[#a3c7e6] rounded-[2.5rem] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#a3c7e6] text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                Enrollment Trends
             </div>
            <h2 className="text-3xl font-black text-[#0A2540]">
              Market Demand by Category
            </h2>
            <p className="text-[#2d6a9f] font-medium max-w-2xl">
              Distribution of active student enrollments and average course completion rates across SkillBridge's primary academic pillars.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Reporting Period</span>
             <div className="h-10 px-4 rounded-xl bg-white border border-[#a3c7e6] flex items-center text-xs font-black uppercase tracking-widest text-[#0A2540] shadow-sm">
                Q2 • May 2026
             </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { 
              name: "Full-Stack Engineering", 
              enrollments: 12450, 
              avgProgress: 68, 
              icon: Monitor, 
              color: "blue",
              description: "Highest retention rate this quarter due to new React 19 modules."
            },
            { 
              name: "Data Analytics & AI", 
              enrollments: 8920, 
              avgProgress: 52, 
              icon: BarChart3, 
              color: "emerald",
              description: "Surge in interest for Large Language Model fundamentals."
            },
            { 
              name: "iOS & Android Mastery", 
              enrollments: 5600, 
              avgProgress: 45, 
              icon: Smartphone, 
              color: "purple",
              description: "Steady growth in hybrid development frameworks."
            },
            { 
              name: "Visual Identity & UX", 
              enrollments: 4120, 
              avgProgress: 72, 
              icon: Palette, 
              color: "amber",
              description: "Leading in student satisfaction and peer-review engagement."
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/50 border border-transparent hover:border-[#a3c7e6] transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#CCE7FF]/30 text-primary border border-[#a3c7e6]/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0A2540] group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">Top Performer</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#0A2540] tracking-tight">{item.enrollments.toLocaleString()}</div>
                  <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Active Students</p>
                </div>
              </div>

              <p className="text-sm text-[#2d6a9f] font-medium mb-8 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-[#2d6a9f]">Syllabus Completion</span>
                  <span className="text-[#0A2540] bg-[#CCE7FF] px-2 py-0.5 rounded-lg border border-[#a3c7e6]/50">{item.avgProgress}%</span>
                </div>
                <div className="relative w-full h-3 bg-[#CCE7FF]/20 rounded-full overflow-hidden p-0.5 border border-[#a3c7e6]/20">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-[#86C6FF] rounded-full transition-all duration-1000 ease-out shadow-sm" 
                    style={{ width: `${item.avgProgress}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/5 text-emerald-600 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/10">
                    <CheckCircle2 className="h-3 w-3" />
                    Curriculum Verified
                  </div>
                  <button className="ml-auto text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all group/btn">
                    Details <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}