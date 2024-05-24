import { defineArrayMember, defineField, defineType } from "sanity";
import codeGroup from "./code-group";
import contentBlock from "./content-block";

export default defineType({
  title: "Post Content",
  name: "content",
  type: "array",
  of: [
    defineArrayMember({
      type: contentBlock.name,
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (rule) => [rule.required()],
        }),
      ],
    }),
    defineArrayMember({
      type: codeGroup.name,
    }),
  ],
});
