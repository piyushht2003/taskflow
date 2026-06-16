import { getWorkspacesAdmin } from "@/actions/admin";
import { WorkspacesTable } from "../workspaces-table";

export default async function AdminWorkspacesPage() {
  const workspaces = await getWorkspacesAdmin();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspaces Management</h1>
        <p className="text-muted-foreground mt-2">Manage all workspaces created on the platform.</p>
      </div>
      <WorkspacesTable workspaces={workspaces} />
    </div>
  );
}
