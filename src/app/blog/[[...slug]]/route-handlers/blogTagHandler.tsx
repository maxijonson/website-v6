import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import type { BlogRouteHandler } from ".";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { findTagBySlug } from "../../../../../sanity/queries/tags/findTagBySlug";
import { getTags } from "../../../../../sanity/queries/tags/getTags";
import BlogTagPage from "../components/blog-tag-page/blog-tag-page";
import {
  getOpenGraphImageResponse,
  ogImageSize,
} from "../utils/getOpenGraphImageResponse";
import { getBaseURL } from "@/utils/getBaseURL";

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

    const ogImages: Required<OpenGraph["images"]> = [
      {
        ...ogImageSize,
        url: `/og/blog/${slug[0]}`,
        alt: tag.image.alt,
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
        url: new URL(`/blog/${slug[0]}`, getBaseURL()),
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
