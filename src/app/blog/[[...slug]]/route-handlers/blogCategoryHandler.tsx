import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import type { BlogRouteHandler } from ".";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { findCategoryBySlug } from "../../../../../sanity/queries/categories/findCategoryBySlug";
import { getCategories } from "../../../../../sanity/queries/categories/getCategories";
import { getTagsByCategoryId } from "../../../../../sanity/queries/tags/getTagsByCategoryId";
import BlogCategoryPage from "../components/blog-category-page/blog-category-page";
import {
  getOpenGraphImageResponse,
  ogImageSize,
} from "../utils/getOpenGraphImageResponse";
import { getBaseURL } from "@/utils/getBaseURL";

export const blogCategoryHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const category = await findCategoryBySlug(
      slug[0],
      pick(categoryDetailsSelection, ["id"]),
    );
    return !!category;
  },
  render: BlogCategoryPage,
  generateStaticParams: async () => {
    const categories = await getCategories(
      pick(categoryDetailsSelection, ["slug"]),
    );
    return categories.map((category) => ({ slug: [category.slug] }));
  },
  generateMetadata: async ({ params: { slug = [] } }, parent) => {
    if (slug.length !== 1) return {};

    const [category, definedParentMetadata] = await Promise.all([
      findCategoryBySlug(
        slug[0],
        pick(categoryDetailsSelection, [
          "id",
          "name",
          "description",
          "image",
          "keywords",
        ]),
      ),
      getDefinedParentMetadata(parent),
    ]);
    if (!category) return {};

    const tags = await getTagsByCategoryId(
      category.id,
      pick(tagDetailsSelection, ["name"]),
    );

    const title = `${category.name} - Tristan Chin's Blog`;
    const description = category.description;

    const ogImages: Required<OpenGraph["images"]> = [
      {
        ...ogImageSize,
        url: new URL(`/og/blog/${slug[0]}`, getBaseURL()),
        alt: category.image.alt,
      },
    ];

    const keywords = Array.from(
      new Set<string>([
        "blog",
        category.name,
        ...category.keywords,
        ...tags.map((tag) => tag.name),
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
        cardType: "summary_large_image",
      },
    };
  },
  openGraphImage: async ({ params: { slug = [] } }) => {
    const category = await findCategoryBySlug(
      slug[0],
      pick(categoryDetailsSelection, [
        "image",
        "caption",
        "description",
        "name",
      ]),
    );
    if (!category) notFound();

    return getOpenGraphImageResponse({
      image: category.image,
      title: category.caption,
      description: category.description,
      tags: [category],
    });
  },
};
