import ogImage from "$/image/meta/og.png";
import { fontSans } from "@/app/fonts";
import ThemeProvider from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { scrollbarClassName } from "@/tailwind/classes";
import { getBaseURL } from "@/utils/getBaseURL";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import AutomaticVisualEditing from "./components/automatic-visual-editing/automatic-visual-editing";
import DevUtilsClient from "./components/dev-utils/dev-utils";
import "./globals.css";

export const generateMetadata = (): Metadata => {
  const description =
    "Personal website of Tristan Chin, B. Eng. Software Engineering and Web Developer.";
  const metadataBase = getBaseURL();

  return {
    metadataBase,
    title: "Tristan Chin",
    description,
    authors: [{ name: "Tristan Chin" }],
    keywords: [
      "Web developer",
      "Software engineering",
      "Portfolio",
      "Programmer",
      "Tristan Chin",
      "MaxiJonson",
    ],
    generator: "Next.js",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      countryName: "Canada",
      title: "Tristan Chin's Personal Website",
      siteName: "Tristan Chin's Personal Website",
      url: metadataBase,
      description,
      images: [
        {
          url: new URL(ogImage.src, metadataBase),
          alt: "Tristan Chin's Personal Website",
          width: ogImage.width,
          height: ogImage.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@MaxiJonson",
      creatorId: "1726834448",
      description,
      title: "Tristan Chin's Personal Website",
      images: [
        {
          url: new URL(ogImage.src, metadataBase),
          alt: "Tristan Chin's Personal Website",
          width: ogImage.width,
          height: ogImage.height,
        },
      ],
    },
  };
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(scrollbarClassName, "scroll-smooth")}
    >
      <body className={fontSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DevUtilsClient />
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        {draftMode().isEnabled && <AutomaticVisualEditing />}
      </body>
    </html>
  );
};

export default RootLayout;
