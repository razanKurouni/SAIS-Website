"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type HomeHeroMotionPanelProps = {
  children: ReactNode;
};

export function HomeHeroMotionPanel({ children }: HomeHeroMotionPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 74%", "end 8%"],
  });

  const scrollX = useTransform(scrollYProgress, [0, 0.28, 1], ["0%", "0%", "-116%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.12]);
  const x = useSpring(scrollX, {
    stiffness: 88,
    damping: 24,
    mass: 0.42,
  });

  return (
    <motion.div
      ref={containerRef}
      className="home-hero__scroll-motion"
      style={prefersReducedMotion ? undefined : { x, opacity }}
    >
      <motion.div
        className="home-hero__entry-motion"
        initial={prefersReducedMotion ? false : { x: "-118%", opacity: 0.4, filter: "blur(8px)" }}
        animate={prefersReducedMotion ? undefined : { x: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.08,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
