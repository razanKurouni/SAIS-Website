import { Facebook, Instagram, Twitter } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomepageData } from "@/types/sanity";

type SocialSectionProps = {
  section?: HomepageData["instagram"];
};

const icons = [Instagram, Facebook, Twitter];

export function SocialSection({ section }: SocialSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <SectionHeading heading={section.heading} titleClassName="text-[#20aeb7]" />
        <div className="flex gap-2 text-[#147b9c]">
          {icons.map((Icon, index) => (
            <a
              key={index}
              href={section.socialLinks?.[index]?.href || "#"}
              aria-label={section.socialLinks?.[index]?.label || "Social link"}
              className="rounded-full border border-[#d4e3e6] p-2"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {(section.images || []).slice(0, 4).map((image, index) => (
          <CmsImage
            key={`${image.url || "social"}-${index}`}
            image={image}
            fallbackLabel={`Social image ${index + 1}`}
            className="aspect-square rounded-lg"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ))}
      </div>
    </section>
  );
}
