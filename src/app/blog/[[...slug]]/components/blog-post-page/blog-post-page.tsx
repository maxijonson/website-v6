import Footer from "@/components/footer/footer";
import { cn } from "@/lib/utils";
import { getPostHeadings } from "@/utils/getPostHeadings";
import { notFound } from "next/navigation";
import { postDetailsSelection } from "../../../../../../sanity/groqd/selections/post-details";
import { findPostBySlug } from "../../../../../../sanity/queries/post/findPostBySlug";
import { getPostBody } from "../../../../../../sanity/queries/post/getPostBody";
import { urlForImage } from "../../../../../../sanity/utils/image";
import type { BlogPageProps } from "../../page";
import BlogHeader from "../blog-header/blog-header";
import BlogHero from "../blog-hero/blog-hero";
import PostBody from "../post-body/post-body";
import TableOfContents from "../table-of-contents/table-of-contents";
import { Separator } from "@/components/ui/separator";
import BlogPostShare from "./blog-post-share";
import BlogPostComments from "./blog-post-comments";
import { Suspense } from "react";

const BlogPostPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const post = await findPostBySlug(slug[0], postDetailsSelection);
  if (!post) notFound();

  const body = await getPostBody(post.id);
  const headings = getPostHeadings(body);

  return (
    <div>
      <BlogHeader />
      <main className="min-h-dvh">
        <article>
          <BlogHero
            asHeader
            banner={urlForImage(post.image)}
            bannerAlt={post.image.alt}
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
              <PostBody body={body} />
              <div className={cn("flex flex-col pt-8", "md:hidden")}>
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
                  <BlogPostShare slug={post.slug} title={post.title} />
                </div>
              </aside>
            )}
          </div>
        </article>
        <Suspense fallback={null}>
          <div
            className={cn("mx-auto flex w-full max-w-5xl pt-12", "md:pt-20")}
          >
            <BlogPostComments term={post.giscusTerm} />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
