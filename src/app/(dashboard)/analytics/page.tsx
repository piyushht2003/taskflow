import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardPieChart, DashboardLineChart } from "@/components/dashboard/dashboard-charts";
import { getActiveWorkspaceId } from "@/app/actions/workspace-actions";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const activeWorkspaceId = await getActiveWorkspaceId();
  const taskWorkspaceFilter = session.user.role === "DEVELOPER" ? {} : activeWorkspaceId ? { project: { workspaceId: activeWorkspaceId } } : { project: { workspaceId: "NONE" } };

  const [tasksByPriority, tasksByStatus, tasksByDate] = await Promise.all([
    prisma.task.groupBy({
      by: ['priority'],
      where: taskWorkspaceFilter,
      _count: { priority: true }
    }),
    prisma.task.groupBy({
      by: ['status'],
      where: taskWorkspaceFilter,
      _count: { status: true }
    }),
    prisma.task.findMany({
      where: taskWorkspaceFilter,
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    })
  ]);

  // Priority Pie Chart Data
  const priorityData = [
    { name: "Low", value: 0, color: "#64748b" }, // slate-500
    { name: "Medium", value: 0, color: "#eab308" }, // yellow-500
    { name: "High", value: 0, color: "#f97316" }, // orange-500
    { name: "Urgent", value: 0, color: "#ef4444" }, // red-500
  ];

  tasksByPriority.forEach(t => {
    const idx = priorityData.findIndex(p => p.name.toUpperCase() === t.priority);
    if (idx !== -1) priorityData[idx].value = t._count.priority;
  });

  // Status Pie Chart Data
  const statusData = [
    { name: "Backlog", value: 0, color: "#64748b" }, // slate-500
    { name: "Todo", value: 0, color: "#3b82f6" },    // blue-500
    { name: "In Progress", value: 0, color: "#eab308" }, // yellow-500
    { name: "Review", value: 0, color: "#a855f7" },  // purple-500
    { name: "Completed", value: 0, color: "#22c55e" }, // green-500
  ];

  tasksByStatus.forEach(t => {
    const statusMap: Record<string, string> = {
      BACKLOG: "Backlog",
      TODO: "Todo",
      IN_PROGRESS: "In Progress",
      REVIEW: "Review",
      COMPLETED: "Completed"
    };
    const name = statusMap[t.status];
    const idx = statusData.findIndex(p => p.name === name);
    if (idx !== -1) statusData[idx].value = t._count.status;
  });

  // Line Chart Data (Last 7 Days)
  const lineDataMap = new Map<string, number>();
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    lineDataMap.set(dayName, 0);
  }

  tasksByDate.forEach(t => {
    const d = new Date(t.createdAt);
    // Only count if within last 7 days
    const diffTime = Math.abs(today.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays <= 7) {
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (lineDataMap.has(dayName)) {
        lineDataMap.set(dayName, lineDataMap.get(dayName)! + 1);
      }
    }
  });

  const lineData = Array.from(lineDataMap.entries()).map(([name, tasks]) => ({ name, tasks }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your workspace's productivity metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
            <CardDescription>Breakdown of tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardPieChart data={priorityData} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Task Status Overview</CardTitle>
            <CardDescription>Breakdown of tasks by their current stage</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardPieChart data={statusData} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Task Creation Velocity</CardTitle>
            <CardDescription>Number of tasks created over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardLineChart data={lineData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
