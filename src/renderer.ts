import { JSX } from "./jsx-runtime";
import { toMarkdown } from "mdast-util-to-markdown";

import * as mdast from "mdast";
import { gfmStrikethroughToMarkdown } from "mdast-util-gfm-strikethrough";
import { IntrinsicElementNode, Node, TextElementNode } from "./jsx";

export type Renderer = (component: unknown) => string;

export const createRenderer = (config: unknown) => {
  return (element: JSX.Element) => {
    console.dir(element, { depth: null });

    const mdast = renderToMdast(element);

    console.log(mdast);

    return toMarkdown(mdast, {
      extensions: [gfmStrikethroughToMarkdown()],
    });
  };
};

export const renderToMdast = (element: JSX.Element): mdast.Root => {
  const { type } = element.$$jsxmarkdown;
  if (typeof type === "string") {
    const rootNode = transformNode(element, ["markdown"]);
    if (rootNode) {
      return rootNode;
    }
  }

  throw new MdastSemanticError("Invalid root node");
};

const excludeNullish = <T>(value: T): value is Exclude<T, null | undefined> =>
  value != null;

const rootContentTypes = [
  "blockquote", // blockquote
  "br", // break
  "pre", // code
  "s", // delete
  "i", // emphasis
  "h1", // heading
  "h2", // heading
  "h3", // heading
  "code", // inlineCode
  "a", // link
  "ol", // list
  "ul", // list
  "p", // paragraph
  "b", // strong
  "$text", // text
] as const satisfies ElementType[];

const phrasingContentTypes = [
  "br", // break
  "s", // delete
  "i", // emphasis
  "code", // inlineCode
  "a", // link
  "b", // strong
  "$text", // text
] as const satisfies ElementType[];

const blockContentTypes = [
  "blockquote", // blockquote
  "pre", // code
  "h1", // heading
  "h2", // heading
  "h3", // heading
  "ol", // list
  "ul", // list
  "p", // paragraph
] as const satisfies ElementType[];

const transformNode = <T extends keyof ElementTypeToMdastNodeMap>(
  element: Node,
  allowedNodeType: T[]
): ElementTypeToMdastNodeMap[T] | null => {
  const renderedNode =
    typeof element.$$jsxmarkdown.type === "function"
      ? element.$$jsxmarkdown.type(element.$$jsxmarkdown.props)
      : element;

  if (renderedNode === null) {
    return null;
  }

  const { type, props } = renderedNode.$$jsxmarkdown;

  if (typeof type === "function") {
    return transformNode(renderedNode, allowedNodeType);
  }
  if (type === "$text") {
    return {
      type: "text",
      value: props.value,
    } satisfies mdast.Text as ElementTypeToMdastNodeMap[T];
  }

  if (!(allowedNodeType as string[]).includes(type)) {
    throw new MdastSemanticError(`Invalid node type: ${type}`);
  }

  switch (type) {
    case "markdown":
      return {
        type: "root",
        children: props.children
          .map((child) => transformNode(child, rootContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Root as ElementTypeToMdastNodeMap[T];
    case "h1":
      return {
        type: "heading",
        depth: 1,
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T];
    case "h2":
      return {
        type: "heading",
        depth: 2,
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T];
    case "h3":
      return {
        type: "heading",
        depth: 3,
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T];
    case "p":
      return {
        type: "paragraph",
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Paragraph as ElementTypeToMdastNodeMap[T];
    case "br":
      return {
        type: "break",
      } satisfies mdast.Break as ElementTypeToMdastNodeMap[T];
    case "a":
      return {
        type: "link",
        url: (props as IntrinsicElementNode<"a">["$$jsxmarkdown"]["props"])
          .href,
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Link as ElementTypeToMdastNodeMap[T];
    case "i":
      return {
        type: "emphasis",
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Emphasis as ElementTypeToMdastNodeMap[T];
    case "b":
      return {
        type: "strong",
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Strong as ElementTypeToMdastNodeMap[T];
    case "s":
      return {
        type: "delete",
        children: props.children
          .map((child) => transformNode(child, phrasingContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Delete as ElementTypeToMdastNodeMap[T];
    // case "u":
    //   return {
    //     type: "underline",
    //     children,
    //   } as mdast.Underline;
    case "code":
      return {
        type: "inlineCode",
        value: props.children
          .map((child) => transformNode(child, ["$text"])?.value ?? "")
          .join(""),
      } satisfies mdast.InlineCode as ElementTypeToMdastNodeMap[T];
    case "pre":
      return {
        type: "code",
        lang: (props as IntrinsicElementNode<"pre">["$$jsxmarkdown"]["props"])
          .lang,
        value: props.children
          .map((child) => transformNode(child, ["$text"])?.value ?? "")
          .join(""),
      } satisfies mdast.Code as ElementTypeToMdastNodeMap[T];
    case "ul":
      return {
        type: "list",
        ordered: false,
        children: props.children
          .map((child) => transformNode(child, ["li"]))
          .filter(excludeNullish),
      } satisfies mdast.List as ElementTypeToMdastNodeMap[T];
    case "ol":
      return {
        type: "list",
        ordered: true,
        start: (props as IntrinsicElementNode<"ol">["$$jsxmarkdown"]["props"])
          .start,
        children: props.children
          .map((child) => transformNode(child, ["li"]))
          .filter(excludeNullish),
      } satisfies mdast.List as ElementTypeToMdastNodeMap[T];
    case "li":
      return {
        type: "listItem",
        children: props.children
          .map((child) => transformNode(child, blockContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.ListItem as ElementTypeToMdastNodeMap[T];

    case "blockquote":
      return {
        type: "blockquote",
        children: props.children
          .map((child) => transformNode(child, blockContentTypes))
          .filter(excludeNullish),
      } satisfies mdast.Blockquote as ElementTypeToMdastNodeMap[T];

    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

// declare namespace mdast {
//   export interface Strikethrough extends mdast.Parent {
//     type: "strikethrough";
//     children: mdast.PhrasingContent[];
//     data?: StrikethroughData | undefined;
//   }

//   export interface StrikethroughData extends mdast.Data {}
// }

export type ElementType = keyof ElementTypeToMdastNodeMap | "$text";

export type ElementTypeToMdastNodeMap = {
  markdown: mdast.Root;
  $text: mdast.Text;
  h1: mdast.Heading;
  h2: mdast.Heading;
  h3: mdast.Heading;
  p: mdast.Paragraph;
  br: mdast.Break;
  a: mdast.Link;
  i: mdast.Emphasis;
  b: mdast.Strong;
  s: mdast.Delete;
  // u: mdast.Underline;
  code: mdast.InlineCode;
  pre: mdast.Code;
  ul: mdast.List;
  ol: mdast.List;
  li: mdast.ListItem;
  blockquote: mdast.Blockquote;
};

class MdastSemanticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MdastSemanticError";
  }
}
