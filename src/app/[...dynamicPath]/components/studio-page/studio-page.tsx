import { client } from "../../../../../sanity/client";
import { readToken } from "../../../../../sanity/token";
import Studio from "./studio";

const clientWithToken = client.withConfig({ token: readToken });

const StudioPage = async () => {
  const datasets = await clientWithToken.datasets.list();
  const names = datasets.map((dataset) => dataset.name);
  return <Studio datasets={names} />;
};

export default StudioPage;
