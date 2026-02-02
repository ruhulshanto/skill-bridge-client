"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, User, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import studentService from "@/services/student.service";
import { API_URL } from "@/config/api";

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

  const generateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Only allow dates from today onwards
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate >= today) {
        setFormData({ ...formData, date, startTime: "", endTime: "" });
      }
    }
  };

  const handleTimeSelect = (startTime: string) => {
    const endTime = generateEndTime(startTime);
    setFormData({ ...formData, startTime, endTime });
  };

  const calculatePrice = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number);
    
    const startMinutesTotal = startHours * 60 + startMinutes;
    const endMinutesTotal = endHours * 60 + endMinutes;
    const durationHours = (endMinutesTotal - startMinutesTotal) / 60;
    
    return durationHours * tutor.rate;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to book a session");
      return;
    }

    if (!formData.date || !formData.startTime || !formData.endTime) {
      alert("Please select date and time for the session");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        tutorId: tutor.tutorProfile?.id || tutor.id, // Use tutorProfile.id if available
        date: formData.date.toLocaleDateString('en-CA'), // Use local date format (YYYY-MM-DD)
        startTime: formData.startTime,
        endTime: formData.endTime,
        notes: formData.notes,
      };

      console.log("=== BOOKING DEBUG INFO ===");
      console.log("Sending booking data:", JSON.stringify(bookingData, null, 2));
      console.log("Tutor data:", JSON.stringify(tutor, null, 2));
      console.log("User data:", JSON.stringify(user, null, 2));
      console.log("Full tutor object:", tutor);
      console.log("Tutor ID type:", typeof tutor.id);
      console.log("Tutor ID value:", tutor.id);
      console.log("API URL:", `${API_URL}/api/bookings`);
      
      await studentService.createBooking(bookingData);
      setBookingSuccess(true);
      
      // Reset form after successful booking
      setTimeout(() => {
        setBookingSuccess(false);
        onClose();
        setFormData({
          date: undefined,
          startTime: "",
          endTime: "",
          notes: "",
        });
      }, 3000);
      
    } catch (error) {
      console.error("=== BOOKING ERROR ===");
      console.error("Full error:", error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      alert(`Failed to book session: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-600 mb-2">
              Booking Successful!
            </DialogTitle>
            <p className="text-gray-600 mb-4">
              Your session with {tutor.name} has been booked successfully.
            </p>
            <p className="text-sm text-gray-500">
              You can view your booking details in the dashboard.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book a Session with {tutor.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tutor Info Card */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={tutor.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{tutor.name}</h3>
                  <p className="text-sm text-gray-600">{tutor.subject || "General"}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-blue-600 font-bold">
                    <DollarSign className="h-4 w-4" />
                    {tutor.rate}/hr
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Date</Label>
            
            {/* Selected Date Display */}
            {formData.date && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Selected: {formData.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
            
            <div className="border rounded-md p-3">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const selectedDate = new Date(date);
                  selectedDate.setHours(0, 0, 0, 0);
                  return selectedDate < today;
                }}
                className="w-full rounded-lg border-2 border-blue-200"
                modifiers={{
                  disabled: (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const selectedDate = new Date(date);
                    selectedDate.setHours(0, 0, 0, 0);
                    return selectedDate < today;
                  }
                }}
                modifiersStyles={{
                  disabled: { 
                    opacity: 0.3, 
                    textDecoration: 'line-through',
                    cursor: 'not-allowed',
                    backgroundColor: '#f3f4f6'
                  },
                  selected: {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontWeight: 'bold',
                    border: '2px solid #1d4ed8',
                    borderRadius: '50%'
                  },
                  today: {
                    backgroundColor: '#fef3c7',
                    border: '2px solid #f59e0b',
                    fontWeight: 'bold'
                  }
                }}
                styles={{
                  caption: { 
                    color: '#1f2937', 
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginBottom: '8px'
                  },
                  head_cell: {
                    color: '#6b7280',
                    fontWeight: '600',
                    fontSize: '12px',
                    textTransform: 'uppercase'
                  },
                  cell: {
                    height: '36px',
                    width: '36px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  },
                  nav_button: {
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontWeight: '500'
                  },
                  nav_button_previous: {
                    marginRight: '8px'
                  },
                  nav_button_next: {
                    marginLeft: '8px'
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Past dates are disabled for booking
            </p>
          </div>

          {/* Time Selection */}
          {formData.date && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Time</Label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={formData.startTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelect(time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Session Details */}
          {formData.startTime && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-800">Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Date:</span>
                  <span className="font-medium">
                    {formData.date && formatDate(formData.date)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time:</span>
                  <span className="font-medium">
                    {formData.startTime} - {formData.endTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span className="font-medium">1 hour</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-green-800">
                  <span>Total Price:</span>
                  <span>${calculatePrice()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Tell the tutor what you'd like to learn or any specific topics..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!formData.date || !formData.startTime || isSubmitting}
            >
              {isSubmitting ? "Booking..." : `Book Session - $${calculatePrice()}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
