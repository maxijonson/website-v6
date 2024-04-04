import { defineField, defineType, type FieldGroupDefinition } from "sanity";

const groupDetails = {
  name: "Details",
  title: "Details",
} satisfies FieldGroupDefinition;
const groupMedia = {
  name: "media",
  title: "Media",
} satisfies FieldGroupDefinition;
const groupSeo = {
  name: "seo",
  title: "SEO",
} satisfies FieldGroupDefinition;

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [groupDetails, groupMedia, groupSeo],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(80).error("Must be between 3 and 80 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [rule.required().error("Required")],
      group: groupDetails.name,
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(100).error("Must be between 3 and 100 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: groupSeo.name,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (rule) => [rule.required().error("Required")],
        },
      ],
      validation: (rule) => [rule.required().error("Required")],
      group: groupMedia.name,
    }),
  ],
});
