import { cn } from "@/lib/utils";
import Image from "next/image";
import type React from "react";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { urlForSvg } from "../../../../../sanity/utils/image";

export interface SkillProps {
  name: string;
  icon: ImageDetails;
  proficiency: 1 | 2 | 3 | 4 | 5;
}

const Skill = ({
  name,
  icon,
  proficiency,
  ...rootProps
}: SkillProps & React.ComponentPropsWithoutRef<"div">) => {
  const iconSize = 20;

  return (
    <div
      {...rootProps}
      className={cn(
        "flex items-center justify-between gap-4",
        rootProps.className,
      )}
    >
      <span className="text-md" title={icon.alt}>
        {name}
      </span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={`${i}`}
            alt={icon.alt}
            src={urlForSvg(icon)}
            width={iconSize}
            height={iconSize}
            className={cn("size-5", {
              "opacity-25 grayscale": proficiency - 1 < i,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default Skill;
