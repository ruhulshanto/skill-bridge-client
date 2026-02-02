"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Video, CheckCircle, XCircle, Filter, Star, MessageSquare, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import tutorService, { TutorBooking } from "@/services/tutor.service";

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<TutorBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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

    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "upcoming" && (session.status === "CONFIRMED")) ||
      (filter === "completed" && session.status === "COMPLETED") ||
      (filter === "cancelled" && session.status === "CANCELLED");
    
    const matchesSearch = 
      session.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-blue-100 text-blue-800";
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED": return <Calendar className="h-4 w-4" />;
      case "COMPLETED": return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED": return <XCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Teaching Sessions</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="shadow-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Teaching Sessions</h1>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex gap-2">
                {(["all", "upcoming", "completed", "cancelled"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(status)}
                    className={filter === status ? "bg-blue-600 text-white" : ""}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <User className="h-4 w-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search by student name or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-100 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600">
                {filter === "all" 
                  ? "You don't have any teaching sessions yet" 
                  : `No ${filter} sessions found`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={session.student.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"}
                      alt={session.student.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.student.name}</h3>
                      <div className="text-sm text-gray-600">{session.student.email}</div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">${session.totalAmount}</span>
                      </div>
                    </div>
                    {session.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{session.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={`${getStatusColor(session.status)} flex items-center gap-1`}>
                      {getStatusIcon(session.status)}
                      {session.status}
                    </Badge>
                    
                    {session.review && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{session.review.rating}</span>
                        {session.review.comment && (
                          <MessageSquare className="h-4 w-4 text-gray-400 ml-1" />
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {session.status === "CONFIRMED" && session.meetingLink && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Video className="h-4 w-4 mr-1" />
                          Join Session
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
