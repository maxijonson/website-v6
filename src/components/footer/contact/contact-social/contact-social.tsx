"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type React from "react";

interface ContactSocialProps {
  name: string;
  url: string;
  children: React.ReactNode;
  type: string;
}

const ContactSocial = ({ name, url, children, type }: ContactSocialProps) => {
  return (
    <Button asChild size="icon" variant="outline" className="rounded-full">
      <Link
        href={url}
        target="_blank"
        title={name}
        onClick={() => {
          AnalyticsManager.track("contact_click", { contact_type: type });
        }}
      >
        {children}
      </Link>
    </Button>
  );
};

export default ContactSocial;
