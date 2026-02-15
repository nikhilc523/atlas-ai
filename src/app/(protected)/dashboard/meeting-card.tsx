"use client";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import { Presentation, Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { uploadFileToFirebase } from "@/lib/storage";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import useProject from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import useRefetch from "@/hooks/use-refetch";


const MeetingCard = () => {
    const [progress, setProgress] = React.useState(0);
    const uploadMeeting = api.project.uploadMeeting.useMutation();
    const processMeeting = useMutation({
        mutationFn: async (data: { audio_url: string, projectId: string, meetingId: string }) => {
            const response = await axios.post("/api/process-meeting", data);
            return response.data;
        }
    })
    const refetch = useRefetch()
    const [isUploading, setIsUploading] = React.useState(false);
    const router = useRouter();
    const { getRootProps, getInputProps } = useDropzone({
        // only accept audio files
        accept: {
            "audio/*":
                ".mp3,.m4a,.wav,.flac,.ogg,.aac,.opus,.wma,.webm,.amr,.3gp,.mp2,.m2a,.m4b,.m4p,.mpc,.mpga,.oga,.spx,.wv,.mka,.m3u,.m3u8,.m4u".split(
                    ",",
                ),
        },
        multiple: false,
        onDragEnter: () => {
            console.log("drag enter")
        },
        onDragOver: () => {
            console.log("drag over")
        },
        onDragLeave: () => {
            console.log("drag leave")
        },
        // 50mb
        maxSize: 50000000,
        onDrop: async (acceptedFiles) => {
            if (!project) return;
            setIsUploading(true);
            try {
                const file = acceptedFiles[0];
                if (file instanceof File) {
                    const downloadUrl = await uploadFileToFirebase(file, file.name, setProgress);
                    const meeting = await uploadMeeting.mutateAsync({
                        audio_url: downloadUrl,
                        name: file.name,
                        projectId: project.id,
                    })
                    refetch()
                    router.push("/meetings");
                    processMeeting.mutateAsync({
                        audio_url: downloadUrl,
                        projectId: project.id,
                        meetingId: meeting.id,
                    })
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsUploading(false);
            }
        },
    });
    const { project } = useProject()

    return (
        <>
            <Card
                {...getRootProps()}
                className="flex h-full min-h-[420px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 p-8 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-white/15 hover:bg-zinc-900/65 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] md:p-10"
            >
                {!isUploading && (
                    <>
                        <Presentation className="h-10 w-10 text-zinc-400" />
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                            Create a new meeting
                        </h3>
                        <p className="mt-2 text-center text-base leading-relaxed text-zinc-400">
                            Analyse your meeting with Atlas.
                            <br />
                            Powered by AI.
                        </p>
                        <div className="mt-6">
                            <Button isLoading={isUploading} className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-base font-semibold text-black hover:bg-zinc-200">
                                <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Upload Meeting
                                <input className="hidden" {...getInputProps()} />
                            </Button>
                        </div>
                    </>
                )}
                {isUploading && (
                    <div>
                        <CircularProgressbar value={progress} text={`${Math.round(progress)}%`} className='size-20'
                            styles={buildStyles({
                                pathColor: '#EDEDED',
                                textColor: '#EDEDED'
                            })}
                        />
                        <p className="mt-3 text-center text-xs leading-relaxed text-zinc-400">
                            Uploading and processing meeting... <br />
                            This may take a few minutes...
                        </p>
                    </div>
                )}
            </Card>
        </>
    );
};

export default MeetingCard;
