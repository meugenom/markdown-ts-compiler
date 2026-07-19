```txt
                            _       _
       _ __ ___   __ _ _ __| | ____| | _____      ___ __  
      | '_ ` _ \ / _` | '__| |/ / _` |/ _ \ \ /\ / / '_ \ 
      | | | | | | (_| | |  |   < (_| | (_) \ V  V /| | | |
      |_| |_| |_|\__,_|_|  |_|\_\__,_|\___/ \_/\_/ |_| |_|

                                      _ _       
             ___ ___  _ __ ___  _ __ (_) | ___ _ __ 
            / __/ _ \| '_ ` _ \| '_ \| | |/ _ \ '__|
           | (_| (_) | | | | | | |_) | | |  __/ |
            \___\___/|_| |_| |_| .__/|_|_|\___|_|
                               |_|               
```

# Markdown TypeScript Compiler

![Human Made](https://img.shields.io/badge/Hand--coded-100%25-orange?style=for-the-badge)
![AI-Assisted Architecture](https://img.shields.io/badge/AI--Assisted-Architecture-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.9.6-blue.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

An isomorphic, high-performance Markdown compiler built with TypeScript and Tailwind CSS styles. It operates entirely on clean strings without any DOM dependencies, making it universally compatible with Node.js, modern browsers, and edge environments.

[LIVE DEMO](https://meugenom.github.io/markdown-ts-compiler/)

---

# Key Features & Architecture

* **Pure Semantic HTML & Separation of Concerns:** The compiler logic is entirely divorced from styling hardcodes. It outputs clean HTML blocks wrapped in predictable semantic classes (`.md-paragraph`, `.md-heading`, `.md-table`, etc.)
* **Easy Customization:** Want to change padding, colors, or fonts? You don't need to rebuild the TypeScript package. Just tweak the CSS layer using standard utilities or Tailwind's `@apply`.
* **Full Math & Code Highlight Support:** Out-of-the-box integration with KaTeX for math equations and Shiki for stunning, light/dark-aware syntax highlighting.
* **No DOM Dependency:** Runs perfectly on the server (Node.js), in the browser, or inside Edge Workers.

---

## Installation

Install the package via Yarn or npm:

```bash
yarn add markdown-tailwind-css-compiler
# or
npm install markdown-tailwind-css-compiler
```

> 💡 **Note on Development:** The core compilation engine is 100% hand-coded. AI was utilized strictly for architectural brainstorming and optimizing heavy regular expressions.



## How to Use It in Your Project
1. Basic HTML Compilation (Asynchronous)
Since the compiler uses Shiki for rich code syntax highlighting, the HTML generation process is asynchronous.

```typescript
// Required as compiled pure css
import 'markdown-tailwind-css-compiler/dist/main.css';
// Required for formulas
import 'katex/dist/katex.min.css'; 

import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';

const markdownText = `
# My Article
This is inline code \`const a = 1;\` and a formula: $E = mc^2$

\`\`\`typescript
const hello = "world";
\`\`\`
`;

async function render() {
    try {
        const html = await convertMDtoHTML(markdownText);
        document.getElementById('app').innerHTML = html;        
    } catch (error) {
        console.error("Compilation failed:", error);
    }
}

render();
```

### 2. Working with AST and Tokens (Synchronous)
If you only need to analyze the structural tree or extract token data without rendering HTML, these methods run completely synchronously:

```typescript
import { convertMDtoAST, convertMDtoTokens } from 'markdown-tailwind-css-compiler';

const markdown = "# Hello World";

// Get the Abstract Syntax Tree (AST)
const ast = convertMDtoAST(markdown);

// Get a flat array of all processed tokens
const tokens = convertMDtoTokens(markdown);
```

---

## Semantic CSS Customization

The compiler styles are modularized and easily overridable[cite: 3]. You can customize specific markdown blocks by adjusting their respective classes[cite: 3]:

| Component | Target HTML Element | Class Name |
|---|---|---|
| **Paragraph** | `<p>` | `.md-paragraph` |
| **Headings** | `<h1>` to `<h5>` | `.md-heading`, `.md-h1` ... `.md-h5` |
| **Table** | `<table>`, `<th>`, `<td>` | `.md-table`, `.md-table-th`, `.md-table-td` |
| **Links** | `<a>` | `.md-link` |
| **Code Block** | Container, Lines, Copy button | `.md-code-block-container`, `.md-code-block-lines`, `.md-code-block-copy` |

Example of custom override in your local CSS:
```css
.md-link {
  @apply text-indigo-600 hover:text-indigo-800 transition-colors duration-150;
}
.md-table-th {
  @apply bg-slate-50 font-bold text-left;
}
```

## API Reference
- `convertMDtoHTML(text: string): Promise<string>`
Converts raw markdown text into a clean HTML string. Includes modern Shiki token code highlighting and KaTeX formula rendering.
- `convertMDtoAST(text: string): ASTNode`
Parses markdown and returns the internal Abstract Syntax Tree structure.
- `convertMDtoTokens(text: string): Token[]`
Scans the text and returns a flat array of detected block/inline tokens.

## Core Architecture

Two-Pass Parsing Strategy

1. Markdown Text -> AST (Abstract Syntax Tree)
- First-Pass: The engine scans the document to identify high-level structural blocks (e.g., caption block, heading, list block, code blocks, table block, quote, unmarkable block, image, formula block) and generates a token stream.
- Second-Pass: Inline parsing runs only on terminal nodes that contain raw text content (e.g., paragraph, heading, list_item, quote, unknown_text).
- Design Constraint: Inline Parsing does not decompose nodes further into atomic units. Once a token like bold or underline is matched, its content is stored as-is for performance stability.
2. AST -> HTML
- The final output is generated via an asynchronous tree-walk of the AST, translating complex structural hierarchies into valid, highly-styled Tailwind CSS semantic HTML.

## Development & Contribution

If you want to clone the repository and hack on the compiler locally:

```bash
git clone https://github.com/meugenom/markdown-ts-compiler.git
cd markdown-ts-compiler
yarn install
```

1. Run the local development server (Webpack Dev Server):

```bash
 yarn start
```

2. Build the project:

```bash
yarn build
```

This triggers a dual-target build script:
- `/dist` — Houses the pure production JS modules and TypeScript type definitions (.d.ts) meant for npm distribution.
- `/dist-demo` — Contains the standalone compiled HTML/JS bundle for hosting the web demonstration site.

3. Run Tests:

```bash
yarn test
```

## Dark Mode Support

The compiler supports seamless switching between Light and Dark themes out of the box.

To trigger the dark theme, simply toggle the `dark` class on your root `<html>` element:

```html
<!-- Light Mode -->
<html>
  ...
</html>

<!-- Dark Mode -->
<html class="dark">
  ...
</html>
```

### Author:

[meugenom](https://meugenom.com)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
