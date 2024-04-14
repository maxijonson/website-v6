import { q, sanityImage, type Selection, type TypeFromSelection } from "groqd";

export const categoryDetailsSelection = {
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
} satisfies Selection;

export type CategoryDetails = TypeFromSelection<
  typeof categoryDetailsSelection
>;
