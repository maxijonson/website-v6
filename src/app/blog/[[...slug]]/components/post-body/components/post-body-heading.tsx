import { getHeadingId } from "@/utils/getHeadingId";
import { type PortableTextBlockComponent } from "next-sanity";
import Link from "next/link";
import type { ContentBlockDetails } from "../../../../../../../sanity/groqd/selections/content/content-block-details";

const isValidHeading = (
  props: string | undefined,
): props is keyof JSX.IntrinsicElements =>
  typeof props === "string" &&
  ["h1", "h2", "h3", "h4", "h5", "h6"].includes(props);

const PostBodyHeading: PortableTextBlockComponent = (props) => {
  const block = props.value;
  const Heading = block.style || "h2";
  const isValid = isValidHeading(Heading);
  if (!isValid || block._type !== "block") {
    console.error("Encountered invalid heading:", Heading, props);
    return <h2>{props.children}</h2>;
  }
  const id = getHeadingId(block as ContentBlockDetails);

  return (
    <Link href={`#${id}`} className="relative no-underline hover:underline">
      <span id={id} className="invisible absolute -top-20" />
      <Heading>{props.children}</Heading>
    </Link>
  );
};

export default PostBodyHeading;
