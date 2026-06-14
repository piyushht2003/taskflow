"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeUser } from "@/app/actions/team-actions";
import { useRouter } from "next/navigation";

interface RemoveUserButtonProps {
  userId: string;
}

export function RemoveUserButton({ userId }: RemoveUserButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleRemove() {
    if (!confirm("Are you sure you want to remove this user from the entire system? This action cannot be undone.")) {
      return;
    }

    setIsPending(true);
    try {
      await removeUser(userId);
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to remove user");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleRemove} 
      disabled={isPending}
      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-8 h-8 rounded-full"
      title="Remove User"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
