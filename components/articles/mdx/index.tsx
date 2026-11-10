import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../CopyButton";
import { AccessModels, AgenticFlow, CatalogGap, ControlEvidence, ControlLayers, DnsFailoverFlow, PrivateNetwork, SessionSequence, WorkflowStates } from "../diagrams";
import { Callout } from "./Callout";
import { TLDR } from "./TLDR";

export const mdxComponents: MDXComponents = {
  pre: CodeBlock, Callout, TLDR, AccessModels, SessionSequence, ControlEvidence, PrivateNetwork, DnsFailoverFlow,
  AgenticFlow, ControlLayers, WorkflowStates, CatalogGap,
};

/** Links to an article that is not published yet render as plain text with its date, not a 404. */
export const upcomingAwareLink = (upcoming: Map<string, string>) =>
  function Link({ href = "", children, ...rest }: React.ComponentProps<"a">) {
    const date = upcoming.get(href.match(/^\/articles\/([^#?/]+)/)?.[1] ?? "");
    if (!date) return <a href={href} {...rest}>{children}</a>;
    return <span>{children} <span className="whitespace-nowrap text-muted-foreground">(coming {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })})</span></span>;
  };
