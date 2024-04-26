import type { PortableTextMarkComponentProps } from "next-sanity";
import type { PostBodyBlockLink } from "../../../../../../../sanity/groqd/selections/post-body";
import Link from "next/link";

const PostBodyLink = (
  props: PortableTextMarkComponentProps<PostBodyBlockLink>,
) => {
  if (!props.value) return props.children;
  const rel = !props.value.href.startsWith("/")
    ? "noreferrer noopener"
    : undefined;
  return (
    <Link href={props.value?.href} rel={rel}>
      {props.children}
    </Link>
  );
};

export default PostBodyLink;
