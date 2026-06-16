import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTeamMembers } from "@/app/actions/team-actions";
import { getActiveWorkspaceId } from "@/app/actions/workspace-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldAlert } from "lucide-react";
import { RemoveUserButton } from "./remove-user-button";
import { InviteMemberModal } from "./invite-member-modal";
import { UpdateRoleSelect } from "./update-role-select";

export default async function TeamPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) redirect("/onboarding");

  const members = await getTeamMembers();
  
  const currentUserMembership = members.find(m => m.userId === session.user.id);
  const canManage = currentUserMembership && ["ADMIN", "MANAGER"].includes(currentUserMembership.role);

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case "ADMIN": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "MANAGER": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "DEVELOPER": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-green-500/10 text-green-500 border-green-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground mt-1">View all members in this workspace.</p>
        </div>
        {canManage && (
          <InviteMemberModal workspaceId={workspaceId} currentUserRole={currentUserMembership?.role || "USER"} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((m) => {
          const canModifyMember = canManage && session.user.id !== m.userId && !(currentUserMembership?.role === "MANAGER" && m.role === "ADMIN");
          
          return (
            <Card key={m.id} className="bg-card border-border/50 hover:border-primary/30 transition-colors relative group">
              {canModifyMember && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RemoveUserButton userId={m.userId} />
                </div>
              )}
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 border-4 border-background shadow-sm mb-4">
                  <AvatarImage src={m.user.image || ""} />
                  <AvatarFallback className="text-2xl">{m.user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg mb-1">{m.user.name || "Unknown User"}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{m.user.email}</span>
                </div>

                {m.user.platformRole === "SUPER_ADMIN" && (
                  <Badge variant="secondary" className="mb-2 bg-yellow-500/10 text-yellow-500">
                    <ShieldAlert className="w-3 h-3 mr-1" /> Platform Admin
                  </Badge>
                )}

                <div className="flex flex-col gap-2 w-full mt-2">
                  <div className="flex justify-between items-center bg-secondary/20 p-2 rounded-md border border-border/50">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Role</span>
                    {canModifyMember ? (
                      <UpdateRoleSelect userId={m.userId} currentRole={m.role} currentUserRole={currentUserMembership?.role || "USER"} />
                    ) : (
                      <Badge variant="outline" className={getRoleBadgeColor(m.role)}>
                        {m.role}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
