import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProjects } from "@/app/actions/project-actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FolderKanban, CheckSquare, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { CreateProjectButton } from "./create-project-button";
import { DeleteProjectButton } from "./delete-project-button";
import { getMyWorkspaces } from "@/app/actions/workspace-actions";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const projects = await getProjects();
  const workspaces = await getMyWorkspaces();
  const canCreate = session.user.role === "ADMIN" || session.user.role === "MANAGER";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and access all your workspaces.</p>
        </div>
        {canCreate && <CreateProjectButton workspaces={workspaces} />}
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-card/50 text-center">
          <FolderKanban className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No projects found</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-md">
            Get started by creating a new project to organize your team&apos;s tasks and workflows.
          </p>
          {canCreate && <CreateProjectButton workspaces={workspaces} />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}/board`} className="block">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col group bg-card relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2 min-h-[40px]">
                        {project.description || "No description provided."}
                      </CardDescription>
                    </div>
                    {canCreate && (
                      <div className="absolute top-4 right-4">
                        <DeleteProjectButton projectId={project.id} />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckSquare className="w-4 h-4" />
                      <span>{project._count.tasks} tasks total</span>
                    </div>
                    {project.deadline && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/50 pt-4 bg-secondary/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border border-border">
                      <AvatarImage src={project.owner.image || ""} />
                      <AvatarFallback className="text-[10px]">{project.owner.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Managed by <span className="font-medium text-foreground">{project.owner.name}</span>
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    Active
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
