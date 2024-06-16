import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Contact from "./contact/contact";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className={cn("flex flex-col gap-8 pb-8 text-center text-sm")}
      suppressHydrationWarning
    >
      <Separator className="mt-20" />
      <Contact />
      <div>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
      <div>{new Date().getFullYear()} &copy; Tristan Chin</div>
    </footer>
  );
};

export default Footer;
