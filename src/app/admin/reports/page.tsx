"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Download,
    Filter,
    Calendar as CalendarIcon,
    MoreHorizontal,
    Printer,
    Share2,
    X
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isWithinInterval, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

// Mock data for reports
const initialReports = [
    {
        id: "RPT-001",
        name: "Monthly Financial Summary",
        type: "Finance",
        generatedBy: "System",
        date: "2023-10-01",
        status: "Ready",
        size: "2.4 MB"
    },
    {
        id: "RPT-002",
        name: "User Growth Analysis",
        type: "Analytics",
        generatedBy: "Admin User",
        date: "2023-09-28",
        status: "Ready",
        size: "1.1 MB"
    },
    {
        id: "RPT-003",
        name: "Tutor Performance Review",
        type: "HR",
        generatedBy: "System",
        date: "2023-09-25",
        status: "Processing",
        size: "-"
    },
    {
        id: "RPT-004",
        name: "Platform Usage Metrics",
        type: "Analytics",
        generatedBy: "Admin User",
        date: "2023-09-20",
        status: "Ready",
        size: "3.2 MB"
    },
    {
        id: "RPT-005",
        name: "Q3 Revenue Report",
        type: "Finance",
        generatedBy: "System",
        date: "2023-09-15",
        status: "Archived",
        size: "5.8 MB"
    },
];

export default function ReportsPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2023, 8, 1), // Sept 1, 2023
        to: new Date(2023, 9, 30), // Oct 30, 2023
    });
    const [filterType, setFilterType] = useState<string | null>(null);

    // Filter logic
    const filteredReports = initialReports.filter((report) => {
        const reportDate = parse(report.date, "yyyy-MM-dd", new Date());

        // Date Range Filter
        const inDateRange = date?.from && date?.to ? isWithinInterval(reportDate, { start: date.from, end: date.to }) : true;

        // Type Filter
        const matchesType = filterType ? report.type === filterType : true;

        return inDateRange && matchesType;
    });

    const clearFilters = () => {
        setDate(undefined);
        setFilterType(null);
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Reports</h2>
                    <p className="text-muted-foreground">Manage and download system reports.</p>
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[260px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{initialReports.length}</div>
                        <p className="text-xs text-muted-foreground">in system history</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
                        <Filter className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredReports.length}</div>
                        <p className="text-xs text-muted-foreground">showing based on filters</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Next run in 2 hours</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Detailed Reports</CardTitle>
                            <CardDescription>
                                {date?.from && date?.to
                                    ? `Showing reports from ${format(date.from, "PP")} to ${format(date.to, "PP")}`
                                    : "All time reports"
                                }
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {(date || filterType) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                                    Reset
                                    <X className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter Type
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[150px]">
                                    <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        checked={filterType === "Finance"}
                                        onCheckedChange={() => setFilterType(filterType === "Finance" ? null : "Finance")}
                                    >
                                        Finance
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={filterType === "Analytics"}
                                        onCheckedChange={() => setFilterType(filterType === "Analytics" ? null : "Analytics")}
                                    >
                                        Analytics
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={filterType === "HR"}
                                        onCheckedChange={() => setFilterType(filterType === "HR" ? null : "HR")}
                                    >
                                        HR
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Generated By</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{report.name}</p>
                                                    <p className="text-xs text-muted-foreground">{report.size}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal">
                                                {report.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{report.generatedBy}</TableCell>
                                        <TableCell>{format(parse(report.date, "yyyy-MM-dd", new Date()), "MMM dd, yyyy")}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                report.status === "Ready" ? "default" :
                                                    report.status === "Processing" ? "secondary" : "outline"
                                            } className={
                                                report.status === "Ready" ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" :
                                                    report.status === "Processing" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200" : ""
                                            }>
                                                {report.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Share2 className="mr-2 h-4 w-4" />
                                                        Share
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Printer className="mr-2 h-4 w-4" />
                                                        Print
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No reports found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function SaveIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    )
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
