import type { Metadata } from "next";
import ResumesInfo from "@/components/resumes/resumes-info";

export const metadata: Metadata = {
  title: "My resumes",
  robots: { index: false, follow: false, noarchive: true },
};

const page = () => {
  return (
    <div>
      <div className="container">
        <ResumesInfo />
      </div>
    </div>
  );
};

export default page;
