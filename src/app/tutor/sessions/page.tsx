"use client";

import { Card, CardContent } from "@/components/ui/card";
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
      <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Teaching Sessions</h1>
          <p className="text-gray-500 font-medium">Manage your schedule and connect with students.</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sessions", value: sessions.length, color: "from-blue-500 to-indigo-600", icon: Calendar },
          { label: "Earnings", value: `$${sessions.reduce((sum, s) => sum + s.totalAmount, 0)}`, color: "from-emerald-500 to-teal-600", icon: DollarSign },
          { label: "Students", value: new Set(sessions.map(s => s.student.id)).size, color: "from-purple-500 to-indigo-600", icon: User },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-gray-100 overflow-hidden group">
            <div className={cn("h-1 bg-gradient-to-r", stat.color)} />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
              <div className={cn("p-4 rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full lg:w-auto">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 lg:flex-none",
                filter === s 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="grid gap-6">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-4 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-500">Your scheduled sessions will appear here.</p>
          </div>
        ) : (
          filteredSessions.map((session) => {
            const status = getStatusConfig(session);
            return (
              <Card key={session.id} className="border-none shadow-xl shadow-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Status & Date Sidebar */}
                  <div className="hidden lg:flex w-48 bg-slate-50 flex-col items-center justify-center p-6 border-r border-gray-50 text-center gap-2">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-4xl font-black text-gray-900">{new Date(session.date).getDate()}</p>
                    <p className="text-xs font-bold text-gray-500">{new Date(session.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  </div>

                  <CardContent className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                      {/* Student Image & Info */}
                      <div className="flex items-center gap-4 lg:w-64">
                        <div className="relative">
                          <img
                            src={session.student.image || `https://i.pravatar.cc/150?u=${session.student.id}`}
                            alt={session.student.name}
                            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
                          />
                          <div className={cn("absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center", status.color.split(' ')[0])}>
                            {status.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{session.student.name}</h3>
                          <p className="text-xs font-medium text-gray-400 truncate max-w-[150px]">{session.student.email}</p>
                        </div>
                      </div>

                      {/* Time & Meeting Info */}
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Time
                            </p>
                            <p className="text-sm font-bold text-gray-700">{session.startTime} - {session.endTime}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                              <User className="h-3 w-3" /> Role
                            </p>
                            <p className="text-sm font-bold text-gray-700">Tutor</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                              <DollarSign className="h-3 w-3" /> Earning
                            </p>
                            <p className="text-sm font-bold text-gray-900">${session.totalAmount}</p>
                          </div>
                        </div>
                        {session.notes && (
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex gap-2">
                            <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                            <p className="text-xs text-gray-500 italic line-clamp-2">{session.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-3 lg:w-48 lg:items-stretch">
                        <Badge variant="outline" className={cn("justify-center py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg", status.color)}>
                          {status.label}
                        </Badge>
                        
                        {getEffectiveStatus(session) === "CONFIRMED" && session.meetingLink && (
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-50 text-xs font-bold h-10">
                            <Video className="h-4 w-4 mr-2" /> Start Session
                          </Button>
                        )}

                        {session.review && (
                          <div className="flex flex-col gap-1 p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span className="text-sm font-bold">{session.review.rating}</span>
                            </div>
                            {session.review.comment && (
                              <p className="text-[10px] text-center italic line-clamp-1">"{session.review.comment}"</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
