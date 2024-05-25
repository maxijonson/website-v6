import { getCodeIcon } from "@/utils/getCodeIcon";
import type { CodeInputValue } from "@sanity/code-input";
import type { PreviewProps } from "sanity";

export type CodeGroupListItemPreviewProps = PreviewProps & {
  selection?: CodeInputValue;
};

export const CodeGroupListItemPreview = (
  props: CodeGroupListItemPreviewProps,
) => {
  const Icon = getCodeIcon(props.selection?.language);
  return (
    <>
      {props.renderDefault({
        ...props,
        media: Icon ? <Icon /> : undefined,
        title: props.selection?.filename || <i>Untitled</i>,
        subtitle: props.selection?.language || "undefined (text)",
      })}
    </>
  );
};
