import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BlogPage = () => {
  return (
    <main>
      <section
        className={cn(
          "flex min-h-64 items-center justify-center bg-gradient-to-tr from-stone-200 to-stone-50 py-7 text-stone-800",
          "dark:from-stone-900 dark:to-stone-950 dark:text-stone-300",
          "md:py-10",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4">
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
    </main>
  );
};

export default BlogPage;
