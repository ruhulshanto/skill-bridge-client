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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  User,
  LogOut,
  Settings,
  BookOpen,
  Search,
  Calendar,
  Users,
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  ChevronDown,
  CreditCard,
  Briefcase,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLinks = (role?: string) => {
    const publicLinks = [
      { href: "/", label: "Home", icon: null },
      { href: "/tutors", label: "Tutors", icon: Search },
      { href: "/categories", label: "Explore", icon: LayoutDashboard },
      { href: "/about", label: "Mission", icon: Sparkles },
    ];

    if (!role) return publicLinks;

    switch (role) {
      case 'ADMIN':
        return [
          { href: "/tutors", label: "Tutors", icon: Search },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/categories", label: "Taxonomy", icon: BookOpen },
          { href: "/admin/settings", label: "System", icon: Settings },
        ];
      case 'TUTOR':
        return [
          { href: "/tutor/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/tutor/students", label: "Students", icon: Users },
          { href: "/tutor/availability", label: "Availability", icon: Clock },
          { href: "/tutor/sessions", label: "Sessions", icon: Calendar },
          { href: "/tutor/earnings", label: "Earnings", icon: CreditCard },
        ];
      case 'STUDENT':
        return [
          { href: "/tutors", label: "Tutors", icon: Search },
          { href: "/dashboard", label: "Learning", icon: GraduationCap },
          { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
          { href: "/dashboard/profile", label: "Profile", icon: User },
          { href: "/about", label: "Mission", icon: Sparkles },
        ];
      default:
        return publicLinks;
    }
  };

  const navLinks = getNavLinks(user?.role);

  if (!hasMounted || isLoading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            <div className="h-8 w-48 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 border-b",
      isScrolled
        ? "bg-white/80 backdrop-blur-2xl border-slate-200 py-3 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]"
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-12 items-center">
          {/* Logo Section - Left Side */}
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>

          {/* Desktop Navigation - Perfect Middle */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl flex items-center gap-2 group",
                  pathname === link.href
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.icon && <link.icon className={cn(
                  "h-4 w-4 transition-transform group-hover:scale-110",
                  pathname === link.href ? "text-blue-600" : "text-slate-400"
                )} />}
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[21px] left-0 w-full h-[3px] bg-blue-600 rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.4)]" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section - Right Side */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Role Badge - Desktop only */}
                <div className="hidden xl:flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.15em] border border-slate-800 shadow-sm">
                  {user.role}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 p-1 rounded-full border border-slate-200 hover:border-blue-300 transition-all bg-white shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <Avatar className="h-9 w-9 border-2 border-white">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:flex flex-col items-start pr-3">
                        <span className="text-xs font-black text-slate-900 leading-tight">{user.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">My Account</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-400 mr-2 md:block hidden" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl border-slate-200" align="end" sideOffset={10}>
                    <DropdownMenuLabel className="px-4 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-black text-slate-900">{user.name}</p>
                        <p className="text-xs font-medium text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                        className="flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        <span className="font-bold text-sm">Main Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href={user.role === 'ADMIN' ? '/admin/profile' : '/dashboard/profile'}
                        className="flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <User className="mr-3 h-4 w-4" />
                        <span className="font-bold text-sm">Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/tutors"
                        className="flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Briefcase className="mr-3 h-4 w-4" />
                        <span className="font-bold text-sm">Explore Experts</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center px-4 py-3 cursor-pointer rounded-xl text-red-600 hover:text-white hover:bg-rose-600 transition-all"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-black text-sm uppercase tracking-wider">Secure Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-xl h-11 px-6">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl h-11 px-8 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
                    Start Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-xl border border-slate-200">
                  <Menu className="h-6 w-6 text-slate-600" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l border-slate-100 p-0 overflow-hidden">
                <div className="flex flex-col h-full bg-white">
                  {/* Mobile Header */}
                  <div className="p-8 border-b border-slate-50 space-y-2">
                    <Logo />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest pt-2">Global Learning Ecosystem</p>
                  </div>

                  {/* Mobile Links */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold",
                            pathname === link.href
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                              : "text-slate-600 hover:bg-slate-50"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.icon && <link.icon className="h-5 w-5" />}
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {!user && (
                      <div className="mt-8 space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Authentication</p>
                        <Link href="/login" onClick={() => setIsOpen(false)} className="block">
                          <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black border-slate-100">
                            Member Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)} className="block">
                          <Button className="w-full h-14 rounded-2xl font-black bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20">
                            Create Free Account
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Mobile Footer */}
                  {user && (
                    <div className="p-6 bg-slate-50 border-t border-slate-100">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <Avatar className="h-12 w-12 border-2 border-slate-50">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-blue-600 text-white font-black">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-black text-slate-900 truncate">{user.name}</p>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{user.role}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
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
    </nav>
  );
}
