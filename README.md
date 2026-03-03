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

## Markdown Typescript Compiler

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

[DEMO](https://meugenom.github.io/markdown-ts-compiler/)

## Purpose:

This parser was served as a compiler for my personal website, specifically for parsing Markdown text into HTML. I utilized TypeScript and Webpack in the development process, and the styling is enhanced with Tailwind CSS. 
You can view the **result** on my website: [Markdown TS Compiler](https://meugenom.github.io/markdown-ts-compiler/), where there's a parsed example page.

**Important**: To display the result, the script constructs the DOM model in the browser; a virtual DOM model is not utilized. This functionality might be considered in the next version.

## Technologies Used:

- npm v10.8.2, node v20.20.0
- Typescript v5.3.2
- Webpack v5.105.3
- TS-Loader v9.5.4
- Tailwind CSS from [website](https://tailwindcss.com) v4.0.12
- Prism.js from [website](https://prismjs.com) for code highlighting v1.30.0
- Katex v.0.16.33

## How to use it:

1. Clone the repository:
2. Install the dependencies:
    ```bash
    yarn
    ```
3. Run the compiler:
    ```bash
    yarn build
    ```
4. Open in your browser the address: http://localhost:8083
5. For testing use command:
    ```bash
    yarn test
    ```

## API Reference:
 Please see entrypoint `./src/index.ts` for the API reference.
 
 **API** functions:
- _convertMDtoHTML(txt: string)_ - converts markdown text into HTML, return HTML string
- _convertMDtoTokens(txt: string)_ - converts markdown text into tokens, return array of tokens
- _convertMDtoAST(txt: string)_ - converts markdown text into AST, return Abstract Syntax Tree

## How to use it in your project:

**Directories:**
- `./src` - the main compiler code:
    - `../test` - the test code
    - `../htmlblocks` - the html blocks to parse AST into HTML
    - `../content` - the example text to parse
    - `../static` - the static files index.html, css styles
    - `../types` - integration with external libraries
    
- `/dist` - the compiled code and static files, need to run build command‚

**Files:**
- `./src/index.ts` - the entrypoint of the comiler
- `./src/Grammar.ts` - the grammar with Regexp rules
- `./src/Tokenizer.ts` - the tokenize class to make tokens from a text
- `./src/Parser.ts` - the parser class to parse tokens into AST
- `./src/View.ts` - the compiler class to compile AST into HTML



### Author:

[meugenom](https://meugenom.com)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)