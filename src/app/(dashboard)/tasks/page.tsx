import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyTasks } from "@/app/actions/task-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Calendar, FolderKanban, Clock } from "lucide-react";
import Link from "next/link";

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const tasks = await getMyTasks();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      case "IN_PROGRESS": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "REVIEW": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "COMPLETED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-slate-500/10 text-slate-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "MEDIUM": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "LOW": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-slate-500";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground mt-1">View and manage all tasks assigned to you across projects.</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-card/50 text-center">
          <CheckSquare className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No tasks assigned</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            You currently have no tasks assigned to you. When a manager assigns you a task, it will appear here.
          </p>
        </div>
      ) : (
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Assigned Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/50 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task</th>
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {tasks.map((task) => (
                    <tr key={task.id} className="bg-card hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-4">
                        <Link href={`/projects/${task.projectId}/board`} className="font-medium text-foreground hover:underline hover:text-primary transition-colors flex items-center gap-2">
                          {task.title}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FolderKanban className="w-4 h-4" />
                          <span className="truncate max-w-[150px]">{task.project.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {task.dueDate ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground/50 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> No deadline
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
