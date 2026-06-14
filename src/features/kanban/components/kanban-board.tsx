"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragStartEvent, 
  DragOverEvent, 
  DragEndEvent 
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Task } from "@prisma/client";
import { TaskStatus } from "@/types";
import { KanbanColumn } from "./kanban-column";
import { KanbanTask } from "./kanban-task";
import { TaskDetailsModal } from "./task-details-modal";
import { updateTaskStatus } from "@/app/actions/task-actions";
import { useSocket } from "@/components/providers/socket-provider";

const COLUMNS = [
  { id: "BACKLOG" as TaskStatus, title: "Backlog" },
  { id: "TODO" as TaskStatus, title: "Todo" },
  { id: "IN_PROGRESS" as TaskStatus, title: "In Progress" },
  { id: "REVIEW" as TaskStatus, title: "Review" },
  { id: "COMPLETED" as TaskStatus, title: "Completed" },
];

interface KanbanBoardProps {
  initialTasks: (Task & { assignee?: { name: string | null, image: string | null } | null })[];
  projectId: string;
  userRole: string;
  currentUserId: string;
}

export function KanbanBoard({ initialTasks, projectId, userRole, currentUserId }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<typeof initialTasks[0] | null>(null);
  const [selectedTask, setSelectedTask] = useState<typeof initialTasks[0] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  useEffect(() => {
    setTasks(initialTasks);
    if (selectedTask) {
      const updated = initialTasks.find(t => t.id === selectedTask.id);
      if (updated) setSelectedTask(updated);
    }
  }, [initialTasks]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit("join-project", projectId);

    socket.on("task-moved", (data: { taskId: string, newStatus: TaskStatus }) => {
      setTasks((prev) => 
        prev.map((t) => t.id === data.taskId ? { ...t, status: data.newStatus } : t)
      );
    });

    socket.on("task-updated", () => {
      router.refresh();
    });

    return () => {
      socket.emit("leave-project", projectId);
      socket.off("task-moved");
      socket.off("task-updated");
    };
  }, [socket, isConnected, projectId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          const newTasks = [...tasks];
          newTasks[activeIndex].status = tasks[overIndex].status;
          return newTasks;
        }

        return tasks;
      });
    }

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newTasks = [...tasks];
        newTasks[activeIndex].status = overId as TaskStatus;
        return newTasks;
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const task = tasks.find((t) => t.id === activeId);
    if (!task) return;

    const overId = over.id;
    const isOverColumn = over.data.current?.type === "Column";
    const isOverTask = over.data.current?.type === "Task";

    let targetStatus = task.status;

    if (isOverColumn) {
      targetStatus = overId as TaskStatus;
    } else if (isOverTask) {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) targetStatus = overTask.status;
    }

    if (targetStatus !== task.status) {
      // Emit to socket
      if (socket && isConnected) {
        socket.emit("task-moved", { projectId, taskId: task.id, newStatus: targetStatus });
      }
      
      // Server Action
      startTransition(() => {
        updateTaskStatus(task.id, targetStatus as TaskStatus);
      });
    }
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        Loading board...
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full w-full gap-6 overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {COLUMNS.map((col) => (
            <KanbanColumn 
              key={col.id} 
              column={col} 
              tasks={tasks.filter((t) => t.status === col.id)} 
              onTaskClick={(task) => setSelectedTask(task)}
            />
          ))}

          <DragOverlay>
            {activeTask ? <KanbanTask task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskDetailsModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        task={selectedTask} 
        userRole={userRole}
        currentUserId={currentUserId}
        onTaskUpdate={() => {
          if (socket && isConnected) {
            socket.emit("task-updated", projectId);
          }
        }}
      />
    </>
  );
}
