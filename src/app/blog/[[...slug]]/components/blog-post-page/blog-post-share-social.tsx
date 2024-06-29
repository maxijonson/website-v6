"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface BlogPostShareSocialProps {
  name: string;
  url: string;
  children: React.ReactNode;
  className?: string;
  type: string;
}

const BlogPostShareSocial = ({
  name,
  url,
  children,
  className,
  type,
}: BlogPostShareSocialProps) => {
  const trackClick = () => {
    AnalyticsManager.track("post_share", { share_type: type });
  };

  return (
    <Button
      asChild
      size="icon"
      variant="link"
      className={cn("rounded-full", className)}
    >
      <Link href={url} target="_blank" title={name} onClick={trackClick}>
        {children}
      </Link>
    </Button>
  );
};

export default BlogPostShareSocial;
