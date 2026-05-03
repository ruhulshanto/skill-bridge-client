"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Phone, Shield, User as UserIcon, Edit2, MapPin, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AdminProfilePage() {
  const { user, checkAuth, updateUser } = useAuth();
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

  // Fetch detailed profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsFetching(true);
        const response = await apiClient.getAdminProfile();

        if (response.data) {
          const profileData = response.data;
          setFormData({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            bio: profileData.bio || "",
            location: profileData.location || "",
          });
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

  // Sync form data when user changes (only on initial load)
  useEffect(() => {
    if (user && !isEditing && !formData.name) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user, isEditing, formData.name]);

  const handleEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
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

      const updateData: any = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
      };

      const response = await apiClient.updateAdminProfile(updateData);

      if (response.data) {
        // 1. Update local state with fresh data from server
        const updatedUser = response.data;
        updateUser(updatedUser);
        
        setFormData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
          bio: updatedUser.bio || "",
          location: updatedUser.location || "",
        });

        // 2. Synchronize the session to be absolutely sure
        await checkAuth();

        toast.success("Identity Secured", {
          description: "Your profile has been updated successfully.",
        });

        setIsEditing(false);
      } else {
        throw new Error(response.error?.message || "Failed to update profile");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Header ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm mb-4">
               <Shield className="h-3.5 w-3.5" />
               Security & Identity
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">Admin Profile</h1>
            <p className="text-[#2d6a9f] font-medium max-w-xl">
              Manage your administrative identity and system-wide credentials. Ensure your contact information is up to date.
            </p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="rounded-xl h-14 px-8 font-black text-xs uppercase tracking-widest bg-white border border-[#a3c7e6] text-[#2d6a9f] hover:bg-[#CCE7FF] shadow-sm transition-all"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Modify Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="rounded-xl h-14 px-6 font-black text-xs uppercase tracking-widest text-[#2d6a9f] hover:bg-white/50 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="rounded-xl h-14 px-8 font-black text-xs uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                >
                  {isLoading ? "Saving Changes..." : "Save Identity"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <div 
            className="overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <div className="h-32 bg-gradient-to-br from-[#86C6FF] to-[#0A2540] relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
            </div>
            <div className="relative px-8 pb-10">
              <div className="flex flex-col items-center -mt-16 text-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Avatar className="h-32 w-32 border-[6px] border-white shadow-2xl relative">
                    <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-white text-primary font-black">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-2 right-2 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <h2 className="text-2xl font-black text-[#0A2540] tracking-tight">{user?.name}</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mt-2">
                    <Sparkles className="h-3 w-3" />
                    Root Administrator
                  </div>
                </div>

                <div className="w-full mt-10 pt-8 border-t border-[#a3c7e6]/30 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-[#2d6a9f] font-black uppercase tracking-wider mb-1">Tenure</p>
                    <p className="text-sm font-black text-[#0A2540]">
                      {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2024"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#2d6a9f] font-black uppercase tracking-wider mb-1">Status</p>
                    <Badge className="bg-emerald-500 text-white border-0 px-3 py-0.5 text-[9px] font-black uppercase tracking-tighter">
                      Authorized
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div 
            className="rounded-[2.5rem] border border-[#a3c7e6] p-8 shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <h3 className="text-xs font-black text-[#2d6a9f] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Verified Contact
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-xl border border-[#a3c7e6] flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-[#2d6a9f] font-black uppercase tracking-tight mb-0.5">Primary Email</p>
                  <p className="text-xs font-bold text-[#0A2540] truncate">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-xl border border-[#a3c7e6] flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-[#2d6a9f] font-black uppercase tracking-tight mb-0.5">Direct Line</p>
                  <p className="text-xs font-bold text-[#0A2540]">{user?.phone || "Not Configured"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-xl border border-[#a3c7e6] flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-[#2d6a9f] font-black uppercase tracking-tight mb-0.5">Location</p>
                  <p className="text-xs font-bold text-[#0A2540]">{user?.location || "Global Remote"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <div 
            className="rounded-[2.5rem] border border-[#a3c7e6] p-10 shadow-xl"
            style={{ backgroundColor: "#e5f2ff" }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-14 w-14 bg-white rounded-2xl border border-[#a3c7e6] flex items-center justify-center shadow-sm">
                <UserIcon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0A2540] tracking-tight">Identity Settings</h3>
                <p className="text-sm font-bold text-[#2d6a9f] opacity-70 uppercase tracking-widest">Core personal and professional metadata</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Legal Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={cn(
                      "h-14 pl-12 rounded-2xl border-[#a3c7e6] bg-white transition-all text-[#0A2540] font-bold shadow-sm",
                      !isEditing && "opacity-60 bg-white/50 cursor-not-allowed border-dashed"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Contact Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={cn(
                      "h-14 pl-12 rounded-2xl border-[#a3c7e6] bg-white transition-all text-[#0A2540] font-bold shadow-sm",
                      !isEditing && "opacity-60 bg-white/50 cursor-not-allowed border-dashed"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="location" className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Base Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                    className={cn(
                      "h-14 pl-12 rounded-2xl border-[#a3c7e6] bg-white transition-all text-[#0A2540] font-bold shadow-sm",
                      !isEditing && "opacity-60 bg-white/50 cursor-not-allowed border-dashed"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="bio" className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest">Professional Dossier</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={6}
                  className={cn(
                    "w-full p-6 rounded-[1.5rem] border border-[#a3c7e6] bg-white transition-all text-[#0A2540] font-bold shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20",
                    !isEditing && "opacity-60 bg-white/50 cursor-not-allowed border-dashed"
                  )}
                  placeholder="Summarize your professional experience and system responsibilities..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
