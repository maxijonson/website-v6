import { getCategories } from "../../../../../sanity/queries/categories/getCategories";
import { getTags } from "../../../../../sanity/queries/tags/getTags";
import BlogHomePage from "../components/blog-home-page/blog-home-page";
import type { BlogRouteHandler } from "../page";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { getBlogSettings } from "../../../../../sanity/queries/blog-settings/getBlogSettings";
import { blogSettingsDetailsSelection } from "../../../../../sanity/groqd/selections/blog-settings-details";
import { urlForImage } from "../../../../../sanity/utils/image";
import { getImageDimensions } from "@sanity/asset-utils";

export const blogHomeHandler: BlogRouteHandler = {
  canHandle: ({ params: { slug = [] } }) => slug.length === 0,
  render: BlogHomePage,
  generateStaticParams: () => [{ slug: [] }],
  generateMetadata: async (_, parent) => {
    const [categories, tags, blogSettings, definedParentMetadata] =
      await Promise.all([
        getCategories(pick(categoryDetailsSelection, ["name"])),
        getTags(pick(tagDetailsSelection, ["name"])),
        getBlogSettings(blogSettingsDetailsSelection),
        getDefinedParentMetadata(parent),
      ]);

    const title = "Tristan Chin's Blog";
    const description = blogSettings.description;

    const imageDimensions = getImageDimensions(blogSettings.image);
    const ogImages: Required<OpenGraph["images"]> = [
      {
        url: urlForImage(blogSettings.image),
        alt: blogSettings.image.alt,
        width: imageDimensions.width,
        height: imageDimensions.height,
      },
    ];

    const keywords = Array.from(
      new Set<string>([
        "blog",
        ...categories.map((category) => category.name),
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
