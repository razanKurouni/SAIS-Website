import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { CardGridSection } from "@/components/sections/card-grid-section";
import { CtaBand } from "@/components/sections/cta-band";
import { FactsSection } from "@/components/sections/facts-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImageTextSection } from "@/components/sections/image-text-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { SocialSection } from "@/components/sections/social-section";
import { TourSection } from "@/components/sections/tour-section";
import type { HomepageData } from "@/types/sanity";

type HomePageProps = {
  data: HomepageData;
};

export function HomePage({ data }: HomePageProps) {
  return (
    <div className="bg-[#edf3f4] text-[#10324b]">
      <SiteHeader links={data.navigation} />
      {data.hero && <HeroSection hero={data.hero} />}

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
        <ImageTextSection section={data.intro} id="intro" />
        <CtaBand section={data.ctaBand} />
        <AccreditationsSection section={data.accreditations} />
        <ImageTextSection section={data.whySection} id="why-sais" />
        <FactsSection section={data.facts} />
        <CardGridSection
          id="quick-links"
          heading={data.quickLinks?.heading}
          cards={data.quickLinks?.cards}
          variant="quick"
        />
        <CardGridSection
          id="learning"
          heading={data.learningPhases?.heading}
          cards={data.learningPhases?.cards}
          variant="phase"
        />
        <TourSection section={data.tour} />
        <CardGridSection
          id="news"
          heading={data.news?.heading}
          cards={data.news?.posts}
          variant="news"
        />
        <SocialSection section={data.instagram} />
      </main>

      <SiteFooter footer={data.footer} />
    </div>
  );
}
