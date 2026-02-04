"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import tutorService, { TutorStats } from "@/services/tutor.service";
import { Calendar, DollarSign, Star, Users, Clock, BookOpen, TrendingUp, Award, Target } from "lucide-react";

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
      description: "All tutoring sessions",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Completed Sessions",
      value: stats?.completedSessions || 0,
      description: "Finished sessions",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Earnings",
      value: `$${stats?.totalEarnings || 0}`,
      description: "Revenue from sessions",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Rating",
      value: `${stats?.rating.toFixed(1) || 0} ⭐`,
      description: `${stats?.totalReviews || 0} reviews`,
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  const quickActions = [
    {
      title: "My Sessions",
      description: "View and manage your tutoring sessions",
      icon: Calendar,
      href: "/tutor/sessions",
      count: stats?.totalSessions || 0,
      countLabel: "Total",
    },
    {
      title: "Set Availability",
      description: "Manage your weekly availability schedule",
      icon: Clock,
      href: "/tutor/availability",
      count: "24/7",
      countLabel: "Flexible",
    },
    {
      title: "My Students",
      description: "View your students and their progress",
      icon: Users,
      href: "/tutor/students",
      count: 0,
      countLabel: "Students",
    },
    {
      title: "Profile Settings",
      description: "Edit your tutor profile and subjects",
      icon: Award,
      href: "/tutor/profile",
      count: "100%",
      countLabel: "Complete",
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {(user as { name?: string })?.name ?? "Tutor"}
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to inspire and educate your students today?
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className={`border-2 ${stat.borderColor} ${stat.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-800">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-white/50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {loading ? "..." : stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="h-px flex-1 bg-gray-100 mx-6 hidden md:block" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link href={action.href} key={index} className="group">
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                      {action.count} {action.countLabel}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 mt-4 group-hover:text-blue-600 transition-colors">{action.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500 line-clamp-2">{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                    <span>Manage</span>
                    <TrendingUp className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced Recent Sessions & Performance Metrics */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Sessions */}
        <Card className="lg:col-span-2 border-0 shadow-xl shadow-blue-500/5 bg-white/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          <CardHeader className="border-b border-gray-50 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Sessions</CardTitle>
                  <CardDescription className="text-gray-500">Monitor your active learning sessions</CardDescription>
                </div>
              </div>
              <Link href="/tutor/sessions">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold transition-colors">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/30 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                  <div className="relative p-6 rounded-full bg-white shadow-xl">
                    <BookOpen className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No active sessions</h3>
                <p className="text-gray-500 max-w-xs mx-auto mb-8">
                  Your tutoring journey is just beginning. Set your availability to start receiving bookings.
                </p>
                <Link href="/tutor/availability">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-6 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 group">
                    <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Set Availability
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-xl shadow-indigo-500/5 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gray-50 text-blue-600">
                <Target className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Metric 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Student Satisfaction</span>
                <span className="text-sm font-bold text-indigo-600">{stats?.rating.toFixed(1) || 0}/5.0</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                  style={{ width: `${Math.round((stats?.rating || 0) * 20)}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Based on {stats?.totalReviews || 0} recent reviews</p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                <span className="text-sm font-bold text-emerald-600">98%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  style={{ width: '98%' }}
                />
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Last 30 days performance</p>
            </div>

            {/* Achievement Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative p-5 bg-white rounded-2xl border border-yellow-50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-yellow-50 text-yellow-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 line-height-tight">Power Tutor</p>
                    <p className="text-xs text-gray-500">Top 5% this month</p>
                  </div>
                </div>
                <div className="text-xl animate-bounce">🔥</div>
              </div>
            </div>

            <Button className="w-full bg-gray-900 hover:bg-black text-white rounded-xl py-6 font-bold shadow-xl transition-all duration-300 hover:-translate-y-1">
              Full Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
