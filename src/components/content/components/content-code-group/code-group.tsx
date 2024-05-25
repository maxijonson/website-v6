"use client";
import { useState } from "react";
import type { ContentCodeGroupDetails } from "../../../../../sanity/groqd/selections/content/content-code-group-details";
import CodeSnippet from "./code-snippet/code-snippet";
import CodeTab from "./code-tab";
import CodeTabs from "./code-tabs";
import CodeCopyButton from "./code-copy-button";
import { cn } from "@/lib/utils";

export interface CodeGroupProps {
  snippets: ContentCodeGroupDetails["snippets"];
}

const CodeGroup = ({ snippets = [] }: CodeGroupProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <CodeTabs>
        {snippets.map((snippet, i) => (
          <CodeTab
            key={i}
            title={snippet.filename}
            language={snippet.language}
            onClick={() => setActiveTab(i)}
            className={cn({
              "cursor-pointer": snippets.length > 1,
              "relative w-full max-w-none": snippets.length === 1,
              [cn("!bg-[#f5f2f0]", "dark:!bg-[#2d2d2d]")]: i === activeTab,
            })}
          >
            {snippet.filename || snippets.length === 1 ? (
              snippet.filename
            ) : (
              <span className="text-stone-500 dark:text-stone-400">
                Untitled
              </span>
            )}
            {snippets.length === 1 && (
              <div className="absolute right-0 top-0 z-10 p-1">
                <CodeCopyButton code={snippet.code} />
              </div>
            )}
          </CodeTab>
        ))}
      </CodeTabs>
      {snippets.map(
        (snippet, i) =>
          snippet.code && (
            <CodeSnippet
              key={i}
              {...snippet}
              codeClassName="rounded-none rounded-b"
              className={cn({
                hidden: i !== activeTab,
              })}
              allowCopy={snippets.length > 1}
            />
          ),
      )}
    </div>
  );
};

export default CodeGroup;
