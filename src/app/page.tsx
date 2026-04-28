import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();

  return {
    title: data.seo?.title || "SAIS Dubai | School Website",
    description:
      data.seo?.description || "Responsive SAIS Dubai homepage powered by Sanity CMS.",
    openGraph: {
      title: data.seo?.title || "SAIS Dubai | School Website",
      description:
        data.seo?.description || "Responsive SAIS Dubai homepage powered by Sanity CMS.",
      images: data.seo?.image?.url ? [{ url: data.seo.image.url, alt: data.seo.image.alt }] : undefined,
    },
  };
}

export default async function Page() {
  const data = await getHomepage();
  return <HomePage data={data} />;
}
