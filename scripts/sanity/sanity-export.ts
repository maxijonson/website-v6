import { execSync } from "child_process";
import { Command, Option } from "commander";
import path from "path";

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

try {
  const exportPath = path.join(
    __dirname,
    "..",
    "..",
    "sanity",
    "exports",
    `${project}-${dataset}.tar.gz`,
  );
  execSync(`sanity dataset export ${dataset} ${exportPath} --overwrite`, {
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: project,
      NEXT_PUBLIC_SANITY_DATASET: dataset,
    },
  });
} catch {}
