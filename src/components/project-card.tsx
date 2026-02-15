"use client";

import Link from "next/link";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    githubUrl: string | null;
    updatedAt: Date;
    _count: {
      commits: number;
      questions: number;
      meetings: number;
    };
  };
  onOpen: (projectId: string) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <div className="glass-card p-6 transition-colors duration-200 hover:bg-zinc-900/55">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-black/60 text-zinc-300">
            <FolderGit2 className="h-4 w-4" />
          </div>
          <h3 className="truncate text-lg font-semibold tracking-tight text-zinc-100">
            {project.name}
          </h3>
        </div>
      </div>

      <div className="mb-5 min-h-6">
        {project.githubUrl ? (
          <Link
            href={project.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <span className="truncate max-w-[22ch]">{project.githubUrl}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <p className="text-sm text-zinc-500">No repository URL</p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-md border border-zinc-700 bg-black/60 px-3 py-2">
          <p className="text-zinc-500">Commits</p>
          <p className="font-medium text-zinc-100">{project._count.commits}</p>
        </div>
        <div className="rounded-md border border-zinc-700 bg-black/60 px-3 py-2">
          <p className="text-zinc-500">Q&A</p>
          <p className="font-medium text-zinc-100">{project._count.questions}</p>
        </div>
        <div className="rounded-md border border-zinc-700 bg-black/60 px-3 py-2">
          <p className="text-zinc-500">Meetings</p>
          <p className="font-medium text-zinc-100">{project._count.meetings}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Updated{" "}
          {formatDistanceToNow(new Date(project.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <Button
          size="sm"
          className="border border-zinc-200 bg-white text-black hover:bg-zinc-200"
          onClick={() => onOpen(project.id)}
        >
          Open
        </Button>
      </div>
    </div>
  );
}
