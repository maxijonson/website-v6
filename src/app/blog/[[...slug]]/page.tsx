import { serverEnv } from "@/env/env-server";
import type { PageProps } from "@/utils/types";
import { notFound } from "next/navigation";
import { blogRouteHandlers, type BlogRouteHandler } from "./route-handlers";

export type BlogPageParams = {
  slug?: string[];
};

export type BlogPageProps = PageProps<BlogPageParams>;

export const generateStaticParams: BlogRouteHandler["generateStaticParams"] =
  async (parentProps) => {
    if (serverEnv.SANITY_ECO_MODE) return [];
    const generatedParams = await Promise.all(
      blogRouteHandlers.map(
        (handler) => handler.generateStaticParams?.(parentProps) ?? [],
      ),
    );
    return generatedParams.flat();
  };

export const generateMetadata: BlogRouteHandler["generateMetadata"] = async (
  pageProps,
  parent,
) => {
  for (const handler of blogRouteHandlers) {
    if (await handler.canHandle(pageProps)) {
      return handler.generateMetadata?.(pageProps, parent) ?? {};
    }
  }
  return {};
};

const BlogPage: BlogRouteHandler["render"] = async (props) => {
  for (const handler of blogRouteHandlers) {
    if (await handler.canHandle(props)) {
      return handler.render(props);
    }
  }
  notFound();
};

export default BlogPage;
