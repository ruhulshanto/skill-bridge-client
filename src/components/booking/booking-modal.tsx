"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  CheckCircle,
  ChevronRight,
  Info,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import studentService from "@/services/student.service";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: {
    id: string;
    tutorProfile?: {
      id: string;
      bio?: string;
      hourlyRate?: number;
      experience?: number;
      education?: string;
      rating?: number;
      totalReviews?: number;
      isVerified?: boolean;
    };
    name: string;
    rate: number;
    image?: string;
    subject?: string;
  };
}

interface BookingFormData {
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
}

export default function BookingModal({ isOpen, onClose, tutor }: BookingModalProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    date: undefined,
    startTime: "",
    endTime: "",
    notes: "",
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  ];

  const isTimeDisabled = (time: string) => {
    if (!formData.date) return false;

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    // Only apply time check if the selected date is today
    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = time.split(':').map(Number);
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      if (hours < currentHours) return true;
      if (hours === currentHours && minutes <= currentMinutes) return true;
    }

    return false;
  };

  const generateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, date, startTime: "", endTime: "" });
    }
  };

  const handleTimeSelect = (startTime: string) => {
    if (isTimeDisabled(startTime)) return;
    const endTime = generateEndTime(startTime);
    setFormData({ ...formData, startTime, endTime });
  };

  const calculatePrice = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    return tutor.rate; // Assuming 1 hour fixed for now based on UI
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e && 'preventDefault' in e) e.preventDefault();

    if (!user) return;
    if (!formData.date || !formData.startTime || !formData.endTime) return;

    setIsSubmitting(true);

    try {
      const bookingData = {
        tutorId: tutor.tutorProfile?.id || tutor.id,
        date: formData.date.toLocaleDateString('en-CA'),
        startTime: formData.startTime,
        endTime: formData.endTime,
        notes: formData.notes,
      };

      await studentService.createBooking(bookingData);
      setBookingSuccess(true);

    } catch (error) {
      console.error("Booking error:", error);
      alert(`Failed to book session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setBookingSuccess(false);
    setFormData({
      date: undefined,
      startTime: "",
      endTime: "",
      notes: "",
    });
    onClose();
  };

  if (bookingSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-[var(--bg-subtle)] via-[var(--accent)] to-[var(--bg-subtle)]" />
          <div className="px-8 pt-10 pb-2 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg)] shadow-sm">
              <CheckCircle className="h-8 w-8 text-[var(--text-muted)]" strokeWidth={1.75} />
            </div>
            <h2 className="section-heading text-2xl mb-2">Booking confirmed</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Your session with{" "}
              <span className="font-semibold text-[var(--text)]">{tutor.name}</span> is on the calendar.
            </p>
          </div>

          <div className="space-y-3 px-8 pb-2">
            <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/50 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
                <CalendarIcon className="h-4 w-4 text-[var(--text-muted)]" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Date
                </p>
                <p className="text-sm font-semibold text-[var(--text)]">
                  {formData.date && formatDate(formData.date)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/50 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
                <Clock className="h-4 w-4 text-[var(--text-muted)]" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Time
                </p>
                <p className="text-sm font-semibold text-[var(--text)]">
                  {formData.startTime} – {formData.endTime}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-8 pt-6">
            <Button asChild size="lg" className="w-full rounded-xl">
              <Link href="/dashboard/bookings" onClick={handleClose}>
                Go to My Bookings <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleClose} className="w-full rounded-xl text-[var(--text-muted)]">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[85vh] max-h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Book a Session with {tutor.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row h-full w-full overflow-hidden min-h-0">
          {/* Left Side: Summary & Tutor Info */}
          <div className="w-full md:w-80 border-r border-[var(--border)] bg-[var(--bg-subtle)] p-6 space-y-8 overflow-y-auto">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-6">Booking Details</h2>

              <div className="space-y-4">
                <div className="flex flex-col items-center p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm text-center">
                  <div className="relative mb-3">
                    <img
                      src={tutor.image || `https://i.pravatar.cc/150?u=${tutor.id}`}
                      alt={tutor.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--accent)] border-2 border-white rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-[#0A2540]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[var(--text)]">{tutor.name}</h3>
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-3">{tutor.subject || "Verified Tutor"}</p>
                  <Badge variant="secondary" className="border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]">
                    <DollarSign className="h-3 w-3" /> {tutor.rate}/hour
                  </Badge>
                </div>

                {formData.date && formData.startTime && (
                  <div className="p-4 rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-subtle)]/80 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-3 text-[var(--text)]">
                      <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <CalendarIcon className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-semibold">{formData.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-semibold">{formData.startTime} – {formData.endTime}</span>
                      </div>
                      <div className="pt-2 mt-2 flex justify-between items-center border-t border-[var(--border)]">
                        <span className="text-xs font-medium text-[var(--text-muted)]">Total</span>
                        <span className="text-lg font-bold">${calculatePrice()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/40 flex gap-3">
              <Info className="h-5 w-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Confirming means you agree to this tutor&apos;s session rates and availability.
              </p>
            </div>
          </div>

          {/* Right Side: Selection Form */}
          <div className="flex-1 h-full overflow-y-auto bg-background p-8 pb-40">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Schedule your Session</h2>
                <p className="text-sm text-[var(--text-muted)]">Select your preferred date and time slot.</p>
              </div>
              {/* Step 1: Date */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <Label className="text-base font-bold text-[var(--text)]">Select Date</Label>
                </div>

                <div className="flex justify-center">
                  <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden w-fit">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      className="p-4"
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      classNames={{
                        disabled:
                          "text-[var(--text-faint)] opacity-45 pointer-events-none line-through decoration-[var(--border)]",
                        selected:
                          "border-2 border-[var(--accent)] bg-[var(--bg-subtle)] text-[var(--text)] hover:bg-[var(--border)] rounded-full shadow-sm relative after:content-['✓'] after:absolute after:-top-0.5 after:-right-0.5 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-[var(--accent)] after:text-[10px] after:font-bold after:text-[#0A2540] after:leading-none after:shadow-sm",
                        today:
                          "text-[var(--text-muted)] bg-[var(--bg-card)] rounded-full font-semibold ring-1 ring-[var(--border)]",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Time */}
              {formData.date && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)] flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <Label className="text-base font-bold text-[var(--text)]">Available Time Slots</Label>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                      const disabled = isTimeDisabled(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={disabled}
                          onClick={() => handleTimeSelect(time)}
                          className={cn(
                            "py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border",
                            formData.startTime === time
                              ? "border-2 border-[var(--accent)] bg-[var(--bg-subtle)] text-[var(--text)] shadow-sm"
                              : disabled
                                ? "bg-[var(--bg-subtle)]/50 text-[var(--text-faint)] border-[var(--border)] cursor-not-allowed line-through opacity-60"
                                : "bg-[var(--bg-card)] text-[var(--text)] border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--bg-subtle)]"
                          )}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                  {isTimeDisabled(timeSlots[0]) && (
                    <p className="text-[10px] text-[var(--text-muted)] italic">
                      Past slots today are faded and cannot be selected.
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)] flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <Label className="text-base font-bold text-[var(--text)]">Message for Tutor</Label>
                </div>
                <Textarea
                  placeholder="Example: I'd like to focus on React Hooks and State management..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="rounded-xl min-h-[100px] border-[var(--border)] bg-[var(--bg-card)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/30"
                />
              </div>

              <DialogFooter className="pt-4 gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="rounded-xl px-8"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-xl px-8 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={!formData.date || !formData.startTime || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Confirm Booking <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
