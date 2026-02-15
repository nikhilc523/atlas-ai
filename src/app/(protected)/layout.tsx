import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { UserButton } from "@clerk/nextjs"
import SearchBar from "./search-bar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="relative m-2 min-w-0 flex-1 overflow-hidden bg-black transition-all duration-300 ease-in-out antialiased subpixel-antialiased [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif]">
                <div className="pointer-events-none fixed right-[-120px] top-[-120px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="pointer-events-none fixed bottom-[-180px] left-[28%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
                <div className="glass-ambient left-[28%] top-1" />
                <div className="glass-card float-in flex items-center gap-2 rounded-2xl p-2 px-4">
                    <SearchBar />
                    <div className="ml-auto"></div>
                    <UserButton />
                </div>
                <div className="h-4"></div>
                <div className="custom-scrollbar h-[calc(100vh-6rem)] overflow-y-auto p-2 transition-all duration-300 ease-in-out md:p-4">
                    <div className="relative min-h-full p-4 md:p-6 xl:p-8">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}
