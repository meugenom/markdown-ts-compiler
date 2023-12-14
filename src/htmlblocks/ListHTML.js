"use strict";
exports.__esModule = true;
exports.ListHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
var ListHTML = /** @class */ (function () {
    function ListHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    ListHTML.prototype.createListItem = function (item) {
        if (!item)
            return '';
        if (item.includes("[]")) {
            return "<li class=\"list-none ml-5\">\n                <input class=\"form-check-input appearance-none h-4 w-4 border-solid border-gray-200 border-solid border-2 rounded-sm disabled:bg-white disabled:border-blue-600 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\t\t\t\t\t\n                <label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckDisabled\">".concat(item.replace("[]", ""), "</label>\n            </li>");
        }
        else if (item.includes("[x]")) {
            return "<li class=\"list-none ml-5\">\n                <input class=\"form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n                <label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckCheckedDisabled\">".concat(item.replace("[x]", ""), "</label>\n            </li>");
        }
        else if (item.includes("-")) {
            return "<li class=\"list-none ml-5 text-sky-700\">".concat(item, "</li>");
        }
        else {
            return "<li class=\"list-none ml-5\">".concat(item, "</li>");
        }
    };
    ListHTML.prototype.render = function () {
        var _a;
        var value = this.token.value;
        if (!value)
            return;
        var list = value.split("\n");
        var listBlockNode = this.DomUtilites.createElement("div");
        var title = list.shift();
        if (list && list.length > 0) {
            var listBlock = "<div class=\"mt-2\">\n                <p>".concat(title, "</p>\n                <div class=\"form-check\">").concat(list.map(this.createListItem).join(""), "</div>\n            </div>");
            listBlockNode.innerHTML = listBlock;
        }
        var app = this.htmlOutput;
        (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(listBlockNode);
    };
    return ListHTML;
}());
exports.ListHTML = ListHTML;
