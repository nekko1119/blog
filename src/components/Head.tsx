import { FC } from "react";
import { default as NextHead } from "next/head";

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
};

export const Head: FC<Props> = ({ title, description, keywords, image }) => {
  return (
    <NextHead>
      <title>{title ?? "blog.nekko1119.org"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title ?? "blog.nekko1119.org"} key="title" />
      {description && <meta property="og:description" content={description} key="description" />}
      {keywords && keywords.length !== 0 && <meta name="keywords" content={keywords.join(",")} />}
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={image ?? ""} />
    </NextHead>
  );
};
