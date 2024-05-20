"use client";
import { scrollbarClassName } from "@/tailwind/classes";
import type { PortableClientComponentProps } from "@/utils/stripPortableTextFunctions";
import clsx from "clsx";
import type { PortableTextTypeComponentProps } from "next-sanity";
import { BsFileEarmark } from "react-icons/bs";
import { SiGnubash, SiJson, SiReact, SiTypescript } from "react-icons/si";
import { Refractor, registerLanguage } from "react-refractor";
import sh from "refractor/lang/bash";
import json from "refractor/lang/json";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";
import type { ContentCodeDetails } from "../../../../../sanity/groqd/selections/content/content-code-details";
import ContentCodeCopy from "./content-code-copy";
import "./content-code.scss";

const ContentCode = (
  props: PortableClientComponentProps<
    PortableTextTypeComponentProps<ContentCodeDetails>
  >,
) => {
  const language = props.value.language ?? "text";
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
      {props.value.filename ? (
        <ul
          className={clsx(
            scrollbarClassName,
            "relative -mb-2 flex gap-[1px] overflow-x-auto overflow-y-hidden rounded-t bg-stone-200 p-0",
            "dark:bg-stone-800 dark:text-stone-200",
          )}
        >
          <li
            className={clsx(
              "m-0 flex min-w-48 max-w-48 items-center gap-1 truncate text-ellipsis text-nowrap bg-stone-100 p-2 text-xs text-stone-950",
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
            <ContentCodeCopy code={props.value.code} />
          </li>
        </ul>
      ) : (
        <div className="absolute right-0 top-0 z-10 p-1">
          <ContentCodeCopy code={props.value.code} />
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
