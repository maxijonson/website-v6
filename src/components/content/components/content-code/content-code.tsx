"use client";
import "./content-code.scss";
import type { PortableTextTypeComponentProps } from "next-sanity";
import { Refractor, registerLanguage } from "react-refractor";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";
import sh from "refractor/lang/bash";
import json from "refractor/lang/json";
import type { ContentCodeDetails } from "../../../../../sanity/groqd/selections/content/content-code-details";
import { scrollbarClassName } from "@/tailwind/classes";
import { SiReact, SiTypescript, SiGnubash, SiJson } from "react-icons/si";
import { BsFileEarmark, BsCopy } from "react-icons/bs";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import type { PortableClientComponentProps } from "@/utils/stripPortableTextFunctions";

const ContentCode = (
  props: PortableClientComponentProps<
    PortableTextTypeComponentProps<ContentCodeDetails>
  >,
) => {
  const language = props.value.language ?? "sh";
  let Icon = BsFileEarmark;
  switch (props.value.language) {
    case "tsx":
      registerLanguage(tsx);
      Icon = SiReact;
      break;
    case "typescript":
      registerLanguage(ts);
      Icon = SiTypescript;
      break;
    case "sh":
      registerLanguage(sh);
      Icon = SiGnubash;
      break;
    case "json":
      registerLanguage(json);
      Icon = SiJson;
      break;
  }
  return (
    <div className="relative">
      {props.value.filename && (
        <div
          className={clsx(
            scrollbarClassName,
            "relative -mb-2 flex gap-[1px] overflow-x-auto overflow-y-hidden rounded-t bg-stone-200",
            "dark:bg-stone-800 dark:text-stone-200",
          )}
        >
          <div
            className={clsx(
              "flex min-w-48 max-w-48 items-center gap-1 truncate text-ellipsis text-nowrap bg-stone-100 p-2 text-xs text-stone-950",
              "dark:bg-stone-900 dark:text-stone-50",
            )}
            title={props.value.filename}
          >
            <div className="flex items-center justify-center">
              <Icon className="size-4" />
            </div>
            <div className="grow truncate text-ellipsis">
              {props.value.filename}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="flex size-6 items-center justify-center p-0"
              title="Copy Code"
              onClick={() => {
                if (!navigator.clipboard || !props.value.code) return;
                navigator.clipboard.writeText(props.value.code);
              }}
            >
              <BsCopy className="size-4" />
            </Button>
          </div>
        </div>
      )}
      <Refractor
        className={clsx(scrollbarClassName, {
          "rounded-none": props.value.filename,
        })}
        language={language}
        value={props.value.code ?? ""}
        markers={props.value.highlightedLines}
        plainText={props.value.language === "text"}
      />
    </div>
  );
};

export default ContentCode;
