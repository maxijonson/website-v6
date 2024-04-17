import LogoColor from "$/svg/tristan/logo/logo-color-transparent.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeSwitch, {
  type ThemeSwitchProps,
} from "@/components/theme-switch/theme-switch";

export interface HeaderProps {
  className?: string;
  classNames?: Partial<Record<"root" | "container", string>>;
  themeSwitchProps?: ThemeSwitchProps;
}

const Header = ({
  className,
  classNames = {},
  themeSwitchProps,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "opacity-1 fixed left-0 right-0 top-0 z-[1000] flex flex-col items-center overflow-hidden px-2 pt-2 transition-[opacity]",
        "md:px-5 md:pt-3",
        className,
        classNames.root,
      )}
    >
      <div
        className={cn(
          "relative flex w-full max-w-screen-lg items-center rounded-md border-[1px] border-stone-400 bg-white p-2 transition-[background-color,border-color,max-width,opacity] ease-in-out",
          "supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur",
          "dark:border-stone-800 dark:bg-stone-950",
          "dark:supports-[backdrop-filter]:bg-stone-950/70",
          classNames.container,
        )}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <LogoColor className="size-12" />
          </Link>
        </div>
        <div className="grow"></div>
        <div className="flex items-center">
          <ThemeSwitch {...themeSwitchProps} />
        </div>
      </div>
    </header>
  );
};

export default Header;
