import { createClient } from "@sanity/client";
import type { HomeSection } from "@/types/sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9oxycbmd";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-01-01",
  useCdn: false,
  perspective: "published",
});

const homeSectionsQuery = `*[_type == "homeSection"] | order(order asc) {
  _id,
  order,
  title,
  subtitle,
  body,
  items,
  ctas,
  imagePlaceholders[]{
    _key,
    label,
    fileName,
    note
  },
  images[]{
    _key,
    label,
    alt,
    "url": image.asset->url
  }
}`;

export async function getHomeSections(): Promise<HomeSection[]> {
  return sanityClient.fetch<HomeSection[]>(homeSectionsQuery);
}
