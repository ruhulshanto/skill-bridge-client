"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useEffect, useState } from "react";
import studentService, { 
  StudentStats, 
  StudentBooking, 
  LearningGoal, 
  Achievement, 
  RecentActivity 
} from "@/services/student.service";
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Target, 
  Users,
  Video,
  MessageSquare,
  Trophy,
  Zap
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<StudentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Only fetch data from working endpoints
        const [statsData, bookingsData] = await Promise.all([
          studentService.getStats(),
          studentService.getBookings({ status: 'CONFIRMED', limit: 3 })
        ]);

        setStats(statsData);
        setUpcomingBookings(bookingsData.data);
        
        // Set empty data for non-existent endpoints
        setRecentActivity([]);
        setLearningGoals([]);
        setAchievements([]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      description: "All tutoring sessions",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Completed Sessions",
      value: stats?.completedBookings || 0,
      description: "Finished sessions",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Upcoming Sessions",
      value: stats?.upcomingBookings || 0,
      description: "Scheduled sessions",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Spent",
      value: `$${stats?.totalSpent || 0}`,
      description: "Amount spent on tutoring",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-5 w-5" />;
      case 'review': return <Star className="h-5 w-5" />;
      case 'achievement': return <Trophy className="h-5 w-5" />;
      case 'goal': return <Target className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking': return "text-blue-600 bg-blue-50";
      case 'review': return "text-green-600 bg-green-50";
      case 'achievement': return "text-yellow-600 bg-yellow-50";
      case 'goal': return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'sessions': return <Calendar className="h-5 w-5" />;
      case 'subjects': return <BookOpen className="h-5 w-5" />;
      case 'rating': return <Star className="h-5 w-5" />;
      case 'streak': return <Zap className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getGoalColor = (category: string) => {
    switch (category) {
      case 'sessions': return "from-blue-500 to-blue-600";
      case 'subjects': return "from-green-500 to-green-600";
      case 'rating': return "from-yellow-500 to-yellow-600";
      case 'streak': return "from-orange-500 to-orange-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const quickActions = [
    {
      title: "My Bookings",
      description: "View upcoming and past tutoring sessions",
      icon: Calendar,
      href: "/dashboard/bookings",
      color: "from-blue-500 to-blue-600",
      count: stats?.upcomingBookings || 0,
      countLabel: "Upcoming",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Find Tutors",
      description: "Browse and book sessions with expert tutors",
      icon: Users,
      href: "/tutors",
      color: "from-green-500 to-green-600",
      count: "500+",
      countLabel: "Available",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      title: "My Progress",
      description: "Track your learning progress and achievements",
      icon: TrendingUp,
      href: "/dashboard/progress",
      color: "from-purple-500 to-purple-600",
      count: stats?.completedBookings || 0,
      countLabel: "Completed",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      title: "Profile Settings",
      description: "Manage your account and preferences",
      icon: Award,
      href: "/dashboard/profile",
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
            Welcome back, {(user as { name?: string })?.name ?? "Student"}
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to continue your learning journey?
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

      {/* Enhanced Recent Activity & Learning Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">Your latest learning sessions</CardDescription>
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
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                  <div className={`p-3 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    {activity.tutor && (
                      <div className="flex items-center gap-2 mt-1">
                        <img 
                          src={activity.tutor.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face&auto=format"} 
                          alt={activity.tutor.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-gray-500">{activity.tutor.name}</span>
                        {activity.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-500">{activity.rating}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                    {activity.type === 'booking' && activity.tutor && (
                      <Button size="sm" className="mt-1 bg-blue-600 hover:bg-blue-700 text-white">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                    {activity.type === 'review' && (
                      <Button size="sm" variant="outline" className="mt-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : learningGoals.length > 0 ? (
              learningGoals.map((goal) => {
                const progress = (goal.currentValue / goal.targetValue) * 100;
                return (
                  <div key={goal.id} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-semibold text-gray-900">{goal.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-600">
                          {goal.currentValue}/{goal.targetValue}
                        </span>
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {Math.round(progress)}%
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${getGoalColor(goal.category)} h-3 rounded-full transition-all duration-700 ease-out`} 
                          style={{ width: `${progress}%` }}
                        >
                          <div className="h-full bg-white/20 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
                <p className="text-gray-600 mb-6">Start your learning journey to see your progress here!</p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Users className="h-4 w-4 mr-2" />
                  Find Tutors
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600" />
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Learning Goals</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">Track your progress and achievements</CardDescription>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                2 Active
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Goal 1 */}
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">Complete 10 Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-600">7/10</span>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    70%
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: '70%' }}>
                    <div className="h-full bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Goal 2 */}
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">Learn 3 New Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">2/3</span>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    66%
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: '66%' }}>
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
                    <p className="font-semibold text-gray-900">Next Achievement</p>
                    <p className="text-sm text-gray-600">3 more sessions to unlock!</p>
                  </div>
                </div>
                <div className="text-2xl">🏆</div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Target className="h-4 w-4 mr-2" />
              View All Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings Preview */}
      {upcomingBookings.length > 0 && (
        <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600" />
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Upcoming Sessions</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">Your next tutoring sessions</CardDescription>
                </div>
              </div>
              <Link href="/dashboard/bookings">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={booking.tutor.user.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"}
                      alt={booking.tutor.user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{booking.tutor.user.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{booking.tutor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {booking.meetingLink && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
