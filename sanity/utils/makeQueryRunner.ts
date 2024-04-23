import { runQuery } from "./run-query";

export interface BaseQueryOptions {
  tags?: string[];
}

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

export const makeQueryRunner = <
  TFnIn extends (wrappedRunQuery: typeof runQuery, ...args: any[]) => any,
  TArgsOut extends [
    ...Parameters<OmitFirstArg<TFnIn>>,
    options?: BaseQueryOptions,
  ],
>(
  fn: TFnIn,
) => {
  return (...args: TArgsOut): ReturnType<TFnIn> => {
    const wrappedRunQuery = (...wArgs: Parameters<typeof runQuery>) => {
      const { tags = [] } = args.pop() ?? {};
      return runQuery(wArgs[0], wArgs[1], {
        ...wArgs[2],
        next: {
          ...wArgs[2]?.next,
          tags: [...(wArgs[2]?.next?.tags ?? []), ...tags].filter((t) => !!t),
        },
      });
    };
    return fn(wrappedRunQuery, ...args);
  };
};
