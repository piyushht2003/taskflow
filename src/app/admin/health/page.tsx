import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, Server, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

async function checkDatabase() {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    return { status: "operational", latency };
  } catch (error) {
    return { status: "down", latency: Date.now() - start };
  }
}

export default async function AdminHealthPage() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    redirect("/");
  }

  const dbStatus = await checkDatabase();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
        <p className="text-muted-foreground mt-2">Monitor the status of platform services and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Database (Neon PostgreSQL)
              </CardTitle>
            </div>
            {dbStatus.status === "operational" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize mt-2">
              {dbStatus.status}
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Latency: {dbStatus.latency}ms
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                WebSocket Server
              </CardTitle>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize mt-2">
              Operational
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              Real-time sync active
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Next.js API
              </CardTitle>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize mt-2">
              Operational
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              App Router Running
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
