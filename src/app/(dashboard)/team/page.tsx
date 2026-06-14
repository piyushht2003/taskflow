import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckSquare } from "lucide-react";
import { RemoveUserButton } from "./remove-user-button";

export default async function TeamPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { role: "asc" },
    include: {
      _count: {
        select: {
          tasks: { where: { status: { not: "COMPLETED" } } }
        }
      }
    }
  });

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case "ADMIN": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "MANAGER": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground mt-1">View all registered members in your organization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((u) => (
          <Card key={u.id} className="bg-card border-border/50 hover:border-primary/30 transition-colors relative group">
            {session.user.role === "ADMIN" && session.user.id !== u.id && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <RemoveUserButton userId={u.id} />
              </div>
            )}
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 border-4 border-background shadow-sm mb-4">
                <AvatarImage src={u.image || ""} />
                <AvatarFallback className="text-2xl">{u.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              
              <h3 className="font-bold text-lg mb-1">{u.name || "Unknown User"}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{u.email}</span>
              </div>

              <div className="flex flex-col gap-2 w-full mt-2">
                <div className="flex justify-between items-center bg-secondary/20 p-2 rounded-md border border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Role</span>
                  <Badge variant="outline" className={getRoleBadgeColor(u.role)}>
                    {u.role}
                  </Badge>
                </div>
                <div className="flex justify-between items-center bg-secondary/20 p-2 rounded-md border border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Active Tasks</span>
                  <div className="flex items-center gap-1.5 font-medium text-sm">
                    <CheckSquare className="w-3.5 h-3.5 text-primary" />
                    {u._count.tasks}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
