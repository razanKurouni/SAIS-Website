import { HomePage } from "@/components/home/home-page";
import { getHomeSections } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sections = await getHomeSections();
  return <HomePage sections={sections} />;
}
