export const metricItem = {
  name: "metricItem",
  title: "Metric",
  type: "object",
  fields: [
    { name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() },
    { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
  ],
};

export const featureCard = {
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short card description. Optional.",
    },
    { name: "image", title: "Image", type: "imageWithAlt" },
    { name: "cta", title: "Button", type: "cta" },
  ],
};

export const imageTextSection = {
  name: "imageTextSection",
  title: "Image + Text Section",
  type: "object",
  fields: [
    { name: "heading", title: "Text Content", type: "sectionHeading" },
    { name: "image", title: "Image", type: "imageWithAlt" },
    {
      name: "ctas",
      title: "Buttons",
      type: "array",
      of: [{ type: "cta" }],
    },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    },
    {
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Teal", value: "teal" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    },
  ],
};
