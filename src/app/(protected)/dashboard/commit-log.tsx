"use client";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink, GitCommitHorizontal } from "lucide-react";
import Link from "next/link";
import useProject from "@/hooks/use-project";
import { formatDistanceToNow } from "date-fns";
import React from "react";

function renderSummaryLine(line: string) {
    const normalized = line.replace(/^\s*[-*]\s*/, "").trim();
    const regex = /\[([^\]]+)\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(normalized)) !== null) {
        const [fullMatch, fileName] = match;
        const start = match.index;

        if (start > lastIndex) {
            parts.push(
                <span key={`text-${start}`} className="text-zinc-300">
                    {normalized.slice(lastIndex, start)}
                </span>,
            );
        }

        parts.push(
            <span
                key={`file-${start}`}
                className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-100"
            >
                {fileName ?? fullMatch}
            </span>,
        );

        lastIndex = start + fullMatch.length;
    }

    if (lastIndex < normalized.length) {
        parts.push(
            <span key={`tail-${lastIndex}`} className="text-zinc-300">
                {normalized.slice(lastIndex)}
            </span>,
        );
    }

    return parts.length > 0 ? parts : [<span key="line">{normalized}</span>];
}

export default function CommitLog() {
    const { projectId, project } = useProject();
    const { data: commits } = api.project.getCommits.useQuery({ projectId });
    if (!commits) return null
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Commit History</h2>
                <p className="mt-1 text-sm text-zinc-500">Recent repository activity and AI changelog summaries.</p>
            </div>
            <ul role="list" className="space-y-4">
                {commits.map((commit, commitIdx) => (
                    <li key={commit.id} className="relative flex gap-x-4">
                        <div
                            className={cn(
                                commitIdx === commits.length - 1 ? "h-8" : "-bottom-8",
                                "absolute left-0 top-0 flex w-6 justify-center",
                            )}
                        >
                            <div className="w-px translate-x-1 bg-zinc-800/80" />
                        </div>
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={commit.commitAuthorAvatar}
                                alt=""
                                className="relative mt-4 h-8 w-8 flex-none rounded-full bg-zinc-900 ring-1 ring-zinc-800"
                            />
                            <div className="flex-auto rounded-xl border border-white/10 bg-zinc-900/40 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-colors duration-200 ease-out hover:bg-zinc-900/65">
                                <div className="flex items-start justify-between gap-x-4">
                                    <div className="min-w-0">
                                        <div className="mb-1.5 flex items-center gap-2">
                                            <GitCommitHorizontal className="h-4 w-4 shrink-0 text-zinc-500" />
                                            <p className="truncate text-base font-medium tracking-tight text-white">
                                                {commit.commitMessage}
                                            </p>
                                        </div>

                                        <Link
                                            target="_blank"
                                            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors duration-200 ease-out hover:text-zinc-300"
                                            href={`${project?.githubUrl}/commits/${commit.commitHash}`}
                                        >
                                            <span>{commit.commitAuthorName}</span>
                                            <span>·</span>
                                            <span className="font-mono text-xs text-zinc-500">
                                                {commit.commitHash.slice(0, 7)}
                                            </span>
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>

                                    <time
                                        dateTime={commit.commitDate.toString()}
                                        className="flex-none pt-0.5 text-sm text-zinc-500"
                                    >
                                        {formatDistanceToNow(commit.commitDate, {
                                            addSuffix: true,
                                        })}
                                    </time>
                                </div>

                                <div className="mt-3 space-y-2 text-sm leading-relaxed">
                                    {commit.summary
                                        .split("\n")
                                        .map((line) => line.trim())
                                        .filter(Boolean)
                                        .map((line, idx) => (
                                            <div key={`${commit.id}-${idx}`} className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                                                <p className="min-w-0 space-x-1">
                                                    {renderSummaryLine(line)}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    </li>
                ))}
            </ul>
        </>
    );
}
