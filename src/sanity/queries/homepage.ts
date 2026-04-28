const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url
}`;

const ctaProjection = `{
  label,
  href,
  openInNewTab,
  variant
}`;

const linkProjection = `{
  label,
  href,
  openInNewTab
}`;

const headingProjection = `{
  eyebrow,
  title,
  subtitle,
  description
}`;

const cardProjection = `{
  title,
  description,
  image ${imageWithAltProjection},
  cta ${ctaProjection}
}`;

export const homepageQuery = `*[_type == "homepage"][0] {
  seo {
    title,
    description,
    image ${imageWithAltProjection}
  },
  navigation[] ${linkProjection},
  hero {
    heading,
    subtitle,
    description,
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    valueBar
  },
  intro {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  ctaBand {
    text,
    ctas[] ${ctaProjection}
  },
  accreditations {
    heading ${headingProjection},
    logos[] {
      name,
      image ${imageWithAltProjection}
    }
  },
  whySection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  facts {
    heading ${headingProjection},
    items[] {
      value,
      label
    }
  },
  quickLinks {
    heading ${headingProjection},
    cards[] ${cardProjection}
  },
  learningPhases {
    heading ${headingProjection},
    cards[] ${cardProjection}
  },
  tour {
    heading ${headingProjection},
    cards[] ${cardProjection}
  },
  news {
    heading ${headingProjection},
    posts[] ${cardProjection}
  },
  instagram {
    heading ${headingProjection},
    images[] ${imageWithAltProjection},
    socialLinks[] ${linkProjection}
  },
  footer {
    logoText,
    contactText,
    columns[] {
      title,
      links[] ${linkProjection}
    },
    socialLinks[] ${linkProjection},
    legalLinks[] ${linkProjection}
  }
}`;

export const legacyHomeSectionsQuery = `*[_type == "homeSection"] | order(order asc) {
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
    caption,
    "url": image.asset->url
  }
}`;
