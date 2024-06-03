/* eslint-disable @next/next/no-img-element */
import { blogRouteHandlers } from "@/app/blog/[[...slug]]/route-handlers";
import type { GetRouteHandler } from "@/utils/types";
import { notFound } from "next/navigation";

export const GET: GetRouteHandler<{ path: string[] }> = async (
  req,
  { params: { path = [] } },
) => {
  if (path[0] === "blog") {
    const slug = path.slice(1);
    for (const handler of blogRouteHandlers) {
      if (await handler.canHandle({ params: { slug } })) {
        return (
          handler.openGraphImage?.({
            params: { slug },
            id: "og-image",
          }) ?? notFound()
        );
      }
    }
  }
  notFound();
};
