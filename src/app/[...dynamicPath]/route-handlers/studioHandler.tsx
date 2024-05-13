import StudioPage, {
  findDatasetByPath,
} from "../components/studio-page/studio-page";
import type { DynamicRouteHandler } from "../page";

export const studioHandler: DynamicRouteHandler = {
  canHandle: async ({ params: { dynamicPath } }) => {
    const dataset = await findDatasetByPath(dynamicPath[0]);
    return !!dataset;
  },
  render: StudioPage,
};
