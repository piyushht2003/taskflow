import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { UserMenu } from "./user-menu";
import { GlobalSearch } from "./global-search";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function Header() {
  const session = await auth();
  const user = session?.user;

  let unreadCount = 0;
  let dbUser = null;
  if (user?.id) {
    const [count, fetchedUser] = await Promise.all([
      prisma.notification.count({ where: { userId: user.id, isRead: false } }),
      prisma.user.findUnique({ where: { id: user.id }, select: { image: true, name: true } })
    ]);
    unreadCount = count;
    dbUser = fetchedUser;
  }

  const displayUser = user ? { ...user, ...dbUser } : undefined;

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center text-xl font-semibold overflow-hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden mr-2 shrink-0" />}>
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 flex flex-col border-r-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <span className="truncate">Dashboard</span>
      </div>

      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        <div className="hidden sm:block">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
              )}
            </Button>
          </Link>
          <UserMenu user={displayUser} />
        </div>
      </div>
    </header>
  );
}
