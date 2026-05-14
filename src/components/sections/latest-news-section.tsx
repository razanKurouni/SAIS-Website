import dynamic from "next/dynamic";
import type { HomepageData } from "@/types/sanity";

const LatestNewsCards = dynamic(
  () => import("@/components/sections/latest-news-cards").then((module) => module.LatestNewsCards),
);

type LatestNewsSectionProps = {
  section?: HomepageData["news"];
};

export function LatestNewsSection({ section }: LatestNewsSectionProps) {
  if (!section?.heading?.title && !section?.posts?.length) {
    return null;
  }

  return (
    <section className="latest-news" aria-labelledby="latest-news-title">
      <div className="latest-news__inner">
        <div className="latest-news__top">
          <h2 id="latest-news-title" className="latest-news__title">
            {section.heading?.title || "Latest News"}
          </h2>

          {section.cta?.href ? (
            <a
              href={section.cta.href}
              target={section.cta.openInNewTab ? "_blank" : undefined}
              rel={section.cta.openInNewTab ? "noreferrer" : undefined}
              className="latest-news__section-button"
            >
              <span>{section.cta.label || "See All"}</span>
              <span className="latest-news__arrow" aria-hidden="true">
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
            </a>
          ) : null}
        </div>

        <LatestNewsCards posts={section.posts || []} />
      </div>
    </section>
  );
}
