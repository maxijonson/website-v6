import type { PageProps, RouteCatchAllHandler } from "@/utils/types";
import { notFound } from "next/navigation";
import { blogHomeHandler } from "./route-handlers/blogHomeHandler";

export type BlogPageProps = PageProps<{
  slug?: string[];
}>;

const handlers: RouteCatchAllHandler<BlogPageProps["params"]>[] = [
  blogHomeHandler,
];

const BlogPage = async (props: BlogPageProps) => {
  for (const handler of handlers) {
    if (await handler.canHandle(props)) {
      return handler.render(props);
    }
  }
  notFound();
};

export default BlogPage;
