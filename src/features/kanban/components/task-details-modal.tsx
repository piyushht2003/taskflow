"use client";

import { useState, useEffect, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task, Comment } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Paperclip, MessageSquare, Check } from "lucide-react";
import { format } from "date-fns";
import { FileUpload } from "@/components/ui/file-upload";
import { updateTaskDetails, addComment, getAssignableUsers } from "@/app/actions/task-actions";
import { Button } from "@/components/ui/button";

type TaskWithDetails = Task & { 
  assignee?: { name: string | null, image: string | null } | null;
  comments?: (Comment & { user: { name: string | null, image: string | null } })[];
};

interface TaskDetailsModalProps {
  task: TaskWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  currentUserId?: string;
  onTaskUpdate?: () => void;
}

export function TaskDetailsModal({ task, isOpen, onClose, userRole, currentUserId, onTaskUpdate }: TaskDetailsModalProps) {
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState<any[]>([]);
  
  // Local state for optimistic updates
  const [description, setDescription] = useState(task?.description || "");
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [timeToLog, setTimeToLog] = useState("");
  const [localAttachments, setLocalAttachments] = useState<string[]>([]);

  const formatTime = (minutes: number) => {
    if (!minutes) return "0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ""}${m}m`;
  };

  useEffect(() => {
    if (task) {
      setDescription(task.description || "");
      try {
        setLocalAttachments(JSON.parse(task.attachments || "[]"));
      } catch(e) {
        setLocalAttachments([]);
      }
    }
  }, [task]);

  useEffect(() => {
    if (isOpen) {
      getAssignableUsers().then(setUsers).catch(console.error);
    }
  }, [isOpen]);

  if (!task) return null;

  const handleSaveDescription = () => {
    if (description === task.description) {
      setIsEditingDesc(false);
      return;
    }
    startTransition(() => {
      updateTaskDetails(task.id, { description }).then(() => onTaskUpdate?.());
      setIsEditingDesc(false);
    });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    startTransition(() => {
      updateTaskDetails(task.id, { assigneeId: val === "UNASSIGNED" ? null : val }).then(() => onTaskUpdate?.());
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    startTransition(() => {
      updateTaskDetails(task.id, { dueDate: val ? new Date(val) : null }).then(() => onTaskUpdate?.());
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    startTransition(() => {
      addComment(task.id, commentText).then(() => onTaskUpdate?.());
      setCommentText("");
    });
  };

  const handleAcceptTask = () => {
    startTransition(() => {
      import("@/app/actions/task-actions").then((m) => m.updateTaskStatus(task.id, "IN_PROGRESS").then(() => onTaskUpdate?.()));
      onClose();
    });
  };

  const handleRejectTask = () => {
    startTransition(() => {
      updateTaskDetails(task.id, { assigneeId: null });
      import("@/app/actions/task-actions").then((m) => m.updateTaskStatus(task.id, "TODO").then(() => onTaskUpdate?.()));
      onClose();
    });
  };

  const handleCompleteTask = () => {
    startTransition(() => {
      import("@/app/actions/task-actions").then((m) => m.updateTaskStatus(task.id, "COMPLETED").then(() => onTaskUpdate?.()));
      onClose();
    });
  };

  const handleLogTime = () => {
    const mins = parseInt(timeToLog);
    if (!mins || isNaN(mins) || mins <= 0) return;
    startTransition(() => {
      import("@/app/actions/task-actions").then((m) => m.logTime(task.id, mins).then(() => onTaskUpdate?.()));
      setTimeToLog("");
    });
  };

  const handleUpload = (url: string) => {
    const newAttachments = [...localAttachments, url];
    setLocalAttachments(newAttachments); // Optimistic UI update
    const updated = JSON.stringify(newAttachments);
    startTransition(() => {
      updateTaskDetails(task.id, { attachments: updated }).then(() => onTaskUpdate?.());
    });
  };

  const isAssignedToMe = task.assigneeId === currentUserId;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[750px] bg-background border-border/50 p-0 overflow-hidden">
        <div className="flex h-[650px] flex-col sm:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 border-r border-border/50">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={task.priority === "HIGH" || task.priority === "URGENT" ? "destructive" : task.priority === "MEDIUM" ? "default" : "secondary"}>
                  {task.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">in <span className="font-medium text-foreground">{task.status.replace("_", " ")}</span></span>
              </div>
              <DialogTitle className="text-2xl font-bold leading-tight">{task.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Description</h3>
                {isEditingDesc ? (
                  <div className="space-y-2">
                    <textarea 
                      autoFocus
                      className="w-full min-h-[120px] bg-secondary/30 border border-primary/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveDescription} disabled={isPending}>Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDescription(task.description || ""); setIsEditingDesc(false); }}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="text-sm text-muted-foreground bg-secondary/10 p-4 rounded-lg border border-border/50 min-h-[100px] cursor-pointer hover:bg-secondary/20 transition-colors"
                    onClick={() => setIsEditingDesc(true)}
                  >
                    {description || "Add a more detailed description..."}
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">Attachments</h3>
                </div>
                <div className="space-y-3 mb-3">
                  {localAttachments.length > 0 ? (
                    localAttachments.map((att: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                        <Paperclip className="w-4 h-4 text-muted-foreground shrink-0" />
                        <a href={att} target="_blank" rel="noreferrer" className="text-sm font-medium flex-1 truncate hover:underline text-blue-400">
                          {att.split('/').pop()}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No attachments yet.</p>
                  )}
                </div>
                <FileUpload onUpload={handleUpload} />
              </div>

              {/* Comments History */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Activity & Comments</h3>
                
                <div className="space-y-4 mb-6">
                  {task.comments && task.comments.length > 0 ? (
                    task.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.user.image || ""} />
                          <AvatarFallback>{comment.user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "MMM d, h:mm a")}</span>
                          </div>
                          <div className="text-sm text-foreground bg-secondary/10 p-3 rounded-lg border border-border/50 inline-block">
                            {comment.content}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No comments yet.</p>
                  )}
                </div>

                {/* Comment Input */}
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>Me</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea 
                        className="w-full min-h-[80px] bg-secondary/30 border border-border/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-12"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="absolute bottom-2 right-2">
                        <button 
                          onClick={handleAddComment}
                          disabled={isPending || !commentText.trim()}
                          className="bg-primary text-primary-foreground p-1.5 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full sm:w-[240px] bg-secondary/10 p-6 flex flex-col gap-6 shrink-0 border-t sm:border-t-0 sm:border-l border-border/50">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Status</h4>
              <Badge variant="outline" className="w-full justify-center py-1.5 bg-background border-border/50 text-foreground mb-3">
                {task.status.replace("_", " ")}
              </Badge>
              
              {isAssignedToMe && (
                <div className="space-y-2">
                  {(task.status === "TODO" || task.status === "BACKLOG") && (
                    <>
                      <Button onClick={handleAcceptTask} disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        Accept Task
                      </Button>
                      <Button onClick={handleRejectTask} disabled={isPending} variant="outline" className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10">
                        Reject Task
                      </Button>
                    </>
                  )}
                  {(task.status === "IN_PROGRESS" || task.status === "REVIEW") && (
                    <Button onClick={handleCompleteTask} disabled={isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md gap-2">
                      <Check className="w-4 h-4" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Assignee</h4>
              <select 
                className="w-full bg-background border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                value={task.assigneeId || "UNASSIGNED"}
                onChange={handleAssigneeChange}
                disabled={isPending || userRole === "DEVELOPER"}
              >
                <option value="UNASSIGNED">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role.toLowerCase()})</option>
                ))}
              </select>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Due Date</h4>
              <input 
                type="date" 
                className="w-full bg-background border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""}
                onChange={handleDateChange}
                disabled={isPending}
              />
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Time Tracking</h4>
              <div className="flex items-center gap-3 text-sm font-medium text-foreground mb-3 bg-background p-2 rounded-md border border-border/50">
                <Clock className="w-4 h-4 text-blue-500" />
                {/* @ts-ignore - loggedTime exists after prisma generation */}
                <span className="font-bold">{formatTime(task.loggedTime || 0)}</span> <span className="text-muted-foreground font-normal">logged</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min="1"
                  placeholder="Minutes" 
                  className="w-full bg-background border border-border/50 rounded-md p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={timeToLog}
                  onChange={(e) => setTimeToLog(e.target.value)}
                  disabled={isPending}
                />
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="text-xs px-3"
                  onClick={handleLogTime}
                  disabled={isPending || !timeToLog}
                >
                  Log
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 mt-auto flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Created {format(new Date(task.createdAt), "MMM d, yyyy")}
              </p>
              {userRole !== "DEVELOPER" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs"
                  disabled={isPending}
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this task?")) {
                      startTransition(() => {
                        import("@/app/actions/task-actions").then((m) => m.deleteTask(task.id).then(() => onTaskUpdate?.()));
                        onClose();
                      });
                    }
                  }}
                >
                  Delete Task
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
