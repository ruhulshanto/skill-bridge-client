"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight,
  RefreshCw,
  Trophy,
  ChevronRight,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import adminService from "@/services/admin.service";
import { toast } from "sonner";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter !== "all") params.status = statusFilter;
      
      const data = await adminService.getApplications(params);
      setApplications(data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const filteredApplications = applications.filter((app) =>
    app.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            Approved
          </div>
        );
      case "REJECTED":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-black uppercase tracking-wider">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500"></div>
            Rejected
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-wider">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
            Pending
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Header Section ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm mb-4">
               <Trophy className="h-3.5 w-3.5" />
               Application Pipeline
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">Tutor Applications</h1>
            <p className="text-[#2d6a9f] font-medium max-w-xl">
              Curate and verify professional tutors for the Elite Mentorship Network. Every approval expands our community expertise.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="px-5 py-3 flex flex-col justify-center items-center rounded-2xl bg-white border border-[#a3c7e6] shadow-sm">
               <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-[0.2em] mb-1">Queue Size</p>
               <p className="text-2xl font-black text-[#0A2540] leading-none">{applications.length}</p>
             </div>
             <Button 
              onClick={fetchApplications}
              variant="outline" 
              size="icon" 
              className="h-14 w-14 rounded-2xl border-[#a3c7e6] bg-white hover:bg-[#CCE7FF] transition-all shadow-sm"
              disabled={loading}
             >
               <RefreshCw className={`h-5 w-5 text-[#2d6a9f] ${loading ? "animate-spin" : ""}`} />
             </Button>
          </div>
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div 
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-[2rem] border border-[#a3c7e6] shadow-lg"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="relative md:col-span-6 lg:col-span-7">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
          <Input
            placeholder="Search applicants by name or subject..."
            className="pl-12 h-12 bg-white border-[#a3c7e6] rounded-xl focus-visible:ring-primary/20 transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative md:col-span-3 lg:col-span-3">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f] pointer-events-none" />
          <select
            className="w-full h-12 pl-11 pr-10 bg-white rounded-xl border border-[#a3c7e6] focus:ring-2 focus:ring-primary/20 appearance-none text-[11px] font-black uppercase tracking-widest text-[#0A2540] cursor-pointer transition-all shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Applicants</option>
            <option value="PENDING">Pending Review</option>
            <option value="APPROVED">Approved Tutors</option>
            <option value="REJECTED">Rejected Entries</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronRight className="h-4 w-4 text-[#2d6a9f] rotate-90" />
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest border-[#a3c7e6] bg-white text-[#2d6a9f] hover:bg-[#CCE7FF] transition-all shadow-sm"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* ── Table Section ── */}
      <div 
        className="relative overflow-hidden border border-[#a3c7e6] rounded-[2.5rem] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/40">
              <TableRow className="hover:bg-transparent border-[#a3c7e6]/50">
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Applicant Profile</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Specialization</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] text-center">Hourly Rate</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] text-center">Status</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Submission Date</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-[#a3c7e6]/30">
                    <TableCell colSpan={6} className="h-24 px-8">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-white border border-[#a3c7e6]"></div>
                          <div className="space-y-2">
                             <div className="h-4 w-32 bg-white rounded"></div>
                             <div className="h-3 w-48 bg-white/50 rounded"></div>
                          </div>
                       </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                       <div className="h-16 w-16 rounded-full bg-white border border-[#a3c7e6] flex items-center justify-center text-[#2d6a9f]">
                          <Search className="h-8 w-8" />
                       </div>
                       <div>
                          <p className="text-lg font-black text-[#0A2540]">No records matching criteria</p>
                          <p className="text-sm text-[#2d6a9f] font-medium">Try adjusting your search terms or filters</p>
                       </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow 
                    key={app.id} 
                    className="group hover:bg-white/40 border-[#a3c7e6]/30 transition-all cursor-pointer"
                    onClick={() => router.push(`/admin/applications/${app.id}`)}
                  >
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0">
                           <div className="relative h-full w-full rounded-full bg-white border border-[#a3c7e6] flex items-center justify-center text-primary font-black text-lg shadow-sm">
                              {app.user.name.charAt(0)}
                           </div>
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-[#0A2540] text-sm leading-tight truncate">{app.user.name}</p>
                          <p className="text-[10px] text-[#2d6a9f] font-bold truncate tracking-tight">{app.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-black text-[#0A2540] text-xs mb-0.5">{app.expertise}</p>
                        <p className="text-[10px] text-[#2d6a9f] font-bold truncate max-w-[180px]">{app.bio}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#a3c7e6] text-[#0A2540] font-black text-sm shadow-sm">
                         <DollarSign className="h-3.5 w-3.5 text-primary" />
                         {app.hourlyRate}
                         <span className="text-[9px] text-[#2d6a9f] font-black">/hr</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(app.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-[#2d6a9f]">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{format(new Date(app.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8">
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white transition-all border border-transparent hover:border-[#a3c7e6]">
                              <MoreHorizontal className="h-5 w-5 text-[#2d6a9f]" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-60 p-2 rounded-[1.5rem] border-[#a3c7e6] bg-[#e5f2ff] shadow-2xl animate-in zoom-in-95 duration-200">
                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f] opacity-60">Management</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                            <DropdownMenuItem 
                              className="flex items-center gap-3 cursor-pointer focus:bg-white focus:text-[#0A2540] rounded-xl py-3 px-3 font-black text-xs uppercase tracking-widest transition-all my-1"
                              onClick={() => router.push(`/admin/applications/${app.id}`)}
                            >
                              <Eye className="h-4 w-4 text-primary" />
                              View Dossier
                            </DropdownMenuItem>
                            
                            {app.status === "PENDING" && (
                              <>
                                <DropdownMenuItem 
                                  className="flex items-center gap-3 cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-600 rounded-xl py-3 px-3 font-black text-xs uppercase tracking-widest transition-all my-1"
                                  onClick={async () => {
                                    try {
                                      await adminService.approveApplication(app.id);
                                      toast.success("Application approved successfully!");
                                      fetchApplications();
                                    } catch (error: any) {
                                      toast.error(error.message);
                                    }
                                  }}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center gap-3 cursor-pointer focus:bg-rose-500/10 focus:text-rose-600 rounded-xl py-3 px-3 font-black text-xs uppercase tracking-widest transition-all my-1"
                                  onClick={async () => {
                                    try {
                                      await adminService.rejectApplication(app.id);
                                      toast.success("Application rejected");
                                      fetchApplications();
                                    } catch (error: any) {
                                      toast.error(error.message);
                                    }
                                  }}
                                >
                                  <XCircle className="h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                            <DropdownMenuItem 
                              className="flex items-center justify-between cursor-default py-2.5 px-3 font-black text-[9px] uppercase tracking-widest text-[#2d6a9f] opacity-60"
                              disabled
                            >
                              ID: {app.id.slice(-8)}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
