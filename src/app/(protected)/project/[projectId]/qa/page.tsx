import SetProjectContext from "@/components/set-project-context";
import QAPage from "../../../qa/page";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectQAPage({ params }: Props) {
  const { projectId } = await params;
  return (
    <>
      <SetProjectContext projectId={projectId} />
      <QAPage />
    </>
  );
}

