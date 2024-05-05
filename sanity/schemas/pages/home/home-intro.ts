import { defineType } from "sanity";
import { makeImageField } from "../../../utils/field-generators/make-image-field";
import postContent from "../../fields/post-content";

export default defineType({
  name: "homeIntro",
  title: "Intro",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [rule.required().error("Required")],
    },
    {
      name: "content",
      title: "Content",
      type: postContent.name,
      validation: (rule) => [rule.required().error("Required")],
    },
    makeImageField("image", {
      validation: (rule) => [rule.required().error("Required")],
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
