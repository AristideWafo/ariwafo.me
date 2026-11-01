import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../CopyButton";
import { AccessModels, ControlEvidence, DnsFailoverFlow, PrivateNetwork, SessionSequence } from "../diagrams";
import { Callout } from "./Callout";
import { TLDR } from "./TLDR";

export const mdxComponents: MDXComponents = {
  // Wrapper keeps wide tables scrolling inside the column instead of widening the page.
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table {...props} className="!my-0" />
    </div>
  ),
  pre: CodeBlock, Callout, TLDR, AccessModels, SessionSequence, ControlEvidence, PrivateNetwork, DnsFailoverFlow,
};
