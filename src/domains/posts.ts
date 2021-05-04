import { basename, join } from "path";
import fs from "fs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import readdir from "recursive-readdir";
import matter from 'gray-matter';

dayjs.locale("ja");
dayjs.extend(localizedFormat);

const { readFile } = fs.promises;

export type Meta = {
  title?: string;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Post = {
  path: string;
  content: string;
  meta: Meta;
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

export async function getPost(path: string): Promise<Post> {
  const paths = await getPostPathsAll();
  const targetPath = paths.find((postPath) => {
    return path === getFilename(postPath);
  });

  if (targetPath === undefined) {
    throw new Error(`${path} was not found in post paths: ${paths.map(getFilename)}`);
  }

  const file = await readFile(targetPath);
  const { data, content } = matter(file) as { data: Meta, content: string };

  if (data.createdAt) {
    data.createdAt = formatDate(data.createdAt);
  }
  if (data.updatedAt) {
    data.updatedAt = formatDate(data.updatedAt);
  }

  return {
    content,
    path,
    meta: data
  };
}
