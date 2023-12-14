"use strict";
/**
 * Author: meugenom.com
 * Date: 13.12.2023
 * Refactored: 19.03.2023
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
exports.__esModule = true;
var Tokenizer_1 = require("./Tokenizer");
var Parser_1 = require("./Parser");
var View_1 = require("./View");
require("./static/styles/style.css");
//import example from 'raw-loader!./content/articles/how-to-write-text.md';
//create a document with a div with id app
var htmlOutput = document.createElement('div');
htmlOutput.id = "app";
function convertMDtoHTML(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    var parser = new Parser_1.Parser(tokenizer.tokens);
    console.log(parser.ast);
    var output = new View_1.View(parser.ast, htmlOutput).init();
    console.log(output);
    return output;
}
//API to convert markdown to AST
function convertMDtoAST(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    var parser = new Parser_1.Parser(tokenizer.tokens);
    return parser.ast;
}
//API to convert markdown to tokens
function convertMDtoTokens(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    return tokenizer.tokens;
}
exports["default"] = {
    convertMDtoHTML: convertMDtoHTML,
    convertMDtoAST: convertMDtoAST,
    convertMDtoTokens: convertMDtoTokens
};
//show example
/*
function showExample(){
    // render the html node to the DOM
    if(document.getElementById('content') != null && example != undefined){
        document.getElementById('content')?.appendChild(convertMDtoHTML(example));
    }
}

//showExample();
*/ 
