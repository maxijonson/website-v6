import type { PageProps, RouteCatchAllHandler } from "@/utils/types";
import { notFound } from "next/navigation";
import { blogHomeHandler } from "./route-handlers/blogHomeHandler";
import { blogCategoryHandler } from "./route-handlers/blogCategoryHandler";

export type BlogPageProps = PageProps<{
  slug?: string[];
}>;

export type BlogRouteHandler = RouteCatchAllHandler<BlogPageProps["params"]>;

const handlers: BlogRouteHandler[] = [blogHomeHandler, blogCategoryHandler];

const BlogPage = async (props: BlogPageProps) => {
  for (const handler of handlers) {
    if (await handler.canHandle(props)) {
      return handler.render(props);
    }
  }
  notFound();
};

export default BlogPage;
