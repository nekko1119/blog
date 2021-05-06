import unifined from "unified";
import parser from "remark-parse";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import footnotes from "remark-footnotes";
import rehype from "remark-rehype";
import slug from "rehype-slug";
import autolink from "rehype-autolink-headings";
import rehypeShiki from "@leafac/rehype-shiki";
import { getHighlighter } from "shiki";
import html from "rehype-stringify";
import minify from "rehype-preset-minify";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unifined()
    // parse markdown, and make mdast (markdown AST)
    .use(parser)
    // support Github flavored Markdown (ex. table)
    .use(gfm)
    // support footnotes syntax
    .use(footnotes, { inlineNotes: true })
    // replace github flavored emoji(ex. :+1: ) to utf-8 code
    .use(emoji)
    // convert mdast to hast (HTML AST)
    .use(rehype)
    // add id to heading elements
    .use(slug)
    // add autolink to headings
    .use(autolink, { behavior: "wrap" })
    // syntax highlight for code block
    .use(rehypeShiki, { highlighter: await getHighlighter({ theme: "dark-plus" }) })
    // minify
    .use(minify)
    // generate html
    .use(html)
    // input and execution
    .process(markdown);
  return result.toString();
}
