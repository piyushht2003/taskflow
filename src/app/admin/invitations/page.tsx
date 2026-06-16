import { getInvitationsAdmin } from "@/actions/admin";
import { InvitationsTable } from "./invitations-table";

export default async function AdminInvitationsPage() {
  const invitations = await getInvitationsAdmin();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
        <p className="text-muted-foreground mt-2">Manage workspace invitations across the platform.</p>
      </div>
      <InvitationsTable invitations={invitations} />
    </div>
  );
}
