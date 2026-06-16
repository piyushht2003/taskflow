import { signOut } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/login";
  
  // This will clear the session cookie and redirect
  return await signOut({ redirectTo });
}
