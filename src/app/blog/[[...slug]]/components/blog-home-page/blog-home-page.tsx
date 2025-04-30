import StructuredData from "@/components/structured-data/structured-data";
import { blogSettingsDetailsSelection } from "../../../../../../sanity/groqd/selections/blog-settings-details";
import {
  categoryDetailsSelection,
  type CategoryDetails,
} from "../../../../../../sanity/groqd/selections/category-details";
import {
  postDetailsSelection,
  type PostDetails,
} from "../../../../../../sanity/groqd/selections/post-details";
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

  const usedIds = new Set(latestPosts.map((post) => post.id));
  const latestPostsByCategory: {
    category: CategoryDetails;
    posts: PostDetails[];
  }[] = [];
  for (const category of categories) {
    const posts = await getRecentPostsByCategoryId(
      category.id,
      postDetailsSelection,
      { excludeIds: Array.from(usedIds) },
    );
    posts.forEach((p) => usedIds.add(p.id));
    latestPostsByCategory.push({ category, posts });
  }

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
