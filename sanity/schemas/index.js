import { homepage } from "./homepage";
import { blockContent } from "./objects/blockContent";
import { cta } from "./objects/cta";
import { featureCard, imageTextSection, metricItem } from "./objects/homepageObjects";
import { imageWithAlt } from "./objects/imageWithAlt";
import { linkField } from "./objects/linkField";
import { sectionHeading } from "./objects/sectionHeading";
import { seo } from "./objects/seo";

export const schemaTypes = [
  blockContent,
  imageWithAlt,
  linkField,
  cta,
  sectionHeading,
  seo,
  metricItem,
  featureCard,
  imageTextSection,
  homepage,
];
