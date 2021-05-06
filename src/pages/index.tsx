import React from "react";
import type { GetStaticProps } from "next";
import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import { Post, getPostPathsAll, getPost, getFilename } from "../domains/posts";
import { Main } from "../components/pages/Main";
import { Head } from "../components/Head";
import { markdownToHtml } from "../domains/markdownToHtml";

type Props = {
  posts: Array<Post>;
  content: string;
  hostname: string;
};

const Component: React.FC<Props> = ({ posts, content, hostname }) => {
  return (
    <Main>
      <Head hostname={hostname} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <ul>
        {posts.map((post) => (
          <li key={post.meta.title ?? post.meta.path}>
            <Link href={{ pathname: post.meta.path }}>
              <a>{post.meta.title ?? post.meta.path}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await getPostPathsAll();
  const posts = await Promise.all(paths.map(async (path) => await getPost(getFilename(path))));

  const topFile = await readFile(join(process.cwd(), "index.md"));
  const topHtml = await markdownToHtml(topFile.toString());

  const hostname = process.env.HOSTNAME;

  return { props: { posts, content: topHtml, hostname } };
};

export default Component;
