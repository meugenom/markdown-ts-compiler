"use strict";
/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023
 */
exports.__esModule = true;
exports.Caption = void 0;
var Grammar_1 = require("./Grammar");
var Types_1 = require("./Types");
var Caption = /** @class */ (function () {
    function Caption(text) {
        this.text = text;
    }
    Caption.prototype.get = function () {
        var match = this.text.match(Grammar_1.Grammar.BLOCKS.CAPTION);
        if (!match) {
            throw new Error("Invalid caption format");
        }
        var // Ignore the first element
        row = match[1], date = match[2], title = match[3], template = match[5], thumbnail = match[7], slug = match[9], categories = match[11], tags = match[13];
        var token = {
            type: Types_1.TokenType.CAPTION,
            row: row,
            date: date,
            title: title,
            template: template,
            thumbnail: thumbnail,
            slug: slug,
            categories: categories,
            tags: tags
        };
        //remove caption from text
        this.text = this.text.replace(Grammar_1.Grammar.BLOCKS.CAPTION, "");
        return token;
    };
    return Caption;
}());
exports.Caption = Caption;
