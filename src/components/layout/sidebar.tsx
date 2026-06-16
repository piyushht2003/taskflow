import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart2,
  Calendar,
  Bell,
  Settings,
  Plus,
  ShieldAlert
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

import { WorkspaceSwitcher } from "./workspace-switcher";
import { getMyWorkspaces, getActiveWorkspaceId } from "@/app/actions/workspace-actions";
import { prisma } from "@/lib/prisma";
import { SidebarNav } from "./sidebar-nav";

export async function Sidebar() {
  const session = await auth();
  const platformRole = session?.user?.platformRole || "USER";

  let workspaces: any[] = [];
  let activeWorkspaceId: string | null = null;
  let unreadCount = 0;

  if (session?.user?.id) {
    unreadCount = await prisma.notification.count({
      where: { userId: session.user.id, isRead: false }
    });

    [workspaces, activeWorkspaceId] = await Promise.all([
      getMyWorkspaces(),
      getActiveWorkspaceId()
    ]);
  }

  return (
    <div className="w-64 h-full bg-sidebar border-r border-border flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">TaskFlow</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        <SidebarNav platformRole={platformRole} unreadCount={unreadCount} />

        <div>
          <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Workspaces
          </h4>
          <WorkspaceSwitcher 
            workspaces={workspaces} 
            activeWorkspaceId={activeWorkspaceId} 
          />
        </div>
      </div>
    </div>
  );
}
