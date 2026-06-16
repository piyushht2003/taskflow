"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart2,
  Calendar,
  Bell,
  Settings,
  ShieldAlert,
} from "lucide-react";

interface SidebarNavProps {
  platformRole: string;
  unreadCount: number;
}

export function SidebarNav({ platformRole, unreadCount }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Team", href: "/team", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Notifications", href: "/notifications", icon: Bell, badge: unreadCount },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  if (platformRole === "SUPER_ADMIN") {
    navItems.push({ name: "Admin UI", href: "/admin", icon: ShieldAlert });
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
