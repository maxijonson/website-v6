import { serverEnv } from "@/env/env-server";
import { client } from "../../../../../sanity/client";
import Studio from "./studio";

const clientWithToken = client.withConfig({
  token: serverEnv.SANITY_API_READ_TOKEN,
});

const StudioPage = async () => {
  const datasets = await clientWithToken.datasets.list();
  const names = datasets.map((dataset) => dataset.name);
  return <Studio datasets={names} />;
};

export default StudioPage;
