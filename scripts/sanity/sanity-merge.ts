import { Command, Option } from "commander";
import inquirer from "inquirer";
import { exportDataset, sanityExportsDir } from "./utils";
import path from "path";
import slugify from "slugify";

const program = new Command("Sanity Export");

program
  .addOption(
    new Option(
      "--from-project <fromProject>",
      "Project of the source dataset to merge from",
    )
      .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("--from-dataset <fromDataset>", "Source dataset to merge from")
      .default("production", "production dataset")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      "--to-project <toProject>",
      "Project of the destination dataset to merge to",
    )
      .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("--to-dataset <toDataset>", "Destination dataset to merge to")
      .default("staging", "staging dataset")
      .makeOptionMandatory(),
  )
  .parse();

const { fromProject, fromDataset, toProject, toDataset } = program.opts<{
  fromProject: string;
  fromDataset: string;
  toProject: string;
  toDataset: string;
}>();

(async () => {
  // Confirm the merge operation
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Merge ${fromProject}/${fromDataset} dataset into ${toProject}/${toDataset} dataset?`,
    },
  ]);

  if (!confirm) {
    console.info("Merge operation cancelled.");
    return;
  }

  console.info(`Exporting ${fromProject}/${fromDataset} dataset...`);
  const source = await exportDataset(fromProject, fromDataset);
  console.info(`✔ Exported source dataset to ${source.exportPath}.`);

  console.info(`Creating backup for ${toProject}/${toDataset} dataset...`);
  const backupSuffix = slugify(
    new Date().toLocaleString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }),
  );
  const backup = await exportDataset(
    toProject,
    toDataset,
    path.join(
      sanityExportsDir,
      `${toProject}-${toDataset}-backup-${backupSuffix}.tar.gz`,
    ),
  );
  console.info(
    `✔ Created backup for destination dataset to ${backup.exportPath}.`,
  );
})();
