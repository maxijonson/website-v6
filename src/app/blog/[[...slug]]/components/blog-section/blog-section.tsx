import { cn } from "@/lib/utils";
import type { PostCardProps } from "../post-card/post-card";
import PostCard from "../post-card/post-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type BlogSectionVariant = "grid" | "featured";

export interface BlogSectionProps {
  title: string;
  posts: PostCardProps["post"][];
  variant?: BlogSectionVariant;
  url?: string;
}

const BlogSection = ({
  title,
  posts,
  variant = "grid",
  url,
}: BlogSectionProps) => {
  const rootVariants = {
    grid: {
      container: cn(
        "grid grid-cols-1 gap-8",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      ),
    },
    featured: {
      container: cn("grid w-full grid-cols-1 gap-8", "sm:grid-cols-2", {
        "lg:grid-cols-3": (posts.length - 1) % 3 === 0,
        "lg:grid-cols-2": (posts.length - 1) % 2 === 0,
        "lg:grid-cols-1":
          (posts.length - 1) % 2 !== 0 && (posts.length - 1) % 3 !== 0,
      }),
    },
  } satisfies Record<BlogSectionVariant, { container: string }>;

  return (
    <section
      className={cn("mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pt-6")}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          {url ? <Link href={url}>{title}</Link> : title}
        </h2>
        {url && (
          <Link href={url} className="text-sm font-medium text-primary">
            <Button variant="link">View All</Button>
          </Link>
        )}
      </div>
      <div className={rootVariants[variant].container}>
        {posts.map((post, i) => {
          const postVariants = {
            grid: {
              post: "",
            },
            featured: {
              post: cn({
                [cn("col-span-full", "lg:min-h-[400px]")]: i === 0,
                [cn("sm:col-span-full", "lg:col-span-1")]:
                  (posts.length - 1) % 2 !== 0 && i === posts.length - 1,
              }),
            },
          } satisfies Record<BlogSectionVariant, { post: string }>;

          return (
            <PostCard
              key={post.slug}
              post={post}
              heading="h2"
              className={postVariants[variant].post}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
