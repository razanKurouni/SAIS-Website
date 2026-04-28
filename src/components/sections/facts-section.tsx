import { SectionHeading } from "@/components/ui/section-heading";
import type { HomepageData } from "@/types/sanity";

type FactsSectionProps = {
  section?: HomepageData["facts"];
};

export function FactsSection({ section }: FactsSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="py-10">
      <SectionHeading heading={section.heading} titleClassName="text-[#20aeb7]" />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(section.items || []).map((item) => (
          <div key={`${item.value}-${item.label}`} className="border-t-2 border-[#e46d4f] bg-white px-5 py-5 text-center shadow-sm">
            <p className="text-3xl font-semibold text-[#176f9b]">{item.value}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#78909c]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
