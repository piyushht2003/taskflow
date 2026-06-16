"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/types";
import { getActiveWorkspaceId } from "./workspace-actions";
import { hasWorkspacePermission, requireWorkspacePermission } from "@/lib/permissions";

export async function getTasksByProjectId(projectId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return [];

  const hasAccess = await hasWorkspacePermission(project.workspaceId, "DESIGNER");
  if (!hasAccess) return [];

  return await prisma.task.findMany({
    where: { projectId, workspaceId: project.workspaceId },
    include: {
      assignee: { select: { id: true, name: true, image: true } },
      comments: { 
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "asc" }
      },
    },
    orderBy: { createdAt: "asc" }
  });
}

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  await requireWorkspacePermission(task.workspaceId, "DESIGNER");

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: task.workspaceId,
      action: `moved task "${task.title}" to ${newStatus}`
    }
  });

  if (updatedTask.projectId) {
    revalidatePath(`/projects/${updatedTask.projectId}/board`);
  }
  revalidatePath("/dashboard");
  return updatedTask;
}

export async function createTask(data: { title: string, projectId: string, status: TaskStatus, assigneeId?: string | null }) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const project = await prisma.project.findUnique({ where: { id: data.projectId } });
  if (!project) throw new Error("Project not found");

  await requireWorkspacePermission(project.workspaceId, "DEVELOPER");

  const task = await prisma.task.create({
    data: {
      title: data.title,
      projectId: data.projectId,
      workspaceId: project.workspaceId,
      status: data.status,
      assigneeId: data.assigneeId,
    }
  });

  if (data.assigneeId) {
    await prisma.notification.create({
      data: {
        userId: data.assigneeId,
        message: `You have been assigned to a new task: ${task.title}`
      }
    });
  }

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: project.workspaceId,
      action: `created task "${task.title}"`
    }
  });

  revalidatePath(`/projects/${data.projectId}/board`);
  revalidatePath("/dashboard");
  return task;
}

export async function getMyTasks() {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) return [];

  return await prisma.task.findMany({
    where: { assigneeId: session.user.id, workspaceId },
    include: {
      project: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateTaskDetails(
  taskId: string, 
  data: { description?: string; assigneeId?: string | null; dueDate?: Date | null; attachments?: string }
) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  // If trying to change assignee, require MANAGER
  if (data.assigneeId !== undefined && data.assigneeId !== task.assigneeId) {
    await requireWorkspacePermission(task.workspaceId, "MANAGER");
  } else {
    // Otherwise DEVELOPER is enough
    await requireWorkspacePermission(task.workspaceId, "DEVELOPER");
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
    include: { project: true }
  });

  if (data.assigneeId && data.assigneeId !== "UNASSIGNED" && data.assigneeId !== task.assigneeId) {
    await prisma.notification.create({
      data: {
        userId: data.assigneeId,
        message: `You have been assigned to task: ${task.title}`
      }
    });
  }

  if (updatedTask.projectId) {
    revalidatePath(`/projects/${updatedTask.projectId}/board`);
  }
  revalidatePath("/dashboard");
  return updatedTask;
}

export async function addComment(taskId: string, content: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  await requireWorkspacePermission(task.workspaceId, "DESIGNER");

  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
      workspaceId: task.workspaceId,
      userId: session.user.id
    }
  });

  if (task.assigneeId && task.assigneeId !== session.user.id) {
    await prisma.notification.create({
      data: {
        userId: task.assigneeId,
        message: `${session.user.name || 'Someone'} commented on your task: ${task.title}`
      }
    });
  }

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: task.workspaceId,
      action: `commented on "${task.title}"`
    }
  });

  if (task.projectId) {
    revalidatePath(`/projects/${task.projectId}/board`);
  }
  return comment;
}

export async function getAssignableUsers() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const workspaceId = await getActiveWorkspaceId();
  if (!workspaceId) return [];

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: { user: { select: { id: true, name: true, image: true } } },
    orderBy: { user: { name: "asc" } }
  });

  return members.map(m => ({ ...m.user, role: m.role }));
}

export async function deleteTask(taskId: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId }, include: { project: true } });
  if (!task) throw new Error("Task not found");

  await requireWorkspacePermission(task.workspaceId, "MANAGER");

  await prisma.task.delete({
    where: { id: taskId }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: task.workspaceId,
      action: `deleted task "${task.title}"`
    }
  });

  if (task.projectId) {
    revalidatePath(`/projects/${task.projectId}/board`);
  }
  revalidatePath("/dashboard");
  return task;
}

export async function logTime(taskId: string, minutes: number) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  await requireWorkspacePermission(task.workspaceId, "DEVELOPER");

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      loggedTime: { increment: minutes }
    }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      workspaceId: task.workspaceId,
      action: `logged ${minutes}m on task "${task.title}"`
    }
  });

  if (task.projectId) {
    revalidatePath(`/projects/${task.projectId}/board`);
  }
  return updatedTask;
}
