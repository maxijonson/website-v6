import { q } from "groqd";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { qType } from "../../../../../sanity/groqd/filters/type";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { authorDetailsSelection } from "../../../../../sanity/groqd/selections/author-details";
import { blogSettingsDetailsSelection } from "../../../../../sanity/groqd/selections/blog-settings-details";
import { homePageDetailsSelection } from "../../../../../sanity/groqd/selections/pages/home-page/home-page-details";
import { privacyPolicyPageDetailsSelection } from "../../../../../sanity/groqd/selections/pages/privacy-policy-page/privacy-policy-page-details";

export const webhookFilter =
  "_type in ['post', 'category', 'tag', 'author', 'blogSettings', 'homePage', 'privacyPolicyPage']";

export const webhookBodyQuery = q("*")
  .filter(webhookFilter)
  .slice(0)
  .select({
    [qType("post")]: pick(postDetailsSelection, ["type", "id", "slug", "tags"]),
    [qType("category")]: pick(categoryDetailsSelection, ["type", "id", "slug"]),
    [qType("tag")]: pick(tagDetailsSelection, [
      "type",
      "id",
      "slug",
      "category",
    ]),
    [qType("author")]: pick(authorDetailsSelection, ["type"]),
    [qType("blogSettings")]: pick(blogSettingsDetailsSelection, ["type"]),
    [qType("homePage")]: pick(homePageDetailsSelection, ["type"]),
    [qType("privacyPolicyPage")]: pick(privacyPolicyPageDetailsSelection, [
      "type",
    ]),
    default: {
      type: ["'unknown'", q.literal("unknown")],
    },
  });
