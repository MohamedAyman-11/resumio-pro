"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import CustomInput from "../ui/custom-input";
import { TInput } from "@/types";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { createResume } from "@/utils/resume";
import { useRouter } from "next/navigation";
import { saveResumes } from "@/lib/resume.storage";

const CreateResumeInput: TInput = {
  name: "resumeName",
  defaultValue: "",
  autoFocus: true,
  placeholder: "Enter your resume name",
  label: "Resume Name",
  type: "text",
  required: true,
};

interface Props {
  setOpen: (open: boolean) => void;
}

const CreateResumeForm = ({ setOpen }: Props) => {
  const [resumeName, setResumeName] = useState("");
  const [checked, setChecked] = useState(true);

  const router = useRouter();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeName(e.target.value);
  };

  const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeName.trim()) {
      return;
    }

    const newResume = createResume(resumeName.trim());

    saveResumes(newResume);
    setResumeName("");
    setOpen(false);
    if (checked) {
      router.push(`/editor/${newResume.id}`);
    }
  };

  return (
    <DialogContent
      className="sm:max-w-lg bg-background p-0  "
      showCloseButton={false}
    >
      <form onSubmit={onSubmitHandler}>
        <DialogHeader className="border-b border-border flex items-center justify-between flex-row py-4 px-6 ">
          <DialogTitle className={"font-semibold text-lg "}>
            Create New Resume
          </DialogTitle>
          <DialogClose
            render={
              <Button
                type="button"
                size="icon"
                aria-label="Close dialog"
                className="bg-transparent border-none text-foreground hover:bg-primary/10 shadow-none hover:shadow-none rounded-md"
              />
            }
          >
            <X className="size-4.5" />
          </DialogClose>
        </DialogHeader>
        <div className="px-6 py-4 space-y-5">
          <CustomInput
            input={CreateResumeInput}
            value={resumeName}
            onChange={onChangeHandler}
          />

          <Field orientation="horizontal">
            <Checkbox
              id="navigate-to-builder-checkbox"
              name="navigate-to-builder-checkbox"
              checked={checked}
              onCheckedChange={setChecked}
              className={"size-4"}
            />
            <FieldLabel
              htmlFor="navigate-to-builder-checkbox"
              className="text-sm text-muted-foreground"
            >
              Open the editor after creating
            </FieldLabel>
          </Field>
        </div>
        <div className="px-4 pb-4  border-t border-border">
          <DialogFooter className="border-0">
            <DialogClose
              render={
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" size="lg" disabled={!resumeName.trim()}>
              Create resume
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
};

export default CreateResumeForm;
