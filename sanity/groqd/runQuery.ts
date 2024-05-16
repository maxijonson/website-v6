import { makeSafeQueryRunner } from "groqd";
import type { FilteredResponseQueryOptions } from "next-sanity";
import { client } from "../client";

export type RunQueryParams = Record<string, unknown>;
export type RunQueryOptions = FilteredResponseQueryOptions;

export const runQuery = makeSafeQueryRunner(
  async (query, params?: RunQueryParams, options?: RunQueryOptions) => {
    const isDraftMode = await (async () => {
      try {
        const { draftMode } = await import("next/headers");
        return draftMode().isEnabled;
      } catch {
        return false;
      }
    })();

    const perspective: RunQueryOptions["perspective"] =
      options?.perspective ?? (isDraftMode ? "previewDrafts" : "published");
    const stega: RunQueryOptions["stega"] =
      options?.stega ??
      (perspective === "previewDrafts" || process.env.VERCEL_ENV === "preview");

    const token = await (async () => {
      try {
        if (options?.token) return options.token;
        if (perspective !== "previewDrafts") return undefined;
        const { readToken } = await import("../token");
        return readToken;
      } catch {
        return undefined;
      }
    })();

    return client.fetch(query, params, {
      ...options,
      stega,
      perspective,
      token,
    });
  },
);
