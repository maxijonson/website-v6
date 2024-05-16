import { makeSafeQueryRunner } from "groqd";
import type { FilteredResponseQueryOptions } from "next-sanity";
import { client } from "../client";

export type RunQueryParams = Record<string, unknown>;
export type RunQueryOptions = FilteredResponseQueryOptions;

export const runQuery = makeSafeQueryRunner(
  (query, params?: RunQueryParams, options?: RunQueryOptions) =>
    client.fetch(query, params, options),
);
