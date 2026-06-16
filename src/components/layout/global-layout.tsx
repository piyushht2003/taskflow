import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getActiveWorkspaceId, getMyWorkspaces } from "@/app/actions/workspace-actions";
import { AdminSidebar } from "./admin-sidebar";
import { WorkspaceRealtimeSync } from "@/components/providers/workspace-realtime-sync";

export async function GlobalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!dbUser) {
    redirect("/api/auth/force-logout?redirectTo=/register");
  }

  if (dbUser.status === "SUSPENDED") {
    // If suspended, force them out and clear cookies
    redirect("/api/auth/force-logout?redirectTo=/login"); 
  }

  if (session.user.platformRole === "SUPER_ADMIN") {
    redirect("/admin");
  }

  const activeWorkspaceId = await getActiveWorkspaceId();

  const memberships = await prisma.workspaceMember.count({
    where: { userId: session.user.id }
  });

  if (memberships === 0) {
    redirect("/onboarding");
  }

  if (activeWorkspaceId) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: activeWorkspaceId }
    });
    if (workspace?.status === "SUSPENDED") {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background flex-col gap-4">
          <h1 className="text-2xl font-bold">Workspace Suspended</h1>
          <p className="text-muted-foreground">This workspace has been suspended by the administrator.</p>
        </div>
      );
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header />
        <WorkspaceRealtimeSync workspaceId={activeWorkspaceId ?? ""} />
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
