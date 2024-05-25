import { codeSchema } from "@sanity/code-input";
import { CodeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import CodeGroupPreview from "../../desk/components/code-group-preview/code-group-preview";
import { CodeGroupListItemPreview } from "../../desk/components/code-group-preview/code-group-list-item-preview";

export default defineType({
  type: "object",
  name: "codeGroup",
  title: "Code",
  icon: CodeIcon,
  fields: [
    defineField({
      type: "array",
      name: "snippets",
      of: [
        defineArrayMember({
          type: "code",
          components: {
            ...codeSchema.components,
            preview: CodeGroupListItemPreview,
          },
          preview: {
            select: codeSchema.preview?.select,
            prepare: (value) => {
              return {
                ...codeSchema.preview?.prepare?.(value),
                media: undefined,
                title:
                  value.filename || (value.language || "unknown").toUpperCase(),
                selection: value,
              };
            },
          },
          options: {
            language: "text",
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
    }),
  ],
  preview: {
    select: {
      snippets: "snippets",
    },
  },
  components: {
    preview: CodeGroupPreview,
  },
});
