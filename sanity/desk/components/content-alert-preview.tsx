import type { PreviewProps } from "sanity";
import type { ContentAlert } from "../../sanity.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import IconifyIcon from "@/components/iconify-icon/iconify-icon";
import Content from "@/components/content/content";

type ContentAlertPreviewSelection = Pick<
  ContentAlert,
  "title" | "message" | "icon" | "variant"
>;

type ContentAlertPreviewProps = PreviewProps &
  Partial<{
    selection: ContentAlertPreviewSelection;
  }>;

const ContentAlertPreview = ({
  selection,
  ...props
}: ContentAlertPreviewProps) => {
  const { title, message, icon, variant } = selection || {};

  return (
    <div>
      {props.renderDefault({
        ...props,
        layout: "compact",
        title: " ",
      })}
      <Alert variant={variant}>
        {icon?.name && <IconifyIcon icon={icon.name} />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && (
          <AlertDescription>
            <Content value={message} />
          </AlertDescription>
        )}
      </Alert>
    </div>
  );
};

export default ContentAlertPreview;
