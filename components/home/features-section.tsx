"use client";

import { motion } from "motion/react";
import { homeFeatures } from "@/constants/home.constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 border-y border-border bg-muted/30 py-16 sm:py-20">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="MADE FOR YOUR NEXT STEP" title="The essentials for a strong resume." description="Simple tools and thoughtful layouts help keep the focus on your experience." />
        </Reveal>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="rounded-xl border border-border bg-card p-5 sm:p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.28 } }}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon aria-hidden="true" className="size-5" /></span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
