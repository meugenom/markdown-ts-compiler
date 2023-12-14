"use strict";
exports.__esModule = true;
exports.TableHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
var TableHTML = /** @class */ (function () {
    function TableHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    TableHTML.prototype.createTableHead = function (headArray) {
        var tableHead = "<thead><tr>";
        headArray.forEach(function (head) {
            tableHead += "<th class=\"bg-blue-100 border text-left px-8 py-4\">".concat(head, "</th>");
        });
        return tableHead + '</tr></thead>';
    };
    TableHTML.prototype.createTableBody = function (bodyArray) {
        var tableBody = "<tr>";
        bodyArray.forEach(function (body) {
            tableBody += "<td class=\"border px-8 py-4\">".concat(body, "</td>");
        });
        return tableBody + '</tr>';
    };
    TableHTML.prototype.render = function () {
        var _a;
        var children = this.token.children;
        var table = '';
        var tableNode = this.DomUtilites.createElement("table");
        tableNode.className = "shadow-lg bg-white mb-4";
        for (var i = 0; i < children.length; i++) {
            var rowArray = children[i].value.split("|");
            rowArray.pop();
            rowArray.shift();
            if (i == 0) {
                table += this.createTableHead(rowArray);
            }
            else {
                table += this.createTableBody(rowArray);
            }
        }
        tableNode.innerHTML = "<tbody>".concat(table, "</tbody>");
        var paragraphNode = this.DomUtilites.createElement("p");
        paragraphNode.appendChild(tableNode);
        var app = this.htmlOutput;
        (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(paragraphNode);
    };
    return TableHTML;
}());
exports.TableHTML = TableHTML;
