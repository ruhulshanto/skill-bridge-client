"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Star, 
  MessageSquare, 
  DollarSign,
  ChevronRight,
  Search,
  MoreVertical,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import tutorService, { TutorBooking } from "@/services/tutor.service";
import { cn } from "@/lib/utils";
import { TutorHeaderSkeleton, TutorStatsSkeleton, TutorSessionItemSkeleton } from "@/components/tutor/tutor-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<TutorBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await tutorService.getBookings();
      setSessions(response.data || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000);
    return () => clearInterval(interval);
  }, []);

  const isSessionTimePassed = (session: TutorBooking) => {
    const bookingDate = new Date(session.date);
    const [hours, minutes] = session.endTime.split(':').map(Number);
    const sessionEndDateTime = new Date(bookingDate);
    sessionEndDateTime.setHours(hours, minutes, 0, 0);
    return new Date() > sessionEndDateTime;
  };

  const getEffectiveStatus = (session: TutorBooking) => {
    if (session.status === "CANCELLED") return "CANCELLED";
    if (session.status === "COMPLETED") return "COMPLETED";
    if (isSessionTimePassed(session)) return "COMPLETED";
    return "CONFIRMED";
  };

  const getStatusConfig = (session: TutorBooking) => {
    const status = getEffectiveStatus(session);
    switch (status) {
      case "CONFIRMED":
        return {
          label: "Upcoming",
          color: "bg-blue-50 text-blue-700 border-blue-100",
          icon: <Clock className="h-3 w-3" />
        };
      case "COMPLETED":
        return {
          label: "Completed",
          color: "bg-emerald-50 text-emerald-700 border-emerald-100",
          icon: <CheckCircle2 className="h-3 w-3" />
        };
      case "CANCELLED":
        return {
          label: "Cancelled",
          color: "bg-rose-50 text-rose-700 border-rose-100",
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          label: status,
          color: "bg-gray-50 text-gray-700 border-gray-100",
          icon: <AlertCircle className="h-3 w-3" />
        };
    }
  };

  const filteredSessions = sessions.filter(session => {
    const status = getEffectiveStatus(session);
    const matchesFilter = 
      filter === "all" || 
      (filter === "upcoming" && status === "CONFIRMED") ||
      (filter === "completed" && status === "COMPLETED") ||
      (filter === "cancelled" && status === "CANCELLED");
    
    const matchesSearch = 
      session.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.notes && session.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">

        <TutorHeaderSkeleton />
        <TutorStatsSkeleton />
        <div className="rounded-[2rem] border border-[#a3c7e6] p-6 shadow-lg flex flex-col lg:flex-row gap-6 items-center bg-[#e5f2ff]">
          <Skeleton className="h-14 w-full lg:w-96 rounded-xl bg-white/40" />
          <Skeleton className="h-14 w-full flex-1 rounded-xl bg-white/40" />
        </div>
        <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
            <Skeleton className="h-8 w-48 bg-white/40" />
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {[1, 2, 3].map((i) => (
              <TutorSessionItemSkeleton key={i} />
            ))}
          </CardContent>
        </Card>
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
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
             <Calendar className="h-3 w-3" /> Session Management
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A2540]">
            Teaching Sessions
          </h1>
          <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
            Track your interactions, manage upcoming meetings, and review student feedback from your historical record.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sessions", value: sessions.length, color: "var(--accent)", icon: Calendar },
          { label: "Total Earnings", value: `$${sessions.reduce((sum, s) => sum + s.totalAmount, 0)}`, color: "var(--text)", icon: DollarSign },
          { label: "Active Students", value: new Set(sessions.map(s => s.student.id)).size, color: "var(--accent)", icon: User },
        ].map((stat, i) => (
          <Card key={i} className="border border-[#a3c7e6] shadow-lg rounded-[2rem] overflow-hidden" style={{ backgroundColor: "#e5f2ff" }}>
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[#2d6a9f]">{stat.label}</p>
                <p className="text-4xl font-black text-[#0A2540]">{stat.value}</p>
              </div>
              <div 
                className="p-5 rounded-2xl bg-white border border-[#a3c7e6] text-primary shadow-sm"
              >
                <stat.icon className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div 
        className="rounded-[2rem] border border-[#a3c7e6] p-6 shadow-lg flex flex-col lg:flex-row gap-6 items-center"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="flex p-1.5 rounded-[1.25rem] w-full lg:w-auto bg-white/50 border border-[#a3c7e6]/30 shadow-inner">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex-1 lg:flex-none",
                filter === s 
                  ? "bg-primary text-white shadow-lg scale-105" 
                  : "text-[#2d6a9f] hover:bg-white/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2d6a9f]" />
          <input
            type="text"
            placeholder="Search students or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 border border-[#a3c7e6] rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-bold bg-white text-[#0A2540]"
          />
        </div>
      </div>

      {/* Sessions List */}
      <Card 
        className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-[#0A2540]">Session Log</CardTitle>
              <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                {filteredSessions.length} active sessions found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-8">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-24 rounded-[3rem] border-4 border-dashed border-[#a3c7e6]/30 bg-white/20">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner bg-white border border-[#a3c7e6]">
                  <Calendar className="h-10 w-10 text-[#2d6a9f] opacity-40" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#0A2540]">No sessions found</h3>
                <p className="font-medium text-[#2d6a9f] opacity-60">Your scheduled sessions will appear here.</p>
              </div>
            ) : (
              filteredSessions.map((session) => {
                const status = getStatusConfig(session);
                return (
                  <div 
                    key={session.id} 
                    className="border border-[#a3c7e6] shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group rounded-[2.5rem] bg-white/60"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Status & Date Sidebar */}
                      <div className="hidden lg:flex w-40 flex-col items-center justify-center p-8 border-r border-[#a3c7e6]/30 text-center gap-2 bg-white/40">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f]">{new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                        <p className="text-5xl font-black text-[#0A2540]">{new Date(session.date).getDate()}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-60">{new Date(session.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      </div>

                      <div className="flex-1 p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                          {/* Student Image & Info */}
                          <div className="flex items-center gap-6 lg:w-72">
                            <div className="relative">
                              <img
                                src={session.student.image || `https://i.pravatar.cc/150?u=${session.student.id}`}
                                alt={session.student.name}
                                className="w-20 h-20 rounded-[1.5rem] object-cover border-4 border-white shadow-lg"
                              />
                              <div 
                                className={cn("absolute -bottom-2 -right-2 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center shadow-lg", status.color.split(' ')[0])}
                              >
                                {status.icon}
                              </div>
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="text-xl font-black truncate text-[#0A2540] group-hover:text-primary transition-colors">{session.student.name}</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-50 truncate">{session.student.email}</p>
                            </div>
                          </div>

                          {/* Time & Meeting Info */}
                          <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                              <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#2d6a9f]">
                                  <Clock className="h-3 w-3" /> Time
                                </p>
                                <p className="text-sm font-black text-[#0A2540]">{session.startTime} - {session.endTime}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#2d6a9f]">
                                  <User className="h-3 w-3" /> Role
                                </p>
                                <p className="text-sm font-black text-[#0A2540]">Lead Tutor</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#2d6a9f]">
                                  <DollarSign className="h-3 w-3" /> Earning
                                </p>
                                <p className="text-sm font-black text-primary">${session.totalAmount}</p>
                              </div>
                            </div>
                            {session.notes && (
                              <div className="p-4 rounded-2xl border border-[#a3c7e6]/30 bg-white/40 flex gap-3 shadow-inner">
                                <MessageSquare className="h-4 w-4 shrink-0 text-[#2d6a9f]" />
                                <p className="text-xs font-medium italic leading-relaxed text-[#2d6a9f]">{session.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex lg:flex-col gap-4 lg:w-56 lg:items-stretch">
                            <Badge 
                              className={cn("justify-center py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border-none shadow-sm", status.color)}
                            >
                              {status.label}
                            </Badge>
                            
                            {getEffectiveStatus(session) === "CONFIRMED" && session.meetingLink && (
                              <Button 
                                className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white rounded-xl shadow-lg text-[10px] font-black uppercase tracking-[0.2em] h-12 transition-all hover:scale-105"
                              >
                                <Video className="h-4 w-4 mr-2" /> Start Now
                              </Button>
                            )}

                            {session.review && (
                              <div className="flex flex-col gap-2 p-4 rounded-2xl shadow-inner border border-amber-500/10 bg-amber-500/5 text-amber-600">
                                <div className="flex items-center justify-center gap-2">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm font-black">{session.review.rating}</span>
                                </div>
                                {session.review.comment && (
                                  <p className="text-[10px] text-center font-bold italic line-clamp-2 opacity-80">"{session.review.comment}"</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
