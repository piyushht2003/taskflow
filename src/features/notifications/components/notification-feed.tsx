"use client";

import { useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCircle2, Circle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAsRead, markAllAsRead } from "@/app/actions/notification-actions";
import { Notification } from "@prisma/client";

export function NotificationFeed({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [isPending, startTransition] = useTransition();

  const unreadCount = initialNotifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    startTransition(() => {
      markAsRead(id);
    });
  };

  const handleMarkAllAsRead = () => {
    startTransition(() => {
      markAllAsRead();
    });
  };

  if (initialNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-card/50 text-center">
        <Bell className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-foreground">You're all caught up!</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          You don't have any notifications right now.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={isPending} className="gap-2">
            <Check className="w-4 h-4" />
            Mark all as read
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {initialNotifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${
              notif.isRead ? "bg-card/50 border-border/50 opacity-70" : "bg-card border-primary/30 shadow-sm"
            }`}
          >
            <div className="flex gap-4">
              <div className="mt-0.5">
                {notif.isRead ? (
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Circle className="w-5 h-5 text-primary fill-primary/20" />
                )}
              </div>
              <div>
                <p className={`text-sm ${notif.isRead ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            {!notif.isRead && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleMarkAsRead(notif.id)} 
                disabled={isPending}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Mark Read
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
