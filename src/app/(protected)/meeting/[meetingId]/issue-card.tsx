'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api, RouterOutputs } from '@/trpc/react'
import React from 'react'
import { toast } from 'sonner'
import { askMeeting } from '../../meetings/action'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from '@uiw/react-md-editor'

type Props = {
    issue: NonNullable<RouterOutputs['meeting']['getMeetingDetails']>['issues'][number]
}

const IssueCard = ({ issue }: Props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const askIssue = api.meeting.askIssue.useMutation();


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setAnswer("")
        const { output } = await askMeeting(query, issue.summary ?? "", issue.meetingId);
        for await (const delta of readStreamableValue(output)) {
            if (delta) {
                setAnswer(prev => prev + delta);
            }
        }
        setIsLoading(false)
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100">
                    <DialogTitle className="tracking-tight text-zinc-100">{issue.gist}</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        {issue.createdAt.toDateString()}
                    </DialogDescription>
                    <p className="text-zinc-400">{issue.headline}</p>
                    <blockquote className="mt-2 rounded-md border-l-2 border-zinc-700 bg-black/70 p-4">
                        <span className="text-sm text-zinc-500">
                            {issue.start} - {issue.end}
                        </span>
                        <p className="font-medium italic leading-relaxed text-zinc-100">
                            {issue.summary}
                        </p>
                    </blockquote>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div>
                            <Label className="text-zinc-300">Ask for further clarification...</Label>
                            <Input
                                className="mt-1 border-zinc-800 bg-black/70 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-100"
                                placeholder="What did you mean by..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <span className="text-xs text-zinc-500">
                                Atlas has context about this issue and the meeting
                            </span>
                            {answer && (
                                <>
                                    <p className="mt-2 text-xs font-semibold text-zinc-300">Answer</p>
                                    <MDEditor.Markdown source={answer} className='custom-scrollbar flex-1 w-full !h-full max-h-[40vh] overflow-scroll rounded-md border border-zinc-800 bg-black/70 p-3 custom-ref' />
                                </>
                            )}
                        </div>
                        <Button isLoading={isLoading} className="mt-3 w-full border border-zinc-200 bg-white text-black hover:bg-zinc-200">
                            Ask Question
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Card className="glass-card relative min-h-[210px]">
                <CardHeader>
                    <CardTitle className="text-xl tracking-tight text-zinc-100">{issue.gist}</CardTitle>
                    <div className="border-b border-zinc-800"></div>
                    <CardDescription className="text-zinc-400">{issue.headline}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-4"></div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="absolute bottom-4 left-4 border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    >
                        Details
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default IssueCard
