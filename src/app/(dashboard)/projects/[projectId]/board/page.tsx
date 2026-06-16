import { getProjectById } from "@/app/actions/project-actions";
import { getTasksByProjectId } from "@/app/actions/task-actions";
import { getMyWorkspaces } from "@/app/actions/workspace-actions";
import { auth } from "@/auth";
import { KanbanBoard } from "@/features/kanban/components/kanban-board";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

import { CreateTaskButton } from "@/features/kanban/components/create-task-button";
import { ProjectSettingsButton } from "@/features/projects/components/project-settings-button";

export default async function ProjectBoardPage({ params }: PageProps) {
  const { projectId } = await params;
  
  const session = await auth();
  if (!session?.user?.id) notFound();

  const project = await getProjectById(projectId);
  
  if (!project) {
    notFound();
  }

  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId: project.workspaceId
      }
    }
  });

  const userRole = member?.role || "DEVELOPER";

  const [tasks, workspaces] = await Promise.all([
    getTasksByProjectId(projectId),
    (userRole === "ADMIN" || userRole === "MANAGER") ? getMyWorkspaces() : Promise.resolve([])
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between pb-6 shrink-0 border-b border-border mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <span className="text-orange-500 font-bold text-xl">{project.title.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              {/* Project Owner Avatar Removed for Workspace Isolation */}
              <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                <Users className="w-3.5 h-3.5" /> Team Board
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ProjectSettingsButton project={project} userRole={userRole} workspaces={workspaces} />
          <CreateTaskButton projectId={projectId} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard initialTasks={tasks} projectId={projectId} userRole={userRole} currentUserId={session?.user?.id || ""} />
      </div>
    </div>
  );
}
