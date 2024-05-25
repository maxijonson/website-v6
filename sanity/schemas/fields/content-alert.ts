import { defineArrayMember, defineField, defineType } from "sanity";
import contentBlock from "./content-block";
import contentImage from "./content-image";
import codeGroup from "./code-group";
import ContentAlertPreview from "../../desk/components/content-alert-preview";
import { WarningOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "contentAlert",
  title: "Alert",
  type: "object",
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Error", value: "error" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => [rule.required()],
      initialValue: "default",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
      options: {
        showName: true,
      },
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "array",
      of: [
        defineArrayMember({
          type: contentBlock.name,
        }),
        defineArrayMember({
          type: contentImage.name,
        }),
        defineArrayMember({
          type: codeGroup.name,
        }),
      ],
      validation: (rule) => [rule.required()],
    }),
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
      message: "message",
      variant: "variant",
    },
    prepare(selection) {
      return {
        title: selection.title || "Alert",
        selection,
      };
    },
  },
  components: {
    preview: ContentAlertPreview,
  },
});
