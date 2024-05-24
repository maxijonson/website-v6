import { defineType } from "sanity";

export default defineType({
  name: "contentBlock",
  title: "Block",
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "H4", value: "h4" },
    { title: "H5", value: "h5" },
    { title: "H6", value: "h6" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [{ title: "Bullet", value: "bullet" }],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      { title: "Inline Code", value: "code" },
      { title: "Underline", value: "underline" },
      { title: "Strike", value: "strike-through" },
    ],
    annotations: [
      {
        title: "URL",
        name: "link",
        type: "object",
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
          },
        ],
      },
      {
        name: "stub",
        title: "STUB DO NOT USE",
        type: "object",
        readOnly: true,
        validation: (Rule) => Rule.error("Stub annotation should not be used."),
        deprecated: {
          reason:
            "Stub annotation so that generated schemas is a union. Has no purpose.",
        },
        fields: [
          {
            name: "stub",
            type: "string",
          },
        ],
      },
    ],
  },
});
