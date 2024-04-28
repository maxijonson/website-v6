import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

export const asyncExec = promisify(exec);

export const exportDataset = async (
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  exportPath = path.join(
    __dirname,
    "..",
    "..",
    "sanity",
    "exports",
    `${project}-${dataset}.tar.gz`,
  ),
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

export const importDataset = async (
  importPath: string,
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
) => {
  if (!project || !dataset) {
    throw new Error("[importDataset]: Missing project or dataset.");
  }
  const replace = dataset === "production" ? "" : "--replace";

  await asyncExec(
    `sanity dataset import "${importPath}" ${dataset} ${replace}`,
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: project,
        NEXT_PUBLIC_SANITY_DATASET: dataset,
      },
    },
  );
};

export const createDevProject = async (projectName: string) => {
  const result = await asyncExec(
    `sanity init --create-project "${projectName}" --dataset "dev" --visibility public --bare`,
  );
  const projectId = result.stdout.match(/Project ID: (\w+)/)?.[1];

  return { name: projectName, id: projectId, dataset: "dev" };
};
