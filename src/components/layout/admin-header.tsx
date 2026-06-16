import { auth } from "@/auth";
import { UserMenu } from "./user-menu";

export async function AdminHeader() {
  const session = await auth();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-end px-4 gap-4 sticky top-0 z-10">
      {session?.user && <UserMenu user={session.user} />}
    </header>
  );
}
