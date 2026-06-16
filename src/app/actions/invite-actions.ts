"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { requireWorkspacePermission } from "@/lib/permissions";
import { randomBytes } from "crypto";

export async function inviteUser(email: string, workspaceId: string, role: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Only MANAGER and ADMIN can invite.
  await requireWorkspacePermission(workspaceId, "MANAGER");

  const token = randomBytes(32).toString("hex");

  const invitation = await prisma.invitation.create({
    data: {
      email,
      workspaceId,
      inviterId: session.user.id,
      token,
      role,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
    }
  });

  return invitation;
}

export async function acceptInvitation(token: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized. Please log in first.");

  const invitation = await prisma.invitation.findUnique({ where: { token } });
  if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
    throw new Error("Invalid or expired invitation");
  }

  if (session.user.email !== invitation.email) {
    throw new Error("This invitation was sent to a different email address.");
  }

  await prisma.$transaction([
    prisma.workspaceMember.create({
      data: {
        userId: session.user.id,
        workspaceId: invitation.workspaceId,
        role: invitation.role
      }
    }),
    prisma.invitation.update({
      where: { token },
      data: { status: "ACCEPTED" }
    })
  ]);

  return invitation.workspaceId;
}
