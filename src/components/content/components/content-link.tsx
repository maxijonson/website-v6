import type { PortableTextMarkComponentProps } from "next-sanity";
import Link from "next/link";
import type { ContentBlockLinkDetails } from "../../../../sanity/groqd/selections/content/content-block-details/content-block-link-details";

const ContentLink = (
  props: PortableTextMarkComponentProps<ContentBlockLinkDetails>,
) => {
  if (!props.value?.href) return props.children;
  const rel = !props.value.href.startsWith("/")
    ? "noreferrer noopener"
    : undefined;
  return (
    <Link href={props.value?.href} rel={rel}>
      {props.children}
    </Link>
  );
};

export default ContentLink;
