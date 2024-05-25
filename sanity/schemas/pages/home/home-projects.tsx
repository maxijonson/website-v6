import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";
import content from "../../fields/content";
import { makeImageField } from "../../../utils/field-generators/make-image-field";
import { Icon } from "@iconify/react";

export default defineType({
  type: "object",
  name: "homeProjects",
  title: "Projects",
  icon: ProjectsIcon,
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
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              validation: (rule) => [rule.required()],
            }),
            makeImageField("image"),
            defineField({
              type: "array",
              name: "links",
              title: "Links",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "url",
                      validation: (rule) => [rule.required()],
                    }),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "icon",
                      options: {
                        showName: true,
                      },
                      validation: (rule: any) => [rule.required()],
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "url",
                      icon: "icon",
                    },
                    prepare({ icon, ...selection }) {
                      return {
                        ...selection,
                        media: icon?.name ? <Icon icon={icon.name} /> : null,
                      };
                    },
                  },
                }),
              ],
              validation: (rule) => [rule.required()],
            }),
          ],
        }),
      ],
      validation: (rule) => [rule.required()],
    }),
  ],
});
