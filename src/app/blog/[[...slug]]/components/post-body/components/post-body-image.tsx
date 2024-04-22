import type { PortableTextTypeComponentProps } from "next-sanity";
import type { PostBodyImage } from "../../../../../../../sanity/selections/post-body";
import { getImageDimensions } from "@sanity/asset-utils";
import { getImageBuilder } from "../../../../../../../sanity/utils/image";
import Image from "next/image";
import type { PortableClientComponentProps } from "../post-body";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const PostBodyImage = (
  props: PortableClientComponentProps<
    PortableTextTypeComponentProps<PostBodyImage>
  >,
) => {
  const { value, isInline } = props;
  const { width, height } = getImageDimensions(value);
  const imageBuilder = getImageBuilder(value);

  return (
    <Dialog>
      <DialogTrigger className="my-4">
        <Image
          src={imageBuilder.auto("format").url()}
          alt={value.alt || "Post Body Image"}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={value.metadata.lqip}
          sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              40vw"
          style={{
            display: isInline ? "inline" : "block",
          }}
          className="m-0 rounded-lg object-contain"
        />
      </DialogTrigger>
      <DialogContent
        className="my-4 max-h-full w-full max-w-[80%] overflow-auto border-none bg-transparent px-0 py-8 scrollbar"
        withCloseButton={false}
      >
        <div>
          <label>
            <input type="checkbox" className="peer hidden" />
            <Image
              src={imageBuilder.auto("format").url()}
              alt={value.alt || "Post Body Image"}
              width={width}
              height={height}
              placeholder="blur"
              blurDataURL={value.metadata.lqip}
              sizes="
              (max-width: 768px) 100vw,
              80vw
              "
              className={cn(
                "origin-top-left cursor-zoom-in",
                "peer-checked:scale-[2] peer-checked:cursor-zoom-out",
              )}
            />
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostBodyImage;
