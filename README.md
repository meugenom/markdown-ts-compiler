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
![Version](https://img.shields.io/badge/version-0.6.4-blue.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

An isomorphic, high-performance Markdown compiler built with TypeScript and Tailwind CSS styles. It operates entirely on clean strings without any DOM dependencies, making it universally compatible with Node.js, modern browsers, and edge environments.

[LIVE DEMO](https://meugenom.github.io/markdown-ts-compiler/)

---

## Installation

Install the package into your project via Yarn or npm:

```bash
yarn add markdown-tailwind-css-compiler
# or
npm install markdown-tailwind-css-compiler
```

## IMPORTANT!

**The codebase for the Project is entirely hand-coded.**
Every line of code in the project was crafted by  a human developer.
NO AI-generated Code was used in the development  of this project.
AI was strictly utilized only for architectural brainstorming and refining complex regular expressions.

## How to Use It in Your Project
1. Basic HTML Compilation (Asynchronous)
Since the compiler uses Shiki for syntax highlighting, the HTML generation is asynchronous.

```typescript
import 'markdown-tailwind-css-compiler/src/static/styles/list.css';
import 'markdown-tailwind-css-compiler/src/static/styles/table.css';
import 'markdown-tailwind-css-compiler/src/static/styles/style.css';
import 'katex/dist/katex.min.css';

import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';


const markdownText = `
# My Article
This is an inline code \`const a = 1;\` and a formula: $E = mc^2$

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

2. Working with AST and Tokens (Synchronous)
If you only need to parse the structure without rendering, these methods run completely synchronously:

```typescript
import { convertMDtoAST, convertMDtoTokens } from 'markdown-tailwind-css-compiler';

const markdown = "# Hello";

// Get the Abstract Syntax Tree (AST)
const ast = convertMDtoAST(markdown);

// Get a flat array of processed tokens
const tokens = convertMDtoTokens(markdown);
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

### Author:

[meugenom](https://meugenom.com)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
