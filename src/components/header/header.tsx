import LogoColor from "$/svg/tristan/logo/logo-color-transparent.svg";
import ThemeSwitch, {
  type ThemeSwitchProps,
} from "@/components/theme-switch/theme-switch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HeaderNav from "./header-nav";

export interface HeaderProps {
  className?: string;
  classNames?: Partial<Record<"root" | "container", string>>;
  themeSwitch?: ThemeSwitchProps;
}

const Header = ({
  className,
  classNames = {},
  themeSwitch: themeSwitch,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 flex flex-col items-center px-2 pt-2 opacity-100 transition-[opacity]",
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
          <Link href="/">
            <LogoColor className="size-12" />
          </Link>
        </div>
        <HeaderNav />
        <div className="flex items-center">
          <ThemeSwitch {...themeSwitch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
