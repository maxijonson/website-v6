import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";
import postContent from "../../fields/post-content";
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
      validation: (rule) => [rule.required().error("Required")],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: postContent.name,
      validation: (rule) => [rule.required().error("Required")],
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
              validation: (rule) => [rule.required().error("Required")],
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              validation: (rule) => [rule.required().error("Required")],
            }),
            makeImageField("image", {
              validation: (rule) => [rule.required().error("Required")],
            }),
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
                      validation: (rule) => [rule.required().error("Required")],
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "url",
                      validation: (rule) => [rule.required().error("Required")],
                    }),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "icon",
                      options: {
                        showName: true,
                      },
                      validation: (rule: any) => [
                        rule.required().error("Required"),
                      ],
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
              validation: (rule) => [rule.required().error("Required")],
            }),
          ],
        }),
      ],
      validation: (rule) => [rule.required().error("Required")],
    }),
  ],
});
