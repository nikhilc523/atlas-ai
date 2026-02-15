"use client";

import CommitLog from "../dashboard/commit-log";

export default function CommitsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] rounded-2xl border border-zinc-800 bg-zinc-950 p-8 md:p-10">
      <CommitLog />
    </div>
  );
}

