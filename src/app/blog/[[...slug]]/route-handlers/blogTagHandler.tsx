import type { BlogRouteHandler } from "../page";
import { findTagBySlug } from "../../../../../sanity/queries/tags/findTagBySlug";
import BlogTagPage from "../components/blog-tag-page/blog-tag-page";
import { getTags } from "../../../../../sanity/queries/tags/getTags";

export const blogTagHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const tag = await findTagBySlug(slug[0]);
    return !!tag;
  },
  render: BlogTagPage,
  generateStaticParams: async () => {
    const tags = await getTags();
    return tags.map((tag) => ({ slug: [tag.slug] }));
  },
};
