"use client";

import { Button } from "@/components/ui/button";
import { RxEnvelopeClosed } from "react-icons/rx";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ContactEmail = () => {
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = async () => {
    if (showCopied) return;
    try {
      await navigator.clipboard.writeText("tristan.chin@chintristan.io");
      setShowCopied(true);
    } catch {
      window.open("mailto:tristan.chin@chintristan.io");
    }
  };

  useEffect(() => {
    if (!showCopied) return;
    const timeout = setTimeout(() => {
      setShowCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [showCopied]);

  return (
    <Button onClick={copyEmail}>
      <RxEnvelopeClosed className="mr-2" />
      <div className="relative">
        <span
          className={cn("transition-opacity", {
            "opacity-0": showCopied,
          })}
        >
          tristan.chin@chintristan.io
        </span>
        <span
          className={cn(
            "absolute left-0 top-0 w-full text-center opacity-0 transition-opacity",
            {
              "opacity-100": showCopied,
            },
          )}
        >
          Copied!
        </span>
      </div>
    </Button>
  );
};

export default ContactEmail;
