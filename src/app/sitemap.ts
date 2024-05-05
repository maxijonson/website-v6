import { getBaseURL } from "@/utils/getBaseURL";
import { MetadataRoute } from "next";
import { getPosts } from "../../sanity/queries/post/getPosts";
import { pick } from "../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../sanity/groqd/selections/post-details";
import {
  getRecentPosts,
  getRecentPostsByCategoryId,
  getRecentPostsByTagId,
} from "../../sanity/queries/post/getRecentPosts";
import { categoryDetailsSelection } from "../../sanity/groqd/selections/category-details";
import { getCategories } from "../../sanity/queries/categories/getCategories";
import { getTags } from "../../sanity/queries/tags/getTags";
import { tagDetailsSelection } from "../../sanity/groqd/selections/tag-details";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseURL = getBaseURL();

  const postSelection = pick(postDetailsSelection, ["slug", "updatedAt"]);
  const [posts, [recentPost], categories, tags] = await Promise.all([
    getPosts(postSelection),
    getRecentPosts(postSelection, 1),
    getCategories(pick(categoryDetailsSelection, ["id", "slug", "updatedAt"])),
    getTags(pick(tagDetailsSelection, ["id", "slug", "updatedAt"])),
  ]);

  return [
    {
      url: baseURL.href,
      lastModified: new Date(),
    },
    {
      url: new URL("/blog", baseURL).href,
      lastModified: recentPost.updatedAt,
    },
    ...posts.map((post): MetadataRoute.Sitemap[number] => ({
      url: new URL(`/blog/${post.slug}`, baseURL).href,
      lastModified: post.updatedAt,
    })),
    ...(await Promise.all(
      categories.map(
        async (category): Promise<MetadataRoute.Sitemap[number]> => {
          const [recentPost] = await getRecentPostsByCategoryId(
            category.id,
            postSelection,
            1,
          );
          return {
            url: new URL(`/blog/${category.slug}`, baseURL).href,
            lastModified: recentPost?.updatedAt ?? category.updatedAt,
          };
        },
      ),
    )),
    ...(await Promise.all(
      tags.map(async (tag): Promise<MetadataRoute.Sitemap[number]> => {
        const [recentPost] = await getRecentPostsByTagId(
          tag.id,
          postSelection,
          1,
        );
        return {
          url: new URL(`/blog/${tag.slug}`, baseURL).href,
          lastModified: recentPost?.updatedAt ?? tag.updatedAt,
        };
      }),
    )),
  ];
};

export default sitemap;
