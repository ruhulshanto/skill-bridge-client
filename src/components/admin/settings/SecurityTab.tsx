"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, Smartphone, Loader2 } from "lucide-react";

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface SecurityTabProps {
    passwordData: PasswordData;
    setPasswordData: (data: PasswordData) => void;
    isLoading: boolean;
    onSave: () => void;
}

export function SecurityTab({ passwordData, setPasswordData, isLoading, onSave }: SecurityTabProps) {
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                        <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Security Settings
                </CardTitle>
                <CardDescription>
                    Manage your password and security preferences
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-1">
                    <div className="space-y-2">
                        <Label htmlFor="current" className="text-sm font-medium">Current Password</Label>
                        <Input 
                            id="current" 
                            type="password" 
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new" className="text-sm font-medium">New Password</Label>
                        <Input 
                            id="new" 
                            type="password" 
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm" className="text-sm font-medium">Confirm Password</Label>
                        <Input 
                            id="confirm" 
                            type="password" 
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                <div className="pt-4">
                    <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30">
                                <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Smartphone className="h-4 w-4" />
                            Enable
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-6">
                <Button 
                    onClick={onSave}
                    disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                    className="gap-2"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                    Update Password
                </Button>
            </CardFooter>
        </Card>
    );
}
