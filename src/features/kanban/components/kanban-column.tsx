"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@prisma/client";
import { TaskStatus } from "@/types";
import { KanbanTask } from "./kanban-task";

interface KanbanColumnProps {
  column: {
    id: TaskStatus;
    title: string;
  };
  tasks: (Task & { assignee?: { name: string | null, image: string | null } | null })[];
  onTaskClick?: (task: Task & { assignee?: { name: string | null, image: string | null } | null }) => void;
}

export function KanbanColumn({ column, tasks, onTaskClick }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div className="flex flex-col bg-secondary/20 rounded-xl border border-border/50 w-[300px] shrink-0 h-full max-h-full overflow-hidden">
      <div className="p-3 font-semibold text-sm flex items-center justify-between border-b border-border/50 bg-background/50">
        <div className="flex items-center gap-2">
          <span>{column.title}</span>
          <span className="text-muted-foreground text-xs">{tasks.length}</span>
        </div>
      </div>
      
      <div 
        ref={setNodeRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-3"
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} onClick={() => onTaskClick && onTaskClick(task)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
