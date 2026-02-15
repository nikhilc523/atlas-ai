"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type SetProjectContextProps = {
  projectId: string;
};

export default function SetProjectContext({ projectId }: SetProjectContextProps) {
  const [storedProjectId, setStoredProjectId] = useLocalStorage("d-projectId", "");

  useEffect(() => {
    if (projectId && storedProjectId !== projectId) {
      setStoredProjectId(projectId);
    }
  }, [projectId, setStoredProjectId, storedProjectId]);

  return null;
}

