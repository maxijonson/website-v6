import type {
  GenerateMetadata,
  GenerateStaticParams,
  PageProps,
  RouteCatchAllHandler,
} from "@/utils/types";
import { notFound } from "next/navigation";
import { studioHandler } from "./route-handlers/studioHandler";

export type DynamicPageParams = {
  dynamicPath: [string, ...string[]];
};

export type DynamicPageProps = PageProps<DynamicPageParams>;

export type DynamicRouteHandler = RouteCatchAllHandler<DynamicPageParams>;

const handlers: DynamicRouteHandler[] = [studioHandler];

export const generateStaticParams: GenerateStaticParams<
  Record<string, never>,
  DynamicPageParams
> = async (parentProps) => {
  const generatedParams = await Promise.all(
    handlers.map(
      (handler) => handler.generateStaticParams?.(parentProps) ?? [],
    ),
  );
  return generatedParams.flat();
};

export const generateMetadata: GenerateMetadata<DynamicPageParams> = async (
  pageProps,
  parent,
) => {
  for (const handler of handlers) {
    if (await handler.canHandle(pageProps)) {
      return handler.generateMetadata?.(pageProps, parent) ?? {};
    }
  }
  return {};
};

const DynamicPage = async (props: DynamicPageProps) => {
  for (const handler of handlers) {
    if (await handler.canHandle(props)) {
      return handler.render(props);
    }
  }
  notFound();
};

export default DynamicPage;
