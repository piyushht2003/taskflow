"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  dueDate: Date | null;
  status: string;
  priority: string;
}

export function CalendarView({ tasks }: { tasks: Task[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const startingDayIndex = getDay(firstDayOfMonth); // 0 = Sunday

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), date));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
      case "URGENT": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "MEDIUM": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default: return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border/50">
        <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-card rounded-lg border border-border/50 overflow-hidden flex flex-col">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-border/50 bg-secondary/30">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 auto-rows-fr">
          {/* Empty padding days */}
          {Array.from({ length: startingDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-border/50 bg-secondary/10 p-2" />
          ))}

          {/* Actual days */}
          {daysInMonth.map((day, i) => {
            const dayTasks = getTasksForDay(day);
            return (
              <div 
                key={day.toISOString()} 
                className={`border-border/50 p-2 overflow-y-auto ${i % 7 !== 6 ? 'border-r' : ''} ${Math.floor((i + startingDayIndex) / 7) !== 4 ? 'border-b' : ''} ${isToday(day) ? 'bg-primary/5' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    {format(day, "d")}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[10px] font-bold text-muted-foreground">{dayTasks.length} tasks</span>
                  )}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div key={task.id} className="text-xs truncate bg-background border border-border/50 rounded px-2 py-1 cursor-pointer hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${task.priority === "HIGH" ? "bg-red-500" : task.priority === "MEDIUM" ? "bg-orange-500" : "bg-emerald-500"}`} />
                        <span className={task.status === "COMPLETED" ? "line-through opacity-50" : ""}>{task.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
