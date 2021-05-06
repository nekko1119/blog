import type { DOMAttributes } from "react";
import styled from "styled-components";
import { Box, BoxProps } from "rebass/styled-components";

export type Props = {
  html: string;
} & BoxProps &
  DOMAttributes<never>;

/**
 * Display HTML that made from markdown.
 */
export const Content = styled(Box).attrs<Props, DOMAttributes<never>>(({ html }) => ({
  dangerouslySetInnerHTML: { __html: html },
}))`
  & {
    h1,
    h2 {
      border-bottom: 1px solid #dddddd;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 16px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      a {
        text-decoration: none;
      }
      position: relative;
    }
    p {
      margin-top: 0;
      margin-bottom: 16px;
      word-break: break-all;
    }
    ul,
    ol {
      margin-top: 0;
      margin-bottom: 16px;
    }
    ol li {
      margin-bottom: 16px;
    }
    pre {
      overflow: auto;
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 1rem;
      font-size: 85%;
    }
    code {
      font-family: "Consolas", "Menlo", monospace;
      margin: 0;
      padding: 0.1rem 0.2rem;
      font-size: 85%;
      background-color: #efefef;
      color: #e01e5a;
      border: 1px solid #dddddd;
      border-radius: 2px;
    }
    pre code {
      padding: 0;
      background-color: initial;
      line-height: inherit;
      font-size: inherit;
      border: 0;
      color: inherit;
    }
    blockquote {
      padding: 0 1rem;
      border-left: 0.25rem solid #dddddd;
      margin: 0;
      color: #a0a0a0;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      margin-top: 0;
      margin-bottom: 16px;
    }
    th,
    tr,
    td {
      border: 1px solid #dddddd;
      padding: 6px 13px;
      font-size: 1rem;
      line-height: 1.5rem;
    }
    tr:nth-child(2n) {
      background-color: #f5f5f5;
    }
    img {
      max-width: 100%;
    }
    hr {
      margin: 24px 0;
      border: 0;
      background-color: #dddddd;
      height: 0.25rem;
    }
    /* .icon-link {
      width: 1.5rem;
      height: 1.5rem;
      background-color: red;
      position: absolute;
      left: -1.5rem;
      top: 0;
      bottom: 0;
      margin: auto;
    } */
  }
`;
