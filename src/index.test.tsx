import { expect, test } from "vitest";

import { fromMarkdown, Transform } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";

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
* Unordered list2
* Unordered list3

1. Ordered list
2. Ordered list2
3. Ordered list3


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
