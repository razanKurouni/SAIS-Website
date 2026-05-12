"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Award, Globe2, Network, UsersRound } from "lucide-react";
import type { ComponentType } from "react";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { HomepageData, WhyDubaiItem } from "@/types/sanity";

type WhyDubaiMotionProps = {
  section: NonNullable<HomepageData["whyDubai"]>;
};

const iconMap: Record<NonNullable<WhyDubaiItem["iconType"]>, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  student: Award,
  globe: Globe2,
  learning: Network,
  family: UsersRound,
};

export function WhyDubaiMotion({ section }: WhyDubaiMotionProps) {
  const prefersReducedMotion = useReducedMotion();
  const title = section.heading?.title || "Why SAIS Dubai?";
  const subtitle = section.heading?.subtitle;

  return (
    <section className="why-dubai" aria-labelledby="why-dubai-title">
      <motion.div
        className="why-dubai__card"
        initial={prefersReducedMotion ? false : { y: 46, opacity: 0, scale: 0.985 }}
        whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.42 }}
        transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
      >
        <SaisCurvedPanel
          className="why-dubai__shape"
          contentClassName="why-dubai__shape-content"
          fillColor="#31b2b6"
          accentColor="#d97252"
          strokeWidth={88}
        >
          <div className="why-dubai__copy">
            <motion.h2
              id="why-dubai-title"
              className="why-dubai__title"
              initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                className="why-dubai__subtitle"
                initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.62, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {subtitle}
              </motion.p>
            )}

            <div className="why-dubai__items">
              {section.items?.map((item, index) => {
                const Icon = iconMap[item.iconType || "student"] || Award;

                return (
                  <motion.article
                    className="why-dubai__item"
                    key={`${item.description}-${index}`}
                    initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.45 }}
                    transition={{
                      duration: 0.62,
                      delay: prefersReducedMotion ? 0 : 0.16 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="why-dubai__icon">
                      {item.icon?.url ? (
                        // SVG icon bases render more reliably as plain images than through next/image.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.icon.url} alt="" aria-hidden="true" className="why-dubai__icon-image" />
                      ) : (
                        <Icon size={30} strokeWidth={2.4} />
                      )}
                    </span>
                    <p>{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </SaisCurvedPanel>

        <motion.div
          className="why-dubai__media"
          initial={prefersReducedMotion ? false : { x: 64, opacity: 0, rotate: 1.5 }}
          whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.38 }}
          transition={{ duration: 0.88, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="why-dubai__image-wrap">
            {section.image?.url ? (
              <Image
                src={section.image.url}
                alt={section.image.alt || title}
                fill
                quality={82}
                sizes="(max-width: 767px) 80vw, 44vw"
                className="why-dubai__image"
              />
            ) : (
              <div className="why-dubai__image-fallback">{title}</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
