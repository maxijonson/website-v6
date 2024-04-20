import type {
  GenerateMetadata,
  GenerateStaticParams,
  PageProps,
  RouteCatchAllHandler,
} from "@/utils/types";
import { notFound } from "next/navigation";
import { blogHomeHandler } from "./route-handlers/blogHomeHandler";
import { blogCategoryHandler } from "./route-handlers/blogCategoryHandler";
import { blogTagHandler } from "./route-handlers/blogTagHandler";

export type BlogPageParams = {
  slug?: string[];
};

export type BlogPageProps = PageProps<BlogPageParams>;

export type BlogRouteHandler = RouteCatchAllHandler<BlogPageParams>;

const handlers: BlogRouteHandler[] = [
  blogHomeHandler,
  blogCategoryHandler,
  blogTagHandler,
];

export const generateStaticParams: GenerateStaticParams<
  Record<string, never>,
  BlogPageParams
> = async (parentProps) => {
  const generatedParams = await Promise.all(
    handlers.map((handler) => handler.generateStaticParams(parentProps)),
  );
  return generatedParams.flat();
};

export const generateMetadata: GenerateMetadata<BlogPageParams> = async (
  pageProps,
  parent,
) => {
  for (const handler of handlers) {
    if (await handler.canHandle(pageProps)) {
      return handler.generateMetadata(pageProps, parent);
    }
  }
  return {};
};

const BlogPage = async (props: BlogPageProps) => {
  for (const handler of handlers) {
    if (await handler.canHandle(props)) {
      return handler.render(props);
    }
  }
  notFound();
};

export default BlogPage;
