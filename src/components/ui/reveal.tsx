"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<
  {
    delay?: number;
  } & Omit<HTMLMotionProps<"section">, "children" | "transition">
>;

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  return (
    <motion.section
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}
