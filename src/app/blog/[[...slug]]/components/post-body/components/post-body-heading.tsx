import { isDefined } from "@/utils/isDefined";
import { toPlainText, type PortableTextBlockComponent } from "next-sanity";
import Link from "next/link";
import type React from "react";
import slugify from "slugify";

const isValidHeading = (
  props: string | undefined,
): props is keyof JSX.IntrinsicElements =>
  typeof props === "string" &&
  ["h1", "h2", "h3", "h4", "h5", "h6"].includes(props);

const PostBodyHeading: PortableTextBlockComponent = (props) => {
  const Heading = props.value.style || "h2";
  const isValid = isValidHeading(Heading);
  if (!isValid) {
    console.error("Encountered invalid heading:", Heading, props);
    return <h2>{props.children}</h2>;
  }
  const slug = [
    slugify(toPlainText(props.value), {
      lower: true,
      strict: true,
    }),
    props.value._key,
  ]
    .filter(isDefined)
    .join("-");

  return (
    <Link href={`#${slug}`} className="relative no-underline hover:underline">
      <span id={slug} className="invisible absolute -top-20" />
      <Heading>{props.children}</Heading>
    </Link>
  );
};

export default PostBodyHeading;
