"use client";
import { getBaseURL } from "@/utils/getBaseURL";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

interface BlogPostCommentsProps {
  term: string;
}

const BlogPostComments = (props: BlogPostCommentsProps) => {
  const { resolvedTheme } = useTheme();

  const term = (() => {
    if (process.env.NODE_ENV === "production") {
      return props.term;
    }
    if (getBaseURL().hostname.startsWith("staging")) {
      return `${props.term} (staging)`;
    }
    return `${props.term} (dev)`;
  })();

  return (
    <Giscus
      repo="maxijonson/website-v6"
      repoId="R_kgDOLkocoQ"
      category="Blog Posts Comments"
      categoryId="DIC_kwDOLkococ4Ce_uW"
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "noborder_gray" : "noborder_light"}
      lang="en"
      loading="lazy"
    />
  );
};

export default BlogPostComments;
