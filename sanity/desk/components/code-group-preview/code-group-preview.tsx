"use client";
import { useCodeLanguage } from "@/hooks/use-code-language";
import { getCodeIcon } from "@/utils/getCodeIcon";
import type { CodeInputValue } from "@sanity/code-input";
import {
  Button,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from "@sanity/ui";
import { useEffect, useState } from "react";
import { Refractor } from "react-refractor";
import type { PreviewProps } from "sanity";
import type { CodeGroup } from "../../../sanity.types";
import "./code-group-preview.scss";

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

export type CodeGroupPreviewProps = PreviewProps & {
  snippets?: CodeGroup["snippets"];
};

const CodeGroupPreview = ({
  snippets = [],
  ...props
}: CodeGroupPreviewProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeSnippet = snippets[activeTab];
  const language = useCodeLanguage(activeSnippet?.language);

  useEffect(() => {
    if (activeSnippet) return;
    setActiveTab(0);
  }, [activeSnippet]);

  if (!activeSnippet) return null;
  return (
    <Stack space={3}>
      {props.renderDefault({
        ...props,
        title: `Code Group | ${snippets.length} ${snippets.length === 1 ? "Snippet" : "Snippets"}`,
        layout: "block",
      })}
      <MenuButton
        button={
          <Button
            text={activeSnippet.filename || <i>Untitled {language} file</i>}
          />
        }
        id="code-group-preview-menu"
        menu={
          <Menu>
            {snippets.map((snippet, index) => (
              <MenuItem
                key={index}
                onClick={() => setActiveTab(index)}
                padding={3}
                text={
                  snippet.filename || (
                    <i>Untitled {snippet.language || "text"} file</i>
                  )
                }
              />
            ))}
          </Menu>
        }
        popover={{ portal: true }}
      />
      <Container overflow="auto">
        <Refractor
          language={language}
          value={activeSnippet.code || ""}
          markers={activeSnippet.highlightedLines}
          plainText={language === "text"}
        />
      </Container>
    </Stack>
  );
};

export default CodeGroupPreview;
