declare module "*.svg?url" {
  const content: {
    src: string;
    height: number;
    width: number;
    blurWidth: number;
    blurHeight: number;
  };
  export default content;
}

declare module "*.svg" {
  import React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
