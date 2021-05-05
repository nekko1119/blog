import { basename, join } from "path";
import { readFile } from "fs/promises";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import readdir from "recursive-readdir";
import matter, { Input } from "gray-matter";
import { markdownToHtml } from "./markdownToHtml";

dayjs.locale("ja");
dayjs.extend(localizedFormat);

export type Meta = {
  path: string;
  title?: string;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  content: string;
  meta: Meta;
};

const postsDirectoryPath = join(process.cwd(), "posts");

function formatDate(date: string): string {
  // https://day.js.org/docs/en/display/format#localized-formats
  // YYYY/MM/DD
  return dayjs(date).format("L");
}

async function formatMatterToPost<I extends Input>({
  path,
  matterData,
}: Readonly<{ path: string; matterData: matter.GrayMatterFile<I> }>): Promise<Post> {
  const post = { ...matterData };
  post.content = await markdownToHtml(post.content);
  if (post.data.createdAt) {
    post.data.createdAt = formatDate(post.data.createdAt);
  }
  if (post.data.pdatedAt) {
    post.data.updatedAt = formatDate(post.data.updatedAt);
  }
  return {
    content: post.content,
    meta: {
      path,
      ...post.data,
    },
  };
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
  const matterData = matter(file);
  const post = await formatMatterToPost({ path, matterData });
  return post;
}
