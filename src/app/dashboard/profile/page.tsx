"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User as UserIcon, Mail, Shield, Camera, Edit3, Save, Bell, Lock, Globe, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkeletonProfile } from "@/components/skeletons/skeleton-profile";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";

interface UserProfileState {
  bio: string;
  phone: string;
  location: string;
  timezone: string;
  language: string;
  notifications: boolean;
  twoFactor: boolean;
  memberSince: string;
  lastActive: string;
}

interface FormDataState {
  name: string;
  email: string;
  bio: string;
  phone: string;
  location: string;
  timezone: string;
  language: string;
  notifications: boolean;
  twoFactor: boolean;
}

export default function StudentProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const showSkeleton = useDelayedLoading(profileLoading, 300);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    bio: "",
    phone: "",
    location: "",
    timezone: "",
    language: "English",
    notifications: true,
    twoFactor: false,
    memberSince: "",
    lastActive: "",
  });

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    timezone: "GMT (UTC+0)",
    language: "English",
    notifications: true,
    twoFactor: false,
  });

  useEffect(() => {
    if (!user) return;

    // Fetch actual user profile data from backend
    const fetchProfile = async () => {
      try {
        const result = await apiClient.getStudentProfile();

        const resultAny = result as any; // Temporarily cast to any to access nested data
        if (resultAny.data && resultAny.data.data) {
          const userData = resultAny.data.data as User; // Fix: Access nested data
          
          const profileData = {
            bio: userData.bio || "",
            phone: userData.phone || "",
            location: userData.location || "",
            timezone: "GMT (UTC+0)", // Default
            language: "English", // Default
            notifications: true, // Default
            twoFactor: false, // Default
            memberSince: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "",
            lastActive: userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
          };

          setUserProfile(profileData);
          
          const formDataToSet = {
            name: userData.name || "",
            email: userData.email || "",
            ...profileData,
          };
          setFormData(formDataToSet);
        } else {
          // keep silent
        }
      } catch (error) {
        // Fallback to user data from auth context
        
        const fallbackData = {
          bio: user?.bio || "",
          phone: user?.phone || "",
          location: user?.location || "",
          timezone: "GMT (UTC+0)",
          language: "English",
          notifications: true,
          twoFactor: false,
          memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "",
          lastActive: user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
        };

        setUserProfile(fallbackData);
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          ...fallbackData,
        });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Update user profile using apiClient
      const result = await apiClient.updateStudentProfile({
        name: formData.name,
        phone: formData.phone || null as any, // Send null if empty to clear it in DB
        bio: formData.bio || null as any,
        location: formData.location || null as any,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message || "Failed to update profile",
          variant: "destructive",
        });
        return;
      }

      // Update global auth context to refresh sidebar info
      if (result.data) {
        const resultAny = result as any; // Temporarily cast to any to access nested data
        if (resultAny.data && resultAny.data.data) {
          const updatedData = resultAny.data.data as User;
          
          updateUser({
            name: updatedData.name,
            phone: updatedData.phone,
            bio: updatedData.bio,
            location: updatedData.location,
          });
          
          setUserProfile((prev: UserProfileState) => ({
            ...prev,
            bio: updatedData.bio || "",
            phone: updatedData.phone || "",
            location: updatedData.location || "",
          }));
          
          setFormData((prev: FormDataState) => ({
            ...prev,
            name: updatedData.name || prev.name,
            bio: updatedData.bio || "",
            phone: updatedData.phone || "",
            location: updatedData.location || "",
          }));
        } else {
          // Refresh profile data after successful save
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }

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
      name: user?.name || "",
      email: user?.email || "",
      bio: userProfile.bio || "",
      phone: userProfile.phone || "",
      location: userProfile.location || "",
      timezone: userProfile.timezone || "GMT (UTC+0)",
      language: userProfile.language || "English",
      notifications: userProfile.notifications !== false,
      twoFactor: userProfile.twoFactor !== false,
    });
    setIsEditing(false);
  };

  if (profileLoading && showSkeleton) {
    return <SkeletonProfile />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-heading text-3xl">Profile Settings</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage your account information and preferences</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={cn("rounded-xl", isEditing ? "bg-[var(--bg-subtle)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border)]" : "")}
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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
            <div className="h-1.5 bg-[var(--accent)]" />
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face&auto=format"}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[var(--bg-card)] shadow-sm"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full p-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--text)]">{user?.name}</h3>
                <p className="text-[var(--text-muted)] mb-4">{user?.email}</p>
                <Badge className="mb-4 border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
                </Badge>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Member Since</span>
                    <span className="font-medium text-[var(--text)]">{userProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Last Active</span>
                    <span className="font-medium text-[var(--text)]">{userProfile.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Profile Status</span>
                    <Badge className="border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6 border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text)]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notification Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing & Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
            <div className="h-1 bg-[var(--accent)]" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-[var(--text-muted)]" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
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
                    className="mt-1 bg-[var(--bg-subtle)]/40"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
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
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
            <div className="h-1 bg-[var(--accent)]" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[var(--text-muted)]" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-card)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                  >
                    <option value="PST (UTC-8)">PST (UTC-8)</option>
                    <option value="EST (UTC-5)">EST (UTC-5)</option>
                    <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                    <option value="CET (UTC+1)">CET (UTC+1)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-card)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border border-[var(--border)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
            <div className="h-1 bg-[var(--accent)]" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[var(--text-muted)]" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[var(--text)]">Two-Factor Authentication</h4>
                  <p className="text-sm text-[var(--text-muted)]">Add an extra layer of security to your account</p>
                </div>
                <Button
                  variant={formData.twoFactor ? "default" : "outline"}
                  disabled={!isEditing}
                  onClick={() => setFormData({ ...formData, twoFactor: !formData.twoFactor })}
                >
                  {formData.twoFactor ? "Enabled" : "Enable"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[var(--text)]">Email Notifications</h4>
                  <p className="text-sm text-[var(--text-muted)]">Receive updates about your bookings and progress</p>
                </div>
                <Button
                  variant={formData.notifications ? "default" : "outline"}
                  disabled={!isEditing}
                  onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                >
                  {formData.notifications ? "Enabled" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="rounded-xl">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-slide-up shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg)] mb-6 shadow-sm">
                <CheckCircle className="h-8 w-8 text-[var(--text-muted)]" />
              </div>
              <h3 className="section-heading text-2xl mb-2">Profile updated</h3>
              <p className="text-[var(--text-muted)] mb-6">
                Your profile information has been updated and saved successfully.
              </p>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)]/40 p-4 mb-6 text-left">
                <h4 className="font-semibold text-[var(--text)] mb-2">Updated Information</h4>
                <div className="space-y-1 text-sm text-[var(--text-muted)]">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium text-[var(--text)]">{formData.name || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium text-[var(--text)]">{formData.phone || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-[var(--text)]">{formData.location || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span>Bio:</span>
                    <span className="font-medium text-[var(--text)] truncate ml-2 max-w-[200px]">{formData.bio || "Not provided"}</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl"
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
