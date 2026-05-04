import { SiteHeader } from "@/components/sections/site-header";
import type { HomepageData } from "@/types/sanity";

type HomePageProps = {
  data?: HomepageData;
};

export function HomePage({ data }: HomePageProps) {
  return (
    <div className="preview-page">
      <SiteHeader settings={data?.header} links={data?.navigation} />

      <main id="home" className="preview-main">
        <div className="preview-bg" />
        <div className="preview-header-fade" />
        <div className="preview-grid" />

        <section className="preview-stage">
          <div className="preview-copy">
            <p className="preview-kicker">
              UI rebuild / Navigation first pass
            </p>
            <h1 className="preview-title">
              SAIS navigation system
            </h1>
            <p className="preview-description">
              This is a clean local preview stage. We are rebuilding the interface piece by piece,
              starting with a reusable animated navigation menu.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
