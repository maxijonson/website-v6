import { getDefinedParentMetadata } from "@/utils/getDefinedParentMetadata";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import type { BlogRouteHandler } from ".";
import { blogSettingsDetailsSelection } from "../../../../../sanity/groqd/selections/blog-settings-details";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { getBlogSettings } from "../../../../../sanity/queries/blog-settings/getBlogSettings";
import { getCategories } from "../../../../../sanity/queries/categories/getCategories";
import { getTags } from "../../../../../sanity/queries/tags/getTags";
import BlogHomePage from "../components/blog-home-page/blog-home-page";
import {
  getOpenGraphImageResponse,
  ogImageSize,
} from "../utils/getOpenGraphImageResponse";
import { getBaseURL } from "@/utils/getBaseURL";

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

    const ogImages: Required<OpenGraph["images"]> = [
      {
        ...ogImageSize,
        url: new URL("/og/blog", getBaseURL()),
        alt: blogSettings.image.alt,
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
        url: new URL("/blog", getBaseURL()),
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
  openGraphImage: async () => {
    const [blogSettings] = await Promise.all([
      getBlogSettings(
        pick(blogSettingsDetailsSelection, ["image", "description", "caption"]),
      ),
    ]);

    return getOpenGraphImageResponse({
      image: blogSettings.image,
      title: blogSettings.caption,
      description: blogSettings.description,
      tags: [{ name: "Tristan Chin's Blog" }],
    });
  },
};
