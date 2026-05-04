import { HomePage } from "@/components/home/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAIS Dubai | UI Preview",
  description: "Local SAIS navigation rebuild preview.",
};

export default function Page() {
  return <HomePage />;
}
