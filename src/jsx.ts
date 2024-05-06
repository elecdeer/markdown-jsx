// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type AnyObject = {};

export namespace MarkdownJSX {
  export namespace JSX {
    export type Element = Node;

    export interface IntrinsicElements {
      markdown: AnyObject;

      h1: AnyObject;
      h2: AnyObject;
      h3: AnyObject;

      p: AnyObject;
      a: { href: string };

      i: AnyObject;
      b: AnyObject;
      s: AnyObject;
      u: AnyObject;

      code: { children?: string };
      pre: { lang?: string; children?: string };

      ul: { children?: ChildElements };
      ol: { children?: ChildElements; start?: number };
      li: AnyObject;

      blockquote: AnyObject;

      // time: {
      //   unixtime: number;
      //   children: never;
      //   format?: "f" | "F" | "d" | "t" | "D" | "T" | "R";
      // };

      // user: { id: string; children: never };
      // channel: { id: string; children: never };
      // role: { id: string; children: never };

      // guildNav: {
      //   type: "customize" | "browse" | "guide";
      //   children: never;
      // };

      // slashCommand: {
      //   name: string;
      //   id: string;
      //   children: never;
      // };

      // emoji: {
      //   name: string;
      //   id: string;
      //   animated?: boolean;
      //   children: never;
      // };

      // spoiler: AnyObject;
    }

    export interface ElementChildrenAttribute {
      children: AnyObject;
    }
  }
}

export type Node<P extends Record<string | number | symbol, unknown> = {}> =
  | FunctionComponentNode<P>
  | IntrinsicElementNode<P>
  | TextElementNode;

export type FunctionComponentNode<
  P extends Record<string | number | symbol, unknown> = {}
> = {
  readonly $$jsxmarkdown: {
    type: FC<P>;
    props: P & {
      children: Node[];
    };
  };
};

export type IntrinsicElementNode<
  P extends Record<string | number | symbol, unknown> = {}
> = {
  readonly $$jsxmarkdown: {
    type: keyof MarkdownJSX.JSX.IntrinsicElements;
    props: P & {
      children: Node[];
    };
  };
};

export type TextElementNode = {
  readonly $$jsxmarkdown: {
    type: "$text";
    props: {
      value: string;
      children: never[];
    };
  };
};

export type ChildElement = Node | StringLike | null | undefined;

export type StringLike = {
  toString(): string;
};

export type ChildElements = ChildElement | ChildElement[];

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type FC<P extends {} = {}> = (props: P) => Node<P> | null;

export const jsx = (
  type: FC | keyof MarkdownJSX.JSX.IntrinsicElements,
  props: Record<string, unknown> & {
    children?: ChildElements;
  },
  _key: unknown
): Node => {
  // 組み込み要素
  if (typeof type === "string") {
    return {
      $$jsxmarkdown: {
        type,
        props: {
          ...props,
          // 必ず配列に変換
          children: props.children
            ? Array.isArray(props.children)
              ? props.children.map((child) => {
                  return typeof child === "object"
                    ? child
                    : createTextElement(child);
                })
              : [
                  typeof props.children === "object"
                    ? props.children
                    : createTextElement(props.children),
                ]
            : [],
        },
      },
    };
  }

  throw new Error("Not implemented");
};

const createTextElement = (children: StringLike): TextElementNode => {
  return {
    $$jsxmarkdown: {
      type: "$text",
      props: {
        value: children.toString(),
        children: [],
      },
    },
  };
};

export const jsxs = jsx;
