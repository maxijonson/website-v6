import Footer from "@/components/footer/footer";
import BlogHeader from "../blog-header/blog-header";
import BlogHero from "../blog-hero/blog-hero";
import type { BlogPageProps } from "../../page";
import { notFound } from "next/navigation";
import { findPostBySlug } from "../../../../../../sanity/queries/post/findPostBySlug";
import { urlForImage } from "../../../../../../sanity/utils/image";

const BlogPostPage = async ({ params: { slug = [] } }: BlogPageProps) => {
  if (slug.length !== 1) notFound();

  const post = await findPostBySlug(slug[0]);
  if (!post) notFound();

  return (
    <div>
      <BlogHeader />
      <main className="min-h-dvh">
        <article>
          <BlogHero
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
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
