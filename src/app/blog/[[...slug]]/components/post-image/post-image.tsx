import { getImageDimensions } from "@sanity/asset-utils";
import { getImageBuilder } from "../../../../../../sanity/utils/image";
import Image from "next/image";
import type { PostDetails } from "../../../../../../sanity/groqd/selections/post-details";

interface PostImageProps {
  image: PostDetails["image"];
  className?: string;
}

const PostImage = ({ image, className }: PostImageProps) => {
  const imageBuilder = getImageBuilder(image);
  const { width, height } = getImageDimensions(image);

  return (
    <Image
      src={imageBuilder.auto("format").url()}
      alt={image.alt || "Post Image"}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={image.metadata.lqip}
      sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              40vw"
      className={className}
    />
  );
};

export default PostImage;
