import dynamic from "next/dynamic";
import type { HomepageData } from "@/types/sanity";

const TourActionCards = dynamic(
  () => import("@/components/sections/tour-action-cards").then((module) => module.TourActionCards),
);

type TourSectionProps = {
  section?: HomepageData["tour"];
};

export function TourSection({ section }: TourSectionProps) {
  if (!section?.cards?.length) {
    return null;
  }

  return (
    <section className="tour-actions" aria-label="Admissions actions">
      <div className="tour-actions__inner">
        <TourActionCards cards={section.cards} />
      </div>
    </section>
  );
}
