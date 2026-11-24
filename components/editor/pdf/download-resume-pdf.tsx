"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import type { TResume } from "@/types/resume";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { ResumePdf } from "./resume-pdf";

function safeFilename(value: string) {
  const safeName = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${safeName || "resume"}.pdf`;
}

export function DownloadResumePdf({ resume }: { resume: TResume }) {
  const ownerName = [resume.personalInfo.firstName, resume.personalInfo.lastName].filter(Boolean).join(" ");
  const filename = safeFilename(ownerName || resume.name);

  return (
    <PDFDownloadLink
      document={<ResumePdf resume={resume} />}
      fileName={filename}
      className={cn(buttonVariants({ size: "lg" }), "no-underline")}
      aria-label="Download resume as PDF"
    >
      {({ loading, error }) => (
        <>
          <Download className="size-4" />
          <span className="hidden sm:inline">{loading ? "Preparing PDF..." : error ? "Try Download Again" : "Download PDF"}</span>
          <span className="sm:hidden">{loading ? "Preparing" : "PDF"}</span>
        </>
      )}
    </PDFDownloadLink>
  );
}
