import { findTagBySlug } from "../../../../../sanity/queries/tags/findTagBySlug";
import BlogTagPage from "../components/blog-tag-page/blog-tag-page";
import { getTags } from "../../../../../sanity/queries/tags/getTags";
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import { getImageDimensions } from "@sanity/asset-utils";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { urlForImage } from "../../../../../sanity/utils/image";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import type { BlogRouteHandler } from ".";
import { notFound } from "next/navigation";
import { getOpenGraphImageResponse } from "../utils/getOpenGraphImageResponse";

export const blogTagHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const tag = await findTagBySlug(slug[0], pick(tagDetailsSelection, ["id"]));
    return !!tag;
  },
  render: BlogTagPage,
  generateStaticParams: async () => {
    const tags = await getTags(pick(tagDetailsSelection, ["slug"]));
    return tags.map(({ slug }) => ({ slug: [slug] }));
  },
  generateMetadata: async ({ params: { slug = [] } }, parent) => {
    if (slug.length !== 1) return {};

    const [tag, definedParentMetadata] = await Promise.all([
      findTagBySlug(
        slug[0],
        pick(tagDetailsSelection, ["name", "description", "image", "keywords"]),
      ),
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

    const keywords = Array.from(
      new Set<string>(["blog", tag.name, ...tag.keywords]),
    );

    return {
      ...definedParentMetadata,
      title,
      description,
      keywords,
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
  openGraphImage: async ({ params: { slug = [] } }) => {
    const tag = await findTagBySlug(
      slug[0],
      pick(tagDetailsSelection, ["image", "caption", "description", "name"]),
    );
    if (!tag) notFound();

    return getOpenGraphImageResponse({
      image: tag.image,
      title: tag.caption,
      description: tag.description,
      tags: [tag],
    });
  },
};
