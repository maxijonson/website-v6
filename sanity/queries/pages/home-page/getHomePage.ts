import { cacheTag } from "@/utils/cache";
import { q } from "groqd";
import { qAnd } from "../../../groqd/filters/and";
import { qType } from "../../../groqd/filters/type";
import { runQuery } from "../../../groqd/runQuery";
import { homePageDetailsSelection } from "../../../groqd/selections/pages/home-page/home-page-details";
import { getQueryTag } from "../../../utils/getQueryTag";

export const makeGetHomePageQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("homePage"), filter));

export const getHomePage = () =>
  runQuery(
    makeGetHomePageQuery().grab$(homePageDetailsSelection).slice(0),
    {},
    {
      tag: getQueryTag("home-page", getHomePage.name),
      next: { tags: [cacheTag.pages.homePage] },
    },
  );
