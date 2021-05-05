import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { Post, getPostPathsAll, getPost, getFilename } from "../domains/posts";

type Props = {
  posts: Array<Post>;
};

const Main: React.FC<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.meta.title ?? post.meta.path}>
          <Link href={{ pathname: post.meta.path }}>
            <a>{post.meta.title ?? post.meta.path}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await getPostPathsAll();
  const posts = await Promise.all(paths.map(async (path) => await getPost(getFilename(path))));

  return { props: { posts } };
};

export default Main;
