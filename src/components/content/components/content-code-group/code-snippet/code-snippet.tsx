import { scrollbarClassName } from "@/tailwind/classes";
import clsx from "clsx";
import { Refractor, registerLanguage } from "react-refractor";
import "./code-snippet.module.scss";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";
import sh from "refractor/lang/bash";
import json from "refractor/lang/json";
import CodeCopyButton from "../code-copy-button";
import type { ContentCodeGroupDetails } from "../../../../../../sanity/groqd/selections/content/content-code-group-details";

export type CodeSnippetProps = NonNullable<
  ContentCodeGroupDetails["snippets"]
>[number] & {
  codeClassName?: string;
  className?: string;
  allowCopy?: boolean;
};

const CodeSnippet = ({
  code,
  language = "text",
  highlightedLines,
  className,
  codeClassName,
  allowCopy = true,
}: CodeSnippetProps) => {
  switch (language) {
    case "tsx":
      registerLanguage(tsx);
      break;
    case "typescript":
      registerLanguage(ts);
      break;
    case "sh":
      registerLanguage(sh);
      break;
    case "json":
      registerLanguage(json);
      break;
  }

  return (
    <div className={clsx("relative", className)}>
      {allowCopy && (
        <div className="absolute right-0 top-0 z-10 p-1">
          <CodeCopyButton code={code} />
        </div>
      )}
      <Refractor
        className={clsx(scrollbarClassName, codeClassName)}
        language={language}
        value={code ?? ""}
        markers={highlightedLines}
        plainText={language === "text"}
      />
    </div>
  );
};

export default CodeSnippet;
