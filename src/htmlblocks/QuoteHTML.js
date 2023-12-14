'use strict';
exports.__esModule = true;
exports.QuoteHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
require("../static/styles/quote.css");
var QuoteHTML = /** @class */ (function () {
    function QuoteHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    QuoteHTML.prototype.render = function () {
        var _a;
        if (this.token.quote && this.token.author) {
            var quoteBlock = "\t\t\n\t\t<div>\n\t\t\t<p classname=\"mb-2\"> \n\t\t\t\t".concat(this.token.quote, "\n\t\t\t</p>\n\t\t\t<cite> ").concat(this.token.author, " </cite>\n\t\t</div>\n\t");
            var quoteBlockNode = this.DomUtilites.createElement("blockquote");
            quoteBlockNode.innerHTML = quoteBlock;
            var app = this.htmlOutput;
            var elemChildren = app === null || app === void 0 ? void 0 : app.children;
            if (elemChildren) {
                if (elemChildren.length > 0) {
                    (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(quoteBlockNode);
                }
                else {
                    app.appendChild(quoteBlockNode);
                }
            }
        }
    };
    return QuoteHTML;
}());
exports.QuoteHTML = QuoteHTML;
