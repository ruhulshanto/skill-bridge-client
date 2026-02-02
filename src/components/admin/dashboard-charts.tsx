"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";

// Mock data - in a real app this could be passed in or fetched
const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 200 },
    { name: "Apr", users: 278 },
    { name: "May", users: 189 },
    { name: "Jun", users: 239 },
    { name: "Jul", users: 349 },
];

const bookingData = [
    { name: "Mon", bookings: 24 },
    { name: "Tue", bookings: 13 },
    { name: "Wed", bookings: 98 },
    { name: "Thu", bookings: 39 },
    { name: "Fri", bookings: 48 },
    { name: "Sat", bookings: 38 },
    { name: "Sun", bookings: 43 },
];

export function DashboardCharts() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-sm">
                <CardHeader>
                    <CardTitle>User Growth Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, fill: "#2563eb" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Weekly Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bookingData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Bar
                                    dataKey="bookings"
                                    fill="#8b5cf6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
