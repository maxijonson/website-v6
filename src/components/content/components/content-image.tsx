import { getImageDimensions } from "@sanity/asset-utils";
import type { PortableTextTypeComponentProps } from "next-sanity";
import Image from "next/image";
import type { ContentImageDetails } from "../../../../sanity/groqd/selections/content/content-image-details";
import { getImageBuilder } from "../../../../sanity/utils/image";

const ContentImage = (
  props: PortableTextTypeComponentProps<ContentImageDetails>,
) => {
  const { value, isInline } = props;
  const { aspectRatio, ...imageDimensions } = getImageDimensions(value);
  const imageBuilder = getImageBuilder(value);

  return (
    <Image
      {...imageDimensions}
      src={imageBuilder.auto("format").url()}
      alt={value.alt || "Content Image"}
      placeholder="blur"
      blurDataURL={value.metadata.lqip}
      sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              40vw"
      style={{
        display: isInline ? "inline" : "block",
      }}
    />
  );
};

export default ContentImage;
