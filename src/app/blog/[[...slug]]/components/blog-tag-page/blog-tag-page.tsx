import StructuredData from "@/components/structured-data/structured-data";
import { getBaseURL } from "@/utils/getBaseURL";
import { notFound } from "next/navigation";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";
import { tagDetailsSelection } from "../../../../../../sanity/groqd/selections/tag-details";
import { getRecentPostsByTagId } from "../../../../../../sanity/queries/post/getRecentPosts";
import { findTagBySlug } from "../../../../../../sanity/queries/tags/findTagBySlug";
import { urlForImage } from "../../../../../../sanity/utils/image";
import type { BlogPageProps } from "../../page";
import BlogOverview from "../blog-overview/blog-overview";

const BlogTagPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const tag = await findTagBySlug(slug[0], tagDetailsSelection);
  if (!tag) notFound();

  const latestPosts = await getRecentPostsByTagId(tag.id, postDetailsSelection);

  return (
    <>
      <BlogOverview
        hero={{
          banner: urlForImage(tag.image),
          bannerAlt: tag.image.alt,
          bannerBlur: tag.image.metadata.lqip,
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
      <StructuredData
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: new URL(getBaseURL()).toString(),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: new URL("/blog", getBaseURL()).toString(),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: capitalize(tag.category.name),
              item: new URL(
                `/blog/${tag.category.slug}`,
                getBaseURL(),
              ).toString(),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: tag.name,
              item: new URL(`/blog/${tag.slug}`, getBaseURL()).toString(),
            },
          ],
        }}
      />
    </>
  );
};

export default BlogTagPage;
