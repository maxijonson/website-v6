"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { useViewportBelow } from "@/hooks/user-viewport-below";
import { useEffect, useState } from "react";

const POST_READ_TIME = 1000 * 30;

export const POST_BODY_ID = "blog-post-body";
const POST_READ_DEPTH = 0.35;

export interface BlogPostReadProps {
  slug: string;
}

const BlogPostRead = ({ slug }: BlogPostReadProps) => {
  const [timeReached, setTimeReached] = useState(false);
  const depthReached = useViewportBelow(`#${POST_BODY_ID}`, POST_READ_DEPTH);
  const [loggedView, setLoggedView] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeReached(true);
    }, POST_READ_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (timeReached && depthReached && !loggedView) {
      AnalyticsManager.track("blog_post_read");
      setLoggedView(true);
    }
  }, [timeReached, depthReached, loggedView, slug]);

  return null;
};

export default BlogPostRead;
