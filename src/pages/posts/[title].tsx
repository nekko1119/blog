import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Post as PostType, getPost, getPostPathsAll, getFilename } from "../domains/posts";

type Props = PostType;

function Post(props: Props) {
  return <code>{JSON.stringify(props, undefined, 2)}</code>;
}

export const getStaticProps: GetStaticProps<Props, Pick<Props, "title">> = async ({ params }) => {
  const post = await getPost(params!.title);
  return {
    props: { ...post },
  };
};

export const getStaticPaths: GetStaticPaths<Pick<Props, "title">> = async () => {
  const filePaths = await getPostPathsAll();

  const urlPaths = filePaths.map((path) => ({
    params: { title: getFilename(path) },
  }));

  return {
    paths: urlPaths,
    fallback: false,
  };
};

export default Post;
