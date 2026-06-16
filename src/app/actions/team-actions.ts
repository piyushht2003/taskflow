"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getActiveWorkspaceId } from "./workspace-actions";
import { hasWorkspacePermission, requireWorkspacePermission } from "@/lib/permissions";
import { emitWorkspaceEvent } from "@/lib/socket-emitter";

export async function removeWorkspaceMember(userId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) throw new Error("No active workspace");

  await requireWorkspacePermission(workspaceId, "ADMIN");

  if (session.user.id === userId) {
    throw new Error("You cannot remove yourself.");
  }

  const currentMember = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: session.user.id, workspaceId } }
  });

  const targetMember = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } }
  });

  if (!targetMember) {
    throw new Error("Target user is not a member of this workspace.");
  }

  if (currentMember?.role === "MANAGER" && targetMember.role === "ADMIN") {
    throw new Error("Managers cannot remove an Admin.");
  }

  await prisma.workspaceMember.delete({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId
      }
    }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId,
      action: `removed a member from the workspace`
    }
  });

  await emitWorkspaceEvent(workspaceId, "team-updated");

  revalidatePath("/team");
  revalidatePath("/dashboard");
}

export async function updateMemberRole(userId: string, newRole: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) throw new Error("No active workspace");

  await requireWorkspacePermission(workspaceId, "MANAGER");

  if (session.user.id === userId) {
    throw new Error("You cannot change your own role.");
  }

  // Prevent MANAGER from making someone an ADMIN, unless they are an ADMIN themselves
  const currentMember = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: session.user.id, workspaceId } }
  });
  
  if (currentMember?.role === "MANAGER" && newRole === "ADMIN") {
    throw new Error("Managers cannot assign the Admin role.");
  }

  const targetMember = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } }
  });

  if (!targetMember) {
    throw new Error("Target user is not a member of this workspace.");
  }

  if (currentMember?.role === "MANAGER" && targetMember.role === "ADMIN") {
    throw new Error("Managers cannot change the role of an Admin.");
  }

  await prisma.workspaceMember.update({
    where: {
      userId_workspaceId: { userId, workspaceId }
    },
    data: { role: newRole as any }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId,
      action: `updated a member's role to ${newRole}`
    }
  });

  await emitWorkspaceEvent(workspaceId, "team-updated");

  revalidatePath("/team");
}

export async function getTeamMembers() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) return [];

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: { select: { id: true, name: true, email: true, image: true, platformRole: true } }
    },
    orderBy: { joinedAt: "asc" }
  });

  return members;
}
