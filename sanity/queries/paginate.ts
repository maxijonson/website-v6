import type { UnknownArrayQuery } from "@/utils/types";
import { makeSlicedQuery } from "./slice";
import type { Selection } from "groqd";
import {
  runQuery,
  type RunQueryOptions,
  type RunQueryParams,
} from "../groqd/runQuery";
import { getQueryTag } from "../utils/getQueryTag";

export const makePaginatedQuery = (
  query: UnknownArrayQuery,
  pageIndex: number,
  pageSize: number,
) =>
  makeSlicedQuery(
    query,
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize - 1,
  );

export const runPaginatedQuery = async <S extends Selection>(
  query: UnknownArrayQuery,
  selection: S,
  pageIndex: number,
  pageSize: number,
  params?: RunQueryParams,
  options?: RunQueryOptions,
) =>
  runQuery(
    makePaginatedQuery(query, pageIndex, pageSize).grab$(selection),
    params,
    {
      tag: getQueryTag("misc", runPaginatedQuery.name),
      ...options,
    },
  );
