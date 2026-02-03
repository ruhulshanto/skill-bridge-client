"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Star, Video, MapPin, Filter, Search, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import studentService, { StudentBooking } from "@/services/student.service";
import ReviewModal from "@/components/booking/review-modal";
import RescheduleModal from "@/components/booking/reschedule-modal";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<StudentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<StudentBooking | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<StudentBooking | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await studentService.getBookings();
        setBookings(response.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    
    // Set up periodic refresh to check for review eligibility
    const interval = setInterval(fetchBookings, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleReviewClick = (booking: StudentBooking) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  const handleRescheduleClick = (booking: StudentBooking) => {
    setSelectedBookingForReschedule(booking);
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleSuccess = () => {
    // Refresh bookings to show updated schedule
    const fetchBookings = async () => {
      try {
        const response = await studentService.getBookings();
        setBookings(response.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  };

  const handleReviewSubmitted = () => {
    // Refresh bookings to update review status
    const fetchBookings = async () => {
      try {
        const response = await studentService.getBookings();
        setBookings(response.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  };

  // Check if session time has passed
  const isSessionTimePassed = (booking: StudentBooking) => {
    // Parse the booking date and end time properly
    const bookingDate = new Date(booking.date);
    const [hours, minutes] = booking.endTime.split(':').map(Number);
    
    // Create session end datetime in local timezone
    const sessionEndDateTime = new Date(bookingDate);
    sessionEndDateTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    
    // Debug logging
    console.log('Review Check Debug:', {
      bookingDate: booking.date,
      bookingEndTime: booking.endTime,
      sessionEndDateTime: sessionEndDateTime.toISOString(),
      currentTime: now.toISOString(),
      timePassed: now > sessionEndDateTime
    });
    
    return now > sessionEndDateTime;
  };

  // Check if review should be enabled
  const shouldEnableReview = (booking: StudentBooking) => {
    return booking.status === "CONFIRMED" && 
           !booking.review && 
           isSessionTimePassed(booking);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "upcoming" && (booking.status === "CONFIRMED" && !isSessionTimePassed(booking))) ||
      (filter === "completed" && (booking.status === "COMPLETED" || (booking.status === "CONFIRMED" && isSessionTimePassed(booking)))) ||
      (filter === "cancelled" && booking.status === "CANCELLED");
    
    const matchesSearch = 
      booking.tutor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Get effective status (considering session time)
  const getEffectiveStatus = (booking: StudentBooking): "CONFIRMED" | "COMPLETED" | "CANCELLED" => {
    if (booking.status === "CONFIRMED" && isSessionTimePassed(booking)) {
      return "COMPLETED";
    }
    return booking.status as "CONFIRMED" | "COMPLETED" | "CANCELLED";
  };

  const getStatusColor = (booking: StudentBooking): string => {
    const effectiveStatus = getEffectiveStatus(booking);
    switch (effectiveStatus) {
      case "CONFIRMED": return "bg-blue-100 text-blue-800";
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (booking: StudentBooking): React.ReactElement => {
    const effectiveStatus = getEffectiveStatus(booking);
    switch (effectiveStatus) {
      case "CONFIRMED": return <Calendar className="h-4 w-4" />;
      case "COMPLETED": return <Star className="h-4 w-4" />;
      case "CANCELLED": return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your upcoming and past tutoring sessions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Calendar className="h-4 w-4 mr-2" />
          Book New Session
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-blue-900">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{bookings.length}</div>
            <p className="text-xs text-blue-700">All sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-blue-900">Completed</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {bookings.filter(b => b.status === "COMPLETED").length}
            </div>
            <p className="text-xs text-blue-700">Finished sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-blue-900">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {bookings.filter(b => b.status === "SCHEDULED").length}
            </div>
            <p className="text-xs text-blue-700">Scheduled sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-blue-900">Total Spent</CardTitle>
              <User className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
            </div>
            <p className="text-xs text-blue-700">Total investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg border-0">
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
              <Search className="h-4 w-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search by tutor name or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-100 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {filter === "all" 
                  ? "You haven't booked any sessions yet" 
                  : `No ${filter} bookings found`}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Browse Tutors
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Tutor Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.tutor.user.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"}
                      alt={booking.tutor.user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.tutor.user.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{booking.tutor.rating.toFixed(1)}</span>
                        <span>({booking.tutor.totalReviews} reviews)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ${booking.tutor.hourlyRate}/hour
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Online</span>
                      </div>
                    </div>
                    {booking.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{booking.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={`${getStatusColor(booking)} flex items-center gap-1`}>
                      {getStatusIcon(booking)}
                      {getEffectiveStatus(booking)}
                    </Badge>
                    <div className="text-lg font-bold text-gray-900">
                      ${booking.totalAmount}
                    </div>
                    <div className="flex gap-2">
                      {getEffectiveStatus(booking) === "CONFIRMED" && (
                        <>
                          {booking.meetingLink && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <Video className="h-4 w-4 mr-1" />
                              Join
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRescheduleClick(booking)}
                          >
                            Reschedule
                          </Button>
                        </>
                      )}
                      {/* Show disabled review button for upcoming sessions */}
                      {booking.status === "CONFIRMED" && !booking.review && !shouldEnableReview(booking) && (
                        <div className="relative group">
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={true}
                            className="opacity-50 cursor-not-allowed"
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Leave Review
                          </Button>
                          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            Can't review before session completion
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-1">
                              <div className="border-4 border-transparent border-l-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Show enabled review button for sessions that have ended */}
                      {shouldEnableReview(booking) && (
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleReviewClick(booking)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Leave Review
                        </Button>
                      )}
                      {/* Show enabled review button for completed sessions */}
                      {booking.status === "COMPLETED" && !booking.review && (
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleReviewClick(booking)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Leave Review
                        </Button>
                      )}
                      {booking.review && (
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>Reviewed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Review Modal */}
      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setSelectedBooking(null);
          }}
          booking={selectedBooking}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}

      {/* Reschedule Modal */}
      {selectedBookingForReschedule && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => {
            setIsRescheduleModalOpen(false);
            setSelectedBookingForReschedule(null);
          }}
          booking={selectedBookingForReschedule}
          onRescheduleSuccess={handleRescheduleSuccess}
        />
      )}
    </div>
  );
}
