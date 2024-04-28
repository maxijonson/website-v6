import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface BlogPostShareSocialProps {
  name: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

const BlogPostShareSocial = ({
  name,
  url,
  children,
  className,
}: BlogPostShareSocialProps) => {
  return (
    <Button
      asChild
      size="icon"
      variant="link"
      className={cn("rounded-full", className)}
    >
      <Link href={url} target="_blank" title={name}>
        {children}
      </Link>
    </Button>
  );
};

export default BlogPostShareSocial;
