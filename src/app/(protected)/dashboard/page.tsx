'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
    const router = useRouter()

    return (
        <div className="mx-auto flex min-h-[78vh] w-full max-w-[1600px] items-center justify-center px-4 text-zinc-100 [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif] md:px-8">
            <section className="relative w-full max-w-6xl">
                <div className="pointer-events-none absolute inset-x-20 -top-16 h-56 rounded-full bg-gradient-to-r from-zinc-700/10 via-white/10 to-zinc-500/10 blur-3xl" />

                <div className="relative rounded-[2.25rem] border border-white/10 bg-zinc-900/30 px-8 py-16 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_rgba(0,0,0,0.65)] shadow-inner backdrop-blur-3xl md:px-16 md:py-24">
                    <h1
                        className="animate-fade-in bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-8xl font-bold tracking-[-0.06em] text-transparent md:text-9xl"
                        style={{ animationDelay: '0ms', animationFillMode: 'both' }}
                    >
                        Atlas
                    </h1>
                    <p
                        className="animate-fade-in mx-auto mt-6 max-w-3xl text-balance text-xl leading-relaxed text-zinc-400"
                        style={{ animationDelay: '100ms', animationFillMode: 'both' }}
                    >
                        Navigate your codebase with intelligence.
                    </p>
                    <p
                        className="animate-fade-in mx-auto mt-8 max-w-4xl text-balance text-xl font-medium leading-snug text-zinc-500 md:text-3xl"
                        style={{ animationDelay: '100ms', animationFillMode: 'both' }}
                    >
                        Atlas turns commits, meetings, and questions into a
                        <span className="text-zinc-300"> single intelligence layer </span>
                        for your engineering team.
                    </p>
                    <div
                        className="animate-fade-in mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
                        style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                    >
                    <Button
                        className="h-12 rounded-full border border-zinc-200 bg-white px-7 text-base font-semibold text-black transition-all duration-200 ease-out hover:scale-105 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        onClick={() => router.push('/create')}
                    >
                        Connect
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 rounded-full border border-white/25 bg-transparent px-7 text-base text-zinc-100 transition-all duration-200 ease-out hover:scale-105 hover:bg-white/5"
                        onClick={() => router.push('/projects')}
                    >
                        View Projects
                    </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage
