import { makeSafeQueryRunner } from "groqd";
import { client } from "./client";
import type {
  FilteredResponseQueryOptions,
  QueryParams,
  QueryWithoutParams,
} from "next-sanity";

export const runSafeQuery = makeSafeQueryRunner(
  (
    query,
    params?: QueryWithoutParams | QueryParams,
    options?: FilteredResponseQueryOptions,
  ) => client.fetch(query, params, options),
);

export interface BaseQueryOptions {
  tags?: string[];
}

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

export const makeQueryRunner = <
  TFnIn extends (runQuery: typeof runSafeQuery, ...args: any[]) => any,
  TArgsOut extends [
    ...Parameters<OmitFirstArg<TFnIn>>,
    options?: BaseQueryOptions,
  ],
>(
  fn: TFnIn,
) => {
  return (...args: TArgsOut): ReturnType<TFnIn> => {
    const { tags = [] } = args.slice().pop() ?? {};
    const runQuery = (...wArgs: Parameters<typeof runSafeQuery>) => {
      return runSafeQuery(wArgs[0], wArgs[1], {
        ...wArgs[2],
        next: {
          ...wArgs[2]?.next,
          tags: [...(wArgs[2]?.next?.tags ?? []), ...tags].filter((t) => !!t),
        },
      });
    };
    return fn(runQuery, ...args);
  };
};
