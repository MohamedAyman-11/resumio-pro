import { homeQuestions } from "@/constants/home.constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-border py-16 sm:py-20">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          align="left"
          className="lg:max-w-md w-full"
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Quick answers about the resume builder and what to expect."
        />

        <Accordion className="divide-y divide-border border-y border-border">
          {homeQuestions.map(({ question, answer }) => (
            <AccordionItem key={question} value={question} className="border-0">
              <AccordionTrigger className="py-4 text-sm transition-colors hover:text-primary sm:text-base">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pr-8 pb-5 text-sm leading-6 text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
