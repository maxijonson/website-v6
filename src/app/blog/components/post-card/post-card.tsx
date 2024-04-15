import { cn } from "@/lib/utils";
import PostImage from "../post-image/post-image";
import PostAuthorAvatar, {
  type PostAuthorAvatarProps,
} from "../post-author-avatar/post-author-avatar";
import Link from "next/link";
import type { PostDetails } from "../../../../../sanity/selections/post-details";

export interface PostCardProps {
  post: Pick<PostDetails, "title" | "createdAt" | "image" | "summary"> & {
    author: PostAuthorAvatarProps["author"];
  };
  className?: string;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const PostCard = ({
  post,
  className,
  heading: Heading = "h1",
}: PostCardProps) => {
  return (
    <Link href="/blog" className={cn("group", className)}>
      <article
        className={cn(
          "flex h-full flex-col gap-2 overflow-hidden rounded-md bg-stone-100 outline outline-1 outline-stone-300/0 transition-[outline-color] duration-500",
          "group-hover:outline-stone-300/100",
          "md:gap-4",
          "dark:bg-stone-900/5",
          "dark:group-hover:outline-stone-800/100",
        )}
      >
        <header
          className={cn(
            "relative flex min-h-52 flex-grow flex-col justify-end overflow-hidden",
          )}
        >
          <div
            className={cn(
              "absolute size-full",
              "after:absolute after:left-0 after:top-0 after:size-full after:bg-stone-100/50 after:transition-all after:duration-1000",
              "group-hover:after:bg-stone-200/30",
              "dark:after:bg-stone-950/75",
              "group-hover:dark:after:bg-stone-950/40",
            )}
          >
            <PostImage
              image={post.image}
              className={cn(
                "absolute size-full scale-100 object-cover transition-all duration-1000",
                "group-hover:scale-105",
              )}
            />
          </div>
          <div
            className={cn(
              "z-10 flex h-1/2 min-h-12 flex-col justify-end gap-1 bg-gradient-to-b from-transparent from-40% to-stone-100 to-80% px-4 pb-2",
              "dark:to-stone-950",
            )}
          >
            <Heading
              className={cn(
                "text-xl font-extrabold text-stone-900",
                "md:text-2xl",
                "lg:text-3xl",
                "dark:text-stone-100",
              )}
            >
              {post.title}
            </Heading>
          </div>
        </header>
        <div>
          <p
            className={cn(
              "px-4 text-sm text-stone-700",
              "md:text-base",
              "dark:text-stone-200",
            )}
          >
            {post.summary}
          </p>
        </div>
        <footer
          className={cn(
            "flex items-center justify-between px-4 pb-2 text-stone-800",
            "dark:text-stone-200",
          )}
        >
          <div className={cn("flex items-center gap-2")}>
            <PostAuthorAvatar author={post.author} className={cn("size-10")} />
            <p className={cn("text-sm font-semibold")}>{post.author.name}</p>
          </div>
          <time
            dateTime={new Date(post.createdAt).toISOString()}
            className={cn("text-sm font-semibold")}
            suppressHydrationWarning
          >
            {new Date(post.createdAt).toLocaleDateString("en", {
              dateStyle: "long",
            })}
          </time>
        </footer>
      </article>
    </Link>
  );
};

export default PostCard;
