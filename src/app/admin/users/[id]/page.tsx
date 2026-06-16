import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CheckSquare, Activity, Shield } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminUserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    redirect("/");
  }

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      workspaceMembers: {
        include: { workspace: true }
      },
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { project: true }
      },
      activityLogs: {
        orderBy: { timestamp: "desc" },
        take: 10,
        include: { workspace: true }
      }
    }
  });

  if (!user) redirect("/admin/users");

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground mt-1">Detailed overview of {user.name}'s account.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-border/50 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar className="w-24 h-24 border-2 border-border/50">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {user.platformRole}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium">{format(new Date(user.createdAt), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-medium font-mono text-xs truncate max-w-[120px]">{user.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Workspaces Joined</CardTitle>
                <CardDescription>Workspaces where this user is a member.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {user.workspaceMembers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No workspaces joined.</p>
              ) : (
                <div className="space-y-3">
                  {user.workspaceMembers.map((member) => (
                    <div key={member.workspaceId} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/10">
                      <div>
                        <p className="font-medium">{member.workspace.name}</p>
                        <p className="text-xs text-muted-foreground">Joined {format(new Date(member.joinedAt), "MMM d, yyyy")}</p>
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
              <CheckSquare className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Most recently created or assigned tasks.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {user.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks found.</p>
              ) : (
                <div className="space-y-3">
                  {user.tasks.map((task) => (
                    <div key={task.id} className="flex flex-col gap-1 p-3 rounded-lg border border-border/50 bg-secondary/10">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{task.title}</span>
                        <Badge variant={task.status === "COMPLETED" ? "default" : "outline"}>{task.status}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {task.project?.title || "No Project"} • Due: {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "None"}
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
                <CardDescription>Latest actions performed by this user.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {user.activityLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              ) : (
                <div className="space-y-4">
                  {user.activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary/50" />
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {format(new Date(log.timestamp), "MMM d, yyyy 'at' h:mm a")} 
                          {log.workspace && ` • in ${log.workspace.name}`}
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
