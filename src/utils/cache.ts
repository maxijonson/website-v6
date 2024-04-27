export const cacheTag = {
  posts: "post",
  postSlug: (slug: string) => `post-${slug}`,

  tags: "tag",
  tagSlug: (slug: string) => `tag-${slug}`,

  categories: "category",
  categorySlug: (slug: string) => `category-${slug}`,

  authors: "author",
  authorSlug: (slug: string) => `author-${slug}`,
} as const;
