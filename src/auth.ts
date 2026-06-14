import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "MANAGER" | "DEVELOPER"
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as { role?: string }).role

        if (account?.provider === "google") {
          try {
            const { cookies } = await import("next/headers")
            const cookieStore = await cookies()
            const pendingRole = cookieStore.get("pending_role")?.value

            if (pendingRole && ["ADMIN", "MANAGER", "DEVELOPER"].includes(pendingRole)) {
              await prisma.user.update({
                where: { id: user.id },
                data: { role: pendingRole }
              })
              token.role = pendingRole
            }
          } catch (error) {
            console.error("Failed to read cookie in NextAuth", error)
          }
        }
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
})
