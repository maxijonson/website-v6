import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
import postContent from "../../fields/post-content";
import { makeImageField } from "../../../utils/field-generators/make-image-field";

export default defineType({
  type: "object",
  name: "homeCredentials",
  title: "Credentials",
  icon: BookIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: postContent.name,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "credentials",
      title: "Credientials",
      type: "array",
      validation: (rule) => [rule.required().min(1)],
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "image",
              issuer: "issuer",
              date: "issueDate",
            },
            prepare({ issuer, date, ...selection }) {
              return {
                ...selection,
                subtitle: `${issuer} - ${date}`,
              };
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "issuer",
              title: "Issuer",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
              options: {
                dateFormat: "MMMM YYYY",
              },
            }),
            defineField({
              name: "issueDate",
              title: "Issue Date",
              type: "date",
              options: {
                dateFormat: "MMMM YYYY",
              },
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            makeImageField("image", {
              validation: (rule) => [rule.required()],
            }),
          ],
        }),
      ],
    }),
  ],
});
