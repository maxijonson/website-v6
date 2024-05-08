import Content from "@/components/content/content";
import { type PortableTextReactComponents } from "next-sanity";
import type { ContentDetails } from "../../../../../../sanity/groqd/selections/content/content-details";
import PostBodyHeading from "./components/post-body-heading";
import PostBodyImage from "./components/post-body-image";
import { stripPortableTextFunctions } from "@/utils/stripPortableTextFunctions";

export interface PostBodyProps {
  body: ContentDetails;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: PostBodyHeading,
    h2: PostBodyHeading,
    h3: PostBodyHeading,
    h4: PostBodyHeading,
    h5: PostBodyHeading,
    h6: PostBodyHeading,
  },
  types: {
    image: stripPortableTextFunctions(PostBodyImage),
  },
};

const PostBody = ({ body }: PostBodyProps) => {
  return (
    <Content
      className="prose prose-stone mx-auto dark:prose-invert"
      value={body}
      components={components}
    />
  );
};

export default PostBody;
