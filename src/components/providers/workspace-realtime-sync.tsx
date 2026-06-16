"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "./socket-provider";

interface WorkspaceRealtimeSyncProps {
  workspaceId: string | null;
}

export function WorkspaceRealtimeSync({ workspaceId }: WorkspaceRealtimeSyncProps) {
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket || !isConnected || !workspaceId) return;

    socket.emit("join-workspace", workspaceId);

    const handleWorkspaceEvent = (data: any) => {
      // Add a small delay to ensure the server action's `revalidatePath` has fully executed
      // and purged the cache before we request fresh components.
      setTimeout(() => {
        router.refresh();
      }, 500);
    };

    socket.on("team-updated", handleWorkspaceEvent);
    socket.on("projects-updated", handleWorkspaceEvent);
    socket.on("tasks-updated", handleWorkspaceEvent);
    socket.on("invites-updated", handleWorkspaceEvent);
    socket.on("workspace-event", handleWorkspaceEvent);

    return () => {
      socket.emit("leave-workspace", workspaceId);
      socket.off("team-updated", handleWorkspaceEvent);
      socket.off("projects-updated", handleWorkspaceEvent);
      socket.off("tasks-updated", handleWorkspaceEvent);
      socket.off("invites-updated", handleWorkspaceEvent);
      socket.off("workspace-event", handleWorkspaceEvent);
    };
  }, [socket, isConnected, workspaceId, router]);

  return null; // This is a purely logical component, no UI
}
