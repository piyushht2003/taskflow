"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getActiveWorkspaceId } from "./workspace-actions";

export async function getProjects() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const workspaceId = session.user.role !== "DEVELOPER" ? await getActiveWorkspaceId() : undefined;
  const whereClause = workspaceId ? { workspaceId } : workspaceId === null ? { workspaceId: null } : {};

  return await prisma.project.findMany({
    where: whereClause,
    orderBy: { updatedAt: "desc" },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      _count: { select: { tasks: true } }
    }
  });
}

export async function getProjectById(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.project.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, image: true } },
    }
  });
}

export async function createProject(title: string, description?: string, deadline?: Date) {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  
  if (session.user.role === "DEVELOPER") {
    throw new Error("Developers cannot create projects. Please contact your Manager.");
  }

  const workspaceId = await getActiveWorkspaceId();

  const project = await prisma.project.create({
    data: {
      title,
      description,
      deadline,
      ownerId: session.user.id,
      workspaceId,
    }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `created project "${project.title}"`
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  return project;
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  
  if (session.user.role === "DEVELOPER") {
    throw new Error("Developers cannot delete projects. Please contact your Manager.");
  }

  const project = await prisma.project.delete({
    where: { id }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `deleted project "${project.title}"`
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  return project;
}

export async function updateProject(id: string, data: { title?: string; description?: string; deadline?: Date | null; workspaceId?: string | null }) {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  
  if (session.user.role === "DEVELOPER") {
    throw new Error("Developers cannot edit projects. Please contact your Manager.");
  }

  const project = await prisma.project.update({
    where: { id },
    data
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `updated project "${project.title}" settings`
    }
  });

  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}/board`);
  return project;
}
