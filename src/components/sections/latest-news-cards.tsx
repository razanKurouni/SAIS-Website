"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { FeatureCard } from "@/types/sanity";

type LatestNewsCardsProps = {
  posts?: FeatureCard[];
};

function NewsArrow() {
  return (
    <span className="latest-news-card__arrow" aria-hidden="true">
      <svg viewBox="0 0 18 18" focusable="false">
        <path
          d="M7 4.5 11.5 9 7 13.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

export function LatestNewsCards({ posts = [] }: LatestNewsCardsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="latest-news__grid">
      {posts.map((post, index) => {
        const href = post.cta?.href || "#";

        return (
          <motion.article
            key={`${post.title}-${index}`}
            className="latest-news-card"
            initial={prefersReducedMotion ? false : { y: 46, opacity: 0, scale: 0.985 }}
            whileInView={prefersReducedMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.72,
              delay: prefersReducedMotion ? 0 : index * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="latest-news-card__image-wrap">
              {post.image?.url ? (
                <Image
                  src={post.image.url}
                  alt={post.image.alt || post.title}
                  fill
                  quality={82}
                  sizes="(max-width: 767px) 92vw, (max-width: 1200px) 30vw, 360px"
                  className="latest-news-card__image"
                />
              ) : (
                <div className="latest-news-card__fallback">{post.title}</div>
              )}
            </div>

            <div className="latest-news-card__body">
              <h3 className="latest-news-card__title">{post.title}</h3>
              {post.description && <p className="latest-news-card__text">{post.description}</p>}

              <Link
                href={href}
                target={post.cta?.openInNewTab ? "_blank" : undefined}
                rel={post.cta?.openInNewTab ? "noreferrer" : undefined}
                className="latest-news-card__button"
              >
                <span>{post.cta?.label || "See More"}</span>
                <NewsArrow />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
