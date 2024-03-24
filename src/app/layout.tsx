import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans } from "@/app/fonts";
import ThemeProvider from "@/components/theme-provider";
import DevUtils from "./components/dev-utils/dev-utils";
import ogImage from "$/image/meta/og.png";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const generateMetadata = (): Metadata => {
  const description =
    "Personal website of Tristan Chin, B. Eng. Software Engineering and Web Developer.";
  const metadataBase = (() => {
    switch (process.env.NODE_ENV) {
      case "development":
        return new URL("http://localhost:3000");
      case "production":
        return new URL("https://chintristan.io");
      default:
        if (process.env.VERCEL_URL) {
          return new URL(`https://${process.env.VERCEL_URL}`);
        }
        return undefined;
    }
  })();

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
      description,
      images: [
        {
          url: ogImage.src,
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
          url: ogImage.src,
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
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {process.env.NODE_ENV === "development" && <DevUtils />}
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
