'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import MDEditor from "@uiw/react-md-editor"
import React from 'react'
import CodeReferences from "../dashboard/code-references"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Loader2 } from "lucide-react"

const QuestionList = () => {
  const { projectId } = useProject()
  const { data: questions, isLoading } = api.question.getAllQuestions.useQuery(
    { projectId },
    { enabled: !!projectId }
  )
  const [questionIdx, setQuestionIdx] = React.useState(0)
  const question = questions?.[questionIdx]

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin text-zinc-300" />
      </div>
    )
  }

  return (
    <Sheet>
      <div className="space-y-6">
        <header className="glass-card p-8 md:p-10">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Q&A Archive</h1>
          <p className="mt-2 text-base leading-relaxed text-zinc-400 md:text-lg">
            View and manage your saved AI conversations across all projects.
          </p>
        </header>

        <section className="glass-card p-4 md:p-6">
          {!questions?.length && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
              <p className="text-lg font-medium text-zinc-100">No saved questions yet</p>
              <p className="mt-2 text-sm text-zinc-400">
                Ask Atlas from a project details page to build your archive.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2">
            {questions?.map((q, idx) => (
              <React.Fragment key={q.id}>
                <SheetTrigger onClick={() => setQuestionIdx(idx)}>
                  <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 transition-colors duration-200 hover:bg-zinc-900/55">
                    <Image src={q.user.imageUrl ?? '/default-avatar.png'} alt="Avatar" width={30} height={30} className="rounded-full ring-1 ring-zinc-700" />

                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <p className="line-clamp-1 text-lg font-medium text-zinc-100">{q.question}</p>
                        <span className="whitespace-nowrap text-xs text-zinc-500">
                          {formatDistanceToNow(q.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-sm text-zinc-400">{q.answer}</p>
                    </div>
                  </div>
                </SheetTrigger>
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      {question && (
        <SheetContent className="!inset-y-auto !top-[7.5vh] !h-[85vh] sm:max-w-[80vw] border-zinc-800 bg-black text-zinc-100 [&>button]:hidden">
          <div className="flex h-full min-h-0 flex-col">
            <SheetHeader className="shrink-0 space-y-2 border-b border-zinc-800 px-1 pb-4">
              <SheetTitle className="text-zinc-100">{question.question}</SheetTitle>
              <SheetDescription className="text-zinc-400">
                {formatDistanceToNow(question.createdAt, { addSuffix: true })}
              </SheetDescription>
            </SheetHeader>

            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <div data-color-mode="dark">
                  <MDEditor.Markdown
                    source={question.answer}
                    className='notion-markdown custom-ref !bg-transparent text-zinc-100'
                    style={{ backgroundColor: 'transparent', color: 'inherit' }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <CodeReferences filesReferenced={(question.filesReferenced ?? []) as any} />
              </div>
            </div>
          </div>
        </SheetContent>
      )}
    </Sheet>
  )
}

export default QuestionList
