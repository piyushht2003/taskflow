"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/types";

export async function getTasksByProjectId(projectId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.task.findMany({
    where: { projectId },
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

  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `moved task "${task.title}" to ${newStatus}`
    }
  });

  revalidatePath(`/projects/${task.projectId}/board`);
  revalidatePath("/dashboard");
  return task;
}

export async function createTask(data: { title: string, projectId: string, status: TaskStatus, assigneeId?: string | null }) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.create({
    data: {
      title: data.title,
      projectId: data.projectId,
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

  return await prisma.task.findMany({
    where: { assigneeId: session.user.id },
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

  // Prevent developers from changing the assignee
  if (data.assigneeId !== undefined && session.user.role === "DEVELOPER") {
    throw new Error("Developers cannot assign tasks. Contact your Manager.");
  }

  const task = await prisma.task.update({
    where: { id: taskId },
    data,
    include: { project: true }
  });

  if (data.assigneeId && data.assigneeId !== "UNASSIGNED") {
    // Notify the new assignee
    await prisma.notification.create({
      data: {
        userId: data.assigneeId,
        message: `You have been assigned to task: ${task.title}`
      }
    });
  }

  revalidatePath(`/projects/${task.projectId}/board`);
  revalidatePath("/dashboard");
  return task;
}

export async function addComment(taskId: string, content: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
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
      action: `commented on "${task.title}"`
    }
  });

  revalidatePath(`/projects/${task.projectId}/board`);
  return comment;
}

export async function getAssignableUsers() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.user.findMany({
    select: { id: true, name: true, image: true, role: true },
    orderBy: { name: "asc" }
  });
}

export async function deleteTask(taskId: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  if (session.user.role === "DEVELOPER") {
    throw new Error("Only Managers and Admins can delete tasks.");
  }

  const task = await prisma.task.delete({
    where: { id: taskId },
    include: { project: true }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `deleted task "${task.title}"`
    }
  });

  revalidatePath(`/projects/${task.projectId}/board`);
  revalidatePath("/dashboard");
  return task;
}

export async function logTime(taskId: string, minutes: number) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      loggedTime: { increment: minutes }
    }
  });

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: `logged ${minutes}m on task "${task.title}"`
    }
  });

  revalidatePath(`/projects/${task.projectId}/board`);
  return updatedTask;
}
