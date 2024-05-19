"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { BsCopy, BsCheck2 } from "react-icons/bs";

export interface ContentCodeCopyProps {
  code?: string;
}

const ContentCodeCopy = ({ code }: ContentCodeCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCopied) {
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isCopied]);

  if (!code) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex size-6 items-center justify-center p-0"
      title="Copy Code"
      disabled={isCopied}
      onClick={() => {
        if (isCopied || !navigator.clipboard || !code) return;
        navigator.clipboard.writeText(code);
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <>
          <BsCheck2 className="size-4" />
          <span className="sr-only">Code Copied</span>
        </>
      ) : (
        <>
          <BsCopy className="size-4" />
          <span className="sr-only">Copy Code</span>
        </>
      )}
    </Button>
  );
};

export default ContentCodeCopy;
