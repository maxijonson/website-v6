import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import { getQueryTag } from "../../utils/getQueryTag";

export const BLOGSETTINGS_DOCUMENT_ID = "blogSettings";

export const makeGetBlogSettingsQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("blogSettings"), "_id == $blogSettingsId", filter));

export const getBlogSettings = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetBlogSettingsQuery().grab$(selection).slice(0),
    { blogSettingsId: BLOGSETTINGS_DOCUMENT_ID },
    {
      tag: getQueryTag("blog-settings", "getBlogSettings"),
      next: { tags: ["blogSettings"] },
    },
  );
