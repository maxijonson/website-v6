import { cn } from "@/lib/utils";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoReddit } from "react-icons/io5";
import { RxLinkedinLogo } from "react-icons/rx";
import BlogPostShareCopy from "./blog-post-share-copy";
import BlogPostShareSocial from "./blog-post-share-social";

export interface BlogPostShareProps {
  title: string;
  slug: string;
}

//   https://twitter.com/intent/tweet/?text=How%20To%20Strongly%20Type%20process.env%20by%20%40mattpocockuk&url=https%3A%2F%2Fwww.totaltypescript.com%2Fhow-to-strongly-type-process-env
const BlogPostShare = ({ title, slug }: BlogPostShareProps) => {
  const url = `https://www.chintristan.io/blog/${slug}`;
  const linkedInUrl = new URL(
    "https://www.linkedin.com/sharing/share-offsite/",
  );
  linkedInUrl.searchParams.append("url", url);

  const twitterUrl = new URL("https://twitter.com/intent/tweet/");
  twitterUrl.searchParams.append("text", `${title} by @MaxiJonson`);
  twitterUrl.searchParams.append("url", url);

  const redditUrl = new URL("https://reddit.com/submit/");
  redditUrl.searchParams.append("url", url);
  redditUrl.searchParams.append("title", `${title} by u/maxijonson`);
  redditUrl.searchParams.append("type", "LINK");

  return (
    <div className="group flex flex-col items-center gap-4">
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-widest text-stone-800 transition-colors",
          "group-hover:text-stone-950",
          "dark:text-stone-300",
          "dark:group-hover:text-stone-50",
        )}
      >
        Share this post
      </p>
      <div className="flex gap-4">
        <BlogPostShareSocial
          name="Share on LinkedIn"
          url={linkedInUrl.toString()}
        >
          <RxLinkedinLogo className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareSocial name="Share on X" url={twitterUrl.toString()}>
          <BsTwitterX className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareSocial name="Share on Reddit" url={redditUrl.toString()}>
          <IoLogoReddit className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareCopy url={`https://www.chintristan.io/blog/${slug}`} />
      </div>
    </div>
  );
};

export default BlogPostShare;
