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

## Typescript Markdown Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Purpose:

I created this parser to serve as a compiler for my personal website, specifically for parsing Markdown text into HTML. I utilized TypeScript and Webpack in the development process, and the styling is enhanced with Tailwind CSS. You can view the **result** on my website: [Markdown TS Compiler](https://meugenom.github.io/markdown-ts-compiler/), where there's a parsed example page.

## Technologies Used:

- npm v9.7.2, node v16.14.2
- Typescript v5.3.2
- Webpack v5.4.1
- TS-Loader v9.5.1
- Tailwind CSS from [website](https://tailwindcss.com) v3.3.5
- Prism.js from [website](https://prismjs.com) for code highlighting v1.29.0

## How to use it:

1. Clone the repository:
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the compiler:
    ```bash
    npm run build
    ```
4. Open in your browser the address: http://localhost:8083
5. For testing use command:
    ```bash
    npm run test
    ```

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


You can use and modify this code as you want. Just clone it and use it.

1. The main compiler code is located in the directory "./src". You can copy it to your project and use it as library.

2. For you project please install the required dependencies:
    ```bash
    npm install --save-dev @types/prismjs css-loader html-loader postcss postcss-import postcss-loader postcss-preset-env prismjs raw-loader style-loader tailwindcss ts-loader typescript uuid
    ```

3. Please copy tailwind.config.js and postcss.config.js to your project.

### Author:

[meugenom](https://meugenom.com)

