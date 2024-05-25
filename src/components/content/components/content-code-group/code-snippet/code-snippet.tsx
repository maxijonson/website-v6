"use client";
import { useCodeLanguage } from "@/hooks/use-code-language";
import { scrollbarClassName } from "@/tailwind/classes";
import { Refractor } from "react-refractor";
import type { ContentCodeGroupDetails } from "../../../../../../sanity/groqd/selections/content/content-code-group-details";
import CodeCopyButton from "../code-copy-button";
import "./code-snippet.scss";
import { cn } from "@/lib/utils";

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
  const finalLanguage = useCodeLanguage(language);

  return (
    <div className={cn("relative", className)}>
      {allowCopy && (
        <div className="absolute right-0 top-0 z-10 p-1">
          <CodeCopyButton code={code} />
        </div>
      )}
      <Refractor
        className={cn(scrollbarClassName, codeClassName)}
        language={finalLanguage}
        value={code ?? ""}
        markers={highlightedLines}
        plainText={finalLanguage === "text"}
      />
    </div>
  );
};

export default CodeSnippet;
