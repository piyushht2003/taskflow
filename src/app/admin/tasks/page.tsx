import { getTasksAdmin } from "@/actions/admin";
import { TasksTable } from "./tasks-table";

export default async function AdminTasksPage() {
  const tasks = await getTasksAdmin();

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Tasks</h1>
        <p className="text-muted-foreground mt-2">Monitor all tasks created across the platform.</p>
      </div>
      <TasksTable tasks={tasks} />
    </div>
  );
}
