"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  User, 
  Briefcase, 
  DollarSign, 
  GraduationCap, 
  ExternalLink,
  Calendar,
  ShieldCheck,
  Award,
  Globe,
  FileText
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import adminService from "@/services/admin.service";
import { toast } from "sonner";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (!id) throw new Error("Application ID is missing");
        setLoading(true);
        const data = await adminService.getApplicationById(id as string);
        setApplication(data);
      } catch (err: any) {
        setError(err.message || "Failed to load application details");
        toast.error("Failed to load application details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplication();
  }, [id]);

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await adminService.approveApplication(id as string);
      toast.success("Application approved! Tutor profile created.");
      router.push("/admin/applications");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      await adminService.rejectApplication(id as string);
      toast.success("Application rejected");
      router.push("/admin/applications");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Processing Records...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="text-center py-32 max-w-md mx-auto">
        <div className="bg-rose-500/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
           <XCircle className="h-10 w-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-4">{error || "Record Not Found"}</h2>
        <p className="text-muted-foreground mb-8">The requested application could not be retrieved. It may have been moved or you might not have access.</p>
        <Button asChild className="rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:brightness-110 h-12">
          <Link href="/admin/applications">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-black uppercase tracking-wider">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approved
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-black uppercase tracking-wider">
            <XCircle className="h-3.5 w-3.5" />
            Rejected
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-black uppercase tracking-wider animate-pulse">
            <Clock className="h-3.5 w-3.5" />
            Pending Review
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* ── Top Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-4">
          <Link 
            href="/admin/applications" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] hover:text-primary transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-white border border-[#a3c7e6] group-hover:border-primary/50 transition-all shadow-sm">
              <ArrowLeft className="h-3 w-3" />
            </div>
            Back to Application Queue
          </Link>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">Application Detail</h1>
            <p className="text-[#2d6a9f] font-medium">Reviewing expertise and credentials for tutor verification.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(application.status)}
          <div className="h-10 w-px bg-[#a3c7e6]/50 hidden md:block"></div>
          <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest leading-none">
            ID: {application.id.slice(-8)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left Column (Main Info) ── */}
        <div className="lg:col-span-8 space-y-8">
          {/* Expertise & Bio Card */}
          <div 
            className="relative overflow-hidden border border-[#a3c7e6] rounded-[2.5rem] shadow-xl p-8 md:p-10"
            style={{ backgroundColor: "#e5f2ff" }}
          >
             {/* decorative gradient blob */}
             <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#a3c7e6] flex items-center justify-center text-primary shadow-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#0A2540]">{application.expertise}</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5">Primary Specialization</p>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm border border-[#a3c7e6]/50 rounded-3xl p-8 mb-8 shadow-inner">
                  <p className="text-[#0A2540] leading-relaxed font-medium whitespace-pre-wrap">
                    {application.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div className="p-5 rounded-2xl bg-white border border-[#a3c7e6]/50 hover:border-primary/30 transition-all group shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2d6a9f] mb-3 group-hover:text-primary transition-colors">Experience</p>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-primary">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-black text-[#0A2540]">{application.experience} Years</span>
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-white border border-[#a3c7e6]/50 hover:border-primary/30 transition-all group shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2d6a9f] mb-3 group-hover:text-primary transition-colors">Hourly Rate</p>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-primary">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-black text-[#0A2540]">${application.hourlyRate}<span className="text-[10px] text-[#2d6a9f] font-black">/hr</span></span>
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-white border border-[#a3c7e6]/50 hover:border-primary/30 transition-all group shadow-sm col-span-2 md:col-span-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2d6a9f] mb-3 group-hover:text-primary transition-colors">Education</p>
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-8 w-8 rounded-lg bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-primary">
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-black text-[#0A2540] truncate">{application.education || "N/A"}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Additional Details & Portfolio */}
          <div 
            className="border border-[#a3c7e6] rounded-[2.5rem] p-8 md:p-10 shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
             <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-black text-[#0A2540] uppercase tracking-tight">Credentials & Assets</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {application.portfolioUrl && (
                  <div className="relative group overflow-hidden bg-white/50 hover:bg-white border border-[#a3c7e6]/50 rounded-[2rem] p-6 transition-all duration-500 cursor-pointer shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:scale-110">
                        <Globe className="h-6 w-6" />
                      </div>
                      <a 
                        href={application.portfolioUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white hover:bg-[#CCE7FF] border border-[#a3c7e6]/30 transition-colors shadow-sm"
                      >
                        <ExternalLink className="h-4 w-4 text-[#2d6a9f]" />
                      </a>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#0A2540] mb-1">Portfolio & Work</h4>
                      <p className="text-[10px] text-[#2d6a9f] font-black truncate mb-4">{application.portfolioUrl}</p>
                      <Button asChild variant="outline" className="w-full rounded-xl font-black text-[10px] uppercase tracking-widest h-11 border-[#a3c7e6] bg-white text-[#2d6a9f] hover:bg-[#CCE7FF] transition-all">
                        <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer">View Dossier</a>
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#a3c7e6]/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-[#2d6a9f]">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-[#2d6a9f] tracking-widest">Submitted</p>
                          <p className="text-sm font-black text-[#0A2540]">{format(new Date(application.createdAt), "MMM d, yyyy")}</p>
                        </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#a3c7e6]/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-[#2d6a9f]">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-[#2d6a9f] tracking-widest">Application Type</p>
                          <p className="text-sm font-black text-[#0A2540]">Expert Verification</p>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* ── Right Column (Applicant & Actions) ── */}
        <div className="lg:col-span-4 space-y-8">
           {/* Applicant Profile Card */}
           <div 
             className="border border-[#a3c7e6] rounded-[2.5rem] p-8 shadow-xl"
             style={{ backgroundColor: "#e5f2ff" }}
           >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f] mb-8 text-center">Verified Identity</p>
              
              <div className="flex flex-col items-center">
                 <div className="relative mb-6">
                    <div className="relative h-28 w-28 rounded-full bg-white border border-[#a3c7e6] p-2 shadow-inner">
                       <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary">
                          {application.user.name.charAt(0)}
                       </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-emerald-500 border-4 border-[#e5f2ff] flex items-center justify-center text-white">
                       <CheckCircle2 className="h-4 w-4" />
                    </div>
                 </div>

                 <h3 className="text-2xl font-black text-[#0A2540] mb-1 text-center">{application.user.name}</h3>
                 <p className="text-sm font-bold text-[#2d6a9f] mb-8 text-center truncate w-full px-4">{application.user.email}</p>

                 <div className="w-full space-y-3">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#a3c7e6]/50 group hover:border-primary/30 transition-all shadow-sm">
                       <div className="h-10 w-10 rounded-xl bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Mail className="h-4 w-4" />
                       </div>
                       <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase text-[#2d6a9f] tracking-tight">Direct Email</p>
                          <p className="text-[11px] font-black truncate text-[#0A2540]">{application.user.email}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#a3c7e6]/50 group hover:border-primary/30 transition-all shadow-sm">
                       <div className="h-10 w-10 rounded-xl bg-[#CCE7FF]/30 border border-[#a3c7e6]/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <User className="h-4 w-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-[#2d6a9f] tracking-tight">Onboarding</p>
                          <p className="text-[11px] font-black text-[#0A2540]">Since {format(new Date(application.user.createdAt), "MMM yyyy")}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Administrative Decision Card */}
           <div 
             className="border-2 border-[#a3c7e6] rounded-[2.5rem] p-8 shadow-2xl sticky top-10"
             style={{ backgroundColor: "#e5f2ff" }}
           >
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f] mb-8 text-center">Command Decision</h3>
              
              {application.status === "PENDING" ? (
                <div className="space-y-4">
                  <Button 
                    className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                    onClick={handleApprove}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Grant Privileges
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/40 flex items-center justify-center gap-3 transition-all active:scale-[0.98] bg-white shadow-sm"
                    onClick={handleReject}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <div className="h-5 w-5 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        Decline Entry
                      </>
                    )}
                  </Button>
                  
                  <div className="pt-4 border-t border-[#a3c7e6]/50 mt-6">
                    <p className="text-[9px] text-center text-[#2d6a9f] font-black uppercase tracking-widest leading-relaxed">
                      Approval will activate the <span className="text-[#0A2540]">Tutor Profile</span> immediately in the public directory.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-6">
                  <div className={`h-16 w-16 rounded-full border flex items-center justify-center mb-4 ${
                    application.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                  }`}>
                    {application.status === "APPROVED" ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                  </div>
                  <h4 className="text-lg font-black text-[#0A2540] mb-2 uppercase tracking-tight">
                    {application.status === "APPROVED" ? "Verified Partner" : "Case Closed"}
                  </h4>
                  <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">
                    Processed {format(new Date(application.updatedAt), "MMM d, yyyy")}
                  </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
