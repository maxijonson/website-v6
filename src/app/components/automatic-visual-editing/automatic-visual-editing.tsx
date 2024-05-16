"use client";

import { VisualEditing } from "next-sanity";
import { useEffect } from "react";

const AutomaticVisualEditing = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" && window === parent) {
      location.href = "/api/sanity/disable-draft";
    }
  }, []);

  return <VisualEditing />;
};

export default AutomaticVisualEditing;
