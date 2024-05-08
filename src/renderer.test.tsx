import { describe, expect, test } from "vitest";
import { createRenderer, renderToMdast } from "./renderer";
import { ChildElement, FC } from "./jsx";
import { JSX } from "./jsx-runtime";

const testElement = (
  <markdown>
    <h1>Hello, world!</h1>
    <p>This is a test.</p>
    <h2>Subheading</h2>
    <p>This is a test.</p>
    <h3>Subsubheading</h3>
    <p>This is a {"test"}.</p>
    <p>あああ</p>
    {/* <a href="https://example.com">Example</a> */}
    {/* <p>
      ppp
      <i>Italic</i>
      <b>Bold</b>
      <s>Strikethrough</s>
    </p> */}
    {/* <code>Code</code>
    <pre>Pre</pre>
    <ul>
      <li>Unordered list</li>
    </ul>
    <ol>
      <li>Ordered list</li>
    </ol> */}
    <blockquote>Blockquote</blockquote>
  </markdown>
);

describe("renderer", () => {
  test("heading", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <h1>h1h1h1</h1>
          <h2>h2h2h2</h2>
          <h3>h3h3h3</h3>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "# h1h1h1

      ## h2h2h2

      ### h3h3h3
      "
    `);
  });

  test("paragraph", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <p>ppp</p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "ppp
      "
    `);
  });

  test("break", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <p>
            aaa
            <br />
            bbb
            <br />
            ccc
          </p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "aaa\\
      bbb\\
      ccc
      "
    `);
  });

  test("link", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          This is <a href="https://example.com">Link</a>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "This is [Link](https://example.com)
      "
    `);
  });

  test("Style", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <p>
            <i>Italic</i>
            <b>Bold</b>
            <s>Strikethrough</s>
          </p>
          <p>
            <i>
              <b>italic & bold</b>
            </i>
            <s>
              <b>bold & strikethrough</b>
            </s>
          </p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "*Italic***Bold**~~Strikethrough~~

      ***italic & bold***~~**bold & strikethrough**~~
      "
    `);
  });

  test("inlineCode", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <p>
            Call <code>{"render()"}</code>
          </p>
          <p>
            Call <code>{"render(`option-${i}`)"}</code>
          </p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "Call \`render()\`

      Call \`\`render(\`option-\${i}\`)\`\`
      "
    `);
  });

  test("codeBlock", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <pre>{"const a = 1;"}</pre>
          <pre lang={"ts"}>{"const hoge = `${fuga}`;"}</pre>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "\`\`\`
      const a = 1;
      \`\`\`

      \`\`\`ts
      const hoge = \`\${fuga}\`;
      \`\`\`
      "
    `);
  });

  test("unorderedList", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <ul>
            <li>item1</li>
            <li>item2</li>
          </ul>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "* item1

      * item2
      "
    `);
  });

  test("orderedList", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <ol>
            <li>item1</li>
            <li>item2</li>
          </ol>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "1. item1

      2. item2
      "
    `);
  });

  test("blockquote", () => {
    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <blockquote>
            <p>para</p>
            <p>parapara</p>
          </blockquote>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "> para
      >
      > parapara
      "
    `);
  });

  test("FC", () => {
    const Component: FC<{
      children: ChildElement;
    }> = ({ children }) => {
      return (
        <p>
          <b>
            <i>{children}</i>
          </b>
        </p>
      );
    };

    const render = createRenderer({});
    expect(
      render(
        <markdown>
          <Component>
            <i>Component</i>
          </Component>
          <Component>Component</Component>
          <Component>Component2</Component>
          <Component>Component3</Component>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "****Component****

      ***Component***

      ***Component2***

      ***Component3***
      "
    `);
  });
});

test("test", () => {
  const render = createRenderer({});
  expect(render(testElement)).toMatchInlineSnapshot(`
    "# Hello, world!

    This is a test.

    ## Subheading

    This is a test.

    ### Subsubheading

    This is a test.

    あああ

    > Blockquote
    "
  `);
});

test("test", () => {
  expect(renderToMdast(testElement)).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "type": "text",
              "value": "Hello, world!",
            },
          ],
          "depth": 1,
          "type": "heading",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "This is a test.",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "Subheading",
            },
          ],
          "depth": 2,
          "type": "heading",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "This is a test.",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "Subsubheading",
            },
          ],
          "depth": 3,
          "type": "heading",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "This is a ",
            },
            {
              "type": "text",
              "value": "test",
            },
            {
              "type": "text",
              "value": ".",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "あああ",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "Blockquote",
            },
          ],
          "type": "blockquote",
        },
      ],
      "type": "root",
    }
  `);
});
