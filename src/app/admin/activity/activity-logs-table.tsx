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

interface ActivityLog {
  id: string;
  action: string;
  timestamp: Date;
  metadata: string | null;
  user: { id: string; name: string | null; email: string | null };
  workspace: { id: string; name: string } | null;
}

export function ActivityLogsTable({ logs }: { logs: ActivityLog[] }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/20">
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                {format(new Date(log.timestamp), "MMM d, yyyy h:mm a")}
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{log.user.name || "Unknown"}</div>
                <div className="text-xs text-muted-foreground">{log.user.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{log.workspace?.name || "Global"}</div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate" title={log.metadata || ""}>
                {log.metadata || "No metadata"}
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No activity logs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
