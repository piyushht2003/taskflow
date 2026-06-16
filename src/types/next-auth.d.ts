import NextAuth, { type DefaultSession } from "next-auth"

export type PlatformRole = "SUPER_ADMIN" | "USER"

export type ExtendedUser = DefaultSession["user"] & {
  platformRole: PlatformRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
