import { cn } from "@/lib/utils";
import { followPath } from "./hero-logo.css";
import type { SVGProps } from "react";
import type React from "react";

interface HeroLogoProps {
  logo:
    | React.ComponentType<SVGProps<SVGSVGElement>>
    | React.LazyExoticComponent<React.ComponentType<SVGProps<SVGSVGElement>>>;
  containerClassName?: string;
  className?: string;
}

const HeroLogo = ({
  logo: Logo,
  className,
  containerClassName,
}: HeroLogoProps) => {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 flex size-full max-h-[250px] max-w-[250px] -translate-x-1/2 -translate-y-[calc(50%+62px)] justify-center align-middle",
        containerClassName,
      )}
    >
      <Logo
        className={cn(
          "absolute size-14 transform-gpu opacity-0",
          followPath,
          className,
        )}
      />
    </div>
  );
};

export default HeroLogo;
