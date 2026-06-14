"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, FolderKanban, CheckSquare, Users, BarChart2, Calendar, Settings, Loader2 } from "lucide-react";
import { searchGlobal } from "@/app/actions/search-actions";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ tasks: any[], projects: any[] }>({ tasks: [], projects: [] });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResults({ tasks: [], projects: [] });
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        searchGlobal(query).then(setResults);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div className="md:hidden">
        <button onClick={() => setOpen(true)} className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="relative w-64 lg:w-96 hidden md:block">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center w-full rounded-md border border-border/50 bg-secondary/30 px-3 h-10 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Search className="w-4 h-4 mr-2" />
          <span>Search...</span>
          <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a command or search..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isPending ? <div className="flex items-center justify-center p-4"><Loader2 className="h-4 w-4 animate-spin mr-2" /> Searching...</div> : "No results found."}
          </CommandEmpty>
          
          {results.projects.length > 0 && (
            <CommandGroup heading="Projects">
              {results.projects.map((project) => (
                <CommandItem key={`project-${project.id}`} onSelect={() => runCommand(() => router.push(`/projects/${project.id}/board`))}>
                  <FolderKanban className="mr-2 w-4 h-4" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.tasks.length > 0 && (
            <CommandGroup heading="Tasks">
              {results.tasks.map((task) => (
                <CommandItem key={`task-${task.id}`} onSelect={() => runCommand(() => router.push(`/projects/${task.projectId}/board`))}>
                  <CheckSquare className="mr-2 w-4 h-4" />
                  <span>{task.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!query && (
            <>
              <CommandGroup heading="Quick Links">
                <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                  <LayoutDashboard className="mr-2 w-4 h-4" />
                  <span>Dashboard</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
                  <FolderKanban className="mr-2 w-4 h-4" />
                  <span>Projects</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/tasks"))}>
                  <CheckSquare className="mr-2 w-4 h-4" />
                  <span>Tasks</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/team"))}>
                  <Users className="mr-2 w-4 h-4" />
                  <span>Team</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
                  <BarChart2 className="mr-2 w-4 h-4" />
                  <span>Analytics</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/calendar"))}>
                  <Calendar className="mr-2 w-4 h-4" />
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                  <Settings className="mr-2 w-4 h-4" />
                  <span>Profile Settings</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
