# Library to parse markdowned text to html view:

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

You can see the example : <https://eugenemdev.github.io/markable-to-html/>
use bilded `markdown.js` in directory `/lib`.
use content from `content/posts/instruction-to-write-text.md`

## Motivation:

This script was written as a part of my website and blog, for that I write my remarkable texts

## What was used:

- JavaScript ES6
- Webpack, Babel
- SCSS
- Prism.js from [website](https://prismjs.com) 

## How to use with ES5:

Open please the directory `lib/`. 
File `markdown.js` is our library's file, which you can use in your projects.   
Create object App with the method init() if you can see the demo. 
`new App().init()`
Create object App with the method render(article: string) to use own markable text file. 
Value article is some text.md file. 
`new App().render(article)`

## How to use with ES6:
Open `index.js` on our `src/`.
Use `new App.render(article)` or rewrite your's own model to implement
in our code.

## How to build:
1. copy from git
`git clone https://github.com/eugenemdev/markable-to-html.git`
2. change dir
`cd markable-to-html`
3. install modules
`npm install --save-dev`

4.1 to start in develop's mode
`npm run start`

4.2 to build library in dir ***/lib***
`npm run build`

## Author:
- [Eugen Morozov](https://eugenmorozov.de)