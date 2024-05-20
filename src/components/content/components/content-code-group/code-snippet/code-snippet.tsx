"use client";
import { scrollbarClassName } from "@/tailwind/classes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Refractor, hasLanguage, registerLanguage } from "react-refractor";
import type { ContentCodeGroupDetails } from "../../../../../../sanity/groqd/selections/content/content-code-group-details";
import CodeCopyButton from "../code-copy-button";
import "./code-snippet.scss";
import type { Syntax } from "refractor";

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
  const [finalLanguage, setFinalLanguage] = useState(
    hasLanguage(language) ? language : "text",
  );

  useEffect(() => {
    if (language === "text" || hasLanguage(language)) return;
    (async () => {
      try {
        let syntax: Syntax | null = null;
        switch (language) {
          case "tsx":
            const { default: tsx } = await import("refractor/lang/tsx");
            syntax = tsx;
            break;
          case "typescript":
            const { default: typescript } = await import(
              "refractor/lang/typescript"
            );
            syntax = typescript;
            break;
          case "sh":
            const { default: shell } = await import(
              "refractor/lang/shell-session"
            );
            syntax = shell;
            break;
          case "json":
            const { default: json } = await import("refractor/lang/json");
            syntax = json;
            break;
        }
        if (syntax) {
          registerLanguage(syntax);
          setFinalLanguage(language);
        } else {
          console.error("[CodeSnippet] Language not supported:", language);
        }
      } catch (error) {
        console.error("[CodeSnippet] Failed to load language:", language);
        console.error(error);
      }
    })();
  }, [language]);

  return (
    <div className={clsx("relative", className)}>
      {allowCopy && (
        <div className="absolute right-0 top-0 z-10 p-1">
          <CodeCopyButton code={code} />
        </div>
      )}
      <Refractor
        className={clsx(scrollbarClassName, codeClassName)}
        language={finalLanguage}
        value={code ?? ""}
        markers={highlightedLines}
        plainText={finalLanguage === "text"}
      />
    </div>
  );
};

export default CodeSnippet;
