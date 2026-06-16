import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/features/settings/components/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePictureUpload } from "@/features/settings/components/profile-picture-upload";
import { Badge } from "@/components/ui/badge";
import { ThemeSettings } from "@/features/settings/components/theme-settings";
import { SystemSettingsForm } from "./system-settings-form";
import { getSystemSettings } from "@/actions/admin";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [dbUser, systemSettings] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    getSystemSettings()
  ]);

  if (!dbUser) redirect("/login");

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full p-4 md:p-8">
      <div className="flex items-center justify-between pb-6 shrink-0 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account & Platform Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and platform preferences.</p>
        </div>
      </div>

      <div className="space-y-8">
        <Card className="bg-card border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Global configurations that apply to all workspaces and users.</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemSettingsForm settings={systemSettings} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="md:col-span-2">
            <Card className="bg-card border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Super Admin Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
                  <ProfilePictureUpload user={dbUser} />
                  <div>
                    <h3 className="font-bold text-lg">{dbUser.name}</h3>
                    <p className="text-muted-foreground">{dbUser.email}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-secondary/50 border-primary text-primary">
                        {dbUser.platformRole}
                      </Badge>
                    </div>
                  </div>
                </div>

                <ProfileForm user={dbUser} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-card border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ThemeSettings />

                <div className="p-4 bg-secondary/20 rounded-lg border border-border/50">
                  <h4 className="font-medium text-sm mb-1">Notifications</h4>
                  <p className="text-xs text-muted-foreground">In-app notifications are enabled by default for task assignments and comments.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
