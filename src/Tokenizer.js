'use strict';
exports.__esModule = true;
exports.Tokenizer = void 0;
var Grammar_1 = require("./Grammar");
var Caption_1 = require("./Caption");
var Types_1 = require("./Types");
var uuid_1 = require("uuid");
/**
 *
 */
var Tokenizer = /** @class */ (function () {
    function Tokenizer(text) {
        var _this = this;
        this.tokens = [];
        this.init = function () {
            //need to find all paragraphs in the article and change them to tokens
            var paragraphStartToken = {};
            paragraphStartToken.type = Types_1.TokenType.PARAGRAPH_START;
            var paragraphEndToken = {};
            paragraphEndToken.type = Types_1.TokenType.PARAGRAPH_END;
            //console.log(this.text);
            //console.log(this.tokensMap);
            _this.text.split("\n").forEach(function (paragraph) {
                if (paragraph.length != 0
                    && paragraph != undefined
                    && paragraph.trim() != " ") {
                    //console.log(paragraph);
                    _this.tokens.push(paragraphStartToken);
                    paragraph.split(" ").forEach(function (word) {
                        var wordMatchResult = word.match(Grammar_1.Grammar.BLOCKS.TOKEN);
                        if (wordMatchResult && wordMatchResult[0]) {
                            //console.log("word: " + word + " = " + this.tokensMap.get(word.match(Grammar.BLOCKS.TOKEN)[0]));												
                            _this.tokens.push(_this.tokensMap.get(wordMatchResult[0]));
                        }
                        else {
                            //console.log(word);
                            if (word.length != 0
                                && word != undefined) {
                                var textToken = {};
                                textToken.type = Types_1.TokenType.TEXT;
                                textToken.value = word;
                                //console.log(word);
                                _this.tokens.push(textToken);
                            }
                        }
                    });
                    _this.tokens.push(paragraphEndToken);
                }
            });
            //console.log(this.tokens);
            _this.tokens;
        };
        this.text = text;
        this.tokens = [];
        this.tokensMap = new Map();
        this.tokenize();
    }
    Tokenizer.prototype.tokenize = function () {
        this.findCaption();
        this.findUnmarkable();
        this.findCodeInCode();
        this.findCodeBlock();
        this.findHeadings();
        this.findQuotes();
        this.findStrong();
        this.findLinks();
        this.findImages();
        this.findUnderlines();
        this.findColors();
        this.findBadges();
        this.findLists();
        this.findTables();
        this.init();
    };
    Tokenizer.prototype.findCaption = function () {
        if (this.text.match(Grammar_1.Grammar.BLOCKS.CAPTION) != null) {
            var caption = new Caption_1.Caption(this.text);
            var token = {};
            token = caption.get();
            var uuid = (0, uuid_1.v4)();
            this.text = "$token." + uuid + "\n" + caption.text;
            this.tokensMap.set("$token." + uuid, token);
        }
    };
    //unmarkable
    Tokenizer.prototype.findUnmarkable = function () {
        //if (this.text.match(Grammar.BLOCKS.UNMARKABLE)?.length != null) {			
        var _this = this;
        var unmarkables = this.text.match(Grammar_1.Grammar.BLOCKS.UNMARKABLE);
        unmarkables === null || unmarkables === void 0 ? void 0 : unmarkables.forEach(function (unmarkable) {
            var _a;
            var matchResult = unmarkable.match(Grammar_1.Grammar.BLOCKS.UNMARKABLE);
            if (matchResult) {
                var body = (_a = matchResult[0]) === null || _a === void 0 ? void 0 : _a.substring(2, matchResult[0].length - 2);
                var uuid = (0, uuid_1.v4)();
                var unmarkableToken = {};
                unmarkableToken.type = Types_1.TokenType.UNMARKABLE;
                unmarkableToken.value = body;
                _this.text = _this.text.replace(unmarkable, " $token.".concat(uuid, " "));
                _this.tokensMap.set("$token." + uuid, unmarkableToken);
            }
        });
        //}
        return;
    };
    //find code in code blocks
    Tokenizer.prototype.findCodeInCode = function () {
        var _this = this;
        var codeInCodes = this.text.match(Grammar_1.Grammar.BLOCKS.CODE_IN_CODE);
        codeInCodes === null || codeInCodes === void 0 ? void 0 : codeInCodes.forEach(function (codeInCode) {
            var _a;
            var languageMatchResult = codeInCode.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE);
            var bodyMatchResult = codeInCode.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE);
            if (languageMatchResult && bodyMatchResult) {
                var language = languageMatchResult[0];
                var body = (_a = bodyMatchResult[1]) !== null && _a !== void 0 ? _a : ''; // Add nullish coalescing operator to assign a non-null value to 'body'
                var uuid = (0, uuid_1.v4)();
                var codeToken = {};
                codeToken.type = Types_1.TokenType.CODE_IN_CODE;
                codeToken.code = body;
                codeToken.language = language;
                _this.tokensMap.set("$token." + uuid, codeToken);
                _this.text = _this.text.replace(codeInCode, " $token.".concat(uuid));
            }
        });
        return;
    };
    //find simple code blocks
    Tokenizer.prototype.findCodeBlock = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.CODE_BLOCK) != null) {
            var blocks = this.text.match(Grammar_1.Grammar.BLOCKS.CODE_BLOCK);
            blocks === null || blocks === void 0 ? void 0 : blocks.forEach(function (block) {
                var languageMatchResult = block.match(Grammar_1.Grammar.BLOCKS.CODE_BLOCK_LANG);
                var bodyMatchResult = block.match(Grammar_1.Grammar.BLOCKS.CODE_BLOCK_BODY);
                if (languageMatchResult && bodyMatchResult) {
                    var language = languageMatchResult[0];
                    var body = bodyMatchResult[0];
                    var codeToken = {};
                    codeToken.type = Types_1.TokenType.CODE_BLOCK;
                    codeToken.code = body;
                    codeToken.language = language;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, codeToken);
                    _this.text = _this.text.replace(block, " $token.".concat(uuid));
                }
            });
        }
        return;
    };
    //find headings
    Tokenizer.prototype.findHeadings = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.HEADING) != null) {
            var headings = this.text.match(Grammar_1.Grammar.BLOCKS.HEADING);
            headings === null || headings === void 0 ? void 0 : headings.forEach(function (heading) {
                var levelMatchResult = heading.match(Grammar_1.Grammar.BLOCKS.HEADING_LEVEL);
                if (levelMatchResult) {
                    var level = levelMatchResult[0];
                    //find body from heading where satrt is level + 1 and end is \n
                    //private case
                    if (!level || level.length > heading.length) {
                        return;
                    }
                    var body = heading.slice(level.length + 1, heading.length);
                    var types = [
                        Types_1.TokenType.HEADING_FIRST,
                        Types_1.TokenType.HEADING_SECOND,
                        Types_1.TokenType.HEADING_THIRD,
                        Types_1.TokenType.HEADING_FORTH,
                        Types_1.TokenType.HEADING_FIFTH
                    ];
                    //private case
                    if (!level || level.length > types.length) {
                        return;
                    }
                    var itype = level.length - 1;
                    var headToken = {};
                    headToken.type = types[itype];
                    headToken.value = body;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, headToken);
                    _this.text = _this.text.replace(heading, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find quotes
    Tokenizer.prototype.findQuotes = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.QUOTE) != null) {
            var quotes = this.text.match(Grammar_1.Grammar.BLOCKS.QUOTE);
            quotes === null || quotes === void 0 ? void 0 : quotes.forEach(function (quote) {
                var matchResult = quote.match(Grammar_1.Grammar.BLOCKS.QUOTE_PARAMS);
                if (matchResult) {
                    var author = matchResult[3];
                    var text = matchResult[0];
                    var quoteToken = {};
                    quoteToken.type = Types_1.TokenType.QUOTE;
                    quoteToken.quote = text;
                    quoteToken.author = author;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, quoteToken);
                    _this.text = _this.text.replace(quote, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find bold text
    Tokenizer.prototype.findStrong = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.STRONG) != null) {
            var strongs = this.text.match(Grammar_1.Grammar.BLOCKS.STRONG);
            strongs === null || strongs === void 0 ? void 0 : strongs.forEach(function (strong) {
                var bodyMatchResult = strong.match(Grammar_1.Grammar.BLOCKS.STRONG_TEXT);
                if (bodyMatchResult) {
                    var body = bodyMatchResult[0];
                    var strongToken = {};
                    strongToken.type = Types_1.TokenType.STRONG;
                    strongToken.value = body;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, strongToken);
                    _this.text = _this.text.replace(strong, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find links
    Tokenizer.prototype.findLinks = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.LINK) != null) {
            var links = this.text.match(Grammar_1.Grammar.BLOCKS.LINK);
            links === null || links === void 0 ? void 0 : links.forEach(function (link) {
                var nameMatchResult = link.match(Grammar_1.Grammar.BLOCKS.LINK_NAME);
                var urlMatchResult = link.match(Grammar_1.Grammar.BLOCKS.LINK_URL);
                if (nameMatchResult && urlMatchResult && nameMatchResult[0] && urlMatchResult[0]) {
                    var name_1 = nameMatchResult[0].substring(1, nameMatchResult[0].length - 1);
                    var url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);
                    var linkToken = {};
                    linkToken.type = Types_1.TokenType.LINK;
                    linkToken.name = name_1;
                    linkToken.url = url;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, linkToken);
                    _this.text = _this.text.replace(link, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find images
    Tokenizer.prototype.findImages = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.IMAGE) != null) {
            var images = this.text.match(Grammar_1.Grammar.BLOCKS.IMAGE);
            images === null || images === void 0 ? void 0 : images.forEach(function (image) {
                var altMatchResult = image.match(Grammar_1.Grammar.BLOCKS.IMAGE_NAME);
                var urlMatchResult = image.match(Grammar_1.Grammar.BLOCKS.IMAGE_URL);
                if (altMatchResult && urlMatchResult && altMatchResult[0] && urlMatchResult[0]) {
                    var alt = altMatchResult[0].substring(2, altMatchResult[0].length - 1);
                    var url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);
                    var imageToken = {};
                    imageToken.type = Types_1.TokenType.IMAGE;
                    imageToken.alt = alt;
                    imageToken.url = url;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, imageToken);
                    _this.text = _this.text.replace(image, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find underlines
    Tokenizer.prototype.findUnderlines = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.UNDER_LINE) != null) {
            var underlines = this.text.match(Grammar_1.Grammar.BLOCKS.UNDER_LINE);
            underlines === null || underlines === void 0 ? void 0 : underlines.forEach(function (underline) {
                var bodyMatchResult = underline.match(Grammar_1.Grammar.BLOCKS.UNDER_LINE);
                if (bodyMatchResult && bodyMatchResult[0]) {
                    var body = bodyMatchResult[0].substring(1, bodyMatchResult[0].length - 1);
                    var underlineToken = {};
                    underlineToken.type = Types_1.TokenType.UNDER_LINE;
                    underlineToken.value = body;
                    var uuid = (0, uuid_1.v4)();
                    _this.tokensMap.set("$token." + uuid, underlineToken);
                    _this.text = _this.text.replace(underline, " $token.".concat(uuid, " "));
                }
            });
        }
        return;
    };
    //find colors
    Tokenizer.prototype.findColors = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.COLOR) != null) {
            var colors = this.text.match(Grammar_1.Grammar.BLOCKS.COLOR);
            colors === null || colors === void 0 ? void 0 : colors.forEach(function (color) {
                var body = color.split(".")[0];
                var colorName = color.split(".")[1];
                var colorToken = {};
                colorToken.type = Types_1.TokenType.COLOR;
                colorToken.value = body;
                colorToken.color = colorName;
                var uuid = (0, uuid_1.v4)();
                _this.tokensMap.set("$token." + uuid, colorToken);
                _this.text = _this.text.replace(color, " $token.".concat(uuid));
            });
        }
    };
    //find bages
    Tokenizer.prototype.findBadges = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.BADGE) != null) {
            var badges = this.text.match(Grammar_1.Grammar.BLOCKS.BADGE);
            badges === null || badges === void 0 ? void 0 : badges.forEach(function (badge) {
                var body = badge.split("@")[0];
                var colorName = badge.split("@")[1];
                var badgeToken = {};
                badgeToken.type = Types_1.TokenType.BADGE;
                badgeToken.value = body;
                badgeToken.color = colorName;
                var uuid = (0, uuid_1.v4)();
                _this.tokensMap.set("$token." + uuid, badgeToken);
                _this.text = _this.text.replace(badge, " $token.".concat(uuid, " "));
            });
        }
    };
    //find lists
    Tokenizer.prototype.findLists = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.LIST) != null) {
            var lists = this.text.match(Grammar_1.Grammar.BLOCKS.LIST);
            lists === null || lists === void 0 ? void 0 : lists.forEach(function (list) {
                var body = list;
                var listToken = {};
                listToken.type = Types_1.TokenType.LIST;
                listToken.value = body;
                var uuid = (0, uuid_1.v4)();
                _this.tokensMap.set("$token." + uuid, listToken);
                _this.text = _this.text.replace(list, " $token.".concat(uuid));
            });
        }
    };
    //find tables
    Tokenizer.prototype.findTables = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.TABLE) != null) {
            var tables = this.text.match(Grammar_1.Grammar.BLOCKS.TABLE);
            tables === null || tables === void 0 ? void 0 : tables.forEach(function (table) {
                var tableToken = {};
                tableToken.type = Types_1.TokenType.TABLE;
                tableToken.row = table;
                tableToken.children = [];
                //add children
                var rows = table.split("\n");
                rows.forEach(function (row) {
                    var rowToken = {};
                    rowToken.type = Types_1.TokenType.TABLE_ROW;
                    rowToken.value = row;
                    tableToken.children.push(rowToken);
                });
                var uuid = (0, uuid_1.v4)();
                _this.tokensMap.set("$token." + uuid, tableToken);
                _this.text = _this.text.replace(table, " $token.".concat(uuid));
            });
        }
        //inline code
        if (this.text.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE_BLOCK) != null) {
            var inlineCodes = this.text.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE_BLOCK);
            inlineCodes === null || inlineCodes === void 0 ? void 0 : inlineCodes.forEach(function (inlineCode) {
                var inlineCodeToken = {};
                inlineCodeToken.type = Types_1.TokenType.CODE_INLINE;
                inlineCodeToken.value = inlineCode;
                var uuid = (0, uuid_1.v4)();
                _this.tokensMap.set("$token." + uuid, inlineCodeToken);
                _this.text = _this.text.replace(inlineCode, " $token.".concat(uuid));
            });
        }
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
