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
  generateStaticParams: GenerateStaticParams<TParentParams, TParams>;
}

export type GenerateStaticParams<
  TIn extends RouteParams = RouteParams,
  TOut extends RouteParams = RouteParams,
> = (parentParams: PageProps<TIn>) => TOut[] | Promise<TOut[]>;
