import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GrowthChart } from "../growth-chart";
import { getAdminAnalytics } from "@/actions/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    redirect("/");
  }

  const [growthData, workspacesByStatus, tasksByStatus] = await Promise.all([
    getAdminAnalytics(),
    prisma.workspace.groupBy({ by: ["status"], _count: true }),
    prisma.task.groupBy({ by: ["status"], _count: true })
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
        <p className="text-muted-foreground mt-2">Deep dive into platform usage, growth, and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm bg-card md:col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth (30 Days)</CardTitle>
            <CardDescription>New user registrations and workspace creations.</CardDescription>
          </CardHeader>
          <CardContent>
            <GrowthChart data={growthData} />
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Workspaces by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {workspacesByStatus.map((w) => (
                <div key={w.status} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{w.status}</span>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">{w._count}</span>
                </div>
              ))}
              {workspacesByStatus.length === 0 && (
                <div className="text-sm text-muted-foreground">No data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {tasksByStatus.map((t) => (
                <div key={t.status} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.status}</span>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">{t._count}</span>
                </div>
              ))}
              {tasksByStatus.length === 0 && (
                <div className="text-sm text-muted-foreground">No data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
