import { studioClient } from "../../../../../sanity/utils/studio-client";
import Studio from "./studio";

export const findDatasetByPath = async (path: string) => {
  const datasets = await studioClient.datasets.list();
  return datasets.find((dataset) => {
    if (dataset.name === "production") {
      return path === "studio";
    }
    return path === `studio-${dataset.name}`;
  });
};

const StudioPage = async () => {
  const datasets = await studioClient.datasets.list();
  const names = datasets.map((dataset) => dataset.name);
  return <Studio datasets={names} />;
};

export default StudioPage;
