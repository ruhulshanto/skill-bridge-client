"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User as UserIcon, Mail, Shield, Camera, Edit3, Save, Bell, Lock, Globe, DollarSign, BookOpen, Award } from "lucide-react";
import tutorService, { TutorProfile } from "@/services/tutor.service";
import { TutorHeaderSkeleton } from "@/components/tutor/tutor-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


interface TutorProfileState {
  name: string;
  email: string;
  bio: string;
  location: string;
  hourlyRate: number;
  experience: number;
  education: string;
  timezone: string;
  language: string;
  notifications: boolean;
  twoFactor: boolean;
  memberSince: string;
  lastActive: string;
}

interface TutorFormDataState {
  name: string;
  email: string;
  bio: string;
  location: string;
  hourlyRate: number;
  experience: number;
  education: string;
  timezone: string;
  language: string;
  notifications: boolean;
  twoFactor: boolean;
}

export default function TutorProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tutorProfile, setTutorProfile] = useState<TutorProfileState>({
    name: "",
    email: "",
    bio: "",
    location: "",
    hourlyRate: 0,
    experience: 0,
    education: "",
    timezone: "",
    language: "English",
    notifications: true,
    twoFactor: false,
    memberSince: "",
    lastActive: "",
  });

  const [formData, setFormData] = useState<TutorFormDataState>({
    name: "",
    email: "",
    bio: "",
    location: "",
    hourlyRate: 0,
    experience: 0,
    education: "",
    timezone: "GMT (UTC+0)",
    language: "English",
    notifications: true,
    twoFactor: false,
  });

  useEffect(() => {
    if (!user) return;

    // Fetch actual tutor profile data from backend
    const fetchProfile = async () => {
      try {
        console.log("🔍 Fetching tutor profile...");
        const profileData = await tutorService.getProfile();
        console.log("📊 Tutor Profile Response:", profileData);
        
        if (profileData) {
          console.log("👤 Tutor data from DB:", profileData);
          
          const tutorProfileState = {
            name: user?.name || "",
            email: user?.email || "",
            bio: profileData.bio || "",
            location: "", // Tutor service doesn't have location field yet
            hourlyRate: profileData.hourlyRate || 0,
            experience: profileData.experience || 0,
            education: profileData.education || "",
            timezone: "GMT (UTC+0)", // Default
            language: "English", // Default
            notifications: true, // Default
            twoFactor: false, // Default
            memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "",
            lastActive: user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
          };

          console.log("📝 Tutor profile data to set:", tutorProfileState);
          setTutorProfile(tutorProfileState);
          
          const formDataToSet = {
            ...tutorProfileState,
          };
          console.log("📋 Form data to set:", formDataToSet);
          setFormData(formDataToSet);
        } else {
          console.log("❌ No data in API response");
        }
      } catch (error) {
        console.error("💥 Failed to fetch tutor profile:", error);
        // Fallback to user data from auth context
        console.log("🔄 Using fallback data from auth context:", user);
        
        const fallbackData = {
          name: user?.name || "",
          email: user?.email || "",
          bio: "",
          location: "",
          hourlyRate: 0,
          experience: 0,
          education: "",
          timezone: "GMT (UTC+0)",
          language: "English",
          notifications: true,
          twoFactor: false,
          memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "",
          lastActive: user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
        };

        console.log("📝 Fallback tutor profile data:", fallbackData);
        setTutorProfile(fallbackData);
        setFormData(fallbackData);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      console.log("💾 Saving tutor profile with data:", {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        hourlyRate: formData.hourlyRate,
        experience: formData.experience,
        education: formData.education,
      });
      
      // Update tutor profile using tutorService
      const updatedProfile = await tutorService.updateProfile({
        bio: formData.bio,
        hourlyRate: formData.hourlyRate,
      });

      console.log("📊 Save API Response:", updatedProfile);

      // Update global auth context to refresh sidebar info
      if (updatedProfile) {
        console.log("✅ Updated data from server:", updatedProfile);
        
        updateUser({
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
        });
        
        setTutorProfile((prev: TutorProfileState) => ({
          ...prev,
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
          hourlyRate: formData.hourlyRate,
          experience: formData.experience,
          education: formData.education,
        }));
        
        setFormData((prev: TutorFormDataState) => ({
          ...prev,
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
          hourlyRate: formData.hourlyRate,
          experience: formData.experience,
          education: formData.education,
        }));
        
        console.log("🔄 Local state updated");
      }

      // Show success modal
      setShowSuccessModal(true);
      
      setIsEditing(false);
    } catch (error) {
      console.error("💥 Save error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: tutorProfile.name,
      email: tutorProfile.email,
      bio: tutorProfile.bio,
      location: tutorProfile.location,
      hourlyRate: tutorProfile.hourlyRate,
      experience: tutorProfile.experience,
      education: tutorProfile.education,
      timezone: tutorProfile.timezone || "GMT (UTC+0)",
      language: tutorProfile.language || "English",
      notifications: tutorProfile.notifications !== false,
      twoFactor: tutorProfile.twoFactor !== false,
    });
    setIsEditing(false);
  };

  if (isLoading && !tutorProfile.name) {
    return (
      <div className="max-w-4xl mx-auto px-4 space-y-12 animate-fade-in">

        <TutorHeaderSkeleton />
        <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
            <Skeleton className="h-8 w-48 bg-white/40" />
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-3 w-24 bg-white/20" />
                  <Skeleton className="h-14 w-full rounded-2xl bg-white/40" />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 w-24 bg-white/20" />
              <Skeleton className="h-32 w-full rounded-2xl bg-white/40" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto px-4 space-y-12 animate-fade-in">

      {/* Refined Welcome Header */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm">
               <Shield className="h-3 w-3" /> Credential Engine
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A2540]">
              Profile Settings
            </h1>
            <p className="text-lg font-medium text-[#2d6a9f] max-w-2xl">
              Refine your professional presence and teaching credentials to optimize student discoverability and engagement.
            </p>
          </div>
          <div className="flex gap-4">
            {isEditing && (
              <Button
                variant="outline"
                onClick={handleCancel}
                className="h-14 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] border border-[#a3c7e6] bg-white text-[#0A2540] shadow-sm transition-all"
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="h-14 px-8 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all hover:scale-105 bg-primary hover:bg-primary/90 border-0"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-3" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-3" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-12">
        {/* Profile Information */}
        <Card 
          className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white border border-[#a3c7e6] text-primary shadow-sm">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black text-[#0A2540]">Public Identity</CardTitle>
                <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">Information visible to potential students</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Full Name</Label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Email Address</Label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none transition-all font-bold shadow-sm bg-white text-[#0A2540] opacity-30"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Location</Label>
                <input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="City, Country"
                  className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="hourlyRate" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Hourly Rate ($)</Label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-[#2d6a9f] opacity-40">$</span>
                  <input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) || 0 })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Professional Bio</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={5}
                placeholder="Describe your expertise and teaching philosophy..."
                className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50 resize-none leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card 
          className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8 md:p-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white border border-[#a3c7e6] text-[#0A2540] shadow-sm">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black text-[#0A2540]">Expertise Matrix</CardTitle>
                <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">Validate your skills to build ecosystem trust</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="experience" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Years of Experience</Label>
                <input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                  disabled={!isEditing}
                  className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="education" className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-[#2d6a9f]">Educational Background</Label>
                <input
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Academic credentials (e.g. MS in Computer Science)"
                  className="w-full px-6 py-4 border border-[#a3c7e6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold shadow-sm bg-white text-[#0A2540] disabled:opacity-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-[#e5f2ff] rounded-[3rem] p-10 max-w-md w-full mx-4 transform transition-all duration-500 scale-100 animate-slide-up shadow-2xl border border-[#a3c7e6]">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-[2rem] bg-white border border-[#a3c7e6] mb-8 shadow-inner">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight text-[#0A2540]">Profile Synchronized</h3>
              <p className="font-medium text-[#2d6a9f] opacity-60 mb-8 leading-relaxed">
                Your professional credentials have been successfully verified and updated across the platform matrix.
              </p>
              
              <div className="rounded-3xl p-6 mb-10 text-left space-y-4 shadow-inner bg-white/40 border border-[#a3c7e6]/30">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] opacity-40 mb-2">Updated Ledger Snapshot</h4>
                <div className="space-y-3 text-sm font-bold">
                  {[
                    { label: "Matrix Rate", value: `$${formData.hourlyRate}/hr` },
                    { label: "Exp Lifecycle", value: `${formData.experience} cycles` },
                    { label: "Edu Status", value: formData.education || "Verified" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-[#a3c7e6]/20 pb-2">
                      <span className="text-[#2d6a9f] opacity-40">{item.label}</span>
                      <span className="text-[#0A2540]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-16 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all hover:scale-105 bg-[#0A2540] hover:bg-[#0A2540]/90 border-0"
              >
                Close Protocol
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
