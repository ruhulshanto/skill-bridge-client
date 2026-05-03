"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import adminService, { Booking } from "@/services/admin.service";
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Star, 
  User, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Download,
  MoreVertical
} from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
      };
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter;

      const response = await adminService.getBookings(params);
      setBookings(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [pagination.page, statusFilter]);

  const filteredBookings = bookings.filter(booking =>
    booking.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tutor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tutor.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColors = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "CONFIRMED": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "PENDING": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "CANCELLED": return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Header ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm mb-4">
               <Calendar className="h-3.5 w-3.5" />
               Session Management
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">Bookings</h1>
            <p className="text-[#2d6a9f] font-medium max-w-xl">
              Monitor and manage all tutoring sessions across the platform. Use filters to narrow down specific sessions.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-xl font-bold text-xs h-12 border-[#a3c7e6] bg-white hover:bg-[#CCE7FF] transition-all shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Ledger
             </Button>
          </div>
        </div>
      </div>

      {/* ── Filters & Stats ── */}
      <div className="grid gap-6 lg:grid-cols-4">
        <Card 
          className="lg:col-span-3 overflow-hidden rounded-[2rem] border-[#a3c7e6] shadow-lg"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50">
            <CardTitle className="text-lg pt-1 font-black text-[#0A2540] flex items-center gap-2">
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <Label htmlFor="search" className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Search Directory</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
                  <Input
                    id="search"
                    placeholder="Tutor name, student email, or session ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 rounded-xl bg-white border-[#a3c7e6] focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="w-full sm:w-64 space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Session Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 rounded-xl bg-white border-[#a3c7e6]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-[#a3c7e6]">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending Approval</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="overflow-hidden rounded-[2rem] border-[#a3c7e6] shadow-lg flex flex-col justify-center text-center p-6"
          style={{ backgroundColor: "#e5f2ff" }}
        >
           <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-1">Total Volume</p>
           <h3 className="text-3xl font-black text-[#0A2540]">{pagination.total}</h3>
           <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center justify-center gap-1">
             <TrendingUp className="h-3 w-3" />
             +12% this week
           </p>
        </Card>
      </div>

      {/* ── Bookings Table ── */}
      <Card 
        className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/40">
                <TableRow className="hover:bg-transparent border-[#a3c7e6]/50">
                  <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Session Schedule</TableHead>
                  <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Participants</TableHead>
                  <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Status</TableHead>
                  <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Financials</TableHead>
                  <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                         <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                         <p className="text-[#2d6a9f] font-black uppercase tracking-widest text-xs">Synchronizing Bookings...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center text-[#2d6a9f] font-medium">
                      No bookings match your current filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="group hover:bg-white/40 border-[#a3c7e6]/30 transition-all">
                      <TableCell className="py-6 px-8">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 font-black text-[#0A2540]">
                            <Calendar className="h-4 w-4 text-primary" />
                            {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-[#2d6a9f]">
                            <Clock className="h-3.5 w-3.5" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-white border border-[#a3c7e6] flex items-center justify-center font-black text-primary text-xs shadow-sm">
                              {booking.student.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-black text-[#0A2540] text-sm leading-none">{booking.student.name}</div>
                              <div className="text-[10px] font-bold text-[#2d6a9f] mt-1 uppercase tracking-tight">Student</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-xs shadow-sm">
                              {booking.tutor.user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-black text-[#0A2540] text-sm leading-none">{booking.tutor.user.name}</div>
                              <div className="text-[10px] font-bold text-[#2d6a9f] mt-1 uppercase tracking-tight">Expert Tutor</div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-8">
                        <Badge className={`rounded-xl border px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-none ${getStatusColors(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6 px-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 font-black text-[#0A2540] text-lg">
                            <span className="text-sm opacity-60">$</span>
                            {booking.totalAmount}
                          </div>
                          <div className="text-[10px] font-bold text-[#2d6a9f] uppercase tracking-tighter">
                            Rate: ${booking.tutor.hourlyRate}/hr
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-8">
                        {booking.review ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 px-2 py-1 bg-amber-400/10 border border-amber-400/20 rounded-lg w-fit">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-[11px] font-black text-amber-600">{booking.review.rating}</span>
                            </div>
                            {booking.review.comment && (
                              <p className="text-xs text-[#2d6a9f] font-medium max-w-xs italic line-clamp-2">
                                "{booking.review.comment}"
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[#2d6a9f] opacity-40">
                             <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Feedback</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-8 border-t border-[#a3c7e6]/50 bg-white/20">
             <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-xs font-black text-[#2d6a9f] uppercase tracking-widest">
                   Showing <span className="text-[#0A2540]">{filteredBookings.length}</span> of <span className="text-[#0A2540]">{pagination.total}</span> sessions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-xl h-10 px-4 border-[#a3c7e6] bg-white font-bold text-xs shadow-sm disabled:opacity-30"
                    disabled={pagination.page <= 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <div className="flex items-center justify-center min-w-[100px] h-10 rounded-xl bg-white border border-[#a3c7e6] text-[10px] font-black text-[#0A2540] uppercase tracking-widest shadow-sm">
                    Page {pagination.page} / {pagination.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl h-10 px-4 border-[#a3c7e6] bg-white font-bold text-xs shadow-sm disabled:opacity-30"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
