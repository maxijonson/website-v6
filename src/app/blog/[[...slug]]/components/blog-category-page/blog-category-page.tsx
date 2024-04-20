import { notFound } from "next/navigation";
import type { BlogPageProps } from "../../page";
import { findCategoryBySlug } from "../../../../../../sanity/queries/categories/findCategoryBySlug";
import BlogOverview from "../blog-overview/blog-overview";
import { getTagsByCategoryId } from "../../../../../../sanity/queries/tags/getTagsByCategoryId";
import { urlForImage } from "../../../../../../sanity/utils/image";
import { getLatestPostsByCategoryId } from "../../../../../../sanity/queries/post/getLatestPostsByCategoryId";
import { getLatestPostsByTagId } from "../../../../../../sanity/queries/post/getLatestPostsByTagId";

const BlogCategoryPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const category = await findCategoryBySlug(slug[0]);
  if (!category) notFound();

  const [tags, latestPosts] = await Promise.all([
    getTagsByCategoryId(category.id),
    getLatestPostsByCategoryId(category.id),
  ]);

  const latestPostsByTag = await Promise.all(
    tags.map(async (tag) => {
      return {
        tag,
        posts: await getLatestPostsByTagId(tag.id),
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
