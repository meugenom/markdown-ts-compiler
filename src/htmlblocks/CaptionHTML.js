'use strict';
exports.__esModule = true;
exports.CaptionHTML = void 0;
var DomUtilites_1 = require("./DomUtilites");
var CaptionHTML = /** @class */ (function () {
    function CaptionHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    CaptionHTML.prototype.render = function () {
        var tagsBlock = "";
        this.token.children[0].tags.toString().split(" ").map(function (tag) {
            if (tag.length > 0) {
                tagsBlock = tagsBlock +
                    '<a href="#/tags/' + tag + '" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400  hover:bg-orange-500 uppercase last:mr-0 mr-1">' +
                    tag +
                    "</a>";
            }
        });
        var categoriesBlock = "";
        if (this.token.children[0].categories.length > 0) {
            categoriesBlock =
                '<a class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-400  hover:bg-gray-500 uppercase last:mr-0 mr-1">' +
                    this.token.children[0].categories +
                    "</a>";
        }
        var CaptionBlock = "\t\n\t\t\t\t  <img src= ".concat(this.token.children[0].thumbnail, " class=\"float-left p-8\"/>\n                        <h3 class=\"text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600\">\n\t\t\t\t\t\t\t").concat(this.token.children[0].title.slice(2, this.token.children[0].title.length - 1), "</h3>\n\t\t\t\t\t\t<time class=\"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1\">\n                            ").concat(this.token.children[0].date, "\n                        </time> \n                        <div class=\"tag-container py-1\">\n\t\t\t\t\t\t\t").concat(tagsBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"categories-container py-1\">\n\t\t\t\t\t\t\t").concat(categoriesBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t");
        //add caption to htmlOutput
        var captionNode = this.DomUtilites.createElement('p');
        captionNode.innerHTML = CaptionBlock;
        this.htmlOutput.appendChild(captionNode);
    };
    return CaptionHTML;
}());
exports.CaptionHTML = CaptionHTML;
