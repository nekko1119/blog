import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Post as PostType, getPost, getPostPathsAll, getFilename } from "../../domains/posts";

type Props = PostType;
type Params = Pick<Props, "title">

const Post: React.FC<Props> = (props) => {
  return <code>{JSON.stringify(props, undefined, 2)}</code>;
}

function assertExistsParams(params?: Params): asserts params is Required<Params> {
  if (params === undefined) {
    throw new Error("dynamic routing context was expected. but it was not dynamic routing context.");
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  assertExistsParams(params);
  const post = await getPost(params.title);
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
