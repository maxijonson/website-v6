import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import type { PostDetails } from "../../../../../../sanity/groqd/selections/post-details";
import PostAuthorAvatar from "../post-author-avatar/post-author-avatar";

export interface BlogHeroProps {
  banner: ImageProps["src"];
  bannerAlt: ImageProps["alt"];
  bannerBlur?: ImageProps["blurDataURL"];
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  categories?: { label: string; href: string }[];
  date?: Date | string;
  asHeader?: boolean;
  author?: PostDetails["author"];
}

const BlogHero = ({
  banner,
  bannerAlt,
  bannerBlur,
  title,
  description,
  breadcrumbs,
  categories = [],
  date,
  asHeader = false,
  author,
}: BlogHeroProps) => {
  const breadcrumbClassName = cn(
    "max-w-40 truncate",
    "sm:max-w-60",
    "md:max-w-80",
  );
  const RootElement = asHeader ? "header" : "section";

  return (
    <RootElement
      className={cn(
        "blog-hero",
        "relative flex min-h-64 flex-col items-center justify-center bg-gradient-to-tr from-stone-200 to-stone-50 pb-7 pt-20 text-stone-800",
        "dark:from-stone-900 dark:to-stone-950 dark:text-stone-300",
        "md:py-24",
      )}
    >
      <div
        className={cn(
          "blog-hero-background-container",
          "absolute top-0 size-full overflow-hidden",
          "after:absolute after:size-full after:bg-stone-50/80",
          "supports-[backdrop-filter]:after:bg-stone-50/60 supports-[backdrop-filter]:after:backdrop-blur-sm",
          "dark:after:bg-stone-950/80",
          "dark:supports-[backdrop-filter]:after:bg-stone-950/60",
        )}
      >
        <Image
          src={banner}
          className="blog-hero-background object-cover"
          alt={bannerAlt}
          placeholder={bannerBlur ? "blur" : "empty"}
          blurDataURL={bannerBlur}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div
        className={cn(
          "blog-hero-content-container",
          "z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4",
          "md:items-start",
        )}
      >
        <nav>
          <ul
            className={cn(
              "flex flex-wrap justify-center [row-gap:4px]",
              "md:justify-start",
            )}
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
                      <h1 className={breadcrumbClassName}>
                        {breadcrumb.label}
                      </h1>
                    ) : (
                      <span className={breadcrumbClassName}>
                        {breadcrumb.label}
                      </span>
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
            "md:text-left md:text-3xl",
            "dark:text-stone-50",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-center text-xs text-stone-800",
            "sm:text-sm",
            "md:text-left md:text-base",
            "dark:text-stone-300",
          )}
        >
          {description}
        </p>
        {(author || date) && (
          <div className="flex items-center gap-2">
            {author && (
              <div className={cn("flex items-center gap-2")}>
                <PostAuthorAvatar author={author} className={cn("size-10")} />
                <p className={cn("text-sm font-semibold")}>{author.name}</p>
              </div>
            )}
            {author && date && <span aria-hidden="true">•</span>}
            {date && (
              <time
                dateTime={new Date(date).toISOString()}
                className={cn("text-sm font-semibold")}
                suppressHydrationWarning
              >
                {new Date(date).toLocaleDateString("en", {
                  dateStyle: "long",
                })}
              </time>
            )}
          </div>
        )}
        <nav>
          {categories.length > 0 && (
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
    </RootElement>
  );
};

export default BlogHero;
