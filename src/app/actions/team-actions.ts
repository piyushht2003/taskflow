"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function removeUser(userId: string) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized. Only Admins can remove users.");
  }

  if (session.user.id === userId) {
    throw new Error("You cannot remove yourself.");
  }

  await prisma.user.delete({
    where: { id: userId }
  });

  revalidatePath("/team");
  revalidatePath("/dashboard");
}
