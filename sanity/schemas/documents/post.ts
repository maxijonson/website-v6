import {
  defineField,
  defineType,
  type CustomValidator,
  type CustomValidatorResult,
  type FieldGroupDefinition,
} from "sanity";
import { pick } from "../../groqd/selections/pick";
import { postDetailsSelection } from "../../groqd/selections/post-details";
import { findPostByGiscusTerm } from "../../queries/post/findPostByGiscusTerm";
import { makeImageField } from "../../utils/field-generators/make-image-field";
import { isUniqueSlug } from "../../utils/isUniqueSlug";
import content from "../fields/content";
import author from "./author";
import tag from "./tag";

const groupDetails = {
  name: "Details",
  title: "Details",
} satisfies FieldGroupDefinition;
const groupMedia = {
  name: "media",
  title: "Media",
} satisfies FieldGroupDefinition;
const groupSeo = {
  name: "seo",
  title: "SEO",
} satisfies FieldGroupDefinition;

const validateGiscusTerm: CustomValidator<string | undefined> = async (
  value,
  ctx,
): Promise<CustomValidatorResult> => {
  if (!value || !ctx.document) return true;
  const post = await findPostByGiscusTerm(
    value,
    pick(postDetailsSelection, ["id"]),
  );
  if (
    !post ||
    post.id === ctx.document._id ||
    `drafts.${post.id}` === ctx.document._id
  )
    return true;
  return `Giscus terms must be unique.`;
};

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [groupDetails, groupMedia, groupSeo],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(80).error("Must be between 3 and 80 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (rule) => [
        rule.required(),
        rule.min(3).max(250).error("Must be between 3 and 250 characters"),
      ],
      group: groupDetails.name,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueSlug,
      },
      validation: (rule) => [rule.required()],
      group: groupDetails.name,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: author.name },
      validation: (rule) => [rule.required()],
      group: groupDetails.name,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: tag.name } }],
      validation: (rule) => [rule.required()],
      group: groupDetails.name,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      description:
        "Additional keywords to add in addition to the tags' keywords.",
      type: "array",
      of: [{ type: "string" }],
      group: groupSeo.name,
    }),
    defineField({
      name: "giscusTerm",
      title: "Giscus Term",
      type: "string",
      description:
        "Unique term used to create discussions on Github with Giscus. Shouldn't be changed after creation, otherwise a new discussion will be created and the old one will be lost.",
      validation: (rule) => [rule.required(), rule.custom(validateGiscusTerm)],
      group: groupDetails.name,
    }),
    makeImageField("image", {
      group: groupMedia.name,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: content.name,
      validation: (rule) => [rule.required()],
      group: groupDetails.name,
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image",
      tag0: "tags.0.name",
      tag1: "tags.1.name",
      tag2: "tags.2.name",
      tag3: "tags.3.name",
    },
    prepare({ tag0, tag1, tag2, tag3, ...selection }) {
      const tags = [tag0, tag1, tag2].filter(Boolean);
      const subtitle = tags.length > 0 ? tags.join(", ") : "";
      const hasMoreTags = Boolean(tag3);
      return {
        ...selection,
        subtitle: hasMoreTags ? `${subtitle}…` : subtitle,
      };
    },
  },
});
