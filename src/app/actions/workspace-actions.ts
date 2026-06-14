"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createWorkspace(name: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");
  if (session.user.role === "DEVELOPER") throw new Error("Developers cannot create workspaces");

  const workspace = await prisma.workspace.create({
    data: {
      name,
      ownerId: session.user.id
    }
  });

  revalidatePath("/");
  return workspace;
}

export async function getMyWorkspaces() {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  return await prisma.workspace.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "asc" }
  });
}

export async function getActiveWorkspaceId() {
  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("workspaceId")?.value;
  
  if (workspaceId) {
    return workspaceId;
  }

  // If no active workspace is selected, pick the user's first workspace if it exists
  const session = await auth();
  if (session?.user?.id && session.user.role !== "DEVELOPER") {
    const firstWorkspace = await prisma.workspace.findFirst({
      where: { ownerId: session.user.id },
      orderBy: { createdAt: "asc" }
    });
    if (firstWorkspace) {
      return firstWorkspace.id;
    }
  }

  return null;
}

export async function setActiveWorkspace(workspaceId: string) {
  const cookieStore = await cookies();
  cookieStore.set("workspaceId", workspaceId, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // 30 days
  revalidatePath("/");
}

export async function deleteWorkspace(id: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const workspace = await prisma.workspace.findUnique({ where: { id } });
  if (!workspace || workspace.ownerId !== session.user.id) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.workspace.delete({ where: { id } });

  const cookieStore = await cookies();
  const currentActive = cookieStore.get("workspaceId")?.value;
  if (currentActive === id) {
    cookieStore.delete("workspaceId");
  }

  revalidatePath("/");
}
