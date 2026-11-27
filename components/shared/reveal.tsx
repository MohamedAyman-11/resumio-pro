"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export const VIEW_REVEAL_INITIAL = { opacity: 0, y: 16 };
export const VIEW_REVEAL_TARGET = { opacity: 1, y: 0 };
export const VIEW_REVEAL_VIEWPORT = { once: true, amount: 0.12 };
export const VIEW_REVEAL_TRANSITION = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1] as const,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  hoverLift?: boolean;
  mode?: "view" | "mount";
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.68,
  hoverLift = false,
  mode = "view",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={VIEW_REVEAL_INITIAL}
      {...(mode === "mount"
        ? { animate: VIEW_REVEAL_TARGET }
        : {
            whileInView: VIEW_REVEAL_TARGET,
            viewport: VIEW_REVEAL_VIEWPORT,
          })}
      transition={{ ...VIEW_REVEAL_TRANSITION, duration, delay }}
      whileHover={hoverLift ? { y: -3 } : undefined}
    >
      {children}
    </motion.div>
  );
}
