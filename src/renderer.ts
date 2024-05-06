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
  const { type, props } = element.$$jsxmarkdown;
  if (typeof type === "string") {
    return transformNode(element) as mdast.Root;
  }

  return {
    type: "root",
    children: [],
  };
};

const transformNode = (element: Node<any>): mdast.Nodes => {
  const { type, props } = element.$$jsxmarkdown;

  const transformChildren = (children: Node<any> | Node<any>[] | undefined) => {
    if (!children) return [];
    return Array.isArray(children)
      ? children.map(transformNode)
      : [transformNode(children)];
  };

  // TODO: FC

  switch (type) {
    case "$text":
      return {
        type: "text",
        value: props.value,
      };
    case "markdown":
      return { type: "root", children: transformChildren(props.children) };
    case "h1":
      return {
        type: "heading",
        depth: 1,
        children: transformChildren(props.children),
      };
    case "h2":
      return {
        type: "heading",
        depth: 2,
        children: transformChildren(props.children),
      };
    case "h3":
      return {
        type: "heading",
        depth: 3,
        children: transformChildren(props.children),
      };
    case "p":
      return {
        type: "paragraph",
        children: transformChildren(props.children),
      };
    case "a":
      return {
        type: "link",
        url: props.href,
        children: transformChildren(props.children),
      };
    case "i":
      return {
        type: "emphasis",
        children: transformChildren(props.children),
      };
    case "b":
      return {
        type: "strong",
        children: transformChildren(props.children),
      };
    case "s":
      return {
        type: "delete",
        children: transformChildren(props.children),
      };
    // case "u":
    //   return {
    //     type: "underline",
    //     children,
    //   };
    case "code":
      return {
        type: "inlineCode",
        value: props.children
          .map((child) => {
            return child.$$jsxmarkdown.props.value;
          })
          .join(""),
      };
    case "pre":
      return {
        type: "code",
        lang: props.lang,
        value: props.children
          .map((child) => {
            return child.$$jsxmarkdown.props.value;
          })
          .join(""),
      };
    case "ul":
      return {
        type: "list",
        ordered: false,
        children: transformChildren(props.children),
      };
    case "ol":
      return {
        type: "list",
        ordered: true,
        start: props.start,
        children: transformChildren(props.children),
      };
    case "li":
      return {
        type: "listItem",
        children: transformChildren(props.children),
      };

    case "blockquote":
      return {
        type: "blockquote",
        children: transformChildren(props.children),
      };

    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

type ElementType = keyof JSX.IntrinsicElements | "$text";
const elementTypeMap = {
  markdown: "root",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  p: "paragraph",
  a: "link",
  i: "emphasis",
  b: "strong",
  s: "delete",
  u: "underline",
  code: "inlineCode",
  pre: "code",
  ul: "list",
  ol: "list",
  li: "listItem",
  blockquote: "blockquote",
  $text: "text",
} as const satisfies Record<ElementType, mdast.Node["type"]>;

class MdastSemanticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MdastSemanticError";
  }
}

// const transformBlockContent = (children: Node<any>[]): mdast.BlockContent[] => {
//   return children.map(item => {

//   })
// };
