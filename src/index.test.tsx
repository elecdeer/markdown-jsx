import { expect, test } from "vitest";

test("test", () => {
  expect(
    <markdown>
      <h1>Hello, world!</h1>
      <p>This is a test.</p>
    </markdown>
  ).toMatchInlineSnapshot(`
    {
      "$$jsxmarkdown": {
        "props": {
          "__isStaticChildren": true,
          "__source": {
            "columnNumber": 5,
            "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
            "lineNumber": 5,
          },
          "children": [
            {
              "$$jsxmarkdown": {
                "props": {
                  "__isStaticChildren": false,
                  "__source": {
                    "columnNumber": 7,
                    "fileName": "/Users/elecdeer/Dev/etude/markdown-jsx/src/index.test.tsx",
                    "lineNumber": 6,
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
                    "lineNumber": 7,
                  },
                  "children": "This is a test.",
                },
                "type": "p",
              },
            },
          ],
        },
        "type": "markdown",
      },
    }
  `);
});
