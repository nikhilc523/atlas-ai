'use client'

import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function ArchiveButton() {
    const archiveProject = api.project.archiveProject.useMutation();
    const { project } = useProject();
    const refetch = useRefetch()
    return <Button variant={'outline'} className="rounded-md border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900" isLoading={archiveProject.isPending} onClick={() => {
        const confirmed = window.confirm('Are you sure you want to archive this project?');
        if (!confirmed) return;
        archiveProject.mutate({ projectId: project?.id ?? '' }, {
            onSuccess: () => {
                toast.success('Project archived successfully');
                refetch()
            },
            onError: () => {
                toast.error('Failed to archive project');
            },
        })
    }}>Archive</Button>
}   
