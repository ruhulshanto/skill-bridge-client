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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your tutor profile and professional information</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "bg-gray-600 hover:bg-gray-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Information */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-blue-600" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your professional information that students will see
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={true} // Always disabled - email cannot be changed
                className="mt-1 bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                placeholder="City, Country"
              />
            </div>
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) || 0 })}
                disabled={!isEditing}
                className="mt-1"
                placeholder="50"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              className="mt-1"
              rows={4}
              placeholder="Tell students about your teaching experience and expertise..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Professional Information
          </CardTitle>
          <CardDescription>
            Your teaching credentials and experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                disabled={!isEditing}
                className="mt-1"
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                placeholder="Master's in Computer Science"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-slide-up">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Profile Updated Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your tutor profile information has been updated and saved successfully.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Updated Information:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium text-gray-900">{formData.name || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-gray-900">{formData.location || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hourly Rate:</span>
                    <span className="font-medium text-gray-900">${formData.hourlyRate}/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-medium text-gray-900">{formData.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Education:</span>
                    <span className="font-medium text-gray-900">{formData.education || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span>Bio:</span>
                    <span className="font-medium text-gray-900 truncate ml-2 max-w-[200px]">{formData.bio || "Not provided"}</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
