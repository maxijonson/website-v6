import { defineField, defineType, type FieldGroupDefinition } from "sanity";
import author from "./author";
import tag from "./tag";
import postContent from "../fields/post-content";

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
  name: "post",
  title: "Post",
  type: "document",
  groups: [groupDetails, groupMedia, groupSeo],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(80).error("Must be between 3 and 80 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => [rule.required().error("Required")],
      group: groupDetails.name,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: author.name },
      validation: (rule) => [rule.required().error("Required")],
      group: groupDetails.name,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: tag.name } }],
      validation: (rule) => [rule.required().error("Required")],
      group: groupDetails.name,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      description:
        "Additional keywords to add in addition to the tags' keywords.",
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
    defineField({
      name: "body",
      title: "Body",
      type: postContent.name,
      validation: (rule) => [rule.required().error("Required")],
      group: groupDetails.name,
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
