import "./post-body-code.scss";
import type { PortableTextTypeComponentProps } from "next-sanity";
import type { PostBodyCode as PostBodyCodeType } from "../../../../../../../../sanity/selections/post-body";
import { Refractor, registerLanguage } from "react-refractor";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";
import sh from "refractor/lang/bash";
import json from "refractor/lang/json";

const PostBodyCode = (
  props: PortableTextTypeComponentProps<PostBodyCodeType>,
) => {
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
      language={props.value.language}
      value={props.value.code}
      markers={props.value.highlightedLines}
    />
  );
};

export default PostBodyCode;
