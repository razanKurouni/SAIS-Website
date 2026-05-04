export const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "header",
      title: "Header / Navigation Bar",
      type: "object",
      description: "Controls the website logo, menu icon, and top header buttons.",
      fields: [
        {
          name: "logo",
          title: "Logo",
          type: "imageWithAlt",
          description: "Main SAIS logo shown on the left side of the header.",
        },
        {
          name: "menuIcon",
          title: "Menu Icon",
          type: "imageWithAlt",
          description: "Optional uploaded menu icon. Leave empty to use the animated SAIS wave icon.",
        },
        {
          name: "bookTourButton",
          title: "Book a Tour Button",
          type: "cta",
          description: "Controls the label and link for the Book a Tour button.",
        },
        {
          name: "applyNowButton",
          title: "Apply Now Button",
          type: "cta",
          description: "Controls the label and link for the Apply Now button.",
        },
      ],
    },
    {
      name: "navigation",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "linkField" }],
      description: "Top navigation items shown over the hero image.",
    },
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        { name: "heading", title: "Main Heading", type: "string", validation: (Rule) => Rule.required() },
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "description", title: "Description", type: "blockContent" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
        { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] },
        {
          name: "valueBar",
          title: "Values Bar",
          type: "array",
          of: [{ type: "string" }],
          description: "Short values shown at the bottom of the hero.",
        },
      ],
    },
    { name: "intro", title: "Intro Section", type: "imageTextSection" },
    {
      name: "ctaBand",
      title: "CTA Band",
      type: "object",
      fields: [
        { name: "text", title: "Text", type: "text", rows: 2 },
        { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] },
      ],
    },
    {
      name: "accreditations",
      title: "Accreditations",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
                { name: "image", title: "Logo Image", type: "imageWithAlt" },
              ],
            },
          ],
        },
      ],
    },
    { name: "whySection", title: "Why SAIS Section", type: "imageTextSection" },
    {
      name: "facts",
      title: "Facts & Figures",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "items", title: "Metrics", type: "array", of: [{ type: "metricItem" }] },
      ],
    },
    {
      name: "quickLinks",
      title: "Quick Links",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "cards", title: "Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "learningPhases",
      title: "Learning Phases",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "cards", title: "Phase Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "tour",
      title: "Tour / Application Section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "cards", title: "Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "news",
      title: "Latest News",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "posts", title: "News Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "instagram",
      title: "Instagram / Social Feed",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "images", title: "Images", type: "array", of: [{ type: "imageWithAlt" }] },
        { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "linkField" }] },
      ],
    },
    {
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        { name: "logoText", title: "Logo Text", type: "string" },
        { name: "contactText", title: "Contact Text", type: "blockContent" },
        {
          name: "columns",
          title: "Link Columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Column Title", type: "string" },
                { name: "links", title: "Links", type: "array", of: [{ type: "linkField" }] },
              ],
            },
          ],
        },
        { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "linkField" }] },
        { name: "legalLinks", title: "Legal Links", type: "array", of: [{ type: "linkField" }] },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading",
      subtitle: "seo.description",
      media: "hero.image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Homepage",
        subtitle,
        media,
      };
    },
  },
};
