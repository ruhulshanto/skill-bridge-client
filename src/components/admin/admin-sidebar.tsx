"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState<{ totalUsers: number } | null>(null);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch stats for dynamic badges
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminService = (await import("@/services/admin.service")).default;
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch sidebar stats:", error);
      }
    };
    fetchStats();
  }, []);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      color: "text-blue-500",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      color: "text-purple-500",
      badge: stats?.totalUsers?.toString() || "0",
    },
    {
      label: "Bookings",
      icon: Calendar,
      href: "/admin/bookings",
      color: "text-emerald-500",
    },
    {
      label: "Categories",
      icon: Layers,
      href: "/admin/categories",
      color: "text-amber-500",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "text-cyan-500",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/admin/reports",
      color: "text-rose-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      color: "text-slate-400",
    },
  ];

  const mainRoutes = routes.slice(0, 6);
  const secondaryRoutes = routes.slice(6);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-9 w-9"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Logo subtitle="Admin Panel" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell size={18} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer border">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 z-40 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
      >
        {/* Logo Section */}
        <div className={cn("px-4 py-5", isCollapsed ? "px-3" : "")}>
          <div
            className={cn(
              "flex items-center gap-3 transition-all duration-200",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            <Logo subtitle="Admin Panel" collapsed={isCollapsed} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "h-8 w-8 rounded-lg transition-all",
                isCollapsed ? "rotate-180" : ""
              )}
            >
              <ChevronLeft size={16} />
            </Button>
          </div>
        </div>

        <Separator className="bg-gray-100" />


        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className={cn("px-2 mb-2", isCollapsed ? "text-center" : "")}>
            {!isCollapsed && (
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Main Menu
              </p>
            )}
          </div>

          {mainRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isCollapsed ? "justify-center px-3 py-3" : "px-3 py-2.5"
                )}
              >
                <div className="relative">
                  <route.icon
                    className={cn("h-5 w-5", route.color, isCollapsed ? "mx-auto" : "")}
                  />

                </div>
                {!isCollapsed && (
                  <>
                    <span className="ml-3 font-medium text-sm">{route.label}</span>
                    {route.badge && (
                      <span className="ml-auto h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">
                        {route.badge}
                      </span>
                    )}
                  </>
                )}
                {isCollapsed && isActive && (
                  <div className="absolute right-0 h-6 w-1 rounded-l-full bg-blue-600" />
                )}
              </Link>
            );
          })}

          {!isCollapsed && (
            <>
              <div className="px-2 mb-2 mt-6">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferences
                </p>
              </div>

              {secondaryRoutes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <route.icon className={cn("h-5 w-5", route.color)} />
                    <span className="ml-3 font-medium text-sm">{route.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-100">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500">{user?.role || "Administrator"}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile" className="flex items-center cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="flex items-center cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="h-9 w-9 rounded-lg"
                title="Logout"
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Sidebar Header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Logo subtitle="Admin Panel" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Navigation
            </p>

            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={closeMobileSidebar}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  <span className="ml-3 font-medium">{route.label}</span>
                  {route.badge && (
                    <span className="ml-auto h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">
                      {route.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="ml-auto h-4 w-4 text-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Profile */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border-2 border-white shadow">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user?.name || "Admin User"}</p>
                <p className="text-sm text-gray-500">{user?.email || "admin@skillbridge.com"}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="h-9 w-9 rounded-lg text-gray-500 hover:text-red-600"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Spacing */}
      <div
        className={cn(
          "transition-all duration-300",
          isMobile
            ? "pt-16"
            : isCollapsed
              ? "md:pl-20"
              : "md:pl-64"
        )}
      />
    </>
  );
}