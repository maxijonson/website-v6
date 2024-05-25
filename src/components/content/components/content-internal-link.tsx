import type { PortableTextMarkComponentProps } from "next-sanity";
import Link from "next/link";
import type { ContentBlockInternalLinkDetails } from "../../../../sanity/groqd/selections/content/content-block-details/content-block-internal-link-details";

const ContentInternalLink = (
  props: PortableTextMarkComponentProps<ContentBlockInternalLinkDetails>,
) => {
  const { value, children } = props;
  if (!value) return children;

  const { reference } = value;

  switch (reference.type) {
    case "post":
    case "category":
    case "tag":
      return <Link href={`/blog/${reference.slug}`}>{children}</Link>;
  }

  return children;
};

export default ContentInternalLink;
