import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans } from "@/app/fonts";
import ThemeProvider from "@/components/theme-provider";

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
    <html lang="en">
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
