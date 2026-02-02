"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Shield, Camera, Edit3, Save, Bell, Lock, Globe, DollarSign, BookOpen, Award } from "lucide-react";
import { useState, useEffect } from "react";
import tutorService, { TutorProfile } from "@/services/tutor.service";

export default function TutorProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    experience: 0,
    education: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await tutorService.getProfile();
        setProfile(profileData);
        setFormData({
          bio: profileData.bio || "",
          hourlyRate: profileData.hourlyRate || 0,
          experience: profileData.experience || 0,
          education: profileData.education || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const updatedProfile = await tutorService.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        hourlyRate: profile.hourlyRate || 0,
        experience: profile.experience || 0,
        education: profile.education || "",
      });
    }
    setIsEditing(false);
  };

  if (loading) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face&auto=format"}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                
                {profile && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Badge className={profile.isVerified ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {profile.isVerified ? "Verified Tutor" : "Unverified"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>{(profile.rating || 0).toFixed(1)} ({profile.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>${profile.hourlyRate}/hour</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{profile.experience} years experience</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {profile && (
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {new Date(user?.createdAt || "").toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">1 hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-medium">English</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                {isEditing ? "Edit your profile information" : "Your profile information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell students about yourself, your teaching style, and expertise..."
                    className="mt-1"
                    rows={4}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {profile?.bio || "No bio provided yet"}
                  </p>
                )}
              </div>

              {/* Hourly Rate */}
              <div>
                <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">
                  Hourly Rate ($)
                </Label>
                {isEditing ? (
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) || 0 })}
                    placeholder="50"
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">${profile?.hourlyRate || 0}/hour</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                  Years of Experience
                </Label>
                {isEditing ? (
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                    placeholder="5"
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profile?.experience || 0} years</p>
                )}
              </div>

              {/* Education */}
              <div>
                <Label htmlFor="education" className="text-sm font-medium text-gray-700">
                  Education
                </Label>
                {isEditing ? (
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Master's in Education"
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {profile?.education || "No education information provided"}
                  </p>
                )}
              </div>

              {/* Subjects */}
              {profile?.subjects && profile.subjects.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Subjects
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.subjects.map((subject) => (
                      <Badge key={subject.id} variant="outline">
                        {subject.subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="shadow-lg mt-6">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive booking notifications</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-600">Change your password</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
