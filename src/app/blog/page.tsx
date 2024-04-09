import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BlogPage = () => {
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
        <h2 className={cn("text-3xl font-bold", "md:text-4xl")}>
          Latest Posts
        </h2>
      </section>
    </main>
  );
};

export default BlogPage;
