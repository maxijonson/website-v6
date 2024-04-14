import { makeSafeQueryRunner } from "groqd";
import { client } from "./client";
import type {
  FilteredResponseQueryOptions,
  QueryParams,
  QueryWithoutParams,
} from "next-sanity";

export const runQuery = makeSafeQueryRunner(
  (
    query,
    params?: QueryWithoutParams | QueryParams,
    options?: FilteredResponseQueryOptions,
  ) => client.fetch(query, params, options),
);
