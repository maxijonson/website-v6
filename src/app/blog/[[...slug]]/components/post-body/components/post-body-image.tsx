import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import type { PortableTextTypeComponentProps } from "next-sanity";
import Image from "next/image";
import type { ContentImageDetails } from "../../../../../../../sanity/groqd/selections/content/content-image-details";
import { getImageBuilder } from "../../../../../../../sanity/utils/image";

const PostBodyImage = (
  props: PortableTextTypeComponentProps<ContentImageDetails>,
) => {
  const { value, isInline } = props;
  if (!value?.asset) return null;

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
          placeholder={value.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={value.metadata?.lqip || undefined}
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
              placeholder={value.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={value.metadata?.lqip || undefined}
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
