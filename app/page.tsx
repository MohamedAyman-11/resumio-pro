import { CtaSection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ResumePreviewSection } from "@/components/home/resume-preview-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <ResumePreviewSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
