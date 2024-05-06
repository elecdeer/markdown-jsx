import { AnyObject, ChildElement, FC } from "./jsx";
import { type JSX, jsx } from "./jsx-runtime";

export type { JSX };

export const jsxDEV = (
  type: FC | keyof JSX.IntrinsicElements,
  props: AnyObject & {
    children: ChildElement[];
  },
  key: unknown,
  isStaticChildren: boolean,
  source: Record<string, unknown>
): JSX.Element => {
  return jsx(
    type,
    {
      ...props,
      __isStaticChildren: isStaticChildren,
      __source: source,
    },
    key
  );
};
