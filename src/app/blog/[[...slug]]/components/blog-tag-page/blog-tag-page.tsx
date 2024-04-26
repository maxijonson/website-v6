import { notFound } from "next/navigation";
import { getLatestPostsByTagId } from "../../../../../../sanity/queries/post/getLatestPostsByTagId";
import { findTagBySlug } from "../../../../../../sanity/queries/tags/findTagBySlug";
import { urlForImage } from "../../../../../../sanity/utils/image";
import type { BlogPageProps } from "../../page";
import BlogOverview from "../blog-overview/blog-overview";
import { tagDetailsSelection } from "../../../../../../sanity/groqd/selections/tag-details";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";

const BlogTagPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const tag = await findTagBySlug(slug[0], tagDetailsSelection);
  if (!tag) notFound();

  const latestPosts = await getLatestPostsByTagId(tag.id, postDetailsSelection);

  return (
    <BlogOverview
      hero={{
        banner: urlForImage(tag.image),
        bannerAlt: tag.image.alt,
        title: tag.caption,
        description: tag.description,
        breadcrumbs: [
          { label: "Blog", href: "/blog" },
          { label: tag.category.name, href: `/blog/${tag.category.slug}` },
          { label: tag.name, href: `/blog/${tag.slug}` },
        ],
      }}
      sections={[
        {
          title: "Latest Posts",
          posts: latestPosts,
          variant: "featured",
        },
      ]}
    />
  );
};

export default BlogTagPage;
