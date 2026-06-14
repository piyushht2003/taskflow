import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CalendarView } from "@/features/calendar/components/calendar-view";
import { getActiveWorkspaceId } from "@/app/actions/workspace-actions";

export default async function CalendarPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const activeWorkspaceId = await getActiveWorkspaceId();
  const taskWorkspaceFilter = session.user.role === "DEVELOPER" ? {} : activeWorkspaceId ? { project: { workspaceId: activeWorkspaceId } } : { project: { workspaceId: "NONE" } };

  // Fetch all tasks with due dates
  const tasks = await prisma.task.findMany({
    where: {
      dueDate: { not: null },
      ...taskWorkspaceFilter
    },
    select: {
      id: true,
      title: true,
      dueDate: true,
      status: true,
      priority: true
    }
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">Track deadlines and upcoming milestones across your projects.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden pb-4">
        <CalendarView tasks={tasks} />
      </div>
    </div>
  );
}
