/* eslint-disable @next/next/no-img-element */
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import type { BlogRouteHandler } from ".";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { findPostBySlug } from "../../../../../sanity/queries/post/findPostBySlug";
import { getPosts } from "../../../../../sanity/queries/post/getPosts";
import BlogPostPage from "../components/blog-post-page/blog-post-page";
import {
  getOpenGraphImageResponse,
  ogImageSize,
} from "../utils/getOpenGraphImageResponse";
import { getBaseURL } from "@/utils/getBaseURL";

export const blogPostHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const post = await findPostBySlug(
      slug[0],
      pick(postDetailsSelection, ["id"]),
    );
    return !!post;
  },
  render: BlogPostPage,
  generateStaticParams: async () => {
    const posts = await getPosts(pick(postDetailsSelection, ["slug"]));
    return posts.map(({ slug }) => ({ slug: [slug] }));
  },
  generateMetadata: async ({ params: { slug = [] } }, parent) => {
    if (slug.length !== 1) return {};

    const [post, definedParentMetadata] = await Promise.all([
      findPostBySlug(
        slug[0],
        pick(postDetailsSelection, [
          "title",
          "summary",
          "image",
          "keywords",
          "tags",
        ]),
      ),
      getDefinedParentMetadata(parent),
    ]);
    if (!post) return {};

    const title = post.title;
    const description = post.summary;

    const ogImages: Required<OpenGraph["images"]> = [
      {
        ...ogImageSize,
        url: new URL(`/og/blog/${slug[0]}`, getBaseURL()),
        alt: post.image.alt,
      },
    ];

    const keywords = Array.from(
      new Set<string>([
        "blog",
        ...post.keywords,
        ...post.tags.flatMap((tag) => [
          tag.name,
          tag.category.name,
          ...tag.keywords,
          ...tag.category.keywords,
        ]),
      ]),
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
    const post = await findPostBySlug(
      slug[0],
      pick(postDetailsSelection, [
        "title",
        "summary",
        "image",
        "tags",
        "author",
        "createdAt",
      ]),
    );
    if (!post) notFound();

    return getOpenGraphImageResponse({
      image: post.image,
      title: post.title,
      description: post.summary,
      tags: post.tags,
      date: post.createdAt,
    });
  },
};
