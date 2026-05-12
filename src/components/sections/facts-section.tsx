import { SectionReveal } from "@/components/ui/section-reveal";
import type { HomepageData } from "@/types/sanity";

type FactsSectionProps = {
  section?: HomepageData["facts"];
};

export function FactsSection({ section }: FactsSectionProps) {
  if (!section?.heading?.title && !section?.items?.length) {
    return null;
  }

  return (
    <section className="facts-section" aria-labelledby="facts-title">
      <SectionReveal className="facts-section__inner">
        {section.heading?.title ? (
          <div className="facts-section__heading">
            <h2 id="facts-title" className="facts-section__title">
              {section.heading.title}
            </h2>
          </div>
        ) : null}

        <div className="facts-section__grid">
          {(section.items || []).map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="facts-section__item"
            >
              <p className="facts-section__value">{item.value}</p>
              <p className="facts-section__label">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
