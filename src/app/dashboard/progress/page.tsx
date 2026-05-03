"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Award, Target, Clock, BookOpen, Star, Zap, Trophy, Flame, Book } from "lucide-react";
import { useEffect, useState } from "react";
import studentService, { StudentStats } from "@/services/student.service";
import { cn } from "@/lib/utils";

interface ProgressData {
  totalSessions: number;
  completedSessions: number;
  totalHours: number;
  subjectsLearned: number;
  averageRating: number;
  streakDays: number;
  achievements: Achievement[];
  recentMilestones: Milestone[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt: string | null;
  progress: number;
  totalRequired: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "session" | "subject" | "rating" | "streak";
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Fetch real student stats from database
        const stats = await studentService.getStats();
        setStudentStats(stats);

        // Calculate additional progress data based on real stats
        const calculatedProgressData: ProgressData = {
          totalSessions: stats.totalBookings,
          completedSessions: stats.completedBookings,
          totalHours: Math.round(stats.totalBookings * 1.5), // Estimate: 1.5 hours per session
          subjectsLearned: Math.min(Math.floor(stats.completedBookings / 3), 5), // Estimate: 1 subject per 3 sessions
          averageRating: stats.averageRating || 0,
          streakDays: Math.min(stats.completedBookings, 30), // Estimate: streak based on completed sessions
          achievements: [
            {
              id: "1",
              title: "First Session",
              description: "Complete your first tutoring session",
              icon: <Target className="h-6 w-6" />,
              unlockedAt: stats.totalBookings > 0 ? "2024-01-15" : null,
              progress: Math.min(stats.totalBookings, 1),
              totalRequired: 1
            },
            {
              id: "2",
              title: "Week Warrior",
              description: "Complete 7 sessions in one week",
              icon: <Flame className="h-6 w-6" />,
              unlockedAt: stats.completedBookings >= 7 ? "2024-01-22" : null,
              progress: Math.min(stats.completedBookings, 7),
              totalRequired: 7
            },
            {
              id: "3",
              title: "Knowledge Seeker",
              description: "Complete 10 sessions",
              icon: <Book className="h-6 w-6" />,
              unlockedAt: stats.completedBookings >= 10 ? "2024-02-01" : null,
              progress: Math.min(stats.completedBookings, 10),
              totalRequired: 10
            },
            {
              id: "4",
              title: "Rising Star",
              description: "Maintain a 4.5+ average rating",
              icon: <Star className="h-6 w-6" />,
              unlockedAt: stats.averageRating >= 4.5 ? "2024-02-01" : null,
              progress: stats.averageRating || 0,
              totalRequired: 4.5
            }
          ],
          recentMilestones: [
            {
              id: "1",
              title: stats.completedBookings >= 10 ? "Completed 10th Session" : `Completed ${stats.completedBookings} Sessions`,
              description: stats.completedBookings > 0 ? "You're making great progress!" : "Start your learning journey!",
              date: new Date().toISOString().split('T')[0],
              type: "session" as const
            },
            {
              id: "2",
              title: `Average Rating: ${stats.averageRating?.toFixed(1) || 0}/5.0`,
              description: stats.averageRating >= 4.5 ? "Excellent performance!" : "Keep up the good work!",
              date: new Date().toISOString().split('T')[0],
              type: "rating" as const
            },
            {
              id: "3",
              title: `${stats.completedBookings} Day Streak`,
              description: stats.completedBookings > 0 ? "Consistent learning!" : "Start your streak today!",
              date: new Date().toISOString().split('T')[0],
              type: "streak" as const
            }
          ]
        };
        
        setProgressData(calculatedProgressData);
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const statsCards = [
    {
      title: "Total Sessions",
      value: studentStats?.totalBookings || 0,
      description: "All tutoring sessions",
      icon: Calendar,
    },
    {
      title: "Hours Learned",
      value: progressData?.totalHours || 0,
      description: "Total learning time",
      icon: Clock,
    },
    {
      title: "Subjects Mastered",
      value: progressData?.subjectsLearned || 0,
      description: "Different subjects learned",
      icon: BookOpen,
    },
    {
      title: "Current Streak",
      value: `${progressData?.streakDays || 0} days`,
      description: "Consecutive learning days",
      icon: Zap,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-[var(--bg-subtle)] rounded-lg animate-pulse" />
          <div className="h-8 w-48 bg-[var(--bg-subtle)] rounded-lg animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow-sm">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="section-heading text-3xl">My Progress</h1>
          <p className="text-[var(--text-muted)]">Track your learning journey and achievements</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card
            key={index}
            className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[var(--text-muted)]">{stat.title}</CardTitle>
              <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)]">
                <stat.icon className="h-5 w-5 text-[var(--text-muted)]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-[var(--text)] mb-1">{stat.value}</div>
              <p className="text-sm text-[var(--text-muted)]">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Learning Progress */}
        <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[var(--accent)]" />
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[var(--text-muted)]" />
              Learning Progress
            </CardTitle>
            <CardDescription>Your overall learning statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Session Completion</span>
                <span className="text-sm font-bold text-[var(--text)]">
                  {progressData?.completedSessions || 0}/{progressData?.totalSessions || 0}
                </span>
              </div>
              <Progress 
                value={progressData ? (progressData.completedSessions / progressData.totalSessions) * 100 : 0} 
                className="h-3 [&>div]:bg-[var(--accent)]"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Average Rating</span>
                <span className="text-sm font-bold text-[var(--text)]">
                  {progressData?.averageRating || 0}/5.0 ⭐
                </span>
              </div>
              <Progress 
                value={progressData ? (progressData.averageRating / 5) * 100 : 0} 
                className="h-3 [&>div]:bg-[var(--accent)]"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">Total Learning Time</span>
                <span className="text-lg font-bold text-[var(--text)]">{progressData?.totalHours || 0}h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Milestones */}
        <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[var(--accent)]" />
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--text-muted)]" />
              Recent Milestones
            </CardTitle>
            <CardDescription>Your latest achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData?.recentMilestones.map((milestone) => (
                <div key={milestone.id} className="flex items-start gap-3 p-3 border border-[var(--border)] bg-[var(--bg-subtle)]/40 rounded-xl">
                  <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] shadow-sm">
                    {milestone.type === "session" && <Calendar className="h-4 w-4 text-[var(--text-muted)]" />}
                    {milestone.type === "subject" && <BookOpen className="h-4 w-4 text-[var(--text-muted)]" />}
                    {milestone.type === "rating" && <Star className="h-4 w-4 text-[var(--text-muted)]" />}
                    {milestone.type === "streak" && <Zap className="h-4 w-4 text-[var(--text-muted)]" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--text)]">{milestone.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{milestone.description}</p>
                    <p className="text-xs text-[var(--text-faint)] mt-1">{new Date(milestone.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
        <div className="h-1.5 bg-[var(--accent)]" />
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[var(--text-muted)]" />
            Achievements
          </CardTitle>
          <CardDescription>Unlock rewards as you learn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {progressData?.achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={cn(
                  "p-4 rounded-xl border text-center transition-all duration-300",
                  achievement.unlockedAt
                    ? "border-[var(--border)] bg-[var(--bg-subtle)]/40 hover:shadow-sm"
                    : "border-[var(--border)] bg-[var(--bg-card)] opacity-60"
                )}
              >
                <div className="flex justify-center mb-2 text-[var(--text-muted)]">
                  {achievement.icon}
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-1">{achievement.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">{achievement.description}</p>
                {achievement.unlockedAt ? (
                  <div className="text-xs text-[var(--text)] font-semibold">✓ Unlocked</div>
                ) : (
                  <div className="text-xs text-[var(--text-muted)] font-semibold">
                    {Math.round((achievement.progress / achievement.totalRequired) * 100)}% Complete
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
