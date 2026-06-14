"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/app/actions/profile-actions";
import { User } from "@prisma/client";

export function ProfileForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    startTransition(async () => {
      await updateProfile(name);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={user.name || ""} 
          placeholder="John Doe" 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          value={user.email || ""} 
          disabled 
          className="bg-secondary/50 cursor-not-allowed text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed since you are using Google Authentication.
        </p>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        {success && <span className="ml-4 text-sm text-emerald-500 font-medium">Profile updated!</span>}
      </div>
    </form>
  );
}
