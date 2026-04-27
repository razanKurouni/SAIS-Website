import type { HomeSection, PortableTextBlock } from "@/types/sanity";

export const sectionByOrder = (sections: HomeSection[], order: number) =>
  sections.find((section) => section.order === order);

export const textBlocksToParagraphs = (blocks: PortableTextBlock[] = []) => {
  return blocks
    .map((block) =>
      (block.children || [])
        .map((child) => child.text || "")
        .join("")
        .trim()
    )
    .filter(Boolean);
};

export const splitMetric = (value: string) => {
  const [numberPart, ...labelParts] = value.split(" - ");
  return {
    number: numberPart?.trim() || value,
    label: labelParts.join(" - ").trim() || "",
  };
};
