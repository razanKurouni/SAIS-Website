import dynamic from "next/dynamic";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { HomepageData } from "@/types/sanity";

const AccreditationsLogoRail = dynamic(
  () => import("@/components/sections/accreditations-logo-rail").then((module) => module.AccreditationsLogoRail),
);

type AccreditationsSectionProps = {
  section?: HomepageData["accreditations"];
};

export function AccreditationsSection({ section }: AccreditationsSectionProps) {
  if (!section?.heading?.title && !section?.logos?.length) {
    return null;
  }

  return (
    <section className="accreditations-section" aria-labelledby="accreditations-title">
      <SectionReveal className="accreditations-section__inner">
        {section.heading?.title ? (
          <h2 id="accreditations-title" className="accreditations-section__title">
            {section.heading.title}
          </h2>
        ) : null}

        <AccreditationsLogoRail logos={section.logos} />
      </SectionReveal>
    </section>
  );
}
