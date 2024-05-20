import type { CodeOptions } from "@sanity/code-input";
import { CodeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const codeOptions: CodeOptions = {
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
};

export default defineType({
  type: "object",
  name: "codeGroup",
  title: "Code Group",
  icon: CodeIcon,
  fields: [
    defineField({
      type: "array",
      name: "snippets",
      of: [
        defineArrayMember({
          type: "code",
          options: codeOptions,
        }),
      ],
    }),
  ],
});
