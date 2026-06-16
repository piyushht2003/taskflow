import { getUsers } from "@/actions/admin";
import { UsersTable } from "../users-table";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <p className="text-muted-foreground mt-2">Manage all registered users on the platform.</p>
      </div>
      <UsersTable users={users} />
    </div>
  );
}
