'use client'
import useProject from '@/hooks/use-project'
import React from 'react'
import MeetingCard from '../dashboard/meeting-card'
import { api } from '@/trpc/react'
import Link from 'next/link'
import DeleteMeetingButton from './delete-meeting-button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'


const MeetingsPage = () => {
    const { project } = useProject()
    const { data: meetings, isLoading } = api.project.getAllMeetings.useQuery(
        { projectId: project?.id ?? '' },
        {
            refetchInterval: 4000,
            enabled: !!project?.id,
        }
    )
    return (
        <>
            <MeetingCard />
            <div className="h-6"></div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">All Meetings</h1>
            {meetings && meetings.length === 0 && (
                <div className="glass-card rounded-xl p-4 text-sm text-zinc-300">
                    No meetings yet. Upload your first recording above to generate summaries and issues.
                </div>
            )}
            {isLoading && (
                <div className="mt-4">
                    <Loader2 className="animate-spin" />
                </div>
            )}
            <ul role="list" className="glass-card divide-y divide-zinc-800/80 overflow-hidden rounded-2xl">
                {meetings?.map((meeting) => (
                    <li
                        key={meeting.id}
                        className="flex items-center justify-between gap-x-6 px-4 py-5 transition-colors duration-200 hover:bg-zinc-900/45 md:px-6"
                    >
                        <div className="flex items-center gap-2">
                            {meeting.createdBy && (
                                <Image src={meeting.createdBy.imageUrl ?? '/default-avatar.png'} alt="Avatar" width={30} height={30} className="rounded-full ring-1 ring-zinc-800" />
                            )}
                            <div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-x-3">
                                        <Link
                                            aria-disabled={meeting.status === "PROCESSING"}
                                            href={`/meeting/${meeting.id}`}
                                            className={cn("text-sm font-semibold leading-6 text-zinc-100 hover:underline", meeting.status === "PROCESSING" && "opacity-50 pointer-events-none cursor-not-allowed")}
                                        >
                                            {meeting.name}
                                        </Link>
                                        {meeting.status === "PROCESSING" && (
                                            <Badge className='border border-zinc-700 bg-zinc-900 text-zinc-100'>
                                                Processing <Loader2 className='animate-spin size-3 ml-1' />
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2 text-xs leading-5 text-zinc-400">
                                    <p className="whitespace-nowrap">
                                        <time dateTime={meeting.createdAt.toLocaleDateString()}>
                                            {meeting.createdAt.toLocaleDateString()}
                                        </time>
                                    </p>
                                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                        <circle cx={1} cy={1} r={1} />
                                    </svg>
                                    <p className="truncate">{meeting.issues.length} issues</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center flex-none gap-x-4">
                            <Link
                                aria-disabled={meeting.status === "PROCESSING"}
                                href={`/meeting/${meeting.id}`}
                                className={cn("hidden rounded-md border border-zinc-700 bg-zinc-900/60 px-2.5 py-1.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-800/80 sm:block", meeting.status === "PROCESSING" && "opacity-50 pointer-events-none cursor-not-allowed")}
                            >
                                View meeting
                            </Link>
                            <DeleteMeetingButton meetingId={meeting.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MeetingsPage
