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
      br: { children?: never };
      a: { href: string; children?: ChildElements };

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
      children?: any;
    }
  }
}

export type Node<P extends Record<string | number | symbol, unknown> = {}> =
  | FunctionComponentNode<P>
  | IntrinsicElementNode
  | TextElementNode
  | FragmentElementNode;

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
  T extends keyof MarkdownJSX.JSX.IntrinsicElements = keyof MarkdownJSX.JSX.IntrinsicElements
> = {
  readonly $$jsxmarkdown: {
    type: T;
    props: MarkdownJSX.JSX.IntrinsicElements[T] & {
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

export type FragmentElementNode = {
  readonly $$jsxmarkdown: {
    type: "$fragment";
    props: {
      children: Node[];
    };
  };
};

export type ChildElement = Node | StringLike | null | undefined;

export type StringLike = {
  toString(): string;
};

export type ChildElements = ChildElement | ChildElement[];

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type FC<P extends {} = {}> = (props: P) => MarkdownJSX.JSX.Element;

export const jsx = (
  type: FC | keyof MarkdownJSX.JSX.IntrinsicElements,
  props: Record<string, unknown> & {
    children?: ChildElements;
  },
  _key: unknown
): Node => {
  // 必ず配列に変換
  const children = props.children
    ? Array.isArray(props.children)
      ? props.children.map((child) => {
          return typeof child === "object" ? child : createTextElement(child);
        })
      : [
          typeof props.children === "object"
            ? props.children
            : createTextElement(props.children),
        ]
    : [];

  // 組み込み要素
  if (typeof type === "string") {
    return {
      $$jsxmarkdown: {
        type,
        props: {
          ...props,
          children,
        },
      },
    };
  }

  // 関数コンポーネント
  return {
    $$jsxmarkdown: {
      type,
      props: {
        ...props,
        children,
      },
    },
  };
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

export const Fragment = (props: { children: ChildElements }): Node => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return {
    $$jsxmarkdown: {
      type: "$fragment",
      props: {
        children: children.map((child) => {
          return typeof child === "object" ? child : createTextElement(child);
        }),
      },
    },
  };
};

export const jsxs = jsx;
