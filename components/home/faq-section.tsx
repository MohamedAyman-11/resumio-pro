import { homeQuestions } from "@/constants/home.constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-border py-16 sm:py-20">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
        <SectionHeading
          align="left"
          className="lg:max-w-md w-full"
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Quick answers about the resume builder and what to expect."
        />
        </Reveal>

        <Reveal className="w-full" delay={0.1}>
        <Accordion className="gap-3">
          {homeQuestions.map(({ question, answer }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl text-sm">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
