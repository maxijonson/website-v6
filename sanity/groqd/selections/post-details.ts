import { q, type Selection, type TypeFromSelection } from "groqd";
import { postSchema } from "../../sanity.schemas";
import { qCoalesce } from "../filters/coalesce";
import { authorDetailsSelection } from "./author-details";
import { makeImageDetailsQuery } from "./image-details";
import { tagDetailsSelection } from "./tag-details";

const postTagsQuery = q("tags").filter().deref().grab$(tagDetailsSelection);

export const postDetailsSelection = {
  type: ["_type", postSchema.shape._type],
  id: ["_id", postSchema.shape._id],
  createdAt: ["_createdAt", postSchema.shape._createdAt],
  updatedAt: ["_updatedAt", postSchema.shape._updatedAt],
  slug: q.slug("slug"),
  title: postSchema.shape.title,
  summary: postSchema.shape.summary,
  keywords: ["coalesce(keywords, [])", postSchema.shape.keywords.unwrap()],
  giscusTerm: postSchema.shape.giscusTerm.min(1),
  image: makeImageDetailsQuery("image"),
  author: q("author").deref().grab$(authorDetailsSelection),
  tags: [qCoalesce(postTagsQuery, "[]"), postTagsQuery.schema],
} satisfies Selection;

export type PostDetails = TypeFromSelection<typeof postDetailsSelection>;
