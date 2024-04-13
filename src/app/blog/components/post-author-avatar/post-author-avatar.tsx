import { getImageDimensions } from "@sanity/asset-utils";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import Image from "next/image";
import type { AuthorDetails } from "../../../../../sanity/queries/author/makeAuthorDetailsQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface PostAuthorAvatarProps {
  author: Pick<AuthorDetails, "image" | "name">;
  className?: string;
}

const PostAuthorAvatar = ({
  author: { image, name },
  className,
}: PostAuthorAvatarProps) => {
  const imageBuilder = getImageBuilder(image);
  const { width, height } = getImageDimensions(image);
  const src = imageBuilder.auto("format").quality(100).url();

  return (
    <Avatar className={className}>
      <AvatarImage asChild src={src}>
        <Image
          src={src}
          alt={image.alt || name}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={image.metadata.lqip}
          sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              40vw"
        />
      </AvatarImage>
      <AvatarFallback className="bg-blue-900 font-bold text-white">
        {name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default PostAuthorAvatar;
