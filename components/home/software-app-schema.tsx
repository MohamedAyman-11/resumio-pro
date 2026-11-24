import { homeQuestions } from "@/constants/home.constants";
import { absoluteSiteUrl } from "@/lib/site";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ResumeKit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Build a resume with a live preview, a clean A4 layout, and a searchable PDF download.",
  url: absoluteSiteUrl("/"),
  featureList: [
    "Live resume preview",
    "Ten resume sections",
    "Searchable PDF export",
    "Multiple resume versions",
    "Browser-based local storage",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeQuestions.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export function HomeStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
