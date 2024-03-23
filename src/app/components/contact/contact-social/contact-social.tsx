import { Button } from "@/components/ui/button";
import Link from "next/link";
import type React from "react";

interface ContactSocialProps {
  name: string;
  url: string;
  children: React.ReactNode;
}

const ContactSocial = ({ name, url, children }: ContactSocialProps) => {
  return (
    <Button asChild size="icon" variant="outline" className="rounded-full">
      <Link href={url} target="_blank" title={name}>
        {children}
      </Link>
    </Button>
  );
};

export default ContactSocial;
