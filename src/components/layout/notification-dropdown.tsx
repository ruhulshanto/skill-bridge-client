"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Check, Trash2, Clock, Rocket, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import notificationService, { Notification } from "@/services/notification.service";
import { cn } from "@/lib/utils";

interface NotificationDropdownProps {
  scrolled?: boolean;
}

export function NotificationDropdown({ scrolled }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    const data = await notificationService.getNotifications();
    setNotifications(data);
    setUnreadCount(data.filter((n) => !n.isRead).length);
  };

  useEffect(() => {
    fetchNotifications();
    // Simple polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    await notificationService.deleteNotification(id);
    setNotifications(notifications.filter(n => n.id !== id));
    const wasUnread = !notifications.find(n => n.id === id)?.isRead;
    if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "APPLICATION": return <Rocket className="h-4 w-4 text-blue-500" />;
      case "REVIEW": return <Star className="h-4 w-4 text-amber-500" />;
      default: return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative rounded-lg h-10 w-10 transition-all duration-300 group overflow-hidden",
            scrolled 
              ? "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/10" 
              : "hover:bg-[var(--bg-subtle)] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)]"
          )}
        >
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
          <Bell className="h-5 w-5 transition-transform group-hover:rotate-12" />
          {unreadCount > 0 && (
            <span className={cn(
              "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-black text-white ring-2",
              scrolled ? "bg-primary ring-primary/20" : "bg-red-500 ring-[var(--bg-card)]"
            )}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0 rounded-2xl shadow-2xl animate-slide-up overflow-hidden" align="end" sideOffset={12} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm font-black" style={{ color: "var(--text)" }}>Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--bg-subtle)]"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="h-12 w-12 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-[var(--text-faint)]" />
              </div>
              <p className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>No notifications yet</p>
              <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "var(--text-faint)" }}>We'll notify you here</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "relative group flex items-start gap-3 p-4 transition-colors hover:bg-[var(--bg-subtle)] border-b last:border-0",
                  !notification.isRead && "bg-[var(--accent)]/5"
                )}
                style={{ borderColor: "var(--border)" }}
              >
                <div className={cn(
                  "mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  notification.isRead ? "bg-[var(--bg-subtle)]" : "bg-[var(--accent)]/10"
                )}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={cn(
                      "text-xs truncate transition-colors",
                      notification.isRead ? "font-bold text-[var(--text-muted)]" : "font-black text-[var(--text)]"
                    )}>
                      {notification.title}
                    </p>
                    <span className="text-[9px] font-medium whitespace-nowrap text-[var(--text-faint)]">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {notification.link && !notification.isRead && (
                    <Link 
                      href={notification.link}
                      className="inline-block mt-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] hover:underline"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      View Details
                    </Link>
                  )}
                </div>

                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-green-500/10 hover:text-green-500"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-red-500/10 hover:text-red-500"
                    onClick={(e) => handleDelete(e, notification.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {!notification.isRead && (
                  <div className="absolute right-3 top-4 h-2 w-2 rounded-full bg-[var(--accent)]" />
                )}
              </div>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t text-center" style={{ borderColor: "var(--border)" }}>
             <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-faint)]">
               Last updated: {new Date().toLocaleTimeString()}
             </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
