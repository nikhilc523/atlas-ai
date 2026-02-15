"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import AskQuestionCard from "../../dashboard/ask-question-card";
import CommitLog from "../../dashboard/commit-log";
import MeetingCard from "../../dashboard/meeting-card";
import TeamMembers from "../../dashboard/team-members";

export default function ProjectOverviewClient() {
  const { project } = useProject();

  return (
    <div className="relative mx-auto w-full max-w-[1500px] text-zinc-100 antialiased subpixel-antialiased [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif]">
      <div className="glass-ambient left-[16%] top-2" />
      <section className="grid grid-cols-1 items-stretch gap-8 xl:grid-cols-3">
        <div className="xl:col-span-3 rounded-2xl border border-white/10 bg-zinc-900/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-white/15 hover:bg-zinc-900/55">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 rounded-xl border border-zinc-700 bg-black/60 px-5 py-4">
              <div className="flex items-start gap-2.5">
                <Github className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    Repository
                  </p>
                  <p className="mt-1 text-base font-medium tracking-tight leading-relaxed text-zinc-100">
                    Linked project:
                    <Link
                      className="ml-1.5 inline-flex max-w-full items-center gap-1 truncate text-zinc-300 transition-colors duration-200 ease-out hover:text-zinc-100 hover:underline"
                      href={project?.githubUrl ?? ""}
                    >
                      <span className="truncate">{project?.githubUrl}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <TeamMembers />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <AskQuestionCard />
        </div>
        <div className="xl:col-span-1">
          <MeetingCard />
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-white/10 bg-zinc-900/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-white/15 hover:bg-zinc-900/55 md:p-10">
          <CommitLog />
        </div>
      </section>
    </div>
  );
}
