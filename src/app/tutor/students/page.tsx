"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, BookOpen, Calendar, TrendingUp, Star, Search } from "lucide-react";
import { useState, useEffect } from "react";
import tutorService, { TutorStudent } from "@/services/tutor.service";

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.reduce((sum, s) => sum + s.totalSessions, 0)}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.reduce((sum, s) => sum + s.completedSessions, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.reduce((sum, s) => sum + s.upcomingSessions, 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-100 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">
                {searchTerm ? "No students match your search" : "You don't have any students yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={student.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{student.subject}</Badge>
                        {student.rating && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{student.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Session Stats */}
                  <div className="flex-1">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{student.totalSessions}</p>
                        <p className="text-sm text-gray-600">Total Sessions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{student.completedSessions}</p>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{student.upcomingSessions}</p>
                        <p className="text-sm text-gray-600">Upcoming</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Last session: {student.lastSession ? new Date(student.lastSession).toLocaleDateString() : "No sessions yet"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      View Schedule
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
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
