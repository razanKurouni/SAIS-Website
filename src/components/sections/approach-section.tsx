import dynamic from "next/dynamic";
import { richTextToParagraphs } from "@/lib/content";
import type { HomepageData } from "@/types/sanity";

const ApproachSectionMotion = dynamic(
  () => import("@/components/sections/approach-section-motion").then((module) => module.ApproachSectionMotion),
);

type ApproachSectionProps = {
  section?: HomepageData["whySection"];
};

export function ApproachSection({ section }: ApproachSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <ApproachSectionMotion
      title={section.heading?.title}
      lead={section.heading?.subtitle}
      paragraphs={richTextToParagraphs(section.heading?.description)}
      image={section.image}
      cta={section.ctas?.[0]}
    />
  );
}
