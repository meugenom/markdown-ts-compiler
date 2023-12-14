'use strict';
exports.__esModule = true;
exports.HeaderHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
var HeaderHTML = /** @class */ (function () {
    function HeaderHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    HeaderHTML.prototype.render = function () {
        var _a;
        var HeaderNode = this.DomUtilites.createElement('h' + this.token.dept);
        HeaderNode.className = "text-" + this.token.dept + "xl mt-0 mb-2 text-gray-800 pr-10 pt-10 no-inherit-font-size";
        if (this.token.children[0]) {
            HeaderNode.innerHTML = this.token.children[0].value;
            var app = this.htmlOutput;
            var elemChildren = app === null || app === void 0 ? void 0 : app.children;
            if (elemChildren) {
                if (elemChildren.length > 0) {
                    (_a = app === null || app === void 0 ? void 0 : app.lastElementChild) === null || _a === void 0 ? void 0 : _a.appendChild(HeaderNode);
                }
                else {
                    app.appendChild(HeaderNode);
                }
            }
        }
    };
    return HeaderHTML;
}());
exports.HeaderHTML = HeaderHTML;
