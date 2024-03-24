import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans } from "@/app/fonts";
import ThemeProvider from "@/components/theme-provider";
import DevUtils from "./components/dev-utils/dev-utils";

export const metadata: Metadata = {
  title: "Tristan Chin",
  description:
    "Personnal website of Tristan Chin, B. Eng. Software Engineering and Web Developer.",
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
      </body>
    </html>
  );
};

export default RootLayout;
