import type { RouteCatchAllHandler } from "@/utils/types";
import type { BlogPageParams } from "../page";
import { blogCategoryHandler } from "./blogCategoryHandler";
import { blogHomeHandler } from "./blogHomeHandler";
import { blogPostHandler } from "./blogPostHandler";
import { blogTagHandler } from "./blogTagHandler";

export type BlogRouteHandler = RouteCatchAllHandler<BlogPageParams>;

export const blogRouteHandlers: BlogRouteHandler[] = [
  blogHomeHandler,
  blogPostHandler,
  blogCategoryHandler,
  blogTagHandler,
];
