import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GlobalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session.user.platformRole !== "SUPER_ADMIN") {
    const memberships = await prisma.workspaceMember.count({
      where: { userId: session.user.id }
    });

    if (memberships === 0) {
      redirect("/onboarding");
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
