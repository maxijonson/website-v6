import Header from "@/components/header/header";
import { getPrivacyPolicyPage } from "../../../sanity/queries/pages/privacy-policy-page/getPrivacyPolicyPage";
import Footer from "@/components/footer/footer";
import Content from "@/components/content/content";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PortableTextReactComponents } from "next-sanity";
import PostBodyHeading from "../blog/[[...slug]]/components/post-body/components/post-body-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the website",
};

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: PostBodyHeading,
    h2: PostBodyHeading,
    h3: PostBodyHeading,
    h4: PostBodyHeading,
    h5: PostBodyHeading,
    h6: PostBodyHeading,
  },
};

const PrivacyPolicyPage = async () => {
  const { updatedAt, content } = await getPrivacyPolicyPage();

  return (
    <div>
      <Header />
      <main
        className={cn("m-auto max-w-screen-lg px-6 pb-4 pt-24", "md:pt-24")}
      >
        <div className="flex flex-col gap-4 pb-4">
          <h1 className={cn("text-4xl font-bold", "md:text-5xl")}>
            Privacy Policy
          </h1>
          <p className="italic">
            Last updated:{" "}
            <time dateTime={updatedAt}>
              {new Date(updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <Link href="/my-data">
            <Button variant="outline">Manage my data</Button>
          </Link>
        </div>
        <Content
          className={cn(
            "prose max-w-none text-stone-950",
            "dark:prose-invert dark:text-stone-50",
          )}
          value={content}
          components={components}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
