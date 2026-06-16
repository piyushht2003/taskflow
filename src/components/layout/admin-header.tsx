import { auth } from "@/auth";
import { UserMenu } from "./user-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { Button } from "@/components/ui/button";

export async function AdminHeader() {
  const session = await auth();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 gap-4 sticky top-0 z-10">
      <div className="flex items-center text-xl font-semibold overflow-hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden mr-2 shrink-0" />}>
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 flex flex-col border-r-0">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <AdminSidebar />
          </SheetContent>
        </Sheet>
        <span className="truncate md:hidden">Admin Panel</span>
      </div>
      {session?.user && <UserMenu user={session.user} />}
    </header>
  );
}
