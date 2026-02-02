"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../layout/logo";
import {
    LayoutDashboard,
    Users,
    Calendar,
    LogOut,
    Menu,
    Layers,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function AdminNavbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
            color: "text-sky-500",
        },
        {
            label: "Users",
            icon: Users,
            href: "/admin/users",
            color: "text-violet-500",
        },
        {
            label: "Bookings",
            icon: Calendar,
            href: "/admin/bookings",
            color: "text-pink-700",
        },
        {
            label: "Categories",
            icon: Layers,
            href: "/admin/categories",
            color: "text-orange-700",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Logo />

                {/* Right side - Menu Dropdown */}
                <div className="flex items-center gap-2">
                    {/* Navigation Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {routes.map((route) => (
                                <DropdownMenuItem key={route.href} asChild>
                                    <Link
                                        href={route.href}
                                        className={cn(
                                            "flex items-center cursor-pointer",
                                            pathname === route.href && "bg-accent"
                                        )}
                                    >
                                        <route.icon className={cn("h-4 w-4 mr-2", route.color)} />
                                        {route.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Avatar */}
                    {user && (
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>
                                {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </nav>
    );
}
