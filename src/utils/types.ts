import { q, type BaseQuery, type Selection, type z } from "groqd";
import type { Metadata, ResolvingMetadata } from "next";

export type Awaitable<T> = Promise<any> extends T ? T : T | Promise<T>;

export type RouteParams = Record<string, string | string[]>;

export interface PageProps<TParams extends RouteParams = RouteParams> {
  params: TParams;
}

export interface OpenGraphImageProps<
  TParams extends RouteParams = RouteParams,
> {
  params: TParams;
  id: string;
}

export type TwitterImageProps<TParams extends RouteParams = RouteParams> =
  OpenGraphImageProps<TParams>;

export type GenerateStaticParams<
  TIn extends RouteParams = RouteParams,
  TOut extends RouteParams = RouteParams,
> = (parentProps: PageProps<TIn>) => Awaitable<TOut[]>;

export type GenerateMetadata<TParams extends RouteParams = RouteParams> = (
  pageProps: PageProps<TParams>,
  parent: ResolvingMetadata,
) => Awaitable<Metadata>;

export type GenerateImageMetadata<TParams extends RouteParams = RouteParams> = (
  pageProps: PageProps<TParams>,
) => Awaitable<{
  id: string;
  alt: string;
  size: { width: number; height: number };
  contentType: string;
}>;

export interface RouteCatchAllHandler<
  TParams extends RouteParams = RouteParams,
  TParentParams extends RouteParams = RouteParams,
> {
  canHandle: (pageProps: PageProps<TParams>) => Awaitable<boolean>;
  render: (pageProps: PageProps<TParams>) => Awaitable<JSX.Element>;
  generateStaticParams?: GenerateStaticParams<TParentParams, TParams>;
  generateMetadata?: GenerateMetadata<TParams>;
}

const unknownArrayQuery = q("").filter();
export type UnknownArrayQuery = typeof unknownArrayQuery;

const entityQuery = q("").filter().slice(0);
export type EntityQuery = typeof entityQuery;

export type ConditionValue = Selection | BaseQuery<any> | [string, z.ZodType];
export type ConditionRecord = Record<string, ConditionValue>;
