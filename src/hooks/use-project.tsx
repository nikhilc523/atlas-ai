import { api } from '@/trpc/react'
import { useLocalStorage } from 'usehooks-ts'
import React from 'react'
import { usePathname } from 'next/navigation'

const useProject = () => {
    const { data: projects, isLoading } = api.project.getAll.useQuery()
    const [projectId, setProjectId] = useLocalStorage('d-projectId', '')
    const pathname = usePathname()
    const routeProjectId = React.useMemo(() => {
        const match = pathname.match(/^\/project\/([^/]+)/)
        return match?.[1] ?? null
    }, [pathname])
    const resolvedProjectId = routeProjectId ?? projectId
    const project = projects?.find((project) => project.id === resolvedProjectId)

    React.useEffect(() => {
        // Keep local storage aligned with scoped routes like /project/:projectId/*
        if (routeProjectId && routeProjectId !== projectId) {
            setProjectId(routeProjectId)
        }
    }, [routeProjectId, projectId, setProjectId])

    React.useEffect(() => {
        // If no project is selected yet, default to the first available one.
        if (projectId || routeProjectId) return
        const firstProjectId = projects?.[0]?.id
        if (firstProjectId) setProjectId(firstProjectId)
    }, [projects, projectId, routeProjectId, setProjectId])


    return {
        projects,
        projectId: resolvedProjectId,
        isLoading,
        setProjectId,
        project,
    }
}

export default useProject
