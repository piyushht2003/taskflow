"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      platformRole: true,
      status: true,
      createdAt: true,
      activityLogs: {
        orderBy: { timestamp: "desc" },
        take: 1,
        select: { timestamp: true }
      },
      _count: {
        select: { workspaceMembers: true, tasks: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateUserRole(userId: string, newRole: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.id === userId && newRole !== "SUPER_ADMIN") {
    throw new Error("Cannot demote yourself");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { platformRole: newRole },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getWorkspacesAdmin() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.workspace.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      _count: {
        select: { members: true, projects: true, tasks: true },
      },
      members: {
        where: { role: "ADMIN" },
        take: 1,
        select: { user: { select: { name: true, email: true } } }
      }
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteUserAdmin(userId: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.id === userId) {
    throw new Error("Cannot delete yourself");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function toggleUserStatus(userId: string, newStatus: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.id === userId) {
    throw new Error("Cannot change your own status");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteWorkspaceAdmin(workspaceId: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.workspace.delete({
    where: { id: workspaceId },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function toggleWorkspaceStatus(workspaceId: string, newStatus: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { status: newStatus },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getAdminAnalytics() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const users = await prisma.user.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" }
  });

  const workspaces = await prisma.workspace.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" }
  });

  // Group by day
  const dataMap = new Map<string, { date: string; users: number; workspaces: number }>();

  // Initialize last 30 days
  for (let i = 0; i <= 30; i++) {
    const d = new Date(thirtyDaysAgo);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    dataMap.set(dateStr, { date: dateStr, users: 0, workspaces: 0 });
  }

  users.forEach(u => {
    const dStr = u.createdAt.toISOString().split("T")[0];
    if (dataMap.has(dStr)) {
      dataMap.get(dStr)!.users++;
    }
  });

  workspaces.forEach(w => {
    const dStr = w.createdAt.toISOString().split("T")[0];
    if (dataMap.has(dStr)) {
      dataMap.get(dStr)!.workspaces++;
    }
  });

  return Array.from(dataMap.values());
}

export async function getTasksAdmin() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,
      createdAt: true,
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, title: true } },
      assignee: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });
}

export async function getInvitationsAdmin() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.invitation.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      expiresAt: true,
      createdAt: true,
      workspace: { select: { id: true, name: true } },
      inviter: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });
}

export async function revokeInvitationAdmin(invitationId: string) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.invitation.update({
    where: { id: invitationId },
    data: { status: "REVOKED" }
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getActivityLogsAdmin() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.activityLog.findMany({
    select: {
      id: true,
      action: true,
      timestamp: true,
      metadata: true,
      user: { select: { id: true, name: true, email: true } },
      workspace: { select: { id: true, name: true } }
    },
    orderBy: { timestamp: "desc" },
    take: 200
  });
}

export async function getSystemSettings() {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  let settings = await prisma.systemSettings.findUnique({
    where: { id: "default" }
  });

  if (!settings) {
    settings = await prisma.systemSettings.create({
      data: { id: "default" }
    });
  }

  return settings;
}

export async function updateSystemSettings(data: { platformName?: string; description?: string; maintenanceMode?: boolean }) {
  const session = await auth();
  if (!session?.user || session.user.platformRole !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.systemSettings.update({
    where: { id: "default" },
    data
  });

  revalidatePath("/admin/settings");
  return { success: true };
}
