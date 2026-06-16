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
      if (token.platformRole && session.user) {
        session.user.platformRole = token.platformRole as "SUPER_ADMIN" | "USER"
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        let platformRole = (user as { platformRole?: string }).platformRole || "USER";

        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "taskflow@admin.com";
        if (user.email === superAdminEmail && platformRole !== "SUPER_ADMIN") {
          await prisma.user.update({
            where: { id: user.id },
            data: { platformRole: "SUPER_ADMIN" }
          });
          platformRole = "SUPER_ADMIN";
        }

        token.platformRole = platformRole;
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
})
