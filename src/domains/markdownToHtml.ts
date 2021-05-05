import unifined from "unified";
import parser from "remark-parse";
import gfm from "remark-gfm";
import rehype from "remark-rehype";
import slug from "rehype-slug";
import rehypeShiki from "@leafac/rehype-shiki";
import { getHighlighter } from "shiki";
import html from "rehype-stringify";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unifined()
    // parse markdown, and make mdast (markdown AST)
    .use(parser)
    // support Github Flavored Markdown (ex. table)
    .use(gfm)
    // convert mdast to hast (HTML AST)
    .use(rehype)
    // add id to heading elements
    .use(slug)
    // syntax highlight for code block
    .use(rehypeShiki, { highlighter: await getHighlighter({ theme: "dark-plus" }) })
    // generate html
    .use(html)
    // input and execution
    .process(markdown);
  return result.toString();
}
