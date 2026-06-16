"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2, Lock, Unlock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deleteWorkspaceAdmin, toggleWorkspaceStatus } from "@/actions/admin";
import Link from "next/link";

interface Workspace {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  _count: {
    members: number;
    projects: number;
    tasks: number;
  };
  members: {
    user: {
      name: string | null;
      email: string | null;
    }
  }[];
}

export function WorkspacesTable({ workspaces }: { workspaces: Workspace[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusToggle(workspaceId: string, currentStatus: string) {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (newStatus === "SUSPENDED" && !confirm("Are you sure you want to suspend this workspace? All its members will lose access.")) return;
    
    setLoadingId(workspaceId);
    try {
      await toggleWorkspaceStatus(workspaceId, newStatus);
    } catch (e: any) {
      alert(e.message || "Failed to toggle status");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(workspaceId: string) {
    if (!confirm("Are you sure you want to permanently delete this workspace and ALL of its data?")) return;
    
    setLoadingId(workspaceId);
    try {
      await deleteWorkspaceAdmin(workspaceId);
    } catch (e: any) {
      alert(e.message || "Failed to delete workspace");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/20">
          <TableRow>
            <TableHead>Workspace Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((workspace) => (
            <TableRow key={workspace.id}>
              <TableCell>
                <div className="font-medium">{workspace.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{workspace.id}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {workspace.members[0]?.user?.name || "Unknown"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {workspace.members[0]?.user?.email || "No Email"}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={workspace.status === "ACTIVE" ? "default" : "destructive"}>
                  {workspace.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {workspace._count.members}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                Projects: {workspace._count.projects}<br/>
                Tasks: {workspace._count.tasks}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(workspace.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/workspaces/${workspace.id}`}>
                  <Button variant="outline" size="icon-sm" title="View Workspace Details">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={loadingId === workspace.id}
                  onClick={() => handleStatusToggle(workspace.id, workspace.status)}
                  title={workspace.status === "ACTIVE" ? "Suspend Workspace" : "Reactivate Workspace"}
                >
                  {workspace.status === "ACTIVE" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  disabled={loadingId === workspace.id}
                  onClick={() => handleDelete(workspace.id)}
                  title="Delete Workspace"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {workspaces.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No workspaces found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
