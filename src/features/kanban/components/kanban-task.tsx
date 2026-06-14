"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface KanbanTaskProps {
  task: Task & { assignee?: { name: string | null, image: string | null } | null };
  onClick?: () => void;
}

export function KanbanTask({ task, onClick }: KanbanTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 border-2 border-primary rounded-lg h-[120px] w-full"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab hover:ring-2 hover:ring-primary/50 rounded-lg touch-none"
      onClick={(e) => {
        // Prevent click if we are dragging (dnd-kit usually handles this, but just in case)
        if (!isDragging && onClick) {
          onClick();
        }
      }}
    >
      <Card className="bg-card border-border/50 shadow-sm cursor-pointer">
        <CardContent className="p-3">
          <p className="text-sm font-medium mb-2">{task.title}</p>
          <div className="flex items-center justify-between">
            <Badge variant={task.priority === "HIGH" || task.priority === "URGENT" ? "destructive" : task.priority === "MEDIUM" ? "default" : "secondary"} className="text-[10px]">
              {task.priority}
            </Badge>
            {task.assignee && (
              <Avatar className="w-6 h-6 border border-border">
                <AvatarImage src={task.assignee.image || ""} />
                <AvatarFallback className="text-[10px]">{task.assignee.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
