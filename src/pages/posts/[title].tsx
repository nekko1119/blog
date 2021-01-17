import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

function Post({ params }) {
  return (
    <div>{params}</div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { params: params.title }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { title: "hoge" } }
    ],
    fallback: false
  }
};

export default Post;
