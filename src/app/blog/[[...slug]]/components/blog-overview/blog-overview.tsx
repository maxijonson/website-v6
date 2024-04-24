import Footer from "@/components/footer/footer";
import BlogHeader from "../blog-header/blog-header";
import type { BlogHeroProps } from "../blog-hero/blog-hero";
import type { BlogSectionProps } from "../blog-section/blog-section";
import BlogHero from "../blog-hero/blog-hero";
import BlogSection from "../blog-section/blog-section";
import type React from "react";

export interface BlogOverviewProps {
  hero: BlogHeroProps;
  sections: BlogSectionProps[];
  children?: React.ReactNode;
}

const BlogOverview = ({ hero, sections, children }: BlogOverviewProps) => {
  const postSlugs = new Set<string>();
  const uniqueSections = sections.map((section) => ({
    ...section,
    posts: section.posts.filter((post) => {
      if (postSlugs.has(post.slug)) {
        return false;
      }
      postSlugs.add(post.slug);
      return true;
    }),
  }));

  return (
    <div>
      <BlogHeader />
      <main className="min-h-dvh">
        <BlogHero {...hero} />

        <div className="flex flex-col gap-4">
          {uniqueSections.map(
            (section) =>
              section.posts.length > 0 && (
                <BlogSection key={section.title} {...section} />
              ),
          )}
        </div>

        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BlogOverview;
