import type { RouteCatchAllHandler } from "@/utils/types";
import BlogHomePage from "../components/blog-home-page/blog-home-page";
import type { BlogPageProps } from "../page";

export const blogHomeHandler: RouteCatchAllHandler<BlogPageProps["params"]> = {
  canHandle: ({ params: { slug = [] } }) => slug.length === 0,
  render: BlogHomePage,
};
