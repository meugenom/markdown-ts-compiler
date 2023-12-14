/**
 * Author: meugenom.com
 * Refactored: 14.12.2023
 * Entry point of the application
 *
 * markdown compiler ASCII art:
 *                          	_       _
 *         _ __ ___  ‚ __ _ _ __| | ____| | _____      ___ __
 *        | '_ ` _ \ / _` | '__| |/ / _` |/ _ \ \ /\ / / '_ \
 *        | | | | | | (_| | |  |   < (_| | (_) \ V  V /| | | |
 *        |_| |_| |_|\__,_|_|  |_|\_\__,_|\___/ \_/\_/ |_| |_|
 *
 *                                          _ _
 *                 ___ ___  _ __ ___  _ __ (_) | ___ _ __
 *                / __/ _ \| '_ ` _ \| '_ \| | |/ _ \ '__|
 *               | (_| (_) | | | | | | |_) | | |  __/ |
 *                \___\___/|_| |_| |_| .__/|_|_|\___|_|
 *                                   |_|
 */

import { Tokenizer } from "./Tokenizer";
import { Parser } from "./Parser";
import { View } from "./View";
import "./static/styles/style.css";
import Utils from "./Utils";

import example from 'raw-loader!./content/articles/how-to-write-text.md';


//create a DOM with a div with id = app
const htmlOutput = document.createElement('div');
htmlOutput.id = "app";

// API to convert markdown to HTML
function convertMDtoHTML(text: any){
    let tokenizer = new Tokenizer(text);
    const parser = new Parser(tokenizer.tokens);
    const output : any = new View(parser.ast, htmlOutput).init();    
    return output;
}


//API to convert markdown to AST
function convertMDtoAST(text: string) {
    let tokenizer = new Tokenizer(text);
    const parser = new Parser(tokenizer.tokens);
    return parser.ast;
}

//API to convert markdown to tokens
function convertMDtoTokens(text: string) {
    let tokenizer = new Tokenizer(text);
    return tokenizer.tokens;
}

export default {
    convertMDtoHTML,
    convertMDtoAST,
    convertMDtoTokens
  };
  

//show example
function showExample(){
    // render the html node to the DOM from existed index.html
    if(document.getElementById('content') != null && example != undefined){    
        document.getElementById('content')?.appendChild(convertMDtoHTML(example));
    }
}


//run the example
showExample();


// lazy load images
const images = document.querySelectorAll('.lazy');
images.forEach((img) => {
    Utils.lazyLoadImage(img as HTMLImageElement);
});
