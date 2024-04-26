import { q, sanityImage, type Selection, type TypeFromSelection } from "groqd";
import { categoryDetailsSelection } from "./category-details";

export const tagDetailsSelection = {
  id: ["_id", q.string()],
  createdAt: ["_createdAt", q.string()],
  updatedAt: ["_updatedAt", q.string()],
  slug: q.slug("slug"),
  name: q.string(),
  caption: q.string(),
  description: q.string(),
  keywords: ["coalesce(keywords, [])", q.array(q.string())],
  image: sanityImage("image", {
    additionalFields: {
      alt: q.string(),
      metadata: q("asset->metadata").grab$({
        lqip: q.string(),
      }),
    },
  }),
  category: q("category").deref().grab$(categoryDetailsSelection),
} satisfies Selection;

export type TagDetails = TypeFromSelection<typeof tagDetailsSelection>;
