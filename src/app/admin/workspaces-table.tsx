"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteWorkspaceAdmin } from "@/actions/admin";

interface WorkspaceAdmin {
  id: string;
  name: string;
  createdAt: Date;
  _count: {
    members: number;
    projects: number;
  };
}

export function WorkspacesTable({ workspaces }: { workspaces: WorkspaceAdmin[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(workspaceId: string) {
    if (!confirm("Are you sure you want to permanently delete this workspace? All data inside will be lost!")) return;
    
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
            <TableHead>Members</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((ws) => (
            <TableRow key={ws.id}>
              <TableCell className="font-medium">{ws.name}</TableCell>
              <TableCell>{ws._count.members}</TableCell>
              <TableCell>{ws._count.projects}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(ws.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="icon-sm"
                  disabled={loadingId === ws.id}
                  onClick={() => handleDelete(ws.id)}
                  title="Delete Workspace"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {workspaces.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No workspaces found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
