import { cn } from "@/lib/utils";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoReddit } from "react-icons/io5";
import { RxLinkedinLogo } from "react-icons/rx";
import BlogPostShareCopy from "./blog-post-share-copy";
import BlogPostShareSocial from "./blog-post-share-social";
import { getBaseURL } from "@/utils/getBaseURL";

export interface BlogPostShareProps {
  title: string;
  slug: string;
}

const getShareUrl = (url: URL, source: string) => {
  const shareUrl = new URL(url);
  shareUrl.searchParams.append("utm_source", source);
  shareUrl.searchParams.append("utm_medium", "social");
  shareUrl.searchParams.append("utm_campaign", "share");
  return shareUrl.toString();
};

const BlogPostShare = ({ title, slug }: BlogPostShareProps) => {
  const url = new URL(`/blog/${slug}`, getBaseURL());

  const linkedInUrl = new URL(
    "https://www.linkedin.com/sharing/share-offsite/",
  );
  linkedInUrl.searchParams.append("url", getShareUrl(url, "linkedin"));

  const twitterUrl = new URL("https://twitter.com/intent/tweet/");
  twitterUrl.searchParams.append("text", `${title} by @MaxiJonson`);
  twitterUrl.searchParams.append("url", getShareUrl(url, "twitter"));

  const redditUrl = new URL("https://reddit.com/submit/");
  redditUrl.searchParams.append("url", getShareUrl(url, "reddit"));
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
          type="linkedin"
        >
          <RxLinkedinLogo className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareSocial
          name="Share on X"
          url={twitterUrl.toString()}
          type="twitter"
        >
          <BsTwitterX className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareSocial
          name="Share on Reddit"
          url={redditUrl.toString()}
          type="reddit"
        >
          <IoLogoReddit className="size-5" />
        </BlogPostShareSocial>
        <BlogPostShareCopy url={getShareUrl(url, "link")} />
      </div>
    </div>
  );
};

export default BlogPostShare;
