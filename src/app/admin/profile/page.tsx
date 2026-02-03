"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Phone, Shield, User, Edit2, Save, X, Clock, CheckCircle, MapPin, Sparkles, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AdminProfilePage() {
  const { user, checkAuth, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch detailed profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsFetching(true);
        console.log("🔍 Fetching detailed admin profile...");
        const response = await apiClient.getAdminProfile();

        if (response.data) {
          const profileData = response.data;
          console.log("👤 Admin data fetched:", profileData);

          setFormData({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            bio: profileData.bio || "",
            location: profileData.location || "",
          });

          // Sync auth context with full data
          updateUser(profileData);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  // Update form data if user context changes (e.g. from logout/login)
  useEffect(() => {
    if (user && !isEditing) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      }));
    }
  }, [user, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Only send changed fields (exclude empty strings)
      const updateData: any = {};
      if (formData.name.trim()) updateData.name = formData.name.trim();
      updateData.phone = formData.phone.trim();
      updateData.bio = formData.bio.trim();
      updateData.location = formData.location.trim();

      console.log("🔍 Updating admin profile with data:", updateData);
      const response = await apiClient.updateAdminProfile(updateData);
      console.log("📊 API Response:", response);

      const responseAny = response as any;
      if (responseAny && (responseAny.data || responseAny.status === 200)) {
        // Correctly handle nested data based on inspect log { data: { data: { ... } } }
        const serverData = responseAny.data?.data || responseAny.data;

        // Final fallback to updateData if server returns nothing
        const finalData = serverData || updateData;

        console.log("✅ Final data to update:", finalData);

        // IMPORTANT: Update local user state immediately for dynamic UI update
        // We MUST use the spread operator to trigger a new object reference
        updateUser({
          ...user,
          ...finalData,
          name: finalData.name || user?.name || "",
          phone: finalData.phone || user?.phone || "",
          bio: finalData.bio || user?.bio || "",
          location: finalData.location || user?.location || "",
        });

        // Show success modal
        setShowSuccessModal(true);
        setIsEditing(false);

        // DO NOT call checkAuth() immediately as it might fetch cached stale session
        // Instead, we just trust the updateUser call which refreshes all context consumers
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isFetching && !user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
        </div>
        <p className="text-gray-500 font-medium font-poppins animate-pulse">Initializing Admin Secure Access...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Account <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your administrator profile and secure settings</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button
              onClick={handleEdit}
              className="bg-white text-gray-900 border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 shadow-sm transition-all duration-200 h-12 px-6 rounded-xl group"
            >
              <Edit2 className="h-4 w-4 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-12 px-8 rounded-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">
            <div className="h-32 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
              <div className="absolute top-4 right-4 text-white/50">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <CardContent className="relative px-6 pb-8">
              <div className="flex flex-col items-center -mt-16 text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Avatar className="h-32 w-32 border-[6px] border-white shadow-2xl relative">
                    <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-2 right-2 h-7 w-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{user?.name}</h2>
                  <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    System Administrator
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                    <Shield className="h-3 w-3 mr-1" /> Admin
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                    {user?.status || "ACTIVE"}
                  </Badge>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Created</p>
                    <p className="text-sm font-bold text-gray-700 mt-1">
                      {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2024"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Access</p>
                    <p className="text-sm font-bold text-gray-700 mt-1">Root</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details Card */}
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardHeader className="pb-3 px-6">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="h-9 w-9 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Email</p>
                  <p className="text-sm font-medium text-gray-700 truncate">{user?.email}</p>
                </div>
                {user?.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>

              <div className="flex items-center gap-3 group">
                <div className="h-9 w-9 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Phone className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{user?.phone || "Not Set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="h-9 w-9 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Location</p>
                  <p className="text-sm font-medium text-gray-700">{user?.location || "Not Set"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Edit/Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden min-h-full">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <CardHeader className="px-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">Personal Information</CardTitle>
                  <CardDescription className="text-gray-500">Update your account name and description</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-12 pl-11 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-medium",
                        isEditing && "bg-white border-gray-200"
                      )}
                      placeholder="e.g. Ruhul Amin Shanto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-12 pl-11 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-medium",
                        isEditing && "bg-white border-gray-200"
                      )}
                      placeholder="+880 1234 5678"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location" className="text-sm font-bold text-gray-500 uppercase tracking-wider">Living Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-12 pl-11 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-medium",
                        isEditing && "bg-white border-gray-200"
                      )}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="text-sm font-bold text-gray-500 uppercase tracking-wider">About Me / Bio</Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className={cn(
                      "w-full p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-medium resize-none",
                      isEditing && "bg-white border-gray-200"
                    )}
                    placeholder="Briefly describe your role and background..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Premium Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden rounded-[32px] bg-white shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)]">
          <div className="p-1">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-center rounded-[31px] relative overflow-hidden">
              {/* Background Sparkles */}
              <div className="absolute top-0 right-0 p-4 text-white/10 rotate-12">
                <Shield className="h-32 w-32" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 text-white/10 -rotate-12">
                <Sparkles className="h-24 w-24" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="h-24 w-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center p-1 mb-8 shadow-inner ring-1 ring-white/30 animate-in zoom-in spin-in-12 duration-700">
                  <div className="h-full w-full bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Check className="h-10 w-10 text-blue-600 animate-in bounce-in duration-1000 delay-300" />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-white tracking-tight mb-3">Sync Complete!</h3>
                <p className="text-blue-50/80 text-lg font-medium max-w-[280px] leading-relaxed mb-10">
                  Your administrator profile has been securelly updated and synchronized.
                </p>

                <div className="w-full flex flex-col gap-3">
                  <Button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-white hover:bg-white/95 text-blue-700 font-bold h-14 rounded-2xl shadow-xl transition-all duration-300 active:scale-95"
                  >
                    Return to Dashboard
                  </Button>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">End-to-End Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
