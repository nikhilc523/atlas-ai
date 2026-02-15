import SetProjectContext from "@/components/set-project-context";
import ProjectOverviewClient from "./project-overview-client";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectOverviewPage({ params }: Props) {
  const { projectId } = await params;
  return (
    <>
      <SetProjectContext projectId={projectId} />
      <ProjectOverviewClient />
    </>
  );
}
