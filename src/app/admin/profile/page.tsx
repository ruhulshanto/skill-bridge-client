"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Phone, Calendar, Shield, User, Edit2, Save, X, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";

export default function AdminProfilePage() {
  const { user, checkAuth } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
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
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Only send changed fields
      const updateData: any = {};
      if (formData.name !== user?.name) updateData.name = formData.name;
      if (formData.phone !== user?.phone) updateData.phone = formData.phone;

      if (Object.keys(updateData).length === 0) {
        toast({
          title: "No changes",
          description: "No changes were made to your profile.",
        });
        setIsEditing(false);
        return;
      }

      const response = await apiClient.updateAdminProfile(updateData);
      
      if (response.data) {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        
        // Refresh user data
        await checkAuth();
        setIsEditing(false);
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
    <div className="max-w-4xl mx-auto space-y-6">
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
    </div>
  );
}
