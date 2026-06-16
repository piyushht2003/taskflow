"use client";

import { useTransition, useState, useEffect } from "react";
import { updateMemberRole } from "@/app/actions/team-actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UpdateRoleSelect({ 
  userId, 
  currentRole, 
  disabled 
}: { 
  userId: string; 
  currentRole: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [localRole, setLocalRole] = useState(currentRole);

  useEffect(() => {
    setLocalRole(currentRole);
  }, [currentRole]);

  function handleRoleChange(newRole: string | null) {
    if (!newRole || newRole === localRole) return;
    setError(null);
    setLocalRole(newRole); // Optimistic update
    
    startTransition(async () => {
      try {
        await updateMemberRole(userId, newRole);
        router.refresh();
      } catch (error) {
        setLocalRole(currentRole); // Revert on error
        setError(error instanceof Error ? error.message : "Failed to update role");
      }
    });
  }

  return (
    <div className="flex flex-col gap-1 items-end">
      <Select
        value={localRole}
        onValueChange={handleRoleChange}
        disabled={disabled || isPending}
      >
        <SelectTrigger className="w-[120px] h-8 text-xs font-semibold">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="MANAGER">Manager</SelectItem>
          <SelectItem value="DEVELOPER">Developer</SelectItem>
          <SelectItem value="USER">User</SelectItem>
        </SelectContent>
      </Select>
      {error && <span className="text-[10px] text-red-500 font-medium">{error}</span>}
    </div>
  );
}
