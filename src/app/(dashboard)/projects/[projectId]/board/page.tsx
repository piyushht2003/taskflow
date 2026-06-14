import { getProjectById } from "@/app/actions/project-actions";
import { getTasksByProjectId } from "@/app/actions/task-actions";
import { auth } from "@/auth";
import { KanbanBoard } from "@/features/kanban/components/kanban-board";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

import { CreateTaskButton } from "@/features/kanban/components/create-task-button";

export default async function ProjectBoardPage({ params }: PageProps) {
  const { projectId } = await params;
  
  const session = await auth();
  const userRole = session?.user?.role || "DEVELOPER";

  const [project, tasks] = await Promise.all([
    getProjectById(projectId),
    getTasksByProjectId(projectId)
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
              <div className="flex -space-x-2">
                <Avatar className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={project.owner.image || ""} />
                  <AvatarFallback>{project.owner.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                <Users className="w-3.5 h-3.5" /> Team Board
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <CreateTaskButton projectId={projectId} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard initialTasks={tasks} projectId={projectId} userRole={userRole} currentUserId={session?.user?.id || ""} />
      </div>
    </div>
  );
}
