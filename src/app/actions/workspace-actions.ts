"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { hasWorkspacePermission } from "@/lib/permissions";

export async function createWorkspace(name: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const workspace = await prisma.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId: session.user.id,
          role: "ADMIN"
        }
      }
    }
  });

  revalidatePath("/", "layout");
  return workspace;
}

export async function getMyWorkspaces() {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  return await prisma.workspace.findMany({
    where: {
      members: {
        some: { userId: session.user.id }
      }
    },
    orderBy: { createdAt: "asc" }
  });
}

export async function getActiveWorkspaceId() {
  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("workspaceId")?.value;
  
  const session = await auth();
  if (!session?.user?.id) return null;

  if (workspaceId) {
    const valid = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId
        }
      }
    });
    if (valid) return workspaceId;
  }
  if (session?.user?.id) {
    const firstWorkspace = await prisma.workspace.findFirst({
      where: {
        members: {
          some: { userId: session.user.id }
        }
      },
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
  revalidatePath("/", "layout");
}

export async function deleteWorkspace(id: string) {
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("Unauthorized");

  const isAdmin = await hasWorkspacePermission(id, "ADMIN");
  if (!isAdmin) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.workspace.delete({ where: { id } });

  const cookieStore = await cookies();
  const currentActive = cookieStore.get("workspaceId")?.value;
  if (currentActive === id) {
    cookieStore.delete("workspaceId");
  }

  revalidatePath("/", "layout");
}
