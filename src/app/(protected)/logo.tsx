import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import React from 'react'

const Logo = () => {
    const { open } = useSidebar()
    return (
        <div className="flex items-center gap-2">
            <div
                aria-hidden="true"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-900/70 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-b-[17px] border-l-transparent border-r-transparent border-b-white" />
            </div>
            {open && (
                <span className="text-xl font-bold">
                    <span className="text-zinc-100">
                        Atlas
                    </span>
                </span>
            )}
            {open && (
                <SidebarTrigger className="ml-auto text-zinc-400 hover:text-zinc-100" />
            )}
        </div>
    )
}

export default Logo
