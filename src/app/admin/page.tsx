import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Folders, CheckSquare, Activity } from "lucide-react";
import { getAdminAnalytics } from "@/actions/admin";
import { GrowthChart } from "./growth-chart";

export default async function AdminDashboardPage() {
  const [totalUsers, totalWorkspaces, totalTasks, analyticsData] = await Promise.all([
    prisma.user.count(),
    prisma.workspace.count(),
    prisma.task.count(),
    getAdminAnalytics(),
  ]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
        <p className="text-muted-foreground mt-2">Overview of TaskFlow's SaaS performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Workspaces</CardTitle>
            <Folders className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkspaces}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            30-Day Growth
          </CardTitle>
          <CardDescription>New user registrations and workspace creations over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <GrowthChart data={analyticsData} />
        </CardContent>
      </Card>
    </div>
  );
}
