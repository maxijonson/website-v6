import { notFound } from "next/navigation";
import type { BlogPageProps } from "../../page";
import { findCategoryBySlug } from "../../../../../../sanity/queries/categories/findCategoryBySlug";
import BlogOverview from "../blog-overview/blog-overview";
import { getTagsByCategoryId } from "../../../../../../sanity/queries/tags/getTagsByCategoryId";
import { urlForImage } from "../../../../../../sanity/utils/image";
import { categoryDetailsSelection } from "../../../../../../sanity/groqd/selections/category-details";
import { pick } from "../../../../../../sanity/groqd/selections/pick";
import { tagDetailsSelection } from "../../../../../../sanity/groqd/selections/tag-details";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";
import {
  getRecentPostsByCategoryId,
  getRecentPostsByTagId,
} from "../../../../../../sanity/queries/post/getRecentPosts";

const BlogCategoryPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const category = await findCategoryBySlug(slug[0], categoryDetailsSelection);
  if (!category) notFound();

  const [tags, latestPosts] = await Promise.all([
    getTagsByCategoryId(
      category.id,
      pick(tagDetailsSelection, ["id", "name", "slug"]),
    ),
    getRecentPostsByCategoryId(category.id, postDetailsSelection),
  ]);

  const latestPostsByTag = await Promise.all(
    tags.map(async (tag) => {
      return {
        tag,
        posts: await getRecentPostsByTagId(tag.id, postDetailsSelection),
      };
    }),
  );

  return (
    <BlogOverview
      hero={{
        banner: urlForImage(category.image),
        bannerAlt: category.image.alt,
        title: category.caption,
        description: category.description,
        breadcrumbs: [
          { label: "Blog", href: "/blog" },
          { label: category.name, href: `/blog/${category.slug}` },
        ],
        categories: tags.map((tag) => ({
          label: tag.name,
          href: `/blog/${tag.slug}`,
        })),
      }}
      sections={[
        {
          title: "Latest Posts",
          posts: latestPosts,
          variant: "featured",
        },
        ...latestPostsByTag.map(({ tag, posts }) => ({
          title: tag.name,
          posts,
          url: `/blog/${tag.slug}`,
        })),
      ]}
    />
  );
};

export default BlogCategoryPage;
