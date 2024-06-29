import Content from "@/components/content/content";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import type { PortableTextReactComponents } from "next-sanity";
import { getPrivacyPolicyPage } from "../../../sanity/queries/pages/privacy-policy-page/getPrivacyPolicyPage";
import PostBodyHeading from "../blog/[[...slug]]/components/post-body/components/post-body-heading";
import PageView from "../components/analytics/page-view";

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
      <PageView type="privacy-policy" />
      <Header />
      <main
        className={cn("m-auto max-w-screen-lg px-6 pb-4 pt-24", "md:pt-24")}
      >
        <h1 className={cn("pb-4 text-4xl font-bold", "md:text-5xl")}>
          Privacy Policy
        </h1>
        <p className="pb-4 italic">
          Last updated:{" "}
          <time dateTime={updatedAt}>
            {new Date(updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
        <Content
          className={cn(
            "prose max-w-none break-words text-stone-950",
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
