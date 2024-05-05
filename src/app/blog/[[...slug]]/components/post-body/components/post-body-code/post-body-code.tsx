import "./post-body-code.scss";
import type { PortableTextTypeComponentProps } from "next-sanity";
import { Refractor, registerLanguage } from "react-refractor";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";
import sh from "refractor/lang/bash";
import json from "refractor/lang/json";
import type { ContentCodeDetails } from "../../../../../../../../sanity/groqd/selections/content/content-code-details";

const PostBodyCode = (
  props: PortableTextTypeComponentProps<ContentCodeDetails>,
) => {
  const language = props.value.language ?? "sh";
  switch (props.value.language) {
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
    <Refractor
      language={language}
      value={props.value.code ?? ""}
      markers={props.value.highlightedLines}
    />
  );
};

export default PostBodyCode;
