import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createWorkspace } from "@/app/actions/workspace-actions";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const memberships = await prisma.workspaceMember.count({
    where: { userId: session.user.id }
  });

  if (memberships > 0) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="max-w-md w-full p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to TaskFlow</h1>
          <p className="text-muted-foreground mt-2">Let's get started by creating or joining a workspace.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create a Workspace</CardTitle>
            <CardDescription>Start a new team space from scratch.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              "use server"
              const name = formData.get("name") as string;
              if (name) {
                await createWorkspace(name);
                redirect("/dashboard");
              }
            }} className="space-y-4">
              <Input name="name" placeholder="E.g. Acme Corp, Startup Project..." required />
              <Button type="submit" className="w-full">Create Workspace</Button>
            </form>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-muted/20 px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Join a Workspace</CardTitle>
            <CardDescription>Have an invite code or link? Paste it here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              "use server"
              const inviteInput = formData.get("inviteCode") as string;
              if (inviteInput) {
                let token = inviteInput.trim();
                // If the user pasted the full URL, extract the token
                if (token.includes('/invite/')) {
                  const parts = token.split('/invite/');
                  token = parts[parts.length - 1].split('?')[0].split('#')[0];
                }
                if (token) {
                  redirect(`/invite/${token}`);
                }
              }
            }} className="space-y-4">
              <Input name="inviteCode" placeholder="Invite link or token" required />
              <Button type="submit" variant="secondary" className="w-full">Join Workspace</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
