"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getActiveWorkspaceId } from "./workspace-actions";
import { hasWorkspacePermission, requireWorkspacePermission } from "@/lib/permissions";
import { emitWorkspaceEvent } from "@/lib/socket-emitter";

export async function getProjects() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) return [];

  // Verify membership implicitly
  const hasAccess = await hasWorkspacePermission(workspaceId, "DESIGNER");
  if (!hasAccess) return [];

  return await prisma.project.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
    include: {
      workspace: { select: { name: true } },
      _count: { select: { tasks: true } }
    }
  });
}

export async function getProjectById(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) return null;
  await requireWorkspacePermission(project.workspaceId, "DESIGNER");

  return project;
}

export async function createProject(title: string, description?: string, targetWorkspaceId?: string | null, deadline?: Date) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");
  
  const workspaceId = targetWorkspaceId || await getActiveWorkspaceId();
  if (!workspaceId) throw new Error("No active workspace selected");

  await requireWorkspacePermission(workspaceId, "MANAGER");

  const project = await prisma.project.create({
    data: {
      title,
      description,
      deadline,
      workspaceId,
    }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId,
      action: `created project "${project.title}"`
    }
  });

  await emitWorkspaceEvent(workspaceId, "projects-updated");

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  return project;
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");
  
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error("Project not found");

  await requireWorkspacePermission(project.workspaceId, "MANAGER");

  await prisma.project.delete({
    where: { id }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: project.workspaceId,
      action: `deleted project "${project.title}"`
    }
  });

  await emitWorkspaceEvent(project.workspaceId, "projects-updated");

  revalidatePath("/dashboard");
  revalidatePath("/projects");
  return project;
}

export async function updateProject(id: string, data: { title?: string; description?: string; deadline?: Date | null; workspaceId?: string }) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");
  
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error("Project not found");

  await requireWorkspacePermission(project.workspaceId, "MANAGER");

  // If moving to a new workspace, verify permissions there too
  if (data.workspaceId && data.workspaceId !== project.workspaceId) {
    await requireWorkspacePermission(data.workspaceId, "MANAGER");
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: updatedProject.workspaceId,
      action: `updated project "${updatedProject.title}" settings`
    }
  });

  await emitWorkspaceEvent(updatedProject.workspaceId, "projects-updated");

  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}/board`);
  return updatedProject;
}
