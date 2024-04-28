import { q, sanityImage, type Selection, type TypeFromSelection } from "groqd";
import { authorDetailsSelection } from "./author-details";
import { qCoalesce } from "../filters/coalesce";
import { tagDetailsSelection } from "./tag-details";

const postTagsQuery = q("tags").filter().deref().grab$(tagDetailsSelection);

export const postDetailsSelection = {
  id: ["_id", q.string()],
  createdAt: ["_createdAt", q.string()],
  updatedAt: ["_updatedAt", q.string()],
  slug: q.slug("slug"),
  title: q.string(),
  summary: q.string(),
  keywords: ["coalesce(keywords, [])", q.array(q.string())],
  giscusTerm: q.string().min(1),
  image: sanityImage("image", {
    additionalFields: {
      alt: q.string(),
      metadata: q("asset->metadata").grab$({
        lqip: q.string(),
      }),
    },
  }),
  author: q("author").deref().grab$(authorDetailsSelection),
  tags: [qCoalesce(postTagsQuery, "[]"), postTagsQuery.schema],
} satisfies Selection;

export type PostDetails = TypeFromSelection<typeof postDetailsSelection>;
