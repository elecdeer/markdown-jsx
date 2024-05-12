import { describe, expect, test } from "vitest";
import { createRenderer, renderToMdast } from "./renderer";
import type { ChildElement, FC } from "./jsx";

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
  test("heading", async () => {
    const render = createRenderer({});
    expect(
      await render(
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

  test("paragraph", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <p>ppp</p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "ppp
      "
    `);
  });

  test("break", async () => {
    const render = createRenderer({});
    expect(
      await render(
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

  test("link", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          This is <a href="https://example.com">Link</a>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "This is [Link](https://example.com)
      "
    `);
  });

  test("Style", async () => {
    const render = createRenderer({});
    expect(
      await render(
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

  test("inlineCode", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <p>
            Call <code>{"await render()"}</code>
          </p>
          <p>
            Call <code>{"await render(`option-${i}`)"}</code>
          </p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "Call \`await render()\`

      Call \`\`await render(\`option-\${i}\`)\`\`
      "
    `);
  });

  test("codeBlock", async () => {
    const render = createRenderer({});
    expect(
      await render(
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

  test("unorderedList", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <ul>
            <li>item1</li>
            <li>
              item2
              <ul>
                <li>
                  item2-1
                  <ul>
                    <li>item2-1-1</li>
                    <li>item2-1-2</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "* item1
      * item2
        * item2-1
          * item2-1-1
          * item2-1-2
      "
    `);
  });

  test("orderedList", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <ol>
            <li>item1</li>
            <li>item2</li>
            <li>
              item3
              <ol>
                <li>item3-1</li>
                <li>
                  item3-2
                  <ol start={6}>
                    <li>item3-2-6</li>
                    <li>item3-2-7</li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "1. item1
      2. item2
      3. item3
         1. item3-1
         2. item3-2
            6. item3-2-6
            7. item3-2-7
      "
    `);
  });

  test("blockquote", async () => {
    const render = createRenderer({});
    expect(
      await render(
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

  test("FC", async () => {
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
      await render(
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

  test("async FC", async () => {
    const Component: FC<{
      children: ChildElement;
    }> = async ({ children }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return <>{children}</>;
    };

    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <p>
            <Component>
              <i>Async Component</i>
            </Component>
          </p>

          <p>
            <Component>Async Component</Component>
          </p>
          <p>
            <>
              <Component>Async Component2</Component>
            </>
          </p>
          <p>
            <Component>
              <Component>Async Component3</Component>
            </Component>
          </p>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "*Async Component*

      Async Component

      Async Component2

      Async Component3
      "
    `);
  });

  test("Fragment", async () => {
    const render = createRenderer({});
    expect(
      await render(
        <markdown>
          <>
            <p>
              {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
              pa<>ra</>1
            </p>
            <p>para2</p>
          </>
        </markdown>
      )
    ).toMatchInlineSnapshot(`
      "para1

      para2
      "
    `);
  });
});

test("test", async () => {
  const render = createRenderer({});
  expect(await render(testElement)).toMatchInlineSnapshot(`
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
