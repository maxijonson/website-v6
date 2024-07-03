import { makeSafeQueryRunner } from "groqd";
import type { FilteredResponseQueryOptions } from "next-sanity";
import { client } from "../client";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import { serverEnv } from "@/env/env-server";

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

    const stega: RunQueryOptions["stega"] = (() => {
      if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return false;
      if (options?.stega !== undefined) return options.stega;
      return isDraftMode;
    })();

    const token = (() => {
      try {
        if (options?.token) return options.token;
        if (perspective !== "previewDrafts") return undefined;
        return serverEnv.SANITY_API_READ_TOKEN;
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
