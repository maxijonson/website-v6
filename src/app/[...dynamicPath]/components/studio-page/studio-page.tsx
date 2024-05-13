import { studioClient } from "../../../../../sanity/utils/studio-client";
import Studio from "./studio";

const StudioPage = async () => {
  const datasets = await studioClient.datasets.list();
  const names = datasets.map((dataset) => dataset.name);
  return <Studio datasets={names} />;
};

export default StudioPage;
