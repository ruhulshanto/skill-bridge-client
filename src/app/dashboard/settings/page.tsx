"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Globe, 
  Shield, 
  Mail, 
  Save,
  User,
  CreditCard,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

export default function StudentSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    twoFactor: false,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "GMT (UTC+0)",
    theme: "light",
  });

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Save settings to backend
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Notifications Settings */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive updates and alerts via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, email: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, push: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive important updates via SMS</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.sms}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, sms: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-notifications">Marketing Emails</Label>
              <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
            </div>
            <Switch
              id="marketing-notifications"
              checked={notifications.marketing}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy settings and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <p className="text-sm text-gray-600">Make your profile visible to other users</p>
            </div>
            <Switch
              id="profile-visibility"
              checked={privacy.profileVisibility}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, profileVisibility: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-email">Show Email</Label>
              <p className="text-sm text-gray-600">Display your email address on your profile</p>
            </div>
            <Switch
              id="show-email"
              checked={privacy.showEmail}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, showEmail: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-phone">Show Phone</Label>
              <p className="text-sm text-gray-600">Display your phone number on your profile</p>
            </div>
            <Switch
              id="show-phone"
              checked={privacy.showPhone}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, showPhone: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={privacy.twoFactor}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, twoFactor: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Preferences
          </CardTitle>
          <CardDescription>
            Customize your app experience and display preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select 
                id="language"
                value={preferences.language}
                onChange={(e) => 
                  setPreferences(prev => ({ ...prev, language: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                value={preferences.timezone}
                onChange={(e) => 
                  setPreferences(prev => ({ ...prev, timezone: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                <option value="EST (UTC-5)">EST (UTC-5)</option>
                <option value="PST (UTC-8)">PST (UTC-8)</option>
                <option value="CST (UTC+8)">CST (UTC+8)</option>
                <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
              </select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  preferences.theme === 'light' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Sun className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Light</span>
              </button>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  preferences.theme === 'dark' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Moon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Dark</span>
              </button>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'system' }))}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  preferences.theme === 'system' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Monitor className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">System</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-lg border-0">
        <div className="h-1 bg-gradient-to-r from-red-500 to-orange-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-red-600" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your account and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Manage Subscription
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
