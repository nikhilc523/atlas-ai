import SetProjectContext from "@/components/set-project-context";
import MeetingsPage from "../../../meetings/page";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectMeetingsPage({ params }: Props) {
  const { projectId } = await params;
  return (
    <>
      <SetProjectContext projectId={projectId} />
      <MeetingsPage />
    </>
  );
}

