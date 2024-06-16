import { PiGavel } from "react-icons/pi";
import { defineField, defineType } from "sanity";
import content from "../../fields/content";

export default defineType({
  name: "privacyPolicyPage",
  title: "Privacy Policy Page",
  type: "document",
  icon: PiGavel,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: content.name,
      validation: (rule) => [rule.required()],
    }),
  ],
  preview: {
    prepare() {
      return {
        media: PiGavel,
      };
    },
  },
});
