import { defineField, defineType, type FieldGroupDefinition } from "sanity";
import author from "./author";
import tag from "./tag";
import postContent from "../fields/post-content";
import { makeImageField } from "../../utils/field-generators/make-image-field";
import { isUniqueSlug } from "../../utils/isUniqueSlug";

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
        isUnique: isUniqueSlug,
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
    makeImageField("image", {
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
      tags0: "tags.0.name",
      tags1: "tags.1.name",
      tags2: "tags.2.name",
      tags3: "tags.3.name",
    },
    prepare(selection) {
      const { tags0, tags1, tags2, tags3 } = selection;
      const tags = [tags0, tags1, tags2, tags3].filter(Boolean);
      return {
        ...selection,
        subtitle: tags.slice(0, 3).join(", ") + (tags.length > 3 ? "..." : ""),
      };
    },
  },
});
