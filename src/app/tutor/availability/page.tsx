"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Save, Plus, Trash2, Activity } from "lucide-react";


import { useState, useEffect } from "react";
import { toast } from "sonner";
import tutorService from "@/services/tutor.service";
import { TutorHeaderSkeleton } from "@/components/tutor/tutor-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


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
  const [stagedSlot, setStagedSlot] = useState<TimeSlot | null>(null);


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
    const slot = { dayOfWeek: selectedDay, startTime: newSlot.startTime, endTime: newSlot.endTime, isAvailable: true };
    setStagedSlot(slot);
  };


  const removeTimeSlot = async (index: number) => {
    const updated = availability.filter((_, i) => i !== index);
    try {
      setLoading(true);
      await tutorService.updateAvailability(updated);
      setAvailability(updated);
      toast.success("Slot Removed", {
        description: "The time slot has been removed from your live schedule.",
      });
    } catch (error) {
      console.error("Failed to remove slot:", error);
      toast.error("Error", {
        description: "Failed to remove the slot. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (index: number) => {
    const updated = [...availability];
    updated[index].isAvailable = !updated[index].isAvailable;
    try {
      setLoading(true);
      await tutorService.updateAvailability(updated);
      setAvailability(updated);
    } catch (error) {
      console.error("Failed to toggle availability:", error);
    } finally {
      setLoading(false);
    }
  };


  const confirmSave = async () => {
    if (!stagedSlot) return;
    const newAvailability = [...availability, stagedSlot];
    try {
      setLoading(true);
      await tutorService.updateAvailability(newAvailability);
      setAvailability(newAvailability);
      setStagedSlot(null);
      setIsUsingFallback(false);
      toast.success("Schedule Saved", {
        description: "Your new teaching slot has been successfully integrated.",
      });
    } catch (error) {
      console.error("Failed to save availability:", error);
      toast.error("Save Error", {
        description: "Failed to synchronize the new slot. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  const getSlotsForDay = (day: number) => {
    return availability.filter(slot => slot.dayOfWeek === day);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">
      {/* Refined Welcome Header with Integrated Logic */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
                 <Activity className="h-3 w-3" /> Availability Engine
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A2540]">
                Teaching Schedule
              </h1>
              <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
                Define your instructional capacity by managing weekly time slots. This schedule synchronizes with student booking interfaces.
              </p>
            </div>
          </div>

          {/* Integrated Operational Logic */}
          <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-[#a3c7e6]/30">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#0A2540] mb-2">Operational Logic</p>
              <p className="text-sm font-medium text-[#2d6a9f] leading-relaxed">
                Students will be able to book sessions during your available time slots. You can add multiple time slots per day for maximum flexibility.
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#0A2540] mb-2">Global Synchronization</p>
              <p className="text-sm font-medium text-[#2d6a9f] leading-relaxed">
                Ensure your timezone is correctly configured in profile settings to maintain accurate scheduling for international students.
              </p>
            </div>
          </div>

        </div>
      </div>


      <div className="grid gap-12 lg:grid-cols-3">
        {/* Weekly Overview */}
        <div className="lg:col-span-2 space-y-8">
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white border border-[#a3c7e6] text-primary shadow-sm">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black text-[#0A2540]">Weekly Matrix</CardTitle>
                  <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                    Your availability for each day of the week
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              {loading ? (
                <div className="space-y-6">
                  {DAYS.map((day) => (
                    <div key={day.value} className="rounded-3xl p-6 border border-[#a3c7e6]/20 bg-white/20">
                      <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-6 w-24 bg-white/40 rounded-lg" />
                        <Skeleton className="h-6 w-16 bg-white/20 rounded-lg" />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Skeleton className="h-16 w-full rounded-2xl bg-white/30" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (

                <div className="space-y-6">
                  {DAYS.map((day) => {
                    const slots = getSlotsForDay(day.value);
                    return (
                      <div key={day.value} className="rounded-3xl p-6 border border-[#a3c7e6]/30 transition-all duration-300 hover:scale-[1.01] shadow-sm bg-white/40">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className="w-24">
                              <Badge className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white border border-[#a3c7e6] text-[#0A2540] shadow-sm">
                                {day.label}
                              </Badge>
                            </div>
                            {slots.length > 0 ? (
                              <Badge className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-primary text-white">
                                {slots.length} {slots.length > 1 ? 'slots' : 'slot'}
                              </Badge>
                            ) : (
                              <Badge className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-30 bg-white/50 text-[#2d6a9f]">
                                No Slots
                              </Badge>
                            )}
                          </div>
                        </div>

                        {slots.length > 0 ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            {slots.map((slot, idx) => {
                              const globalIndex = availability.findIndex(
                                s => s.dayOfWeek === day.value && s.startTime === slot.startTime && s.endTime === slot.endTime
                              );
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-4 rounded-2xl border transition-all shadow-sm group/slot bg-white"
                                  style={{ 
                                    borderColor: slot.isAvailable ? "#a3c7e6" : "transparent",
                                    opacity: slot.isAvailable ? 1 : 0.6
                                  }}
                                >
                                  <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="p-2 rounded-lg bg-[#e5f2ff] text-primary">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-black tracking-tight text-[#0A2540]">
                                      {slot.startTime} - {slot.endTime}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); removeTimeSlot(globalIndex); }}
                                      className="p-2 rounded-xl transition-all hover:bg-rose-50 text-rose-500 opacity-0 group-hover/slot:opacity-100"
                                      title="Remove Slot"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="py-6 text-center rounded-2xl border-2 border-dashed border-[#a3c7e6]/30 bg-white/20">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2d6a9f] opacity-40">Inactive Node</p>
                          </div>
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
        <div className="lg:col-span-1 space-y-8">
          <Card 
            className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl sticky top-32"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white border border-[#a3c7e6] text-primary shadow-sm">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black text-[#0A2540]">Initialize Slot</CardTitle>
                  <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
                    Expand availability matrix
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {!stagedSlot ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">
                      Select Day
                    </label>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                      className="w-full px-5 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540]"
                    >
                      {DAYS.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">
                        From
                      </label>
                      <input
                        type="time"
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                        className="w-full px-5 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">
                        To
                      </label>
                      <input
                        type="time"
                        value={newSlot.endTime}
                        onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                        className="w-full px-5 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540]"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={addTimeSlot}
                    className="w-full h-16 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all hover:scale-[1.02] bg-[#0A2540] hover:bg-[#0A2540]/90 border-0"
                  >
                    <Plus className="h-5 w-5 mr-3" />
                    Add Schedule
                  </Button>
                </>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-6 rounded-[2rem] bg-white border border-[#a3c7e6] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#e5f2ff] text-primary border-[#a3c7e6] font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg">
                        {DAYS.find(d => d.value === stagedSlot.dayOfWeek)?.label}
                      </Badge>
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-[#0A2540] tracking-tight">
                      {stagedSlot.startTime} - {stagedSlot.endTime}
                    </p>
                    <p className="text-[10px] font-bold text-[#2d6a9f] opacity-60 uppercase tracking-widest">
                      New Slot Preview
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={confirmSave}
                      className="w-full h-16 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all hover:scale-[1.02] bg-primary hover:bg-primary/90 border-0"
                      disabled={loading}
                    >
                      <Save className="h-5 w-5 mr-3" />
                      {loading ? "Saving..." : "Save Schedule"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setStagedSlot(null)}
                      className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-[10px] text-rose-500 hover:bg-rose-50"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
