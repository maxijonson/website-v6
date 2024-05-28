import Footer from "@/components/footer/footer";
import StructuredData from "@/components/structured-data/structured-data";
import TristanStructuredData, {
  tristanSchema,
} from "@/components/structured-data/tristan-structured-data";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getBaseURL } from "@/utils/getBaseURL";
import { getPostHeadings } from "@/utils/getPostHeadings";
import { q } from "groqd";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { contentDetailsSelection } from "../../../../../../sanity/groqd/selections/content/content-details";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";
import { findPostBySlug } from "../../../../../../sanity/queries/post/findPostBySlug";
import { urlForImage } from "../../../../../../sanity/utils/image";
import type { BlogPageProps } from "../../page";
import BlogHeader from "../blog-header/blog-header";
import BlogHero from "../blog-hero/blog-hero";
import PostBody from "../post-body/post-body";
import TableOfContents from "../table-of-contents/table-of-contents";
import BlogPostCoffee from "./blog-post-coffee";
import BlogPostComments from "./blog-post-comments";
import BlogPostShare from "./blog-post-share";

const BlogPostPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const post = await findPostBySlug(slug[0], {
    ...postDetailsSelection,
    body: q("body").filter().select(contentDetailsSelection),
  });
  if (!post) notFound();

  const headings = getPostHeadings(post.body);

  return (
    <div>
      <BlogHeader />
      <main className="min-h-dvh">
        <article>
          <BlogHero
            asHeader
            banner={urlForImage(post.image)}
            bannerAlt={post.image.alt}
            bannerBlur={post.image.metadata.lqip}
            title={post.title}
            description={post.summary}
            breadcrumbs={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
            categories={post.tags.map((tag) => ({
              label: tag.name,
              href: `/blog/${tag.slug}`,
            }))}
            date={post.createdAt}
            author={post.author}
          />
          <div className={cn("mx-auto flex w-full max-w-5xl pt-8")}>
            <div className="w-full p-4">
              <PostBody body={post.body} />
              <div className={cn("flex flex-col pt-8", "md:hidden")}>
                <div className="mx-auto mb-3">
                  <BlogPostCoffee />
                </div>
                <BlogPostShare slug={post.slug} title={post.title} />
              </div>
            </div>
            {headings.length > 0 && (
              <aside
                className={cn("hidden w-full max-w-xs flex-col p-4", "lg:flex")}
              >
                <div className="sticky top-24 flex flex-col gap-2">
                  <p className="font-bold uppercase">Table of Contents</p>
                  <TableOfContents headings={headings} />
                  <Separator className="my-3" />
                  <div className="mx-auto mb-3">
                    <BlogPostCoffee />
                  </div>
                  <BlogPostShare slug={post.slug} title={post.title} />
                </div>
              </aside>
            )}
          </div>
        </article>
        <Suspense fallback={null}>
          <div
            className={cn(
              "mx-auto flex w-full max-w-5xl flex-col px-4 pt-12",
              "md:pt-20",
            )}
          >
            <BlogPostComments term={post.giscusTerm} />
          </div>
        </Suspense>
      </main>
      <Footer />
      <TristanStructuredData />
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
              name: post.title,
              item: new URL(`/blog/${post.slug}`, getBaseURL()).toString(),
            },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          image: urlForImage(post.image),
          thumbnailUrl: urlForImage(post.image),
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          description: post.summary,
          url: new URL(`/blog/${post.slug}`, getBaseURL()).toString(),
          author: [tristanSchema],
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": new URL(`/blog/${post.slug}`, getBaseURL()).toString(),
          },
        }}
      />
    </div>
  );
};

export default BlogPostPage;
