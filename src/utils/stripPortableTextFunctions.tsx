/**
 * Client components who use the following `stripPortableTextFunctions` HOC can use this type to remove the `renderNode` prop (function) from the props.
 */
export type PortableClientComponentProps<T> = Omit<T, "renderNode">;

/**
 * Client components cannot receive functions as props from the server (here).
 * This wrapper component is used to remove the `renderNode` prop (fuction) from the props and passes the rest to the actual component.
 *
 * Note: using this on a server component won't make it a client component. It would be safe to use it on every component if we wanted to.
 */
export const stripPortableTextFunctions = <T extends Record<string, any>>(
  Component: React.ComponentType<PortableClientComponentProps<T>>,
) => {
  const ClientComponent = (props: T) => {
    const { renderNode: _, ...rest } = props;
    return <Component {...rest} />;
  };
  return ClientComponent;
};
