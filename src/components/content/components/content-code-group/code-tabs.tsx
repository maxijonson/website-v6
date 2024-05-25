import { cn } from "@/lib/utils";
import { scrollbarClassName } from "@/tailwind/classes";
import type React from "react";

export type CodeTabsProps = React.ComponentPropsWithoutRef<"ul">;

const CodeTabs = (props: CodeTabsProps) => {
  return (
    <ul
      {...props}
      className={cn(
        scrollbarClassName,
        "relative -mb-2 flex gap-[1px] overflow-x-auto overflow-y-hidden rounded-t bg-stone-300 p-0",
        "dark:bg-stone-800 dark:text-stone-200",
        props.className,
      )}
    >
      {props.children}
    </ul>
  );
};

export default CodeTabs;
