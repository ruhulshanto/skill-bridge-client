"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, User, Settings, Smartphone, Globe, Loader2 } from "lucide-react";

interface NotificationSettings {
    emailNotifications: boolean;
    newUserAlerts: boolean;
    systemUpdates: boolean;
    bookingReminders: boolean;
    weeklyReports: boolean;
}

interface NotificationsTabProps {
    notifications: NotificationSettings;
    setNotifications: (settings: NotificationSettings) => void;
    isLoading: boolean;
    onSave: () => void;
    onReset: () => void;
}

export function NotificationsTab({ 
    notifications, 
    setNotifications, 
    isLoading, 
    onSave, 
    onReset 
}: NotificationsTabProps) {
    const notificationItems = [
        {
            key: "emailNotifications" as keyof NotificationSettings,
            title: "Email Notifications",
            description: "Receive emails about new bookings",
            icon: Mail
        },
        {
            key: "newUserAlerts" as keyof NotificationSettings,
            title: "New User Alerts",
            description: "Get notified when a new user registers",
            icon: User
        },
        {
            key: "systemUpdates" as keyof NotificationSettings,
            title: "System Updates",
            description: "Receive reports about system maintenance",
            icon: Settings
        },
        {
            key: "bookingReminders" as keyof NotificationSettings,
            title: "Booking Reminders",
            description: "Get reminded about upcoming sessions",
            icon: Smartphone
        },
        {
            key: "weeklyReports" as keyof NotificationSettings,
            title: "Weekly Reports",
            description: "Receive weekly platform performance reports",
            icon: Globe
        }
    ];

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                        <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Notification Preferences
                </CardTitle>
                <CardDescription>
                    Choose what you want to be notified about
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {notificationItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                                <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-base font-medium">{item.title}</Label>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                        <Switch 
                            checked={notifications[item.key]}
                            onCheckedChange={(checked) => 
                                setNotifications({ ...notifications, [item.key]: checked })
                            }
                        />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="pt-6 flex gap-3">
                <Button 
                    onClick={onSave}
                    disabled={isLoading}
                    variant="outline"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Preferences
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={onReset}
                >
                    Reset to Defaults
                </Button>
            </CardFooter>
        </Card>
    );
}
