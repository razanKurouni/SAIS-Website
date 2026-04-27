export type PortableTextSpan = {
  _key?: string;
  _type?: "span";
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: "block";
  children?: PortableTextSpan[];
};

export type ImagePlaceholder = {
  _key?: string;
  label?: string;
  fileName?: string;
  note?: string;
};

export type UploadedImage = {
  _key?: string;
  label?: string;
  alt?: string;
  url?: string;
};

export type HomeSection = {
  _id: string;
  order: number;
  title: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  items?: string[];
  ctas?: string[];
  imagePlaceholders?: ImagePlaceholder[];
  images?: UploadedImage[];
};
