import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import { getImageDimensions } from "@sanity/asset-utils";

export interface CompanyProps {
  name: string;
  image: ImageDetails;
  position: string;
  type: string;
  description?: string;
  feats?: string[];
  from: string;
  to?: string;
}

const Company = ({
  name,
  image,
  from,
  to,
  position,
  type,
  description,
  feats,
}: CompanyProps) => {
  const imageUrl = getImageBuilder(image).size(64, 64).url();
  const { aspectRatio, ...imageDimensions } = getImageDimensions(image);

  return (
    <div className={cn("flex gap-6", "md:gap-8")}>
      <div className="flex justify-center">
        <div
          className={cn(
            "flex h-full w-1 justify-center bg-stone-400",
            "dark:bg-stone-800",
          )}
        >
          <Avatar className={cn("sticky top-20 size-8", "md:top-24")}>
            <AvatarImage asChild src={imageUrl}>
              <Image {...imageDimensions} src={imageUrl} alt={name} />
            </AvatarImage>
            <AvatarFallback
              className={cn("bg-stone-400 font-bold", "dark:bg-stone-800")}
            >
              <span className="animate-pulse">{name[0]}</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex grow flex-col pb-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">{name}</h2>
          <Badge variant="outline" className="ml-2">
            {type}
          </Badge>
        </div>
        <span className={cn("text-sm text-stone-500", "dark:text-stone-400")}>
          {from} - {to || "Present"}
        </span>
        <span
          className={cn("text-sm italic text-stone-500", "dark:text-stone-400")}
        >
          {position}
        </span>
        {description && (
          <p className={cn("text-stone-700", "dark:text-stone-300")}>
            {description}
          </p>
        )}
        <ul className="mt-2">
          {feats?.map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <FiCheckCircle
                className={cn(
                  "size-5 shrink-0 text-stone-700",
                  "dark:text-stone-300",
                )}
              />
              <p>{feat}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Company;
