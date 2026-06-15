"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/actions/auth"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("DEVELOPER")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await registerUser(formData)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (signInRes?.error) {
        setError("Account created, but failed to log in automatically.")
        setIsLoading(false)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create an account
        </h1>
        <p className="text-sm text-neutral-400">
          Enter your details below to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-white flex items-center gap-2">
            <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Demo Mode</span>
            Account Role
          </Label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="DEVELOPER">Developer (Basic Access)</option>
            <option value="MANAGER">Manager (Can Create Projects)</option>
            <option value="ADMIN">Admin (Full System Access)</option>
          </select>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-neutral-900 px-2 text-neutral-400">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-white"
        onClick={() => {
          document.cookie = `pending_role=${role}; path=/; max-age=3600;`;
          signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </Button>

      <div className="text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
