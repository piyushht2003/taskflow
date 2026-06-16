import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Folders, CheckSquare, Activity, Mail, Clock, CheckCircle2 } from "lucide-react";
import { getAdminAnalytics } from "@/actions/admin";
import { GrowthChart } from "./growth-chart";

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalWorkspaces,
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    invitationsSent,
    invitationsAccepted,
    analyticsData
  ] = await Promise.all([
    prisma.user.count(),
    prisma.workspace.count(),
    prisma.task.count(),
    prisma.task.count({ where: { status: "COMPLETED" } }),
    prisma.task.count({ where: { status: { not: "COMPLETED" } } }),
    prisma.task.count({ where: { dueDate: { lt: new Date() }, status: { not: "COMPLETED" } } }),
    prisma.invitation.count(),
    prisma.invitation.count({ where: { status: "ACCEPTED" } }),
    getAdminAnalytics(),
  ]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-2">At-a-glance metrics for the TaskFlow SaaS platform.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Workspaces</CardTitle>
            <Folders className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkspaces}</div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Activity className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <Clock className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueTasks}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Invitations Sent</CardTitle>
            <Mail className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitationsSent}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Invites Accepted</CardTitle>
            <Users className="w-4 h-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitationsAccepted}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm bg-card">
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
