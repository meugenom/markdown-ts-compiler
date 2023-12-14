"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var Types_1 = require("./Types");
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = [];
        this.tokens = tokens;
        this.ast = {
            type: "Document",
            children: []
        };
        this.init();
    }
    Parser.prototype.init = function () {
        var token_number;
        token_number = 0;
        var isParagraph;
        isParagraph = false;
        var children = this.ast.children;
        while (token_number < this.tokens.length) {
            var token = this.tokens[token_number];
            //console.log(token)
            // Caption
            if (token.type === Types_1.TokenType.CAPTION) {
                var captionElement = {};
                captionElement.type = Types_1.TokenType.CAPTION;
                captionElement.row = token.row;
                captionElement.children = [
                    {
                        type: "Caption",
                        date: token.date,
                        title: token.title,
                        template: token.template,
                        thumbnail: token.thumbnail,
                        slug: token.slug,
                        categories: token.categories,
                        tags: token.tags
                    }
                ];
                children.push(captionElement);
            }
            // # dept=1
            if (token.type === Types_1.TokenType.HEADING_FIRST) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 1;
                headElement.row = "#" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value
                    }
                ];
                children.push(headElement);
            }
            // ## dept = 2
            if (token.type === Types_1.TokenType.HEADING_SECOND) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 2;
                headElement.row = "##" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value
                    }
                ];
                children.push(headElement);
            }
            // ### dept = 3
            if (token.type === Types_1.TokenType.HEADING_THIRD) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 3;
                headElement.row = "###" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value
                    }
                ];
                children.push(headElement);
            }
            // #### dept = 4
            if (token.type === Types_1.TokenType.HEADING_FORTH) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 4;
                headElement.row = "####" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value
                    }
                ];
                children.push(headElement);
            }
            // ##### dept = 5
            if (token.type === Types_1.TokenType.HEADING_FIFTH) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 5;
                headElement.row = "#####" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value
                    }
                ];
                children.push(headElement);
            }
            //CodeInCode
            if (token.type == Types_1.TokenType.CODE_IN_CODE) {
                var codeInCodeElement = {};
                codeInCodeElement.type = Types_1.TokenType.CODE_IN_CODE;
                codeInCodeElement.row = "```" + token.language + "\n" + token.code + "\n```";
                codeInCodeElement.code = token.code;
                codeInCodeElement.language = token.language;
                children.push(codeInCodeElement);
            }
            //CodeBlock
            if (token.type == Types_1.TokenType.CODE_BLOCK) {
                var codeBlockElement = {};
                codeBlockElement.type = Types_1.TokenType.CODE_BLOCK;
                codeBlockElement.row = "```" + token.language + "\n" + token.code + "\n```";
                codeBlockElement.code = token.code;
                codeBlockElement.language = token.language;
                children.push(codeBlockElement);
            }
            //Quote
            if (token.type == Types_1.TokenType.QUOTE) {
                var quoteElement = {};
                quoteElement.type = Types_1.TokenType.QUOTE;
                quoteElement.row = ">" + token.quote + "\n> <cite> - " + token.author + "</cite>";
                quoteElement.quote = token.quote;
                quoteElement.author = token.author;
                children.push(quoteElement);
            }
            //List
            if (token.type == Types_1.TokenType.LIST) {
                var listElement = {};
                listElement.type = Types_1.TokenType.LIST;
                listElement.attribute = token.attribute;
                listElement.row = token.attribute + " " + token.value;
                listElement.value = token.value;
                children.push(listElement);
            }
            //Table
            if (token.type == Types_1.TokenType.TABLE) {
                var tableElement = {};
                tableElement.type = Types_1.TokenType.TABLE;
                tableElement.row = token.row;
                tableElement.children = token.children;
                children.push(tableElement);
            }
            //Start all that in the paragraph can use
            if (token.type == Types_1.TokenType.PARAGRAPH_START) {
                var paragraphStartElement = {};
                paragraphStartElement.type = Types_1.TokenType.PARAGRAPH;
                paragraphStartElement.children = [];
                paragraphStartElement.row = "";
                children.push(paragraphStartElement);
                isParagraph = true;
            }
            if (token.type == Types_1.TokenType.PARAGRAPH_END) {
                isParagraph = false;
            }
            //Link
            if (token.type == Types_1.TokenType.LINK) {
                var linkElement = {};
                linkElement.type = Types_1.TokenType.LINK;
                linkElement.name = token.name;
                linkElement.url = token.url;
                linkElement.row = "[" + token.name + "](" + token.url + ")";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(linkElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.name + "](" + token.url + ")";
                }
                else {
                    children.push(linkElement);
                }
            }
            //Image
            if (token.type == "Image" && isParagraph == true) {
                var imageToken = {};
                imageToken.type = Types_1.TokenType.IMAGE;
                imageToken.alt = token.alt;
                imageToken.url = token.url;
                imageToken.row = "![" + token.alt + "](" + token.url + ")";
                if (isParagraph == true) {
                    children[children.length - 1].children.push(imageToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.alt + "](" + token.url + ")";
                }
                else {
                    children.push(imageToken);
                }
            }
            // Text
            if (token.type == Types_1.TokenType.TEXT) {
                var textToken = {};
                textToken.type = Types_1.TokenType.TEXT;
                textToken.value = token.value;
                textToken.row = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(textToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(textToken);
                }
            }
            // Unmarkable
            if (token.type == Types_1.TokenType.UNMARKABLE) {
                //console.log(token)
                var unmarkableTextToken = {};
                unmarkableTextToken.type = Types_1.TokenType.UNMARKABLE;
                unmarkableTextToken.value = token.value;
                unmarkableTextToken.row = "\\" + token.value + "\\";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(unmarkableTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(unmarkableTextToken);
                }
            }
            // Strong
            if (token.type == Types_1.TokenType.STRONG) {
                var strongTextToken = {};
                strongTextToken.type = Types_1.TokenType.STRONG;
                strongTextToken.value = token.value;
                strongTextToken.row = "**" + token.value + "**";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(strongTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(strongTextToken);
                }
            }
            // Color text
            if (token.type == "Color") {
                var colorTextToken = {};
                colorTextToken.type = Types_1.TokenType.COLOR;
                colorTextToken.color = token.color;
                colorTextToken.value = token.value;
                colorTextToken.row = token.value + "." + token.color;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(colorTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value + "." + token.color;
                }
                else {
                    children.push(colorTextToken);
                }
            }
            // Color badge
            if (token.type == "Badge") {
                var badgeToken = {};
                badgeToken.type = Types_1.TokenType.BADGE;
                badgeToken.color = token.color;
                badgeToken.value = token.value;
                badgeToken.row = token.value + "@" + token.color;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(badgeToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value + "@" + token.color;
                }
                else {
                    children.push(badgeToken);
                }
            }
            // InlineCode
            if (token.type == Types_1.TokenType.CODE_INLINE) {
                //console.log(token)
                var inlineCodeElement = {};
                inlineCodeElement.type = Types_1.TokenType.CODE_INLINE;
                inlineCodeElement.value = token.value;
                inlineCodeElement.row = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(inlineCodeElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(inlineCodeElement);
                }
            }
            // UnderLine
            if (token.type == Types_1.TokenType.UNDER_LINE) {
                var underLineElement = {};
                underLineElement.type = Types_1.TokenType.UNDER_LINE;
                underLineElement.value = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(underLineElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(underLineElement);
                }
            }
            //console.log("token number", token_number)
            //console.log(children)
            token_number++;
        }
    };
    return Parser;
}());
exports.Parser = Parser;
