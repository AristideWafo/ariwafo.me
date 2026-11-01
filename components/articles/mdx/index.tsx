import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../CopyButton";
import { AccessModels, ControlEvidence, DnsFailoverFlow, PrivateNetwork, SessionSequence } from "../diagrams";
import { Callout } from "./Callout";
import { TLDR } from "./TLDR";

export const mdxComponents: MDXComponents = {
  pre: CodeBlock, Callout, TLDR, AccessModels, SessionSequence, ControlEvidence, PrivateNetwork, DnsFailoverFlow,
};
