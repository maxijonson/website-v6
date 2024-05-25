import { defineField, defineType } from "sanity";
import {
  makeImageField,
  makeImageFieldDefaultOptions,
} from "../../utils/field-generators/make-image-field";
import { isUniqueSlug } from "../../utils/isUniqueSlug";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(80).error("Must be between 3 and 80 characters"),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: isUniqueSlug,
      },
      validation: (rule) => [rule.required()],
    }),
    makeImageField("image", {
      options: {
        ...makeImageFieldDefaultOptions,
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
