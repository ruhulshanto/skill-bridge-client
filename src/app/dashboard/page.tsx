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
import { cn } from "@/lib/utils";
import { SkeletonDashboard } from "@/components/skeletons/skeleton-dashboard";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<StudentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const showSkeleton = useDelayedLoading(loading, 300);

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
    },
    {
      title: "Completed Sessions",
      value: stats?.completedBookings || 0,
      description: "Finished sessions",
      icon: Calendar,
    },
    {
      title: "Upcoming Sessions",
      value: stats?.upcomingBookings || 0,
      description: "Scheduled sessions",
      icon: Clock,
    },
    {
      title: "Total Spent",
      value: `$${stats?.totalSpent || 0}`,
      description: "Amount spent on tutoring",
      icon: DollarSign,
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
      case 'booking': return "text-[var(--text-muted)] bg-[var(--bg-subtle)]";
      case 'review': return "text-[var(--text-muted)] bg-[var(--bg-subtle)]";
      case 'achievement': return "text-[var(--text-muted)] bg-[var(--bg-subtle)]";
      case 'goal': return "text-[var(--text-muted)] bg-[var(--bg-subtle)]";
      default: return "text-[var(--text-muted)] bg-[var(--bg-subtle)]";
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
      case 'sessions': return "from-[var(--accent)] to-[var(--bg-subtle)]";
      case 'subjects': return "from-[var(--accent)] to-[var(--bg-subtle)]";
      case 'rating': return "from-[var(--accent)] to-[var(--bg-subtle)]";
      case 'streak': return "from-[var(--accent)] to-[var(--bg-subtle)]";
      default: return "from-[var(--accent)] to-[var(--bg-subtle)]";
    }
  };

  const quickActions = [
    {
      title: "My Bookings",
      description: "View upcoming and past tutoring sessions",
      icon: Calendar,
      href: "/dashboard/bookings",
      count: stats?.upcomingBookings || 0,
      countLabel: "Upcoming",
      badgeColor: "bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]"
    },
    {
      title: "Find Tutors",
      description: "Browse and book sessions with expert tutors",
      icon: Users,
      href: "/tutors",
      count: "500+",
      countLabel: "Available",
      badgeColor: "bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]"
    },
    {
      title: "My Progress",
      description: "Track your learning progress and achievements",
      icon: TrendingUp,
      href: "/dashboard/progress",
      count: stats?.completedBookings || 0,
      countLabel: "Completed",
      badgeColor: "bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]"
    },
    {
      title: "Profile Settings",
      description: "Manage your account and preferences",
      icon: Award,
      href: "/dashboard/profile",
      count: "100%",
      countLabel: "Complete",
      badgeColor: "bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]"
    }
  ];

  if (loading && showSkeleton) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <Card className="overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <div className="h-1.5 w-full bg-[var(--accent)]" />
        <CardContent className="p-8">
          <h1 className="section-heading text-3xl mb-2">
            Welcome back, {(user as { name?: string })?.name ?? "Student"}
          </h1>
          <p className="text-[var(--text-muted)] text-base">
            Ready to continue your learning journey?
          </p>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[var(--text-muted)]">{stat.title}</CardTitle>
              <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-[var(--text)] mb-1">
                {loading ? "..." : stat.value}
              </div>
              <p className="text-sm text-[var(--text-muted)]">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="section-heading text-2xl mb-6">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="group border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-1 bg-[var(--accent)]" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] shadow-sm">
                    <action.icon className="h-6 w-6 text-[var(--text-muted)]" />
                  </div>
                  <div className={cn("px-3 py-1 rounded-full text-xs font-bold", action.badgeColor)}>
                    {action.count}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-[var(--text)] mt-4">{action.title}</CardTitle>
                <CardDescription className="text-[var(--text-muted)]">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full rounded-xl">
                  <Link href={action.href}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Redesigned activity / goals / sessions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[var(--accent)]" />
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <Clock className="h-5 w-5 text-[var(--text-muted)]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-[var(--text)]">Recent Activity</CardTitle>
                  <CardDescription className="text-[var(--text-muted)] mt-1">Your latest learning updates</CardDescription>
                </div>
              </div>
              <Badge className="bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 p-3">
                  <div className={`p-2.5 rounded-lg border border-[var(--border)] ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--text)] truncate">{activity.title}</p>
                    <p className="text-sm text-[var(--text-muted)] truncate">{activity.description}</p>
                  </div>
                  <p className="text-xs text-[var(--text-faint)] whitespace-nowrap">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[var(--text-muted)]" />
                </div>
                <p className="font-semibold text-[var(--text)] mb-1">No activity yet</p>
                <p className="text-sm text-[var(--text-muted)] mb-4">Start booking sessions to see your timeline.</p>
                <Button asChild className="rounded-xl">
                  <Link href="/tutors">
                    <Users className="h-4 w-4 mr-2" />
                    Find Tutors
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[var(--accent)]" />
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <Target className="h-5 w-5 text-[var(--text-muted)]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-[var(--text)]">Learning Goals</CardTitle>
                  <CardDescription className="text-[var(--text-muted)] mt-1">Steady progress over time</CardDescription>
                </div>
              </div>
              <Badge className="bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)]">2 Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { title: "Complete 10 Sessions", current: 7, total: 10 },
              { title: "Learn 3 New Skills", current: 2, total: 3 },
            ].map((g) => {
              const percent = Math.round((g.current / g.total) * 100);
              return (
                <div key={g.title} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[var(--text)]">{g.title}</p>
                    <p className="text-sm font-semibold text-[var(--text-muted)]">{g.current}/{g.total}</p>
                  </div>
                  <Progress value={percent} className="h-2.5 [&>div]:bg-[var(--accent)]" />
                  <p className="text-xs text-[var(--text-faint)]">{percent}% complete</p>
                </div>
              );
            })}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 p-3.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[var(--text)]">Next achievement</p>
                <p className="text-sm text-[var(--text-muted)]">3 more sessions to unlock your badge.</p>
              </div>
              <Award className="h-5 w-5 text-[var(--text-muted)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {upcomingBookings.length > 0 && (
        <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[var(--accent)]" />
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <Calendar className="h-5 w-5 text-[var(--text-muted)]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-[var(--text)]">Upcoming Sessions</CardTitle>
                  <CardDescription className="text-[var(--text-muted)] mt-1">Your next tutoring schedule</CardDescription>
                </div>
              </div>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/dashboard/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={booking.tutor.user.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"}
                      alt={booking.tutor.user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[var(--bg-card)]"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[var(--text)] truncate">{booking.tutor.user.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Star className="h-3 w-3 text-[var(--text-muted)]" />
                        <span>{(booking.tutor.rating ?? 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    {booking.meetingLink && (
                      <Button size="sm" className="flex-1 rounded-lg">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1 rounded-lg">
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
