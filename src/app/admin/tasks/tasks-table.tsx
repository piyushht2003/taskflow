"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  createdAt: Date;
  workspace: { id: string; name: string };
  project: { id: string; title: string } | null;
  assignee: { id: string; name: string | null; email: string | null } | null;
}

export function TasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/20">
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead>Workspace & Project</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="font-medium max-w-[200px] truncate" title={task.title}>{task.title}</div>
                <div className="text-xs text-muted-foreground font-mono">{task.id}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{task.workspace.name}</div>
                <div className="text-xs text-muted-foreground">{task.project?.title || "No Project"}</div>
              </TableCell>
              <TableCell>
                {task.assignee ? (
                  <>
                    <div className="text-sm">{task.assignee.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground">{task.assignee.email}</div>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={task.status === "COMPLETED" ? "default" : "outline"}>
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{task.priority}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(task.createdAt), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
