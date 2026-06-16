"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Folders, LogOut, ArrowLeft, Settings, CheckSquare, Mail, Activity, BarChart3, ActivitySquare } from "lucide-react";
import { signOut } from "next-auth/react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Workspaces", href: "/admin/workspaces", icon: Folders },
    { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
    { name: "Invitations", href: "/admin/invitations", icon: Mail },
    { name: "Activity Logs", href: "/admin/activity", icon: Activity },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "System Health", href: "/admin/health", icon: ActivitySquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-background border-r border-border h-full flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            TF
          </div>
          <span>TaskFlow Admin</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-border flex flex-col gap-2">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm">Sign out</span>
        </button>
      </div>
    </div>
  );
}
