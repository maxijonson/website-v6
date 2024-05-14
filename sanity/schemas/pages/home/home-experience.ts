import { defineArrayMember, defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";
import content from "../../fields/content";
import { makeImageField } from "../../../utils/field-generators/make-image-field";

export default defineType({
  type: "object",
  name: "homeExperience",
  title: "Experience",
  icon: CaseIcon,
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
      type: content.name,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "positions",
      title: "Positions",
      type: "array",
      validation: (rule) => [rule.required().min(1)],
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Company",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "position",
              title: "Position",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
              options: {
                dateFormat: "MMMM YYYY",
              },
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
              options: {
                dateFormat: "MMMM YYYY",
              },
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Full-time", value: "full-time" },
                  { title: "Part-time", value: "part-time" },
                  { title: "Internship", value: "internship" },
                ],
                layout: "radio",
              },
              validation: (rule) => [rule.required()],
            }),
            makeImageField("logo", {
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [
                defineArrayMember({
                  type: "string",
                }),
              ],
              validation: (rule) => [rule.required().min(1)],
            }),
          ],
          preview: {
            select: {
              title: "company",
              media: "logo",
              from: "startDate",
              to: "endDate",
            },
            prepare({ from, to, ...selection }) {
              return {
                ...selection,
                subtitle: `${from} - ${to ?? "Present"}`,
              };
            },
          },
        }),
      ],
    }),
  ],
});
