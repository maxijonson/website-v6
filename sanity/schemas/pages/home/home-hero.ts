import { defineField, defineType } from "sanity";
import {
  makeImageField,
  makeImageFieldDefaultFields,
} from "../../../utils/field-generators/make-image-field";
import { RocketIcon } from "@sanity/icons";

export default defineType({
  name: "homeHero",
  title: "Hero",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (rule) => [rule.required()],
    }),
    makeImageField("image"),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        makeImageField("logo", {
          fields: [
            ...makeImageFieldDefaultFields,
            defineField({
              name: "darkShadow",
              title: "Dark Shadow",
              type: "color",
              validation: (rule) => [rule.required()],
            }),
          ],
        }),
      ],
      validation: (rule) => [rule.required()],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero",
        subtitle: title,
      };
    },
  },
});
