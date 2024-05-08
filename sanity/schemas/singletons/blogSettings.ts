import { defineField, defineType } from "sanity";
import { makeImageField } from "../../utils/field-generators/make-image-field";

export default defineType({
  type: "document",
  name: "blogSettings",
  title: "Blog Settings",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(100).error("Must be between 3 and 100 characters"),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
    }),
    makeImageField("image", {
      validation: (rule) => [rule.required()],
    }),
  ],
});
