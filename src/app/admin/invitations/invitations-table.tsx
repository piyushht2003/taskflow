"use client";

import { useState } from "react";
import { format } from "date-fns";
import { XCircle } from "lucide-react";
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
import { revokeInvitationAdmin } from "@/actions/admin";

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: string;
  expiresAt: Date;
  createdAt: Date;
  workspace: { id: string; name: string };
  inviter: { id: string; name: string | null; email: string | null };
}

export function InvitationsTable({ invitations }: { invitations: Invitation[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleRevoke(invitationId: string) {
    if (!confirm("Are you sure you want to revoke this invitation?")) return;
    
    setLoadingId(invitationId);
    try {
      await revokeInvitationAdmin(invitationId);
    } catch (e: any) {
      alert(e.message || "Failed to revoke invitation");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/20">
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Inviter</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                <div className="font-medium">{inv.email}</div>
                <div className="text-xs text-muted-foreground font-mono">{inv.id}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{inv.workspace.name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{inv.inviter.name || "Unknown"}</div>
                <div className="text-xs text-muted-foreground">{inv.inviter.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{inv.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={inv.status === "PENDING" ? "default" : inv.status === "ACCEPTED" ? "outline" : "destructive"}>
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(inv.expiresAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                {inv.status === "PENDING" && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    disabled={loadingId === inv.id}
                    onClick={() => handleRevoke(inv.id)}
                    title="Revoke Invitation"
                  >
                    <XCircle className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {invitations.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No invitations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
