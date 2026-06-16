"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2, UserX, UserCheck, Eye, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateUserRole, deleteUserAdmin, toggleUserStatus } from "@/actions/admin";
import Link from "next/link";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  platformRole: string;
  status: string;
  createdAt: Date;
  activityLogs: { timestamp: Date }[];
  _count: {
    workspaceMembers: number;
    tasks: number;
  };
}

export function UsersTable({ users }: { users: User[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleRoleChange(userId: string, newRole: string) {
    setLoadingId(userId);
    try {
      await updateUserRole(userId, newRole);
    } catch (e: any) {
      alert(e.message || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleStatusToggle(userId: string, currentStatus: string) {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (newStatus === "SUSPENDED" && !confirm("Are you sure you want to suspend this user? They will not be able to log in.")) return;
    
    setLoadingId(userId);
    try {
      await toggleUserStatus(userId, newStatus);
    } catch (e: any) {
      alert(e.message || "Failed to toggle status");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("Are you sure you want to permanently delete this user?")) return;
    
    setLoadingId(userId);
    try {
      await deleteUserAdmin(userId);
    } catch (e: any) {
      alert(e.message || "Failed to delete user");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/20">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="font-medium">{user.name || "Unknown"}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </TableCell>
              <TableCell>
                <Select
                  disabled={loadingId === user.id}
                  value={user.platformRole}
                  onValueChange={(val) => val && handleRoleChange(user.id, val)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-xs text-muted-foreground">
                  <div>Workspaces: {user._count.workspaceMembers}</div>
                  <div>Tasks: {user._count.tasks}</div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {user.activityLogs[0] ? format(new Date(user.activityLogs[0].timestamp), "MMM d, yyyy") : "Never"}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/users/${user.id}`}>
                  <Button variant="outline" size="icon-sm" title="View User Details">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={loadingId === user.id}
                  onClick={() => handleStatusToggle(user.id, user.status)}
                  title={user.status === "ACTIVE" ? "Suspend User" : "Reactivate User"}
                >
                  {user.status === "ACTIVE" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  disabled={loadingId === user.id}
                  onClick={() => handleDelete(user.id)}
                  title="Delete User"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
