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
  User,
  Bell,
  UserCheck,
  Sparkles
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

export function AdminSidebar({ className, children }: AdminSidebarProps & { children?: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState<{ totalUsers: number } | null>(null);

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
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      badge: stats?.totalUsers?.toString() || "0",
    },
    {
      label: "Applications",
      icon: UserCheck,
      href: "/admin/applications",
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
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
    {
      label: "Profile",
      icon: User,
      href: "/admin/profile",
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
      {/* ── Mobile Header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-[#e5f2ff] border-b border-[#a3c7e6] shadow-sm overflow-hidden h-16">
        <div className="relative z-10 flex items-center justify-between px-6 h-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-10 w-10 rounded-xl bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] hover:bg-white transition-all shadow-sm"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
            <Logo subtitle="Admin" />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] shadow-sm hidden sm:flex">
              <Bell size={20} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md relative z-10">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="bg-white text-primary font-black">
                      {user?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-[2rem] border-[#a3c7e6] bg-[#e5f2ff] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 mb-2">
                  <p className="text-xs font-black text-[#2d6a9f] uppercase tracking-widest mb-1 opacity-60">Session Controller</p>
                  <p className="text-sm font-black text-[#0A2540] truncate">{user?.name || "Administrator"}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-bold text-[#2d6a9f] hover:bg-white hover:text-primary transition-all">
                    <User size={18} />
                    Profile Dossier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-bold text-[#2d6a9f] hover:bg-white hover:text-primary transition-all">
                    <Settings size={18} />
                    System Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#a3c7e6]/30 mx-2" />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-black hover:bg-red-50 transition-all cursor-pointer">
                  <LogOut size={18} />
                  Terminate Access
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: "#e5f2ff" }}
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-[90] border-r border-[#a3c7e6] transition-all duration-500 ease-in-out shadow-2xl overflow-hidden",
          isCollapsed ? "w-24" : "w-80",
          className
        )}
      >
        {/* Logo Section */}
        <div className={cn("px-8 py-10 relative z-10", isCollapsed ? "px-0 flex flex-col items-center" : "")}>
          <div
            className={cn(
              "flex items-center transition-all duration-300 w-full",
              isCollapsed ? "flex-col gap-6 justify-center" : "justify-between gap-4"
            )}
          >
            <Logo subtitle="Admin Panel" collapsed={isCollapsed} />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "h-10 w-10 rounded-2xl border border-[#a3c7e6]/50 bg-white/50 text-[#2d6a9f] hover:bg-white transition-all shadow-sm",
                isCollapsed ? "mx-auto" : ""
              )}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-5 py-4 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
          <div className={cn("px-4 mb-8", isCollapsed ? "text-center" : "")}>
            {!isCollapsed && (
              <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-[0.25em] opacity-50">
                Main Directives
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
                  "flex items-center transition-all duration-500 group relative mb-3",
                  isActive
                    ? "bg-white text-primary shadow-xl shadow-primary/5 border border-[#a3c7e6]/40"
                    : "text-[#2d6a9f] hover:bg-white/50 hover:text-primary",
                  isCollapsed ? "justify-center rounded-2xl h-14 w-14 mx-auto p-0" : "px-5 py-4 rounded-[1.5rem]"
                )}
              >
                <div className="relative z-10">
                  <route.icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-500 group-hover:scale-125",
                      isActive ? "text-primary stroke-[2.5]" : "text-[#2d6a9f]",
                    )}
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="ml-4 font-black text-[11px] uppercase tracking-[0.15em]">{route.label}</span>
                    {route.badge && (
                      <span className="ml-auto px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[9px] font-black border border-primary/20 shadow-inner">
                        {route.badge}
                      </span>
                    )}
                  </>
                )}
                {isActive && !isCollapsed && (
                  <div className="absolute right-4 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(134,198,255,0.8)]" />
                )}
              </Link>
            );
          })}

          {!isCollapsed && (
            <>
              <div className="px-4 mb-8 mt-12">
                <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-[0.25em] opacity-50">
                  Infrastructure
                </p>
              </div>

              {secondaryRoutes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center transition-all duration-500 group mb-3",
                      isActive
                        ? "bg-white text-primary shadow-xl border border-[#a3c7e6]/40"
                        : "text-[#2d6a9f] hover:bg-white hover:text-primary",
                      isCollapsed ? "justify-center rounded-2xl h-14 w-14 mx-auto p-0" : "px-5 py-4 rounded-[1.5rem]"
                    )}
                  >
                    <route.icon className={cn("h-5 w-5 transition-transform duration-500 group-hover:scale-125", isActive ? "text-primary stroke-[2.5]" : "text-[#2d6a9f]")} />
                    <span className="ml-4 font-black text-[11px] uppercase tracking-[0.15em]">{route.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </div>

        {/* Logout Section */}
        <div className={cn("p-8 border-t border-[#a3c7e6]/30 bg-white/20 relative z-10", isCollapsed ? "px-0 py-6" : "")}>
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "rounded-xl font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100",
              isCollapsed ? "h-14 w-14 mx-auto p-0" : "w-full h-12"
            )}
            title="Logout Session"
          >
            {isCollapsed ? <LogOut size={22} /> : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout Session
              </>
            )}
          </Button>
        </div>
      </div >

      {/* Mobile Sidebar Overlay */}
      {
        isMobileOpen && (
          <div
            className="md:hidden fixed inset-0 z-[110] bg-[#0A2540]/30 backdrop-blur-md transition-all duration-500"
            onClick={closeMobileSidebar}
          />
        )
      }

      <div
        style={{ backgroundColor: "#e5f2ff" }}
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-[120] w-[85%] max-w-sm border-r border-[#a3c7e6] transform transition-transform duration-500 ease-out shadow-2xl",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative z-10">
          <div className="p-8 border-b border-[#a3c7e6]/30 flex items-center justify-between">
            <Logo subtitle="Admin" />
            <Button variant="ghost" size="icon" onClick={closeMobileSidebar} className="h-10 w-10 rounded-xl bg-white border border-[#a3c7e6] text-[#2d6a9f]">
              <X size={24} />
            </Button>
          </div>

          <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={closeMobileSidebar}
                  className={cn(
                    "flex items-center px-6 py-5 rounded-[1.5rem] transition-all duration-300 mb-3",
                    isActive
                      ? "bg-white text-primary shadow-lg border border-[#a3c7e6]/40"
                      : "text-[#2d6a9f] hover:bg-white/40"
                  )}
                >
                  <route.icon className={cn("h-6 w-6", isActive ? "text-primary stroke-[2.5]" : "text-[#2d6a9f]")} />
                  <span className="ml-5 font-black text-xs uppercase tracking-[0.2em]">{route.label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-8 border-t border-[#a3c7e6]/30 bg-white/40 backdrop-blur-sm">
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full h-14 rounded-2xl bg-red-50 text-red-500 border border-red-100 shadow-sm font-black text-xs uppercase tracking-widest"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Terminate Session
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500 flex-1 flex flex-col",
          isMobile
            ? "pt-0"
            : isCollapsed
              ? "md:pl-24"
              : "md:pl-80"
        )}
      >
        {children}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163, 199, 230, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(134, 198, 255, 0.8);
        }
      `}</style>
    </>
  );
}