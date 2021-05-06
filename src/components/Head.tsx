import { FC } from "react";
import NextHead from "next/head";

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  /**
   * relative path from `/public`
   */
  relativeImagePath?: string;
};

export const Head: FC<Props> = ({
  title = "blog.nekko1119.org",
  description,
  keywords,
  relativeImagePath = "/image.png",
}) => {
  const hostname = process.env.HOSTNAME;
  const imageFullPath = hostname ? `${hostname}${relativeImagePath}` : null;
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} key="title" />
      {description && <meta property="og:description" content={description} key="description" />}
      {keywords && keywords.length !== 0 && <meta name="keywords" content={keywords.join(",")} key="keywords" />}
      <meta property="og:type" content="blog" key="type" />
      {hostname && <meta property="og:url" content={hostname} key="url" />}
      {imageFullPath && <meta property="og:image" content={imageFullPath} key="image" />}
      <meta property="og:site_name" content={title} key="site_name" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@nekko1119" />
      <meta name="twitter:creator" content="@nekko1119" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {imageFullPath && <meta name="twitter:image" content={imageFullPath} />}
    </NextHead>
  );
};
