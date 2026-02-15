'use client'
import MDEditor from '@uiw/react-md-editor';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { generate } from './action'
import { readStreamableValue } from 'ai/rsc'
import CodeReferences from './code-references';
import { DownloadIcon, Sparkles, Loader2, X } from 'lucide-react';
import { api } from '@/trpc/react';
import useProject from '@/hooks/use-project';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import useSmoothStream from '@/hooks/use-smooth-stream';

type Props = {}

const AskQuestionCard = (props: Props) => {
    const [open, setOpen] = React.useState(false)
    const [question, setQuestion] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const saveAnswer = api.question.saveAnswer.useMutation()
    const { projectId } = useProject()
    const answerContainerRef = React.useRef<HTMLDivElement>(null)
    const { displayedText, queuedChars, appendChunk, reset } = useSmoothStream(8)

    const [filesReferenced, setFilesReferenced] = React.useState<Awaited<ReturnType<typeof generate>>['filesReferenced']>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!projectId) return
        reset()
        setFilesReferenced([]) // Clear previous files
        e.preventDefault()
        setIsLoading(true)
        const { output, filesReferenced } = await generate(question, projectId)
        setOpen(true)
        // Don't set filesReferenced yet - wait until answer is done streaming
        for await (const delta of readStreamableValue(output)) {
            if (delta) {
                appendChunk(delta);
            }
        }
        setIsLoading(false)
        // Now show the code files AFTER the answer has finished streaming
        setFilesReferenced(filesReferenced)
    }

    React.useEffect(() => {
        if (!answerContainerRef.current) return
        answerContainerRef.current.scrollTo({
            top: answerContainerRef.current.scrollHeight,
            behavior: 'auto',
        })
    }, [displayedText])

    return (
        <>
            <Dialog open={open} onOpenChange={(open) => {
                setOpen(open)
                if (!open) {
                    setQuestion('')
                    reset()
                }
            }}>
                <DialogContent className='sm:max-w-[800px] w-full max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border border-white/10 bg-zinc-900/70 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl [&>button]:hidden'>
                    {/* Fixed Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-3.5 shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-zinc-900/70 shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                                <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-sm font-semibold tracking-tight text-zinc-100">Atlas AI</DialogTitle>
                                <p className="text-xs text-zinc-400">Code Analysis</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                size="sm"
                                disabled={saveAnswer.isPending || isLoading || queuedChars > 0 || !displayedText}
                                variant="outline"
                                onClick={() => {
                                    saveAnswer.mutate({
                                        projectId,
                                        question,
                                        answer: displayedText,
                                        filesReferenced
                                    }, {
                                        onSuccess: () => {
                                            toast.success('Answer saved successfully!')
                                        },
                                        onError: () => {
                                            toast.error('Failed to save answer')
                                        }
                                    })
                                }}
                                className="h-8 gap-2 rounded-md border border-zinc-200 bg-white px-3 text-black hover:bg-zinc-200"
                            >
                                {saveAnswer.isPending ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <DownloadIcon className="w-3.5 h-3.5" />
                                )}
                                Save
                            </Button>
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors duration-200 hover:bg-zinc-900 hover:text-zinc-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </DialogClose>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div
                        ref={answerContainerRef}
                        className="custom-scrollbar flex-1 overflow-y-auto pb-10"
                    >
                        {/* Question */}
                        <div className="border-b border-zinc-800 bg-zinc-950 px-5 py-4">
                            <div className="flex items-start gap-2.5">
                                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                                <div className="flex-1 min-w-0">
                                    <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">Question</p>
                                    <p className="text-sm tracking-tight leading-relaxed text-zinc-100">{question}</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="min-h-[400px]">
                            {/* Loading State */}
                            {isLoading && !displayedText && (
                                <div className="flex items-center gap-2.5 px-5 py-12 text-zinc-400">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Analyzing codebase...</span>
                                </div>
                            )}

                            {/* Answer - ALWAYS AT TOP */}
                            {displayedText && (
                                <div className="px-5 pt-5 pb-10">
                                    <div className={cn(
                                        "prose prose-sm max-w-none animate-fade-in text-zinc-100",
                                        (isLoading || queuedChars > 0) && "typing-cursor"
                                    )}>
                                        <div data-color-mode="dark">
                                            <MDEditor.Markdown
                                                source={displayedText}
                                                className='notion-markdown !bg-transparent'
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: 'inherit'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Code References - FOOTER (Only shows after streaming completes) */}
                            {filesReferenced.length > 0 && !isLoading && queuedChars === 0 && (
                                <div className="animate-fade-in border-t border-zinc-800 bg-zinc-950 px-5 py-6">
                                    <CodeReferences filesReferenced={filesReferenced} />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Ask Question Card */}
            <Card className="relative h-full min-h-[420px] rounded-2xl border border-white/10 bg-zinc-900/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-white/15 hover:bg-zinc-900/65 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                <CardHeader className="p-8 pb-4 md:p-10 md:pb-5">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-zinc-400" />
                        <CardTitle className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Ask a question</CardTitle>
                    </div>
                    <CardDescription className="max-w-3xl pt-2 text-base leading-relaxed text-zinc-400">
                        Atlas has deep knowledge of your codebase. Ask architectural, implementation, or onboarding questions and get context-aware answers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 md:px-10 md:pb-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Textarea
                            placeholder="Which file should I edit to change the home page?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="min-h-[220px] resize-none rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-base leading-relaxed text-zinc-100 placeholder:text-zinc-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-200 ease-out hover:bg-black/60 focus-visible:ring-1 focus-visible:ring-zinc-100 focus-visible:ring-offset-0"
                            disabled={isLoading}
                        />
                        <Button
                            isLoading={isLoading}
                            className="w-full gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-base font-semibold text-black hover:bg-zinc-200 sm:w-auto"
                            disabled={!question.trim()}
                        >
                            <Sparkles className="w-4 h-4" />
                            Ask Atlas
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AskQuestionCard
