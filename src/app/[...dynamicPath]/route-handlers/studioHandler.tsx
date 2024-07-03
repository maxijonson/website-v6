import { serverEnv } from "@/env/env-server";
import { client } from "../../../../sanity/client";
import StudioPage from "../components/studio-page/studio-page";
import type { DynamicRouteHandler } from "../page";

const clientWithToken = client.withConfig({
  token: serverEnv.SANITY_API_READ_TOKEN,
});

const findDatasetByPath = async (path: string) => {
  const datasets = await clientWithToken.datasets.list();
  return datasets.find((dataset) => {
    if (dataset.name === "production") {
      return path === "studio";
    }
    return path === `studio-${dataset.name}`;
  });
};

export const studioHandler: DynamicRouteHandler = {
  canHandle: async ({ params: { dynamicPath } }) => {
    const dataset = await findDatasetByPath(dynamicPath[0]);
    return !!dataset;
  },
  render: StudioPage,
};
