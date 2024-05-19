import {
  PortableText,
  type PortableTextProps,
  type PortableTextReactComponents,
} from "@portabletext/react";
import ContentImage from "./components/content-image";
import ContentLink from "./components/content-link";
import ContentCode from "./components/content-code/content-code";
import { stripPortableTextFunctions } from "@/utils/stripPortableTextFunctions";

export interface ContentProps extends PortableTextProps {
  className?: string;
}

const defaultContentComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: stripPortableTextFunctions(ContentCode),
    image: ContentImage,
  },
  marks: {
    link: ContentLink,
  },
};

const Content = ({ className, components = {}, ...props }: ContentProps) => {
  return (
    <div className={className}>
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
