import { cn } from "@/lib/utils";
import type { PostCardProps } from "../post-card/post-card";
import PostCard from "../post-card/post-card";

export type BlogSectionVariant = "grid" | "featured";

export interface BlogSectionProps {
  title: string;
  posts: PostCardProps["post"][];
  variant?: BlogSectionVariant;
}

const BlogSection = ({ title, posts, variant = "grid" }: BlogSectionProps) => {
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
    <section className={cn("mx-auto max-w-5xl px-4 pt-6")}>
      <h1 className={cn("mb-4 text-3xl font-bold", "md:text-4xl")}>{title}</h1>
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
