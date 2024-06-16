import { cacheTag } from "@/utils/cache";
import { q } from "groqd";
import { qAnd } from "../../../groqd/filters/and";
import { qType } from "../../../groqd/filters/type";
import { runQuery } from "../../../groqd/runQuery";
import { privacyPolicyPageDetailsSelection } from "../../../groqd/selections/pages/privacy-policy-page/privacy-policy-page-details";
import { getQueryTag } from "../../../utils/getQueryTag";

export const makeGetPrivacyPolicyPage = (filter?: string) =>
  q("*").filter(qAnd(qType("privacyPolicyPage"), filter));

export const getPrivacyPolicyPage = () =>
  runQuery(
    makeGetPrivacyPolicyPage()
      .grab$(privacyPolicyPageDetailsSelection)
      .slice(0),
    {},
    {
      tag: getQueryTag("privacy-policy-page", "getPrivacyPolicyPage"),
      next: { tags: [cacheTag.pages.privacyPolicyPage] },
    },
  );
