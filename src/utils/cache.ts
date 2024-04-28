export const cacheTag = {
  posts: "post",
  postSlug: (slug: string) => `post-slug-${slug}`,
  postGiscusTerm: (giscusTerm: string) => `post-giscus-${giscusTerm}`,

  tags: "tag",
  tagSlug: (slug: string) => `tag-slug-${slug}`,

  categories: "category",
  categorySlug: (slug: string) => `category-slug-${slug}`,

  authors: "author",
  authorSlug: (slug: string) => `author-slug-${slug}`,
} as const;
