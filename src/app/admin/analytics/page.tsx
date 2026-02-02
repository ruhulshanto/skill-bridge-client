"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts";

// Mock data for analytics
const revenueData = [
    { name: "Jan", revenue: 4500, profit: 2400 },
    { name: "Feb", revenue: 5200, profit: 2800 },
    { name: "Mar", revenue: 4800, profit: 2600 },
    { name: "Apr", revenue: 6100, profit: 3500 },
    { name: "May", revenue: 5500, profit: 3000 },
    { name: "Jun", revenue: 6700, profit: 3800 },
    { name: "Jul", revenue: 7200, profit: 4200 },
];

const trafficData = [
    { name: "Mon", visitors: 500, pageviews: 2400 },
    { name: "Tue", visitors: 600, pageviews: 2600 },
    { name: "Wed", visitors: 750, pageviews: 3200 },
    { name: "Thu", visitors: 680, pageviews: 2900 },
    { name: "Fri", visitors: 800, pageviews: 3600 },
    { name: "Sat", visitors: 900, pageviews: 4000 },
    { name: "Sun", visitors: 850, pageviews: 3800 },
];

const categoryDistribution = [
    { name: "Web Dev", value: 400, color: "#3b82f6" },
    { name: "Data Science", value: 300, color: "#8b5cf6" },
    { name: "Design", value: 200, color: "#ec4899" },
    { name: "Marketing", value: 150, color: "#f59e0b" },
];

const userActivity = [
    { date: "10/01", active: 120, new: 20 },
    { date: "10/02", active: 132, new: 25 },
    { date: "10/03", active: 145, new: 30 },
    { date: "10/04", active: 160, new: 35 },
    { date: "10/05", active: 178, new: 40 },
    { date: "10/06", active: 190, new: 45 },
    { date: "10/07", active: 210, new: 50 },
];

export default function AnalyticsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Analytics Dashboard</h2>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="traffic">Traffic</TabsTrigger>
                    <TabsTrigger value="users">User Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$40,000</div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12,234</div>
                                <p className="text-xs text-muted-foreground">+19% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">+201 since last hour</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Main Area Chart */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>Monthly revenue vs profit</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <Tooltip
                                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                            />
                                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                                            <Area type="monotone" dataKey="profit" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorProfit)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category Pie Chart */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Category Distribution</CardTitle>
                                <CardDescription>Popular learning categories</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={categoryDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {categoryDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categoryDistribution.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                                <span className="text-gray-600 dark:text-gray-300 truncate">{item.name}</span>
                                                <span className="text-gray-500 text-xs ml-auto">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Placeholder for other tabs - can be expanded */}
                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Detailed Revenue Analytics</CardTitle></CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
                            Revenue Chart Component (Coming Soon)
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="traffic" className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Traffic Analytics</CardTitle></CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
                            Traffic Chart Component (Coming Soon)
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>User Demographics</CardTitle></CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
                            User Insights Component (Coming Soon)
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
