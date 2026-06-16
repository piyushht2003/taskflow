"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWorkspace, setActiveWorkspace, deleteWorkspace } from "@/app/actions/workspace-actions";

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
}

import { useRouter } from "next/navigation";

export function WorkspaceSwitcher({ workspaces, activeWorkspaceId }: WorkspaceSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      const newWs = await createWorkspace(name);
      await setActiveWorkspace(newWs.id);
      setOpen(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create workspace");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelect(id: string) {
    if (id === activeWorkspaceId) return;
    await setActiveWorkspace(id);
    router.refresh();
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this workspace? All projects and tasks inside it will be permanently deleted!")) {
      try {
        await deleteWorkspace(id);
        router.refresh();
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "Failed to delete workspace");
      }
    }
  }

  const colors = ["bg-purple-500", "bg-blue-500", "bg-orange-500", "bg-emerald-500", "bg-pink-500"];

  return (
    <>
      <div className="space-y-1">
        {workspaces.map((ws, i) => {
          const isActive = ws.id === activeWorkspaceId;
          const color = colors[i % colors.length];
          return (
            <div
              key={ws.id}
              onClick={() => handleSelect(ws.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group ${
                isActive 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
              <span className="font-medium text-sm flex-1 truncate">{ws.name}</span>
              <button
                onClick={(e) => handleDelete(e, ws.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-all"
                title="Delete Workspace"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}
        
        {workspaces.length === 0 && (
          <p className="text-xs text-muted-foreground px-3 py-2 italic">No workspaces yet.</p>
        )}

        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-foreground mt-2"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium text-sm">New Workspace</span>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize your projects.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 pt-4">
            {error && <div className="text-sm text-destructive font-medium">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input id="name" name="name" placeholder="e.g. Marketing Team" required />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Workspace"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
