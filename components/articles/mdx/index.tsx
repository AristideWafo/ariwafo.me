import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../CopyButton";
import { Callout } from "./Callout";
import { TLDR } from "./TLDR";

export const mdxComponents: MDXComponents = { pre: CodeBlock, Callout, TLDR };
