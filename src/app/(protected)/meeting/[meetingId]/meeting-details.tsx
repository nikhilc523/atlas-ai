'use client'
import { api } from '@/trpc/react'
import { Loader2, Presentation } from 'lucide-react'
import React from 'react'
import IssueCard from './issue-card'
import CopyButton from './copy-button'

type Props = {
    meetingId: string
}

const MeetingDetails = ({ meetingId }: Props) => {
    const { data: meeting, isLoading } = api.meeting.getMeetingDetails.useQuery({ meetingId })
    if (isLoading || !meeting) return <div><Loader2 className='animate-spin text-zinc-300' /></div>
    return (
        <>
            <div className="space-y-4 p-8 text-zinc-100">
                <div className="glass-card mx-auto flex max-w-2xl items-center justify-between gap-x-8 p-6 lg:mx-0 lg:max-w-none">
                    <div className="flex items-center gap-x-6">
                        <div className="rounded-full border border-zinc-700 bg-zinc-900 p-3">
                            <Presentation className="h-7 w-7 text-zinc-100" />
                        </div>
                        <h1>
                            <div className="text-sm leading-6 text-zinc-500">
                                Meeting on{" "}
                                <span className="text-zinc-300">
                                    {meeting.createdAt.toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-1 text-base font-semibold leading-6 text-zinc-100">
                                {meeting.name}
                            </div>
                        </h1>
                    </div>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">
                        <CopyButton />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {meeting.issues.map((issue) => {
                        return <IssueCard issue={issue} key={issue.id} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default MeetingDetails
