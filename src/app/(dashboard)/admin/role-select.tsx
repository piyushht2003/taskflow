"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/actions/admin";
import { UserRole } from "@/types/next-auth";

interface RoleSelectProps {
  userId: string;
  currentRole: UserRole;
  disabled?: boolean;
}

export function RoleSelect({ userId, currentRole, disabled }: RoleSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    if (newRole === currentRole) return;

    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
      } catch (error) {
        console.error("Failed to update role", error);
      }
    });
  };

  return (
    <select
      disabled={isPending || disabled}
      value={currentRole}
      onChange={handleRoleChange}
      className="px-2 py-1 bg-secondary text-secondary-foreground border border-border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
    >
      <option value="ADMIN">Admin</option>
      <option value="MANAGER">Manager</option>
      <option value="DEVELOPER">Developer</option>
    </select>
  );
}
