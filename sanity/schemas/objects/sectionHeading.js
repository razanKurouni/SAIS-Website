export const sectionHeading = {
  name: "sectionHeading",
  title: "Section Heading",
  type: "object",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading. Optional.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Short supporting line. Optional.",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Paragraph copy for this section.",
    },
  ],
};
