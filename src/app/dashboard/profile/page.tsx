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
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        if (result.data) {
          const userData = result.data as User;
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
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            ...profileData,
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
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
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message || "Failed to update profile",
          variant: "destructive",
        });
        return;
      }

      // Update local state with the saved data
      if (result.data) {
        const updatedData = result.data as User;
        
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
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      setIsEditing(false);
    } catch (error) {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-gray-600 hover:bg-gray-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}
        >
          {isEditing ? (
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
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face&auto=format"}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <Badge className="bg-blue-100 text-blue-800 mb-4">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
                </Badge>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">{userProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Active</span>
                    <span className="font-medium">{userProfile.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profile Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
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
          <Card className="shadow-lg border-0">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-purple-600" />
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
                    className="mt-1 bg-gray-50"
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
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="shadow-lg border-0">
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
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
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <Card className="shadow-lg border-0">
            <div className="h-1 bg-gradient-to-r from-orange-500 to-red-600" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
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
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates about your bookings and progress</p>
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
              <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
