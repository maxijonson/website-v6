import { findCategoryBySlug } from "../../../../../sanity/queries/categories/findCategoryBySlug";
import type { BlogRouteHandler } from "../page";
import BlogCategoryPage from "../components/blog-category-page/blog-category-page";
import { getCategories } from "../../../../../sanity/queries/categories/getCategories";

export const blogCategoryHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const category = await findCategoryBySlug(slug[0]);
    return !!category;
  },
  render: BlogCategoryPage,
  generateStaticParams: async () => {
    const categories = await getCategories();
    return categories.map((category) => ({ slug: [category.slug] }));
  },
};
