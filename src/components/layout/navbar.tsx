"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu, User, LogOut, Settings, BookOpen, Search, Calendar,
  Users, LayoutDashboard, GraduationCap, Target, ChevronDown,
  CreditCard, Briefcase, Clock, Phone, Mail
} from "lucide-react";
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationDropdown } from "./notification-dropdown";
import tutorService from "@/services/tutor.service";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Fetch tutor application status if user is a student
    if (user && user.role === "STUDENT") {
      tutorService.getApplicationStatus().then(app => {
        if (app) setApplicationStatus(app.status);
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const getNavLinks = (role?: string) => {
    const publicLinks = [
      { href: "/tutors", label: "Tutors", icon: Search },
      { href: "/categories", label: "Explore", icon: LayoutDashboard },
      { href: "/about", label: "Mission", icon: Target },
    ];
    if (!role) return publicLinks;
    switch (role) {
      case "ADMIN": return [
        { href: "/tutors", label: "Tutors", icon: Search },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/categories", label: "Taxonomy", icon: BookOpen },
        { href: "/admin/settings", label: "System", icon: Settings },
      ];
      case "TUTOR": return [
        { href: "/tutor/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/tutor/students", label: "Students", icon: Users },
        { href: "/tutor/availability", label: "Availability", icon: Clock },
        { href: "/tutor/sessions", label: "Sessions", icon: Calendar },
        { href: "/tutor/earnings", label: "Earnings", icon: CreditCard },
      ];
      case "STUDENT": return [
        { href: "/tutors", label: "Tutors", icon: Search },
        { href: "/dashboard", label: "Learning", icon: GraduationCap },
        { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
        { href: "/about", label: "Mission", icon: Target },
      ];
      default: return publicLinks;
    }
  };

  const navLinks = getNavLinks(user?.role);

  if (!hasMounted) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none">

        {/* ── Tier 2: Primary Floating Bar ── */}
        <nav
          className={cn(
            "w-full max-w-[1400px] transition-all duration-500 pointer-events-auto",
            isScrolled ? "mt-2 px-4" : "mt-0 px-0"
          )}
        >
          <div
            className={cn(
              "relative w-full transition-all duration-500",
              isScrolled
                ? "rounded-2xl border backdrop-blur-xl shadow-2xl"
                : "border-b backdrop-blur-md shadow-sm"
            )}
            style={{
              backgroundColor: isScrolled ? "rgba(var(--background), 0.85)" : "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className={cn("flex gap-2 items-center transition-all duration-500", isScrolled ? "h-14" : "h-20")}>
                {/* Logo */}
                <div className="flex-1">
                  <Logo />
                </div>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-1 bg-white/5 dark:bg-black/5 p-1 rounded-xl border border-white/10 dark:border-white/5">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "relative px-5 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-all duration-300 overflow-hidden group",
                          isActive
                            ? "text-white"
                            : "text-[var(--text-muted)] hover:text-[var(--text)]"
                        )}
                      >
                        {isActive && (
                          <div
                            className="absolute inset-0 -z-10 animate-fade-in"
                            style={{ backgroundColor: "var(--accent)" }}
                          />
                        )}
                        {!isActive && (
                          <div className="absolute inset-0 -z-10 bg-white/10 dark:bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        )}
                        {link.icon && <link.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[var(--accent)]")} />}
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Right */}
                <div className="flex-1 flex items-center justify-end gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-white/5 dark:bg-black/5 p-1 rounded-xl border border-white/10 dark:border-white/5">
                    {user?.role === "STUDENT" || !user ? (
                      <Link
                        href={!user ? "/login" : (applicationStatus === "PENDING" ? "#" : "/become-a-tutor")}
                        className={cn(
                          "group relative px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap overflow-hidden flex items-center gap-2",
                          applicationStatus === "PENDING"
                            ? "bg-amber-500/10 text-amber-500 cursor-default"
                            : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/10 dark:hover:bg-white/5"
                        )}
                      >
                        {applicationStatus === "PENDING" ? (
                          <>
                            <Clock className="h-3 w-3 animate-pulse" />
                            <span>Pending</span>
                          </>
                        ) : (
                          <>
                            <PiChalkboardTeacherThin className="h-4 w-4 text-[var(--accent)] group-hover:scale-110 transition-transform" />
                            <span>Become a Tutor</span>
                          </>
                        )}
                      </Link>
                    ) : null}
                    <div className="h-4 w-px bg-white/10 dark:bg-white/5 mx-1" />
                    {user && <NotificationDropdown scrolled={isScrolled} />}
                    <ThemeToggle scrolled={isScrolled} />
                  </div>

                  {user ? (
                    <div className="flex items-center gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center gap-2 p-1 rounded-full transition-all focus-visible:outline-none hover:border-[var(--accent)] group"
                            style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
                          >
                            <div className="relative">
                              <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-[var(--accent)] transition-all">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text)" }} className="font-black text-xs">
                                  {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-green-500" />
                            </div>
                            <div className="hidden md:flex flex-col items-start pr-2">
                              <span className="text-xs font-black leading-tight" style={{ color: "var(--text)" }}>{user.name?.split(" ").pop()}</span>
                              <span className="text-[9px] font-bold uppercase tracking-tighter" style={{ color: "var(--text-faint)" }}>{user.role}</span>
                            </div>
                            <ChevronDown className="h-3.5 w-3.5 mr-1 hidden md:block" style={{ color: "var(--text-faint)" }} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl animate-slide-up" align="end" sideOffset={12}
                          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                          <DropdownMenuLabel className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text)" }} className="font-black">
                                  {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="overflow-hidden">
                                <p className="text-sm font-black truncate" style={{ color: "var(--text)" }}>{user.name?.split(" ").pop()}</p>
                                <p className="text-[11px] truncate text-muted-foreground font-medium italic opacity-70">{user.role}</p>
                                <p className="text-[10px] truncate text-muted-foreground font-medium">{user.email}</p>
                              </div>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator style={{ backgroundColor: "var(--border)" }} />
                          {[
                            { 
                              href: user.role === "ADMIN" ? "/admin/profile" : (user.role === "TUTOR" ? "/tutor/profile" : "/dashboard/profile"), 
                              icon: User, 
                              label: "Profile" 
                            },
                            { 
                              href: user.role === "ADMIN" ? "/admin" : (user.role === "TUTOR" ? "/tutor/dashboard" : "/dashboard"), 
                              icon: LayoutDashboard, 
                              label: "Dashboard" 
                            },                            
                            { href: "/tutors", icon: Briefcase, label: "Explore Tutors" },
                          ].map((item) => (
                            <DropdownMenuItem key={item.href} asChild className="p-0">
                              <Link href={item.href} className="flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all hover:bg-[var(--bg-subtle)] hover:translate-x-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <div className="p-1.5 rounded-lg mr-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                                  <item.icon className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                                </div>
                                <span className="text-sm font-bold">{item.label}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator style={{ backgroundColor: "var(--border)" }} />
                          <DropdownMenuItem onClick={logout}
                            className="flex items-center px-3 py-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all hover:translate-x-1">
                            <div className="p-1.5 rounded-lg mr-3 bg-red-500/10 border border-red-500/20">
                              <LogOut className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm font-black">Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link href="/login">
                        <Button variant="ghost" className="font-bold rounded-xl h-10 px-5 text-sm hover:bg-[var(--bg-subtle)]"
                          style={{ color: "var(--text-muted)" }}>Login</Button>
                      </Link>
                      <Link href="/register">
                        <Button className="font-black rounded-xl h-10 px-6 text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                          style={{ backgroundColor: "var(--accent)", color: "var(--bg)", border: "none" }}>
                          Join Now
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* Mobile trigger */}
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-10 w-10 transition-all active:scale-95"
                        style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
                        <Menu className="h-5 w-5" style={{ color: "var(--text)" }} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0 overflow-hidden"
                      style={{ backgroundColor: "var(--bg-card)", borderLeft: "1px solid var(--border)" }}>
                      <div className="flex flex-col h-full">
                        <div className="p-8 border-b" style={{ borderColor: "var(--border)" }}>
                          <Logo />
                        </div>
                        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>Alerts & Theme</span>
                          <div className="flex items-center gap-3">
                            {user && <NotificationDropdown />}
                            <ThemeToggle />
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-2">
                          <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-faint)" }}>Navigation</span>
                          {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                              <Link key={link.href} href={link.href}
                                className={cn("flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all")}
                                style={isActive
                                  ? { backgroundColor: "var(--accent)", color: "var(--bg)" }
                                  : { color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)" }}
                                onClick={() => setIsOpen(false)}
                              >
                                {link.icon && <link.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-[var(--accent)]")} />}
                                {link.label}
                              </Link>
                            );
                          })}

                          {!user && (
                            <div className="pt-8 space-y-3">
                              <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-faint)" }}>Account</span>
                              <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-2"
                                  style={{ borderColor: "var(--border)", color: "var(--text)" }}>Sign In</Button>
                              </Link>
                              <Link href="/tutors?free=true" onClick={() => setIsOpen(false)}>
                                <Button className="w-full h-14 rounded-2xl font-black shadow-xl"
                                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>Get Started Free</Button>
                              </Link>
                            </div>
                          )}
                        </div>
                        {user && (
                          <div className="p-6 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
                            <div className="flex items-center gap-4 p-4 rounded-2xl shadow-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                              <Avatar className="h-12 w-12 border-2 border-[var(--accent)]">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback style={{ backgroundColor: "var(--bg-subtle)" }} className="font-black">
                                  {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-black truncate" style={{ color: "var(--text)" }}>{user.name?.split(" ").pop()}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent)" }}>{user.role}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-10 w-10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                                onClick={() => { logout(); setIsOpen(false); }}>
                                <LogOut className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* ── Global Spacer (Prevents content overlap on non-home pages) ── */}
      {pathname !== "/" && <div className="h-24 lg:h-[80px] w-full" />}
    </>
  );
}
