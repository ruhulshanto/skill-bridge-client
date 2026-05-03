"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Star,
  Video,
  MapPin,
  Search,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import studentService, { StudentBooking } from "@/services/student.service";
import ReviewModal from "@/components/booking/review-modal";
import RescheduleModal from "@/components/booking/reschedule-modal";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SkeletonBookings } from "@/components/skeletons/skeleton-bookings";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";

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
  const showSkeleton = useDelayedLoading(loading, 300);

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

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000);
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

  const isSessionTimePassed = (booking: StudentBooking) => {
    const bookingDate = new Date(booking.date);
    const [hours, minutes] = booking.endTime.split(':').map(Number);
    const sessionEndDateTime = new Date(bookingDate);
    sessionEndDateTime.setHours(hours, minutes, 0, 0);
    return new Date() > sessionEndDateTime;
  };

  const getEffectiveStatus = (booking: StudentBooking) => {
    if (booking.status === "CANCELLED") return "CANCELLED";
    if (booking.status === "COMPLETED") return "COMPLETED";
    if (isSessionTimePassed(booking)) return "COMPLETED";
    return "CONFIRMED";
  };

  const getStatusConfig = (booking: StudentBooking) => {
    const status = getEffectiveStatus(booking);
    switch (status) {
      case "CONFIRMED":
        return {
          label: "Upcoming",
          color: "bg-[var(--bg-subtle)] text-[var(--text)] border-[var(--border)]",
          icon: <Clock className="h-3 w-3 text-[var(--text-muted)]" />
        };
      case "COMPLETED":
        return {
          label: "Completed",
          color: "bg-[var(--bg-card)] text-[var(--text)] border-[var(--border)]",
          icon: <CheckCircle2 className="h-3 w-3 text-[var(--text-muted)]" />
        };
      case "CANCELLED":
        return {
          label: "Cancelled",
          color: "bg-red-50/90 text-red-800 border-red-200",
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          label: status,
          color: "bg-[var(--bg-subtle)] text-[var(--text)] border-[var(--border)]",
          icon: <AlertCircle className="h-3 w-3 text-[var(--text-muted)]" />
        };
    }
  };

  const shouldEnableReview = (booking: StudentBooking) => {
    return (booking.status === "COMPLETED" || isSessionTimePassed(booking)) && !booking.review;
  };

  const filteredBookings = bookings.filter((booking) => {
    const status = getEffectiveStatus(booking);
    const matchesFilter =
      filter === "all" ||
      (filter === "upcoming" && status === "CONFIRMED") ||
      (filter === "completed" && status === "COMPLETED") ||
      (filter === "cancelled" && status === "CANCELLED");

    const matchesSearch =
      booking.tutor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.notes && booking.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (loading && showSkeleton) {
    return <SkeletonBookings />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="section-heading text-4xl tracking-tight mb-2">My Bookings</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage and track your learning sessions.</p>
        </div>
        <Link href="/tutors">
          <Button size="lg" className="rounded-xl px-6 transition-all hover:scale-[1.02]">
            Book New Session <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sessions", value: bookings.length, icon: Calendar },
          { label: "Completed", value: bookings.filter(b => getEffectiveStatus(b) === "COMPLETED").length, icon: CheckCircle2 },
          { label: "Upcoming", value: bookings.filter(b => getEffectiveStatus(b) === "CONFIRMED").length, icon: Clock },
        ].map((stat, i) => (
          <Card key={i} className="overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm transition-shadow hover:shadow-md group">
            <div className="h-1 w-full bg-[var(--accent)]/80" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1 text-[var(--text-muted)]">{stat.label}</p>
                <p className="text-3xl font-black text-[var(--text)]">{stat.value}</p>
              </div>
              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] transition-transform group-hover:scale-105 shadow-sm">
                <stat.icon className="h-6 w-6 text-[var(--text-muted)]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex p-1.5 rounded-2xl w-full lg:w-auto border border-[var(--border)] bg-[var(--bg-subtle)]">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 lg:flex-none",
                filter === s 
                  ? "bg-[var(--bg-card)] text-[var(--text)] shadow-sm border border-[var(--border)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-faint)]" />
          <input
            type="text"
            placeholder="Search sessions, tutors or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] placeholder:text-[var(--text-faint)] shadow-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-subtle)]/30">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]">
              <Calendar className="h-10 w-10 text-[var(--text-faint)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No sessions found</h3>
            <p className="text-[var(--text-muted)] mb-8">Try adjusting your filters or book a new session.</p>
            <Link href="/tutors">
              <Button variant="outline" size="lg" className="rounded-xl">
                Browse Tutors
              </Button>
            </Link>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const status = getStatusConfig(booking);
            return (
              <Card key={booking.id} className="overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Status & Date Sidebar (Mobile hidden, Desktop visible) */}
                  <div className="hidden lg:flex w-48 flex-col items-center justify-center border-r border-[var(--border)] bg-[var(--bg-subtle)] p-6 text-center gap-2">
                    <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-4xl font-black text-[var(--text)]">{new Date(booking.date).getDate()}</p>
                    <p className="text-xs font-bold text-[var(--text-muted)]">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  </div>

                  <CardContent className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                      {/* Tutor Image & Info */}
                      <div className="flex items-center gap-4 lg:w-64">
                        <div className="relative">
                          <img
                            src={booking.tutor.user.image || `https://i.pravatar.cc/150?u=${booking.tutor.id}`}
                            alt={booking.tutor.user.name}
                            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
                          />
                          <div className={cn("absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center", status.color.split(' ')[0])}>
                            {status.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors">{booking.tutor.user.name}</h3>
                          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                            <Star className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)] opacity-70" />
                            <span className="text-sm font-bold">
                              {(booking.tutor.rating ?? 0).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Time & Meeting Info */}
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 text-[var(--text-muted)]">
                              <Clock className="h-3 w-3" /> Time
                            </p>
                            <p className="text-sm font-bold text-[var(--text)]">{booking.startTime} - {booking.endTime}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 text-[var(--text-muted)]">
                              <MapPin className="h-3 w-3" /> Location
                            </p>
                            <p className="text-sm font-bold text-[var(--text)]">Online Session</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 text-[var(--text-muted)]">
                              <DollarSign className="h-3 w-3" /> Paid
                            </p>
                            <p className="text-sm font-bold text-[var(--text)]">${booking.totalAmount}</p>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="flex gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 p-3">
                            <MessageSquare className="h-4 w-4 shrink-0 text-[var(--text-faint)]" />
                            <p className="text-xs italic text-[var(--text-muted)] line-clamp-2">{booking.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-3 lg:w-48 lg:items-stretch">
                        <Badge variant="outline" className={cn("justify-center py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg", status.color)}>
                          {status.label}
                        </Badge>
                        
                        {getEffectiveStatus(booking) === "CONFIRMED" && (
                          <>
                            {booking.meetingLink ? (
                              <Button className="rounded-xl text-xs font-bold h-10">
                                <Video className="h-4 w-4 mr-2" /> Join Session
                              </Button>
                            ) : (
                              <Button variant="outline" className="rounded-xl text-xs font-bold h-10" onClick={() => handleRescheduleClick(booking)}>
                                Reschedule
                              </Button>
                            )}
                          </>
                        )}

                        {shouldEnableReview(booking) && (
                          <Button
                            className="rounded-xl text-xs font-bold h-10"
                            onClick={() => handleReviewClick(booking)}
                          >
                            <Star className="h-4 w-4 mr-2" /> Leave Review
                          </Button>
                        )}

                        {booking.review && (
                          <div className="flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-2 text-[var(--text-muted)]">
                            <Star className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)] opacity-70" />
                            <span className="text-sm font-bold">Reviewed</span>
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

      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          booking={selectedBooking}
          onReviewSubmitted={fetchBookings}
        />
      )}

      {selectedBookingForReschedule && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          booking={selectedBookingForReschedule}
          onRescheduleSuccess={fetchBookings}
        />
      )}
    </div>
  );
}
