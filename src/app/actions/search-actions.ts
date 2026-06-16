"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getActiveWorkspaceId } from "./workspace-actions";

export async function searchGlobal(query: string) {
  const session = await auth();
  if (!session?.user) return { tasks: [], projects: [] };

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) return { tasks: [], projects: [] };

  const [tasks, projects] = await Promise.all([
    prisma.task.findMany({
      where: {
        workspaceId,
        title: { contains: query, mode: "insensitive" },
      },
      take: 5,
      select: { id: true, title: true, projectId: true }
    }),
    prisma.project.findMany({
      where: {
        workspaceId,
        title: { contains: query, mode: "insensitive" },
      },
      take: 5,
      select: { id: true, title: true }
    })
  ]);

  return { tasks, projects };
}
