import { Command, Option } from "commander";
import { exportDataset } from "./utils";

const program = new Command("Sanity Export");

program
  .addOption(
    new Option("-p, --project <project>", "Project of the dataset to export")
      .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("-d, --dataset <dataset>", "Dataset to export")
      .env("NEXT_PUBLIC_SANITY_DATASET")
      .makeOptionMandatory(),
  )
  .parse();

const { project, dataset } = program.opts<{
  project: string;
  dataset: string;
}>();

(async () => {
  try {
    await exportDataset(project, dataset);
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
  }
})();
