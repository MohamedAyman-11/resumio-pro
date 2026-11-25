import { Suspense } from "react";
import type { Metadata } from "next";
import ResumeEditor from "@/components/editor/resume-editor";

export const metadata: Metadata = {
  title: "Edit resume",
  robots: { index: false, follow: false, noarchive: true },
};

export default function Page({ params }: PageProps<"/editor/[id]">) {
  return (
    <Suspense
      fallback={
        <main className="container py-12 text-sm text-muted-foreground">
          Loading your resume...
        </main>
      }
    >
      <ResumeEditorPage params={params} />
    </Suspense>
  );
}

async function ResumeEditorPage({
  params,
}: Pick<PageProps<"/editor/[id]">, "params">) {
  const { id } = await params;
  return <ResumeEditor resumeId={id} />;
}
