import { exec } from "child_process";
import inquirer from "inquirer";
import path from "path";
import { promisify } from "util";

export const asyncExec = promisify(exec);

export const sanityExportsDir = path.join(
  __dirname,
  "..",
  "..",
  "sanity",
  "exports",
);

export const exportDataset = async (
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  exportPath = path.join(sanityExportsDir, `${project}-${dataset}.tar.gz`),
) => {
  if (!project || !dataset) {
    throw new Error("[exportDataset]: Missing project or dataset.");
  }
  await asyncExec(
    `sanity dataset export ${dataset} ${exportPath} --overwrite`,
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: project,
        NEXT_PUBLIC_SANITY_DATASET: dataset,
      },
    },
  );
  return { exportPath, dataset, project };
};

export const createDataset = async (project: string, dataset: string) => {
  await asyncExec(`sanity dataset create ${dataset} --visibility public`, {
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: project,
    },
  });
};

export const importDataset = async (
  importPath: string,
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  options: { replace?: boolean | "force" } = {},
) => {
  const { replace = true } = options;
  if (!project || !dataset) {
    throw new Error("[importDataset]: Missing project or dataset.");
  }
  const replaceOption = (() => {
    if (!replace) return "";
    if (replace === "force") return "--replace";
    return dataset === "production" ? "" : "--replace";
  })();

  const projectDatasets = await getProjectDatasets(project);
  if (!projectDatasets.includes(dataset)) {
    await createDataset(project, dataset);
  }

  await asyncExec(
    `sanity dataset import "${importPath}" ${dataset} ${replaceOption}`,
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: project,
        NEXT_PUBLIC_SANITY_DATASET: dataset,
      },
    },
  );
};

export const getProjectDatasets = async (project: string) => {
  const { stdout } = await asyncExec(`sanity dataset list`, {
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: project,
    },
  });

  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

export const deleteDataset = async (
  project: string,
  dataset: string,
  confirm = true,
) => {
  if (confirm) {
    await promptConfirm(
      `Are you sure you want to delete ${project}/${dataset} dataset?`,
    );
  }

  await asyncExec(`sanity dataset delete ${dataset} --force`, {
    env: {
      ...process.env,
      NEXT_PUBLIC_SANITY_PROJECT_ID: project,
    },
  });
};

export const createProject = async (
  projectName: string,
  datasetName = "production",
) => {
  const result = await asyncExec(
    `sanity init --create-project "${projectName}" --dataset "${datasetName}" --visibility public --bare`,
  );
  const projectId = result.stdout.match(/Project ID: (\w+)/)?.[1];

  return { name: projectName, id: projectId, dataset: datasetName };
};

export const getGitBranch = async () => {
  const { stdout } = await asyncExec("git branch --show-current");
  return stdout.trim();
};

export const promptConfirm = async (message: string, abortOnFalse = true) => {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message,
    },
  ]);

  if (abortOnFalse && !confirm) {
    console.info("Operation cancelled.");
    process.exit(0);
  }

  return confirm;
};
