"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/app/actions/project-actions";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      startTransition(() => {
        deleteProject(projectId).catch(console.error);
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon-sm" 
      className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive z-10"
      onClick={handleDelete}
      disabled={isPending}
      title="Delete Project"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
