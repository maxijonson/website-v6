import IconifyIcon from "@/components/iconify-icon/iconify-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { PortableTextTypeComponentProps } from "next-sanity";
import type { ContentAlertDetails } from "../../../../sanity/groqd/selections/content/content-alert-details";
import Content from "../content";
import { postBodyComponents } from "@/app/blog/[[...slug]]/components/post-body/post-body";

const ContentAlert = (
  props: PortableTextTypeComponentProps<ContentAlertDetails>,
) => {
  const { variant, message, title, icon } = props.value;
  return (
    <Alert variant={variant} className="not-prose">
      {icon?.name && (
        <IconifyIcon icon={icon.name} className="mt-[2px] size-4" />
      )}
      {title && <AlertTitle className="text-lg">{title}</AlertTitle>}
      {message && (
        <AlertDescription>
          <Content
            value={message}
            className="[&>p]:my-3"
            components={postBodyComponents}
          />
        </AlertDescription>
      )}
    </Alert>
  );
};

export default ContentAlert;
