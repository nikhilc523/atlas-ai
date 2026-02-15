"use client";

import { api } from "@/trpc/react";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export default function ProjectsPage() {
  const router = useRouter();
  const [, setProjectId] = useLocalStorage("d-projectId", "");
  const { data: projects, isLoading } = api.project.getProjectSummaries.useQuery();

  const handleOpenProject = (id: string) => {
    setProjectId(id);
    router.push(`/project/${id}`);
  };

  return (
    <div className="relative mx-auto w-full max-w-[1500px] space-y-8 text-zinc-100 [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="glass-ambient left-[18%] top-2" />
      <section className="glass-card float-in flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-white md:text-6xl">Projects</h1>
          <p className="mt-2 text-base text-zinc-400 md:text-lg">
            Choose a project to view commits, questions, and meetings.
          </p>
        </div>
        <Button
          className="h-11 border border-zinc-200 bg-white px-6 text-black hover:bg-zinc-200"
          onClick={() => router.push("/create")}
        >
          Connect Project
        </Button>
      </section>

      <section className="space-y-5">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="glass-card h-64 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && (!projects || projects.length === 0) && (
          <div className="glass-card p-10 text-center">
            <FolderPlus className="mx-auto mb-3 h-8 w-8 text-zinc-500" />
            <p className="text-lg text-zinc-300">No projects yet</p>
            <p className="mt-1 text-zinc-500">Create your first project to begin exploring your codebase.</p>
            <Button
              className="mt-5 border border-zinc-200 bg-white text-black hover:bg-zinc-200"
              onClick={() => router.push("/create")}
            >
              Create Project
            </Button>
          </div>
        )}

        {!!projects?.length && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={handleOpenProject} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
