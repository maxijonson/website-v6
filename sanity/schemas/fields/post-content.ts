import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Post Content",
  name: "postContent",
  type: "array",
  of: [
    defineArrayMember({
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
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (rule) => [rule.required().error("Required")],
        },
      ],
    }),
    defineArrayMember({
      type: "code",
      options: {
        language: "typescript",
        withFilename: true,
        languageAlternatives: [
          /**
           * If you add more languages, you'll need to:
           * 1. Add the language below
           * 2. Update the post-body-code.tsx to register the language
           */
          { title: "TypeScript", value: "typescript" },
          { title: "TSX", value: "tsx" },
          { title: "Shell", value: "sh" },
          { title: "JSON", value: "json" },
          { title: "Text", value: "text" },
        ],
      },
    }),
  ],
});
