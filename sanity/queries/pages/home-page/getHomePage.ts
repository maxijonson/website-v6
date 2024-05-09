import { cacheTag } from "@/utils/cache";
import { q } from "groqd";
import { qAnd } from "../../../groqd/filters/and";
import { qType } from "../../../groqd/filters/type";
import { runQuery } from "../../../groqd/runQuery";
import { homePageDetailsSelection } from "../../../groqd/selections/pages/home-page/home-page-details";

export const makeGetHomePageQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("homePage"), filter));

export const getHomePage = () =>
  runQuery(
    makeGetHomePageQuery().grab$(homePageDetailsSelection).slice(0),
    {},
    { next: { tags: [cacheTag.pages.homePage] } },
  );