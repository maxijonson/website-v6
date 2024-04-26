import { makeSafeQueryRunner } from "groqd";
import type {
  FilteredResponseQueryOptions,
  QueryParams,
  QueryWithoutParams,
} from "next-sanity";
import { client } from "../utils/client";

export const runQuery = makeSafeQueryRunner(
  (
    query,
    params?: QueryWithoutParams | QueryParams,
    options?: FilteredResponseQueryOptions,
  ) => client.fetch(query, params, options),
);
