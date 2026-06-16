import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, CheckSquare, Clock, Users, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardLineChart, DashboardPieChart } from "@/components/dashboard/dashboard-charts";
import { formatDistanceToNow } from "date-fns";
import { getActiveWorkspaceId } from "@/app/actions/workspace-actions";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const activeWorkspaceId = await getActiveWorkspaceId();
  if (!activeWorkspaceId) redirect("/onboarding");

  const workspaceFilter = { workspaceId: activeWorkspaceId };
  const taskWorkspaceFilter = { project: { workspaceId: activeWorkspaceId } };

  const member = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: user.id, workspaceId: activeWorkspaceId } }
  });
  const isOverseer = member && (member.role === "ADMIN" || member.role === "MANAGER");

  const projectWhere = { ...workspaceFilter };

  const taskWhere = isOverseer
    ? { ...taskWorkspaceFilter }
    : { assigneeId: user.id, ...taskWorkspaceFilter };

  // Fetch real data
  const [activeProjects, completedTasks, pendingTasks, teamMembers] = await Promise.all([
    prisma.project.count({ where: projectWhere }),
    prisma.task.count({ where: { status: "COMPLETED", ...taskWhere } }),
    prisma.task.count({ where: { status: { not: "COMPLETED" }, ...taskWhere } }),
    prisma.workspaceMember.count({ where: { workspaceId: activeWorkspaceId } }), 
  ]);

  // Tasks by status for the pie chart
  const tasksByStatus = await prisma.task.groupBy({
    by: ['status'],
    where: taskWhere,
    _count: {
      status: true,
    },
  });

  // Default pie data
  const pieData = [
    { name: "Backlog", value: 0, color: "#64748b" }, // slate-500
    { name: "Todo", value: 0, color: "#3b82f6" },    // blue-500
    { name: "In Progress", value: 0, color: "#eab308" }, // yellow-500
    { name: "Review", value: 0, color: "#a855f7" },  // purple-500
    { name: "Completed", value: 0, color: "#22c55e" }, // green-500
  ];

  tasksByStatus.forEach(t => {
    const statusMap: Record<string, { name: string, color: string }> = {
      BACKLOG: { name: "Backlog", color: "var(--chart-1)" },
      TODO: { name: "Todo", color: "var(--chart-2)" },
      IN_PROGRESS: { name: "In Progress", color: "var(--chart-3)" },
      REVIEW: { name: "Review", color: "var(--chart-4)" },
      COMPLETED: { name: "Completed", color: "var(--chart-5)" },
    };
    const mapped = statusMap[t.status];
    if (mapped) {
      const idx = pieData.findIndex(p => p.name === mapped.name);
      if (idx !== -1) {
        pieData[idx].value = t._count.status;
      }
    }
  });

  // Upcoming deadlines
  const upcomingDeadlines = await prisma.task.findMany({
    where: { dueDate: { not: null }, status: { not: "COMPLETED" }, ...taskWhere },
    orderBy: { dueDate: "asc" },
    take: 4,
    include: { project: true }
  });

  // Recent activity logs
  const recentActivityLogs = await prisma.activityLog.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: "desc" },
    take: 4,
    include: { user: true }
  });

  // Calculate dynamic Line Chart data (past 7 days task creations)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentTasks = await prisma.task.findMany({
    where: {
      ...taskWhere,
      createdAt: { gte: sevenDaysAgo }
    },
    select: { createdAt: true }
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const lineData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { name: daysOfWeek[d.getDay()], tasks: 0 };
  });

  recentTasks.forEach(task => {
    const dayName = daysOfWeek[task.createdAt.getDay()];
    const dayData = lineData.find(d => d.name === dayName);
    if (dayData) {
      dayData.tasks += 1;
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/projects" className="block">
          <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <FolderKanban className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                Across your workspace
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tasks" className="block">
          <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
              <CheckSquare className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {isOverseer ? "Across your workspace" : "Assigned to you"}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tasks" className="block">
          <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
              <Clock className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {isOverseer ? "Needs team's attention" : "Needs your attention"}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/team" className="block">
          <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                In your workspace
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardLineChart data={lineData} />
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardPieChart data={pieData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <MoreVertical className="w-5 h-5 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent className="space-y-6">
            {recentActivityLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            ) : (
              recentActivityLogs.map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Avatar className="w-8 h-8 border border-border/50">
                    <AvatarImage src={activity.user.image || `https://i.pravatar.cc/150?u=${activity.userId}`} />
                    <AvatarFallback>{activity.user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name || "User"}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <span className="text-sm text-primary cursor-pointer hover:underline">See all</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>
            ) : (
              upcomingDeadlines.map((deadline, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{deadline.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {deadline.project?.title || "No Project"} • {formatDistanceToNow(new Date(deadline.dueDate!), { addSuffix: true })}
                    </span>
                  </div>
                  <Badge variant={deadline.priority === "HIGH" ? "destructive" : deadline.priority === "MEDIUM" ? "default" : "secondary"}>
                    {deadline.priority}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
