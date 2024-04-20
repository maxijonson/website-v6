import { findCategoryBySlug } from "../../../../../sanity/queries/categories/findCategoryBySlug";
import type { BlogRouteHandler } from "../page";
import BlogCategoryPage from "../components/blog-category-page/blog-category-page";
import { getCategories } from "../../../../../sanity/queries/categories/getCategories";
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import { urlForImage } from "../../../../../sanity/utils/image";
import { getImageDimensions } from "@sanity/asset-utils";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { getTagsByCategoryId } from "../../../../../sanity/queries/tags/getTagsByCategoryId";

export const blogCategoryHandler: BlogRouteHandler = {
  canHandle: async ({ params: { slug = [] } }) => {
    if (slug.length !== 1) return false;
    const category = await findCategoryBySlug(slug[0]);
    return !!category;
  },
  render: BlogCategoryPage,
  generateStaticParams: async () => {
    const categories = await getCategories();
    return categories.map((category) => ({ slug: [category.slug] }));
  },
  generateMetadata: async ({ params: { slug = [] } }, parent) => {
    if (slug.length !== 1) return {};

    const [category, definedParentMetadata] = await Promise.all([
      findCategoryBySlug(slug[0]),
      getDefinedParentMetadata(parent),
    ]);
    if (!category) return {};

    const tags = await getTagsByCategoryId(category.id);

    const title = `${category.name} - Tristan Chin's Blog`;
    const description = category.description;

    const imageDimensions = getImageDimensions(category.image);
    const ogImages: Required<OpenGraph["images"]> = [
      {
        url: urlForImage(category.image),
        alt: category.image.alt,
        width: imageDimensions.width,
        height: imageDimensions.height,
      },
    ];

    return {
      ...definedParentMetadata,
      title,
      description,
      keywords: [
        "blog",
        category.name,
        ...category.keywords,
        ...tags.map((tag) => tag.name),
      ],
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
