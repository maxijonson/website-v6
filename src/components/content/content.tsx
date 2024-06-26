import {
  PortableText,
  type PortableTextProps,
  type PortableTextReactComponents,
} from "@portabletext/react";
import ContentCodeGroup from "./components/content-code-group/content-code-group";
import ContentImage from "./components/content-image";
import ContentLink from "./components/content-link";
import ContentAlert from "./components/content-alert";
import ContentInternalLink from "./components/content-internal-link";

export interface ContentProps extends PortableTextProps {
  className?: string;
  id?: string;
}

const defaultContentComponents: Partial<PortableTextReactComponents> = {
  types: {
    codeGroup: ContentCodeGroup,
    contentImage: ContentImage,
    contentAlert: ContentAlert,
  },
  marks: {
    link: ContentLink,
    internalLink: ContentInternalLink,
  },
};

const Content = ({
  className,
  id,
  components = {},
  ...props
}: ContentProps) => {
  return (
    <div className={className} id={id}>
      <PortableText
        {...props}
        components={{
          ...components,
          types: { ...defaultContentComponents.types, ...components.types },
          marks: { ...defaultContentComponents.marks, ...components.marks },
        }}
      />
    </div>
  );
};

export default Content;
