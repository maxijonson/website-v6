import { defineArrayMember, defineField, defineType } from "sanity";
import content from "../../fields/content";
import { makeImageField } from "../../../utils/field-generators/make-image-field";
import { StarIcon } from "@sanity/icons";

export default defineType({
  name: "homeSkills",
  title: "Skills",
  type: "object",
  icon: StarIcon,
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
      type: content.name,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "skillGroups",
      title: "Skill Groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          title: "Skill Group",
          fields: [
            defineField({
              name: "name",
              title: "Group Name",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "skills",
              title: "Skills",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: "level",
                      title: "Level",
                      type: "number",
                      options: {
                        list: [
                          { title: "1", value: 1 },
                          { title: "2", value: 2 },
                          { title: "3", value: 3 },
                          { title: "4", value: 4 },
                          { title: "5", value: 5 },
                        ],
                      },
                      validation: (rule) => [
                        rule.required(),
                        rule.min(1).max(5).integer(),
                      ],
                    }),
                    makeImageField("image", {
                      validation: (rule) => [rule.required()],
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      media: "image",
                      level: "level",
                    },
                    prepare({ level, ...selection }) {
                      return {
                        ...selection,
                        subtitle: Array(level).fill("★").join(""),
                      };
                    },
                  },
                }),
              ],
              validation: (rule) => [rule.required().min(1)],
            }),
          ],
          preview: {
            select: {
              title: "name",
              skills: "skills",
            },
            prepare({ skills = [], ...selection }) {
              const amount = Object.keys(skills).length;
              return {
                ...selection,
                subtitle: `${amount} Skill${amount !== 1 ? "s" : ""}`,
                media: skills[0]?.image,
              };
            },
          },
        }),
      ],
      validation: (rule) => [rule.required().min(1)],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Skills",
      };
    },
  },
});
