/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { getBaseURL } from "@/utils/getBaseURL";
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import type { BlogRouteHandler } from ".";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { findPostBySlug } from "../../../../../sanity/queries/post/findPostBySlug";
import { getPosts } from "../../../../../sanity/queries/post/getPosts";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import BlogPostPage from "../components/blog-post-page/blog-post-page";

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
        url: `/og/blog/${slug[0]}`,
        alt: post.image.alt,
        width: 1200,
        height: 630,
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

    const imageUrl = getImageBuilder(post.image).blur(100).url();

    const authorAvatarSize = 80;
    const authorAvatarUrl = getImageBuilder(post.author.image)
      .quality(100)
      .size(authorAvatarSize, authorAvatarSize)
      .url();

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={post.image.alt}
            tw="w-full h-full object-cover absolute z-0 top-0 left-0"
          />
          <div tw="bg-black/70 w-full h-full flex flex-col justify-center items-center z-10 text-stone-50">
            <div tw="flex justify-center flex-wrap max-w-4xl">
              {post.tags.map((tag) => (
                <span
                  key={tag.name}
                  tw={cn(
                    "bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-xl mb-4",
                    {
                      "ml-4": tag !== post.tags[0],
                    },
                  )}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div tw="text-6xl max-w-5xl text-center font-bold">
              {post.title}
            </div>
            <div tw="max-w-6xl text-2xl text-center text-stone-300 mt-4">
              {post.summary}
            </div>

            <div tw="flex items-center mt-4 text-stone-300">
              <div tw="flex items-center">
                <img
                  src={authorAvatarUrl}
                  alt={post.author.image.alt}
                  tw="rounded-full"
                  width={authorAvatarSize}
                  height={authorAvatarSize}
                />
                <div tw="ml-4 text-3xl">{post.author.name}</div>
              </div>
              <div tw="mx-4">•</div>
              <div tw="text-3xl">
                {new Date(post.createdAt).toLocaleDateString("en", {
                  dateStyle: "long",
                })}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL("/font/Inter/Inter-Regular.ttf", getBaseURL()),
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: await fetch(
              new URL("/font/Inter/Inter-Medium.ttf", getBaseURL()),
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 500,
          },
          {
            name: "Inter",
            data: await fetch(
              new URL("/font/Inter/Inter-Bold.ttf", getBaseURL()),
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  },
};
