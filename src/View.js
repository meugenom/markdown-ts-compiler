"use strict";
exports.__esModule = true;
exports.View = void 0;
var CaptionHTML_1 = require("./htmlblocks/CaptionHTML");
var HeaderHTML_1 = require("./htmlblocks/HeaderHTML");
var ParagraphHTML_1 = require("./htmlblocks/ParagraphHTML");
var CodeBlockHTML_1 = require("./htmlblocks/CodeBlockHTML");
var QuoteHTML_1 = require("./htmlblocks/QuoteHTML");
var ListHTML_1 = require("./htmlblocks/ListHTML");
var TableHTML_1 = require("./htmlblocks/TableHTML");
var Types_1 = require("./Types");
var View = /** @class */ (function () {
    function View(ast, htmlOutput) {
        this.ast = ast;
        this.htmlOutput = htmlOutput;
    }
    View.prototype.init = function () {
        var _this = this;
        var children = this.ast.children;
        if (children) {
            children.forEach(function (token) {
                if (token.type == Types_1.TokenType.CAPTION) {
                    if (_this.htmlOutput) {
                        var caption = new CaptionHTML_1.CaptionHTML(token, _this.htmlOutput);
                        caption.render();
                    }
                }
                if (token.type == Types_1.TokenType.HEADING) {
                    if (_this.htmlOutput) {
                        var header = new HeaderHTML_1.HeaderHTML(token, _this.htmlOutput);
                        header.render();
                    }
                }
                if (token.type == Types_1.TokenType.CODE_BLOCK || token.type == Types_1.TokenType.CODE_IN_CODE) {
                    if (_this.htmlOutput) {
                        var codeblock = new CodeBlockHTML_1.CodeBlockHTML(token, _this.htmlOutput);
                        codeblock.render();
                    }
                }
                if (token.type == Types_1.TokenType.QUOTE) {
                    if (_this.htmlOutput) {
                        var quote = new QuoteHTML_1.QuoteHTML(token, _this.htmlOutput);
                        quote.render();
                    }
                }
                if (token.type == Types_1.TokenType.LIST) {
                    if (_this.htmlOutput) {
                        var list = new ListHTML_1.ListHTML(token, _this.htmlOutput);
                        list.render();
                    }
                }
                if (token.type == Types_1.TokenType.TABLE) {
                    if (_this.htmlOutput) {
                        var table = new TableHTML_1.TableHTML(token, _this.htmlOutput);
                        table.render();
                    }
                }
                if (token.type == Types_1.TokenType.PARAGRAPH) {
                    if (_this.htmlOutput) {
                        var paragraph = new ParagraphHTML_1.ParagraphHTML(token, _this.htmlOutput);
                        _this.htmlOutput = paragraph.render();
                    }
                }
            });
        }
        return this.htmlOutput;
    };
    return View;
}());
exports.View = View;
