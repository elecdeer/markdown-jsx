import { expect, test } from "vitest";

import { fromMarkdown, Transform } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";

test("jsx", () => {
  expect(
    <markdown>
      <h1>Hello, world!</h1>
      <p>This is a test.</p>
      <h2>Subheading</h2>
      <p>This is a test.</p>
      <h3>Subsubheading</h3>
      <p>This is a test.</p>
      ああああ
      <a href="https://example.com">Example</a>
      <i>Italic</i>
      <b>Bold</b>
      <s>Strikethrough</s>
      <code>Code</code>
      <pre>Pre</pre>
      <ul>
        <li>Unordered list</li>
        <li>Unordered list</li>
      </ul>
      <ol>
        <li>Ordered list</li>
        <li>Ordered list</li>
      </ol>
      <blockquote>Blockquote</blockquote>
    </markdown>
  ).toMatchInlineSnapshot(`
    {
      "$$jsxmarkdown": {
        "props": {
          "__isStaticChildren": true,
          "__source": {
            "columnNumber": 5,
            "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
            "lineNumber": 8,
          },
          "children": [
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 9,
                  },
                  "children": "Hello, world!",
                },
                "type": "h1",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 10,
                  },
                  "children": "This is a test.",
                },
                "type": "p",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 11,
                  },
                  "children": "Subheading",
                },
                "type": "h2",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 12,
                  },
                  "children": "This is a test.",
                },
                "type": "p",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 13,
                  },
                  "children": "Subsubheading",
                },
                "type": "h3",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 14,
                  },
                  "children": "This is a test.",
                },
                "type": "p",
              },
            },
            "ああああ",
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 16,
                  },
                  "children": "Example",
                  "href": "https://example.com",
                },
                "type": "a",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 17,
                  },
                  "children": "Italic",
                },
                "type": "i",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 18,
                  },
                  "children": "Bold",
                },
                "type": "b",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 19,
                  },
                  "children": "Strikethrough",
                },
                "type": "s",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 20,
                  },
                  "children": "Code",
                },
                "type": "code",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 21,
                  },
                  "children": "Pre",
                },
                "type": "pre",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 22,
                  },
                  "children": {
                    "$$jsxmarkdown": {
                      "props": {
                        "__isStaticChildren": false,
                        "__source": {
                          "columnNumber": 9,
                          "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                          "lineNumber": 23,
                        },
                        "children": "Unordered list",
                      },
                      "type": "li",
                    },
                  },
                },
                "type": "ul",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 25,
                  },
                  "children": {
                    "$$jsxmarkdown": {
                      "props": {
                        "__isStaticChildren": false,
                        "__source": {
                          "columnNumber": 9,
                          "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                          "lineNumber": 26,
                        },
                        "children": "Ordered list",
                      },
                      "type": "li",
                    },
                  },
                },
                "type": "ol",
              },
            },
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 28,
                  },
                  "children": "Blockquote",
                },
                "type": "blockquote",
              },
            },
          ],
        },
        "type": "markdown",
      },
    }
  `);
});

const markdown = `
# Hello, world!
This is a test.
## Subheading
This is a test.
### Subsubheading
This is a test.

ああああ[Example](https://example.com)

ppp*Italic***Bold**

\`Pre\`

\`\`\`
Pre
\`\`\`

* Unordered list

1. Ordered list


> Blockquote

`;

const removePosition = (node: any) => {
  const obj = {
    ...node,
  };

  delete obj.position;
  if (obj.children) {
    obj.children = obj.children.map((value: any) => removePosition(value));
  }

  return obj;
};

test("markdown to mdast", () => {
  expect(
    fromMarkdown(markdown, {
      mdastExtensions: [
        {
          transforms: [removePosition],
        },
      ],
    })
  ).toMatchInlineSnapshot(`
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
              "value": "This is a test.",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "ああああ",
            },
            {
              "children": [
                {
                  "type": "text",
                  "value": "Example",
                },
              ],
              "title": null,
              "type": "link",
              "url": "https://example.com",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "text",
              "value": "ppp",
            },
            {
              "children": [
                {
                  "type": "text",
                  "value": "Italic",
                },
              ],
              "type": "emphasis",
            },
            {
              "children": [
                {
                  "type": "text",
                  "value": "Bold",
                },
              ],
              "type": "strong",
            },
          ],
          "type": "paragraph",
        },
        {
          "children": [
            {
              "type": "inlineCode",
              "value": "Pre",
            },
          ],
          "type": "paragraph",
        },
        {
          "lang": null,
          "meta": null,
          "type": "code",
          "value": "Pre",
        },
        {
          "children": [
            {
              "checked": null,
              "children": [
                {
                  "children": [
                    {
                      "type": "text",
                      "value": "Unordered list",
                    },
                  ],
                  "type": "paragraph",
                },
              ],
              "spread": false,
              "type": "listItem",
            },
          ],
          "ordered": false,
          "spread": false,
          "start": null,
          "type": "list",
        },
        {
          "children": [
            {
              "checked": null,
              "children": [
                {
                  "children": [
                    {
                      "type": "text",
                      "value": "Ordered list",
                    },
                  ],
                  "type": "paragraph",
                },
              ],
              "spread": false,
              "type": "listItem",
            },
          ],
          "ordered": true,
          "spread": false,
          "start": 1,
          "type": "list",
        },
        {
          "children": [
            {
              "children": [
                {
                  "type": "text",
                  "value": "Blockquote",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "blockquote",
        },
      ],
      "type": "root",
    }
  `);
});

test("markdown to mdast to markdown", () => {
  expect(
    toMarkdown(
      fromMarkdown(markdown, {
        mdastExtensions: [
          {
            transforms: [removePosition],
          },
        ],
      })
    )
  ).toMatchInlineSnapshot(`
    "# Hello, world!

    This is a test.

    ## Subheading

    This is a test.

    ### Subsubheading

    This is a test.

    ああああ[Example](https://example.com)

    ppp*Italic***Bold**

    \`Pre\`

    \`\`\`
    Pre
    \`\`\`

    * Unordered list

    1. Ordered list

    > Blockquote
    "
  `);
});
