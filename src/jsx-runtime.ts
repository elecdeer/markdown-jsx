import { type MarkdownJSX, jsx, jsxs, Fragment } from "./jsx";

export namespace JSX {
  export type Element =
    | MarkdownJSX.JSX.Element
    | Promise<MarkdownJSX.JSX.Element>;

  export interface IntrinsicElements
    extends MarkdownJSX.JSX.IntrinsicElements {}

  export interface ElementChildrenAttribute
    extends MarkdownJSX.JSX.ElementChildrenAttribute {}

  export interface ElementAttributesProperty {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any;
  }
}

export { jsx, jsxs, Fragment };
