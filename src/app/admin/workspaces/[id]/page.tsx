import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CheckSquare, Activity, FolderKanban } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminWorkspaceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    redirect("/");
  }

  const { id } = await params;
  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: {
        include: { user: true }
      },
      projects: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { _count: { select: { tasks: true } } }
      },
      activityLogs: {
        orderBy: { timestamp: "desc" },
        take: 10,
        include: { user: true }
      },
      _count: {
        select: { tasks: true }
      }
    }
  });

  if (!workspace) redirect("/admin/workspaces");

  const completedTasks = await prisma.task.count({
    where: { workspaceId: workspace.id, status: "COMPLETED" }
  });

  const completionRate = workspace._count.tasks > 0 
    ? Math.round((completedTasks / workspace._count.tasks) * 100) 
    : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/workspaces" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace Details</h1>
          <p className="text-muted-foreground mt-1">Detailed overview of {workspace.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-border/50 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>General Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold">{workspace.name}</h2>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant={workspace.status === "ACTIVE" ? "default" : "destructive"}>
                    {workspace.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{format(new Date(workspace.createdAt), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Workspace ID</span>
                <span className="font-medium font-mono text-xs truncate max-w-[120px]">{workspace.id}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <h3 className="text-sm font-medium mb-3">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-center">
                  <div className="text-2xl font-bold">{workspace.members.length}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-center">
                  <div className="text-2xl font-bold">{workspace.projects.length}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-center">
                  <div className="text-2xl font-bold">{workspace._count.tasks}</div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg border border-border/50 text-center">
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Members</CardTitle>
                <CardDescription>Users associated with this workspace.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {workspace.members.length === 0 ? (
                <p className="text-sm text-muted-foreground">No members.</p>
              ) : (
                <div className="space-y-3">
                  {workspace.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/10">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.user.image || ""} />
                          <AvatarFallback>{member.user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.user.name}</p>
                          <p className="text-xs text-muted-foreground">{member.user.email}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center gap-2">
              <FolderKanban className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Most recently created projects in this workspace.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {workspace.projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">No projects found.</p>
              ) : (
                <div className="space-y-3">
                  {workspace.projects.map((project) => (
                    <div key={project.id} className="flex flex-col gap-1 p-3 rounded-lg border border-border/50 bg-secondary/10">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{project.title}</span>
                        <Badge variant="outline">{project._count.tasks} Tasks</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {project.description || "No description"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions performed in this workspace.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {workspace.activityLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              ) : (
                <div className="space-y-4">
                  {workspace.activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary/50" />
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {format(new Date(log.timestamp), "MMM d, yyyy 'at' h:mm a")} 
                          {log.user && ` • by ${log.user.name || log.user.email}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
