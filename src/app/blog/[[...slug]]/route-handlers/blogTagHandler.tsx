import type { BlogRouteHandler } from "../page";
import { findTagBySlug } from "../../../../../sanity/queries/tags/findTagBySlug";
import BlogTagPage from "../components/blog-tag-page/blog-tag-page";
import { getTags } from "../../../../../sanity/queries/tags/getTags";
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import { getImageDimensions } from "@sanity/asset-utils";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { urlForImage } from "../../../../../sanity/utils/image";

export const blogTagHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const tag = await findTagBySlug(slug[0]);
    return !!tag;
  },
  render: BlogTagPage,
  generateStaticParams: async () => {
    const tags = await getTags();
    return tags.map((tag) => ({ slug: [tag.slug] }));
  },
  generateMetadata: async ({ params: { slug = [] } }, parent) => {
    if (slug.length !== 1) return {};

    const [tag, definedParentMetadata] = await Promise.all([
      findTagBySlug(slug[0]),
      getDefinedParentMetadata(parent),
    ]);
    if (!tag) return {};

    const title = `${tag.name} - Tristan Chin's Blog`;
    const description = tag.description;

    const imageDimensions = getImageDimensions(tag.image);
    const ogImages: Required<OpenGraph["images"]> = [
      {
        url: urlForImage(tag.image),
        alt: tag.image.alt,
        width: imageDimensions.width,
        height: imageDimensions.height,
      },
    ];

    return {
      ...definedParentMetadata,
      title,
      description,
      keywords: ["blog", tag.name, ...tag.keywords],
      openGraph: {
        ...definedParentMetadata.openGraph,
        title,
        description,
        images: ogImages,
      },
      twitter: {
        ...definedParentMetadata.twitter,
        title,
        description,
        images: ogImages,
      },
    };
  },
};
