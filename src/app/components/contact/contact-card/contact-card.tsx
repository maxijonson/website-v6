"use client";

import imageProfile from "$/image/tristan/ipnos.jpg";
import { IoIosContact } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ContactCard = () => {
  const [vcf, setVcf] = useState("");

  useEffect(() => {
    const imageProfileUrl = new URL(imageProfile.src, window.location.origin);
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:4.0",
      "REV:" + new Date().toISOString(),
      "FN:Tristan Chin",
      "N:Chin;Tristan;;;",
      "GENDER:M",
      "EMAIL:tristan.chin@chintristan.io",
      "ORG:Ipnos",
      "ROLE:Full-Stack Web Developer",
      "TITLE:Full-Stack Web Developer",
      "TZ:America/Toronto",
      "URL:https://www.chintristan.io",
      "X-SOCIALPROFILE;TYPE=LinkedIn:https://www.linkedin.com/in/tristan-chin/",
      "X-SOCIALPROFILE;TYPE=GitHub:https://github.com/maxijonson",
      "X-SOCIALPROFILE;TYPE=Instagram:https://instagram.com/chin.tristan",
      "X-SOCIALPROFILE;TYPE=Twitter:https://twitter.com/maxijonson",
      "LOGO;MEDIATYPE=image/jpeg:" + imageProfileUrl.href,
      "PHOTO;MEDIATYPE=image/jpeg:" + imageProfileUrl.href,
      "CATEGORIES:programmer,web developer",
      "KIND:individual",
      "END:VCARD",
    ].join("\n");
    const data = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(data);
    setVcf(url);
  }, []);

  return (
    <Button
      disabled={!vcf}
      asChild={!!vcf}
      size="icon"
      variant="outline"
      title="Download Contact Card"
      className="rounded-full"
    >
      {vcf ? (
        <a href={vcf} download="Tristan Chin.vcf">
          <IoIosContact className="size-5" />
        </a>
      ) : (
        <IoIosContact className="size-5" />
      )}
    </Button>
  );
};

export default ContactCard;
