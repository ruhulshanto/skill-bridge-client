"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, BookOpen, Calendar, TrendingUp, Star, Search } from "lucide-react";
import { useState, useEffect } from "react";
import tutorService, { TutorStudent } from "@/services/tutor.service";
import { TutorHeaderSkeleton, TutorStatsSkeleton } from "@/components/tutor/tutor-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function TutorStudentsPage() {
  const [students, setStudents] = useState<TutorStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await tutorService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">

        <TutorHeaderSkeleton />
        <TutorStatsSkeleton />
        <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
            <Skeleton className="h-8 w-48 bg-white/40" />
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#a3c7e6] shadow-md overflow-hidden rounded-[2.5rem] bg-white/60 p-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="flex items-center gap-6 lg:w-80">
                    <Skeleton className="w-20 h-20 rounded-[1.5rem] bg-white" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32 bg-[#0A2540]/10" />
                      <Skeleton className="h-3 w-40 bg-[#2d6a9f]/10" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-3 gap-8">
                      {[1, 2, 3].map(j => <Skeleton key={j} className="h-20 w-full rounded-2xl bg-white/40" />)}
                    </div>
                  </div>
                  <div className="flex lg:flex-col gap-4 lg:w-56">
                    <Skeleton className="h-12 w-full rounded-xl bg-[#0A2540]/10" />
                    <Skeleton className="h-12 w-full rounded-xl bg-white/60" />
                  </div>
                </div>
              </div>
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
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
               <User className="h-3 w-3" /> Student Directory
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A2540]">
              My Students
            </h1>
            <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
              Maintain a detailed ledger of your pupils. Monitor their progression, manage session historicals, and cultivate educational relationships.
            </p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2d6a9f]" />
            <input
              type="text"
              placeholder="Filter by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border border-[#a3c7e6] rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-bold bg-white text-[#0A2540]"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: students.length, icon: User, color: "var(--accent)" },
          { label: "Total Sessions", value: students.reduce((sum, s) => sum + s.totalSessions, 0), icon: BookOpen, color: "var(--text)" },
          { label: "Completed", value: students.reduce((sum, s) => sum + s.completedSessions, 0), icon: TrendingUp, color: "var(--accent)" },
          { label: "Upcoming", value: students.reduce((sum, s) => sum + s.upcomingSessions, 0), icon: Calendar, color: "var(--text)" },
        ].map((stat, i) => (
          <Card key={i} className="border border-[#a3c7e6] shadow-lg rounded-[2rem] overflow-hidden" style={{ backgroundColor: "#e5f2ff" }}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[#2d6a9f]">{stat.label}</p>
                  <p className="text-3xl font-black text-[#0A2540]">{stat.value}</p>
                </div>
                <div 
                  className="p-4 rounded-2xl bg-white border border-[#a3c7e6] text-primary shadow-sm"
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Students List */}
      <Card 
        className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-[#0A2540]">Student Ledger</CardTitle>
              <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                {filteredStudents.length} Active pupils identified
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-8">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-24 rounded-[3rem] border-4 border-dashed border-[#a3c7e6]/30 bg-white/20">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner bg-white border border-[#a3c7e6]">
                  <User className="h-10 w-10 text-[#2d6a9f] opacity-40" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#0A2540]">No pupils identified</h3>
                <p className="font-medium text-[#2d6a9f] opacity-60">
                  {searchTerm ? "No students match your search criteria" : "Your student network is currently empty"}
                </p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div 
                  key={student.id} 
                  className="border border-[#a3c7e6] shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group rounded-[2.5rem] bg-white/60"
                >
                  <CardContent className="p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                      {/* Student Info */}
                      <div className="flex items-center gap-6 lg:w-80">
                        <img
                          src={student.image || `https://i.pravatar.cc/150?u=${student.id}`}
                          alt={student.name}
                          className="w-20 h-20 rounded-[1.5rem] object-cover border-4 border-white shadow-lg"
                        />
                        <div className="overflow-hidden">
                          <h3 className="text-xl font-black truncate text-[#0A2540] group-hover:text-primary transition-colors">{student.name}</h3>
                          <div className="flex items-center gap-2 text-xs font-bold mt-1 text-[#2d6a9f] opacity-60">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <Badge className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white border border-[#a3c7e6] text-[#0A2540] shadow-sm">
                              {student.subject}
                            </Badge>
                            {student.rating && (
                              <div className="flex items-center gap-1.5 text-xs font-black text-primary">
                                <Star className="h-4 w-4 fill-current" />
                                <span>{student.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Session Stats */}
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-8">
                          <div className="text-center p-4 rounded-2xl bg-white/40 border border-[#a3c7e6]/30">
                            <p className="text-2xl font-black text-[#0A2540]">{student.totalSessions}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40">Matrix Total</p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-white/40 border border-[#a3c7e6]/30">
                            <p className="text-2xl font-black text-emerald-600">{student.completedSessions}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40">Successful</p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-white/40 border border-[#a3c7e6]/30">
                            <p className="text-2xl font-black text-primary">{student.upcomingSessions}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40">Scheduled</p>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40">
                          <Calendar className="h-3 w-3" />
                          <span>Last Sync: {student.lastSession ? new Date(student.lastSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Initial Node"}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-4 lg:w-56">
                        <Button 
                          className="h-12 w-full rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all hover:scale-105 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white border-0"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Sync Schedule
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-12 w-full rounded-xl font-black uppercase tracking-widest text-[10px] border border-[#a3c7e6] transition-all hover:bg-white text-[#0A2540]"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Direct Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
