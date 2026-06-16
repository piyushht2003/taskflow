"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function UserMenu({ user }: { user: { name?: string | null, email?: string | null, image?: string | null, platformRole?: string | null } | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none bg-transparent p-0 m-0 cursor-pointer">
        <div className="flex items-center gap-3 border-l border-border pl-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{user?.platformRole?.toLowerCase() || "User"}</p>
          </div>
          <Avatar className="w-9 h-9 border border-border/50">
            <AvatarImage src={user?.image || ""} alt="User avatar" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/login" })} 
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer focus:text-red-500 focus:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
