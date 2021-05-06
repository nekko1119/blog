import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Post as PostType, getPost, getPostPathsAll, getFilename } from "../domains/posts";
import { Main } from "../components/pages/Main";
import { Content } from "../components/organisms/Content";
import { Head } from "../components/Head";

type Props = PostType & { hostname: string };

type Params = {
  postTitle: string;
};

const Post: React.FC<Props> = (props) => {
  return (
    <Main>
      <Head title={props.meta.title} description={props.meta.description} hostname={props.hostname} />
      <code>{JSON.stringify(props.meta, undefined, 2)}</code>
      <Content html={props.content} />
    </Main>
  );
};

function assertExistsParams(params?: Params): asserts params is Required<Params> {
  if (params === undefined) {
    throw new Error("dynamic routing context was expected. but it was not dynamic routing context.");
  }
}

/**
 * get props on `/[postTitle]` is accessed.
 * `/[postTitle]` must be included in static paths.
 * if `/postTitle]` is not included in static paths, it returns 404 page.
 */
export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  assertExistsParams(params);
  const post = await getPost(params.postTitle);
  const hostname = process.env.HOSTNAME;
  return {
    props: { ...post, hostname },
  };
};

/**
 * enumerate pre-built page paths
 */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const filePaths = await getPostPathsAll();

  const paths = filePaths.map((path) => ({
    params: { postTitle: getFilename(path) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
