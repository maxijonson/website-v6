import clsx from "clsx";
import type React from "react";
import { BsBraces, BsFileEarmark, BsTerminal } from "react-icons/bs";
import { SiReact, SiTypescript } from "react-icons/si";
import type { ContentCodeGroupDetails } from "../../../../../sanity/groqd/selections/content/content-code-group-details";

export type CodeTabProps = React.ComponentPropsWithoutRef<"li"> & {
  language: NonNullable<
    ContentCodeGroupDetails["snippets"]
  >[number]["language"];
};

const CodeTab = ({ language = "text", ...props }: CodeTabProps) => {
  let Icon = BsFileEarmark;

  switch (language) {
    case "tsx":
      Icon = SiReact;
      break;
    case "typescript":
      Icon = SiTypescript;
      break;
    case "sh":
      Icon = BsTerminal;
      break;
    case "json":
      Icon = BsBraces;
      break;
  }

  return (
    <li
      {...props}
      className={clsx(
        "m-0 flex min-w-48 max-w-48 items-center gap-1 truncate text-ellipsis text-nowrap bg-stone-200 p-2 text-xs text-stone-950",
        "dark:bg-stone-700 dark:text-stone-50",
        props.className,
      )}
    >
      <div className="flex items-center justify-center" title={language}>
        <Icon className="size-4" />
      </div>
      <div className="grow truncate text-ellipsis">{props.children}</div>
    </li>
  );
};

export default CodeTab;
