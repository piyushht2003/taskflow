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
      createdAt: true,
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
      createdAt: true,
      _count: {
        select: { members: true, projects: true },
      },
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
