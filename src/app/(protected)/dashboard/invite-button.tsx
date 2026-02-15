"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";
import React from "react";
import { toast } from "sonner";


const InviteButton = () => {
    const { projectId } = useProject()
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="border border-zinc-800 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
                    <DialogTitle className="text-xl font-semibold tracking-tight text-zinc-100">
                        Invite a team member!
                    </DialogTitle>
                    <p className="text-sm leading-relaxed text-zinc-400">
                        Ask them to copy and paste this link into their browser:
                    </p>
                    <Input
                        className="mt-4 border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-900 focus-visible:ring-zinc-100 focus-visible:ring-offset-0"
                        readOnly
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `${process.env.NEXT_PUBLIC_URL}/join/${projectId}`,
                            );
                            toast.success("Copied to clipboard!");
                        }}
                        value={`${process.env.NEXT_PUBLIC_URL}/join/${projectId}`}
                    />
                </DialogContent>
            </Dialog>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-md border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900"
            >
                Invite a team member!
            </Button>
        </>
    );
};

export default InviteButton;
