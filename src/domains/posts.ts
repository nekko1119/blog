import { basename, join } from "path";
import fs from "fs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import readdir from "recursive-readdir";

dayjs.locale("ja");
dayjs.extend(localizedFormat);

const { readFile } = fs.promises;

export type Post = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const postsDirectoryPath = join(process.cwd(), "posts");

function formatDate(date: string): string {
  // https://day.js.org/docs/en/display/format#localized-formats
  // YYYY/MM/DD
  return dayjs(date).format("L");
}

export function getFilename(path: string): string {
  return basename(path).replace(/\.md/, "");
}

export async function getPostPathsAll(postsDirPath = postsDirectoryPath): Promise<string[]> {
  return await readdir(postsDirPath);
}

export async function getPost(title: string): Promise<Post> {
  const paths = await getPostPathsAll();
  const targetPath = paths.find((path) => {
    return title === getFilename(path);
  });

  if (targetPath === undefined) {
    throw new Error(`${title} was not found in post paths: ${paths}`);
  }

  const file = await readFile(targetPath);
  const content = file.toString();

  return {
    content,
    title,
    createdAt: formatDate('2021-05-03'),
    updatedAt: formatDate('2021-05-03'),
  };
}
