'use strict';
exports.__esModule = true;
exports.DomUtilites = void 0;
/**
 * Returns functions to work with dom elements in document
 */
var DomUtilites = /** @class */ (function () {
    function DomUtilites() {
    }
    DomUtilites.prototype.getLastNode = function () {
        var lastChild = this.getRoot();
        return lastChild.lastChild;
    };
    DomUtilites.prototype.getLastNodeName = function () {
        var lastChild = this.getRoot();
        return lastChild.lastChild.nodeName;
    };
    DomUtilites.prototype.getRoot = function () {
        return document.querySelector('article');
    };
    DomUtilites.prototype.createElement = function (element) {
        return document.createElement(element);
    };
    return DomUtilites;
}());
exports.DomUtilites = DomUtilites;
