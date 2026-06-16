import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { acceptInvitation } from "@/app/actions/invite-actions";
import { setActiveWorkspace } from "@/app/actions/workspace-actions";
import Link from "next/link";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const session = await auth();

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { workspace: true, inviter: true }
  });

  if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
    return <div className="p-8 text-center min-h-screen flex items-center justify-center">Invalid or expired invitation.</div>;
  }

  // Unauthenticated users
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Join Workspace</CardTitle>
            <CardDescription>
              {invitation.inviter.name || invitation.inviter.email} has invited you to join <strong>{invitation.workspace.name}</strong> as a {invitation.role}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-center text-muted-foreground mb-4">
              You must log in or create an account to accept this invitation.
            </div>
            <Link href={`/login?callbackUrl=/invite/${token}`} className="w-full block">
              <Button className="w-full">Log In</Button>
            </Link>
            <Link href={`/register?callbackUrl=/invite/${token}&email=${encodeURIComponent(invitation.email)}`} className="w-full block">
              <Button variant="outline" className="w-full">Create Account</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated user with mismatched email
  if (session.user.email !== invitation.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Email Mismatch</CardTitle>
            <CardDescription>
              This invitation was sent to <strong>{invitation.email}</strong>, but you are logged in as <strong>{session.user.email}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/api/auth/signout?callbackUrl=/invite/${token}`} className="w-full block">
              <Button className="w-full">Sign out and switch accounts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Join Workspace</CardTitle>
          <CardDescription>
            {invitation.inviter.name || invitation.inviter.email} has invited you to join <strong>{invitation.workspace.name}</strong> as a {invitation.role}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async () => {
            "use server"
            const workspaceId = await acceptInvitation(token);
            await setActiveWorkspace(workspaceId);
            redirect("/dashboard");
          }}>
            <Button type="submit" className="w-full">Accept Invitation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
