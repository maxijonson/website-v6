import { defineType } from "sanity";
import {
  makeImageField,
  makeImageFieldDefaultFields,
} from "../../../utils/field-generators/make-image-field";

export default defineType({
  name: "homeHero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [rule.required().error("Required")],
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (rule) => [rule.required().error("Required")],
    },
    makeImageField("image", {
      validation: (rule) => [rule.required().error("Required")],
    }),
    {
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        makeImageField("logo", {
          fields: [
            ...makeImageFieldDefaultFields,
            {
              name: "darkShadow",
              title: "Dark Shadow",
              type: "color",
              validation: (rule) => [rule.required().error("Required")],
            },
          ],
        }),
      ],
      validation: (rule) => [rule.required().error("Required")],
    },
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
