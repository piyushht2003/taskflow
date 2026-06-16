"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import bcrypt from "bcryptjs";

export async function updateProfile(data: { name: string; email?: string; password?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const updateData: any = { name: data.name };
  
  if (data.email && data.email.trim() !== "") {
    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing && existing.id !== session.user.id) {
      throw new Error("Email is already in use");
    }
    updateData.email = data.email;
  }

  if (data.password && data.password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = hashedPassword;
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData
  });

  revalidatePath("/settings");
  revalidatePath("/dashboard");
}

export async function updateProfileImage(imageUrl: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: imageUrl }
  });

  revalidatePath("/settings");
  revalidatePath("/dashboard");
}
