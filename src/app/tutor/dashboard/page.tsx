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
      color: "from-blue-500 to-blue-600",
      count: stats?.totalSessions || 0,
      countLabel: "Total",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Set Availability",
      description: "Manage your weekly availability schedule",
      icon: Clock,
      href: "/tutor/availability",
      color: "from-green-500 to-green-600",
      count: "24/7",
      countLabel: "Flexible",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      title: "My Students",
      description: "View your students and their progress",
      icon: Users,
      href: "/tutor/students",
      color: "from-purple-500 to-purple-600",
      count: 0, // Will be updated when totalStudents is added to TutorStats
      countLabel: "Students",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      title: "Profile Settings",
      description: "Edit your tutor profile and subjects",
      icon: Award,
      href: "/tutor/profile",
      color: "from-orange-500 to-orange-600",
      count: "100%",
      countLabel: "Complete",
      badgeColor: "bg-orange-100 text-orange-800"
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${action.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${action.badgeColor}`}>
                    {action.count}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 mt-4">{action.title}</CardTitle>
                <CardDescription className="text-gray-600">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className={`w-full bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-300 hover:scale-105 text-white border-0`}>
                  <Link href={action.href}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Recent Sessions & Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Sessions */}
        <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Sessions</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">Your latest tutoring sessions</CardDescription>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                Live
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-8 w-16 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent sessions</h3>
                <p className="text-gray-600 mb-6">Your upcoming sessions will appear here!</p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Sessions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600" />
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">Track your teaching success</CardDescription>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                Excellent
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metric 1 */}
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">Student Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-600">{stats?.rating.toFixed(1) || 0}/5.0</span>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    {Math.round((stats?.rating || 0) * 20)}%
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.round((stats?.rating || 0) * 20)}%` }}>
                    <div className="h-full bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">Session Completion Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">95%</span>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    High
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: '95%' }}>
                    <div className="h-full bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Section */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Top Rated Tutor</p>
                    <p className="text-sm text-gray-600">Keep up the great work!</p>
                  </div>
                </div>
                <div className="text-2xl">🌟</div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
