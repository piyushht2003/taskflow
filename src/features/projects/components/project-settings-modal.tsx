"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateProject, deleteProject } from "@/app/actions/project-actions";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";

interface ProjectSettingsModalProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    workspaceId: string | null;
  };
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  workspaces: { id: string; name: string }[];
}

export function ProjectSettingsModal({ project, isOpen, onClose, userRole, workspaces }: ProjectSettingsModalProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [deadline, setDeadline] = useState(project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "");
  const [workspaceId, setWorkspaceId] = useState(project.workspaceId || "none");

  const handleSave = () => {
    if (!title.trim()) return;
    startTransition(() => {
      updateProject(project.id, {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
        workspaceId: workspaceId === "none" ? null : workspaceId
      }).then(() => {
        onClose();
        router.refresh();
      }).catch((e) => alert(e.message));
    });
  };

  const handleDelete = () => {
    if (confirm("Are you absolutely sure you want to delete this project? All tasks inside will be lost forever.")) {
      startTransition(() => {
        deleteProject(project.id).then(() => {
          router.push("/dashboard");
        }).catch((e) => alert(e.message));
      });
    }
  };

  const isDeveloper = userRole === "DEVELOPER";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>Manage your project details and preferences.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Title</label>
            <input 
              type="text" 
              className="w-full bg-secondary/30 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending || isDeveloper}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              className="w-full min-h-[80px] bg-secondary/30 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending || isDeveloper}
              placeholder="Optional description..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace</label>
            <select
              className="w-full bg-secondary/30 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              disabled={isPending || isDeveloper}
            >
              <option value="none">No Workspace (Unassigned)</option>
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deadline</label>
            <input 
              type="date" 
              className="w-full bg-secondary/30 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              disabled={isPending || isDeveloper}
            />
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-border/50 pt-4 mt-2">
          {isDeveloper ? (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-yellow-500" /> Only Managers can edit projects.
            </p>
          ) : (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDelete} 
              disabled={isPending}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete Project
            </Button>
          )}

          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isPending}>Cancel</Button>
            {!isDeveloper && (
              <Button size="sm" onClick={handleSave} disabled={isPending || !title.trim()}>Save Changes</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
