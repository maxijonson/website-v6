"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { useViewportBelow } from "@/hooks/user-viewport-below";
import { useEffect, useRef, useState } from "react";

export const POST_BODY_ID = "blog-post-body";

export interface BlogPostReadProps {
  time: number;
  depth: number;
  event: string;
}

const BlogPostRead = ({ time, depth, event }: BlogPostReadProps) => {
  const start = useRef(Date.now());
  const [readTimeReached, setReadTimeReached] = useState(false);
  const readDepthReached = useViewportBelow(`#${POST_BODY_ID}`, depth);
  const [loggedRead, setLoggedRead] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReadTimeReached(true);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  useEffect(() => {
    if (readTimeReached && readDepthReached && !loggedRead) {
      const readTime = Date.now() - start.current;
      AnalyticsManager.track(event, {
        read_time_ms: readTime,
        read_time_s: Math.round(readTime / 1000),
      });
      setLoggedRead(true);
    }
  }, [readTimeReached, readDepthReached, loggedRead, event]);

  return null;
};

export default BlogPostRead;
