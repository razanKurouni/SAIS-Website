import { createClient } from "@sanity/client";
import { homepageQuery, legacyHomeSectionsQuery } from "@/sanity/queries/homepage";
import { mapLegacySectionsToHomepage } from "@/lib/content";
import type { HomepageData, LegacyHomeSection } from "@/types/sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9oxycbmd";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function getSanityClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2023-01-01",
    useCdn: false,
    perspective: "published",
  });
}

export async function getHomepage(): Promise<HomepageData> {
  const client = getSanityClient();
  const homepage = await client.fetch<HomepageData | null>(homepageQuery);

  if (homepage) {
    return homepage;
  }

  const legacySections = await client.fetch<LegacyHomeSection[]>(legacyHomeSectionsQuery);
  return mapLegacySectionsToHomepage(legacySections || []);
}
