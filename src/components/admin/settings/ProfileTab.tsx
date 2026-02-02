"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { User, Upload, Save, Loader2 } from "lucide-react";

interface ProfileData {
    name: string;
    email: string;
    bio: string;
    avatar: File | null;
}

interface ProfileTabProps {
    profileData: ProfileData;
    setProfileData: (data: ProfileData) => void;
    isLoading: boolean;
    onSave: () => void;
}

export function ProfileTab({ profileData, setProfileData, isLoading, onSave }: ProfileTabProps) {
    const { user } = useAuth();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileData({ ...profileData, avatar: file });
        }
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Profile Information
                </CardTitle>
                <CardDescription>
                    Update your photo and personal details
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-lg">
                        <AvatarImage src={profileData.avatar ? URL.createObjectURL(profileData.avatar) : "/avatar.png"} />
                        <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Button variant="outline" size="sm" className="gap-2">
                                <Upload className="h-4 w-4" />
                                Change Avatar
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. Max size of 800K
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input 
                            id="name" 
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input 
                            id="email" 
                            value={profileData.email}
                            disabled 
                            className="bg-gray-50 dark:bg-gray-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                        <div className="flex items-center">
                            <Badge variant="secondary" className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 dark:from-purple-900/30 dark:to-purple-800/30 dark:text-purple-300">
                                {user?.role || "ADMINISTRATOR"}
                            </Badge>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                        <Input 
                            id="bio" 
                            placeholder="Tell us a little about yourself"
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-6">
                <Button 
                    onClick={onSave}
                    disabled={isLoading}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    );
}
