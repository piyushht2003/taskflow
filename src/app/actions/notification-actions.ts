"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getMyNotifications() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });
}

export async function markAsRead(notificationId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  });

  revalidatePath("/notifications");
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true }
  });

  revalidatePath("/notifications");
}
