import BlogHomePage from "../components/blog-home-page/blog-home-page";
import type { BlogRouteHandler } from "../page";

export const blogHomeHandler: BlogRouteHandler = {
  canHandle: ({ params: { slug = [] } }) => slug.length === 0,
  render: BlogHomePage,
  generateStaticParams: () => [{ slug: [] }],
};
