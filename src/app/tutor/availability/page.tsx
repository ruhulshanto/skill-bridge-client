"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Save, Plus, Trash2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import tutorService from "@/services/tutor.service";

interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const DAYS = [
  { value: 0, label: "Sunday", short: "Sun" },
  { value: 1, label: "Monday", short: "Mon" },
  { value: 2, label: "Tuesday", short: "Tue" },
  { value: 3, label: "Wednesday", short: "Wed" },
  { value: 4, label: "Thursday", short: "Thu" },
  { value: 5, label: "Friday", short: "Fri" },
  { value: 6, label: "Saturday", short: "Sat" },
];

// Hardcoded fallback data
const FALLBACK_AVAILABILITY: TimeSlot[] = [
  { dayOfWeek: 1, startTime: "09:00", endTime: "12:00", isAvailable: true },
  { dayOfWeek: 1, startTime: "14:00", endTime: "17:00", isAvailable: true },
  { dayOfWeek: 3, startTime: "09:00", endTime: "12:00", isAvailable: true },
  { dayOfWeek: 5, startTime: "10:00", endTime: "15:00", isAvailable: true },
];

export default function TutorAvailabilityPage() {
  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [newSlot, setNewSlot] = useState({ startTime: "09:00", endTime: "17:00" });

  // Fetch availability from API
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const data = await tutorService.getAvailability();

        // If API returns data and it's not empty, use it
        if (data && data.length > 0) {
          const formattedData = data.map((slot: any) => ({
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable ?? true,
          }));
          setAvailability(formattedData);
          setIsUsingFallback(false);
        } else {
          // If API returns empty data, use fallback
          setAvailability(FALLBACK_AVAILABILITY);
          setIsUsingFallback(true);
        }
      } catch (error) {
        console.error("Failed to fetch availability, using fallback data:", error);
        // If API fails, use fallback data
        setAvailability(FALLBACK_AVAILABILITY);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const addTimeSlot = () => {
    setAvailability([
      ...availability,
      { dayOfWeek: selectedDay, startTime: newSlot.startTime, endTime: newSlot.endTime, isAvailable: true }
    ]);
  };

  const removeTimeSlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const toggleAvailability = (index: number) => {
    const updated = [...availability];
    updated[index].isAvailable = !updated[index].isAvailable;
    setAvailability(updated);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await tutorService.updateAvailability(availability);
      setIsUsingFallback(false);
      alert("Availability saved successfully!");
    } catch (error) {
      console.error("Failed to save availability:", error);
      alert("Failed to save availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSlotsForDay = (day: number) => {
    return availability.filter(slot => slot.dayOfWeek === day);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Availability Schedule</h1>
            {isUsingFallback && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                Using Sample Data
              </Badge>
            )}
            {!isUsingFallback && !loading && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Live Data
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mt-1">Manage your weekly availability for tutoring sessions</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Set your weekly availability</p>
              <p className="text-sm text-blue-700 mt-1">
                Students will be able to book sessions during your available time slots. You can add multiple time slots per day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Overview */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl">Weekly Schedule</CardTitle>
              </div>
              <CardDescription>Your availability for each day of the week</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {DAYS.map((day) => (
                    <div key={day.value} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                        <div className="h-6 w-16 bg-gray-200 rounded" />
                      </div>
                      <div className="h-12 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {DAYS.map((day) => {
                    const slots = getSlotsForDay(day.value);
                    return (
                      <div key={day.value} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-20">
                              <Badge variant="outline" className="font-semibold text-gray-700 border-gray-300">
                                {day.label}
                              </Badge>
                            </div>
                            {slots.length > 0 ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                {slots.length} slot{slots.length > 1 ? 's' : ''}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-500 border-gray-300">
                                No slots
                              </Badge>
                            )}
                          </div>
                        </div>

                        {slots.length > 0 ? (
                          <div className="space-y-2">
                            {slots.map((slot, idx) => {
                              const globalIndex = availability.findIndex(
                                s => s.dayOfWeek === day.value && s.startTime === slot.startTime && s.endTime === slot.endTime
                              );
                              return (
                                <div
                                  key={idx}
                                  className={`flex items-center justify-between p-3 rounded-lg border ${slot.isAvailable
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-gray-50 border-gray-300'
                                    }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <Clock className={`h-4 w-4 ${slot.isAvailable ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${slot.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
                                      {slot.startTime} - {slot.endTime}
                                    </span>
                                    {!slot.isAvailable && (
                                      <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                                        Disabled
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => toggleAvailability(globalIndex)}
                                      className={slot.isAvailable ? "border-blue-300 text-blue-600 hover:bg-blue-50" : "border-gray-300"}
                                    >
                                      {slot.isAvailable ? 'Enabled' : 'Disabled'}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeTimeSlot(globalIndex)}
                                      className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-2">No time slots set for this day</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Time Slot */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-gray-200 sticky top-6">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl">Add Time Slot</CardTitle>
              </div>
              <CardDescription>Create a new availability slot</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {DAYS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button
                onClick={addTimeSlot}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Slots</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {availability.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Active Slots</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {availability.filter(s => s.isAvailable).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Days Available</span>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      {new Set(availability.map(s => s.dayOfWeek)).size}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
