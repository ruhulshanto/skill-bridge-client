"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Phone, Calendar, Shield, User, Edit2, Save, X, Clock, CheckCircle, AlertCircle, MapPin, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminProfilePage() {
  const { user, checkAuth, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user]);

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
      if (formData.name !== user?.name && formData.name.trim()) updateData.name = formData.name.trim();
      if (formData.phone !== user?.phone && formData.phone.trim()) updateData.phone = formData.phone.trim();
      if (formData.bio !== user?.bio && formData.bio.trim()) updateData.bio = formData.bio.trim();
      if (formData.location !== user?.location && formData.location.trim()) updateData.location = formData.location.trim();

      if (Object.keys(updateData).length === 0) {
        toast({
          title: "No changes",
          description: "No changes were made to your profile.",
        });
        setIsEditing(false);
        return;
      }

      console.log("🔍 Updating admin profile with data:", updateData);
      const response = await apiClient.updateAdminProfile(updateData);
      console.log("📊 API Response:", response);
      
      // Handle successful update even if response is empty
      const responseAny = response as any;
      if (response && (response.data || responseAny.status === 200 || responseAny.success)) {
        // If API returns data, use it. Otherwise, use the form data we sent.
        const updatedData = response.data || updateData;
        
        // Update user in auth context with server response or form data
        const updatedUser = {
          ...user!,
          ...updatedData,
        };
        
        updateUser(updatedUser);
        
        // Update form state to match exactly what was saved
        setFormData({
          name: updatedData.name || user?.name || "",
          email: user?.email || "",
          phone: updatedData.phone || user?.phone || "",
          bio: updatedData.bio || user?.bio || "",
          location: updatedData.location || user?.location || "",
        });
        
        // Force re-render
        setRefreshKey(prev => prev + 1);
        
        setShowSuccessModal(true);
        setIsEditing(false);
      } else {
        throw new Error("No data returned from API");
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

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 animate-spin" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div key={refreshKey} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600 mt-1">Manage your administrator account information</p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Overview Card */}
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
          <CardTitle className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">System Administrator</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
                <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"} className="bg-green-100 text-green-800">
                  {user.status || "Active"}
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </h3>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 border-gray-200" : ""}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50 border-gray-200 cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 border-gray-200" : ""}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 border-gray-200" : ""}
                    placeholder="Enter your location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 border-gray-200" : "w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Account Details
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Verification</p>
                      <p className="text-xs text-gray-500">
                        {user.emailVerified ? "Verified" : "Not Verified"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={user.emailVerified ? "default" : "secondary"} className="text-xs">
                    {user.emailVerified ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Member Since</p>
                      <p className="text-xs text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone Status</p>
                      <p className="text-xs text-gray-500">
                        {user.phone ? "Provided" : "Not provided"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={user.phone ? "default" : "secondary"} className="text-xs">
                    {user.phone ? "Set" : "Missing"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Status</p>
                      <p className="text-xs text-gray-500">
                        {user.status || "Active"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"} className="text-xs">
                    {user.status || "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin Role</p>
                <p className="text-xs text-gray-500">Full system access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Account Active</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-xs text-gray-500">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "Never"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
          <DialogHeader className="text-center pb-0">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Profile Updated!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-3 text-lg">
              Your admin profile has been successfully updated
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-lg" />
              </div>
              <div>
                <p className="text-green-800 font-semibold">All changes saved successfully</p>
                <p className="text-green-600 text-sm">Your profile is up to date</p>
              </div>
            </div>

            {formData.location && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">Location Updated</p>
                  <p className="text-blue-600">{formData.location}</p>
                </div>
              </div>
            )}

            {formData.bio && (
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <FileText className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-purple-800 font-medium">Bio Updated</p>
                  <p className="text-purple-600 text-sm truncate">{formData.bio}</p>
                </div>
              </div>
            )}

            {(!formData.location && !formData.bio) && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Consider adding your location and bio to complete your profile</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
