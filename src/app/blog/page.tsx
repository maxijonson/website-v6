import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getLatestPosts } from "../../../sanity/queries/post/makeGetLatestPostsQuery";
import PostCard from "./components/post-card/post-card";

const BlogPage = async () => {
  const latestPosts = await getLatestPosts();

  return (
    <main className="min-h-dvh">
      <section
        className={cn(
          "flex min-h-64 flex-col items-center justify-center bg-gradient-to-tr from-stone-200 to-stone-50 py-7 text-stone-800",
          "dark:from-stone-900 dark:to-stone-950 dark:text-stone-300",
          "md:py-10",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4",
            "md:items-start",
          )}
        >
          <Badge
            variant="secondary"
            className={cn("rounded-full bg-stone-200", "dark:bg-stone-800")}
          >
            <h1 className={cn("uppercase")}>Blog</h1>
          </Badge>
          <p
            className={cn(
              "pt-2 text-center text-2xl font-bold text-stone-950",
              "dark:text-stone-50",
              "md:text-3xl",
            )}
          >
            Exploring The Tech Stack
          </p>
          <p
            className={cn(
              "pt-2 text-center text-xs text-stone-800",
              "dark:text-stone-300",
              "md:text-sm",
            )}
          >
            Check out some of the blog posts I've written about tech and
            programming!
          </p>
        </div>
      </section>

      <section className={cn("mx-auto max-w-5xl px-4 pt-6")}>
        <h2 className={cn("mb-4 text-3xl font-bold", "md:text-4xl")}>
          Latest Posts
        </h2>
        <div
          className={cn(
            "grid w-full grid-cols-1 gap-8",
            "sm:grid-cols-2",
            "md:grid-cols-3",
          )}
        >
          {latestPosts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              className={cn({
                [cn("sm:col-span-2", "md:col-span-3")]: i === 0,
                [cn("sm:col-span-2", "md:col-span-1")]: i === 1,
              })}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
