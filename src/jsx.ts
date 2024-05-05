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
      a: { href: string; children: string };

      i: AnyObject;
      b: AnyObject;
      s: AnyObject;
      u: AnyObject;

      code: { children: string };
      pre: { children: string };

      ul: { children: ChildElements };
      ol: { children: ChildElements; start?: number };
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

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface Node<P extends {} = {}> {
  readonly $$jsxmarkdown: {
    type: FC<P> | keyof MarkdownJSX.JSX.IntrinsicElements;
    props: P;
  };
}

export type ChildElement =
  | Node
  | object
  | string
  | ChildElement[]
  | number
  | boolean
  | bigint
  | null
  | undefined;

export type ChildElements = ChildElement | ChildElement[];

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type FC<P extends {} = {}> = (props: P) => Node<P> | null;

export const jsx = (
  type: FC | keyof MarkdownJSX.JSX.IntrinsicElements,
  props: Record<string, unknown>,
  _key: unknown
): Node => ({
  $$jsxmarkdown: { type, props },
});

export const jsxs = jsx;
