import { type MarkdownJSX, jsx, jsxs } from "./jsx";

export namespace JSX {
  export type Element = MarkdownJSX.JSX.Element;

  export interface IntrinsicElements
    extends MarkdownJSX.JSX.IntrinsicElements {}

  export interface ElementChildrenAttribute
    extends MarkdownJSX.JSX.ElementChildrenAttribute {}

  export interface ElementAttributesProperty {
    props: any;
  }
}

export { jsx, jsxs };
