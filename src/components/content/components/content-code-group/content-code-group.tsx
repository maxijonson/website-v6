import type { PortableTextTypeComponentProps } from "next-sanity";
import type { ContentCodeGroupDetails } from "../../../../../sanity/groqd/selections/content/content-code-group-details";
import CodeGroup from "./code-group";

const ContentCodeGroup = (
  props: PortableTextTypeComponentProps<ContentCodeGroupDetails>,
) => {
  return <CodeGroup snippets={props.value.snippets} />;
};

export default ContentCodeGroup;
