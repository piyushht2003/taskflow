import NextAuth, { type DefaultSession } from "next-auth"

export type UserRole = "ADMIN" | "MANAGER" | "DEVELOPER"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
