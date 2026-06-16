import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export type WorkspaceRole = "ADMIN" | "MANAGER" | "DEVELOPER" | "DESIGNER"

const roleHierarchy: Record<WorkspaceRole, number> = {
  ADMIN: 4,
  MANAGER: 3,
  DEVELOPER: 2,
  DESIGNER: 1,
}

export async function hasWorkspacePermission(workspaceId: string, requiredRole: WorkspaceRole = "DEVELOPER") {
  const session = await auth()
  if (!session?.user?.id) return false
  if (session.user.platformRole === "SUPER_ADMIN") return true // Super admins bypass workspace RBAC

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId
      }
    }
  })

  if (!membership) return false

  const userRoleWeight = roleHierarchy[membership.role as WorkspaceRole] || 0
  const requiredWeight = roleHierarchy[requiredRole] || 0

  return userRoleWeight >= requiredWeight
}

export async function requireWorkspacePermission(workspaceId: string, requiredRole: WorkspaceRole = "DEVELOPER") {
  const hasPermission = await hasWorkspacePermission(workspaceId, requiredRole)
  if (!hasPermission) {
    throw new Error("Unauthorized: Insufficient workspace permissions")
  }
}
