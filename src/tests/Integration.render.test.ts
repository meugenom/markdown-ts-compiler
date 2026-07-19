'use strict';

// 1. Mocking Shiki core modules to prevent Jest CommonJS/ESM compatibility crashes
jest.mock('shiki/core', () => ({
  createHighlighterCore: jest.fn().mockResolvedValue({
    codeToHtml: (code: string, options: any) => 
      `<pre class="shiki leading-6 p-4 text-[13px] overflow-x-auto !bg-transparent"><code>${code}</code></pre>`
  })
}), { virtual: true });

jest.mock('@shikijs/engine-oniguruma', () => ({
  createOnigurumaEngine: jest.fn().mockResolvedValue({})
}), { virtual: true });

import { convertMDtoHTML } from "../index";

describe('Markdown Compiler Integration Test', () => {

    // Helper to compress spaces for reliable substring matching across complex blocks
    const normalizeHTML = (html: string): string => 
        html.replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();

    const sampleArticleMarkdown = `---
date: 2021-08-30
title: 'How to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: how-to-write-text
tags: instruction texter writer
cluster: how-to-write-text
order: 0
---

## Formatting syntax

> This is a small guide. "How to write _markdown text_ and get _HTML document_ out". See [[code on my Github:pink]]: [markable parser](https://github.com/meugenom/markable-to-html)

How to use: write caption block like the example below:

\\\\*
---
date: 2021-08-30
title: 'Instruction to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: instruction-to-write-text
categories: instruction writer texter
tags: instruction texter writer
cluster: how-to-write-text
order: 0
---
\\\\*

## Headings

How to use:

\\\\*
# The h1 _heading_
## The h2 [[heading:green]]
### The h3 heading $a^2 + b^2 = c^2$
#### The h4 [[heading:yellow]]
##### The h5 [[heading::pink]]
\\\\*

# The h1 _heading_
## The h2 [[heading:green]]
### The h3 heading $a^2 + b^2 = c^2$
#### The h4 [[heading:yellow]]
##### The h5 [[heading::pink]]

## Styling bold text

How to use: This word is \\\\* **strong** and **unknown for me** \\\\*
in out: This word is **strong** and **unknown for me**.

## Formulas Inline

\\\\*
Pythagoras Theorem $a^2 + b^2 = c^2$ in the text
\\\\*

Pythagoras Theorem $a^2 + b^2 = c^2$ in the text


## Formulas in the Block

\\\\*
$$
\\\\int_{-\\\\infty}^{\\\\infty} e^{-x^2} dx = \\\\sqrt{\\\\pi}\\\\quad \\\\text{(1.0)}
$$
\\\\*

$$
\\\\int_{-\\\\infty}^{\\\\infty} e^{-x^2} dx = \\\\sqrt{\\\\pi}\\\\quad \\\\text{(1.0)}
$$


## Code Block:

\\\\*       
\`\`\`javascript
    let getMin = async (min)=> {
        return \`
            minimal value is \${min}
        \`
    }
\`\`\`
\\\\* 

\`\`\`javascript
    let getMin = async (min)=> {
        return \`
            minimal value is \${min}
            \`
    }
\`\`\`

## Code In Code Block

\\\\*
    \`\`\`\`bash
        \`\`\`javascript
            let getMin = async (min)=> {
                return \`
                    minimal value is \${min}
                    \`
            }
        \`\`\`
    \`\`\`\`
\\\\*


\`\`\`\`bash
    \`\`\`javascript
        let getMin = async (min)=> {
            return \`
                minimal value is \${min}
                \`
        }
    \`\`\`
\`\`\`\`

## Code Inline

\\\\*
    \`test is a one of more other options\`
\\\\* 

in out:
\`test is a one of more other options\`

## Lists

\\\\*
    List 1 :
      - the formula $a^2 + b^2 = c^2$
      - the \`code inline\`
      - _the underdashed text_

    List 2 :
      [] the formula $a^2 + b^2 = c^2$
      [] the \`code inline\`
      [] [[the underdashed text:yellow]]

    List  simple 3:
      [x] the formula $a^2 + b^2 = c^2$
      [x] the \`code inline\`
      [x] [[the underdashed text:pink]]

    List 4 with mixed attributes:
       - the formula $a^2 + b^2 = c^2$
      [] the the \`code inline\`
      [x] [[the underdashed text:purple]]

\\\\*

in out:

List 1:
    - the formula $a^2 + b^2 = c^2$
    - the \`code inline\`
    - _the underdashed text_

List 2:
    [] the formula $a^2 + b^2 = c^2$
    [] the \`code inline\`
    [] [[the underdashed text:yellow]]

List 3:
    [x] the formula $a^2 + b^2 = c^2$
    [x] the \`code inline\`
    [x] [[the underdashed text:pink]]

List 4 with mixed attributes:
    - the formula $a^2 + b^2 = c^2$
    [] the \`code inline\`
    [x] [[the underdashed text:purple]]


## Table

\\\\*
| Name | **Age** | $a^2 + b^2 = c^2$ | [[Town:yellow]] | $a^2 + b^2 = c^2$ |
|---|---|---|---|---|
| Bob | 17 | BMW | Baku | Fish |
| John | _52_ | **Fiat** | $a^2 + b^2 = c^2$ | Dog |
| **Lisa** | 32 | _Toyota_ | Frankfurt | [[Snake:pink]] |
| Eugen | _45_ | Mazda | **Dresden** | $a^2 + b^2 = c^2$ | 
\\\\*


| Name | **Age** | $a^2 + b^2 = c^2$ | [[Town:yellow]] | $a^2 + b^2 = c^2$ |
|---|---|---|---|---|
| Bob | 17 | BMW | Baku | Fish |
| John | _52_ | **Fiat** | $a^2 + b^2 = c^2$ | Dog |
| **Lisa** | 32 | _Toyota_ | Frankfurt | [[Snake:pink]] |
| Eugen | _45_ | Mazda | **Dresden** | $a^2 + b^2 = c^2$ |


## Quoting text

\\\\*
    > This is a
    > quoting text
\\\\* 

in out:

> This is a
> quoting text

## Links

You can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:

\\\\*
    This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript)  and it's an example.
\\\\* 

in out:

This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript) and it's an example.


## Simple Underline decoration

\\\\* _underdash_ \\\\*

in out:

_underdash_

## Color Underline decoration

\\\\*
    [[Blue:blue]] color
    [[Gray:gray]] color
    [[Red:red]] color
    [[Green:green]] color
    [[Yellow:yellow]] color
    [[Indigo:indigo]] color 
    [[Purple:purple]] color
    [[Pink:pink]] color
\\\\*

in out:

[[Lorem ipsum:green]] [[Lorem ipsum:indigo]] [[dolor:red]] [[sit:purple]] [[amet:pink]] [[consectetur:yellow]] [[adipisicing:blue]] [[elit@test:pink]]

## Color Badges

\\\\*
    [[Blue::blue color]]
    [[Gray::gray color]]
    [[Red::red color]]
    [[Green::green color]]
    [[Yellow::yellow color]]
    [[Indigo::indigo color]]
    [[Purple::purple color]]
    [[Pink::pink color]]
\\\\* 

in out:

[[Lorem ipsum::green]] [[Lorem ipsum::indigo]] [[dolor::red]] [[sit::purple]] [[amet::pink]] [[consectetur::yellow]] [[adipisicing::blue]] [[elit@test:pink]]

## Ignoring Markdown formatting

You can ignore (or escape) Markdown formatting by wrapping a block with a backslash-asterisk on its own line before and after the content.

in out:

\\\\* this **all** text is ### unmarkable \\\\*

## Images

\\\\* ![Github_image](./images/github.png) \\\\*

in out:

This is an 
![Github image](./images/github.png)
`;

   it('should successfully compile the massive mixed markdown article into valid styled HTML string without crashing', async () => {
        
        const htmlResult = await convertMDtoHTML(sampleArticleMarkdown);
        const normalized = normalizeHTML(htmlResult);

        // 1. Testing block copilation
        expect(normalized).toContain('How to Write Text</h3>'); 
        expect(normalized).toContain('src="thumbnails/writing.png"');

        // 2. check headers compilation and generation ID's
        expect(normalized).toContain('<h2 id="formatting-syntax"');
        expect(normalized).toContain('<h1 id="the-h1-heading"');

        // 3. Check Codeblock's structure
        expect(normalized).toContain('class="md-code-block-outer"'); 
        expect(normalized).toContain('md-code-block-copy');          
        expect(normalized).toContain('javascript');

        // 4. Check KaTeX (blocks and inline)
        expect(normalized).toContain('class="katex"');
        expect(normalized).toContain('class="katex-display"');

        // 5. Check tables and cells
        expect(normalized).toContain('<table');
        expect(normalized).toContain('Dresden </strong>');

        // 6. Check color modificators badges and colortexts
        expect(normalized).toContain('md-color-text-green'); 
        expect(normalized).toContain('md-badge-blue');       

        // 7. Check clean path for standart images
        expect(normalized).toContain('src="images/github.png"');

        // 8. Check quote structure
        expect(normalized).toContain('md-quote-p'); 
        expect(normalized).toContain('quoting text');
    });
});