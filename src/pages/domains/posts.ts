import { basename, join } from "path";
import { readFile, stat } from "fs/promises";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import readdir from "recursive-readdir";

dayjs.locale("ja");
dayjs.extend(localizedFormat);

export type Post = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const postsDirectoryPath = join(process.cwd(), "posts");

function formatDate(date: Date): string {
  return dayjs(date).format("LLLL");
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

  const { ctime, mtime } = await stat(targetPath);
  const file = await readFile(targetPath);
  const content = file.toString();

  return {
    content,
    title,
    createdAt: formatDate(ctime),
    updatedAt: formatDate(mtime),
  };
}
