import SetProjectContext from "@/components/set-project-context";
import CommitsPage from "../../../commits/page";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectCommitsPage({ params }: Props) {
  const { projectId } = await params;
  return (
    <>
      <SetProjectContext projectId={projectId} />
      <CommitsPage />
    </>
  );
}

