import type { BlogRouteHandler } from "../page";
import { findTagBySlug } from "../../../../../sanity/queries/tags/findTagBySlug";
import BlogTagPage from "../components/blog-tag-page/blog-tag-page";

export const blogTagHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const tag = await findTagBySlug(slug[0]);
    return !!tag;
  },
  render: BlogTagPage,
};
