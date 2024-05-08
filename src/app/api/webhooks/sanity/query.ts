import { q } from "groqd";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";

export const webhookFilter =
  "_type in ['post', 'category', 'tag', 'author', 'blogSettings', 'homePage']";

export const webhookBodyQuery = q("*")
  .filter(webhookFilter)
  .select({
    "_type == 'post'": {
      type: ["_type", q.literal("post")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
      tags: q("tags")
        .filter()
        .deref()
        .grab$({
          id: tagDetailsSelection.id,
          slug: tagDetailsSelection.slug,
          category: q("category").deref().grab$({
            id: categoryDetailsSelection.id,
            slug: categoryDetailsSelection.slug,
          }),
        }),
    },
    "_type == 'category'": {
      type: ["_type", q.literal("category")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
    },
    "_type == 'tag'": {
      type: ["_type", q.literal("tag")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
      category: q("category").deref().grab$({
        id: categoryDetailsSelection.id,
        slug: categoryDetailsSelection.slug,
      }),
    },
    "_type == 'author'": {
      type: ["_type", q.literal("author")],
    },
    "_type == 'blogSettings'": {
      type: ["_type", q.literal("blogSettings")],
    },
    "_type == 'homePage'": {
      type: ["_type", q.literal("homePage")],
    },
  });
