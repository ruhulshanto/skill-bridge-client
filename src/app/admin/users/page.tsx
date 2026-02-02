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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage students, tutors, and admin accounts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            {filteredUsers.length} Active Users
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium mb-1 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or email..."
                  className="pl-9"
                />
              </div>
            </div>
            <div className="w-full lg:w-64">
              <Label className="text-sm font-medium mb-1 block">Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="TUTOR">Tutor</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full lg:w-64">
              <Label className="text-sm font-medium mb-1 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="BANNED">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                List of all registered users in the system.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
              </div>
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-700">
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Role</TableHead>
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Joined</TableHead>
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Tutor Info</TableHead>
                    <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className="px-3 py-1 text-xs font-medium"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          <Badge
                            variant={getStatusBadgeVariant(user.status)}
                            className="px-3 py-1 text-xs font-medium"
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {user.tutorProfile ? (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                ${user.tutorProfile.hourlyRate}/hr
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {user.tutorProfile.rating}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {user.tutorProfile.totalReviews} reviews
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 dark:text-gray-600">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="text-xs">Not a tutor</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex gap-2">
                          {user.status === "ACTIVE" ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusUpdate(user.id, "BANNED")}
                              className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <Ban className="h-3 w-3 mr-1" />
                              Ban
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                              onClick={() => handleStatusUpdate(user.id, "ACTIVE")}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Enhanced Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  className="border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <span className="text-sm font-medium">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="border-gray-300 hover:border-gray-400 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
