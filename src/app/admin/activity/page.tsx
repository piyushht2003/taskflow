import { getActivityLogsAdmin } from "@/actions/admin";
import { ActivityLogsTable } from "./activity-logs-table";

export default async function AdminActivityPage() {
  const logs = await getActivityLogsAdmin();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Activity Logs</h1>
        <p className="text-muted-foreground mt-2">Global audit trail of all actions performed by users.</p>
      </div>
      <ActivityLogsTable logs={logs} />
    </div>
  );
}
