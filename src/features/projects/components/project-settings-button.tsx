"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectSettingsModal } from "./project-settings-modal";

interface ProjectSettingsButtonProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    workspaceId: string | null;
  };
  userRole: string;
  workspaces: { id: string; name: string }[];
}

export function ProjectSettingsButton({ project, userRole, workspaces }: ProjectSettingsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Settings className="w-4 h-4" />
        Settings
      </Button>

      {isOpen && (
        <ProjectSettingsModal 
          project={project} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          userRole={userRole}
          workspaces={workspaces}
        />
      )}
    </>
  );
}
