import { PortableText, type PortableTextReactComponents } from "next-sanity";
import PostBodyCode from "./components/post-body-code/post-body-code";
import PostBodyImage from "./components/post-body-image";
import PostBodyLink from "./components/post-body-link";
import PostBodyHeading from "./components/post-body-heading";
import type { ContentDetails } from "../../../../../../sanity/groqd/selections/content/content-details";

export interface PostBodyProps {
  body: ContentDetails;
}

/**
 * Client components who use the following `stripPTFunctions` HOC can use this type to remove the `renderNode` prop (function) from the props.
 */
export type PortableClientComponentProps<T> = Omit<T, "renderNode">;

/**
 * Client components cannot receive functions as props from the server (here).
 * This wrapper component is used to remove the `renderNode` prop (fuction) from the props and passes the rest to the actual component.
 *
 * Note: using this on a server component won't make it a client component. It would be safe to use it on every component if we wanted to.
 */
const stripPTFunctions = <T extends Record<string, any>>(
  Component: React.ComponentType<PortableClientComponentProps<T>>,
) => {
  const ClientComponent = (props: T) => {
    const { renderNode: _, ...rest } = props;
    return <Component {...rest} />;
  };
  return ClientComponent;
};

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
    code: PostBodyCode,
    image: stripPTFunctions(PostBodyImage),
  },
  marks: {
    link: PostBodyLink,
  },
};

const PostBody = ({ body }: PostBodyProps) => {
  return (
    <div className="prose mx-auto dark:prose-invert">
      <PortableText value={body} components={components} />
    </div>
  );
};

export default PostBody;
