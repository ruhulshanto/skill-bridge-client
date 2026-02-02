"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, User, DollarSign, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    tutor: {
      user: {
        name: string;
        image?: string;
      };
      hourlyRate: number;
    };
  };
  onRescheduleSuccess: () => void;
}

interface RescheduleFormData {
  date: Date | undefined;
  startTime: string;
  endTime: string;
}

export default function RescheduleModal({ isOpen, onClose, booking, onRescheduleSuccess }: RescheduleModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RescheduleFormData>({
    date: new Date(booking.date),
    startTime: booking.startTime,
    endTime: booking.endTime,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.startTime || !formData.endTime) {
      toast({
        title: "Validation Error",
        description: "Please select date and time for the rescheduled session",
        variant: "destructive",
      });
      return;
    }

    // Validate time
    if (formData.startTime >= formData.endTime) {
      toast({
        title: "Invalid Time",
        description: "End time must be after start time",
        variant: "destructive",
      });
      return;
    }

    // Validate that selected date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast({
        title: "Invalid Date",
        description: "Cannot reschedule to a past date",
        variant: "destructive",
      });
      return;
    }

    // Additional validation for today: check if selected time has passed
    if (selectedDate.getTime() === today.getTime()) {
      const now = new Date();
      const [hours, minutes] = formData.startTime.split(':').map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes, 0, 0);
      
      if (selectedTime <= now) {
        toast({
          title: "Invalid Time",
          description: "Cannot reschedule to a time that has already passed today",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const rescheduleData = {
        date: formData.date.toLocaleDateString('en-CA'), // YYYY-MM-DD format
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      const response = await apiClient.rescheduleBooking(booking.id, rescheduleData);
      
      if (response.data) {
        toast({
          title: "Success",
          description: "Booking rescheduled successfully!",
        });
        
        onRescheduleSuccess();
        onClose();
      }
    } catch (error: any) {
      console.error("Error rescheduling booking:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error?.message || "Failed to reschedule booking",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Reschedule Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Booking Info */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-800">Current Booking</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-orange-600" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>{booking.startTime} - {booking.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span>{booking.tutor.user.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tutor Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800">Session with</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3">
                <img
                  src={booking.tutor.user.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"}
                  alt={booking.tutor.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{booking.tutor.user.name}</p>
                  <p className="text-sm text-gray-600">${booking.tutor.hourlyRate}/hour</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Date Selection */}
          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-medium">Select New Date</Label>
            
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
                  return date < today;
                }}
                className="w-full rounded-lg border-2 border-blue-200"
                modifiers={{
                  disabled: (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
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
              Past dates are disabled for rescheduling
            </p>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-medium">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Important Notice */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <p className="font-medium mb-1">Important:</p>
              <ul className="space-y-1">
                <li>• Only confirmed bookings can be rescheduled</li>
                <li>• New time slot must be available</li>
                <li>• You can only reschedule your own bookings</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Rescheduling..." : "Reschedule Session"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
