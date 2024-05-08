import { defineField, defineType } from "sanity";
import { makeImageField } from "../../../utils/field-generators/make-image-field";
import postContent from "../../fields/post-content";
import { InfoOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "homeIntro",
  title: "Intro",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: postContent.name,
      validation: (rule) => [rule.required()],
    }),
    makeImageField("image", {
      validation: (rule) => [rule.required()],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Intro",
        subtitle: title,
      };
    },
  },
});
