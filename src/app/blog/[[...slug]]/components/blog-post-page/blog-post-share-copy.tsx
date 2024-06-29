"use client";
import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsCheck, BsLink45Deg } from "react-icons/bs";

interface BlogPostShareCopyProps {
  url: string;
  className?: string;
}

const BlogPostShareCopy = ({ url, className }: BlogPostShareCopyProps) => {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    if (copied) return;
    AnalyticsManager.track("post_share", { share_type: "copy" });
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Button
      size="icon"
      variant="link"
      className={cn("rounded-full", className)}
      title="Copy link to clipboard"
      onClick={onClick}
    >
      {copied ? (
        <BsCheck className="size-5" />
      ) : (
        <BsLink45Deg className="size-5" />
      )}
    </Button>
  );
};

export default BlogPostShareCopy;
