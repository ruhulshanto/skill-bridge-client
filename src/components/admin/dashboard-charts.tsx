"use client";

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
    AreaChart,
    Area
} from "recharts";

// Mock data
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">User Acquisition</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span className="text-[10px] font-bold text-muted-foreground">New Registrations</span>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={userGrowthData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#86C6FF" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#86C6FF" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontWeight: 600 }}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                tick={{ fontWeight: 600 }}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    borderRadius: "16px", 
                                    border: "1px solid #e2e8f0", 
                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(8px)",
                                    padding: "12px"
                                }}
                                itemStyle={{ fontWeight: 800, fontSize: "12px", color: "#0A2540" }}
                                labelStyle={{ fontWeight: 900, marginBottom: "4px", fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#86C6FF"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                                activeDot={{ r: 6, fill: "#86C6FF", stroke: "#fff", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-span-3 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Session Velocity</p>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bookingData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontWeight: 600 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(134, 198, 255, 0.1)' }}
                                contentStyle={{ 
                                    borderRadius: "16px", 
                                    border: "1px solid #e2e8f0", 
                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(8px)",
                                    padding: "12px"
                                }}
                                itemStyle={{ fontWeight: 800, fontSize: "12px", color: "#0A2540" }}
                                labelStyle={{ fontWeight: 900, marginBottom: "4px", fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}
                            />
                            <Bar
                                dataKey="bookings"
                                fill="#8b5cf6"
                                radius={[6, 6, 0, 0]}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
