'use client'
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { AlertTriangle, ArrowRight, FileText, Github, GitBranch, Info, Key } from 'lucide-react';
import useRefetch from '@/hooks/use-refetch';
import { createCheckoutSession } from '@/lib/stripe';
import { useLocalStorage } from 'usehooks-ts';


type FormInput = {
    repoUrl: string
    projcetName: string
    githubToken?: string
}

const CreateProjectPage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const linkRepo = api.project.create.useMutation();
    const checkCredits = api.project.checkCredits.useMutation()
    const refetch = useRefetch()
    const [, setProjectId] = useLocalStorage('d-projectId', '')

    const router = useRouter()

    const normalizeRepoUrl = (repoUrl: string) => {
        const trimmed = repoUrl.trim()
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            return trimmed
        }
        return `https://github.com/${trimmed.replace(/^github\.com\//, '')}`
    }

    const onSubmit = async (data: FormInput) => {
        const githubUrl = normalizeRepoUrl(data.repoUrl)
        if (!!!checkCredits.data) {
            checkCredits.mutate({
                githubUrl,
                githubToken: data.githubToken,
            }, {
                onError: () => {
                    toast.error("GitHub API rate limit exceeded, please try again later.");
                },
            })
        } else {
            linkRepo.mutate({
                githubUrl,
                name: data.projcetName,
                githubToken: data.githubToken,
            }, {
                onSuccess: (project) => {
                    toast.success("Project created successfully");
                    setProjectId(project.id)
                    router.push(`/project/${project.id}`)
                    refetch()
                    reset()
                },
                onError: () => {
                    toast.error("Failed to create project");
                },
            });
        }
    };

    const hasEnoughCredits = checkCredits.data?.credits ? checkCredits.data?.credits >= checkCredits.data?.fileCount : true

    return (
        <div className='relative grid h-full grid-cols-1 items-start gap-12 text-zinc-100 lg:grid-cols-2 lg:gap-16'>
            <div className="glass-ambient left-[18%] top-2" />
            <section className="space-y-8 pt-2">
                <div className='space-y-5'>
                    <h1 className='text-5xl font-bold tracking-tighter text-white md:text-6xl'>Link Repository</h1>
                    <p className='max-w-xl text-lg leading-relaxed text-zinc-400'>
                        Connect your GitHub repository to sync your codebase automatically.
                    </p>
                </div>

                <div className="flex items-center gap-4 text-zinc-400">
                    <div className="glass-card flex h-10 w-10 items-center justify-center rounded-md">
                        <Github className="h-5 w-5" />
                    </div>
                    <div className="glass-card flex h-10 w-10 items-center justify-center rounded-md">
                        <GitBranch className="h-5 w-5" />
                    </div>
                </div>
            </section>

            <section className="glass-card float-in rounded-xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
                            Project Name
                        </label>
                        <Input
                            icon={FileText}
                            required
                            {...register("projcetName", { required: true })}
                            placeholder="Project Name"
                            className="h-12 border-zinc-800 bg-black text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
                            Repository
                        </label>
                        <div className="flex h-12 items-center rounded-md border border-zinc-800 bg-black px-3 focus-within:border-white">
                            <span className="mr-2 text-sm text-zinc-500">github.com/</span>
                            <input
                                {...register("repoUrl", { required: true })}
                                required
                                autoComplete="off"
                                className="h-full w-full border-0 bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                                placeholder="owner/repository"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
                            GitHub Token (Optional)
                        </label>
                        <Input
                            icon={Key}
                            {...register("githubToken")}
                            placeholder="ghp_..."
                            className="h-12 border-zinc-800 bg-black font-mono text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-100"
                        />
                    </div>

                    {!!checkCredits.data &&
                        <>
                            <div className="mt-4 rounded-md border border-zinc-800 bg-black px-4 py-3 text-zinc-300">
                                <div className="flex items-center gap-2">
                                    <Info className='size-4' />
                                    <p className='text-sm'>You will be charged <strong>{checkCredits.data?.fileCount}</strong> credits for this repository.</p>
                                </div>
                                <p className='ml-6 text-sm text-zinc-400'>You have <strong className='text-zinc-100'>{checkCredits.data?.credits}</strong> credits remaining.</p>

                            </div>
                            {!hasEnoughCredits &&
                                <div className="mt-4 rounded-md border border-zinc-800 bg-black px-4 py-3 text-zinc-300">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className='size-4' />
                                        <p className='text-sm text-zinc-300'>You do not have enough credits to create this project.</p>
                                    </div>
                                    <div className="h-2"></div>
                                    <Button type='button' variant='outline' className="border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900" onClick={() => createCheckoutSession(checkCredits.data?.fileCount - checkCredits.data?.credits)}>Buy {checkCredits.data?.fileCount - checkCredits.data?.credits} Credits</Button>
                                </div>
                            }
                        </>
                    }

                    <div className="h-2"></div>
                    <Button type="submit" className="h-12 w-full border border-zinc-200 bg-white text-base font-semibold text-black hover:bg-zinc-200" disabled={!hasEnoughCredits} isLoading={linkRepo.isPending || checkCredits.isPending}>
                        Connect Repository <ArrowRight className='size-4' />
                    </Button>
                </form>
            </section>
        </div>
    );
}

export default CreateProjectPage
