import { CmsImage } from "@/components/ui/cms-image";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomepageData } from "@/types/sanity";

type TourSectionProps = {
  section?: HomepageData["tour"];
};

export function TourSection({ section }: TourSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="py-10">
      <SectionHeading heading={section.heading} align="center" titleClassName="text-[#20aeb7]" />
      <div className="mx-auto mt-7 grid max-w-4xl gap-6 md:grid-cols-2">
        {(section.cards || []).map((card, index) => (
          <article key={`${card.title}-${index}`} className="overflow-hidden rounded-xl bg-[#147b9c] text-white shadow-sm">
            <CmsImage
              image={card.image}
              fallbackLabel={card.title}
              className="aspect-[16/10]"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              {card.description && <p className="mt-2 text-sm leading-6 text-white/85">{card.description}</p>}
              {card.cta && (
                <div className="mt-4">
                  <CtaLink cta={{ ...card.cta, variant: "primary" }} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
