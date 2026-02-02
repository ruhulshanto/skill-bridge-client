"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette, Moon, Monitor, Globe } from "lucide-react";

interface AppearanceSettings {
    theme: "light" | "dark" | "auto";
    compactMode: boolean;
    animationsEnabled: boolean;
}

interface AppearanceTabProps {
    appearance: AppearanceSettings;
    setAppearance: (settings: AppearanceSettings) => void;
}

export function AppearanceTab({ appearance, setAppearance }: AppearanceTabProps) {
    const themes = [
        {
            value: "light" as const,
            title: "Light Mode",
            description: "Default light appearance",
            icon: Monitor
        },
        {
            value: "dark" as const,
            title: "Dark Mode",
            description: "Dark appearance (Coming Soon)",
            icon: Moon
        },
        {
            value: "auto" as const,
            title: "System",
            description: "Follow system preference",
            icon: Globe
        }
    ];

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                        <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Appearance
                </CardTitle>
                <CardDescription>
                    Customize the look and feel of the admin panel
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Theme</Label>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {themes.map((theme) => (
                            <div 
                                key={theme.value}
                                onClick={() => setAppearance({ ...appearance, theme: theme.value })}
                                className={`cursor-pointer space-y-3 rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                                    appearance.theme === theme.value 
                                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${
                                            appearance.theme === theme.value 
                                                ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' 
                                                : 'bg-gray-100 dark:bg-gray-800'
                                        }`}>
                                            <theme.icon className={`h-4 w-4 ${
                                                appearance.theme === theme.value 
                                                    ? 'text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">{theme.title}</p>
                                            <p className="text-xs text-muted-foreground">{theme.description}</p>
                                        </div>
                                    </div>
                                    {appearance.theme === theme.value && (
                                        <div className="h-4 w-4 rounded-full bg-blue-600" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Additional Options</Label>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Compact Mode</Label>
                                <p className="text-sm text-muted-foreground">Reduce spacing and padding for more content</p>
                            </div>
                            <Switch 
                                checked={appearance.compactMode}
                                onCheckedChange={(checked) => 
                                    setAppearance({ ...appearance, compactMode: checked })
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Animations</Label>
                                <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                            </div>
                            <Switch 
                                checked={appearance.animationsEnabled}
                                onCheckedChange={(checked) => 
                                    setAppearance({ ...appearance, animationsEnabled: checked })
                                }
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
