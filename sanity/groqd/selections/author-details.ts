import { q, sanityImage, type Selection, type TypeFromSelection } from "groqd";

export const authorDetailsSelection = {
  id: ["_id", q.string()],
  createdAt: ["_createdAt", q.string()],
  updatedAt: ["_updatedAt", q.string()],
  slug: q.slug("slug"),
  name: q.string(),
  bio: q.string(),
  image: sanityImage("image", {
    additionalFields: {
      alt: q.string(),
      metadata: q("asset->metadata").grab$({
        lqip: q.string(),
      }),
    },
  }),
} satisfies Selection;

export type AuthorDetails = TypeFromSelection<typeof authorDetailsSelection>;
