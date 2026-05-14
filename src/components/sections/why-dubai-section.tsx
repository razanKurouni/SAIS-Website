import dynamic from "next/dynamic";
import type { HomepageData } from "@/types/sanity";

const WhyDubaiMotion = dynamic(
  () => import("@/components/sections/why-dubai-motion").then((module) => module.WhyDubaiMotion),
);

type WhyDubaiSectionProps = {
  section?: HomepageData["whyDubai"];
};

export function WhyDubaiSection({ section }: WhyDubaiSectionProps) {
  if (!section?.items?.length) {
    return null;
  }

  return <WhyDubaiMotion section={section} />;
}
