"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { CmsImage } from "@/components/ui/cms-image";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { FeatureCard } from "@/types/sanity";

type TourActionCardsProps = {
  cards?: FeatureCard[];
};

const toneMap = {
  blue: {
    fill: "#1e6f9b",
    accent: "#31b2b6",
  },
  teal: {
    fill: "#31b2b6",
    accent: "#1e6f9b",
  },
};

function ArrowBadge() {
  return (
    <span className="tour-action-card__arrow" aria-hidden="true">
      <svg viewBox="0 0 18 18" focusable="false">
        <path d="M7 4.5 11.5 9 7 13.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </span>
  );
}

export const TourActionCards = memo(function TourActionCards({ cards = [] }: TourActionCardsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="tour-actions__grid">
      {cards.map((card, index) => {
        const tone = index % 2 === 0 ? "blue" : "teal";
        const colors = toneMap[tone];
        const title = card.title || (index % 2 === 0 ? "Book a Tour" : "Start Your Application");

        return (
          <motion.article
            key={`${title}-${index}`}
            className={`tour-action-card tour-action-card--${tone}`}
            initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{
              duration: 0.82,
              delay: prefersReducedMotion ? 0 : index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <CmsImage
              image={card.image}
              fallbackLabel={title}
              className="tour-action-card__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 92vw, 42vw"
            />

            <SaisCurvedPanel
              className="tour-action-card__panel"
              contentClassName="tour-action-card__panel-content"
              fillColor={colors.fill}
              accentColor={colors.accent}
              strokeWidth={82}
            >
              <h3 className="tour-action-card__title">{title}</h3>

              {card.cta && (
                <Link
                  href={card.cta.href || "#"}
                  target={card.cta.openInNewTab ? "_blank" : undefined}
                  rel={card.cta.openInNewTab ? "noreferrer" : undefined}
                  className="tour-action-card__button"
                >
                  <span>{card.cta.label}</span>
                  <ArrowBadge />
                </Link>
              )}
            </SaisCurvedPanel>
          </motion.article>
        );
      })}
    </div>
  );
});
