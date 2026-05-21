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
    Tag
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
        },
        {
            label: "Users",
            icon: Users,
            href: "/admin/users",
        },
        {
            label: "Bookings",
            icon: Calendar,
            href: "/admin/bookings",
        },
        {
            label: "Categories",
            icon: Layers,
            href: "/admin/categories",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#a3c7e6] shadow-sm" style={{ backgroundColor: "#e5f2ff" }}>
            <div className="flex items-center justify-between h-20 px-6">
                {/* Logo */}
                <Logo subtitle="Admin" />

                {/* Right side - Menu Dropdown */}
                <div className="flex items-center gap-3">
                    {/* Navigation Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-[#a3c7e6] bg-white text-[#2d6a9f] hover:bg-white hover:text-primary shadow-sm transition-all">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 rounded-[1.5rem] border-[#a3c7e6] bg-[#e5f2ff] p-2 shadow-2xl animate-in zoom-in-95 duration-200">
                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#2d6a9f] opacity-60">
                                Command Menu
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                            {routes.map((route) => (
                                <DropdownMenuItem key={route.href} asChild className="p-0">
                                    <Link
                                        href={route.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-black text-xs uppercase tracking-widest my-1 mx-1",
                                            pathname === route.href 
                                                ? "bg-white text-[#0A2540] shadow-md border border-[#a3c7e6]/30" 
                                                : "text-[#2d6a9f] hover:bg-white/40"
                                        )}
                                    >
                                        <route.icon className={cn("h-4 w-4", pathname === route.href ? "text-primary" : "text-[#2d6a9f]")} />
                                        {route.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                            <DropdownMenuItem onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-black text-xs uppercase tracking-widest text-red-600 hover:bg-red-50 cursor-pointer m-1">
                                <LogOut className="h-4 w-4" />
                                Terminate
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Avatar */}
                    {user && (
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="bg-primary/5 text-primary font-black">
                                {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </nav>
    );
}
