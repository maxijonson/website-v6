import Content from "@/components/content/content";
import { cn } from "@/lib/utils";
import { type PortableTextReactComponents } from "next-sanity";
import type { ContentDetails } from "../../../../../../sanity/groqd/selections/content/content-details";
import PostBodyHeading from "./components/post-body-heading";
import PostBodyImage from "./components/post-body-image";

export interface PostBodyProps {
  body: ContentDetails;
  className?: string;
}

export const postBodyComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: PostBodyHeading,
    h2: PostBodyHeading,
    h3: PostBodyHeading,
    h4: PostBodyHeading,
    h5: PostBodyHeading,
    h6: PostBodyHeading,
  },
  types: {
    contentImage: PostBodyImage,
  },
};

const PostBody = ({ body, className }: PostBodyProps) => {
  return (
    <Content
      className={cn("prose prose-stone mx-auto dark:prose-invert", className)}
      value={body}
      components={postBodyComponents}
    />
  );
};

export default PostBody;
