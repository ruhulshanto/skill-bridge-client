"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { 
  Bell, 
  Lock, 
  Palette,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { NotificationsTab } from "@/components/admin/settings/NotificationsTab";
import { SecurityTab } from "@/components/admin/settings/SecurityTab";
import { AppearanceTab } from "@/components/admin/settings/AppearanceTab";

export default function SettingsPage() {
    const { user } = useAuth();
    
    // State management
    const [activeTab, setActiveTab] = useState("notifications");
    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    
    // Notification state
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        newUserAlerts: true,
        systemUpdates: false,
        bookingReminders: true,
        weeklyReports: false
    });
    
    // Security state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    
    // Appearance state
    const [appearance, setAppearance] = useState<{
        theme: "light" | "dark" | "auto";
        compactMode: boolean;
        animationsEnabled: boolean;
    }>({
        theme: "light",
        compactMode: false,
        animationsEnabled: true
    });

    const handleSaveNotifications = async () => {
        setIsLoading(true);
        setSaveStatus("saving");
        
        // Simulate API call
        setTimeout(() => {
            setSaveStatus("success");
            setIsLoading(false);
            setTimeout(() => setSaveStatus("idle"), 2000);
        }, 1000);
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 2000);
            return;
        }
        
        setIsLoading(true);
        setSaveStatus("saving");
        
        // Simulate API call
        setTimeout(() => {
            setSaveStatus("success");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setIsLoading(false);
            setTimeout(() => setSaveStatus("idle"), 2000);
        }, 1500);
    };

    const resetNotifications = () => {
        setNotifications({
            emailNotifications: true,
            newUserAlerts: true,
            systemUpdates: false,
            bookingReminders: true,
            weeklyReports: false
        });
    };

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your account settings and preferences
                    </p>
                </div>
                
                {/* Save Status Indicator */}
                <div className="flex items-center gap-2">
                    {saveStatus === "saving" && (
                        <div className="flex items-center gap-2 text-blue-600">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Saving...</span>
                        </div>
                    )}
                    {saveStatus === "success" && (
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Saved!</span>
                        </div>
                    )}
                    {saveStatus === "error" && (
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">Error!</span>
                        </div>
                    )}
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger 
                        value="notifications" 
                        className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-md transition-all"
                    >
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                        value="security" 
                        className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-md transition-all"
                    >
                        <Lock className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger 
                        value="appearance" 
                        className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-md transition-all"
                    >
                        <Palette className="h-4 w-4" />
                        Appearance
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="space-y-6">
                    <NotificationsTab
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isLoading={isLoading}
                        onSave={handleSaveNotifications}
                        onReset={resetNotifications}
                    />
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <SecurityTab
                        passwordData={passwordData}
                        setPasswordData={setPasswordData}
                        isLoading={isLoading}
                        onSave={handlePasswordChange}
                    />
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6">
                    <AppearanceTab
                        appearance={appearance}
                        setAppearance={setAppearance}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
