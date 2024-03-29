import { defineField, defineType } from "sanity";
import author from "./author";
import tag from "./tag";
import blockContent from "../fields/block-content";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(80).error("Must be between 3 and 80 characters"),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (rule) => [
        rule.required().error("Required"),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
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
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: author.name },
      validation: (rule) => [rule.required().error("Required")],
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
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: tag.name } }],
      validation: (rule) => [rule.required().error("Required")],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: blockContent.name,
      validation: (rule) => [rule.required().error("Required")],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
