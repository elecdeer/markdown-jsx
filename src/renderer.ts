import type { JSX } from "./jsx-runtime";
import { toMarkdown } from "mdast-util-to-markdown";

import type * as mdast from "mdast";
import { gfmStrikethroughToMarkdown } from "mdast-util-gfm-strikethrough";
import { type IntrinsicElementNode, type Node, TextElementNode } from "./jsx";

export type Renderer = (component: unknown) => string;

export const createRenderer = (config: unknown) => {
  return async (element: JSX.Element) => {
    console.dir(element, { depth: null });

    const mdast = await renderToMdast(element);

    console.dir(mdast, { depth: null });

    return toMarkdown(mdast, {
      extensions: [gfmStrikethroughToMarkdown()],
    });
  };
};

export const renderToMdast = async (
  element: JSX.Element
): Promise<mdast.Root> => {
  const resolvedElement = await element;

  const { type } = resolvedElement.$$jsxmarkdown;
  if (typeof type === "string") {
    const rootNode = (
      await transformNode(resolvedElement, ["markdown"])
    ).filter(excludeNullish);
    if (rootNode[0]) {
      return rootNode[0];
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

const transformNode = async <T extends keyof ElementTypeToMdastNodeMap>(
  element: Node,
  allowedNodeType: T[]
): Promise<(ElementTypeToMdastNodeMap[T] | null)[]> => {
  const { type, props } = element.$$jsxmarkdown;

  if (typeof type === "function") {
    const renderedNode = await type(props);
    return transformNode(renderedNode, allowedNodeType);
  }

  if (type === "$fragment") {
    return mapChildren(props.children, allowedNodeType);
  }

  if (!(allowedNodeType as string[]).includes(type)) {
    throw new MdastSemanticError(`Invalid node type: ${type}`);
  }

  if (type === "$text") {
    return [
      {
        type: "text",
        value: props.value,
      } satisfies mdast.Text as ElementTypeToMdastNodeMap[T],
    ];
  }

  switch (type) {
    case "markdown":
      return [
        {
          type: "root",
          children: await mapChildren(props.children, rootContentTypes),
        } satisfies mdast.Root as ElementTypeToMdastNodeMap[T],
      ];
    case "h1":
      return [
        {
          type: "heading",
          depth: 1,
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T],
      ];
    case "h2":
      return [
        {
          type: "heading",
          depth: 2,
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T],
      ];
    case "h3":
      return [
        {
          type: "heading",
          depth: 3,
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Heading as ElementTypeToMdastNodeMap[T],
      ];
    case "p":
      return [
        {
          type: "paragraph",
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Paragraph as ElementTypeToMdastNodeMap[T],
      ];
    case "br":
      return [
        {
          type: "break",
        } satisfies mdast.Break as ElementTypeToMdastNodeMap[T],
      ];
    case "a":
      return [
        {
          type: "link",
          url: (props as IntrinsicElementNode<"a">["$$jsxmarkdown"]["props"])
            .href,
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Link as ElementTypeToMdastNodeMap[T],
      ];
    case "i":
      return [
        {
          type: "emphasis",
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Emphasis as ElementTypeToMdastNodeMap[T],
      ];
    case "b":
      return [
        {
          type: "strong",
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Strong as ElementTypeToMdastNodeMap[T],
      ];
    case "s":
      return [
        {
          type: "delete",
          children: await mapChildren(props.children, phrasingContentTypes),
        } satisfies mdast.Delete as ElementTypeToMdastNodeMap[T],
      ];
    // case "u":
    //   return {
    //     type: "underline",
    //     children,
    //   } as mdast.Underline;
    case "code":
      return [
        {
          type: "inlineCode",
          value: (await mapChildren(props.children, ["$text"]))
            .map((child) => child?.value ?? "")
            .join(""),
        } satisfies mdast.InlineCode as ElementTypeToMdastNodeMap[T],
      ];
    case "pre":
      return [
        {
          type: "code",
          lang: (props as IntrinsicElementNode<"pre">["$$jsxmarkdown"]["props"])
            .lang,
          value: (await mapChildren(props.children, ["$text"]))
            .map((child) => child?.value ?? "")
            .join(""),
        } satisfies mdast.Code as ElementTypeToMdastNodeMap[T],
      ];
    case "ul":
      return [
        {
          type: "list",
          ordered: false,
          spread: false,
          children: await mapChildren(props.children, ["li"]),
        } satisfies mdast.List as ElementTypeToMdastNodeMap[T],
      ];
    case "ol":
      return [
        {
          type: "list",
          ordered: true,
          spread: false,
          start: (props as IntrinsicElementNode<"ol">["$$jsxmarkdown"]["props"])
            .start,
          children: await mapChildren(props.children, ["li"]),
        } satisfies mdast.List as ElementTypeToMdastNodeMap[T],
      ];
    case "li":
      return [
        {
          type: "listItem",
          spread: false,
          children: (
            await mapChildren(props.children, [...blockContentTypes, "$text"])
          ).map((child) => {
            if (child?.type === "text") {
              return {
                type: "paragraph",
                children: [child],
              } satisfies mdast.Paragraph;
            }
            return child;
          }),
        } satisfies mdast.ListItem as ElementTypeToMdastNodeMap[T],
      ];

    case "blockquote":
      return [
        {
          type: "blockquote",
          children: await mapChildren(props.children, blockContentTypes),
        } satisfies mdast.Blockquote as ElementTypeToMdastNodeMap[T],
      ];

    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const mapChildren = async <T extends keyof ElementTypeToMdastNodeMap>(
  children: Node[],
  allowedNodeType: T[]
): Promise<ElementTypeToMdastNodeMap[T][]> => {
  const renderedChildren = await Promise.all(
    children.map(async (child) => transformNode(child, allowedNodeType))
  );

  return renderedChildren.flat().filter(excludeNullish);
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
