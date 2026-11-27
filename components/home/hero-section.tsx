"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ResumePreview } from "@/components/home/resume-preview";
import { Button } from "@/components/ui/button";
import {
  homePrimaryButtonClass,
  homeSecondaryButtonClass,
} from "@/components/shared/home-styles";

export function HeroSection() {
  return (
    <section className="hero-section relative isolate overflow-hidden border-b border-border bg-background">
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:min-h-[610px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:py-16">
        <motion.div
          className="mx-auto min-w-0 max-w-xl text-center lg:mx-0 lg:text-left"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p variants={heroItem} className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Resumio <span className="px-1.5 text-muted-foreground/60">/</span> Resume builder
          </motion.p>
          <motion.h1 variants={heroItem} className="mt-5 text-[40px] font-semibold leading-[1.04] tracking-[-0.05em] min-[400px]:text-[46px] sm:text-[54px] lg:text-[64px]">
            A resume that gets to the point.
          </motion.h1>
          <motion.p variants={heroItem} className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-8 lg:mx-0">
            Put your experience into a clean A4 layout. Edit each section,
            check the preview, and download a searchable PDF when it feels right.
          </motion.p>
          <motion.div variants={heroItem} className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              nativeButton={false}
              render={
                <Link href="/resumes">
                  Start your resume
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              size="lg"
              className={`${homePrimaryButtonClass} w-full sm:w-auto`}
            />
            <Button
              nativeButton={false}
              render={<Link href="#how-it-works">How it works</Link>}
              variant="outline"
              size="lg"
              className={`${homeSecondaryButtonClass} w-full sm:w-auto`}
            />
          </motion.div>
          <motion.p variants={heroItem} className="mt-6 text-xs font-medium text-muted-foreground sm:text-sm">
            Free to use <span className="px-2 text-border">/</span> No account required <span className="px-2 text-border">/</span> PDF download
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mx-auto hidden w-full min-w-0 max-w-[560px] lg:ml-auto lg:block"
          initial={{ opacity: 0, y: 24, rotate: 1.5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
        >
          <div className="rounded-[1.25rem] bg-muted/70 px-4 pb-4 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
            <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
              <span>Sample resume</span>
              <span>A4 · 01</span>
            </div>
            <ResumePreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const heroItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
