import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeaderNav = () => {
  return (
    <nav className={cn("grow px-2", "md:px-4")}>
      <ul className="flex gap-2">
        <li>
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
