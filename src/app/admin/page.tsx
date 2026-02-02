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
  GraduationCap
} from "lucide-react";
import { DashboardCharts } from "@/components/admin/dashboard-charts";

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
      value: "$45,231.89", // Mock data for now as it wasn't in original stats
      icon: Activity,
      description: "+20.1% from last month"
    },
    {
      title: "Active Students",
      value: stats?.totalStudents?.toLocaleString() || "0",
      icon: Users,
      description: "+180 since last hour"
    },
    {
      title: "Active Tutors",
      value: stats?.totalTutors?.toLocaleString() || "0",
      icon: GraduationCap,
      description: "+19 since last hour"
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings?.toLocaleString() || "0",
      icon: Calendar,
      description: "+201 since last hour"
    }
  ];

  return (
    <div className="flex-1 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'}! Here's what's happening with your platform today.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -mr-16 -mt-16" />
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? (
                  <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="lg:col-span-5 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Platform metrics for the last 30 days
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardCharts />
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Recent Users</CardTitle>
            <CardDescription>
              Latest user registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Olivia Martin", email: "olivia.martin@email.com", initials: "OM", color: "bg-blue-500" },
                { name: "Jackson Lee", email: "jackson.lee@email.com", initials: "JL", color: "bg-emerald-500" },
                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", initials: "IN", color: "bg-violet-500" },
                { name: "William Kim", email: "will@email.com", initials: "WK", color: "bg-amber-500" },
                { name: "Sofia Davis", email: "sofia.davis@email.com", initials: "SD", color: "bg-rose-500" }
              ].map((user, i) => (
                <div key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className={`h-10 w-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-sm mr-3`}>
                    {user.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Categories */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Popular Categories
          </CardTitle>
          <CardDescription>
            Most booked subjects this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Web Development", percent: "45%", icon: "💻", color: "from-blue-500 to-cyan-500" },
              { name: "Data Science", percent: "29%", icon: "📊", color: "from-emerald-500 to-teal-500" },
              { name: "Mobile Apps", percent: "18%", icon: "📱", color: "from-violet-500 to-purple-500" },
              { name: "UI/UX Design", percent: "8%", icon: "🎨", color: "from-amber-500 to-orange-500" }
            ].map((category, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                <div className={`text-4xl mb-3 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.percent}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500`} style={{ width: category.percent }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}