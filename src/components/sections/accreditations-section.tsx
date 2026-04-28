import { CmsImage } from "@/components/ui/cms-image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomepageData } from "@/types/sanity";

type AccreditationsSectionProps = {
  section?: HomepageData["accreditations"];
};

export function AccreditationsSection({ section }: AccreditationsSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="border-y border-[#d4e3e6] py-8">
      <SectionHeading heading={section.heading} titleClassName="text-[#20aeb7]" />
      <div className="mt-6 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-5">
        {(section.logos || []).map((logo) => (
          <div key={logo.name} className="flex min-h-20 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
            {logo.image?.url ? (
              <CmsImage
                image={logo.image}
                fallbackLabel={logo.name}
                className="h-12 w-full bg-transparent"
                imageClassName="object-contain"
                sizes="160px"
              />
            ) : (
              <span className="text-center text-sm font-semibold text-[#6d7e89]">{logo.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
