import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import { getImageDimensions } from "@sanity/asset-utils";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { findPostBySlug } from "../../../../../sanity/queries/post/findPostBySlug";
import { getPosts } from "../../../../../sanity/queries/post/getPosts";
import { urlForImage } from "../../../../../sanity/utils/image";
import BlogPostPage from "../components/blog-post-page/blog-post-page";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import type { BlogRouteHandler } from ".";

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

    const imageDimensions = getImageDimensions(post.image);
    const ogImages: Required<OpenGraph["images"]> = [
      {
        url: urlForImage(post.image),
        alt: post.image.alt,
        width: imageDimensions.width,
        height: imageDimensions.height,
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
};
