'use strict';
exports.__esModule = true;
exports.CodeBlockHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
require("../static/styles/prism.css");
// import prismjs
var Prism = require("prismjs");
var CodeBlockHTML = /** @class */ (function () {
    function CodeBlockHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    CodeBlockHTML.prototype.render = function () {
        var _a;
        var codeBlock = "\n\t\t\t<code class=\"language-".concat(this.token.language, "\">\n\t\t \t\t").concat(this.token.code, "\n\t\t\t</code>");
        var CodeBlockNode = this.DomUtilites.createElement("pre");
        CodeBlockNode.className = "language-".concat(this.token.language, "\"");
        Prism.highlightAll(codeBlock);
        CodeBlockNode.innerHTML = codeBlock;
        var app = this.htmlOutput;
        var elemChildren = app === null || app === void 0 ? void 0 : app.children;
        if (elemChildren) {
            if (elemChildren.length > 0) {
                (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(CodeBlockNode);
            }
            else {
                app.appendChild(CodeBlockNode);
            }
        }
    };
    return CodeBlockHTML;
}());
exports.CodeBlockHTML = CodeBlockHTML;
