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
![Version](https://img.shields.io/badge/version-0.9.7-blue.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

An isomorphic, high-performance Markdown compiler built with TypeScript and Tailwind CSS styles.
It operates entirely on clean strings without any DOM dependencies, making it universally compatible with Node.js, modern browsers, and edge environments.

[LIVE DEMO](https://meugenom.github.io/markdown-ts-compiler/)

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Key Features](#2-key-features)
3. [Installation](#3-installation)
4. [API Reference](#4-api-reference)
5. [Styling & Customization](#5-styling--customization)
6. [Development & Contribution](#6-development--contribution)
7. [Dark Mode Support](#7-dark-mode-support)
8. [Documentation & Architecture](#8-documentation--architecture)
9. [Autor & License](#9-author--license)

---

## 1. Quick Start

1.Install the package:

```bash
  # Using npm
  npm install markdown-tailwind-css-compiler

  # Using yarn
  yarn add markdown-tailwind-css-compiler
```

2.Import dependencies
You need to import the compiler's CSS and KaTeX for math rendering.

```javascript
  import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';
  import 'markdown-tailwind-css-compiler/dist/main.css'; // Semantic Tailwind styles
  import 'katex/dist/katex.min.css'; // Math formulas

```

3.Compile Markdown

```javascript
  const markdownText = `
  # Hello World
  This is a demo with \`inline code\` and $E=mc^2$.
  `;

  async function render() {
      const html = await convertMDtoHTML(markdownText);
      document.getElementById('app').innerHTML = html;
  }
  
  render();
```

## 2. Key Features

- **Pure Semantic HTML:** Outputs clean, Tailwind-ready classes (.md-paragraph, .md-heading, etc.) without hardcoded styles.
- **No DOM Dependency:** Runs perfectly on the server (Node.js), in the browser, or inside Edge Workers.
- **Rich Content Support:**
  - **KaTeX:** Full support for inline and block mathematical formulas.
  - **Shiki:** High-performance syntax highlighting for code blocks (Light/Dark mode aware).
- **Two-Pass Parsing:** Robust Tokenizer separates block-level structures from inline formatting for maximum stability.
- **Zero Config:** Works out of the box with standard Markdown syntax.

---

## 3. Installation

Install the package via Yarn or npm:

```bash
yarn add markdown-tailwind-css-compiler
# or
npm install markdown-tailwind-css-compiler
```

> 💡 **Note on Development:** The core compilation engine is 100% hand-coded. AI was utilized strictly for architectural brainstorming and optimizing heavy regular expressions.

---

## 4. API Reference

The compiler provides three entry points depending on your needs:

### 1. `convertMDtoHTML` (Asynchronous)
Converts raw markdown text into a clean HTML string.
*Use this for rendering content to the DOM or saving to a file.*
```typescript
  convertMDtoHTML(text: string): Promise<string>
```

### 2. `convertMDtoAST` (Synchronous)
Parses markdown and returns the internal Abstract Syntax Tree structure.
*Use this for structural analysis, custom rendering engines, or debugging.*
```typescript
  convertMDtoAST(text: string): ASTNode
```

### 3. `convertMDtoTokens` (Synchronous)
Scans the text and returns a flat array of detected block/inline tokens.
*Use this for metadata extraction or custom token processing.*
```typescript
convertMDtoTokens(text: string): Token[]
```

---

## 5. Styling & Customization

The compiler styles are modularized. 
You can customize specific markdown blocks by adjusting their respective classes in your own CSS or Tailwind config.

| Component | Target HTML Element | Class Name |
|---|---|---|
| **Paragraph** | `<p>` | `.md-paragraph` |
| **Headings** | `<h1>` to `<h5>` | `.md-heading`, `.md-h1` ... `.md-h5` |
| **Table** | `<table>`, `<th>`, `<td>` | `.md-table`, `.md-table-th`, `.md-table-td` |
| **Links** | `<a>` | `.md-link` |
| **Code Block** | Container, Lines, Copy button | `.md-code-block-container`, `.md-code-block-lines`, `.md-code-block-copy` |

**Example Customization (Tailwind):**

```css
.md-link {
  @apply text-indigo-600 hover:text-indigo-800 transition-colors duration-150;
}
.md-table-th {
  @apply bg-slate-50 font-bold text-left;
}
```

---

## 6. Development & Contribution

If you want to clone the repository and hack on the compiler locally:

```bash
git clone https://github.com/meugenom/markdown-ts-compiler.git
cd markdown-ts-compiler
yarn install
```

1.Run the local development server (Webpack Dev Server):

```bash
 yarn start
```

2.Build the project:

```bash
yarn build
```

This triggers a dual-target build script:

- `/dist` — Houses the pure production JS modules and TypeScript type definitions (.d.ts) meant for npm distribution.
- `/dist-demo` — Contains the standalone compiled HTML/JS bundle for hosting the web demonstration site.

3.Run Tests:

```bash
yarn test
```

Full test coverage for parsers and renderers is available in 'src/tests/'.

---

## 7. Dark Mode Support

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

---

## 8. Documentation & Architecture

For a deep dive into the internal mechanics, parsing logic, and rendering pipeline, please see the dedicated architecture documentation:
[Core Architecture Documentation](./docs/ARCHITECTURE.md) — Detailed explanation of the Tokenizer, Renderer, and Token Types.

---

## 9. Author & License

[meugenom](https://meugenom.com)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
