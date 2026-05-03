"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import adminService, { User } from "@/services/admin.service";
import { Ban, Check, Search, Filter, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
      };
      if (roleFilter && roleFilter !== 'all') params.role = roleFilter;
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter;

      const response = await adminService.getUsers(params);
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, roleFilter, statusFilter]);

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      await adminService.updateUserStatus(userId, newStatus);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN": return "destructive";
      case "TUTOR": return "default";
      case "STUDENT": return "secondary";
      default: return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE": return "default";
      case "BANNED": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Header ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm mb-4">
               Personnel Directory
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">User Management</h1>
            <p className="text-[#2d6a9f] font-medium max-w-xl">
              Administer students, tutors, and administrative personnel. Manage account status and access privileges.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-3 flex flex-col justify-center items-center rounded-2xl bg-white border border-[#a3c7e6] shadow-sm">
                <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-[0.2em] mb-1">Active Population</p>
                <p className="text-2xl font-black text-[#0A2540]">{pagination.total}</p>
             </div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div 
        className="rounded-[2.5rem] border border-[#a3c7e6] p-8 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5">
            <Label htmlFor="search" className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-3 block">Global Search</Label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email identity..."
                className="h-12 pl-12 rounded-xl bg-white border-[#a3c7e6] focus:ring-primary/20 text-sm font-medium"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <Label className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-3 block">Role Classification</Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-12 rounded-xl bg-white border-[#a3c7e6] text-sm font-bold text-[#0A2540]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#a3c7e6] bg-[#e5f2ff]">
                <SelectItem value="all">All Personnel</SelectItem>
                <SelectItem value="ADMIN">Administrator</SelectItem>
                <SelectItem value="TUTOR">Verified Tutor</SelectItem>
                <SelectItem value="STUDENT">Active Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Label className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-3 block">Access Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 rounded-xl bg-white border-[#a3c7e6] text-sm font-bold text-[#0A2540]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#a3c7e6] bg-[#e5f2ff]">
                <SelectItem value="all">Every State</SelectItem>
                <SelectItem value="ACTIVE">Authorized</SelectItem>
                <SelectItem value="BANNED">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Button 
              size="icon" 
              className="h-12 w-full rounded-xl bg-white border border-[#a3c7e6] text-[#2d6a9f] hover:bg-[#CCE7FF]"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Users Table ── */}
      <div 
        className="overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="p-8 border-b border-[#a3c7e6]/50 bg-white/30 flex items-center justify-between">
           <div>
              <h3 className="text-xl font-black text-[#0A2540] mb-1">User Directory</h3>
              <p className="text-[10px] text-[#2d6a9f] font-bold uppercase tracking-widest">Master record of all system participants</p>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/20">
              <TableRow className="border-b border-[#a3c7e6]/30 hover:bg-transparent">
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Identity</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Classification</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Operational Status</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Onboarding</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Tutor Metrics</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] text-right">Directives</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest animate-pulse">Syncing Directory...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-2xl border border-[#a3c7e6] flex items-center justify-center text-[#2d6a9f]">
                        <Search className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-bold text-[#0A2540]">No matching identities found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-[#a3c7e6]/20 hover:bg-white/40 transition-all group"
                  >
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0">
                          <div className="absolute inset-0 bg-primary/10 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative h-full w-full bg-white border border-[#a3c7e6] rounded-2xl flex items-center justify-center text-primary font-black text-lg shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-[#0A2540] truncate leading-tight group-hover:text-primary transition-colors">{user.name}</div>
                          <div className="text-[10px] font-bold text-[#2d6a9f] truncate mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex border",
                        user.role === "ADMIN" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" :
                        user.role === "TUTOR" ? "bg-primary/10 text-primary border-primary/20" :
                        "bg-white text-[#2d6a9f] border-[#a3c7e6]"
                      )}>
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {user.status === 'ACTIVE' ? 'Authorized' : 'Terminated'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="text-xs font-bold text-[#2d6a9f]">
                        {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      {user.tutorProfile ? (
                        <div className="flex items-center gap-3">
                           <div className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black">
                              ${user.tutorProfile.hourlyRate}/hr
                           </div>
                           <div className="flex items-center gap-1 text-[#0A2540] font-black text-xs">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {user.tutorProfile.rating}
                           </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest opacity-30 italic">Standard Access</span>
                      )}
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      {user.status === "ACTIVE" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusUpdate(user.id, "BANNED")}
                          className="rounded-xl h-10 px-4 font-black text-[10px] uppercase tracking-widest text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent hover:border-rose-100 transition-all"
                        >
                          <Ban className="h-3.5 w-3.5 mr-2" />
                          Terminate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-xl h-10 px-4 font-black text-[10px] uppercase tracking-widest text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 border border-transparent hover:border-emerald-100 transition-all"
                          onClick={() => handleStatusUpdate(user.id, "ACTIVE")}
                        >
                          <Check className="h-3.5 w-3.5 mr-2" />
                          Reauthorize
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination ── */}
        {pagination.totalPages > 1 && (
          <div className="p-8 bg-white/30 border-t border-[#a3c7e6]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">
              Identity Matrix • {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} records
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                className="h-10 px-4 rounded-xl border border-[#a3c7e6]/50 bg-white text-[#2d6a9f] hover:bg-[#CCE7FF] font-black text-[10px] uppercase tracking-widest disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <div className="h-10 px-5 flex items-center bg-white border border-[#a3c7e6] rounded-xl shadow-sm">
                <span className="text-[10px] font-black text-[#0A2540] uppercase tracking-widest">
                  Page {pagination.page} / {pagination.totalPages}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                className="h-10 px-4 rounded-xl border border-[#a3c7e6]/50 bg-white text-[#2d6a9f] hover:bg-[#CCE7FF] font-black text-[10px] uppercase tracking-widest disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  ); 
}