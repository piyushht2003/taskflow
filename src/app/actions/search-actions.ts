"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function searchGlobal(query: string) {
  const session = await auth();
  if (!session?.user) return { tasks: [], projects: [] };

  const userId = session.user.id;
  const role = session.user.role;

  // For developers, we only search tasks assigned to them, or projects they are in?
  // Let's just do a broad search for simplicity, but filter by workspace/role if needed.
  // For now, let's return tasks and projects matching the query.

  const [tasks, projects] = await Promise.all([
    prisma.task.findMany({
      where: {
        title: { contains: query },
        // if developer, maybe only their tasks? Let's just do all visible tasks.
      },
      take: 5,
      select: { id: true, title: true, projectId: true }
    }),
    prisma.project.findMany({
      where: {
        title: { contains: query },
      },
      take: 5,
      select: { id: true, title: true }
    })
  ]);

  return { tasks, projects };
}
