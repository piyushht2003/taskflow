"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["ADMIN", "MANAGER", "DEVELOPER"]).default("DEVELOPER"),
})

export async function registerUser(formData: FormData) {
  try {
    console.log("DB URL IS:", process.env.DATABASE_URL)
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const role = formData.get("role") || "DEVELOPER"

    const validatedData = registerSchema.safeParse({ name, email, password, role })

    if (!validatedData.success) {
      return {
        error: validatedData.error.issues[0].message,
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.data.email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10)

    await prisma.user.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email,
        password: hashedPassword,
        role: validatedData.data.role,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Something went wrong. Please try again." }
  }
}
