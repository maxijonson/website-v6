"use client";
import { useViewportBelow } from "@/hooks/user-viewport-below";
import { cn } from "@/lib/utils";
import type { getPostHeadings } from "@/utils/getPostHeadings";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export type BlogPostTOCHeadingProps = ReturnType<
  typeof getPostHeadings
>[number];

const TableOfContentsEntry = ({ id, level, text }: BlogPostTOCHeadingProps) => {
  const isActive = useViewportBelow(`#${id}`, -40, true);
  const [isCurrent, setIsCurrent] = useState(false);

  /**
   * HACK: Instead of having a `isCurrent` state, we could use CSS only by styling the parent element (table-of-contents), but then all of the classes for `isCurrent` would start with `[&_table-of-contents-entry--active:last-of-type]`...
   */
  useLayoutEffect(() => {
    if (!isActive) return setIsCurrent(false);

    const updateCurrent = () =>
      requestAnimationFrame(() => {
        const actives = document.querySelectorAll(
          ".table-of-contents-entry--active",
        );
        const lastActive = actives[actives.length - 1];
        if (!lastActive) return;
        setIsCurrent(lastActive.getAttribute("data-slug") === id);
      });

    window.addEventListener("scroll", updateCurrent);
    updateCurrent();
    return () => window.removeEventListener("scroll", updateCurrent);
  }, [id, isActive]);

  return (
    <Link
      href={`#${id}`}
      data-slug={id}
      className={cn(
        "table-of-contents-entry",
        "inline-block font-light leading-5 text-stone-500 transition-all",
        "hover:font-normal hover:text-stone-600",
        "dark:text-stone-500",
        "dark:hover:text-stone-400",
        {
          "pl-2": level === 2,
          "pl-4": level === 3,
          "pl-6": level === 4,
        },
        {
          [cn(
            "table-of-contents-entry--active font-normal text-stone-800",
            "hover:text-stone-800",
            "dark:text-stone-200",
            "dark:hover:text-stone-200",
          )]: isActive,
        },
        {
          [cn(
            "font-bold tracking-wide text-stone-950 hover:font-bold",
            "hover:text-stone-950",
            "dark:text-stone-50",
            "dark:hover:text-stone-50",
          )]: isCurrent,
        },
      )}
    >
      {text}
    </Link>
  );
};

export default TableOfContentsEntry;
