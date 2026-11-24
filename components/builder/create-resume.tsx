"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateResumeForm from "../shared/create-resume-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateResume() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="default" size="lg">
            <Plus className="size-4.5 mr-2" />
            Create New Resume
          </Button>
        }
      />
      <CreateResumeForm setOpen={setOpen} />
    </Dialog>
  );
}
