import { q, type BaseQuery, type Selection, type z } from "groqd";
import type { Metadata, ResolvingMetadata } from "next";

export type RouteParams = Record<string, string | string[]>;

export interface PageProps<TParams extends RouteParams = RouteParams> {
  params: TParams;
}

export interface RouteCatchAllHandler<
  TParams extends RouteParams = RouteParams,
  TParentParams extends RouteParams = RouteParams,
> {
  canHandle: (pageProps: PageProps<TParams>) => boolean | Promise<boolean>;
  render: (pageProps: PageProps<TParams>) => JSX.Element | Promise<JSX.Element>;
  generateStaticParams?: GenerateStaticParams<TParentParams, TParams>;
  generateMetadata?: GenerateMetadata<TParams>;
}

export type GenerateStaticParams<
  TIn extends RouteParams = RouteParams,
  TOut extends RouteParams = RouteParams,
> = (parentProps: PageProps<TIn>) => TOut[] | Promise<TOut[]>;

export type GenerateMetadata<TParams extends RouteParams = RouteParams> = (
  pageProps: PageProps<TParams>,
  parent: ResolvingMetadata,
) => Metadata | Promise<Metadata>;

const unknownArrayQuery = q("").filter();
export type UnknownArrayQuery = typeof unknownArrayQuery;

const entityQuery = q("").filter().slice(0);
export type EntityQuery = typeof entityQuery;

export type ConditionValue = Selection | BaseQuery<any> | [string, z.ZodType];
export type ConditionRecord = Record<string, ConditionValue>;
