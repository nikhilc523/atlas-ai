'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"

import { Bot, CreditCard, LayoutDashboard, Plus, Presentation, FolderGit2 } from "lucide-react"
import Logo from "./logo"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useProject from "@/hooks/use-project"
import { Skeleton } from "@/components/ui/skeleton"

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        url: "/projects",
        icon: FolderGit2,
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot,
        projectScoped: true,
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation,
        projectScoped: true,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
]

export function AppSidebar() {
    const router = useRouter()
    const { projects, projectId, setProjectId, isLoading } = useProject()
    const pathname = usePathname()
    const { open } = useSidebar()

    const resolveUrl = (item: (typeof items)[number]) => {
        if (!item.projectScoped) return item.url
        // Keep Q&A / Meetings always reachable; page-level hooks resolve selected project context.
        return item.url
    }

    const isActive = (item: (typeof items)[number]) => {
        if (item.projectScoped) {
            return (
                pathname === item.url ||
                pathname.startsWith(`${item.url}/`) ||
                new RegExp(`^/project/[^/]+${item.url}(/|$)`).test(pathname)
            )
        }
        const resolved = resolveUrl(item)
        return pathname === resolved || pathname.startsWith(`${resolved}/`)
    }

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="glass-card m-1 mb-0 rounded-2xl border-white/10 p-2">
                <Logo />
            </SidebarHeader>
            <SidebarContent className="glass-card m-1 mt-2 rounded-2xl border-white/10 bg-zinc-900/25 p-2 backdrop-blur-2xl">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={resolveUrl(item)} className={cn({
                                            '!bg-white/10 !text-zinc-100': isActive(item),
                                        })}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">Your Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isLoading && (<>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="w-full h-8" />
                                ))}
                            </>)}

                            {projects?.map((project) => (
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild>
                                        <div onClick={() => {
                                            setProjectId(project.id)
                                            router.push(`/project/${project.id}`)
                                        }} className={cn({
                                            'cursor-pointer': true,
                                        })}>
                                            <div className="">
                                                <div className={cn("flex size-6 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-950 text-sm text-zinc-300", {
                                                    'border-zinc-500 bg-zinc-800 text-zinc-100': projectId === project.id,
                                                })}>
                                                    {project.name[0]}
                                                </div>
                                            </div>
                                            <span>{project.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <div className="h-2"></div>
                            {open && (
                                <SidebarMenuItem key="create">
                                    <Link href="/create">
                                        <Button size='sm' variant={'outline'} className="border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800/70">
                                            <Plus />
                                            <span>Create Project</span>
                                        </Button>
                                    </Link>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {!open && (
                    <>
                        <SidebarSeparator />
                        <SidebarTrigger className="self-center text-zinc-500 hover:text-zinc-100" />
                    </>
                )}
            </SidebarContent>

        </Sidebar>
    )
}
