import StructuredData from "@/components/structured-data/structured-data";
import { blogSettingsDetailsSelection } from "../../../../../../sanity/groqd/selections/blog-settings-details";
import { categoryDetailsSelection } from "../../../../../../sanity/groqd/selections/category-details";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";
import { getBlogSettings } from "../../../../../../sanity/queries/blog-settings/getBlogSettings";
import { getCategories } from "../../../../../../sanity/queries/categories/getCategories";
import {
  getRecentPosts,
  getRecentPostsByCategoryId,
} from "../../../../../../sanity/queries/post/getRecentPosts";
import { urlForImage } from "../../../../../../sanity/utils/image";
import BlogOverview from "../blog-overview/blog-overview";
import { getBaseURL } from "@/utils/getBaseURL";
import PageView from "@/app/components/analytics/page-view";

const BlogHomePage = async () => {
  const [latestPosts, categories, blogSettings] = await Promise.all([
    getRecentPosts(postDetailsSelection),
    getCategories(categoryDetailsSelection),
    getBlogSettings(blogSettingsDetailsSelection),
  ]);

  const latestPostsByCategory = await Promise.all(
    categories.map(async (category) => {
      return {
        category,
        posts: await getRecentPostsByCategoryId(
          category.id,
          postDetailsSelection,
        ),
      };
    }),
  );

  return (
    <>
      <PageView setProperties={{ page_type: "blog-home" }} />
      <BlogOverview
        hero={{
          banner: urlForImage(blogSettings.image),
          bannerAlt: blogSettings.image.alt,
          bannerBlur: blogSettings.image.metadata.lqip,
          title: blogSettings.caption,
          description: blogSettings.description,
          breadcrumbs: [{ label: "Blog", href: "/blog" }],
          categories: categories.map((category) => ({
            label: category.name,
            href: `/blog/${category.slug}`,
          })),
        }}
        sections={[
          {
            title: "Latest Posts",
            posts: latestPosts,
            variant: "featured",
          },
          ...latestPostsByCategory.map(({ category, posts }) => ({
            title: category.name,
            posts,
            url: `/blog/${category.slug}`,
          })),
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
          ],
        }}
      />
    </>
  );
};

export default BlogHomePage;
