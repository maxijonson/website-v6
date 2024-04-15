import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";

export interface BlogHeroProps {
  banner: ImageProps["src"];
  bannerAlt: ImageProps["alt"];
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  categories?: { label: string; href: string }[];
}

const BlogHero = ({
  banner,
  bannerAlt,
  title,
  description,
  breadcrumbs,
  categories = [],
}: BlogHeroProps) => {
  return (
    <section
      className={cn(
        "relative flex min-h-64 flex-col items-center justify-center bg-gradient-to-tr from-stone-200 to-stone-50 py-7 text-stone-800",
        "dark:from-stone-900 dark:to-stone-950 dark:text-stone-300",
        "md:py-10",
      )}
    >
      <div
        className={cn(
          "absolute size-full overflow-hidden",
          "after:absolute after:size-full after:bg-stone-50/80",
          "supports-[backdrop-filter]:after:bg-stone-50/60 supports-[backdrop-filter]:after:backdrop-blur-sm",
          "dark:after:bg-stone-950/80",
          "dark:supports-[backdrop-filter]:after:bg-stone-950/60",
        )}
      >
        <Image
          src={banner}
          className="object-cover"
          alt={bannerAlt}
          fill
          priority
        />
      </div>
      <div
        className={cn(
          "z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2 px-4",
          "md:items-start",
        )}
      >
        <nav>
          <ul
            className={cn("flex flex-wrap justify-center", "md:justify-start")}
          >
            {breadcrumbs.map((breadcrumb, i) => (
              <li key={breadcrumb.href} className="flex items-center">
                <Link href={breadcrumb.href}>
                  <Badge
                    variant={
                      i === breadcrumbs.length - 1 ? "default" : "outline"
                    }
                    className={cn("text-nowrap rounded-full uppercase", {
                      [cn(
                        "bg-stone-50/50 transition-all",
                        "hover:bg-stone-50/80",
                        "dark:bg-stone-950/50",
                        "dark:hover:bg-stone-950/80",
                      )]: i !== breadcrumbs.length - 1,
                    })}
                  >
                    {i === breadcrumbs.length - 1 ? (
                      <h1>{breadcrumb.label}</h1>
                    ) : (
                      <span>{breadcrumb.label}</span>
                    )}
                  </Badge>
                </Link>
                {i !== breadcrumbs.length - 1 && (
                  <RxCaretRight className="mx-1" />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p
          className={cn(
            "text-center text-2xl font-bold text-stone-950",
            "md:text-3xl",
            "dark:text-stone-50",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-center text-xs text-stone-800",
            "sm:text-sm",
            "md:text-base",
            "dark:text-stone-300",
          )}
        >
          {description}
        </p>
        <nav>
          {categories.length && (
            <ul
              className={cn(
                "flex flex-wrap justify-center gap-2",
                "md:justify-start",
              )}
            >
              {categories.map((category) => (
                <li key={category.href}>
                  <Link href={category.href}>
                    <Badge
                      variant="secondary"
                      className={cn("text-nowrap rounded-full uppercase")}
                    >
                      <h2>{category.label}</h2>
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </section>
  );
};

export default BlogHero;
