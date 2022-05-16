/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Caption.ts":
/*!************************!*\
  !*** ./src/Caption.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Caption": () => (/* binding */ Caption)
/* harmony export */ });
/* harmony import */ var _Grammar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grammar */ "./src/Grammar.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/Types.ts");
"string";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Caption = /*#__PURE__*/function () {
  function Caption(text) {
    _classCallCheck(this, Caption);

    this.text = text;
  }

  _createClass(Caption, [{
    key: "get",
    value: function get() {
      var caption = this.text.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION);
      var token = {};
      token.type = _Types__WEBPACK_IMPORTED_MODULE_1__.TokenType.CAPTION;
      token.row = caption[0];
      token.date = caption[1];
      token.title = caption[3];
      token.template = caption[5];
      token.thumbnail = caption[7];
      token.slug = caption[9];
      token.categories = caption[11];
      token.tags = caption[13]; //remove caption from the text

      this.text = this.text.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION, "");
      return token;
    }
  }]);

  return Caption;
}();

/***/ }),

/***/ "./src/Grammar.ts":
/*!************************!*\
  !*** ./src/Grammar.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grammar": () => (/* binding */ Grammar)
/* harmony export */ });


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Grammar = /*#__PURE__*/_createClass(function Grammar() {
  _classCallCheck(this, Grammar);
});

_defineProperty(Grammar, "BLOCKS", {
  HEADING: /(#{1,5})((.*?)+)/,
  CAPTION: /^---\sdate:((.*))\stitle:((.*))\stemplate:((.*))\sthumbnail:((.*))\sslug:((.*))\scategories:((.*))\stags:((.*))\s---/,
  SPACE: / /,
  LINE: /\n/,
  COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/,
  BADGE: /((.?)[^\s]+)\@(blue|gray|red|green|yellow|indigo|purple|pink)/,
  LIST: /(\-|\[\]|\[\x\])\s((.*))/,
  CODE_BLOCK: /```(bash|javascript)([\s\S]*?\s)```/,
  CODE_IN_CODE: /```(bash|javascript)((\s[\s\S]*)```)\s*```\s/,
  INLINE_CODE: /(.*)`(.*)`(.*)/,
  QUOTE: />(.*)\s>.<cite>(.*)<\/cite>/,
  LINK: /(.*)[^!]\[(.*?)\]\((.*)\)(.*)/,
  IMAGE: /(.*)!\[(.*?)\]\((.*)\)(.*)/,
  UNDER_LINE: /(.*)_(.*)_(.*)/,
  UNMARKABLE: /(.*)\\\*(.*)\\\*(.*)/,
  STRONG: /(.*)\*\*(.*)\*\*(.*)/,
  _TABLE: /((.*)\n((\|[\w\d\s]+)+\|)\n(.*))/,
  TABLE: /((\|[\w\d\s]+)+\|)$/
});

/***/ }),

/***/ "./src/Parser.ts":
/*!***********************!*\
  !*** ./src/Parser.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types */ "./src/Types.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Parser = /*#__PURE__*/function () {
  function Parser(tokens) {
    _classCallCheck(this, Parser);

    _defineProperty(this, "tokens", []);

    this.tokens = tokens;
    this.ast = {
      type: "Document",
      children: []
    };
    this.init();
  }

  _createClass(Parser, [{
    key: "init",
    value: function init() {
      var token_number;
      token_number = 0;
      var isParagraph;
      isParagraph = false;
      var children = this.ast.children;

      while (token_number < this.tokens.length) {
        var token = this.tokens[token_number]; // Caption

        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CAPTION) {
          var captionElement = {};
          captionElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CAPTION;
          captionElement.row = token.row;
          captionElement.children = [{
            type: "Caption",
            date: token.date,
            title: token.title,
            template: token.template,
            thumbnail: token.thumbnail,
            slug: token.slug,
            categories: token.categories,
            tags: token.tags
          }];
          children.push(captionElement);
        } // # dept=1


        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING_FIRST) {
          var headElement = {};
          headElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING;
          headElement.dept = 1;
          headElement.row = "#" + token.value;
          headElement.children = [{
            type: _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT,
            value: token.value
          }];
          children.push(headElement);
        } // ## dept = 2


        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING_SECOND) {
          var _headElement = {};
          _headElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING;
          _headElement.dept = 2;
          _headElement.row = "##" + token.value;
          _headElement.children = [{
            type: _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT,
            value: token.value
          }];
          children.push(_headElement);
        } // ### dept = 3


        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING_THIRD) {
          var _headElement2 = {};
          _headElement2.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING;
          _headElement2.dept = 3;
          _headElement2.row = "###" + token.value;
          _headElement2.children = [{
            type: _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT,
            value: token.value
          }];
          children.push(_headElement2);
        } // #### dept = 4


        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING_FORTH) {
          var _headElement3 = {};
          _headElement3.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING;
          _headElement3.dept = 4;
          _headElement3.row = "####" + token.value;
          _headElement3.children = [{
            type: _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT,
            value: token.value
          }];
          children.push(_headElement3);
        } // ##### dept = 5


        if (token.type === _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING_FIFTH) {
          var _headElement4 = {};
          _headElement4.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.HEADING;
          _headElement4.dept = 5;
          _headElement4.row = "#####" + token.value;
          _headElement4.children = [{
            type: _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT,
            value: token.value
          }];
          children.push(_headElement4);
        } //CodeInCode


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_IN_CODE) {
          var codeInCodeElement = {};
          codeInCodeElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_IN_CODE;
          codeInCodeElement.row = "```" + token.language + "\n" + token.code + "\n```";
          codeInCodeElement.code = token.code;
          codeInCodeElement.language = token.language;
          children.push(codeInCodeElement);
        } //CodeBlock


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_BLOCK) {
          var codeBlockElement = {};
          codeBlockElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_BLOCK;
          codeBlockElement.row = "```" + token.language + "\n" + token.code + "\n```";
          codeBlockElement.code = token.code;
          codeBlockElement.language = token.language;
          children.push(codeBlockElement);
        } //Quote


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.QUOTE) {
          var quoteElement = {};
          quoteElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.QUOTE;
          quoteElement.row = ">" + token.quote + "\n> <cite> - " + token.author + "</cite>";
          quoteElement.quote = token.quote;
          quoteElement.author = token.author;
          children.push(quoteElement);
        } //List


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.LIST) {
          var listElement = {};
          listElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.LIST;
          listElement.attribute = token.attribute;
          listElement.row = token.attribute + " " + token.value;
          listElement.value = token.value;
          children.push(listElement);
        } //Table


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TABLE) {
          var tableElement = {};
          tableElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TABLE;
          tableElement.row = token.row;
          tableElement.children = token.children;
          children.push(tableElement);
        } //Start all that in the paragraph can use


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.PARAGRAPH_START) {
          var paragraphStartElement = {};
          paragraphStartElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.PARAGRAPH;
          paragraphStartElement.children = [];
          paragraphStartElement.row = "";
          children.push(paragraphStartElement);
          isParagraph = true;
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.PARAGRAPH_END) {
          isParagraph = false;
        } //Link


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.LINK) {
          var linkElement = {};
          linkElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.LINK;
          linkElement.name = token.name;
          linkElement.url = token.url;
          linkElement.row = "[" + token.name + "](" + token.url + ")";

          if (isParagraph == true) {
            children[children.length - 1].children.push(linkElement);
            children[children.length - 1].row = children[children.length - 1].row + "[" + token.name + "](" + token.url + ")";
          } else {
            children.push(linkElement);
          }
        } //Image


        if (token.type == "Image" && isParagraph == true) {
          var _imageToken = {};
          _imageToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.IMAGE;
          _imageToken.alt = token.alt;
          _imageToken.url = token.url;
          _imageToken.row = "![" + token.alt + "](" + token.url + ")";

          if (isParagraph == true) {
            children[children.length - 1].children.push(_imageToken);
            children[children.length - 1].row = children[children.length - 1].row + "[" + token.alt + "](" + token.url + ")";
          } else {
            children.push(_imageToken);
          }
        } // Text


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT) {
          var _textToken = {};
          _textToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT;
          _textToken.value = token.value;
          _textToken.row = token.value;

          if (isParagraph == true) {
            children[children.length - 1].children.push(_textToken);
            children[children.length - 1].row = children[children.length - 1].row + token.value;
          } else {
            children.push(_textToken);
          }
        } // Unmarkable


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNMARKABLE) {
          var unmarkableTextToken = {};
          unmarkableTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNMARKABLE;
          unmarkableTextToken.value = token.value;
          unmarkableTextToken.row = "\\" + token.value + "\\";

          if (isParagraph == true) {
            children[children.length - 1].children.push(unmarkableTextToken);
            children[children.length - 1].row = children[children.length - 1].row + token.value;
          } else {
            children.push(unmarkableTextToken);
          }
        } // Strong


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.STRONG) {
          var _strongTextToken = {};
          _strongTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.STRONG;
          _strongTextToken.value = token.value;
          _strongTextToken.row = "**" + token.value + "*+";

          if (isParagraph == true) {
            children[children.length - 1].children.push(_strongTextToken);
            children[children.length - 1].row = children[children.length - 1].row + token.value;
          } else {
            children.push(_strongTextToken);
          }
        } // Color text


        if (token.type == "Color") {
          var _colorTextToken = {};
          _colorTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.COLOR;
          _colorTextToken.color = token.color;
          _colorTextToken.value = token.value;
          _colorTextToken.row = token.value + "." + token.color;

          if (isParagraph == true) {
            children[children.length - 1].children.push(_colorTextToken);
            children[children.length - 1].row = children[children.length - 1].row + token.value + "." + token.color;
          } else {
            children.push(_colorTextToken);
          }
        } // Color badge


        if (token.type == "Badge") {
          var badgeToken = {};
          badgeToken.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.BADGE;
          badgeToken.color = token.color;
          badgeToken.value = token.value;
          badgeToken.row = token.value + "@" + token.color;

          if (isParagraph == true) {
            children[children.length - 1].children.push(badgeToken);
            children[children.length - 1].row = children[children.length - 1].row + token.value + "@" + token.color;
          } else {
            children.push(badgeToken);
          }
        } // InlineCode


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_INLINE) {
          var inlineCodeElement = {};
          inlineCodeElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_INLINE;
          inlineCodeElement.value = token.value;
          inlineCodeElement.row = token.value;

          if (isParagraph == true) {
            children[children.length - 1].children.push(inlineCodeElement);
            children[children.length - 1].row = children[children.length - 1].row + token.value;
          } else {
            children.push(inlineCodeElement);
          }
        } // UnderLine


        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNDER_LINE) {
          var underLineElement = {};
          underLineElement.type = _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNDER_LINE;
          underLineElement.value = token.value;

          if (isParagraph == true) {
            children[children.length - 1].children.push(underLineElement);
            children[children.length - 1].row = children[children.length - 1].row + token.value;
          } else {
            children.push(underLineElement);
          }
        }

        token_number++;
      }
    }
  }]);

  return Parser;
}();

/***/ }),

/***/ "./src/Tokenizer.ts":
/*!**************************!*\
  !*** ./src/Tokenizer.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tokenizer": () => (/* binding */ Tokenizer)
/* harmony export */ });
/* harmony import */ var _Grammar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grammar */ "./src/Grammar.ts");
/* harmony import */ var _Caption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Caption */ "./src/Caption.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types */ "./src/Types.ts");


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * 
 */

var Tokenizer = /*#__PURE__*/_createClass(function Tokenizer(_text) {
  var _this = this;

  _classCallCheck(this, Tokenizer);

  _defineProperty(this, "tokens", []);

  _defineProperty(this, "init", function () {
    //add caption
    if (_this.text.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION) != null) {
      var caption = new _Caption__WEBPACK_IMPORTED_MODULE_1__.Caption(_this.text);
      var token = {};
      token = caption.get();
      _this.text = caption.text; //remove caption from article

      _this.tokens.push(token);
    } //split by space


    _this.words = _this.text.split(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.SPACE);
    var out = "";
    /**
     * LOOPS for multiple line blocks:
     *  - CODEBLOCK
     *  - CODE
     *  - QUOTE
     *  - TABLE
     */

    _this.word_number = 0;

    loop_word: while (_this.word_number < _this.words.length) {
      out = out + " " + _this.words[_this.word_number]; //in the end of article

      if (_this.word_number == _this.words.length - 1) {
        var _token = {};
        _token.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNKNOWN_TEXT;
        _token.value = out;

        _this.tokens.push(_token);

        _this.word_number++;
        continue loop_word;
      } //CODE_IN_CODE block


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_IN_CODE) != null) {
        var rest = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_IN_CODE, "&codeInCode&");
        var arr = rest.split("&codeInCode&"); //block before

        var unknownToken = {};
        unknownToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNKNOWN_TEXT;
        unknownToken.value = arr[0];

        _this.tokens.push(unknownToken); //founded block


        var codeToken = {};
        codeToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.CODE_IN_CODE;
        codeToken.code = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_IN_CODE)[2];
        codeToken.language = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_IN_CODE)[1];

        _this.tokens.push(codeToken); //block after 


        out = arr[1];
        _this.word_number++;
        continue loop_word;
      } //CODE


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK) != null && out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK)[2].length > 5 //because value is not less then 5 symbols...its CODEBLOCK
      ) {
        var _rest = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK, "&codeblock&");

        var _arr = _rest.split("&codeblock&"); //block before


        var _unknownTextToken = {};
        _unknownTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNKNOWN_TEXT;
        _unknownTextToken.value = _arr[0];

        _this.tokens.push(_unknownTextToken); //founded block


        var _codeToken = {};
        _codeToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.CODE_BLOCK;
        _codeToken.code = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK)[2];
        _codeToken.language = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK)[1];

        _this.tokens.push(_codeToken); //block after


        out = _arr[1];
        _this.word_number++;
        continue loop_word;
      } //QUOTE


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE) != null) {
        var _rest2 = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE, "&quote&");

        var _arr2 = _rest2.split("&quote&"); //block before


        var _unknownToken = {};
        _unknownToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNKNOWN_TEXT;
        _unknownToken.value = _arr2[0];

        _this.tokens.push(_unknownToken); //founded block


        var _quoteToken = {};
        _quoteToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.QUOTE;
        _quoteToken.row = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[0];
        _quoteToken.quote = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[1];
        _quoteToken.author = out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[2];

        _this.tokens.push(_quoteToken); //after block


        out = _arr2[1];
        _this.word_number++;
        continue loop_word;
      }

      _this.word_number++;
    } // LOOPS UNKNOWN_TEXT TO DEFINE OTHER TOKENS:


    var itokens = [];

    _this.tokens.forEach(function (token) {
      if (token.type == _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNKNOWN_TEXT) {
        var text = token.value.split("\n");
        text.forEach(function (stroke) {
          if (stroke != '' && stroke != ' ') {
            /**
             * Search other tokens:
             * 
             * - Image
             * - Link
             * - InlineCode
             *  - Strong
             * - Unmarkable
             * - Heading
             * - Underline
             * - Color
             * - Badge
             * - Table
             */
            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE) != null) {
              //Paragrah Start -> Text before -> Image -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken2 = {};
              _paragraphStartToken2.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken2); //text before 

              var textBeforeToken = {};
              textBeforeToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              textBeforeToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[1];
              itokens.push(textBeforeToken); //image

              var _imageToken = {};
              _imageToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.IMAGE;
              _imageToken.alt = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[2];
              _imageToken.url = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[3];
              itokens.push(_imageToken); //text after

              var textAfterToken = {};
              textAfterToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              textAfterToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[4];
              itokens.push(textAfterToken); //end paragraph

              var _paragraphEndToken2 = {};
              _paragraphEndToken2.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken2);
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK) != null) {
              //Paragrah Start -> Text before -> Link -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken3 = {};
              _paragraphStartToken3.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken3); //text before 

              var _textBeforeToken = {};
              _textBeforeToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textBeforeToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[1];
              itokens.push(_textBeforeToken); //link

              var _linkToken = {};
              _linkToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.LINK;
              _linkToken.name = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[2];
              _linkToken.url = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[3];
              itokens.push(_linkToken); //text after

              var _textAfterToken = {};
              _textAfterToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[4];
              itokens.push(_textAfterToken); //end paragraph

              var _paragraphEndToken3 = {};
              _paragraphEndToken3.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken3);
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_LINE) != null) {
              //Paragrah Start -> Text before -> underLine -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken4 = {};
              _paragraphStartToken4.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken4); //text before 

              var _textBeforeToken2 = {};
              _textBeforeToken2.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textBeforeToken2.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_LINE)[1];
              itokens.push(_textBeforeToken2); //underLine

              var _underLineToken = {};
              _underLineToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNDER_LINE;
              _underLineToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_LINE)[2];
              itokens.push(_underLineToken); // text after

              var _textAfterToken2 = {};
              _textAfterToken2.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken2.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_LINE)[3];
              itokens.push(_textAfterToken2); //end paragraph

              var _paragraphEndToken4 = {};
              _paragraphEndToken4.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken4);
              return;
            } //inline code


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE) != null) {
              //Paragrah Start -> Text before -> inline code -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken5 = {};
              _paragraphStartToken5.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken5); //text before 

              var _textBeforeToken3 = {};
              _textBeforeToken3.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textBeforeToken3.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[1];
              itokens.push(_textBeforeToken3); //inline code

              var _codeInlineToken = {};
              _codeInlineToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.CODE_INLINE;
              _codeInlineToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[2];
              itokens.push(_codeInlineToken); // text after

              var _textAfterToken3 = {};
              _textAfterToken3.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken3.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[3];
              itokens.push(_textAfterToken3); //end paragraph

              var _paragraphEndToken5 = {};
              _paragraphEndToken5.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken5);
              return;
            } // Strong text


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG) != null) {
              //Paragrah Start -> Text before -> Strong Text -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken6 = {};
              _paragraphStartToken6.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken6); //text before 

              var _textToken2 = {};
              _textToken2.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textToken2.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[1];
              itokens.push(_textToken2); //strong text

              var _strongTextToken = {};
              _strongTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.STRONG;
              _strongTextToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[2];
              itokens.push(_strongTextToken); // text after

              var _textAfterToken4 = {};
              _textAfterToken4.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken4.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[3];
              itokens.push(_textAfterToken4); //end paragraph

              var _paragraphEndToken6 = {};
              _paragraphEndToken6.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken6);
              return;
            } // Color text


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.COLOR) != null) {
              //Paragrah Start -> Text before -> Color Text -> Text after -> Paragraph End
              var _rest3 = stroke.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.COLOR, "&color&");

              var _arr3 = _rest3.split("&color&"); //paragraph start


              var _paragraphStartToken7 = {};
              _paragraphStartToken7.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken7); //text before 

              var _textToken3 = {};
              _textToken3.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textToken3.value = _arr3[0];
              itokens.push(_textToken3); //Color Text

              var _colorTextToken = {};
              _colorTextToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.COLOR;
              _colorTextToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.COLOR)[1];
              _colorTextToken.color = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.COLOR)[3];
              itokens.push(_colorTextToken); // text after

              var _textAfterToken5 = {};
              _textAfterToken5.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken5.value = _arr3[1];
              itokens.push(_textAfterToken5); //end paragraph

              var _paragraphEndToken7 = {};
              _paragraphEndToken7.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken7);
              return;
            } // Color badges


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.BADGE) != null) {
              //Paragrah Start -> Text before -> Color Badge -> Text after -> Paragraph End
              var _rest4 = stroke.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.BADGE, "&badge&");

              var _arr4 = _rest4.split("&badge&"); //paragraph start


              var _paragraphStartToken8 = {};
              _paragraphStartToken8.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken8); //text before 

              var _textToken4 = {};
              _textToken4.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textToken4.value = _arr4[0];
              itokens.push(_textToken4); //Color Badge

              var badgeToken = {};
              badgeToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.BADGE;
              badgeToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.BADGE)[1];
              badgeToken.color = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.BADGE)[3];
              itokens.push(badgeToken); // text after

              var _textAfterToken6 = {};
              _textAfterToken6.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken6.value = _arr4[1];
              itokens.push(_textAfterToken6); //end paragraph

              var _paragraphEndToken8 = {};
              _paragraphEndToken8.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken8);
              return;
            } // Unmarkable text


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE) != null) {
              //Paragrah Start -> Text before -> Unmarkable Text -> Text after -> Paragraph End
              //paragraph start
              var _paragraphStartToken9 = {};
              _paragraphStartToken9.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken9); //text before 

              var _textToken5 = {};
              _textToken5.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textToken5.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[1];
              itokens.push(_textToken5); //unmarkable text

              var _unmarkableToken = {};
              _unmarkableToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.UNMARKABLE;
              _unmarkableToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[2];
              itokens.push(_unmarkableToken); // text after

              var _textAfterToken7 = {};
              _textAfterToken7.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
              _textAfterToken7.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[3];
              itokens.push(_textAfterToken7); //end paragraph

              var _paragraphEndToken9 = {};
              _paragraphEndToken9.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken9);
              return;
            } // LIST						


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST) != null) {
              //Paragrah Start -> List -> Paragraph End
              //paragraph start
              var _paragraphStartToken10 = {};
              _paragraphStartToken10.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
              itokens.push(_paragraphStartToken10); //List

              var _listToken = {};
              _listToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.LIST;
              _listToken.attribute = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST)[1];
              _listToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST)[2];
              itokens.push(_listToken); //end paragraph

              var _paragraphEndToken10 = {};
              _paragraphEndToken10.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
              itokens.push(_paragraphEndToken10);
              return;
            } // TABLE


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE) != null) {
              // if second row in the table, when add this row to the previous table element
              if (itokens[itokens.length - 1].type == _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TABLE) {
                var _itokens$children;

                var tableRowToken = {};
                tableRowToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TABLE_ROW;
                tableRowToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE)[1];
                tableRowToken.row = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE)[1];
                (_itokens$children = itokens[itokens.length - 1].children) === null || _itokens$children === void 0 ? void 0 : _itokens$children.push(tableRowToken);
                itokens[itokens.length - 1].row = itokens[itokens.length - 1].row + "\n" + tableRowToken.row;
              } else {
                //added first row of the Table
                var _tableRowToken = {};
                _tableRowToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TABLE_ROW;
                _tableRowToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE)[1];
                _tableRowToken.row = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE)[1];
                var _tableToken = {};
                _tableToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TABLE;
                _tableToken.children = [_tableRowToken];
                _tableToken.row = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.TABLE)[1];
                itokens.push(_tableToken);
              }

              return;
            } // Heading


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING) != null) {
              var types = [_Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.HEADING_FIRST, _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.HEADING_SECOND, _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.HEADING_THIRD, _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.HEADING_FORTH, _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.HEADING_FIFTH];
              var itype = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING)[1].length - 1;
              var _headToken = {};
              _headToken.type = types[itype];
              _headToken.value = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING)[2];
              itokens.push(_headToken);
              return;
            } // for other unidentified text
            // Paragraph -> Other Text -> Paragraph
            //paragraph start


            var _paragraphStartToken = {};
            _paragraphStartToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_START;
            itokens.push(_paragraphStartToken); //Other Text 

            var _textToken = {};
            _textToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.TEXT;
            _textToken.value = stroke;
            itokens.push(_textToken); //end paragraph

            var _paragraphEndToken = {};
            _paragraphEndToken.type = _Types__WEBPACK_IMPORTED_MODULE_2__.TokenType.PARAGRAPH_END;
            itokens.push(_paragraphEndToken);
          }
        });
      } else {
        itokens.push(token);
      }
    });

    _this.tokens = itokens;
  });

  this.text = _text;
  this.tokens = [];
  this.word_number = 0;
  this.words = [];
  this.init();
});

/***/ }),

/***/ "./src/Types.ts":
/*!**********************!*\
  !*** ./src/Types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenType": () => (/* binding */ TokenType)
/* harmony export */ });
var TokenType;

(function (TokenType) {
  TokenType["BADGE"] = "Badge";
  TokenType["CAPTION"] = "Caption";
  TokenType["CODE_INLINE"] = "CodeInline";
  TokenType["CODE_BLOCK"] = "CodeBlock";
  TokenType["CODE_IN_CODE"] = "CodeInCode";
  TokenType["COLOR"] = "Color";
  TokenType["DOCUMENT"] = "Document";
  TokenType["IMAGE"] = "Image";
  TokenType["HEADING_FIRST"] = "HeadingFirst";
  TokenType["HEADING_SECOND"] = "HeadingSecond";
  TokenType["HEADING_THIRD"] = "HeadingThird";
  TokenType["HEADING_FORTH"] = "HeadingForth";
  TokenType["HEADING_FIFTH"] = "HeadingFifth";
  TokenType["HEADING"] = "Heading";
  TokenType["LINK"] = "Link";
  TokenType["LIST"] = "List";
  TokenType["PARAGRAPH_START"] = "ParagraphStart";
  TokenType["PARAGRAPH_END"] = "ParagraphEnd";
  TokenType["PARAGRAPH"] = "Paragraph";
  TokenType["QUOTE"] = "Quote";
  TokenType["STRONG"] = "Strong";
  TokenType["TABLE"] = "Table";
  TokenType["TABLE_ROW"] = "TableRow";
  TokenType["TEXT"] = "Text";
  TokenType["UNDER_LINE"] = "UnderLine";
  TokenType["UNKNOWN_TEXT"] = "UnknownText";
  TokenType["UNMARKABLE"] = "Unmarkable";
})(TokenType || (TokenType = {}));

/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _htmlblocks_CaptionHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlblocks/CaptionHTML */ "./src/htmlblocks/CaptionHTML.ts");
/* harmony import */ var _htmlblocks_HeaderHTML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./htmlblocks/HeaderHTML */ "./src/htmlblocks/HeaderHTML.ts");
/* harmony import */ var _htmlblocks_ParagraphHTML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmlblocks/ParagraphHTML */ "./src/htmlblocks/ParagraphHTML.ts");
/* harmony import */ var _htmlblocks_CodeBlockHTML__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./htmlblocks/CodeBlockHTML */ "./src/htmlblocks/CodeBlockHTML.ts");
/* harmony import */ var _htmlblocks_QuoteHTML__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./htmlblocks/QuoteHTML */ "./src/htmlblocks/QuoteHTML.ts");
/* harmony import */ var _htmlblocks_ListHTML__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./htmlblocks/ListHTML */ "./src/htmlblocks/ListHTML.ts");
/* harmony import */ var _htmlblocks_TableHTML__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./htmlblocks/TableHTML */ "./src/htmlblocks/TableHTML.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Types */ "./src/Types.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }









var View = /*#__PURE__*/function () {
  function View(ast) {
    _classCallCheck(this, View);

    this.ast = ast;
    this.init();
  }

  _createClass(View, [{
    key: "init",
    value: function init() {
      var children = this.ast.children;
      children.forEach(function (token) {
        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.CAPTION) {
          var caption = new _htmlblocks_CaptionHTML__WEBPACK_IMPORTED_MODULE_0__.CaptionHTML(token);
          caption.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.HEADING) {
          var header = new _htmlblocks_HeaderHTML__WEBPACK_IMPORTED_MODULE_1__.HeaderHTML(token);
          header.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.CODE_BLOCK || token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.CODE_IN_CODE) {
          var codeblock = new _htmlblocks_CodeBlockHTML__WEBPACK_IMPORTED_MODULE_3__.CodeBlockHTML(token);
          codeblock.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.QUOTE) {
          var quote = new _htmlblocks_QuoteHTML__WEBPACK_IMPORTED_MODULE_4__.QuoteHTML(token);
          quote.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.LIST) {
          var list = new _htmlblocks_ListHTML__WEBPACK_IMPORTED_MODULE_5__.ListHTML(token);
          list.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.TABLE) {
          var table = new _htmlblocks_TableHTML__WEBPACK_IMPORTED_MODULE_6__.TableHTML(token);
          table.render();
        }

        if (token.type == _Types__WEBPACK_IMPORTED_MODULE_7__.TokenType.PARAGRAPH) {
          var paragraph = new _htmlblocks_ParagraphHTML__WEBPACK_IMPORTED_MODULE_2__.ParagraphHTML(token);
          paragraph.render();
        }
      });
    }
  }]);

  return View;
}();

/***/ }),

/***/ "./src/htmlblocks/CaptionHTML.ts":
/*!***************************************!*\
  !*** ./src/htmlblocks/CaptionHTML.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaptionHTML": () => (/* binding */ CaptionHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var CaptionHTML = /*#__PURE__*/function () {
  function CaptionHTML(token) {
    _classCallCheck(this, CaptionHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(CaptionHTML, [{
    key: "render",
    value: function render() {
      var tagsBlock = "";
      this.token.children[0].tags.toString().split(" ").map(function (tag) {
        if (tag.length > 0) {
          tagsBlock = tagsBlock + '<a href="#/tags/' + tag + '" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400  hover:bg-orange-500 uppercase last:mr-0 mr-1">' + tag + "</a>";
        }
      });
      var categoriesBlock = "";

      if (this.token.children[0].categories.length > 0) {
        categoriesBlock = '<a class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-400  hover:bg-gray-500 uppercase last:mr-0 mr-1">' + this.token.children[0].categories + "</a>";
      }

      var CaptionBlock = "\t\n\t\t\t\t  <img src= ".concat(this.token.children[0].thumbnail, " class=\"float-left p-8\"/>\n                        <h3 class=\"text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600\">\n\t\t\t\t\t\t\t").concat(this.token.children[0].title.slice(2, this.token.children[0].title.length - 1), "</h3>\n\t\t\t\t\t\t<time class=\"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1\">\n                            ").concat(this.token.children[0].date, "\n                        </time> \n                        <div class=\"tag-container py-1\">\n\t\t\t\t\t\t\t").concat(tagsBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"categories-container py-1\">\n\t\t\t\t\t\t\t").concat(categoriesBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t");
      var captionNode = this.DomUtilites.createElement('p');
      captionNode.innerHTML = CaptionBlock;
      var container = document.getElementById("app");
      container === null || container === void 0 ? void 0 : container.appendChild(captionNode);
    }
  }]);

  return CaptionHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/CodeBlockHTML.ts":
/*!*****************************************!*\
  !*** ./src/htmlblocks/CodeBlockHTML.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeBlockHTML": () => (/* binding */ CodeBlockHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
/* harmony import */ var _static_styles_prism_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/styles/prism.css */ "./src/static/styles/prism.css");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);

/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


 // import prismjs


var CodeBlockHTML = /*#__PURE__*/function () {
  function CodeBlockHTML(token) {
    _classCallCheck(this, CodeBlockHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(CodeBlockHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var codeBlock = "\n\t\t\t<code class=\"language-".concat(this.token.language, "\">\n\t\t \t\t").concat(this.token.code, "\n\t\t\t</code>");
      var CodeBlockNode = this.DomUtilites.createElement("pre");
      CodeBlockNode.className = "language-".concat(this.token.language, "\"");
      prismjs__WEBPACK_IMPORTED_MODULE_2__.highlightAll(codeBlock);
      CodeBlockNode.innerHTML = codeBlock;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(CodeBlockNode);
    }
  }]);

  return CodeBlockHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/DomUtilites.ts":
/*!***************************************!*\
  !*** ./src/htmlblocks/DomUtilites.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomUtilites": () => (/* binding */ DomUtilites)
/* harmony export */ });

/**
 * Returns functions to work with dom elements in document
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DomUtilites = /*#__PURE__*/function () {
  function DomUtilites() {
    _classCallCheck(this, DomUtilites);
  }

  _createClass(DomUtilites, [{
    key: "getLastNode",
    value: function getLastNode() {
      var lastChild = this.getRoot();
      return lastChild.lastChild;
    }
  }, {
    key: "getLastNodeName",
    value: function getLastNodeName() {
      var lastChild = this.getRoot();
      return lastChild.lastChild.nodeName;
    }
  }, {
    key: "getRoot",
    value: function getRoot() {
      return document.querySelector('article');
    }
  }, {
    key: "createElement",
    value: function createElement(element) {
      return document.createElement(element);
    }
  }]);

  return DomUtilites;
}();

/***/ }),

/***/ "./src/htmlblocks/HeaderHTML.ts":
/*!**************************************!*\
  !*** ./src/htmlblocks/HeaderHTML.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderHTML": () => (/* binding */ HeaderHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var HeaderHTML = /*#__PURE__*/function () {
  function HeaderHTML(token) {
    _classCallCheck(this, HeaderHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(HeaderHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var HeaderNode = this.DomUtilites.createElement('h' + this.token.dept);
      HeaderNode.className = "text-".concat(this.token.dept, "xl mt-0 mb-2 text-gray-800 pr-10 pt-10");
      HeaderNode.innerHTML = this.token.children[0].value;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastElementChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(HeaderNode);
    }
  }]);

  return HeaderHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/ListHTML.ts":
/*!************************************!*\
  !*** ./src/htmlblocks/ListHTML.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListHTML": () => (/* binding */ ListHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");

/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as list
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var ListHTML = /*#__PURE__*/function () {
  function ListHTML(token) {
    _classCallCheck(this, ListHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(ListHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var listBlock;
      var listBlockNode;
      listBlockNode = this.DomUtilites.createElement("ul");
      listBlockNode.className = "mb-5"; //console.log(this.token)

      if (this.token.attribute == "[]") {
        listBlockNode = this.DomUtilites.createElement("div");
        listBlock = "\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input appearance-none h-4 w-4 border-solid border-gray-200 border-solid border-2 rounded-sm disabled:bg-white disabled:border-blue-600 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\n\t\t\t\t\t<label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckDisabled\">\n\t\t\t  \t\t".concat(this.token.value, "\n\t\t\t\t\t</label>\n\t  \t\t</div>\n\t\t");
      }

      if (this.token.attribute == "[x]") {
        listBlockNode = this.DomUtilites.createElement("div");
        listBlock = "\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n\t\t\t\t\t<label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckCheckedDisabled\">\n\t\t\t  \t\t\t".concat(this.token.value, "\n\t\t\t\t\t</label>\n\t  \t\t</div>\n\t\t");
      }

      if (this.token.attribute == "-") {
        listBlock = "\n\t\t\t\t<li class=\"text-sky-700\">\n\t\t\t\t\t".concat(this.token.value, "\n\t\t\t\t</li>\n\t\t\t");
        listBlockNode.className = "list-disc ml-5";
      }

      listBlockNode.innerHTML = listBlock;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(listBlockNode);
    }
  }]);

  return ListHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/ParagraphHTML.ts":
/*!*****************************************!*\
  !*** ./src/htmlblocks/ParagraphHTML.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphHTML": () => (/* binding */ ParagraphHTML)
/* harmony export */ });
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Types */ "./src/Types.ts");
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var ParagraphHTML = /*#__PURE__*/function () {
  function ParagraphHTML(token) {
    _classCallCheck(this, ParagraphHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_1__.DomUtilites();
  }

  _createClass(ParagraphHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var ParagraphNode = this.DomUtilites.createElement("p");
      ParagraphNode.className = "block leading-7 font-mono";
      var text = "";
      this.token.children.forEach(function (child) {
        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.TEXT) {
          text = text + " " + child.value;
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.IMAGE) {
          text = text + "\n\t\t\t\t<div class=\"flex flex-wrap justify-center\">\n\t\t\t\t\t<div class=\"w-6/12 sm:w-4/12 px-4 pb-20\">\n\t\t\t\t\t\t<img src=\"".concat(child.url, "\" alt=\"").concat(child.alt, "\" class=\"shadow rounded max-w-full h-auto allign-middle border-none\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t");
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.LINK) {
          text = text + "<a href=\"".concat(child.url, "\" class=\"text-blue-500\">\n\t\t\t\t\t").concat(child.name, "\n\t\t\t\t\t<a/>");
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.STRONG) {
          text = text + " " + "\n\t\t\t\t<strong>".concat(child.value, "</strong>\n\t\t\t\t");
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.CODE_INLINE) {
          text = text + " " + "\n\t\t\t\t<code class=\"inline-block py-1 px-2 bg-gray-300 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400\">\n\t\t\t\t\t".concat(child.value, "\n\t\t\t\t</code>\n\t\t\t\t");
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.COLOR) {
          var colorText;

          if (child.color == "blue") {
            colorText = '<a class="underline decoration-blue-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "gray") {
            colorText = '<a class="underline decoration-gray-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "red") {
            colorText = '<a class="underline decoration-red-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "green") {
            colorText = '<a class="underline decoration-green-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "yellow") {
            colorText = '<a class="underline decoration-yellow-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "purple") {
            colorText = '<a class="underline decoration-purple-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "pink") {
            colorText = '<a class="underline decoration-pink-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          } else if (child.color == "indigo") {
            colorText = '<a class="underline decoration-indigo-500 md:decoration-solid decoration-4">' + child.value + '</a>';
          }

          text = text + " " + colorText;
        }

        if (child.type == "Badge") {
          var colorBadge;

          if (child.color == "blue") {
            colorBadge = '<span class="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">' + child.value + '</span>';
          } else if (child.color == "gray") {
            colorBadge = '<span class="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">' + child.value + '</span>';
          } else if (child.color == "red") {
            colorBadge = '<span class="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">' + child.value + '</span>';
          } else if (child.color == "green") {
            colorBadge = '<span class="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">' + child.value + '</span>';
          } else if (child.color == "yellow") {
            colorBadge = '<span class="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">' + child.value + '</span>';
          } else if (child.color == "purple") {
            colorBadge = '<span class="bg-purple-100 text-purple-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">' + child.value + '</span>';
          } else if (child.color == "pink") {
            colorBadge = '<span class="bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">' + child.value + '</span>';
          } else if (child.color == "indigo") {
            colorBadge = '<span class="bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">' + child.value + '</span>';
          }

          text = text + " " + colorBadge;
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNDER_LINE) {
          text = text + " " + "\n\t\t\t\t<span class=\"underline decoration-sky-500 text-slate-500\">\n\t\t\t\t\t".concat(child.value, "\n\t\t\t\t</span>\n\t\t\t\t");
        }

        if (child.type == _Types__WEBPACK_IMPORTED_MODULE_0__.TokenType.UNMARKABLE) {
          //JSON.stringify(String(str)) for unmarkable text usage
          text = text + " " + "\n\t\t\t\t<span class=\"text-orange-900\">".concat(JSON.stringify(String(child.value)), "</span>\n\t\t\t\t");
        }
      });
      ParagraphNode.innerHTML = text;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) != 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(ParagraphNode);
    }
  }]);

  return ParagraphHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/QuoteHTML.ts":
/*!*************************************!*\
  !*** ./src/htmlblocks/QuoteHTML.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuoteHTML": () => (/* binding */ QuoteHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
/* harmony import */ var _static_styles_quote_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/styles/quote.css */ "./src/static/styles/quote.css");

/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var QuoteHTML = /*#__PURE__*/function () {
  function QuoteHTML(token) {
    _classCallCheck(this, QuoteHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(QuoteHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var quoteBlock = "\t\t\n\t\t<div>\n\t\t\t<p classname=\"mb-2\"> \n\t\t\t\t".concat(this.token.quote, "\n\t\t\t</p>\n\t\t\t<cite> ").concat(this.token.author, " </cite>\n\t\t</div>\n\t");
      var quoteBlockNode = this.DomUtilites.createElement("blockquote");
      quoteBlockNode.innerHTML = quoteBlock;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(quoteBlockNode);
    }
  }]);

  return QuoteHTML;
}();

/***/ }),

/***/ "./src/htmlblocks/TableHTML.ts":
/*!*************************************!*\
  !*** ./src/htmlblocks/TableHTML.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableHTML": () => (/* binding */ TableHTML)
/* harmony export */ });
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");

/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as list
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var TableHTML = /*#__PURE__*/function () {
  function TableHTML(token) {
    _classCallCheck(this, TableHTML);

    this.token = token;
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(TableHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var children;
      children = this.token.children;
      var table;
      var tableNode;
      var tableHead;
      var tableBody;
      tableNode = this.DomUtilites.createElement("table");
      tableNode.className = "shadow-lg bg-white mb-4";
      tableBody = "<tbody>";
      var headArray;
      var bodyArray;

      for (var i = 0; i < children.length; i++) {
        //thead
        if (i == 0) {
          tableHead = "<thead><tr>";
          headArray = children[0].value.split("|");
          headArray.pop();
          headArray.shift();
          headArray.forEach(function (head) {
            tableHead = tableHead + "<th class=\"bg-blue-100 border text-left px-8 py-4\">".concat(head, "</th>");
          });
          tableHead = tableHead + '</tr></thead>';
          table = tableHead; //tbody
        } else {
          bodyArray = children[i].value.split("|");
          bodyArray.pop();
          bodyArray.shift();
          tableBody = "<tr>";
          bodyArray.forEach(function (body) {
            tableBody = tableBody + "<td class=\"border px-8 py-4\">".concat(body, "</td>");
          });
          tableBody = tableBody + '</tr>';
          table = table + tableBody;
        }
      }

      table = table + "</tbody>";
      tableNode.innerHTML = table;
      var paragraphNode = this.DomUtilites.createElement("p");
      paragraphNode.appendChild(tableNode);
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastChild;
      } else {
        container = document.getElementById("app");
      }

      (_container = container) === null || _container === void 0 ? void 0 : _container.appendChild(paragraphNode);
    }
  }]);

  return TableHTML;
}();

/***/ }),

/***/ "./src/static/styles/prism.css":
/*!*************************************!*\
  !*** ./src/static/styles/prism.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/static/styles/quote.css":
/*!*************************************!*\
  !*** ./src/static/styles/quote.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/static/styles/style.css":
/*!*************************************!*\
  !*** ./src/static/styles/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/prismjs/prism.js":
/*!***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof __webpack_require__.g !== 'undefined') {
	__webpack_require__.g.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						/"|'/
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism.util.setLanguage(code, language);
			Prism.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./content/articles/how-to-write-text.md":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./content/articles/how-to-write-text.md ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("---\ndate: 2019-08-30\ntitle: 'How to Write Text'\ntemplate: post\nthumbnail: './thumbnails/writing.png'\nslug: how-to-write-text\ncategories: helping to write text\ntags: instruction texter writer\n---\n\n### Formatting syntax\n\nThis example is a small guide. \"How to write markdown text and get HTML document out\". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)\n\n### Caption\n\nHow to use: write this block like the example below\n\n```bash\n1  ---\n2  date: 2019-08-30\n3  title: 'Instruction to Write Text'\n4  template: post\n5  thumbnail: '../thumbnails/writing.png'\n6  slug: instruction-to-write-text\n7  categories: \n8  tags: instruction texter writer \n9  ---\n```\n\n### Headings\n\nHow to use:\n```bash\n1  # The h1 heading\n2  ## The h2 heading\n3  ### The h3 heading\n4  #### The h4 heading\n5  ##### The h5 heading\n```\n\n### Strong text\n\nHow to use: This word is `**strong**`\n\nin out:\nThis word is **strong**\n\n### Code Block\n\n```bash\n\t```javascript\n    let getMin = async (min)=> {\n    return `\n        minimal value is ${min}\n        `\n    }\n\t```\n```\nin out:\n\n```javascript\n    let getMin = async (min)=> {\n    return `\n        minimal value is ${min}\n        `\n    }\n```\n\n### Code Inline\n\n```bash\n    `test` - test option\n```\n\nin out:\n`test` - test option\n\n### Lists\n\n```bash\n\t- list disc\n\t[] list unchecked disable\n\t[x] list checked disable\n```\n\nin out:\n\n - list disc\n[] list unchecked disable\n[x] list checked disable\n\n### Table\n\n```bash\n| Name | Age | Auto | Town | Pet |\n| Bob | 17 | BMW | Baku | Fish |\n| John | 52 | Fiat | Berlin | Dog |\n| Lisa | 32 | Toyota | Frankfurt | Snake |\n| Eugen | 45 | Mazda | Dresden | Cat |\n```\n\n\n| Name | Age | Auto | Town | Pet |\n| Bob | 17 | BMW | Baku | Fish |\n| John | 52 | Fiat | Berlin | Dog |\n| Lisa | 32 | Toyota | Frankfurt | Snake |\n| Eugen | 45 | Mazda | Dresden | Cat |\n\n\n### Quoting text\n\n```bash\n    > Quote\n    > <cite> - Author </cite>\n```\n\nin out:\n> Example Quote\n> <cite> - Albert Rouge </cite>\n\n### Links\n\nYou can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:\n\n```bash\n\tThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015)  and it's an example.\n```\n\nin out:\nThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015) and it's an example.\n\n### Simple Underline decoration\n\n```bash\n    _underdash_\n```\n\nin out:\n\n_underdash_\n\n### Color Underline decoration\n\n```bash\n\tBlue.blue color\n\tGray.gray color\n\tRed.red color\n\tGreen.green color\n\tYellow.yellow color\n\tIndigo.indigo color \n\tPurple.purple color\n\tPink.pink color\n```\nin out:\n\nBlue.blue color\nGray.gray color\nRed.red color\nGreen.green color\nYellow.yellow color\nIndigo.indigo color \nPurple.purple color\nPink.pink color\n\n### Color Badges\n\n```bash\n\tBlue@blue color\n\tGray@gray color\n\tRed@red color\n\tGreen@green color\n\tYellow@yellow color\n\tIndigo@indigo color \n\tPurple@purple color\n\tPink@pink color\n```\nin out:\n\nBlue@blue color\nGray@gray color\nRed@red color\nGreen@green color\nYellow@yellow color\nIndigo@indigo color \nPurple@purple color\nPink@pink color\n\n### Ignoring Markdown formatting\n\nYou can ignore (or escape) Markdown formatting:\n\n```bash\n\\* this all text is ### unmarkable\\*\nthis is \\*unmarkable\\* text\nAbout \\*this >Quote\\*\n```\n\nin out:\n\\* this all text is ### unmarkable\\*\nthis is \\*unmarkable\\* text\nAbout \\*this >Quote\\*\n\n### Images\n\n```bash\n    ![Github_image](./images/github.png)\n```\n\nin out:\n\n![Github image](./images/github.png)\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer */ "./src/Tokenizer.ts");
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Parser */ "./src/Parser.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./src/View.ts");
/* harmony import */ var _static_styles_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./static/styles/style.css */ "./src/static/styles/style.css");
/* harmony import */ var raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! raw-loader!../content/articles/how-to-write-text.md */ "./node_modules/raw-loader/dist/cjs.js!./content/articles/how-to-write-text.md");
/**                        _       _
	  _ __ ___   __ _ _ __| | ____| | _____      ___ __
	 | '_ ` _ \ / _` | '__| |/ / _` |/ _ \ \ /\ / / '_ \
	 | | | | | | (_| | |  |   < (_| | (_) \ V  V /| | | |
	 |_| |_| |_|\__,_|_|  |_|\_\__,_|\___/ \_/\_/ |_| |_|

									 _ _
			___ ___  _ __ ___  _ __ (_) | ___ _ __
		   / __/ _ \| '_ ` _ \| '_ \| | |/ _ \ '__|
		  | (_| (_) | | | | | | |_) | | |  __/ |
		   \___\___/|_| |_| |_| .__/|_|_|\___|_|
							  |_|
 */

/**
 * We're going to write a small markdown compiler together and
 * have some strings to convert in HTML tags. 
 * We want to share it with our friends or other people.
 * So, our task looks like this:
 *
 *   MARKDOWN      HTML
 *
 *   **** ABCD     <h4>ABCD</h4>
 *   *text*        <strong>text</strong>
 *
 * And etc. Looks it easy? Yea! 
 * Sounds good! Let's go...

  /**
 * 
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   2.1 visualization ast to DOM elements
 *   3. ast    => transformer => newAstnode
 *   4. newAst => generator   => output
 */




 //put text into the textarea

var textarea = document.getElementById("textarea"); //console.log(textarea)

textarea.innerHTML = raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__["default"];
var convertBtn = document.getElementById('btn-convert');
var defaultBtn = document.getElementById('btn-default');
convertBtn.classList = "bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded";
defaultBtn.classList = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded";
defaultBtn.addEventListener('click', function handleClick() {
  textarea.value = "";
  app.innerHTML = "";
  textarea.value = raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__["default"];
  var tokenizer = new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__.Tokenizer(raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__["default"]);
  var parser = new _Parser__WEBPACK_IMPORTED_MODULE_1__.Parser(tokenizer.tokens);
  new _View__WEBPACK_IMPORTED_MODULE_2__.View(parser.ast);
});
convertBtn.addEventListener('click', function handleClick() {
  //clear old 
  var app = document.getElementById("app");
  app.innerHTML = "";
  var tokenizer = new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__.Tokenizer(textarea.value);
  var parser = new _Parser__WEBPACK_IMPORTED_MODULE_1__.Parser(tokenizer.tokens);
  new _View__WEBPACK_IMPORTED_MODULE_2__.View(parser.ast);
});
var tokenizer = new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__.Tokenizer(raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__["default"]); //console.log(tokenizer.tokens)

var parser = new _Parser__WEBPACK_IMPORTED_MODULE_1__.Parser(tokenizer.tokens); //console.log(parser.ast)

new _View__WEBPACK_IMPORTED_MODULE_2__.View(parser.ast); //let newAst = transformer(ast);
//let output = codeGenerator(newAst);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQWdCLEVBQWhCO0VBQ0F3QyxRQUFRLENBQUNsSSxLQUFULEdBQWlCaUksd0ZBQWpCO0VBRUEsSUFBTVEsU0FBUyxHQUFHLElBQUl2RyxpREFBSixDQUFjK0Ysd0ZBQWQsQ0FBbEI7RUFDQSxJQUFNUyxNQUFNLEdBQUcsSUFBSXZKLDJDQUFKLENBQVdzSixTQUFTLENBQUNySixNQUFyQixDQUFmO0VBQ0EsSUFBSXFGLHVDQUFKLENBQVNpRSxNQUFNLENBQUNySixHQUFoQjtBQUVBLENBVkQ7QUFZQThJLFVBQVUsQ0FBQ0csZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsU0FBU0MsV0FBVCxHQUF1QjtFQUUzRDtFQUNBLElBQUlDLEdBQUcsR0FBRzVDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUF4QixDQUFWO0VBQ0EyQyxHQUFHLENBQUM5QyxTQUFKLEdBQWdCLEVBQWhCO0VBRUEsSUFBTStDLFNBQVMsR0FBRyxJQUFJdkcsaURBQUosQ0FBY2dHLFFBQVEsQ0FBQ2xJLEtBQXZCLENBQWxCO0VBQ0EsSUFBTTBJLE1BQU0sR0FBRyxJQUFJdkosMkNBQUosQ0FBV3NKLFNBQVMsQ0FBQ3JKLE1BQXJCLENBQWY7RUFDQSxJQUFJcUYsdUNBQUosQ0FBU2lFLE1BQU0sQ0FBQ3JKLEdBQWhCO0FBRUEsQ0FWRDtBQVlBLElBQU1vSixTQUFTLEdBQUcsSUFBSXZHLGlEQUFKLENBQWMrRix3RkFBZCxDQUFsQixFQUNBOztBQUNBLElBQU1TLE1BQU0sR0FBRyxJQUFJdkosMkNBQUosQ0FBV3NKLFNBQVMsQ0FBQ3JKLE1BQXJCLENBQWYsRUFDQTs7QUFDQSxJQUFJcUYsdUNBQUosQ0FBU2lFLE1BQU0sQ0FBQ3JKLEdBQWhCLEdBR0M7QUFDQSxxQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL0NhcHRpb24udHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvR3JhbW1hci50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9QYXJzZXIudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvVG9rZW5pemVyLnRzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9DYXB0aW9uSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0NvZGVCbG9ja0hUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9Eb21VdGlsaXRlcy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0hlYWRlckhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9MaXN0SFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9RdW90ZUhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9UYWJsZUhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvc3RhdGljL3N0eWxlcy9wcmlzbS5jc3M/ZGVhNyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9zdGF0aWMvc3R5bGVzL3F1b3RlLmNzcz8wYWY0Iiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzPzg1ODciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL2NvbnRlbnQvYXJ0aWNsZXMvaG93LXRvLXdyaXRlLXRleHQubWQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwic3RyaW5nXCJcbmltcG9ydCB7IEdyYW1tYXIgfSBmcm9tIFwiLi9HcmFtbWFyXCJcbmltcG9ydCB7Y2FwdGlvblRva2VufSBmcm9tIFwiLi9Ub2tlblwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIENhcHRpb24ge1xuXG5cdHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IodGV4dDogc3RyaW5nKSB7XG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0fVxuXG5cdHB1YmxpYyBnZXQoKTogY2FwdGlvblRva2VuIHtcblxuXHRcdGNvbnN0IGNhcHRpb24gPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ0FQVElPTik7XG5cblx0XHRcdGNvbnN0IHRva2VuID0ge30gYXMgY2FwdGlvblRva2VuO1xuXG5cdFx0XHR0b2tlbi50eXBlID0gVG9rZW5UeXBlLkNBUFRJT05cblx0XHRcdHRva2VuLnJvdyA9IGNhcHRpb25bMF07XG5cdFx0XHR0b2tlbi5kYXRlID0gY2FwdGlvblsxXTtcblx0XHRcdHRva2VuLnRpdGxlID0gIGNhcHRpb25bM107XG5cdFx0XHR0b2tlbi50ZW1wbGF0ZSA9ICBjYXB0aW9uWzVdO1xuXHRcdFx0dG9rZW4udGh1bWJuYWlsID0gIGNhcHRpb25bN107XG5cdFx0XHR0b2tlbi5zbHVnID0gIGNhcHRpb25bOV07XG5cdFx0XHR0b2tlbi5jYXRlZ29yaWVzID0gY2FwdGlvblsxMV07XG5cdFx0XHR0b2tlbi50YWdzID0gIGNhcHRpb25bMTNdO1xuXG5cdFx0XHQvL3JlbW92ZSBjYXB0aW9uIGZyb20gdGhlIHRleHRcblx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKEdyYW1tYXIuQkxPQ0tTLkNBUFRJT04sIFwiXCIpO1xuXG5cdFx0XHRyZXR1cm4gdG9rZW47XG5cdFx0XG5cdH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgR3JhbW1hcntcblxuXHRwdWJsaWMgc3RhdGljIEJMT0NLUyA9IHtcblx0XHRcblx0XHRIRUFESU5HIDogLygjezEsNX0pKCguKj8pKykvLFxuXG5cdFx0Q0FQVElPTiA6IC9eLS0tXFxzZGF0ZTooKC4qKSlcXHN0aXRsZTooKC4qKSlcXHN0ZW1wbGF0ZTooKC4qKSlcXHN0aHVtYm5haWw6KCguKikpXFxzc2x1ZzooKC4qKSlcXHNjYXRlZ29yaWVzOigoLiopKVxcc3RhZ3M6KCguKikpXFxzLS0tLyxcblx0XHRcblx0XHRTUEFDRSA6IC8gLyxcblx0XHRMSU5FIDogL1xcbi8sXG5cblx0XHRDT0xPUjogLygoLj8pW15cXHNdKylcXC4oYmx1ZXxncmF5fHJlZHxncmVlbnx5ZWxsb3d8aW5kaWdvfHB1cnBsZXxwaW5rKS8sXG5cdFx0QkFER0U6IC8oKC4/KVteXFxzXSspXFxAKGJsdWV8Z3JheXxyZWR8Z3JlZW58eWVsbG93fGluZGlnb3xwdXJwbGV8cGluaykvLFxuXG5cdFx0TElTVCA6IC8oXFwtfFxcW1xcXXxcXFtcXHhcXF0pXFxzKCguKikpLyxcblx0XHRcblx0XHRDT0RFX0JMT0NLIDogL2BgYChiYXNofGphdmFzY3JpcHQpKC4qP1xccylgYGAvcyxcblx0XHRDT0RFX0lOX0NPREUgOiAvYGBgKGJhc2h8amF2YXNjcmlwdCkoKFxccy4qKWBgYClcXHMqYGBgXFxzL3MsXG5cdFx0SU5MSU5FX0NPREUgOiAvKC4qKWAoLiopYCguKikvLFxuXG5cdFx0UVVPVEU6IC8+KC4qKVxccz4uPGNpdGU+KC4qKTxcXC9jaXRlPi8sXG5cdFx0XG5cdFx0TElOSyA6IC8oLiopW14hXVxcWyguKj8pXFxdXFwoKC4qKVxcKSguKikvLFxuXHRcdElNQUdFIDogLyguKikhXFxbKC4qPylcXF1cXCgoLiopXFwpKC4qKS8sXG5cblx0XHRVTkRFUl9MSU5FIDogLyguKilfKC4qKV8oLiopLyxcblx0XHRVTk1BUktBQkxFIDogLyguKilcXFxcXFwqKC4qKVxcXFxcXCooLiopLyxcblx0XHRTVFJPTkcgOiAvKC4qKVxcKlxcKiguKilcXCpcXCooLiopLyxcblxuXHRcdF9UQUJMRSA6IC8oKC4qKVxcbigoXFx8W1xcd1xcZFxcc10rKStcXHwpXFxuKC4qKSkvLFxuXHRcdFRBQkxFIDogLygoXFx8W1xcd1xcZFxcc10rKStcXHwpJC9cblx0XHRcblx0fVxufVxuIiwiaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbnR5cGUgQVNUID0ge1xuXHR0eXBlOiBzdHJpbmcsXG5cdGNoaWxkcmVuPzogYW55W11cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlciB7XG5cblx0cHVibGljIHRva2VucyA9ICBbXSBhcyAoVG9rZW4uYmFnZGVUb2tlbiB8IFRva2VuLmNhcHRpb25Ub2tlbiB8IFRva2VuLmNvZGVCbG9ja1Rva2VuIHxcblx0XHRUb2tlbi5jb2RlSW5saW5lVG9rZW4gfCBUb2tlbi5jb2xvclRleHRUb2tlbiB8IFRva2VuLmhlYWRUb2tlbiB8IFRva2VuLmltYWdlVG9rZW4gfFxuXHRcdFRva2VuLmxpbmtUb2tlbiB8IFRva2VuLmxpc3RUb2tlbiB8IFRva2VuLnBhcmFncmFwaEVuZFRva2VuIHwgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbiB8XG5cdFx0VG9rZW4ucXVvdGVUb2tlbiB8IFRva2VuLnN0cm9uZ1RleHRUb2tlbiB8IFRva2VuLnRleHRUb2tlbiB8IFRva2VuLnVuZGVyTGluZVRva2VuIHxcblx0XHRUb2tlbi51bmtub3duVGV4dFRva2VuIHwgVG9rZW4uY29kZUluQ29kZVRva2VuIHwgVG9rZW4udGFibGVUb2tlbilbXTtcblx0XG5cdHB1YmxpYyBhc3Q6IEFTVDtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbnMpIHtcblx0XHRcblx0XHR0aGlzLnRva2VucyA9IHRva2Vucztcblx0XHR0aGlzLmFzdCA9IHtcblx0XHRcdHR5cGU6IFwiRG9jdW1lbnRcIixcblx0XHRcdGNoaWxkcmVuOiBbXVxuXHRcdH07XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCk6dm9pZCB7XG5cblx0XHRsZXQgdG9rZW5fbnVtYmVyOiBudW1iZXI7XG5cdFx0dG9rZW5fbnVtYmVyID0gMDtcblx0XHRsZXQgaXNQYXJhZ3JhcGg6IGJvb2xlYW47XG5cdFx0aXNQYXJhZ3JhcGggPSBmYWxzZTtcblx0XHRcblx0XHRjb25zdCBjaGlsZHJlbiA6IGFueSA9IHRoaXMuYXN0LmNoaWxkcmVuO1xuXG5cdFx0d2hpbGUgKHRva2VuX251bWJlciA8IHRoaXMudG9rZW5zLmxlbmd0aCkge1xuXG5cdFx0XHRjb25zdCB0b2tlbiA6IGFueSA9IHRoaXMudG9rZW5zW3Rva2VuX251bWJlcl07XG5cblx0XHRcdC8vIENhcHRpb25cblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuQ0FQVElPTikge1xuXHRcdFx0XHRjb25zdCBjYXB0aW9uRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5jYXB0aW9uVG9rZW47XG5cdFx0XHRcdGNhcHRpb25FbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuQ0FQVElPTjsgXG5cdFx0XHRcdGNhcHRpb25FbGVtZW50LnJvdyA9IHRva2VuLnJvdztcblx0XHRcdFx0Y2FwdGlvbkVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJDYXB0aW9uXCIsXG5cdFx0XHRcdFx0XHRkYXRlOiB0b2tlbi5kYXRlLFxuXHRcdFx0XHRcdFx0dGl0bGU6IHRva2VuLnRpdGxlLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IHRva2VuLnRlbXBsYXRlLFxuXHRcdFx0XHRcdFx0dGh1bWJuYWlsOiB0b2tlbi50aHVtYm5haWwsXG5cdFx0XHRcdFx0XHRzbHVnOiB0b2tlbi5zbHVnLFxuXHRcdFx0XHRcdFx0Y2F0ZWdvcmllczogdG9rZW4uY2F0ZWdvcmllcyxcblx0XHRcdFx0XHRcdHRhZ3M6IHRva2VuLnRhZ3Ncblx0XHRcdFx0XHR9XG5cdFx0XHRcdF07XG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGNhcHRpb25FbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIyBkZXB0PTFcblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuSEVBRElOR19GSVJTVCkge1xuXHRcdFx0XHRjb25zdCBoZWFkRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5oZWFkVG9rZW47XG5cdFx0XHRcdGhlYWRFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuSEVBRElORztcblx0XHRcdFx0aGVhZEVsZW1lbnQuZGVwdCA9IDE7XG5cdFx0XHRcdGhlYWRFbGVtZW50LnJvdyA9IFwiI1wiICsgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlblR5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goaGVhZEVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAjIyBkZXB0ID0gMlxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX1NFQ09ORCkge1xuXHRcdFx0XHRjb25zdCBoZWFkRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5oZWFkVG9rZW47XG5cdFx0XHRcdGhlYWRFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuSEVBRElORztcblx0XHRcdFx0aGVhZEVsZW1lbnQuZGVwdCA9IDI7XG5cdFx0XHRcdGhlYWRFbGVtZW50LnJvdyA9IFwiIyNcIiArIHRva2VuLnZhbHVlO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5jaGlsZHJlbiA9IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5UeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGhlYWRFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIyMjIGRlcHQgPSAzXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gVG9rZW5UeXBlLkhFQURJTkdfVEhJUkQpIHtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gMztcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjIyNcIiArIHRva2VuLnZhbHVlO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5jaGlsZHJlbiA9IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5UeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGhlYWRFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIyMjIyBkZXB0ID0gNFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX0ZPUlRIKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gNDtcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjIyMjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vICMjIyMjIGRlcHQgPSA1XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gVG9rZW5UeXBlLkhFQURJTkdfRklGVEgpIHtcblx0XHRcdFx0Y29uc3QgaGVhZEVsZW1lbnQgPSAge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRoZWFkRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkhFQURJTkc7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmRlcHQgPSA1O1xuXHRcdFx0XHRoZWFkRWxlbWVudC5yb3cgPSBcIiMjIyMjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdFxuXG5cdFx0XHQvL0NvZGVJbkNvZGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOX0NPREUpIHtcblxuXHRcdFx0XHRjb25zdCBjb2RlSW5Db2RlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5jb2RlSW5Db2RlVG9rZW47XG5cdFx0XHRcdGNvZGVJbkNvZGVFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuQ09ERV9JTl9DT0RFO1xuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC5yb3cgPSBcImBgYFwiK3Rva2VuLmxhbmd1YWdlICsgXCJcXG5cIiArIHRva2VuLmNvZGUgKyBcIlxcbmBgYFwiO1xuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC5jb2RlID0gdG9rZW4uY29kZTtcblx0XHRcdFx0Y29kZUluQ29kZUVsZW1lbnQubGFuZ3VhZ2UgPSB0b2tlbi5sYW5ndWFnZVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjb2RlSW5Db2RlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vQ29kZUJsb2NrXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuQ09ERV9CTE9DSykge1xuXG5cdFx0XHRcdGNvbnN0IGNvZGVCbG9ja0VsZW1lbnQgPSAge30gYXMgVG9rZW4uY29kZUJsb2NrVG9rZW47XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5DT0RFX0JMT0NLO1xuXHRcdFx0XHRjb2RlQmxvY2tFbGVtZW50LnJvdyA9IFwiYGBgXCIrdG9rZW4ubGFuZ3VhZ2UgKyBcIlxcblwiICsgdG9rZW4uY29kZSArIFwiXFxuYGBgXCI7XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQuY29kZSA9IHRva2VuLmNvZGU7XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQubGFuZ3VhZ2UgPSB0b2tlbi5sYW5ndWFnZVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjb2RlQmxvY2tFbGVtZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XG5cblx0XHRcdC8vUXVvdGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5RVU9URSkge1xuXG5cdFx0XHRcdGNvbnN0IHF1b3RlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5xdW90ZVRva2VuO1xuXHRcdFx0XHRxdW90ZUVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5RVU9URTtcblx0XHRcdFx0cXVvdGVFbGVtZW50LnJvdyA9IFwiPlwiICsgdG9rZW4ucXVvdGUgKyBcIlxcbj4gPGNpdGU+IC0gXCIgKyB0b2tlbi5hdXRob3IgKyBcIjwvY2l0ZT5cIjtcblx0XHRcdFx0cXVvdGVFbGVtZW50LnF1b3RlID0gdG9rZW4ucXVvdGU7XG5cdFx0XHRcdHF1b3RlRWxlbWVudC5hdXRob3IgPSB0b2tlbi5hdXRob3I7XG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKHF1b3RlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vTGlzdFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkxJU1QpIHtcblx0XHRcdFx0Y29uc3QgbGlzdEVsZW1lbnQgPSAge30gYXMgVG9rZW4ubGlzdFRva2VuO1xuXHRcdFx0XHRsaXN0RWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkxJU1Q7XG5cdFx0XHRcdGxpc3RFbGVtZW50LmF0dHJpYnV0ZSA9IHRva2VuLmF0dHJpYnV0ZTtcblx0XHRcdFx0bGlzdEVsZW1lbnQucm93ID0gdG9rZW4uYXR0cmlidXRlICsgXCIgXCIrdG9rZW4udmFsdWU7XG5cdFx0XHRcdGxpc3RFbGVtZW50LnZhbHVlID0gdG9rZW4udmFsdWU7IFxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChsaXN0RWxlbWVudClcblx0XHRcdH1cblxuXHRcdFx0Ly9UYWJsZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlRBQkxFKSB7XG5cdFx0XHRcdGNvbnN0IHRhYmxlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi50YWJsZVRva2VuO1xuXHRcdFx0XHR0YWJsZUVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5UQUJMRTtcblx0XHRcdFx0dGFibGVFbGVtZW50LnJvdyA9IHRva2VuLnJvdztcblx0XHRcdFx0dGFibGVFbGVtZW50LmNoaWxkcmVuID0gdG9rZW4uY2hpbGRyZW47XG5cblx0XHRcdFx0Y2hpbGRyZW4ucHVzaCh0YWJsZUVsZW1lbnQpXG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9TdGFydCBhbGwgdGhhdCBpbiB0aGUgcGFyYWdyYXBoIGNhbiB1c2Vcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5QQVJBR1JBUEhfU1RBUlQpIHtcblx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRFbGVtZW50ID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRcdFx0cGFyYWdyYXBoU3RhcnRFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIO1xuXHRcdFx0XHRwYXJhZ3JhcGhTdGFydEVsZW1lbnQuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0cGFyYWdyYXBoU3RhcnRFbGVtZW50LnJvdyA9IFwiXCI7XG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKHBhcmFncmFwaFN0YXJ0RWxlbWVudCk7XG5cdFx0XHRcdGlzUGFyYWdyYXBoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSF9FTkQpIHtcblx0XHRcdFx0aXNQYXJhZ3JhcGggPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly9MaW5rXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuTElOSykge1xuXHRcdFx0XHRjb25zdCBsaW5rRWxlbWVudCA9IHt9IGFzIFRva2VuLmxpbmtUb2tlbjtcblx0XHRcdFx0bGlua0VsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5MSU5LO1xuXHRcdFx0XHRsaW5rRWxlbWVudC5uYW1lID0gdG9rZW4ubmFtZTtcblx0XHRcdFx0bGlua0VsZW1lbnQudXJsID0gdG9rZW4udXJsO1xuXHRcdFx0XHRsaW5rRWxlbWVudC5yb3cgPSBcIltcIiArIHRva2VuLm5hbWUgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2gobGlua0VsZW1lbnQpXG5cdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyBcIltcIiArIHRva2VuLm5hbWUgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2gobGlua0VsZW1lbnQpXG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXG5cdFx0XHQvL0ltYWdlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkltYWdlXCIgJiYgaXNQYXJhZ3JhcGggPT0gdHJ1ZSkge1xuXHRcdFx0XHRjb25zdCBpbWFnZVRva2VuID0ge30gYXMgVG9rZW4uaW1hZ2VUb2tlbjtcblx0XHRcdFx0aW1hZ2VUb2tlbi50eXBlID0gVG9rZW5UeXBlLklNQUdFO1xuXHRcdFx0XHRpbWFnZVRva2VuLmFsdCA9IHRva2VuLmFsdDtcblx0XHRcdFx0aW1hZ2VUb2tlbi51cmwgPSB0b2tlbi51cmw7XG5cdFx0XHRcdGltYWdlVG9rZW4ucm93ID0gXCIhW1wiICsgdG9rZW4uYWx0ICsgXCJdKFwiICsgdG9rZW4udXJsICsgXCIpXCJcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0XHRjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGltYWdlVG9rZW4pXG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIFwiW1wiICsgdG9rZW4uYWx0ICsgXCJdKFwiICsgdG9rZW4udXJsICsgXCIpXCJcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGltYWdlVG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGV4dFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlRFWFQpIHtcblx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHR0ZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHR0ZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0dGV4dFRva2VuLnJvdyA9IHRva2VuLnZhbHVlXG5cblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKHRleHRUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHRleHRUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH1cblxuXHRcdFx0Ly8gVW5tYXJrYWJsZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlVOTUFSS0FCTEUpIHtcblx0XHRcdFx0Y29uc3QgdW5tYXJrYWJsZVRleHRUb2tlbiA9IHt9IGFzIFRva2VuLnVubWFya2FibGVUb2tlbjtcblx0XHRcdFx0dW5tYXJrYWJsZVRleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlVOTUFSS0FCTEU7XG5cdFx0XHRcdHVubWFya2FibGVUZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0dW5tYXJrYWJsZVRleHRUb2tlbi5yb3cgPSBcIlxcXFxcIiArIHRva2VuLnZhbHVlICsgXCJcXFxcXCI7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2godW5tYXJrYWJsZVRleHRUb2tlbilcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHVubWFya2FibGVUZXh0VG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XG5cdFxuXG5cdFx0XHQvLyBTdHJvbmdcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5TVFJPTkcpIHtcblx0XHRcdFx0Y29uc3Qgc3Ryb25nVGV4dFRva2VuID0ge30gYXMgVG9rZW4uc3Ryb25nVGV4dFRva2VuXG5cdFx0XHRcdHN0cm9uZ1RleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlNUUk9ORztcblx0XHRcdFx0c3Ryb25nVGV4dFRva2VuLnZhbHVlID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdHN0cm9uZ1RleHRUb2tlbi5yb3cgPSBcIioqXCIgKyB0b2tlbi52YWx1ZSArIFwiKitcIlxuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKHN0cm9uZ1RleHRUb2tlbilcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHN0cm9uZ1RleHRUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0fVx0XG5cblx0XHRcdC8vIENvbG9yIHRleHRcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiQ29sb3JcIikge1xuXG5cdFx0XHRcdGNvbnN0IGNvbG9yVGV4dFRva2VuID0ge30gYXMgVG9rZW4uY29sb3JUZXh0VG9rZW47XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuQ09MT1I7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLmNvbG9yID0gdG9rZW4uY29sb3I7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnZhbHVlID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnJvdyA9IHRva2VuLnZhbHVlICsgXCIuXCIgKyB0b2tlbi5jb2xvcjtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChjb2xvclRleHRUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlICtcIi5cIit0b2tlbi5jb2xvciBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGNvbG9yVGV4dFRva2VuKVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbG9yIGJhZGdlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkJhZGdlXCIpIHtcblxuXHRcdFx0XHRjb25zdCBiYWRnZVRva2VuID0ge30gYXMgVG9rZW4uYmFnZGVUb2tlbjtcblx0XHRcdFx0YmFkZ2VUb2tlbi50eXBlID0gVG9rZW5UeXBlLkJBREdFO1xuXHRcdFx0XHRiYWRnZVRva2VuLmNvbG9yID0gdG9rZW4uY29sb3I7XG5cdFx0XHRcdGJhZGdlVG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0YmFkZ2VUb2tlbi5yb3cgPSB0b2tlbi52YWx1ZSArIFwiQFwiICsgdG9rZW4uY29sb3I7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goYmFkZ2VUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlICtcIkBcIit0b2tlbi5jb2xvciBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGJhZGdlVG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdC8vIElubGluZUNvZGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOTElORSkge1xuXHRcdFx0XHRcblx0XHRcdFx0Y29uc3QgaW5saW5lQ29kZUVsZW1lbnQgPSB7fSBhcyBUb2tlbi5jb2RlSW5saW5lVG9rZW47XG5cdFx0XHRcdGlubGluZUNvZGVFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuQ09ERV9JTkxJTkU7XG5cdFx0XHRcdGlubGluZUNvZGVFbGVtZW50LnZhbHVlID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdGlubGluZUNvZGVFbGVtZW50LnJvdyA9IHRva2VuLnZhbHVlO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGlubGluZUNvZGVFbGVtZW50KVxuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGRyZW4ucHVzaChpbmxpbmVDb2RlRWxlbWVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVW5kZXJMaW5lXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVU5ERVJfTElORSkge1xuXHRcdFx0XHRjb25zdCB1bmRlckxpbmVFbGVtZW50ID0ge30gYXMgVG9rZW4udW5kZXJMaW5lVG9rZW47XG5cdFx0XHRcdHVuZGVyTGluZUVsZW1lbnQudHlwZSA9ICBUb2tlblR5cGUuVU5ERVJfTElORTtcblx0XHRcdFx0dW5kZXJMaW5lRWxlbWVudC52YWx1ZSA9ICB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKHVuZGVyTGluZUVsZW1lbnQpXG5cdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHVuZGVyTGluZUVsZW1lbnQpXG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXG5cblx0XHRcdHRva2VuX251bWJlcisrO1xuXG5cdFx0fVxuXG5cblx0fVxufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHsgR3JhbW1hciB9IGZyb20gXCIuL0dyYW1tYXJcIlxuaW1wb3J0IHsgQ2FwdGlvbiB9IGZyb20gXCIuL0NhcHRpb25cIlxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbi8qKlxuICogXG4gKi9cblxuZXhwb3J0IGNsYXNzIFRva2VuaXplciB7XG5cblx0cHVibGljIHRva2VucyA9ICBbXSBhcyAoVG9rZW4uYmFnZGVUb2tlbiB8IFRva2VuLmNhcHRpb25Ub2tlbiB8IFRva2VuLmNvZGVCbG9ja1Rva2VuIHxcblx0XHRUb2tlbi5jb2RlSW5saW5lVG9rZW4gfCBUb2tlbi5jb2xvclRleHRUb2tlbiB8IFRva2VuLmhlYWRUb2tlbiB8IFRva2VuLmltYWdlVG9rZW4gfFxuXHRcdFRva2VuLmxpbmtUb2tlbiB8IFRva2VuLmxpc3RUb2tlbiB8IFRva2VuLnBhcmFncmFwaEVuZFRva2VuIHwgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbiB8XG5cdFx0VG9rZW4ucXVvdGVUb2tlbiB8IFRva2VuLnN0cm9uZ1RleHRUb2tlbiB8IFRva2VuLnRleHRUb2tlbiB8IFRva2VuLnVuZGVyTGluZVRva2VuIHxcblx0XHRUb2tlbi51bmtub3duVGV4dFRva2VuIHwgVG9rZW4uY29kZUluQ29kZVRva2VuIHwgVG9rZW4udW5tYXJrYWJsZVRva2VuIHwgVG9rZW4udGFibGVUb2tlbilbXTtcblx0XG5cdHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG5cdHB1YmxpYyB3b3JkczogQXJyYXk8c3RyaW5nPjtcblx0cHJpdmF0ZSB3b3JkX251bWJlcjogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xuXG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0XHR0aGlzLnRva2VucyA9IFtdO1xuXHRcdHRoaXMud29yZF9udW1iZXIgPSAwO1xuXHRcdHRoaXMud29yZHMgPSBbXTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cblx0cHJpdmF0ZSBpbml0ID0gKCk6IHZvaWQgPT4ge1xuXG5cdFx0Ly9hZGQgY2FwdGlvblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ0FQVElPTikgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCBjYXB0aW9uID0gbmV3IENhcHRpb24odGhpcy50ZXh0KTtcblx0XHRcdGxldCB0b2tlbiA9IHt9IGFzIFRva2VuLmNhcHRpb25Ub2tlbjtcblx0XHRcdHRva2VuID0gY2FwdGlvbi5nZXQoKTtcblx0XHRcdHRoaXMudGV4dCA9IGNhcHRpb24udGV4dDsvL3JlbW92ZSBjYXB0aW9uIGZyb20gYXJ0aWNsZVxuXHRcdFx0dGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG5cblx0XHR9XG5cblxuXHRcdC8vc3BsaXQgYnkgc3BhY2Vcblx0XHR0aGlzLndvcmRzID0gdGhpcy50ZXh0LnNwbGl0KEdyYW1tYXIuQkxPQ0tTLlNQQUNFKTtcblxuXHRcdGxldCBvdXQgPSBcIlwiO1xuXG5cdFx0LyoqXG5cdFx0ICogTE9PUFMgZm9yIG11bHRpcGxlIGxpbmUgYmxvY2tzOlxuXHRcdCAqICAtIENPREVCTE9DS1xuXHRcdCAqICAtIENPREVcblx0XHQgKiAgLSBRVU9URVxuXHRcdCAqICAtIFRBQkxFXG5cdFx0ICovXG5cblx0XHR0aGlzLndvcmRfbnVtYmVyID0gMDtcblxuXHRcdGxvb3Bfd29yZDogd2hpbGUgKHRoaXMud29yZF9udW1iZXIgPCB0aGlzLndvcmRzLmxlbmd0aCkge1xuXG5cdFx0XHRvdXQgPSBvdXQgKyBcIiBcIiArICh0aGlzLndvcmRzW3RoaXMud29yZF9udW1iZXJdKTtcblxuXHRcdFx0Ly9pbiB0aGUgZW5kIG9mIGFydGljbGVcblx0XHRcdGlmICh0aGlzLndvcmRfbnVtYmVyID09IHRoaXMud29yZHMubGVuZ3RoIC0gMSkge1xuXG5cdFx0XHRcdGNvbnN0IHRva2VuID0gIHt9IGFzIFRva2VuLnVua25vd25UZXh0VG9rZW47XG5cdFx0XHRcdHRva2VuLnR5cGUgPSBUb2tlblR5cGUuVU5LTk9XTl9URVhUO1xuXHRcdFx0XHR0b2tlbi52YWx1ZSA9IG91dDtcblx0XHRcdFx0dGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG5cblx0XHRcdFx0dGhpcy53b3JkX251bWJlcisrO1xuXHRcdFx0XHRjb250aW51ZSBsb29wX3dvcmQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9DT0RFX0lOX0NPREUgYmxvY2tcblx0XHRcdGlmIChvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERV9JTl9DT0RFKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0Y29uc3QgcmVzdDogc3RyaW5nID0gb3V0LnJlcGxhY2UoR3JhbW1hci5CTE9DS1MuQ09ERV9JTl9DT0RFLCBcIiZjb2RlSW5Db2RlJlwiKTtcblx0XHRcdFx0Y29uc3QgYXJyID0gcmVzdC5zcGxpdChcIiZjb2RlSW5Db2RlJlwiKVxuXG5cdFx0XHRcdC8vYmxvY2sgYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHVua25vd25Ub2tlbiA9IHt9IGFzIFRva2VuLnVua25vd25UZXh0VG9rZW47XG5cdFx0XHRcdHVua25vd25Ub2tlbi50eXBlID0gVG9rZW5UeXBlLlVOS05PV05fVEVYVDtcblx0XHRcdFx0dW5rbm93blRva2VuLnZhbHVlID0gYXJyWzBdO1xuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHVua25vd25Ub2tlbik7XG5cblx0XHRcdFx0Ly9mb3VuZGVkIGJsb2NrXG5cdFx0XHRcdGNvbnN0IGNvZGVUb2tlbiA9IHt9IGFzICBUb2tlbi5jb2RlSW5Db2RlVG9rZW47XG5cdFx0XHRcdGNvZGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLkNPREVfSU5fQ09ERTtcblx0XHRcdFx0Y29kZVRva2VuLmNvZGUgPSBvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERV9JTl9DT0RFKVsyXTtcblx0XHRcdFx0Y29kZVRva2VuLmxhbmd1YWdlID0gb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfSU5fQ09ERSlbMV07XG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2goY29kZVRva2VuKTtcblxuXHRcdFx0XHQvL2Jsb2NrIGFmdGVyIFxuXHRcdFx0XHRvdXQgPSBhcnJbMV07XG5cdFx0XHRcdHRoaXMud29yZF9udW1iZXIrKztcblx0XHRcdFx0Y29udGludWUgbG9vcF93b3JkO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8vQ09ERVxuXHRcdFx0aWYgKG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLKSAhPSBudWxsICYmXG5cdFx0XHRcdG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLKVsyXS5sZW5ndGggPiA1IC8vYmVjYXVzZSB2YWx1ZSBpcyBub3QgbGVzcyB0aGVuIDUgc3ltYm9scy4uLml0cyBDT0RFQkxPQ0tcblx0XHRcdCkge1xuXG5cdFx0XHRcdGNvbnN0IHJlc3Q6IHN0cmluZyA9IG91dC5yZXBsYWNlKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0ssIFwiJmNvZGVibG9jayZcIik7XG5cdFx0XHRcdGNvbnN0IGFyciA9IHJlc3Quc3BsaXQoXCImY29kZWJsb2NrJlwiKVxuXG5cblx0XHRcdFx0Ly9ibG9jayBiZWZvcmVcblx0XHRcdFx0Y29uc3QgdW5rbm93blRleHRUb2tlbiA9IHt9IGFzICBUb2tlbi51bmtub3duVGV4dFRva2VuO1xuXHRcdFx0XHR1bmtub3duVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuVU5LTk9XTl9URVhUO1xuXHRcdFx0XHR1bmtub3duVGV4dFRva2VuLnZhbHVlID0gYXJyWzBdO1xuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHVua25vd25UZXh0VG9rZW4pO1xuXG5cdFx0XHRcdC8vZm91bmRlZCBibG9ja1xuXHRcdFx0XHRjb25zdCBjb2RlVG9rZW4gPSB7fSBhcyAgVG9rZW4uY29kZUJsb2NrVG9rZW47XG5cdFx0XHRcdGNvZGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLkNPREVfQkxPQ0s7XG5cdFx0XHRcdGNvZGVUb2tlbi5jb2RlID0gb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0spWzJdO1xuXHRcdFx0XHRjb2RlVG9rZW4ubGFuZ3VhZ2UgPSBvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERV9CTE9DSylbMV07XG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2goY29kZVRva2VuKTtcblxuXHRcdFx0XHQvL2Jsb2NrIGFmdGVyXG5cdFx0XHRcdG91dCA9IGFyclsxXTtcblx0XHRcdFx0dGhpcy53b3JkX251bWJlcisrO1xuXHRcdFx0XHRjb250aW51ZSBsb29wX3dvcmQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vUVVPVEVcblx0XHRcdGlmIChvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuUVVPVEUpICE9IG51bGwpIHtcblxuXHRcdFx0XHRjb25zdCByZXN0OiBzdHJpbmcgPSBvdXQucmVwbGFjZShHcmFtbWFyLkJMT0NLUy5RVU9URSwgXCImcXVvdGUmXCIpO1xuXHRcdFx0XHRjb25zdCBhcnIgPSByZXN0LnNwbGl0KFwiJnF1b3RlJlwiKVxuXG5cblx0XHRcdFx0Ly9ibG9jayBiZWZvcmVcblx0XHRcdFx0Y29uc3QgdW5rbm93blRva2VuID0ge30gYXMgIFRva2VuLnVua25vd25UZXh0VG9rZW47XG5cdFx0XHRcdHVua25vd25Ub2tlbi50eXBlID0gVG9rZW5UeXBlLlVOS05PV05fVEVYVDtcblx0XHRcdFx0dW5rbm93blRva2VuLnZhbHVlID0gYXJyWzBdO1xuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHVua25vd25Ub2tlbik7XG5cblx0XHRcdFx0Ly9mb3VuZGVkIGJsb2NrXG5cdFx0XHRcdGNvbnN0IHF1b3RlVG9rZW4gPSB7fSBhcyAgVG9rZW4ucXVvdGVUb2tlbjtcblx0XHRcdFx0cXVvdGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlFVT1RFO1xuXHRcdFx0XHRxdW90ZVRva2VuLnJvdyA9IG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URSlbMF07XG5cdFx0XHRcdHF1b3RlVG9rZW4ucXVvdGUgPSBvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuUVVPVEUpWzFdO1xuXHRcdFx0XHRxdW90ZVRva2VuLmF1dGhvciA9IG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URSlbMl07XG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2gocXVvdGVUb2tlbik7XG5cblx0XHRcdFx0Ly9hZnRlciBibG9ja1xuXHRcdFx0XHRvdXQgPSBhcnJbMV07XG5cdFx0XHRcdHRoaXMud29yZF9udW1iZXIrKztcblx0XHRcdFx0Y29udGludWUgbG9vcF93b3JkO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLndvcmRfbnVtYmVyKys7XG5cblx0XHR9XG5cblxuXHRcdC8vIExPT1BTIFVOS05PV05fVEVYVCBUTyBERUZJTkUgT1RIRVIgVE9LRU5TOlxuXG5cdFx0Y29uc3QgaXRva2VucyA9IFtdIGFzICBBcnJheTxUb2tlbi5iYWdkZVRva2VuIHwgVG9rZW4uY2FwdGlvblRva2VuIHwgVG9rZW4uY29kZUJsb2NrVG9rZW4gfFxuXHRcdFx0VG9rZW4uY29kZUlubGluZVRva2VuIHwgVG9rZW4uY29sb3JUZXh0VG9rZW4gfCBUb2tlbi5oZWFkVG9rZW4gfCBUb2tlbi5pbWFnZVRva2VuIHxcblx0XHRcdFRva2VuLmxpbmtUb2tlbiB8IFRva2VuLmxpc3RUb2tlbiB8IFRva2VuLnBhcmFncmFwaEVuZFRva2VuIHwgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbiB8XG5cdFx0XHRUb2tlbi5xdW90ZVRva2VuIHwgVG9rZW4uc3Ryb25nVGV4dFRva2VuIHwgVG9rZW4udGV4dFRva2VuIHwgVG9rZW4udW5kZXJMaW5lVG9rZW4gfFxuXHRcdFx0VG9rZW4udW5rbm93blRleHRUb2tlbiB8IFRva2VuLmNvZGVJbkNvZGVUb2tlbiB8IFRva2VuLnVubWFya2FibGVUb2tlbiB8IFRva2VuLnRhYmxlVG9rZW4gPjtcblxuXG5cdFx0dGhpcy50b2tlbnMuZm9yRWFjaCgodG9rZW46IGFueSkgPT4ge1xuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVU5LTk9XTl9URVhUKSB7XG5cblx0XHRcdFx0Y29uc3QgdGV4dCA9IHRva2VuLnZhbHVlLnNwbGl0KFwiXFxuXCIpXG5cblx0XHRcdFx0dGV4dC5mb3JFYWNoKChzdHJva2U6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKHN0cm9rZSAhPSAnJyAmJiBzdHJva2UgIT0gJyAnKSB7XG5cblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogU2VhcmNoIG90aGVyIHRva2Vuczpcblx0XHRcdFx0XHRcdCAqIFxuXHRcdFx0XHRcdFx0ICogLSBJbWFnZVxuXHRcdFx0XHRcdFx0ICogLSBMaW5rXG5cdFx0XHRcdFx0XHQgKiAtIElubGluZUNvZGVcblx0XHRcdFx0XHRcdCAqICAtIFN0cm9uZ1xuXHRcdFx0XHRcdFx0ICogLSBVbm1hcmthYmxlXG5cdFx0XHRcdFx0XHQgKiAtIEhlYWRpbmdcblx0XHRcdFx0XHRcdCAqIC0gVW5kZXJsaW5lXG5cdFx0XHRcdFx0XHQgKiAtIENvbG9yXG5cdFx0XHRcdFx0XHQgKiAtIEJhZGdlXG5cdFx0XHRcdFx0XHQgKiAtIFRhYmxlXG5cdFx0XHRcdFx0XHQgKi9cblxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly9QYXJhZ3JhaCBTdGFydCAtPiBUZXh0IGJlZm9yZSAtPiBJbWFnZSAtPiBUZXh0IGFmdGVyIC0+IFBhcmFncmFwaCBFbmRcblxuXHRcdFx0XHRcdFx0XHQvL3BhcmFncmFwaCBzdGFydFxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhTdGFydFRva2VuID0ge30gYXMgIFRva2VuLnBhcmFncmFwaFN0YXJ0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaFN0YXJ0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfU1RBUlQ7XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhTdGFydFRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHQvL3RleHQgYmVmb3JlIFxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QmVmb3JlVG9rZW4gPSB7fSBhcyAgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU1BR0UpWzFdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGV4dEJlZm9yZVRva2VuKVxuXG5cdFx0XHRcdFx0XHRcdC8vaW1hZ2Vcblx0XHRcdFx0XHRcdFx0Y29uc3QgaW1hZ2VUb2tlbiA9IHt9IGFzICBUb2tlbi5pbWFnZVRva2VuO1xuXHRcdFx0XHRcdFx0XHRpbWFnZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuSU1BR0U7XG5cdFx0XHRcdFx0XHRcdGltYWdlVG9rZW4uYWx0ID0gc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKVsyXTtcblx0XHRcdFx0XHRcdFx0aW1hZ2VUb2tlbi51cmwgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU1BR0UpWzNdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goaW1hZ2VUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly90ZXh0IGFmdGVyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHRBZnRlclRva2VuID0ge30gYXMgIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTUFHRSlbNF07XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0QWZ0ZXJUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaEVuZFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaEVuZFRva2VuKVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTkspICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHQvL1BhcmFncmFoIFN0YXJ0IC0+IFRleHQgYmVmb3JlIC0+IExpbmsgLT4gVGV4dCBhZnRlciAtPiBQYXJhZ3JhcGggRW5kXG5cblx0XHRcdFx0XHRcdFx0Ly9wYXJhZ3JhcGggc3RhcnRcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRUb2tlbj0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRcdFx0XHRcdFx0cGFyYWdyYXBoU3RhcnRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaFN0YXJ0VG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vdGV4dCBiZWZvcmUgXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHRCZWZvcmVUb2tlbj0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSylbMV07XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0QmVmb3JlVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vbGlua1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsaW5rVG9rZW49IHt9IGFzIFRva2VuLmxpbmtUb2tlbjtcblx0XHRcdFx0XHRcdFx0bGlua1Rva2VuLnR5cGUgPSBUb2tlblR5cGUuTElOSztcblx0XHRcdFx0XHRcdFx0bGlua1Rva2VuLm5hbWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSylbMl07XG5cdFx0XHRcdFx0XHRcdGxpbmtUb2tlbi51cmwgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSylbM107XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChsaW5rVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vdGV4dCBhZnRlclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QWZ0ZXJUb2tlbj0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRFWFQ7XG5cdFx0XHRcdFx0XHRcdHRleHRBZnRlclRva2VuLnZhbHVlID0gc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTkspWzRdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGV4dEFmdGVyVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vZW5kIHBhcmFncmFwaFxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhFbmRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaEVuZFRva2VuO1xuXHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhFbmRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9FTkQ7XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhFbmRUb2tlbilcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9MSU5FKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly9QYXJhZ3JhaCBTdGFydCAtPiBUZXh0IGJlZm9yZSAtPiB1bmRlckxpbmUgLT4gVGV4dCBhZnRlciAtPiBQYXJhZ3JhcGggRW5kXG5cblx0XHRcdFx0XHRcdFx0Ly9wYXJhZ3JhcGggc3RhcnRcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaFN0YXJ0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaFN0YXJ0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfU1RBUlQ7XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhTdGFydFRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHQvL3RleHQgYmVmb3JlIFxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QmVmb3JlVG9rZW4gPSB7fSBhcyBUb2tlbi50ZXh0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHRleHRCZWZvcmVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRFWFQ7XG5cdFx0XHRcdFx0XHRcdHRleHRCZWZvcmVUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9MSU5FKVsxXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHRleHRCZWZvcmVUb2tlbilcblxuXHRcdFx0XHRcdFx0XHQvL3VuZGVyTGluZVxuXHRcdFx0XHRcdFx0XHRjb25zdCB1bmRlckxpbmVUb2tlbiA9IHt9IGFzIFRva2VuLnVuZGVyTGluZVRva2VuO1xuXHRcdFx0XHRcdFx0XHR1bmRlckxpbmVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlVOREVSX0xJTkU7XG5cdFx0XHRcdFx0XHRcdHVuZGVyTGluZVRva2VuLnZhbHVlID0gc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOREVSX0xJTkUpWzJdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godW5kZXJMaW5lVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vIHRleHQgYWZ0ZXJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dEFmdGVyVG9rZW4gPSB7fSBhcyBUb2tlbi50ZXh0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHRleHRBZnRlclRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEVYVDtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5ERVJfTElORSlbM107XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0QWZ0ZXJUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaEVuZFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORFxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoRW5kVG9rZW4pXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vaW5saW5lIGNvZGVcblx0XHRcdFx0XHRcdGlmIChzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREUpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHQvL1BhcmFncmFoIFN0YXJ0IC0+IFRleHQgYmVmb3JlIC0+IGlubGluZSBjb2RlIC0+IFRleHQgYWZ0ZXIgLT4gUGFyYWdyYXBoIEVuZFxuXG5cdFx0XHRcdFx0XHRcdC8vcGFyYWdyYXBoIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaFN0YXJ0VG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuO1xuXHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhTdGFydFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX1NUQVJUO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoU3RhcnRUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly90ZXh0IGJlZm9yZSBcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dEJlZm9yZVRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREUpWzFdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGV4dEJlZm9yZVRva2VuKVxuXG5cdFx0XHRcdFx0XHRcdC8vaW5saW5lIGNvZGVcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29kZUlubGluZVRva2VuID0ge30gYXMgVG9rZW4uY29kZUlubGluZVRva2VuO1xuXHRcdFx0XHRcdFx0XHRjb2RlSW5saW5lVG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0RFX0lOTElORTtcblx0XHRcdFx0XHRcdFx0Y29kZUlubGluZVRva2VuLnZhbHVlID0gc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklOTElORV9DT0RFKVsyXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKGNvZGVJbmxpbmVUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly8gdGV4dCBhZnRlclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QWZ0ZXJUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTkxJTkVfQ09ERSlbM107XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0QWZ0ZXJUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaEVuZFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaEVuZFRva2VuKVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBTdHJvbmcgdGV4dFxuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHQvL1BhcmFncmFoIFN0YXJ0IC0+IFRleHQgYmVmb3JlIC0+IFN0cm9uZyBUZXh0IC0+IFRleHQgYWZ0ZXIgLT4gUGFyYWdyYXBoIEVuZFxuXG5cdFx0XHRcdFx0XHRcdC8vcGFyYWdyYXBoIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaFN0YXJ0VG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuO1xuXHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhTdGFydFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX1NUQVJUO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoU3RhcnRUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly90ZXh0IGJlZm9yZSBcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HKVsxXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHRleHRUb2tlbilcblxuXHRcdFx0XHRcdFx0XHQvL3N0cm9uZyB0ZXh0XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHN0cm9uZ1RleHRUb2tlbiA9IHt9IGFzIFRva2VuLnN0cm9uZ1RleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0c3Ryb25nVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuU1RST05HO1xuXHRcdFx0XHRcdFx0XHRzdHJvbmdUZXh0VG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HKVsyXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHN0cm9uZ1RleHRUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly8gdGV4dCBhZnRlclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QWZ0ZXJUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpWzNdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGV4dEFmdGVyVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vZW5kIHBhcmFncmFwaFxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhFbmRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaEVuZFRva2VuO1xuXHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhFbmRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9FTkQ7XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhFbmRUb2tlbilcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblxuXG5cdFx0XHRcdFx0XHQvLyBDb2xvciB0ZXh0XG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPTE9SKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly9QYXJhZ3JhaCBTdGFydCAtPiBUZXh0IGJlZm9yZSAtPiBDb2xvciBUZXh0IC0+IFRleHQgYWZ0ZXIgLT4gUGFyYWdyYXBoIEVuZFxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3Q6IHN0cmluZyA9IHN0cm9rZS5yZXBsYWNlKEdyYW1tYXIuQkxPQ0tTLkNPTE9SLCBcIiZjb2xvciZcIik7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGFyciA9IHJlc3Quc3BsaXQoXCImY29sb3ImXCIpXG5cblx0XHRcdFx0XHRcdFx0Ly9wYXJhZ3JhcGggc3RhcnRcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaFN0YXJ0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaFN0YXJ0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfU1RBUlQ7XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhTdGFydFRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHQvL3RleHQgYmVmb3JlIFxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0VG9rZW4gPSB7fSBhcyBUb2tlbi50ZXh0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHRleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRFWFQ7XG5cdFx0XHRcdFx0XHRcdHRleHRUb2tlbi52YWx1ZSA9IGFyclswXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHRleHRUb2tlbilcblxuXHRcdFx0XHRcdFx0XHQvL0NvbG9yIFRleHRcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29sb3JUZXh0VG9rZW4gPSB7fSBhcyBUb2tlbi5jb2xvclRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0Y29sb3JUZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0xPUjtcblx0XHRcdFx0XHRcdFx0Y29sb3JUZXh0VG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09MT1IpWzFdO1xuXHRcdFx0XHRcdFx0XHRjb2xvclRleHRUb2tlbi5jb2xvciA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0xPUilbM107XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChjb2xvclRleHRUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly8gdGV4dCBhZnRlclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QWZ0ZXJUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi52YWx1ZSA9IGFyclsxXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHRleHRBZnRlclRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHQvL2VuZCBwYXJhZ3JhcGhcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoRW5kVG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhFbmRUb2tlbjtcblx0XHRcdFx0XHRcdFx0cGFyYWdyYXBoRW5kVG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfRU5EO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoRW5kVG9rZW4pXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIENvbG9yIGJhZGdlc1xuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5CQURHRSkgIT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0XHRcdC8vUGFyYWdyYWggU3RhcnQgLT4gVGV4dCBiZWZvcmUgLT4gQ29sb3IgQmFkZ2UgLT4gVGV4dCBhZnRlciAtPiBQYXJhZ3JhcGggRW5kXG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzdDogc3RyaW5nID0gc3Ryb2tlLnJlcGxhY2UoR3JhbW1hci5CTE9DS1MuQkFER0UsIFwiJmJhZGdlJlwiKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYXJyID0gcmVzdC5zcGxpdChcIiZiYWRnZSZcIilcblxuXHRcdFx0XHRcdFx0XHQvL3BhcmFncmFwaCBzdGFydFxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhTdGFydFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRcdFx0XHRcdFx0cGFyYWdyYXBoU3RhcnRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaFN0YXJ0VG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vdGV4dCBiZWZvcmUgXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHRUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEVYVDtcblx0XHRcdFx0XHRcdFx0dGV4dFRva2VuLnZhbHVlID0gYXJyWzBdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGV4dFRva2VuKVxuXG5cdFx0XHRcdFx0XHRcdC8vQ29sb3IgQmFkZ2Vcblx0XHRcdFx0XHRcdFx0Y29uc3QgYmFkZ2VUb2tlbiA9IHt9IGFzIFRva2VuLmJhZ2RlVG9rZW47XG5cdFx0XHRcdFx0XHRcdGJhZGdlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5CQURHRTtcblx0XHRcdFx0XHRcdFx0YmFkZ2VUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5CQURHRSlbMV07XG5cdFx0XHRcdFx0XHRcdGJhZGdlVG9rZW4uY29sb3IgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuQkFER0UpWzNdO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goYmFkZ2VUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly8gdGV4dCBhZnRlclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0QWZ0ZXJUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0QWZ0ZXJUb2tlbi52YWx1ZSA9IGFyclsxXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHRleHRBZnRlclRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHQvL2VuZCBwYXJhZ3JhcGhcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoRW5kVG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhFbmRUb2tlbjtcblx0XHRcdFx0XHRcdFx0cGFyYWdyYXBoRW5kVG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfRU5EO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoRW5kVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBVbm1hcmthYmxlIHRleHRcblx0XHRcdFx0XHRcdGlmIChzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSkgIT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0XHRcdC8vUGFyYWdyYWggU3RhcnQgLT4gVGV4dCBiZWZvcmUgLT4gVW5tYXJrYWJsZSBUZXh0IC0+IFRleHQgYWZ0ZXIgLT4gUGFyYWdyYXBoIEVuZFxuXG5cdFx0XHRcdFx0XHRcdC8vcGFyYWdyYXBoIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaFN0YXJ0VG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuO1xuXHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhTdGFydFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX1NUQVJUO1xuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2gocGFyYWdyYXBoU3RhcnRUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly90ZXh0IGJlZm9yZSBcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSlbMV07XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0VG9rZW4pXG5cblx0XHRcdFx0XHRcdFx0Ly91bm1hcmthYmxlIHRleHRcblx0XHRcdFx0XHRcdFx0Y29uc3QgdW5tYXJrYWJsZVRva2VuID0ge30gYXMgVG9rZW4udW5tYXJrYWJsZVRva2VuO1xuXHRcdFx0XHRcdFx0XHR1bm1hcmthYmxlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5VTk1BUktBQkxFO1xuXHRcdFx0XHRcdFx0XHR1bm1hcmthYmxlVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSlbMl07XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh1bm1hcmthYmxlVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vIHRleHQgYWZ0ZXJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dEFmdGVyVG9rZW4gPSB7fSBhcyBUb2tlbi50ZXh0VG9rZW47XG5cdFx0XHRcdFx0XHRcdHRleHRBZnRlclRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEVYVDtcblx0XHRcdFx0XHRcdFx0dGV4dEFmdGVyVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSlbM107XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0QWZ0ZXJUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaEVuZFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaEVuZFRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTElTVFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSVNUKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly9QYXJhZ3JhaCBTdGFydCAtPiBMaXN0IC0+IFBhcmFncmFwaCBFbmRcblxuXHRcdFx0XHRcdFx0XHQvL3BhcmFncmFwaCBzdGFydFxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhTdGFydFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRcdFx0XHRcdFx0cGFyYWdyYXBoU3RhcnRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaFN0YXJ0VG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdC8vTGlzdFxuXHRcdFx0XHRcdFx0XHRjb25zdCBsaXN0VG9rZW4gPSB7fSBhcyBUb2tlbi5saXN0VG9rZW47XG5cdFx0XHRcdFx0XHRcdGxpc3RUb2tlbi50eXBlID0gVG9rZW5UeXBlLkxJU1Q7XG5cdFx0XHRcdFx0XHRcdGxpc3RUb2tlbi5hdHRyaWJ1dGUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElTVClbMV07XG5cdFx0XHRcdFx0XHRcdGxpc3RUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSVNUKVsyXTtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKGxpc3RUb2tlbik7XG5cblx0XHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0XHRcdFx0XHRcdHBhcmFncmFwaEVuZFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORDtcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaEVuZFRva2VuKTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gVEFCTEVcblx0XHRcdFx0XHRcdGlmIChzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVEFCTEUpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBpZiBzZWNvbmQgcm93IGluIHRoZSB0YWJsZSwgd2hlbiBhZGQgdGhpcyByb3cgdG8gdGhlIHByZXZpb3VzIHRhYmxlIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0aWYgKGl0b2tlbnNbaXRva2Vucy5sZW5ndGggLSAxXS50eXBlID09IFRva2VuVHlwZS5UQUJMRSl7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFibGVSb3dUb2tlbiA9IHt9IGFzIFRva2VuLnRhYmxlUm93VG9rZW47XG5cdFx0XHRcdFx0XHRcdFx0dGFibGVSb3dUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRBQkxFX1JPVztcblx0XHRcdFx0XHRcdFx0XHR0YWJsZVJvd1Rva2VuLnZhbHVlID0gc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlRBQkxFKVsxXTtcblx0XHRcdFx0XHRcdFx0XHR0YWJsZVJvd1Rva2VuLnJvdyA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5UQUJMRSlbMV07XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0aXRva2Vuc1tpdG9rZW5zLmxlbmd0aCAtIDFdLmNoaWxkcmVuPy5wdXNoKHRhYmxlUm93VG9rZW4pO1xuXHRcdFx0XHRcdFx0XHRcdGl0b2tlbnNbaXRva2Vucy5sZW5ndGggLSAxXS5yb3cgPSBpdG9rZW5zW2l0b2tlbnMubGVuZ3RoIC0gMV0ucm93ICsgXCJcXG5cIiArIHRhYmxlUm93VG9rZW4ucm93O1xuXG5cdFx0XHRcdFx0XHRcdH1lbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vYWRkZWQgZmlyc3Qgcm93IG9mIHRoZSBUYWJsZVxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlUm93VG9rZW4gPSB7fSBhcyBUb2tlbi50YWJsZVJvd1Rva2VuO1xuXHRcdFx0XHRcdFx0XHRcdHRhYmxlUm93VG9rZW4udHlwZSA9IFRva2VuVHlwZS5UQUJMRV9ST1c7XG5cdFx0XHRcdFx0XHRcdFx0dGFibGVSb3dUb2tlbi52YWx1ZSA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5UQUJMRSlbMV07XG5cdFx0XHRcdFx0XHRcdFx0dGFibGVSb3dUb2tlbi5yb3cgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVEFCTEUpWzFdO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFibGVUb2tlbiA9IHt9IGFzIFRva2VuLnRhYmxlVG9rZW5cblx0XHRcdFx0XHRcdFx0XHR0YWJsZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEFCTEU7XG5cdFx0XHRcdFx0XHRcdFx0dGFibGVUb2tlbi5jaGlsZHJlbiA9IFt0YWJsZVJvd1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0XHR0YWJsZVRva2VuLnJvdyA9IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5UQUJMRSlbMV07XG5cblx0XHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2godGFibGVUb2tlbik7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdH1cblxuXG5cdFx0XHRcdFx0XHQvLyBIZWFkaW5nXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkhFQURJTkcpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCB0eXBlcyA9IFtcblx0XHRcdFx0XHRcdFx0XHRUb2tlblR5cGUuSEVBRElOR19GSVJTVCxcblx0XHRcdFx0XHRcdFx0XHRUb2tlblR5cGUuSEVBRElOR19TRUNPTkQsXG5cdFx0XHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfVEhJUkQsXG5cdFx0XHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfRk9SVEgsXG5cdFx0XHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfRklGVEhcblx0XHRcdFx0XHRcdFx0XVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGl0eXBlOiBudW1iZXIgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElORylbMV0ubGVuZ3RoIC0gMTtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBoZWFkVG9rZW4gPSB7fSBhcyBUb2tlbi5oZWFkVG9rZW47XG5cdFx0XHRcdFx0XHRcdGhlYWRUb2tlbi50eXBlID0gdHlwZXNbaXR5cGVdO1xuXHRcdFx0XHRcdFx0XHRoZWFkVG9rZW4udmFsdWUgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElORylbMl07XG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChoZWFkVG9rZW4pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZm9yIG90aGVyIHVuaWRlbnRpZmllZCB0ZXh0XG5cdFx0XHRcdFx0XHQvLyBQYXJhZ3JhcGggLT4gT3RoZXIgVGV4dCAtPiBQYXJhZ3JhcGhcblxuXHRcdFx0XHRcdFx0Ly9wYXJhZ3JhcGggc3RhcnRcblx0XHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaFN0YXJ0VG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuO1xuXHRcdFx0XHRcdFx0cGFyYWdyYXBoU3RhcnRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVDtcblx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaChwYXJhZ3JhcGhTdGFydFRva2VuKTtcblxuXHRcdFx0XHRcdFx0Ly9PdGhlciBUZXh0IFxuXHRcdFx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0dGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEVYVDtcblx0XHRcdFx0XHRcdHRleHRUb2tlbi52YWx1ZSA9IHN0cm9rZTtcblx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh0ZXh0VG9rZW4pXG5cblxuXHRcdFx0XHRcdFx0Ly9lbmQgcGFyYWdyYXBoXG5cdFx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhFbmRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaEVuZFRva2VuO1xuXHRcdFx0XHRcdFx0cGFyYWdyYXBoRW5kVG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfRU5EO1xuXHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHBhcmFncmFwaEVuZFRva2VuKTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLnRva2VucyA9IGl0b2tlbnM7XG5cblx0fVxufSIsImV4cG9ydCBlbnVtIFRva2VuVHlwZSB7XG5cdEJBREdFID0gXCJCYWRnZVwiLFxuXHRDQVBUSU9OID0gXCJDYXB0aW9uXCIsXG5cdENPREVfSU5MSU5FID0gXCJDb2RlSW5saW5lXCIsXG5cdENPREVfQkxPQ0sgPSBcIkNvZGVCbG9ja1wiLFxuXHRDT0RFX0lOX0NPREUgPSBcIkNvZGVJbkNvZGVcIixcblx0Q09MT1IgPSBcIkNvbG9yXCIsXG5cdERPQ1VNRU5UID0gXCJEb2N1bWVudFwiLFxuXHRJTUFHRSA9IFwiSW1hZ2VcIixcblx0SEVBRElOR19GSVJTVCA9IFwiSGVhZGluZ0ZpcnN0XCIsXG5cdEhFQURJTkdfU0VDT05EID0gXCJIZWFkaW5nU2Vjb25kXCIsXG5cdEhFQURJTkdfVEhJUkQgPSBcIkhlYWRpbmdUaGlyZFwiLFxuXHRIRUFESU5HX0ZPUlRIID0gXCJIZWFkaW5nRm9ydGhcIixcblx0SEVBRElOR19GSUZUSCA9IFwiSGVhZGluZ0ZpZnRoXCIsXG5cdEhFQURJTkcgPSBcIkhlYWRpbmdcIixcblx0TElOSyA9IFwiTGlua1wiLFxuXHRMSVNUID0gXCJMaXN0XCIsXG5cdFBBUkFHUkFQSF9TVEFSVCA9IFwiUGFyYWdyYXBoU3RhcnRcIixcblx0UEFSQUdSQVBIX0VORCA9IFwiUGFyYWdyYXBoRW5kXCIsXG5cdFBBUkFHUkFQSCA9IFwiUGFyYWdyYXBoXCIsXG5cdFFVT1RFID0gXCJRdW90ZVwiLFxuXHRTVFJPTkcgPSBcIlN0cm9uZ1wiLFxuXHRUQUJMRSA9IFwiVGFibGVcIixcblx0VEFCTEVfUk9XID0gXCJUYWJsZVJvd1wiLFxuXHRURVhUID0gXCJUZXh0XCIsXG5cdFVOREVSX0xJTkUgPSBcIlVuZGVyTGluZVwiLFxuXHRVTktOT1dOX1RFWFQgPSBcIlVua25vd25UZXh0XCIsXG5cdFVOTUFSS0FCTEUgPSBcIlVubWFya2FibGVcIlxuXHRcbn0iLCJpbXBvcnQgeyBDYXB0aW9uSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ2FwdGlvbkhUTUxcIlxuaW1wb3J0IHsgSGVhZGVySFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvSGVhZGVySFRNTFwiO1xuaW1wb3J0IHtQYXJhZ3JhcGhIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUxcIlxuaW1wb3J0IHsgQ29kZUJsb2NrSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ29kZUJsb2NrSFRNTFwiO1xuaW1wb3J0IHtRdW90ZUhUTUx9IGZyb20gXCIuL2h0bWxibG9ja3MvUXVvdGVIVE1MXCI7XG5pbXBvcnQge0xpc3RIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL0xpc3RIVE1MXCI7XG5pbXBvcnQgeyBUYWJsZUhUTUwgfSBmcm9tIFwiLi9odG1sYmxvY2tzL1RhYmxlSFRNTFwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG5cdHByaXZhdGUgYXN0IDogQVNUO1xuXG5cdGNvbnN0cnVjdG9yKGFzdCA6IEFTVCkge1xuXHRcdHRoaXMuYXN0ID0gYXN0XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCkge1xuXG5cdFx0Y29uc3QgY2hpbGRyZW4gID0gdGhpcy5hc3QuY2hpbGRyZW47XG5cblx0XHRjaGlsZHJlbi5mb3JFYWNoKCh0b2tlbikgPT4ge1xuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuQ0FQVElPTikge1xuXG5cdFx0XHRcdGNvbnN0IGNhcHRpb24gPSBuZXcgQ2FwdGlvbkhUTUwodG9rZW4pO1xuXHRcdFx0XHRjYXB0aW9uLnJlbmRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5IRUFESU5HKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJIVE1MKHRva2VuKTtcblx0XHRcdFx0aGVhZGVyLnJlbmRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuQ09ERV9CTE9DSyB8fCB0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOX0NPREUpIHtcblx0XHRcdFx0Y29uc3QgY29kZWJsb2NrID0gbmV3IENvZGVCbG9ja0hUTUwodG9rZW4pO1xuXHRcdFx0XHRjb2RlYmxvY2sucmVuZGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5RVU9URSkge1xuXHRcdFx0XHRjb25zdCBxdW90ZSA9IG5ldyBRdW90ZUhUTUwodG9rZW4pO1xuXHRcdFx0XHRxdW90ZS5yZW5kZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkxJU1QpIHtcblx0XHRcdFx0Y29uc3QgbGlzdCA9IG5ldyBMaXN0SFRNTCh0b2tlbik7XG5cdFx0XHRcdGxpc3QucmVuZGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5UQUJMRSkge1xuXHRcdFx0XHRjb25zdCB0YWJsZSA9IG5ldyBUYWJsZUhUTUwodG9rZW4pO1xuXHRcdFx0XHR0YWJsZS5yZW5kZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSCkge1xuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBuZXcgUGFyYWdyYXBoSFRNTCh0b2tlbik7XG5cdFx0XHRcdHBhcmFncmFwaC5yZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0pXG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbmltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHtEb21VdGlsaXRlc30gZnJvbSAnLi9Eb21VdGlsaXRlcydcblxuXG5leHBvcnQgY2xhc3MgQ2FwdGlvbkhUTUwge1xuXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXMgOiBhbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLmNhcHRpb25Ub2tlbjtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogVG9rZW4uY2FwdGlvblRva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG5cdHJlbmRlcigpOnZvaWR7XG5cblx0XHRsZXQgdGFnc0Jsb2NrICA9IFwiXCI7XG5cdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS50YWdzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpLm1hcCggKHRhZzogc3RyaW5nKSA9PiB7XHRcdFx0XG5cdFx0XHRpZih0YWcubGVuZ3RoID4wKXtcblx0XHRcdFx0dGFnc0Jsb2NrID0gdGFnc0Jsb2NrICsgXG5cdFx0XHRcdCc8YSBocmVmPVwiIy90YWdzLycgKyB0YWcgKyAnXCIgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLW9yYW5nZS00MDAgIGhvdmVyOmJnLW9yYW5nZS01MDAgdXBwZXJjYXNlIGxhc3Q6bXItMCBtci0xXCI+Jytcblx0XHRcdFx0XHR0YWcgKyBcblx0XHRcdFx0XCI8L2E+XCIgXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgY2F0ZWdvcmllc0Jsb2NrICA9IFwiXCI7XG5cdFx0XHRpZih0aGlzLnRva2VuLmNoaWxkcmVuWzBdLmNhdGVnb3JpZXMubGVuZ3RoID4gMCl7XG5cdFx0XHRjYXRlZ29yaWVzQmxvY2sgID0gXG5cdFx0XHQnPGEgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWdyYXktNDAwICBob3ZlcjpiZy1ncmF5LTUwMCB1cHBlcmNhc2UgbGFzdDptci0wIG1yLTFcIj4nK1xuXHRcdFx0XHR0aGlzLnRva2VuLmNoaWxkcmVuWzBdLmNhdGVnb3JpZXMgK1xuXHRcdFx0XCI8L2E+XCIgXG5cdFx0XHR9XG5cblx0XHRjb25zdCBDYXB0aW9uQmxvY2sgPVxuXHRcdFx0YFx0XG5cdFx0XHRcdCAgPGltZyBzcmM9ICR7dGhpcy50b2tlbi5jaGlsZHJlblswXS50aHVtYm5haWx9IGNsYXNzPVwiZmxvYXQtbGVmdCBwLThcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0ZXh0LTN4bCBmb250LW5vcm1hbCBsZWFkaW5nLW5vcm1hbCBtdC0wIG1iLTIgdGV4dC1ncmF5LTYwMFwiPlxuXHRcdFx0XHRcdFx0XHQke3RoaXMudG9rZW4uY2hpbGRyZW5bMF0udGl0bGUuc2xpY2UoMiwgdGhpcy50b2tlbi5jaGlsZHJlblswXS50aXRsZS5sZW5ndGgtMSl9PC9oMz5cblx0XHRcdFx0XHRcdDx0aW1lIGNsYXNzPVwidGV4dC14cyBmb250LXNlbWlib2xkIGlubGluZS1ibG9jayBweS0xIHB4LTIgdXBwZXJjYXNlIHJvdW5kZWQgdGV4dC13aGl0ZSBiZy1ibHVlLTQwMCB1cHBlcmNhc2UgbGFzdDptci0wIG1yLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMudG9rZW4uY2hpbGRyZW5bMF0uZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGltZT4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnLWNvbnRhaW5lciBweS0xXCI+XG5cdFx0XHRcdFx0XHRcdCR7dGFnc0Jsb2NrfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2F0ZWdvcmllcy1jb250YWluZXIgcHktMVwiPlxuXHRcdFx0XHRcdFx0XHQke2NhdGVnb3JpZXNCbG9ja31cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRgO1xuXG5cdFx0Y29uc3QgY2FwdGlvbk5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXHRcdGNhcHRpb25Ob2RlLmlubmVySFRNTCA9IENhcHRpb25CbG9jaztcblxuXHRcdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuXHRcdGNvbnRhaW5lcj8uYXBwZW5kQ2hpbGQoY2FwdGlvbk5vZGUpO1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IGlmIGxpbmUgaXMgY29kZSBibG9ja1xuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgYXMgY29kZSBibG9ja1xuICovXG5cblxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4uL1Rva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3ByaXNtLmNzc1wiXG5cbi8vIGltcG9ydCBwcmlzbWpzXG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuXG5cbmV4cG9ydCBjbGFzcyBDb2RlQmxvY2tIVE1MIHtcbiAgXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXMgOiBhbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLmNvZGVCbG9ja1Rva2VuO1xuXHRcblx0Y29uc3RydWN0b3IodG9rZW46IFRva2VuLmNvZGVCbG9ja1Rva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG4gIHJlbmRlciAoKSA6IHZvaWQge1xuXG5cdGNvbnN0IGNvZGVCbG9jayA6IGFueSA9IGBcblx0XHRcdDxjb2RlIGNsYXNzPVwibGFuZ3VhZ2UtJHt0aGlzLnRva2VuLmxhbmd1YWdlfVwiPlxuXHRcdCBcdFx0JHt0aGlzLnRva2VuLmNvZGV9XG5cdFx0XHQ8L2NvZGU+YFxuXHRcdFxuXHRcdGNvbnN0IENvZGVCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG5cdFx0Q29kZUJsb2NrTm9kZS5jbGFzc05hbWUgPSBgbGFuZ3VhZ2UtJHt0aGlzLnRva2VuLmxhbmd1YWdlfVwiYCA7XG5cblx0XHRQcmlzbS5oaWdobGlnaHRBbGwoY29kZUJsb2NrKTtcblxuXHRcdENvZGVCbG9ja05vZGUuaW5uZXJIVE1MID0gY29kZUJsb2NrO1xuXG5cdFx0bGV0IGNvbnRhaW5lcjpDaGlsZE5vZGU7XG5cdFx0XG5cdFx0aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/LmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/Lmxhc3RDaGlsZDtcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuXHRcdH1cblx0XHRcblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKENvZGVCbG9ja05vZGUpO1xuXG5cdFx0XG4gIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBSZXR1cm5zIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGggZG9tIGVsZW1lbnRzIGluIGRvY3VtZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIERvbVV0aWxpdGVzIHtcblxuICBnZXRMYXN0Tm9kZSAoKSA6IENoaWxkTm9kZSB8IG51bGx7XG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRSb290KClcbiAgICByZXR1cm4gbGFzdENoaWxkLmxhc3RDaGlsZFxuICB9XG5cbiAgZ2V0TGFzdE5vZGVOYW1lICgpIDogc3RyaW5nIHtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSB0aGlzLmdldFJvb3QoKVxuICAgIHJldHVybiBsYXN0Q2hpbGQubGFzdENoaWxkLm5vZGVOYW1lXG4gIH1cblxuICBnZXRSb290ICgpIDogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhcnRpY2xlJylcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQgKGVsZW1lbnQgOiBzdHJpbmcpIDogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpXG4gIH1cbn0iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGh0bWwgZWxlbWVudCA8aD5cbiAqIEBwYXJhbSBsaW5lIGFzIGJsb2NrIG9mIHRoZSB0ZXh0XG4gKiBAcmV0dXJuIGRvbSBlbGVtZW50IGZvciBoZWFkVHlwZSA8aD8vPiBmb3IgZXhhbXBsZSA8aD8+IC4uLjxoPz5cbiAqL1xuXG5pbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSBcIi4vRG9tVXRpbGl0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIEhlYWRlckhUTUwge1xuICBcblx0cHJpdmF0ZSBEb21VdGlsaXRlcyA6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4uaGVhZFRva2VuO1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5oZWFkVG9rZW4pIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6dm9pZHtcblxuXHRcdGNvbnN0IEhlYWRlck5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoJ2gnKyB0aGlzLnRva2VuLmRlcHQpXG5cblx0XHRIZWFkZXJOb2RlLmNsYXNzTmFtZSA9IGB0ZXh0LSR7dGhpcy50b2tlbi5kZXB0fXhsIG10LTAgbWItMiB0ZXh0LWdyYXktODAwIHByLTEwIHB0LTEwYDtcblx0XHRcblx0XHRIZWFkZXJOb2RlLmlubmVySFRNTCA9IHRoaXMudG9rZW4uY2hpbGRyZW5bMF0udmFsdWU7XG5cblx0XHRsZXQgY29udGFpbmVyIDogQ2hpbGROb2RlOyBcblx0XHRcblx0XHRpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8uY2hpbGRyZW4ubGVuZ3RoID4gMCl7XG5cdFx0XHRcblx0XHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/Lmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdCBcblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0XHR9XG5cblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKEhlYWRlck5vZGUpO1xuXHRcdFxuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IGlmIGxpbmUgaXMgY29kZSBibG9ja1xuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgYXMgbGlzdFxuICovXG5cblxuIGltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdEhUTUwge1xuICBcblx0cHJpdmF0ZSBEb21VdGlsaXRlczphbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLmxpc3RUb2tlbjtcblx0XG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5saXN0VG9rZW4pIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cbiAgcmVuZGVyICgpIDogdm9pZCB7XG5cblx0bGV0IGxpc3RCbG9jayA6IHN0cmluZyA7XG5cdGxldCBsaXN0QmxvY2tOb2RlIDogRWxlbWVudDtcblx0bGlzdEJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuXHRsaXN0QmxvY2tOb2RlLmNsYXNzTmFtZSA9IFwibWItNVwiXG5cblx0Ly9jb25zb2xlLmxvZyh0aGlzLnRva2VuKVxuXG5cdGlmKHRoaXMudG9rZW4uYXR0cmlidXRlID09IFwiW11cIil7XG5cdFx0bGlzdEJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcdFxuXHRcdGxpc3RCbG9jayA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+XG5cdFx0XHRcdDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgYXBwZWFyYW5jZS1ub25lIGgtNCB3LTQgYm9yZGVyLXNvbGlkIGJvcmRlci1ncmF5LTIwMCBib3JkZXItc29saWQgYm9yZGVyLTIgcm91bmRlZC1zbSBkaXNhYmxlZDpiZy13aGl0ZSBkaXNhYmxlZDpib3JkZXItYmx1ZS02MDAgbXQtMSBhbGlnbi10b3AgYmctbm8tcmVwZWF0IGJnLWNlbnRlciBiZy1jb250YWluIGZsb2F0LWxlZnQgbXItMlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgaWQ9XCJmbGV4Q2hlY2tEaXNhYmxlZFwiIGRpc2FibGVkPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWwgaW5saW5lLWJsb2NrIHRleHQtZ3JheS04MDAgb3BhY2l0eS0xMDBcIiBmb3I9XCJmbGV4Q2hlY2tEaXNhYmxlZFwiPlxuXHRcdFx0ICBcdFx0JHt0aGlzLnRva2VuLnZhbHVlfVxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdCAgXHRcdDwvZGl2PlxuXHRcdGBcblx0fVxuXG5cdGlmKHRoaXMudG9rZW4uYXR0cmlidXRlID09IFwiW3hdXCIpe1xuXHRcdGxpc3RCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHRcblx0XHRsaXN0QmxvY2sgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1jaGVja1wiPlxuXHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0IGFwcGVhcmFuY2Utbm9uZSBoLTQgdy00IGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1zbSBiZy13aGl0ZSBjaGVja2VkOmJnLWJsdWUtNjAwIGNoZWNrZWQ6Ym9yZGVyLWJsdWUtNjAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGR1cmF0aW9uLTIwMCBtdC0xIGFsaWduLXRvcCBiZy1uby1yZXBlYXQgYmctY2VudGVyIGJnLWNvbnRhaW4gZmxvYXQtbGVmdCBtci0yXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiIGNoZWNrZWQgZGlzYWJsZWQ+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbCBpbmxpbmUtYmxvY2sgdGV4dC1ncmF5LTgwMCBvcGFjaXR5LTEwMFwiIGZvcj1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiPlxuXHRcdFx0ICBcdFx0XHQke3RoaXMudG9rZW4udmFsdWV9XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0ICBcdFx0PC9kaXY+XG5cdFx0YFxuXHRcdH1cblxuXHRcdGlmKHRoaXMudG9rZW4uYXR0cmlidXRlID09IFwiLVwiKXtcblx0XHRcdGxpc3RCbG9jayA9IGBcblx0XHRcdFx0PGxpIGNsYXNzPVwidGV4dC1za3ktNzAwXCI+XG5cdFx0XHRcdFx0JHt0aGlzLnRva2VuLnZhbHVlfVxuXHRcdFx0XHQ8L2xpPlxuXHRcdFx0YFxuXHRcdFx0bGlzdEJsb2NrTm9kZS5jbGFzc05hbWUgPSBgbGlzdC1kaXNjIG1sLTVgO1xuXHRcdH1cblxuXHRcdFxuXHRcdGxpc3RCbG9ja05vZGUuaW5uZXJIVE1MID0gbGlzdEJsb2NrO1xuXG5cdFx0bGV0IGNvbnRhaW5lcjogQ2hpbGROb2RlO1xuXHRcdGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5jaGlsZHJlbi5sZW5ndGggPiAwKXtcblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8ubGFzdENoaWxkO1xuXHRcdH1lbHNle1xuXHRcdFx0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuXHRcdH1cblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKGxpc3RCbG9ja05vZGUpO1xuXG4gIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IDxoPlxuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgZm9yIGhlYWRUeXBlIDxoPy8+IGZvciBleGFtcGxlIDxoPz4gLi4uPGg/PlxuICovXG5cbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgUGFyYWdyYXBoSFRNTCB7XG5cblx0cHJpdmF0ZSBEb21VdGlsaXRlcyA6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogYW55O1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBhbnkpIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6IHZvaWQge1xuXG5cdFx0Y29uc3QgUGFyYWdyYXBoTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcInBcIilcblx0XHRQYXJhZ3JhcGhOb2RlLmNsYXNzTmFtZSA9IFwiYmxvY2sgbGVhZGluZy03IGZvbnQtbW9ub1wiO1xuXG5cdFx0bGV0IHRleHQgPSBcIlwiO1xuXHRcdFxuXHRcdHRoaXMudG9rZW4uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuVEVYVCkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgY2hpbGQudmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLklNQUdFKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidy02LzEyIHNtOnctNC8xMiBweC00IHBiLTIwXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7Y2hpbGQudXJsfVwiIGFsdD1cIiR7Y2hpbGQuYWx0fVwiIGNsYXNzPVwic2hhZG93IHJvdW5kZWQgbWF4LXctZnVsbCBoLWF1dG8gYWxsaWduLW1pZGRsZSBib3JkZXItbm9uZVwiPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuTElOSykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIGA8YSBocmVmPVwiJHtjaGlsZC51cmx9XCIgY2xhc3M9XCJ0ZXh0LWJsdWUtNTAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC5uYW1lfVxuXHRcdFx0XHRcdDxhLz5gXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5TVFJPTkcpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGBcblx0XHRcdFx0PHN0cm9uZz4ke2NoaWxkLnZhbHVlfTwvc3Ryb25nPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOTElORSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8Y29kZSBjbGFzcz1cImlubGluZS1ibG9jayBweS0xIHB4LTIgYmctZ3JheS0zMDAgdGV4dC1ncmF5LTgwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctZ3JheS03MDAgZGFyazp0ZXh0LWdyYXktNDAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC52YWx1ZX1cblx0XHRcdFx0PC9jb2RlPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5DT0xPUikge1xuXG5cdFx0XHRcdGxldCBjb2xvclRleHQ6IHN0cmluZztcblxuXHRcdFx0XHRpZihjaGlsZC5jb2xvciA9PSBcImJsdWVcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tYmx1ZS01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJncmF5XCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLWdyYXktNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwicmVkXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXJlZC01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJncmVlblwiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1ncmVlbi01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJ5ZWxsb3dcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24teWVsbG93LTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInB1cnBsZVwiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1wdXJwbGUtNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwicGlua1wiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1waW5rLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcImluZGlnb1wiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1pbmRpZ28tNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBjb2xvclRleHQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJCYWRnZVwiKSB7XG5cblx0XHRcdFx0bGV0IGNvbG9yQmFkZ2U6IHN0cmluZztcblxuXHRcdFx0XHRpZihjaGlsZC5jb2xvciA9PSBcImJsdWVcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLWJsdWUtMTAwIHRleHQtYmx1ZS04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctYmx1ZS0yMDAgZGFyazp0ZXh0LWJsdWUtODAwXCI+JyArIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiZ3JheVwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctZ3JheS0xMDAgdGV4dC1ncmF5LTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1ncmF5LTcwMCBkYXJrOnRleHQtZ3JheS0zMDBcIj4nICsgY2hpbGQudmFsdWUrICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInJlZFwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctcmVkLTEwMCB0ZXh0LXJlZC04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctcmVkLTIwMCBkYXJrOnRleHQtcmVkLTkwMFwiPicgKyBjaGlsZC52YWx1ZSArICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcImdyZWVuXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctZ3JlZW4tMjAwIGRhcms6dGV4dC1ncmVlbi05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJ5ZWxsb3dcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLXllbGxvdy0xMDAgdGV4dC15ZWxsb3ctODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXllbGxvdy0yMDAgZGFyazp0ZXh0LXllbGxvdy05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwdXJwbGVcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXB1cnBsZS0yMDAgZGFyazp0ZXh0LXB1cnBsZS05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwaW5rXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1waW5rLTEwMCB0ZXh0LXBpbmstODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXBpbmstMjAwIGRhcms6dGV4dC1waW5rLTkwMFwiPicrIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiaW5kaWdvXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1pbmRpZ28tMTAwIHRleHQtaW5kaWdvLTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1pbmRpZ28tMjAwIGRhcms6dGV4dC1pbmRpZ28tOTAwXCI+JyArIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBjb2xvckJhZGdlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuVU5ERVJfTElORSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXNreS01MDAgdGV4dC1zbGF0ZS01MDBcIj5cblx0XHRcdFx0XHQke2NoaWxkLnZhbHVlfVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdGBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLlVOTUFSS0FCTEUpIHtcblx0XHRcdFx0Ly9KU09OLnN0cmluZ2lmeShTdHJpbmcoc3RyKSkgZm9yIHVubWFya2FibGUgdGV4dCB1c2FnZVxuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtb3JhbmdlLTkwMFwiPiR7SlNPTi5zdHJpbmdpZnkoU3RyaW5nKGNoaWxkLnZhbHVlKSl9PC9zcGFuPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdFBhcmFncmFwaE5vZGUuaW5uZXJIVE1MID0gdGV4dDtcblxuXHRcdGxldCBjb250YWluZXI6Q2hpbGROb2RlO1xuXHRcdGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5jaGlsZHJlbi5sZW5ndGggIT0gMCl7XG5cblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8ubGFzdENoaWxkO1xuXG5cdFx0fWVsc2V7XG5cdFx0XHQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnRhaW5lcj8uYXBwZW5kQ2hpbGQoUGFyYWdyYXBoTm9kZSk7XG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgaWYgbGluZSBpcyBjb2RlIGJsb2NrXG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBhcyBjb2RlIGJsb2NrXG4gKi9cblxuXG4gaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4uL1Rva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3F1b3RlLmNzc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUhUTUwge1xuICBcblx0cHJpdmF0ZSBEb21VdGlsaXRlcyA6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4ucXVvdGVUb2tlbjtcblx0XG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5xdW90ZVRva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG4gIHJlbmRlciAoKSA6IHZvaWQge1xuXG5cblx0Y29uc3QgcXVvdGVCbG9jayA9IGBcdFx0XG5cdFx0PGRpdj5cblx0XHRcdDxwIGNsYXNzbmFtZT1cIm1iLTJcIj4gXG5cdFx0XHRcdCR7dGhpcy50b2tlbi5xdW90ZX1cblx0XHRcdDwvcD5cblx0XHRcdDxjaXRlPiAke3RoaXMudG9rZW4uYXV0aG9yfSA8L2NpdGU+XG5cdFx0PC9kaXY+XG5cdGBcblx0XHRcblx0XHRjb25zdCBxdW90ZUJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcImJsb2NrcXVvdGVcIik7XG5cdFx0cXVvdGVCbG9ja05vZGUuaW5uZXJIVE1MID0gcXVvdGVCbG9jaztcblxuXG5cdFx0bGV0IGNvbnRhaW5lcjpDaGlsZE5vZGU7XG5cdFx0aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/LmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5sYXN0Q2hpbGQ7XG5cdFx0fWVsc2V7XG5cdFx0XHQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cdFx0fVxuXHRcdGNvbnRhaW5lcj8uYXBwZW5kQ2hpbGQocXVvdGVCbG9ja05vZGUpO1xuXG4gIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBSZXR1cm5zIGFuIGh0bWwgZWxlbWVudCBpZiBsaW5lIGlzIGNvZGUgYmxvY2tcbiAqIEBwYXJhbSBsaW5lIGFzIGJsb2NrIG9mIHRoZSB0ZXh0XG4gKiBAcmV0dXJuIGRvbSBlbGVtZW50IGFzIGxpc3RcbiAqL1xuXG5pbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSBcIi4vRG9tVXRpbGl0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhYmxlSFRNTCB7XG5cblx0cHJpdmF0ZSBEb21VdGlsaXRlczogYW55O1xuXHRwcml2YXRlIHRva2VuOiBUb2tlbi50YWJsZVRva2VuO1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi50YWJsZVRva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG5cdHJlbmRlcigpOiB2b2lkIHtcblxuXHRcdGxldCBjaGlsZHJlbjogYW55W107XG5cdFx0Y2hpbGRyZW4gPSB0aGlzLnRva2VuLmNoaWxkcmVuO1xuXG5cdFx0bGV0IHRhYmxlOiBzdHJpbmc7XG5cdFx0bGV0IHRhYmxlTm9kZTogRWxlbWVudDtcblxuXHRcdGxldCB0YWJsZUhlYWQ6IHN0cmluZztcblx0XHRsZXQgdGFibGVCb2R5OiBzdHJpbmc7XG5cblxuXHRcdHRhYmxlTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuXHRcdHRhYmxlTm9kZS5jbGFzc05hbWUgPSBcInNoYWRvdy1sZyBiZy13aGl0ZSBtYi00XCJcblxuXG5cdFx0dGFibGVCb2R5ID0gXCI8dGJvZHk+XCJcblx0XHRsZXQgaGVhZEFycmF5OiBzdHJpbmdbXTtcblx0XHRsZXQgYm9keUFycmF5OiBzdHJpbmdbXTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Ly90aGVhZFxuXHRcdFx0aWYgKGkgPT0gMCkge1xuXHRcdFx0XHR0YWJsZUhlYWQgPSBcIjx0aGVhZD48dHI+XCI7XG5cdFx0XHRcdGhlYWRBcnJheSA9IChjaGlsZHJlblswXS52YWx1ZSkuc3BsaXQoXCJ8XCIpO1xuXHRcdFx0XHRoZWFkQXJyYXkucG9wKCk7XG5cdFx0XHRcdGhlYWRBcnJheS5zaGlmdCgpO1xuXHRcdFx0XHRoZWFkQXJyYXkuZm9yRWFjaChoZWFkID0+IHtcblx0XHRcdFx0XHR0YWJsZUhlYWQgPSB0YWJsZUhlYWQgKyBgPHRoIGNsYXNzPVwiYmctYmx1ZS0xMDAgYm9yZGVyIHRleHQtbGVmdCBweC04IHB5LTRcIj4ke2hlYWR9PC90aD5gXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHRhYmxlSGVhZCA9IHRhYmxlSGVhZCArICc8L3RyPjwvdGhlYWQ+J1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlSGVhZDtcblxuXHRcdFx0XHQvL3Rib2R5XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRib2R5QXJyYXkgPSAoY2hpbGRyZW5baV0udmFsdWUpLnNwbGl0KFwifFwiKTtcblx0XHRcdFx0Ym9keUFycmF5LnBvcCgpO1xuXHRcdFx0XHRib2R5QXJyYXkuc2hpZnQoKTtcblx0XHRcdFx0dGFibGVCb2R5ID0gXCI8dHI+XCI7XG5cdFx0XHRcdGJvZHlBcnJheS5mb3JFYWNoKGJvZHkgPT4ge1xuXHRcdFx0XHRcdHRhYmxlQm9keSA9IHRhYmxlQm9keSArIGA8dGQgY2xhc3M9XCJib3JkZXIgcHgtOCBweS00XCI+JHtib2R5fTwvdGQ+YFxuXHRcdFx0XHR9KVxuXHRcdFx0XHR0YWJsZUJvZHkgPSB0YWJsZUJvZHkgKyAnPC90cj4nXG5cdFx0XHRcdHRhYmxlID0gdGFibGUgKyB0YWJsZUJvZHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRhYmxlID0gdGFibGUgKyBcIjwvdGJvZHk+XCI7XG5cdFx0dGFibGVOb2RlLmlubmVySFRNTCA9IHRhYmxlO1xuXG5cblx0XHRjb25zdCBwYXJhZ3JhcGhOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwYXJhZ3JhcGhOb2RlLmFwcGVuZENoaWxkKHRhYmxlTm9kZSk7XG5cblx0XHRsZXQgY29udGFpbmVyOiBDaGlsZE5vZGU7XG5cdFx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8ubGFzdENoaWxkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0XHR9XG5cdFx0Y29udGFpbmVyPy5hcHBlbmRDaGlsZChwYXJhZ3JhcGhOb2RlKTtcblxuXHR9XG5cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tY29yZS5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJXZWJXb3JrZXJcIi8+XG5cbnZhciBfc2VsZiA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblx0PyB3aW5kb3cgICAvLyBpZiBpbiBicm93c2VyXG5cdDogKFxuXHRcdCh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSlcblx0XHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHRcdDoge30gICAvLyBpZiBpbiBub2RlIGpzXG5cdCk7XG5cbi8qKlxuICogUHJpc206IExpZ2h0d2VpZ2h0LCByb2J1c3QsIGVsZWdhbnQgc3ludGF4IGhpZ2hsaWdodGluZ1xuICpcbiAqIEBsaWNlbnNlIE1JVCA8aHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQ+XG4gKiBAYXV0aG9yIExlYSBWZXJvdSA8aHR0cHM6Ly9sZWEudmVyb3UubWU+XG4gKiBAbmFtZXNwYWNlXG4gKiBAcHVibGljXG4gKi9cbnZhciBQcmlzbSA9IChmdW5jdGlvbiAoX3NlbGYpIHtcblxuXHQvLyBQcml2YXRlIGhlbHBlciB2YXJzXG5cdHZhciBsYW5nID0gLyg/Ol58XFxzKWxhbmcoPzp1YWdlKT8tKFtcXHctXSspKD89XFxzfCQpL2k7XG5cdHZhciB1bmlxdWVJZCA9IDA7XG5cblx0Ly8gVGhlIGdyYW1tYXIgb2JqZWN0IGZvciBwbGFpbnRleHRcblx0dmFyIHBsYWluVGV4dEdyYW1tYXIgPSB7fTtcblxuXG5cdHZhciBfID0ge1xuXHRcdC8qKlxuXHRcdCAqIEJ5IGRlZmF1bHQsIFByaXNtIHdpbGwgYXR0ZW1wdCB0byBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgKGJ5IGNhbGxpbmcge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbH0pIG9uIHRoZVxuXHRcdCAqIGN1cnJlbnQgcGFnZSBhZnRlciB0aGUgcGFnZSBmaW5pc2hlZCBsb2FkaW5nLiBUaGlzIG1pZ2h0IGJlIGEgcHJvYmxlbSBpZiBlLmcuIHlvdSB3YW50ZWQgdG8gYXN5bmNocm9ub3VzbHkgbG9hZFxuXHRcdCAqIGFkZGl0aW9uYWwgbGFuZ3VhZ2VzIG9yIHBsdWdpbnMgeW91cnNlbGYuXG5cdFx0ICpcblx0XHQgKiBCeSBzZXR0aW5nIHRoaXMgdmFsdWUgdG8gYHRydWVgLCBQcmlzbSB3aWxsIG5vdCBhdXRvbWF0aWNhbGx5IGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyBvbiB0aGUgcGFnZS5cblx0XHQgKlxuXHRcdCAqIFlvdSBvYnZpb3VzbHkgaGF2ZSB0byBjaGFuZ2UgdGhpcyB2YWx1ZSBiZWZvcmUgdGhlIGF1dG9tYXRpYyBoaWdobGlnaHRpbmcgc3RhcnRlZC4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0XHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdFx0ICogUHJpc20ubWFudWFsID0gdHJ1ZTtcblx0XHQgKiAvLyBhZGQgYSBuZXcgPHNjcmlwdD4gdG8gbG9hZCBQcmlzbSdzIHNjcmlwdFxuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogQGRlZmF1bHQgZmFsc2Vcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0bWFudWFsOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5tYW51YWwsXG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgaWYgUHJpc20gaXMgaW4gYSB3ZWIgd29ya2VyLCBpdCBhc3N1bWVzIHRoYXQgaXQgaXMgaW4gYSB3b3JrZXIgaXQgY3JlYXRlZCBpdHNlbGYsIHNvIGl0IHVzZXNcblx0XHQgKiBgYWRkRXZlbnRMaXN0ZW5lcmAgdG8gY29tbXVuaWNhdGUgd2l0aCBpdHMgcGFyZW50IGluc3RhbmNlLiBIb3dldmVyLCBpZiB5b3UncmUgdXNpbmcgUHJpc20gbWFudWFsbHkgaW4geW91clxuXHRcdCAqIG93biB3b3JrZXIsIHlvdSBkb24ndCB3YW50IGl0IHRvIGRvIHRoaXMuXG5cdFx0ICpcblx0XHQgKiBCeSBzZXR0aW5nIHRoaXMgdmFsdWUgdG8gYHRydWVgLCBQcmlzbSB3aWxsIG5vdCBhZGQgaXRzIG93biBsaXN0ZW5lcnMgdG8gdGhlIHdvcmtlci5cblx0XHQgKlxuXHRcdCAqIFlvdSBvYnZpb3VzbHkgaGF2ZSB0byBjaGFuZ2UgdGhpcyB2YWx1ZSBiZWZvcmUgUHJpc20gZXhlY3V0ZXMuIFRvIGRvIHRoaXMsIHlvdSBjYW4gYWRkIGFuXG5cdFx0ICogZW1wdHkgUHJpc20gb2JqZWN0IGludG8gdGhlIGdsb2JhbCBzY29wZSBiZWZvcmUgbG9hZGluZyB0aGUgUHJpc20gc2NyaXB0IGxpa2UgdGhpczpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogd2luZG93LlByaXNtID0gd2luZG93LlByaXNtIHx8IHt9O1xuXHRcdCAqIFByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlciA9IHRydWU7XG5cdFx0ICogLy8gTG9hZCBQcmlzbSdzIHNjcmlwdFxuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogQGRlZmF1bHQgZmFsc2Vcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0ZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIsXG5cblx0XHQvKipcblx0XHQgKiBBIG5hbWVzcGFjZSBmb3IgdXRpbGl0eSBtZXRob2RzLlxuXHRcdCAqXG5cdFx0ICogQWxsIGZ1bmN0aW9uIGluIHRoaXMgbmFtZXNwYWNlIHRoYXQgYXJlIG5vdCBleHBsaWNpdGx5IG1hcmtlZCBhcyBfcHVibGljXyBhcmUgZm9yIF9faW50ZXJuYWwgdXNlIG9ubHlfXyBhbmQgbWF5XG5cdFx0ICogY2hhbmdlIG9yIGRpc2FwcGVhciBhdCBhbnkgdGltZS5cblx0XHQgKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKi9cblx0XHR1dGlsOiB7XG5cdFx0XHRlbmNvZGU6IGZ1bmN0aW9uIGVuY29kZSh0b2tlbnMpIHtcblx0XHRcdFx0aWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBUb2tlbih0b2tlbnMudHlwZSwgZW5jb2RlKHRva2Vucy5jb250ZW50KSwgdG9rZW5zLmFsaWFzKTtcblx0XHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRva2VucykpIHtcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW5zLm1hcChlbmNvZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHR5cGUgb2YgdGhlIGdpdmVuIHZhbHVlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7YW55fSBvXG5cdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIHR5cGUobnVsbCkgICAgICA9PT0gJ051bGwnXG5cdFx0XHQgKiB0eXBlKHVuZGVmaW5lZCkgPT09ICdVbmRlZmluZWQnXG5cdFx0XHQgKiB0eXBlKDEyMykgICAgICAgPT09ICdOdW1iZXInXG5cdFx0XHQgKiB0eXBlKCdmb28nKSAgICAgPT09ICdTdHJpbmcnXG5cdFx0XHQgKiB0eXBlKHRydWUpICAgICAgPT09ICdCb29sZWFuJ1xuXHRcdFx0ICogdHlwZShbMSwgMl0pICAgID09PSAnQXJyYXknXG5cdFx0XHQgKiB0eXBlKHt9KSAgICAgICAgPT09ICdPYmplY3QnXG5cdFx0XHQgKiB0eXBlKFN0cmluZykgICAgPT09ICdGdW5jdGlvbidcblx0XHRcdCAqIHR5cGUoL2FiYysvKSAgICA9PT0gJ1JlZ0V4cCdcblx0XHRcdCAqL1xuXHRcdFx0dHlwZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgYSB1bmlxdWUgbnVtYmVyIGZvciB0aGUgZ2l2ZW4gb2JqZWN0LiBMYXRlciBjYWxscyB3aWxsIHN0aWxsIHJldHVybiB0aGUgc2FtZSBudW1iZXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHRcdFx0ICogQHJldHVybnMge251bWJlcn1cblx0XHRcdCAqL1xuXHRcdFx0b2JqSWQ6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdFx0aWYgKCFvYmpbJ19faWQnXSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX2lkJywgeyB2YWx1ZTogKyt1bmlxdWVJZCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqWydfX2lkJ107XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIENyZWF0ZXMgYSBkZWVwIGNsb25lIG9mIHRoZSBnaXZlbiBvYmplY3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gaW50ZW5kZWQgdXNlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gY2xvbmUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtUfSBvXG5cdFx0XHQgKiBAcGFyYW0ge1JlY29yZDxudW1iZXIsIGFueT59IFt2aXNpdGVkXVxuXHRcdFx0ICogQHJldHVybnMge1R9XG5cdFx0XHQgKiBAdGVtcGxhdGUgVFxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZTogZnVuY3Rpb24gZGVlcENsb25lKG8sIHZpc2l0ZWQpIHtcblx0XHRcdFx0dmlzaXRlZCA9IHZpc2l0ZWQgfHwge307XG5cblx0XHRcdFx0dmFyIGNsb25lOyB2YXIgaWQ7XG5cdFx0XHRcdHN3aXRjaCAoXy51dGlsLnR5cGUobykpIHtcblx0XHRcdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIGFueT59ICovICh7fSk7XG5cdFx0XHRcdFx0XHR2aXNpdGVkW2lkXSA9IGNsb25lO1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xvbmVba2V5XSA9IGRlZXBDbG9uZShvW2tleV0sIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb25lID0gW107XG5cdFx0XHRcdFx0XHR2aXNpdGVkW2lkXSA9IGNsb25lO1xuXG5cdFx0XHRcdFx0XHQoLyoqIEB0eXBlIHtBcnJheX0gKi8oLyoqIEB0eXBlIHthbnl9ICovKG8pKSkuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuXHRcdFx0XHRcdFx0XHRjbG9uZVtpXSA9IGRlZXBDbG9uZSh2LCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIG87XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgUHJpc20gbGFuZ3VhZ2Ugb2YgdGhlIGdpdmVuIGVsZW1lbnQgc2V0IGJ5IGEgYGxhbmd1YWdlLXh4eHhgIG9yIGBsYW5nLXh4eHhgIGNsYXNzLlxuXHRcdFx0ICpcblx0XHRcdCAqIElmIG5vIGxhbmd1YWdlIGlzIHNldCBmb3IgdGhlIGVsZW1lbnQgb3IgdGhlIGVsZW1lbnQgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLCBgbm9uZWAgd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdGdldExhbmd1YWdlOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBtID0gbGFuZy5leGVjKGVsZW1lbnQuY2xhc3NOYW1lKTtcblx0XHRcdFx0XHRpZiAobSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1bMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gJ25vbmUnO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXRzIHRoZSBQcmlzbSBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Mgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Vcblx0XHRcdCAqIEByZXR1cm5zIHt2b2lkfVxuXHRcdFx0ICovXG5cdFx0XHRzZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQsIGxhbmd1YWdlKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBhbGwgYGxhbmd1YWdlLXh4eHhgIGNsYXNzZXNcblx0XHRcdFx0Ly8gKHRoaXMgbWlnaHQgbGVhdmUgYmVoaW5kIGEgbGVhZGluZyBzcGFjZSlcblx0XHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKFJlZ0V4cChsYW5nLCAnZ2knKSwgJycpO1xuXG5cdFx0XHRcdC8vIGFkZCB0aGUgbmV3IGBsYW5ndWFnZS14eHh4YCBjbGFzc1xuXHRcdFx0XHQvLyAodXNpbmcgYGNsYXNzTGlzdGAgd2lsbCBhdXRvbWF0aWNhbGx5IGNsZWFuIHVwIHNwYWNlcyBmb3IgdXMpXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2UtJyArIGxhbmd1YWdlKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgc2NyaXB0IGVsZW1lbnQgdGhhdCBpcyBjdXJyZW50bHkgZXhlY3V0aW5nLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoaXMgZG9lcyBfX25vdF9fIHdvcmsgZm9yIGxpbmUgc2NyaXB0IGVsZW1lbnQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybnMge0hUTUxTY3JpcHRFbGVtZW50IHwgbnVsbH1cblx0XHRcdCAqL1xuXHRcdFx0Y3VycmVudFNjcmlwdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgnY3VycmVudFNjcmlwdCcgaW4gZG9jdW1lbnQgJiYgMSA8IDIgLyogaGFjayB0byB0cmlwIFRTJyBmbG93IGFuYWx5c2lzICovKSB7XG5cdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJRTExIHdvcmthcm91bmRcblx0XHRcdFx0Ly8gd2UnbGwgZ2V0IHRoZSBzcmMgb2YgdGhlIGN1cnJlbnQgc2NyaXB0IGJ5IHBhcnNpbmcgSUUxMSdzIGVycm9yIHN0YWNrIHRyYWNlXG5cdFx0XHRcdC8vIHRoaXMgd2lsbCBub3Qgd29yayBmb3IgaW5saW5lIHNjcmlwdHNcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcigpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHQvLyBHZXQgZmlsZSBzcmMgdXJsIGZyb20gc3RhY2suIFNwZWNpZmljYWxseSB3b3JrcyB3aXRoIHRoZSBmb3JtYXQgb2Ygc3RhY2sgdHJhY2VzIGluIElFLlxuXHRcdFx0XHRcdC8vIEEgc3RhY2sgd2lsbCBsb29rIGxpa2UgdGhpczpcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIEVycm9yXG5cdFx0XHRcdFx0Ly8gICAgYXQgXy51dGlsLmN1cnJlbnRTY3JpcHQgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjExOTo1KVxuXHRcdFx0XHRcdC8vICAgIGF0IEdsb2JhbCBjb2RlIChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczo2MDY6MSlcblxuXHRcdFx0XHRcdHZhciBzcmMgPSAoL2F0IFteKFxcclxcbl0qXFwoKC4qKTpbXjpdKzpbXjpdK1xcKSQvaS5leGVjKGVyci5zdGFjaykgfHwgW10pWzFdO1xuXHRcdFx0XHRcdGlmIChzcmMpIHtcblx0XHRcdFx0XHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSBpbiBzY3JpcHRzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChzY3JpcHRzW2ldLnNyYyA9PSBzcmMpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2NyaXB0c1tpXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHdoZXRoZXIgYSBnaXZlbiBjbGFzcyBpcyBhY3RpdmUgZm9yIGBlbGVtZW50YC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2xhc3MgY2FuIGJlIGFjdGl2YXRlZCBpZiBgZWxlbWVudGAgb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIHRoZSBnaXZlbiBjbGFzcyBhbmQgaXQgY2FuIGJlIGRlYWN0aXZhdGVkXG5cdFx0XHQgKiBpZiBgZWxlbWVudGAgb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIGdpdmVuIGNsYXNzLiBUaGUgX25lZ2F0ZWQgdmVyc2lvbl8gb2YgdGhlXG5cdFx0XHQgKiBnaXZlbiBjbGFzcyBpcyBqdXN0IHRoZSBnaXZlbiBjbGFzcyB3aXRoIGEgYG5vLWAgcHJlZml4LlxuXHRcdFx0ICpcblx0XHRcdCAqIFdoZXRoZXIgdGhlIGNsYXNzIGlzIGFjdGl2ZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIGBlbGVtZW50YCAod2hlcmUgYGVsZW1lbnRgIGl0c2VsZiBpc1xuXHRcdFx0ICogY2xvc2VzdCBhbmNlc3RvcikgdGhhdCBoYXMgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQuIElmIG5laXRoZXIgYGVsZW1lbnRgIG5vciBhbnkgb2YgaXRzXG5cdFx0XHQgKiBhbmNlc3RvcnMgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdCwgdGhlbiB0aGUgZGVmYXVsdCBhY3RpdmF0aW9uIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogSW4gdGhlIHBhcmFkb3hpY2FsIHNpdHVhdGlvbiB3aGVyZSB0aGUgY2xvc2VzdCBhbmNlc3RvciBjb250YWlucyBfX2JvdGhfXyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIHRoZSBuZWdhdGVkXG5cdFx0XHQgKiB2ZXJzaW9uIG9mIGl0LCB0aGUgY2xhc3MgaXMgY29uc2lkZXJlZCBhY3RpdmUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG5cdFx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWZhdWx0QWN0aXZhdGlvbj1mYWxzZV1cblx0XHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHRcdFx0ICovXG5cdFx0XHRpc0FjdGl2ZTogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSwgZGVmYXVsdEFjdGl2YXRpb24pIHtcblx0XHRcdFx0dmFyIG5vID0gJ25vLScgKyBjbGFzc05hbWU7XG5cblx0XHRcdFx0d2hpbGUgKGVsZW1lbnQpIHtcblx0XHRcdFx0XHR2YXIgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XG5cdFx0XHRcdFx0aWYgKGNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGNsYXNzTGlzdC5jb250YWlucyhubykpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gISFkZWZhdWx0QWN0aXZhdGlvbjtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBuYW1lc3BhY2UgY29udGFpbnMgYWxsIGN1cnJlbnRseSBsb2FkZWQgbGFuZ3VhZ2VzIGFuZCB0aGUgc29tZSBoZWxwZXIgZnVuY3Rpb25zIHRvIGNyZWF0ZSBhbmQgbW9kaWZ5IGxhbmd1YWdlcy5cblx0XHQgKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0bGFuZ3VhZ2VzOiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBncmFtbWFyIGZvciBwbGFpbiwgdW5mb3JtYXR0ZWQgdGV4dC5cblx0XHRcdCAqL1xuXHRcdFx0cGxhaW46IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHRwbGFpbnRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0ZXh0OiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0dHh0OiBwbGFpblRleHRHcmFtbWFyLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIGxhbmd1YWdlIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBhcHBlbmRzIHRoZSBnaXZlbiB0b2tlbnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgYSB0b2tlbiBpbiBgcmVkZWZgIGFsc28gYXBwZWFycyBpbiB0aGUgY29waWVkIGxhbmd1YWdlLCB0aGVuIHRoZSBleGlzdGluZyB0b2tlbiBpbiB0aGUgY29waWVkIGxhbmd1YWdlXG5cdFx0XHQgKiB3aWxsIGJlIG92ZXJ3cml0dGVuIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvbi5cblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBCZXN0IHByYWN0aWNlc1xuXHRcdFx0ICpcblx0XHRcdCAqIFNpbmNlIHRoZSBwb3NpdGlvbiBvZiBvdmVyd3JpdGluZyB0b2tlbnMgKHRva2VuIGluIGByZWRlZmAgdGhhdCBvdmVyd3JpdGUgdG9rZW5zIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UpXG5cdFx0XHQgKiBkb2Vzbid0IG1hdHRlciwgdGhleSBjYW4gdGVjaG5pY2FsbHkgYmUgaW4gYW55IG9yZGVyLiBIb3dldmVyLCB0aGlzIGNhbiBiZSBjb25mdXNpbmcgdG8gb3RoZXJzIHRoYXQgdHJ5aW5nIHRvXG5cdFx0XHQgKiB1bmRlcnN0YW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGJlY2F1c2UsIG5vcm1hbGx5LCB0aGUgb3JkZXIgb2YgdG9rZW5zIG1hdHRlcnMgaW4gUHJpc20gZ3JhbW1hcnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlcmVmb3JlLCBpdCBpcyBlbmNvdXJhZ2VkIHRvIG9yZGVyIG92ZXJ3cml0aW5nIHRva2VucyBhY2NvcmRpbmcgdG8gdGhlIHBvc2l0aW9ucyBvZiB0aGUgb3ZlcndyaXR0ZW4gdG9rZW5zLlxuXHRcdFx0ICogRnVydGhlcm1vcmUsIGFsbCBub24tb3ZlcndyaXRpbmcgdG9rZW5zIHNob3VsZCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIG92ZXJ3cml0aW5nIG9uZXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgbGFuZ3VhZ2UgdG8gZXh0ZW5kLiBUaGlzIGhhcyB0byBiZSBhIGtleSBpbiBgUHJpc20ubGFuZ3VhZ2VzYC5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gcmVkZWYgVGhlIG5ldyB0b2tlbnMgdG8gYXBwZW5kLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgbGFuZ3VhZ2UgY3JlYXRlZC5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXNbJ2Nzcy13aXRoLWNvbG9ycyddID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY3NzJywge1xuXHRcdFx0ICogICAgIC8vIFByaXNtLmxhbmd1YWdlcy5jc3MgYWxyZWFkeSBoYXMgYSAnY29tbWVudCcgdG9rZW4sIHNvIHRoaXMgdG9rZW4gd2lsbCBvdmVyd3JpdGUgQ1NTJyAnY29tbWVudCcgdG9rZW5cblx0XHRcdCAqICAgICAvLyBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb25cblx0XHRcdCAqICAgICAnY29tbWVudCc6IHsgLi4uIH0sXG5cdFx0XHQgKiAgICAgLy8gQ1NTIGRvZXNuJ3QgaGF2ZSBhICdjb2xvcicgdG9rZW4sIHNvIHRoaXMgdG9rZW4gd2lsbCBiZSBhcHBlbmRlZFxuXHRcdFx0ICogICAgICdjb2xvcic6IC9cXGIoPzpyZWR8Z3JlZW58Ymx1ZSlcXGIvXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqL1xuXHRcdFx0ZXh0ZW5kOiBmdW5jdGlvbiAoaWQsIHJlZGVmKSB7XG5cdFx0XHRcdHZhciBsYW5nID0gXy51dGlsLmNsb25lKF8ubGFuZ3VhZ2VzW2lkXSk7XG5cblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIHJlZGVmKSB7XG5cdFx0XHRcdFx0bGFuZ1trZXldID0gcmVkZWZba2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBsYW5nO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbnNlcnRzIHRva2VucyBfYmVmb3JlXyBhbm90aGVyIHRva2VuIGluIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBvciBhbnkgb3RoZXIgZ3JhbW1hci5cblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBVc2FnZVxuXHRcdFx0ICpcblx0XHRcdCAqIFRoaXMgaGVscGVyIG1ldGhvZCBtYWtlcyBpdCBlYXN5IHRvIG1vZGlmeSBleGlzdGluZyBsYW5ndWFnZXMuIEZvciBleGFtcGxlLCB0aGUgQ1NTIGxhbmd1YWdlIGRlZmluaXRpb25cblx0XHRcdCAqIG5vdCBvbmx5IGRlZmluZXMgQ1NTIGhpZ2hsaWdodGluZyBmb3IgQ1NTIGRvY3VtZW50cywgYnV0IGFsc28gbmVlZHMgdG8gZGVmaW5lIGhpZ2hsaWdodGluZyBmb3IgQ1NTIGVtYmVkZGVkXG5cdFx0XHQgKiBpbiBIVE1MIHRocm91Z2ggYDxzdHlsZT5gIGVsZW1lbnRzLiBUbyBkbyB0aGlzLCBpdCBuZWVkcyB0byBtb2RpZnkgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGFuZCBhZGQgdGhlXG5cdFx0XHQgKiBhcHByb3ByaWF0ZSB0b2tlbnMuIEhvd2V2ZXIsIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBpcyBhIHJlZ3VsYXIgSmF2YVNjcmlwdCBvYmplY3QgbGl0ZXJhbCwgc28gaWYgeW91IGRvXG5cdFx0XHQgKiB0aGlzOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnN0eWxlID0ge1xuXHRcdFx0ICogICAgIC8vIHRva2VuXG5cdFx0XHQgKiB9O1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogdGhlbiB0aGUgYHN0eWxlYCB0b2tlbiB3aWxsIGJlIGFkZGVkIChhbmQgcHJvY2Vzc2VkKSBhdCB0aGUgZW5kLiBgaW5zZXJ0QmVmb3JlYCBhbGxvd3MgeW91IHRvIGluc2VydCB0b2tlbnNcblx0XHRcdCAqIGJlZm9yZSBleGlzdGluZyB0b2tlbnMuIEZvciB0aGUgQ1NTIGV4YW1wbGUgYWJvdmUsIHlvdSB3b3VsZCB1c2UgaXQgbGlrZSB0aGlzOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCB7XG5cdFx0XHQgKiAgICAgJ3N0eWxlJzoge1xuXHRcdFx0ICogICAgICAgICAvLyB0b2tlblxuXHRcdFx0ICogICAgIH1cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgU3BlY2lhbCBjYXNlc1xuXHRcdFx0ICpcblx0XHRcdCAqIElmIHRoZSBncmFtbWFycyBvZiBgaW5zaWRlYCBhbmQgYGluc2VydGAgaGF2ZSB0b2tlbnMgd2l0aCB0aGUgc2FtZSBuYW1lLCB0aGUgdG9rZW5zIGluIGBpbnNpZGVgJ3MgZ3JhbW1hclxuXHRcdFx0ICogd2lsbCBiZSBpZ25vcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoaXMgYmVoYXZpb3IgY2FuIGJlIHVzZWQgdG8gaW5zZXJ0IHRva2VucyBhZnRlciBgYmVmb3JlYDpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7XG5cdFx0XHQgKiAgICAgJ2NvbW1lbnQnOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLmNvbW1lbnQsXG5cdFx0XHQgKiAgICAgLy8gdG9rZW5zIGFmdGVyICdjb21tZW50J1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBMaW1pdGF0aW9uc1xuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBtYWluIHByb2JsZW0gYGluc2VydEJlZm9yZWAgaGFzIHRvIHNvbHZlIGlzIGl0ZXJhdGlvbiBvcmRlci4gU2luY2UgRVMyMDE1LCB0aGUgaXRlcmF0aW9uIG9yZGVyIGZvciBvYmplY3Rcblx0XHRcdCAqIHByb3BlcnRpZXMgaXMgZ3VhcmFudGVlZCB0byBiZSB0aGUgaW5zZXJ0aW9uIG9yZGVyIChleGNlcHQgZm9yIGludGVnZXIga2V5cykgYnV0IHNvbWUgYnJvd3NlcnMgYmVoYXZlXG5cdFx0XHQgKiBkaWZmZXJlbnRseSB3aGVuIGtleXMgYXJlIGRlbGV0ZWQgYW5kIHJlLWluc2VydGVkLiBTbyBgaW5zZXJ0QmVmb3JlYCBjYW4ndCBiZSBpbXBsZW1lbnRlZCBieSB0ZW1wb3JhcmlseVxuXHRcdFx0ICogZGVsZXRpbmcgcHJvcGVydGllcyB3aGljaCBpcyBuZWNlc3NhcnkgdG8gaW5zZXJ0IGF0IGFyYml0cmFyeSBwb3NpdGlvbnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogVG8gc29sdmUgdGhpcyBwcm9ibGVtLCBgaW5zZXJ0QmVmb3JlYCBkb2Vzbid0IGFjdHVhbGx5IGluc2VydCB0aGUgZ2l2ZW4gdG9rZW5zIGludG8gdGhlIHRhcmdldCBvYmplY3QuXG5cdFx0XHQgKiBJbnN0ZWFkLCBpdCB3aWxsIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIHJlcGxhY2UgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIHRhcmdldCBvYmplY3Qgd2l0aCB0aGUgbmV3IG9uZS4gVGhpc1xuXHRcdFx0ICogY2FuIGJlIGRvbmUgd2l0aG91dCB0ZW1wb3JhcmlseSBkZWxldGluZyBwcm9wZXJ0aWVzLCBzbyB0aGUgaXRlcmF0aW9uIG9yZGVyIGlzIHdlbGwtZGVmaW5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBIb3dldmVyLCBvbmx5IHJlZmVyZW5jZXMgdGhhdCBjYW4gYmUgcmVhY2hlZCBmcm9tIGBQcmlzbS5sYW5ndWFnZXNgIG9yIGBpbnNlcnRgIHdpbGwgYmUgcmVwbGFjZWQuIEkuZS4gaWZcblx0XHRcdCAqIHlvdSBob2xkIHRoZSB0YXJnZXQgb2JqZWN0IGluIGEgdmFyaWFibGUsIHRoZW4gdGhlIHZhbHVlIG9mIHRoZSB2YXJpYWJsZSB3aWxsIG5vdCBjaGFuZ2UuXG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIHZhciBvbGRNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRcdFx0ICogdmFyIG5ld01hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50JywgeyAuLi4gfSk7XG5cdFx0XHQgKlxuXHRcdFx0ICogYXNzZXJ0KG9sZE1hcmt1cCAhPT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0XHQgKiBhc3NlcnQobmV3TWFya3VwID09PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpbnNpZGUgVGhlIHByb3BlcnR5IG9mIGByb290YCAoZS5nLiBhIGxhbmd1YWdlIGlkIGluIGBQcmlzbS5sYW5ndWFnZXNgKSB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGJlZm9yZSBUaGUga2V5IHRvIGluc2VydCBiZWZvcmUuXG5cdFx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGluc2VydCBBbiBvYmplY3QgY29udGFpbmluZyB0aGUga2V5LXZhbHVlIHBhaXJzIHRvIGJlIGluc2VydGVkLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBbcm9vdF0gVGhlIG9iamVjdCBjb250YWluaW5nIGBpbnNpZGVgLCBpLmUuIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcblx0XHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBEZWZhdWx0cyB0byBgUHJpc20ubGFuZ3VhZ2VzYC5cblx0XHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGdyYW1tYXIgb2JqZWN0LlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChpbnNpZGUsIGJlZm9yZSwgaW5zZXJ0LCByb290KSB7XG5cdFx0XHRcdHJvb3QgPSByb290IHx8IC8qKiBAdHlwZSB7YW55fSAqLyAoXy5sYW5ndWFnZXMpO1xuXHRcdFx0XHR2YXIgZ3JhbW1hciA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0LyoqIEB0eXBlIHtHcmFtbWFyfSAqL1xuXHRcdFx0XHR2YXIgcmV0ID0ge307XG5cblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0XHRcdGlmIChncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXG5cdFx0XHRcdFx0XHRpZiAodG9rZW4gPT0gYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gRG8gbm90IGluc2VydCB0b2tlbiB3aGljaCBhbHNvIG9jY3VyIGluIGluc2VydC4gU2VlICMxNTI1XG5cdFx0XHRcdFx0XHRpZiAoIWluc2VydC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblx0XHRcdFx0XHRcdFx0cmV0W3Rva2VuXSA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvbGQgPSByb290W2luc2lkZV07XG5cdFx0XHRcdHJvb3RbaW5zaWRlXSA9IHJldDtcblxuXHRcdFx0XHQvLyBVcGRhdGUgcmVmZXJlbmNlcyBpbiBvdGhlciBsYW5ndWFnZSBkZWZpbml0aW9uc1xuXHRcdFx0XHRfLmxhbmd1YWdlcy5ERlMoXy5sYW5ndWFnZXMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSBvbGQgJiYga2V5ICE9IGluc2lkZSkge1xuXHRcdFx0XHRcdFx0dGhpc1trZXldID0gcmV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIFRyYXZlcnNlIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiB3aXRoIERlcHRoIEZpcnN0IFNlYXJjaFxuXHRcdFx0REZTOiBmdW5jdGlvbiBERlMobywgY2FsbGJhY2ssIHR5cGUsIHZpc2l0ZWQpIHtcblx0XHRcdFx0dmlzaXRlZCA9IHZpc2l0ZWQgfHwge307XG5cblx0XHRcdFx0dmFyIG9iaklkID0gXy51dGlsLm9iaklkO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgaW4gbykge1xuXHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG8sIGksIG9baV0sIHR5cGUgfHwgaSk7XG5cblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG9baV07XG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHlUeXBlID0gXy51dGlsLnR5cGUocHJvcGVydHkpO1xuXG5cdFx0XHRcdFx0XHRpZiAocHJvcGVydHlUeXBlID09PSAnT2JqZWN0JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIG51bGwsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eVR5cGUgPT09ICdBcnJheScgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBpLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0cGx1Z2luczoge30sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIGlzIHRoZSBtb3N0IGhpZ2gtbGV2ZWwgZnVuY3Rpb24gaW4gUHJpc23igJlzIEFQSS5cblx0XHQgKiBJdCBmZXRjaGVzIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxscyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb25cblx0XHQgKiBlYWNoIG9uZSBvZiB0aGVtLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIGBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKWAuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gU2FtZSBhcyBpbiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXJ9LlxuXHRcdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gU2FtZSBhcyBpbiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXJ9LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRBbGw6IGZ1bmN0aW9uIChhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjayk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZldGNoZXMgYWxsIHRoZSBkZXNjZW5kYW50cyBvZiBgY29udGFpbmVyYCB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzXG5cdFx0ICoge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtaGlnaGxpZ2h0YWxsYFxuXHRcdCAqIDIuIGBiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IGZvciBlYWNoIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1BhcmVudE5vZGV9IGNvbnRhaW5lciBUaGUgcm9vdCBlbGVtZW50LCB3aG9zZSBkZXNjZW5kYW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIHdpbGwgYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgZWFjaCBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzLlxuXHRcdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBlYWNoIGVsZW1lbnQgYWZ0ZXIgaXRzIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRBbGxVbmRlcjogZnVuY3Rpb24gKGNvbnRhaW5lciwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXG5cdFx0XHRcdGNvbnRhaW5lcjogY29udGFpbmVyLFxuXHRcdFx0XHRzZWxlY3RvcjogJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIGNvZGUsIGNvZGVbY2xhc3MqPVwibGFuZy1cIl0sIFtjbGFzcyo9XCJsYW5nLVwiXSBjb2RlJ1xuXHRcdFx0fTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHRhbGwnLCBlbnYpO1xuXG5cdFx0XHRlbnYuZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZW52LmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGVudi5zZWxlY3RvcikpO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgZWxlbWVudDsgKGVsZW1lbnQgPSBlbnYuZWxlbWVudHNbaSsrXSk7KSB7XG5cdFx0XHRcdF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgZW52LmNhbGxiYWNrKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSGlnaGxpZ2h0cyB0aGUgY29kZSBpbnNpZGUgYSBzaW5nbGUgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1zYW5pdHktY2hlY2tgXG5cdFx0ICogMi4gYGJlZm9yZS1oaWdobGlnaHRgXG5cdFx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHR9LiBUaGVzZSBob29rcyB3aWxsIGJlIHJ1biBieSBhbiBhc3luY2hyb25vdXMgd29ya2VyIGlmIGBhc3luY2AgaXMgYHRydWVgLlxuXHRcdCAqIDQuIGBiZWZvcmUtaW5zZXJ0YFxuXHRcdCAqIDUuIGBhZnRlci1oaWdobGlnaHRgXG5cdFx0ICogNi4gYGNvbXBsZXRlYFxuXHRcdCAqXG5cdFx0ICogU29tZSB0aGUgYWJvdmUgaG9va3Mgd2lsbCBiZSBza2lwcGVkIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBhbnkgdGV4dCBvciB0aGVyZSBpcyBubyBncmFtbWFyIGxvYWRlZCBmb3Jcblx0XHQgKiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGNvZGUuXG5cdFx0ICogSXQgbXVzdCBoYXZlIGEgY2xhc3Mgb2YgYGxhbmd1YWdlLXh4eHhgIHRvIGJlIHByb2Nlc3NlZCwgd2hlcmUgYHh4eHhgIGlzIGEgdmFsaWQgbGFuZ3VhZ2UgaWRlbnRpZmllci5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciB0aGUgZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vyc1xuXHRcdCAqIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kIGF2b2lkIGJsb2NraW5nIHRoZSBVSSB3aGVuIGhpZ2hsaWdodGluZyB2ZXJ5IGxhcmdlIGNodW5rcyBvZiBjb2RlLiBUaGlzIG9wdGlvbiBpc1xuXHRcdCAqIFtkaXNhYmxlZCBieSBkZWZhdWx0XShodHRwczovL3ByaXNtanMuY29tL2ZhcS5odG1sI3doeS1pcy1hc3luY2hyb25vdXMtaGlnaGxpZ2h0aW5nLWRpc2FibGVkLWJ5LWRlZmF1bHQpLlxuXHRcdCAqXG5cdFx0ICogTm90ZTogQWxsIGxhbmd1YWdlIGRlZmluaXRpb25zIHJlcXVpcmVkIHRvIGhpZ2hsaWdodCB0aGUgY29kZSBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSBtYWluIGBwcmlzbS5qc2AgZmlsZSBmb3Jcblx0XHQgKiBhc3luY2hyb25vdXMgaGlnaGxpZ2h0aW5nIHRvIHdvcmsuIFlvdSBjYW4gYnVpbGQgeW91ciBvd24gYnVuZGxlIG9uIHRoZVxuXHRcdCAqIFtEb3dubG9hZCBwYWdlXShodHRwczovL3ByaXNtanMuY29tL2Rvd25sb2FkLmh0bWwpLlxuXHRcdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogTW9zdGx5IHVzZWZ1bCB3aGVuIGBhc3luY2AgaXMgYHRydWVgLCBzaW5jZSBpbiB0aGF0IGNhc2UsIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZSBhc3luY2hyb25vdXNseS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0RWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Ly8gRmluZCBsYW5ndWFnZVxuXHRcdFx0dmFyIGxhbmd1YWdlID0gXy51dGlsLmdldExhbmd1YWdlKGVsZW1lbnQpO1xuXHRcdFx0dmFyIGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG5cblx0XHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgZWxlbWVudCwgaWYgbm90IHByZXNlbnRcblx0XHRcdF8udXRpbC5zZXRMYW5ndWFnZShlbGVtZW50LCBsYW5ndWFnZSk7XG5cblx0XHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgcGFyZW50LCBmb3Igc3R5bGluZ1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnKSB7XG5cdFx0XHRcdF8udXRpbC5zZXRMYW5ndWFnZShwYXJlbnQsIGxhbmd1YWdlKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGNvZGU6IGNvZGVcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGluc2VydEhpZ2hsaWdodGVkQ29kZShoaWdobGlnaHRlZENvZGUpIHtcblx0XHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZW52KTtcblxuXHRcdFx0Ly8gcGx1Z2lucyBtYXkgY2hhbmdlL2FkZCB0aGUgcGFyZW50L2VsZW1lbnRcblx0XHRcdHBhcmVudCA9IGVudi5lbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJyAmJiAhcGFyZW50Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSkge1xuXHRcdFx0XHRwYXJlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZW52LmNvZGUpIHtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0XHRpZiAoIWVudi5ncmFtbWFyKSB7XG5cdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLnV0aWwuZW5jb2RlKGVudi5jb2RlKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFzeW5jICYmIF9zZWxmLldvcmtlcikge1xuXHRcdFx0XHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcblxuXHRcdFx0XHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShldnQuZGF0YSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0d29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRsYW5ndWFnZTogZW52Lmxhbmd1YWdlLFxuXHRcdFx0XHRcdGNvZGU6IGVudi5jb2RlLFxuXHRcdFx0XHRcdGltbWVkaWF0ZUNsb3NlOiB0cnVlXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBMb3ctbGV2ZWwgZnVuY3Rpb24sIG9ubHkgdXNlIGlmIHlvdSBrbm93IHdoYXQgeW914oCZcmUgZG9pbmcuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHRcdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhIHN0cmluZyB3aXRoIHRoZSBIVE1MIHByb2R1Y2VkLlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXRva2VuaXplYFxuXHRcdCAqIDIuIGBhZnRlci10b2tlbml6ZWBcblx0XHQgKiAzLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIHBhc3NlZCB0byBgZ3JhbW1hcmAuXG5cdFx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIGhpZ2hsaWdodGVkIEhUTUwuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogUHJpc20uaGlnaGxpZ2h0KCd2YXIgZm9vID0gdHJ1ZTsnLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCwgJ2phdmFzY3JpcHQnKTtcblx0XHQgKi9cblx0XHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0Y29kZTogdGV4dCxcblx0XHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0XHR9O1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS10b2tlbml6ZScsIGVudik7XG5cdFx0XHRpZiAoIWVudi5ncmFtbWFyKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVGhlIGxhbmd1YWdlIFwiJyArIGVudi5sYW5ndWFnZSArICdcIiBoYXMgbm8gZ3JhbW1hci4nKTtcblx0XHRcdH1cblx0XHRcdGVudi50b2tlbnMgPSBfLnRva2VuaXplKGVudi5jb2RlLCBlbnYuZ3JhbW1hcik7XG5cdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShfLnV0aWwuZW5jb2RlKGVudi50b2tlbnMpLCBlbnYubGFuZ3VhZ2UpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIGlzIHRoZSBoZWFydCBvZiBQcmlzbSwgYW5kIHRoZSBtb3N0IGxvdy1sZXZlbCBmdW5jdGlvbiB5b3UgY2FuIHVzZS4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdFx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIHRva2VuaXplZCBjb2RlLlxuXHRcdCAqXG5cdFx0ICogV2hlbiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBpbmNsdWRlcyBuZXN0ZWQgdG9rZW5zLCB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHJlY3Vyc2l2ZWx5IG9uIGVhY2ggb2YgdGhlc2UgdG9rZW5zLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBtZXRob2QgY291bGQgYmUgdXNlZnVsIGluIG90aGVyIGNvbnRleHRzIGFzIHdlbGwsIGFzIGEgdmVyeSBjcnVkZSBwYXJzZXIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEByZXR1cm5zIHtUb2tlblN0cmVhbX0gQW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQgdG9rZW5zLCBhIHRva2VuIHN0cmVhbS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBsZXQgY29kZSA9IGB2YXIgZm9vID0gMDtgO1xuXHRcdCAqIGxldCB0b2tlbnMgPSBQcmlzbS50b2tlbml6ZShjb2RlLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCk7XG5cdFx0ICogdG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xuXHRcdCAqICAgICBpZiAodG9rZW4gaW5zdGFuY2VvZiBQcmlzbS5Ub2tlbiAmJiB0b2tlbi50eXBlID09PSAnbnVtYmVyJykge1xuXHRcdCAqICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIG51bWVyaWMgbGl0ZXJhbDogJHt0b2tlbi5jb250ZW50fWApO1xuXHRcdCAqICAgICB9XG5cdFx0ICogfSk7XG5cdFx0ICovXG5cdFx0dG9rZW5pemU6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyKSB7XG5cdFx0XHR2YXIgcmVzdCA9IGdyYW1tYXIucmVzdDtcblx0XHRcdGlmIChyZXN0KSB7XG5cdFx0XHRcdGZvciAodmFyIHRva2VuIGluIHJlc3QpIHtcblx0XHRcdFx0XHRncmFtbWFyW3Rva2VuXSA9IHJlc3RbdG9rZW5dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGdyYW1tYXIucmVzdDtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHRva2VuTGlzdCA9IG5ldyBMaW5rZWRMaXN0KCk7XG5cdFx0XHRhZGRBZnRlcih0b2tlbkxpc3QsIHRva2VuTGlzdC5oZWFkLCB0ZXh0KTtcblxuXHRcdFx0bWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgdG9rZW5MaXN0LmhlYWQsIDApO1xuXG5cdFx0XHRyZXR1cm4gdG9BcnJheSh0b2tlbkxpc3QpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhvb2tzOiB7XG5cdFx0XHRhbGw6IHt9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEFkZHMgdGhlIGdpdmVuIGNhbGxiYWNrIHRvIHRoZSBsaXN0IG9mIGNhbGxiYWNrcyBmb3IgdGhlIGdpdmVuIGhvb2suXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBob29rIGl0IGlzIHJlZ2lzdGVyZWQgZm9yIGlzIHJ1bi5cblx0XHRcdCAqIEhvb2tzIGFyZSB1c3VhbGx5IGRpcmVjdGx5IHJ1biBieSBhIGhpZ2hsaWdodCBmdW5jdGlvbiBidXQgeW91IGNhbiBhbHNvIHJ1biBob29rcyB5b3Vyc2VsZi5cblx0XHRcdCAqXG5cdFx0XHQgKiBPbmUgY2FsbGJhY2sgZnVuY3Rpb24gY2FuIGJlIHJlZ2lzdGVyZWQgdG8gbXVsdGlwbGUgaG9va3MgYW5kIHRoZSBzYW1lIGhvb2sgbXVsdGlwbGUgdGltZXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0XHQgKiBAcGFyYW0ge0hvb2tDYWxsYmFja30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGdpdmVuIGVudmlyb25tZW50IHZhcmlhYmxlcy5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0YWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGhvb2tzID0gXy5ob29rcy5hbGw7XG5cblx0XHRcdFx0aG9va3NbbmFtZV0gPSBob29rc1tuYW1lXSB8fCBbXTtcblxuXHRcdFx0XHRob29rc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUnVucyBhIGhvb2sgaW52b2tpbmcgYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGVudmlyb25tZW50IHZhcmlhYmxlcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBDYWxsYmFja3Mgd2lsbCBiZSBpbnZva2VkIHN5bmNocm9ub3VzbHkgYW5kIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgcmVnaXN0ZXJlZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2sgcGFzc2VkIHRvIGFsbCBjYWxsYmFja3MgcmVnaXN0ZXJlZC5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0cnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSBfLmhvb2tzLmFsbFtuYW1lXTtcblxuXHRcdFx0XHRpZiAoIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBjYWxsYmFjazsgKGNhbGxiYWNrID0gY2FsbGJhY2tzW2krK10pOykge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGVudik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0VG9rZW46IFRva2VuXG5cdH07XG5cdF9zZWxmLlByaXNtID0gXztcblxuXG5cdC8vIFR5cGVzY3JpcHQgbm90ZTpcblx0Ly8gVGhlIGZvbGxvd2luZyBjYW4gYmUgdXNlZCB0byBpbXBvcnQgdGhlIFRva2VuIHR5cGUgaW4gSlNEb2M6XG5cdC8vXG5cdC8vICAgQHR5cGVkZWYge0luc3RhbmNlVHlwZTxpbXBvcnQoXCIuL3ByaXNtLWNvcmVcIilbXCJUb2tlblwiXT59IFRva2VuXG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgdG9rZW4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFNlZSB7QGxpbmsgVG9rZW4jdHlwZSB0eXBlfVxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuU3RyZWFtfSBjb250ZW50IFNlZSB7QGxpbmsgVG9rZW4jY29udGVudCBjb250ZW50fVxuXHQgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IFttYXRjaGVkU3RyPVwiXCJdIEEgY29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tLlxuXHQgKiBAY2xhc3Ncblx0ICogQGdsb2JhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRmdW5jdGlvbiBUb2tlbih0eXBlLCBjb250ZW50LCBhbGlhcywgbWF0Y2hlZFN0cikge1xuXHRcdC8qKlxuXHRcdCAqIFRoZSB0eXBlIG9mIHRoZSB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgaXMgdXN1YWxseSB0aGUga2V5IG9mIGEgcGF0dGVybiBpbiBhIHtAbGluayBHcmFtbWFyfS5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmd9XG5cdFx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHQvKipcblx0XHQgKiBUaGUgc3RyaW5ncyBvciB0b2tlbnMgY29udGFpbmVkIGJ5IHRoaXMgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBUaGlzIHdpbGwgYmUgYSB0b2tlbiBzdHJlYW0gaWYgdGhlIHBhdHRlcm4gbWF0Y2hlZCBhbHNvIGRlZmluZWQgYW4gYGluc2lkZWAgZ3JhbW1hci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmcgfCBUb2tlblN0cmVhbX1cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0XHQvKipcblx0XHQgKiBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmd8c3RyaW5nW119XG5cdFx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy5hbGlhcyA9IGFsaWFzO1xuXHRcdC8vIENvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbVxuXHRcdHRoaXMubGVuZ3RoID0gKG1hdGNoZWRTdHIgfHwgJycpLmxlbmd0aCB8IDA7XG5cdH1cblxuXHQvKipcblx0ICogQSB0b2tlbiBzdHJlYW0gaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQge0BsaW5rIFRva2VuIFRva2VufSBvYmplY3RzLlxuXHQgKlxuXHQgKiBUb2tlbiBzdHJlYW1zIGhhdmUgdG8gZnVsZmlsbCBhIGZldyBwcm9wZXJ0aWVzIHRoYXQgYXJlIGFzc3VtZWQgYnkgbW9zdCBmdW5jdGlvbnMgKG1vc3RseSBpbnRlcm5hbCBvbmVzKSB0aGF0IHByb2Nlc3Ncblx0ICogdGhlbS5cblx0ICpcblx0ICogMS4gTm8gYWRqYWNlbnQgc3RyaW5ncy5cblx0ICogMi4gTm8gZW1wdHkgc3RyaW5ncy5cblx0ICpcblx0ICogICAgVGhlIG9ubHkgZXhjZXB0aW9uIGhlcmUgaXMgdGhlIHRva2VuIHN0cmVhbSB0aGF0IG9ubHkgY29udGFpbnMgdGhlIGVtcHR5IHN0cmluZyBhbmQgbm90aGluZyBlbHNlLlxuXHQgKlxuXHQgKiBAdHlwZWRlZiB7QXJyYXk8c3RyaW5nIHwgVG9rZW4+fSBUb2tlblN0cmVhbVxuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBnaXZlbiB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYW4gSFRNTCByZXByZXNlbnRhdGlvbi5cblx0ICpcblx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0ICogMS4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW4gfCBUb2tlblN0cmVhbX0gbyBUaGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGJlIGNvbnZlcnRlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIGN1cnJlbnQgbGFuZ3VhZ2UuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0uXG5cdCAqIEBtZW1iZXJvZiBUb2tlblxuXHQgKiBAc3RhdGljXG5cdCAqL1xuXHRUb2tlbi5zdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkobywgbGFuZ3VhZ2UpIHtcblx0XHRpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiBvO1xuXHRcdH1cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdG8uZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzICs9IHN0cmluZ2lmeShlLCBsYW5ndWFnZSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH1cblxuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHR0eXBlOiBvLnR5cGUsXG5cdFx0XHRjb250ZW50OiBzdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSksXG5cdFx0XHR0YWc6ICdzcGFuJyxcblx0XHRcdGNsYXNzZXM6IFsndG9rZW4nLCBvLnR5cGVdLFxuXHRcdFx0YXR0cmlidXRlczoge30sXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHR9O1xuXG5cdFx0dmFyIGFsaWFzZXMgPSBvLmFsaWFzO1xuXHRcdGlmIChhbGlhc2VzKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhbGlhc2VzKSkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbnYuY2xhc3Nlcy5wdXNoKGFsaWFzZXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcblxuXHRcdHZhciBhdHRyaWJ1dGVzID0gJyc7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBlbnYuYXR0cmlidXRlcykge1xuXHRcdFx0YXR0cmlidXRlcyArPSAnICcgKyBuYW1lICsgJz1cIicgKyAoZW52LmF0dHJpYnV0ZXNbbmFtZV0gfHwgJycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSArICdcIic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyBhdHRyaWJ1dGVzICsgJz4nICsgZW52LmNvbnRlbnQgKyAnPC8nICsgZW52LnRhZyArICc+Jztcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHBvc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGxvb2tiZWhpbmRcblx0ICogQHJldHVybnMge1JlZ0V4cEV4ZWNBcnJheSB8IG51bGx9XG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKSB7XG5cdFx0cGF0dGVybi5sYXN0SW5kZXggPSBwb3M7XG5cdFx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHRleHQpO1xuXHRcdGlmIChtYXRjaCAmJiBsb29rYmVoaW5kICYmIG1hdGNoWzFdKSB7XG5cdFx0XHQvLyBjaGFuZ2UgdGhlIG1hdGNoIHRvIHJlbW92ZSB0aGUgdGV4dCBtYXRjaGVkIGJ5IHRoZSBQcmlzbSBsb29rYmVoaW5kIGdyb3VwXG5cdFx0XHR2YXIgbG9va2JlaGluZExlbmd0aCA9IG1hdGNoWzFdLmxlbmd0aDtcblx0XHRcdG1hdGNoLmluZGV4ICs9IGxvb2tiZWhpbmRMZW5ndGg7XG5cdFx0XHRtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWF0Y2g7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PHN0cmluZyB8IFRva2VuPn0gdG9rZW5MaXN0XG5cdCAqIEBwYXJhbSB7YW55fSBncmFtbWFyXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8c3RyaW5nIHwgVG9rZW4+fSBzdGFydE5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0UG9zXG5cdCAqIEBwYXJhbSB7UmVtYXRjaE9wdGlvbnN9IFtyZW1hdGNoXVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICogQHByaXZhdGVcblx0ICpcblx0ICogQHR5cGVkZWYgUmVtYXRjaE9wdGlvbnNcblx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdXNlXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZWFjaFxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgc3RhcnROb2RlLCBzdGFydFBvcywgcmVtYXRjaCkge1xuXHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdGlmICghZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGF0dGVybnMgPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdHBhdHRlcm5zID0gQXJyYXkuaXNBcnJheShwYXR0ZXJucykgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVtYXRjaC5jYXVzZSA9PSB0b2tlbiArICcsJyArIGopIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcGF0dGVybk9iaiA9IHBhdHRlcm5zW2pdO1xuXHRcdFx0XHR2YXIgaW5zaWRlID0gcGF0dGVybk9iai5pbnNpZGU7XG5cdFx0XHRcdHZhciBsb29rYmVoaW5kID0gISFwYXR0ZXJuT2JqLmxvb2tiZWhpbmQ7XG5cdFx0XHRcdHZhciBncmVlZHkgPSAhIXBhdHRlcm5PYmouZ3JlZWR5O1xuXHRcdFx0XHR2YXIgYWxpYXMgPSBwYXR0ZXJuT2JqLmFsaWFzO1xuXG5cdFx0XHRcdGlmIChncmVlZHkgJiYgIXBhdHRlcm5PYmoucGF0dGVybi5nbG9iYWwpIHtcblx0XHRcdFx0XHQvLyBXaXRob3V0IHRoZSBnbG9iYWwgZmxhZywgbGFzdEluZGV4IHdvbid0IHdvcmtcblx0XHRcdFx0XHR2YXIgZmxhZ3MgPSBwYXR0ZXJuT2JqLnBhdHRlcm4udG9TdHJpbmcoKS5tYXRjaCgvW2ltc3V5XSokLylbMF07XG5cdFx0XHRcdFx0cGF0dGVybk9iai5wYXR0ZXJuID0gUmVnRXhwKHBhdHRlcm5PYmoucGF0dGVybi5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKiBAdHlwZSB7UmVnRXhwfSAqL1xuXHRcdFx0XHR2YXIgcGF0dGVybiA9IHBhdHRlcm5PYmoucGF0dGVybiB8fCBwYXR0ZXJuT2JqO1xuXG5cdFx0XHRcdGZvciAoIC8vIGl0ZXJhdGUgdGhlIHRva2VuIGxpc3QgYW5kIGtlZXAgdHJhY2sgb2YgdGhlIGN1cnJlbnQgdG9rZW4vc3RyaW5nIHBvc2l0aW9uXG5cdFx0XHRcdFx0dmFyIGN1cnJlbnROb2RlID0gc3RhcnROb2RlLm5leHQsIHBvcyA9IHN0YXJ0UG9zO1xuXHRcdFx0XHRcdGN1cnJlbnROb2RlICE9PSB0b2tlbkxpc3QudGFpbDtcblx0XHRcdFx0XHRwb3MgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoLCBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHRcblx0XHRcdFx0KSB7XG5cblx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiBwb3MgPj0gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHN0ciA9IGN1cnJlbnROb2RlLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKHRva2VuTGlzdC5sZW5ndGggPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Ly8gU29tZXRoaW5nIHdlbnQgdGVycmlibHkgd3JvbmcsIEFCT1JULCBBQk9SVCFcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciByZW1vdmVDb3VudCA9IDE7IC8vIHRoaXMgaXMgdGhlIHRvIHBhcmFtZXRlciBvZiByZW1vdmVCZXR3ZWVuXG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXG5cdFx0XHRcdFx0aWYgKGdyZWVkeSkge1xuXHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRcdGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggPj0gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXg7XG5cdFx0XHRcdFx0XHR2YXIgdG8gPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblx0XHRcdFx0XHRcdHZhciBwID0gcG9zO1xuXG5cdFx0XHRcdFx0XHQvLyBmaW5kIHRoZSBub2RlIHRoYXQgY29udGFpbnMgdGhlIG1hdGNoXG5cdFx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlIChmcm9tID49IHApIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuXHRcdFx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGFkanVzdCBwb3MgKGFuZCBwKVxuXHRcdFx0XHRcdFx0cCAtPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRwb3MgPSBwO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgY3VycmVudCBub2RlIGlzIGEgVG9rZW4sIHRoZW4gdGhlIG1hdGNoIHN0YXJ0cyBpbnNpZGUgYW5vdGhlciBUb2tlbiwgd2hpY2ggaXMgaW52YWxpZFxuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnROb2RlLnZhbHVlIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIGxhc3Qgbm9kZSB3aGljaCBpcyBhZmZlY3RlZCBieSB0aGlzIG1hdGNoXG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgayA9IGN1cnJlbnROb2RlO1xuXHRcdFx0XHRcdFx0XHRrICE9PSB0b2tlbkxpc3QudGFpbCAmJiAocCA8IHRvIHx8IHR5cGVvZiBrLnZhbHVlID09PSAnc3RyaW5nJyk7XG5cdFx0XHRcdFx0XHRcdGsgPSBrLm5leHRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRyZW1vdmVDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRwICs9IGsudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQtLTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVwbGFjZSB3aXRoIHRoZSBuZXcgbWF0Y2hcblx0XHRcdFx0XHRcdHN0ciA9IHRleHQuc2xpY2UocG9zLCBwKTtcblx0XHRcdFx0XHRcdG1hdGNoLmluZGV4IC09IHBvcztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgMCwgc3RyLCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxuXHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXg7XG5cdFx0XHRcdFx0dmFyIG1hdGNoU3RyID0gbWF0Y2hbMF07XG5cdFx0XHRcdFx0dmFyIGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tKTtcblx0XHRcdFx0XHR2YXIgYWZ0ZXIgPSBzdHIuc2xpY2UoZnJvbSArIG1hdGNoU3RyLmxlbmd0aCk7XG5cblx0XHRcdFx0XHR2YXIgcmVhY2ggPSBwb3MgKyBzdHIubGVuZ3RoO1xuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlYWNoID4gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IHJlYWNoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciByZW1vdmVGcm9tID0gY3VycmVudE5vZGUucHJldjtcblxuXHRcdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRcdHJlbW92ZUZyb20gPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIGJlZm9yZSk7XG5cdFx0XHRcdFx0XHRwb3MgKz0gYmVmb3JlLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZW1vdmVSYW5nZSh0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHJlbW92ZUNvdW50KTtcblxuXHRcdFx0XHRcdHZhciB3cmFwcGVkID0gbmV3IFRva2VuKHRva2VuLCBpbnNpZGUgPyBfLnRva2VuaXplKG1hdGNoU3RyLCBpbnNpZGUpIDogbWF0Y2hTdHIsIGFsaWFzLCBtYXRjaFN0cik7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHdyYXBwZWQpO1xuXG5cdFx0XHRcdFx0aWYgKGFmdGVyKSB7XG5cdFx0XHRcdFx0XHRhZGRBZnRlcih0b2tlbkxpc3QsIGN1cnJlbnROb2RlLCBhZnRlcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlbW92ZUNvdW50ID4gMSkge1xuXHRcdFx0XHRcdFx0Ly8gYXQgbGVhc3Qgb25lIFRva2VuIG9iamVjdCB3YXMgcmVtb3ZlZCwgc28gd2UgaGF2ZSB0byBkbyBzb21lIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdC8vIHRoaXMgY2FuIG9ubHkgaGFwcGVuIGlmIHRoZSBjdXJyZW50IHBhdHRlcm4gaXMgZ3JlZWR5XG5cblx0XHRcdFx0XHRcdC8qKiBAdHlwZSB7UmVtYXRjaE9wdGlvbnN9ICovXG5cdFx0XHRcdFx0XHR2YXIgbmVzdGVkUmVtYXRjaCA9IHtcblx0XHRcdFx0XHRcdFx0Y2F1c2U6IHRva2VuICsgJywnICsgaixcblx0XHRcdFx0XHRcdFx0cmVhY2g6IHJlYWNoXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0bWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgY3VycmVudE5vZGUucHJldiwgcG9zLCBuZXN0ZWRSZW1hdGNoKTtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIHJlYWNoIG1pZ2h0IGhhdmUgYmVlbiBleHRlbmRlZCBiZWNhdXNlIG9mIHRoZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiBuZXN0ZWRSZW1hdGNoLnJlYWNoID4gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gbmVzdGVkUmVtYXRjaC5yZWFjaDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHR5cGVkZWYgTGlua2VkTGlzdE5vZGVcblx0ICogQHByb3BlcnR5IHtUfSB2YWx1ZVxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gcHJldiBUaGUgcHJldmlvdXMgbm9kZS5cblx0ICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IG5leHQgVGhlIG5leHQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dmFyIGhlYWQgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBudWxsLCBuZXh0OiBudWxsIH07XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgdGFpbCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IGhlYWQsIG5leHQ6IG51bGwgfTtcblx0XHRoZWFkLm5leHQgPSB0YWlsO1xuXG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLmhlYWQgPSBoZWFkO1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dGhpcy50YWlsID0gdGFpbDtcblx0XHR0aGlzLmxlbmd0aCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIG5ldyBub2RlIHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBsaXN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuXHQgKiBAcGFyYW0ge1R9IHZhbHVlXG5cdCAqIEByZXR1cm5zIHtMaW5rZWRMaXN0Tm9kZTxUPn0gVGhlIGFkZGVkIG5vZGUuXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGRBZnRlcihsaXN0LCBub2RlLCB2YWx1ZSkge1xuXHRcdC8vIGFzc3VtZXMgdGhhdCBub2RlICE9IGxpc3QudGFpbCAmJiB2YWx1ZXMubGVuZ3RoID49IDBcblx0XHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblxuXHRcdHZhciBuZXdOb2RlID0geyB2YWx1ZTogdmFsdWUsIHByZXY6IG5vZGUsIG5leHQ6IG5leHQgfTtcblx0XHRub2RlLm5leHQgPSBuZXdOb2RlO1xuXHRcdG5leHQucHJldiA9IG5ld05vZGU7XG5cdFx0bGlzdC5sZW5ndGgrKztcblxuXHRcdHJldHVybiBuZXdOb2RlO1xuXHR9XG5cdC8qKlxuXHQgKiBSZW1vdmVzIGBjb3VudGAgbm9kZXMgYWZ0ZXIgdGhlIGdpdmVuIG5vZGUuIFRoZSBnaXZlbiBub2RlIHdpbGwgbm90IGJlIHJlbW92ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gcmVtb3ZlUmFuZ2UobGlzdCwgbm9kZSwgY291bnQpIHtcblx0XHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50ICYmIG5leHQgIT09IGxpc3QudGFpbDsgaSsrKSB7XG5cdFx0XHRuZXh0ID0gbmV4dC5uZXh0O1xuXHRcdH1cblx0XHRub2RlLm5leHQgPSBuZXh0O1xuXHRcdG5leHQucHJldiA9IG5vZGU7XG5cdFx0bGlzdC5sZW5ndGggLT0gaTtcblx0fVxuXHQvKipcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEByZXR1cm5zIHtUW119XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcblx0XHR2YXIgYXJyYXkgPSBbXTtcblx0XHR2YXIgbm9kZSA9IGxpc3QuaGVhZC5uZXh0O1xuXHRcdHdoaWxlIChub2RlICE9PSBsaXN0LnRhaWwpIHtcblx0XHRcdGFycmF5LnB1c2gobm9kZS52YWx1ZSk7XG5cdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH1cblxuXG5cdGlmICghX3NlbGYuZG9jdW1lbnQpIHtcblx0XHRpZiAoIV9zZWxmLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdC8vIGluIE5vZGUuanNcblx0XHRcdHJldHVybiBfO1xuXHRcdH1cblxuXHRcdGlmICghXy5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIpIHtcblx0XHRcdC8vIEluIHdvcmtlclxuXHRcdFx0X3NlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2dC5kYXRhKTtcblx0XHRcdFx0dmFyIGxhbmcgPSBtZXNzYWdlLmxhbmd1YWdlO1xuXHRcdFx0XHR2YXIgY29kZSA9IG1lc3NhZ2UuY29kZTtcblx0XHRcdFx0dmFyIGltbWVkaWF0ZUNsb3NlID0gbWVzc2FnZS5pbW1lZGlhdGVDbG9zZTtcblxuXHRcdFx0XHRfc2VsZi5wb3N0TWVzc2FnZShfLmhpZ2hsaWdodChjb2RlLCBfLmxhbmd1YWdlc1tsYW5nXSwgbGFuZykpO1xuXHRcdFx0XHRpZiAoaW1tZWRpYXRlQ2xvc2UpIHtcblx0XHRcdFx0XHRfc2VsZi5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF87XG5cdH1cblxuXHQvLyBHZXQgY3VycmVudCBzY3JpcHQgYW5kIGhpZ2hsaWdodFxuXHR2YXIgc2NyaXB0ID0gXy51dGlsLmN1cnJlbnRTY3JpcHQoKTtcblxuXHRpZiAoc2NyaXB0KSB7XG5cdFx0Xy5maWxlbmFtZSA9IHNjcmlwdC5zcmM7XG5cblx0XHRpZiAoc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuXHRcdFx0Xy5tYW51YWwgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaygpIHtcblx0XHRpZiAoIV8ubWFudWFsKSB7XG5cdFx0XHRfLmhpZ2hsaWdodEFsbCgpO1xuXHRcdH1cblx0fVxuXG5cdGlmICghXy5tYW51YWwpIHtcblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJsb2FkaW5nXCIsIHRoZW4gd2UnbGwgdXNlIERPTUNvbnRlbnRMb2FkZWQuXG5cdFx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwiaW50ZXJhY3RpdmVcIiBhbmQgdGhlIHByaXNtLmpzIHNjcmlwdCBpcyBkZWZlcnJlZCwgdGhlbiB3ZSdsbCBhbHNvIHVzZSB0aGVcblx0XHQvLyBET01Db250ZW50TG9hZGVkIGV2ZW50IGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgc29tZSBwbHVnaW5zIG9yIGxhbmd1YWdlcyB3aGljaCBoYXZlIGFsc28gYmVlbiBkZWZlcnJlZCBhbmQgdGhleVxuXHRcdC8vIG1pZ2h0IHRha2UgbG9uZ2VyIG9uZSBhbmltYXRpb24gZnJhbWUgdG8gZXhlY3V0ZSB3aGljaCBjYW4gY3JlYXRlIGEgcmFjZSBjb25kaXRpb24gd2hlcmUgb25seSBzb21lIHBsdWdpbnMgaGF2ZVxuXHRcdC8vIGJlZW4gbG9hZGVkIHdoZW4gUHJpc20uaGlnaGxpZ2h0QWxsKCkgaXMgZXhlY3V0ZWQsIGRlcGVuZGluZyBvbiBob3cgZmFzdCByZXNvdXJjZXMgYXJlIGxvYWRlZC5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ByaXNtSlMvcHJpc20vaXNzdWVzLzIxMDJcblx0XHR2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG5cdFx0aWYgKHJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJyB8fCByZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnICYmIHNjcmlwdCAmJiBzY3JpcHQuZGVmZXIpIHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2ssIDE2KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gXztcblxufShfc2VsZikpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcmlzbTtcbn1cblxuLy8gaGFjayBmb3IgY29tcG9uZW50cyB0byB3b3JrIGNvcnJlY3RseSBpbiBub2RlLmpzXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Z2xvYmFsLlByaXNtID0gUHJpc207XG59XG5cbi8vIHNvbWUgYWRkaXRpb25hbCBkb2N1bWVudGF0aW9uL3R5cGVzXG5cbi8qKlxuICogVGhlIGV4cGFuc2lvbiBvZiBhIHNpbXBsZSBgUmVnRXhwYCBsaXRlcmFsIHRvIHN1cHBvcnQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzLlxuICpcbiAqIEB0eXBlZGVmIEdyYW1tYXJUb2tlblxuICogQHByb3BlcnR5IHtSZWdFeHB9IHBhdHRlcm4gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBvZiB0aGUgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtsb29rYmVoaW5kPWZhbHNlXSBJZiBgdHJ1ZWAsIHRoZW4gdGhlIGZpcnN0IGNhcHR1cmluZyBncm91cCBvZiBgcGF0dGVybmAgd2lsbCAoZWZmZWN0aXZlbHkpXG4gKiBiZWhhdmUgYXMgYSBsb29rYmVoaW5kIGdyb3VwIG1lYW5pbmcgdGhhdCB0aGUgY2FwdHVyZWQgdGV4dCB3aWxsIG5vdCBiZSBwYXJ0IG9mIHRoZSBtYXRjaGVkIHRleHQgb2YgdGhlIG5ldyB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2dyZWVkeT1mYWxzZV0gV2hldGhlciB0aGUgdG9rZW4gaXMgZ3JlZWR5LlxuICogQHByb3BlcnR5IHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gQW4gb3B0aW9uYWwgYWxpYXMgb3IgbGlzdCBvZiBhbGlhc2VzLlxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbaW5zaWRlXSBUaGUgbmVzdGVkIGdyYW1tYXIgb2YgdGhpcyB0b2tlbi5cbiAqXG4gKiBUaGUgYGluc2lkZWAgZ3JhbW1hciB3aWxsIGJlIHVzZWQgdG8gdG9rZW5pemUgdGhlIHRleHQgdmFsdWUgb2YgZWFjaCB0b2tlbiBvZiB0aGlzIGtpbmQuXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBtYWtlIG5lc3RlZCBhbmQgZXZlbiByZWN1cnNpdmUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMuXG4gKlxuICogTm90ZTogVGhpcyBjYW4gY2F1c2UgaW5maW5pdGUgcmVjdXJzaW9uLiBCZSBjYXJlZnVsIHdoZW4geW91IGVtYmVkIGRpZmZlcmVudCBsYW5ndWFnZXMgb3IgZXZlbiB0aGUgc2FtZSBsYW5ndWFnZSBpbnRvXG4gKiBlYWNoIGFub3RoZXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBHcmFtbWFyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgUmVnRXhwIHwgR3JhbW1hclRva2VuIHwgQXJyYXk8UmVnRXhwIHwgR3JhbW1hclRva2VuPj59XG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtyZXN0XSBBbiBvcHRpb25hbCBncmFtbWFyIG9iamVjdCB0aGF0IHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhpcyBncmFtbWFyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiB3aGljaCB3aWxsIGludm9rZWQgYWZ0ZXIgYW4gZWxlbWVudCB3YXMgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICpcbiAqIEBjYWxsYmFjayBIaWdobGlnaHRDYWxsYmFja1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIEhvb2tDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vay5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1tYXJrdXAuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLzwhLS0oPzooPyE8IS0tKVtcXHNcXFNdKSo/LS0+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3Byb2xvZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcP1tcXHNcXFNdKz9cXD8+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2RvY3R5cGUnOiB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3htbC8jTlQtZG9jdHlwZWRlY2xcblx0XHRwYXR0ZXJuOiAvPCFET0NUWVBFKD86W14+XCInW1xcXV18XCJbXlwiXSpcInwnW14nXSonKSsoPzpcXFsoPzpbXjxcIidcXF1dfFwiW15cIl0qXCJ8J1teJ10qJ3w8KD8hIS0tKXw8IS0tKD86W14tXXwtKD8hLT4pKSotLT4pKlxcXVxccyopPz4vaSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnaW50ZXJuYWwtc3Vic2V0Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKF5bXlxcW10qXFxbKVtcXHNcXFNdKyg/PVxcXT4kKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cIlteXCJdKlwifCdbXiddKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXjwhfD4kfFtbXFxdXS8sXG5cdFx0XHQnZG9jdHlwZS10YWcnOiAvXkRPQ1RZUEUvaSxcblx0XHRcdCduYW1lJzogL1teXFxzPD4nXCJdKy9cblx0XHR9XG5cdH0sXG5cdCdjZGF0YSc6IHtcblx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/KD8hXFxkKVteXFxzPlxcLz0kPCVdKyg/Olxccyg/OlxccypbXlxccz5cXC89XSsoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSl8KD89W1xccy8+XSkpKSspP1xccypcXC8/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL148XFwvPy8sXG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzcGVjaWFsLWF0dHInOiBbXSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKS8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcblx0XHRcdGFsaWFzOiAnbmFtZWQtZW50aXR5J1xuXHRcdH0sXG5cdFx0LyYjeD9bXFxkYS1mXXsxLDh9Oy9pXG5cdF1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cblx0aWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkSW5saW5lZCcsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gaW5saW5lZCBsYW5ndWFnZSB0byBtYXJrdXAuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgPHN0eWxlPmAgdGFncy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuXHRcdHZhciBpbmNsdWRlZENkYXRhSW5zaWRlID0ge307XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2NkYXRhJ10gPSAvXjwhXFxbQ0RBVEFcXFt8XFxdXFxdPiQvaTtcblxuXHRcdHZhciBpbnNpZGUgPSB7XG5cdFx0XHQnaW5jbHVkZWQtY2RhdGEnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRcdFx0aW5zaWRlOiBpbmNsdWRlZENkYXRhSW5zaWRlXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXG5cdFx0dmFyIGRlZiA9IHt9O1xuXHRcdGRlZlt0YWdOYW1lXSA9IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRhZ05hbWU7IH0pLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZTogaW5zaWRlXG5cdFx0fTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIGRlZik7XG5cdH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkQXR0cmlidXRlJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBwYXR0ZXJuIHRvIGhpZ2hsaWdodCBsYW5ndWFnZXMgZW1iZWRkZWQgaW4gSFRNTCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYHN0eWxlYCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gKGF0dHJOYW1lLCBsYW5nKSB7XG5cdFx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlWydzcGVjaWFsLWF0dHInXS5wdXNoKHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdFx0LyhefFtcIidcXHNdKS8uc291cmNlICsgJyg/OicgKyBhdHRyTmFtZSArICcpJyArIC9cXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSkvLnNvdXJjZSxcblx0XHRcdFx0J2knXG5cdFx0XHQpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzogL15bXlxccz1dKy8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC89W1xcc1xcU10rLyxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd2YWx1ZSc6IHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhePVxccyooW1wiJ118KD8hW1wiJ10pKSlcXFNbXFxzXFxTXSooPz1cXDIkKS8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiBbbGFuZywgJ2xhbmd1YWdlLScgKyBsYW5nXSxcblx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLnhtbCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcblByaXNtLmxhbmd1YWdlcy5zc21sID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5hdG9tID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5yc3MgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tY3NzLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHR2YXIgc3RyaW5nID0gLyg/OlwiKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W15cIlxcXFxcXHJcXG5dKSpcInwnKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W14nXFxcXFxcclxcbl0pKicpLztcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuXHRcdCdjb21tZW50JzogL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLFxuXHRcdCdhdHJ1bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvQFtcXHctXSg/OlteO3tcXHNdfFxccysoPyFbXFxze10pKSooPzo7fCg/PVxccypcXHspKS8sXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3J1bGUnOiAvXkBbXFx3LV0rLyxcblx0XHRcdFx0J3NlbGVjdG9yLWZ1bmN0aW9uLWFyZ3VtZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXFxic2VsZWN0b3JcXHMqXFwoXFxzKig/IVtcXHMpXSkpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGFsaWFzOiAnc2VsZWN0b3InXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdrZXl3b3JkJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OmFuZHxub3R8b25seXxvcikoPyFbXFx3LV0pLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHRcdH1cblx0XHR9LFxuXHRcdCd1cmwnOiB7XG5cdFx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ1xcXFxidXJsXFxcXCgoPzonICsgc3RyaW5nLnNvdXJjZSArICd8JyArIC8oPzpbXlxcXFxcXHJcXG4oKVwiJ118XFxcXFtcXHNcXFNdKSovLnNvdXJjZSArICcpXFxcXCknLCAnaScpLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdmdW5jdGlvbic6IC9edXJsL2ksXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFwofFxcKSQvLFxuXHRcdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyBzdHJpbmcuc291cmNlICsgJyQnKSxcblx0XHRcdFx0XHRhbGlhczogJ3VybCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3NlbGVjdG9yJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCcoXnxbe31cXFxcc10pW157fVxcXFxzXSg/Oltee307XCJcXCdcXFxcc118XFxcXHMrKD8hW1xcXFxze10pfCcgKyBzdHJpbmcuc291cmNlICsgJykqKD89XFxcXHMqXFxcXHspJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnc3RyaW5nJzoge1xuXHRcdFx0cGF0dGVybjogc3RyaW5nLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHQncHJvcGVydHknOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVstX2EtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVstXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J2ltcG9ydGFudCc6IC8haW1wb3J0YW50XFxiL2ksXG5cdFx0J2Z1bmN0aW9uJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFteLWEtejAtOV0pWy1hLXowLTldKyg/PVxcKCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdwdW5jdHVhdGlvbic6IC9bKCl7fTs6LF0vXG5cdH07XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuY3NzO1xuXG5cdHZhciBtYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRpZiAobWFya3VwKSB7XG5cdFx0bWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0XHRtYXJrdXAudGFnLmFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdH1cblxufShQcmlzbSkpO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tY2xpa2UuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFw6XSlcXC9cXC8uKi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQnc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC8oW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdjbGFzcy1uYW1lJzoge1xuXHRcdHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8aW50ZXJmYWNlfG5ld3x0cmFpdClcXHMrfFxcYmNhdGNoXFxzK1xcKClbXFx3LlxcXFxdKy9pLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncHVuY3R1YXRpb24nOiAvWy5cXFxcXS9cblx0XHR9XG5cdH0sXG5cdCdrZXl3b3JkJzogL1xcYig/OmJyZWFrfGNhdGNofGNvbnRpbnVlfGRvfGVsc2V8ZmluYWxseXxmb3J8ZnVuY3Rpb258aWZ8aW58aW5zdGFuY2VvZnxuZXd8bnVsbHxyZXR1cm58dGhyb3d8dHJ5fHdoaWxlKVxcYi8sXG5cdCdib29sZWFuJzogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcblx0J2Z1bmN0aW9uJzogL1xcYlxcdysoPz1cXCgpLyxcblx0J251bWJlcic6IC9cXGIweFtcXGRhLWZdK1xcYnwoPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/L2ksXG5cdCdvcGVyYXRvcic6IC9bPD5dPT98WyE9XT0/PT98LS0/fFxcK1xcKz98JiY/fFxcfFxcfD98Wz8qL35eJV0vLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vXG59O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tamF2YXNjcmlwdC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQnY2xhc3MtbmFtZSc6IFtcblx0XHRQcmlzbS5sYW5ndWFnZXMuY2xpa2VbJ2NsYXNzLW5hbWUnXSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJEEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxcLig/OmNvbnN0cnVjdG9yfHByb3RvdHlwZSkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdrZXl3b3JkJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XnxcXH0pXFxzKiljYXRjaFxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14uXXxcXC5cXC5cXC5cXHMqKVxcYig/OmFzfGFzc2VydCg/PVxccypcXHspfGFzeW5jKD89XFxzKig/OmZ1bmN0aW9uXFxifFxcKHxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxhd2FpdHxicmVha3xjYXNlfGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5KD89XFxzKig/Olxce3wkKSl8Zm9yfGZyb20oPz1cXHMqKD86WydcIl18JCkpfGZ1bmN0aW9ufCg/OmdldHxzZXQpKD89XFxzKig/OlsjXFxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XSxcblx0Ly8gQWxsb3cgZm9yIGFsbCBub24tQVNDSUkgY2hhcmFjdGVycyAoU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMDg0NDQpXG5cdCdmdW5jdGlvbic6IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqKD86XFwuXFxzKig/OmFwcGx5fGJpbmR8Y2FsbClcXHMqKT9cXCgpLyxcblx0J251bWJlcic6IHtcblx0XHRwYXR0ZXJuOiBSZWdFeHAoXG5cdFx0XHQvKF58W15cXHckXSkvLnNvdXJjZSArXG5cdFx0XHQnKD86JyArXG5cdFx0XHQoXG5cdFx0XHRcdC8vIGNvbnN0YW50XG5cdFx0XHRcdC9OYU58SW5maW5pdHkvLnNvdXJjZSArXG5cdFx0XHRcdCd8JyArXG5cdFx0XHRcdC8vIGJpbmFyeSBpbnRlZ2VyXG5cdFx0XHRcdC8wW2JCXVswMV0rKD86X1swMV0rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gb2N0YWwgaW50ZWdlclxuXHRcdFx0XHQvMFtvT11bMC03XSsoPzpfWzAtN10rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gaGV4YWRlY2ltYWwgaW50ZWdlclxuXHRcdFx0XHQvMFt4WF1bXFxkQS1GYS1mXSsoPzpfW1xcZEEtRmEtZl0rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gZGVjaW1hbCBiaWdpbnRcblx0XHRcdFx0L1xcZCsoPzpfXFxkKykqbi8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gZGVjaW1hbCBudW1iZXIgKGludGVnZXIgb3IgZmxvYXQpIGJ1dCBubyBiaWdpbnRcblx0XHRcdFx0Lyg/OlxcZCsoPzpfXFxkKykqKD86XFwuKD86XFxkKyg/Ol9cXGQrKSopPyk/fFxcLlxcZCsoPzpfXFxkKykqKSg/OltFZV1bKy1dP1xcZCsoPzpfXFxkKykqKT8vLnNvdXJjZVxuXHRcdFx0KSArXG5cdFx0XHQnKScgK1xuXHRcdFx0Lyg/IVtcXHckXSkvLnNvdXJjZVxuXHRcdCksXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fD0+fCYmPT98XFx8XFx8PT98WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1xcPz0/fFxcP1xcLj98W346XS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGV4dGVuZHN8aW1wbGVtZW50c3xpbnN0YW5jZW9mfGludGVyZmFjZXxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdC8vIGxvb2tiZWhpbmRcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZHVwZS1jaGFyYWN0ZXJzLWNoYXJhY3Rlci1jbGFzc1xuXHRcdFx0LygoPzpefFteJFxcd1xceEEwLVxcdUZGRkYuXCInXFxdKVxcc118XFxiKD86cmV0dXJufHlpZWxkKSlcXHMqKS8uc291cmNlICtcblx0XHRcdC8vIFJlZ2V4IHBhdHRlcm46XG5cdFx0XHQvLyBUaGVyZSBhcmUgMiByZWdleCBwYXR0ZXJucyBoZXJlLiBUaGUgUmVnRXhwIHNldCBub3RhdGlvbiBwcm9wb3NhbCBhZGRlZCBzdXBwb3J0IGZvciBuZXN0ZWQgY2hhcmFjdGVyXG5cdFx0XHQvLyBjbGFzc2VzIGlmIHRoZSBgdmAgZmxhZyBpcyBwcmVzZW50LiBVbmZvcnR1bmF0ZWx5LCBuZXN0ZWQgQ0NzIGFyZSBib3RoIGNvbnRleHQtZnJlZSBhbmQgaW5jb21wYXRpYmxlXG5cdFx0XHQvLyB3aXRoIHRoZSBvbmx5IHN5bnRheCwgc28gd2UgaGF2ZSB0byBkZWZpbmUgMiBkaWZmZXJlbnQgcmVnZXggcGF0dGVybnMuXG5cdFx0XHQvXFwvLy5zb3VyY2UgK1xuXHRcdFx0Jyg/OicgK1xuXHRcdFx0Lyg/OlxcWyg/OlteXFxdXFxcXFxcclxcbl18XFxcXC4pKlxcXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2RnaW15dXNdezAsN30vLnNvdXJjZSArXG5cdFx0XHQnfCcgK1xuXHRcdFx0Ly8gYHZgIGZsYWcgc3ludGF4LiBUaGlzIHN1cHBvcnRzIDMgbGV2ZWxzIG9mIG5lc3RlZCBjaGFyYWN0ZXIgY2xhc3Nlcy5cblx0XHRcdC8oPzpcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLnxcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLnxcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLikqXFxdKSpcXF0pKlxcXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2RnaW15dXNdezAsN312W2RnaW15dXNdezAsN30vLnNvdXJjZSArXG5cdFx0XHQnKScgK1xuXHRcdFx0Ly8gbG9va2FoZWFkXG5cdFx0XHQvKD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLy5zb3VyY2Vcblx0XHQpLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3JlZ2V4LXNvdXJjZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL14oXFwvKVtcXHNcXFNdKyg/PVxcL1thLXpdKiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1yZWdleCcsXG5cdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLnJlZ2V4XG5cdFx0XHR9LFxuXHRcdFx0J3JlZ2V4LWRlbGltaXRlcic6IC9eXFwvfFxcLyQvLFxuXHRcdFx0J3JlZ2V4LWZsYWdzJzogL15bYS16XSskLyxcblx0XHR9XG5cdH0sXG5cdC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcblx0J2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuXHRcdHBhdHRlcm46IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqWz06XVxccyooPzphc3luY1xccyopPyg/OlxcYmZ1bmN0aW9uXFxifCg/OlxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpfCg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopXFxzKj0+KSkvLFxuXHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdH0sXG5cdCdwYXJhbWV0ZXInOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhmdW5jdGlvbig/OlxccysoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKT9cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRhLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqPT4pL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqPT4pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/OlxcYnxcXHN8XikoPyEoPzphc3xhc3luY3xhd2FpdHxicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5fGZvcnxmcm9tfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZCkoPyFbJFxcd1xceEEwLVxcdUZGRkZdKSkoPzooPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqXFxzKilcXChcXHMqfFxcXVxccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqXFx7KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0XSxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCdoYXNoYmFuZyc6IHtcblx0XHRwYXR0ZXJuOiAvXiMhLiovLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRhbGlhczogJ2NvbW1lbnQnXG5cdH0sXG5cdCd0ZW1wbGF0ZS1zdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118XFwkXFx7KD86W157fV18XFx7KD86W157fV18XFx7W159XSpcXH0pKlxcfSkrXFx9fCg/IVxcJFxceylbXlxcXFxgXSkqYC8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RlbXBsYXRlLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvLFxuXHRcdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHRcdH0sXG5cdFx0XHQnaW50ZXJwb2xhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFteXFxcXF0pKD86XFxcXHsyfSkqKVxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL15cXCRcXHt8XFx9JC8sXG5cdFx0XHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiAvW1xcc1xcU10rL1xuXHRcdH1cblx0fSxcblx0J3N0cmluZy1wcm9wZXJ0eSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Ol58Wyx7XSlbIFxcdF0qKShbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDIpW15cXFxcXFxyXFxuXSkqXFwyKD89XFxzKjopL20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0YWxpYXM6ICdwcm9wZXJ0eSdcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnb3BlcmF0b3InLCB7XG5cdCdsaXRlcmFsLXByb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oKD86XnxbLHtdKVsgXFx0XSopKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9tLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0YWxpYXM6ICdwcm9wZXJ0eSdcblx0fSxcbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzY3JpcHQnLCAnamF2YXNjcmlwdCcpO1xuXG5cdC8vIGFkZCBhdHRyaWJ1dGUgc3VwcG9ydCBmb3IgYWxsIERPTSBldmVudHMuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cyNTdGFuZGFyZF9ldmVudHNcblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkQXR0cmlidXRlKFxuXHRcdC9vbig/OmFib3J0fGJsdXJ8Y2hhbmdlfGNsaWNrfGNvbXBvc2l0aW9uKD86ZW5kfHN0YXJ0fHVwZGF0ZSl8ZGJsY2xpY2t8ZXJyb3J8Zm9jdXMoPzppbnxvdXQpP3xrZXkoPzpkb3dufHVwKXxsb2FkfG1vdXNlKD86ZG93bnxlbnRlcnxsZWF2ZXxtb3ZlfG91dHxvdmVyfHVwKXxyZXNldHxyZXNpemV8c2Nyb2xsfHNlbGVjdHxzbG90Y2hhbmdlfHN1Ym1pdHx1bmxvYWR8d2hlZWwpLy5zb3VyY2UsXG5cdFx0J2phdmFzY3JpcHQnXG5cdCk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tZmlsZS1oaWdobGlnaHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuXHRpZiAodHlwZW9mIFByaXNtID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvbWF0Y2hlcyNQb2x5ZmlsbFxuXHRpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcblx0XHRFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXHR9XG5cblx0dmFyIExPQURJTkdfTUVTU0FHRSA9ICdMb2FkaW5n4oCmJztcblx0dmFyIEZBSUxVUkVfTUVTU0FHRSA9IGZ1bmN0aW9uIChzdGF0dXMsIG1lc3NhZ2UpIHtcblx0XHRyZXR1cm4gJ+KcliBFcnJvciAnICsgc3RhdHVzICsgJyB3aGlsZSBmZXRjaGluZyBmaWxlOiAnICsgbWVzc2FnZTtcblx0fTtcblx0dmFyIEZBSUxVUkVfRU1QVFlfTUVTU0FHRSA9ICfinJYgRXJyb3I6IEZpbGUgZG9lcyBub3QgZXhpc3Qgb3IgaXMgZW1wdHknO1xuXG5cdHZhciBFWFRFTlNJT05TID0ge1xuXHRcdCdqcyc6ICdqYXZhc2NyaXB0Jyxcblx0XHQncHknOiAncHl0aG9uJyxcblx0XHQncmInOiAncnVieScsXG5cdFx0J3BzMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQncHNtMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQnc2gnOiAnYmFzaCcsXG5cdFx0J2JhdCc6ICdiYXRjaCcsXG5cdFx0J2gnOiAnYycsXG5cdFx0J3RleCc6ICdsYXRleCdcblx0fTtcblxuXHR2YXIgU1RBVFVTX0FUVFIgPSAnZGF0YS1zcmMtc3RhdHVzJztcblx0dmFyIFNUQVRVU19MT0FESU5HID0gJ2xvYWRpbmcnO1xuXHR2YXIgU1RBVFVTX0xPQURFRCA9ICdsb2FkZWQnO1xuXHR2YXIgU1RBVFVTX0ZBSUxFRCA9ICdmYWlsZWQnO1xuXG5cdHZhciBTRUxFQ1RPUiA9ICdwcmVbZGF0YS1zcmNdOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BREVEICsgJ1wiXSknXG5cdFx0KyAnOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BRElORyArICdcIl0pJztcblxuXHQvKipcblx0ICogTG9hZHMgdGhlIGdpdmVuIGZpbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgVGhlIFVSTCBvciBwYXRoIG9mIHRoZSBzb3VyY2UgZmlsZSB0byBsb2FkLlxuXHQgKiBAcGFyYW0geyhyZXN1bHQ6IHN0cmluZykgPT4gdm9pZH0gc3VjY2Vzc1xuXHQgKiBAcGFyYW0geyhyZWFzb246IHN0cmluZykgPT4gdm9pZH0gZXJyb3Jcblx0ICovXG5cdGZ1bmN0aW9uIGxvYWRGaWxlKHNyYywgc3VjY2VzcywgZXJyb3IpIHtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzIDwgNDAwICYmIHhoci5yZXNwb25zZVRleHQpIHtcblx0XHRcdFx0XHRzdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuXHRcdFx0XHRcdFx0ZXJyb3IoRkFJTFVSRV9NRVNTQUdFKHhoci5zdGF0dXMsIHhoci5zdGF0dXNUZXh0KSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVycm9yKEZBSUxVUkVfRU1QVFlfTUVTU0FHRSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR4aHIuc2VuZChudWxsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJzZXMgdGhlIGdpdmVuIHJhbmdlLlxuXHQgKlxuXHQgKiBUaGlzIHJldHVybnMgYSByYW5nZSB3aXRoIGluY2x1c2l2ZSBlbmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IHJhbmdlXG5cdCAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXIgfCB1bmRlZmluZWRdIHwgdW5kZWZpbmVkfVxuXHQgKi9cblx0ZnVuY3Rpb24gcGFyc2VSYW5nZShyYW5nZSkge1xuXHRcdHZhciBtID0gL15cXHMqKFxcZCspXFxzKig/OigsKVxccyooPzooXFxkKylcXHMqKT8pPyQvLmV4ZWMocmFuZ2UgfHwgJycpO1xuXHRcdGlmIChtKSB7XG5cdFx0XHR2YXIgc3RhcnQgPSBOdW1iZXIobVsxXSk7XG5cdFx0XHR2YXIgY29tbWEgPSBtWzJdO1xuXHRcdFx0dmFyIGVuZCA9IG1bM107XG5cblx0XHRcdGlmICghY29tbWEpIHtcblx0XHRcdFx0cmV0dXJuIFtzdGFydCwgc3RhcnRdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFlbmQpIHtcblx0XHRcdFx0cmV0dXJuIFtzdGFydCwgdW5kZWZpbmVkXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbc3RhcnQsIE51bWJlcihlbmQpXTtcblx0XHR9XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRlbnYuc2VsZWN0b3IgKz0gJywgJyArIFNFTEVDVE9SO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0dmFyIHByZSA9IC8qKiBAdHlwZSB7SFRNTFByZUVsZW1lbnR9ICovIChlbnYuZWxlbWVudCk7XG5cdFx0aWYgKHByZS5tYXRjaGVzKFNFTEVDVE9SKSkge1xuXHRcdFx0ZW52LmNvZGUgPSAnJzsgLy8gZmFzdC1wYXRoIHRoZSB3aG9sZSB0aGluZyBhbmQgZ28gdG8gY29tcGxldGVcblxuXHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0xPQURJTkcpOyAvLyBtYXJrIGFzIGxvYWRpbmdcblxuXHRcdFx0Ly8gYWRkIGNvZGUgZWxlbWVudCB3aXRoIGxvYWRpbmcgbWVzc2FnZVxuXHRcdFx0dmFyIGNvZGUgPSBwcmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQ09ERScpKTtcblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBMT0FESU5HX01FU1NBR0U7XG5cblx0XHRcdHZhciBzcmMgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBlbnYubGFuZ3VhZ2U7XG5cdFx0XHRpZiAobGFuZ3VhZ2UgPT09ICdub25lJykge1xuXHRcdFx0XHQvLyB0aGUgbGFuZ3VhZ2UgbWlnaHQgYmUgJ25vbmUnIGJlY2F1c2UgdGhlcmUgaXMgbm8gbGFuZ3VhZ2Ugc2V0O1xuXHRcdFx0XHQvLyBpbiB0aGlzIGNhc2UsIHdlIHdhbnQgdG8gdXNlIHRoZSBleHRlbnNpb24gYXMgdGhlIGxhbmd1YWdlXG5cdFx0XHRcdHZhciBleHRlbnNpb24gPSAoL1xcLihcXHcrKSQvLmV4ZWMoc3JjKSB8fCBbLCAnbm9uZSddKVsxXTtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBFWFRFTlNJT05TW2V4dGVuc2lvbl0gfHwgZXh0ZW5zaW9uO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgbGFuZ3VhZ2UgY2xhc3Nlc1xuXHRcdFx0UHJpc20udXRpbC5zZXRMYW5ndWFnZShjb2RlLCBsYW5ndWFnZSk7XG5cdFx0XHRQcmlzbS51dGlsLnNldExhbmd1YWdlKHByZSwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHQvLyBwcmVsb2FkIHRoZSBsYW5ndWFnZVxuXHRcdFx0dmFyIGF1dG9sb2FkZXIgPSBQcmlzbS5wbHVnaW5zLmF1dG9sb2FkZXI7XG5cdFx0XHRpZiAoYXV0b2xvYWRlcikge1xuXHRcdFx0XHRhdXRvbG9hZGVyLmxvYWRMYW5ndWFnZXMobGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBsb2FkIGZpbGVcblx0XHRcdGxvYWRGaWxlKFxuXHRcdFx0XHRzcmMsXG5cdFx0XHRcdGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0XHRcdFx0Ly8gbWFyayBhcyBsb2FkZWRcblx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfTE9BREVEKTtcblxuXHRcdFx0XHRcdC8vIGhhbmRsZSBkYXRhLXJhbmdlXG5cdFx0XHRcdFx0dmFyIHJhbmdlID0gcGFyc2VSYW5nZShwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXJhbmdlJykpO1xuXHRcdFx0XHRcdGlmIChyYW5nZSkge1xuXHRcdFx0XHRcdFx0dmFyIGxpbmVzID0gdGV4dC5zcGxpdCgvXFxyXFxuP3xcXG4vZyk7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSByYW5nZSBpcyBvbmUtYmFzZWQgYW5kIGluY2x1c2l2ZSBvbiBib3RoIGVuZHNcblx0XHRcdFx0XHRcdHZhciBzdGFydCA9IHJhbmdlWzBdO1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IHJhbmdlWzFdID09IG51bGwgPyBsaW5lcy5sZW5ndGggOiByYW5nZVsxXTtcblxuXHRcdFx0XHRcdFx0aWYgKHN0YXJ0IDwgMCkgeyBzdGFydCArPSBsaW5lcy5sZW5ndGg7IH1cblx0XHRcdFx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc3RhcnQgLSAxLCBsaW5lcy5sZW5ndGgpKTtcblx0XHRcdFx0XHRcdGlmIChlbmQgPCAwKSB7IGVuZCArPSBsaW5lcy5sZW5ndGg7IH1cblx0XHRcdFx0XHRcdGVuZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGVuZCwgbGluZXMubGVuZ3RoKSk7XG5cblx0XHRcdFx0XHRcdHRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5qb2luKCdcXG4nKTtcblxuXHRcdFx0XHRcdFx0Ly8gYWRkIGRhdGEtc3RhcnQgZm9yIGxpbmUgbnVtYmVyc1xuXHRcdFx0XHRcdFx0aWYgKCFwcmUuaGFzQXR0cmlidXRlKCdkYXRhLXN0YXJ0JykpIHtcblx0XHRcdFx0XHRcdFx0cHJlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcsIFN0cmluZyhzdGFydCArIDEpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBoaWdobGlnaHQgY29kZVxuXHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuXHRcdFx0XHRcdFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoY29kZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdC8vIG1hcmsgYXMgZmFpbGVkXG5cdFx0XHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0ZBSUxFRCk7XG5cblx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0gZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQgPSB7XG5cdFx0LyoqXG5cdFx0ICogRXhlY3V0ZXMgdGhlIEZpbGUgSGlnaGxpZ2h0IHBsdWdpbiBmb3IgYWxsIG1hdGNoaW5nIGBwcmVgIGVsZW1lbnRzIHVuZGVyIHRoZSBnaXZlbiBjb250YWluZXIuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBFbGVtZW50cyB3aGljaCBhcmUgYWxyZWFkeSBsb2FkZWQgb3IgY3VycmVudGx5IGxvYWRpbmcgd2lsbCBub3QgYmUgdG91Y2hlZCBieSB0aGlzIG1ldGhvZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gW2NvbnRhaW5lcj1kb2N1bWVudF1cblx0XHQgKi9cblx0XHRoaWdobGlnaHQ6IGZ1bmN0aW9uIGhpZ2hsaWdodChjb250YWluZXIpIHtcblx0XHRcdHZhciBlbGVtZW50cyA9IChjb250YWluZXIgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IpO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgZWxlbWVudDsgKGVsZW1lbnQgPSBlbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0UHJpc20uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0dmFyIGxvZ2dlZCA9IGZhbHNlO1xuXHQvKiogQGRlcHJlY2F0ZWQgVXNlIGBQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0YCBpbnN0ZWFkLiAqL1xuXHRQcmlzbS5maWxlSGlnaGxpZ2h0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghbG9nZ2VkKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ1ByaXNtLmZpbGVIaWdobGlnaHQgaXMgZGVwcmVjYXRlZC4gVXNlIGBQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0YCBpbnN0ZWFkLicpO1xuXHRcdFx0bG9nZ2VkID0gdHJ1ZTtcblx0XHR9XG5cdFx0UHJpc20ucGx1Z2lucy5maWxlSGlnaGxpZ2h0LmhpZ2hsaWdodC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9O1xuXG59KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCItLS1cXG5kYXRlOiAyMDE5LTA4LTMwXFxudGl0bGU6ICdIb3cgdG8gV3JpdGUgVGV4dCdcXG50ZW1wbGF0ZTogcG9zdFxcbnRodW1ibmFpbDogJy4vdGh1bWJuYWlscy93cml0aW5nLnBuZydcXG5zbHVnOiBob3ctdG8td3JpdGUtdGV4dFxcbmNhdGVnb3JpZXM6IGhlbHBpbmcgdG8gd3JpdGUgdGV4dFxcbnRhZ3M6IGluc3RydWN0aW9uIHRleHRlciB3cml0ZXJcXG4tLS1cXG5cXG4jIyMgRm9ybWF0dGluZyBzeW50YXhcXG5cXG5UaGlzIGV4YW1wbGUgaXMgYSBzbWFsbCBndWlkZS4gXFxcIkhvdyB0byB3cml0ZSBtYXJrZG93biB0ZXh0IGFuZCBnZXQgSFRNTCBkb2N1bWVudCBvdXRcXFwiLiBTZWUgY29kZSBvbiBteSBHaXRIdWI6IFttYXJrYWJsZSBwYXJzZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tZXVnZW5vbS9tYXJrYWJsZS10by1odG1sKVxcblxcbiMjIyBDYXB0aW9uXFxuXFxuSG93IHRvIHVzZTogd3JpdGUgdGhpcyBibG9jayBsaWtlIHRoZSBleGFtcGxlIGJlbG93XFxuXFxuYGBgYmFzaFxcbjEgIC0tLVxcbjIgIGRhdGU6IDIwMTktMDgtMzBcXG4zICB0aXRsZTogJ0luc3RydWN0aW9uIHRvIFdyaXRlIFRleHQnXFxuNCAgdGVtcGxhdGU6IHBvc3RcXG41ICB0aHVtYm5haWw6ICcuLi90aHVtYm5haWxzL3dyaXRpbmcucG5nJ1xcbjYgIHNsdWc6IGluc3RydWN0aW9uLXRvLXdyaXRlLXRleHRcXG43ICBjYXRlZ29yaWVzOiBcXG44ICB0YWdzOiBpbnN0cnVjdGlvbiB0ZXh0ZXIgd3JpdGVyIFxcbjkgIC0tLVxcbmBgYFxcblxcbiMjIyBIZWFkaW5nc1xcblxcbkhvdyB0byB1c2U6XFxuYGBgYmFzaFxcbjEgICMgVGhlIGgxIGhlYWRpbmdcXG4yICAjIyBUaGUgaDIgaGVhZGluZ1xcbjMgICMjIyBUaGUgaDMgaGVhZGluZ1xcbjQgICMjIyMgVGhlIGg0IGhlYWRpbmdcXG41ICAjIyMjIyBUaGUgaDUgaGVhZGluZ1xcbmBgYFxcblxcbiMjIyBTdHJvbmcgdGV4dFxcblxcbkhvdyB0byB1c2U6IFRoaXMgd29yZCBpcyBgKipzdHJvbmcqKmBcXG5cXG5pbiBvdXQ6XFxuVGhpcyB3b3JkIGlzICoqc3Ryb25nKipcXG5cXG4jIyMgQ29kZSBCbG9ja1xcblxcbmBgYGJhc2hcXG5cXHRgYGBqYXZhc2NyaXB0XFxuICAgIGxldCBnZXRNaW4gPSBhc3luYyAobWluKT0+IHtcXG4gICAgcmV0dXJuIGBcXG4gICAgICAgIG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuICAgICAgICBgXFxuICAgIH1cXG5cXHRgYGBcXG5gYGBcXG5pbiBvdXQ6XFxuXFxuYGBgamF2YXNjcmlwdFxcbiAgICBsZXQgZ2V0TWluID0gYXN5bmMgKG1pbik9PiB7XFxuICAgIHJldHVybiBgXFxuICAgICAgICBtaW5pbWFsIHZhbHVlIGlzICR7bWlufVxcbiAgICAgICAgYFxcbiAgICB9XFxuYGBgXFxuXFxuIyMjIENvZGUgSW5saW5lXFxuXFxuYGBgYmFzaFxcbiAgICBgdGVzdGAgLSB0ZXN0IG9wdGlvblxcbmBgYFxcblxcbmluIG91dDpcXG5gdGVzdGAgLSB0ZXN0IG9wdGlvblxcblxcbiMjIyBMaXN0c1xcblxcbmBgYGJhc2hcXG5cXHQtIGxpc3QgZGlzY1xcblxcdFtdIGxpc3QgdW5jaGVja2VkIGRpc2FibGVcXG5cXHRbeF0gbGlzdCBjaGVja2VkIGRpc2FibGVcXG5gYGBcXG5cXG5pbiBvdXQ6XFxuXFxuIC0gbGlzdCBkaXNjXFxuW10gbGlzdCB1bmNoZWNrZWQgZGlzYWJsZVxcblt4XSBsaXN0IGNoZWNrZWQgZGlzYWJsZVxcblxcbiMjIyBUYWJsZVxcblxcbmBgYGJhc2hcXG58IE5hbWUgfCBBZ2UgfCBBdXRvIHwgVG93biB8IFBldCB8XFxufCBCb2IgfCAxNyB8IEJNVyB8IEJha3UgfCBGaXNoIHxcXG58IEpvaG4gfCA1MiB8IEZpYXQgfCBCZXJsaW4gfCBEb2cgfFxcbnwgTGlzYSB8IDMyIHwgVG95b3RhIHwgRnJhbmtmdXJ0IHwgU25ha2UgfFxcbnwgRXVnZW4gfCA0NSB8IE1hemRhIHwgRHJlc2RlbiB8IENhdCB8XFxuYGBgXFxuXFxuXFxufCBOYW1lIHwgQWdlIHwgQXV0byB8IFRvd24gfCBQZXQgfFxcbnwgQm9iIHwgMTcgfCBCTVcgfCBCYWt1IHwgRmlzaCB8XFxufCBKb2huIHwgNTIgfCBGaWF0IHwgQmVybGluIHwgRG9nIHxcXG58IExpc2EgfCAzMiB8IFRveW90YSB8IEZyYW5rZnVydCB8IFNuYWtlIHxcXG58IEV1Z2VuIHwgNDUgfCBNYXpkYSB8IERyZXNkZW4gfCBDYXQgfFxcblxcblxcbiMjIyBRdW90aW5nIHRleHRcXG5cXG5gYGBiYXNoXFxuICAgID4gUXVvdGVcXG4gICAgPiA8Y2l0ZT4gLSBBdXRob3IgPC9jaXRlPlxcbmBgYFxcblxcbmluIG91dDpcXG4+IEV4YW1wbGUgUXVvdGVcXG4+IDxjaXRlPiAtIEFsYmVydCBSb3VnZSA8L2NpdGU+XFxuXFxuIyMjIExpbmtzXFxuXFxuWW91IGNhbiBjcmVhdGUgYW4gaW5saW5lIGxpbmsgYnkgd3JhcHBpbmcgbGluayB0ZXh0IGluIGJyYWNrZXRzLCBhbmQgdGhlbiB3cmFwcGluZyB0aGUgVVJMIGluIHBhcmVudGhlc2VzOlxcblxcbmBgYGJhc2hcXG5cXHRUaGlzIHNpdGUgd2FzIGJ1aWx0IHVzaW5nIFtKYXZhc2NyaXB0IEVTNl0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRUNNQVNjcmlwdCNFUzIwMTUpICBhbmQgaXQncyBhbiBleGFtcGxlLlxcbmBgYFxcblxcbmluIG91dDpcXG5UaGlzIHNpdGUgd2FzIGJ1aWx0IHVzaW5nIFtKYXZhc2NyaXB0IEVTNl0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRUNNQVNjcmlwdCNFUzIwMTUpIGFuZCBpdCdzIGFuIGV4YW1wbGUuXFxuXFxuIyMjIFNpbXBsZSBVbmRlcmxpbmUgZGVjb3JhdGlvblxcblxcbmBgYGJhc2hcXG4gICAgX3VuZGVyZGFzaF9cXG5gYGBcXG5cXG5pbiBvdXQ6XFxuXFxuX3VuZGVyZGFzaF9cXG5cXG4jIyMgQ29sb3IgVW5kZXJsaW5lIGRlY29yYXRpb25cXG5cXG5gYGBiYXNoXFxuXFx0Qmx1ZS5ibHVlIGNvbG9yXFxuXFx0R3JheS5ncmF5IGNvbG9yXFxuXFx0UmVkLnJlZCBjb2xvclxcblxcdEdyZWVuLmdyZWVuIGNvbG9yXFxuXFx0WWVsbG93LnllbGxvdyBjb2xvclxcblxcdEluZGlnby5pbmRpZ28gY29sb3IgXFxuXFx0UHVycGxlLnB1cnBsZSBjb2xvclxcblxcdFBpbmsucGluayBjb2xvclxcbmBgYFxcbmluIG91dDpcXG5cXG5CbHVlLmJsdWUgY29sb3JcXG5HcmF5LmdyYXkgY29sb3JcXG5SZWQucmVkIGNvbG9yXFxuR3JlZW4uZ3JlZW4gY29sb3JcXG5ZZWxsb3cueWVsbG93IGNvbG9yXFxuSW5kaWdvLmluZGlnbyBjb2xvciBcXG5QdXJwbGUucHVycGxlIGNvbG9yXFxuUGluay5waW5rIGNvbG9yXFxuXFxuIyMjIENvbG9yIEJhZGdlc1xcblxcbmBgYGJhc2hcXG5cXHRCbHVlQGJsdWUgY29sb3JcXG5cXHRHcmF5QGdyYXkgY29sb3JcXG5cXHRSZWRAcmVkIGNvbG9yXFxuXFx0R3JlZW5AZ3JlZW4gY29sb3JcXG5cXHRZZWxsb3dAeWVsbG93IGNvbG9yXFxuXFx0SW5kaWdvQGluZGlnbyBjb2xvciBcXG5cXHRQdXJwbGVAcHVycGxlIGNvbG9yXFxuXFx0UGlua0BwaW5rIGNvbG9yXFxuYGBgXFxuaW4gb3V0OlxcblxcbkJsdWVAYmx1ZSBjb2xvclxcbkdyYXlAZ3JheSBjb2xvclxcblJlZEByZWQgY29sb3JcXG5HcmVlbkBncmVlbiBjb2xvclxcblllbGxvd0B5ZWxsb3cgY29sb3JcXG5JbmRpZ29AaW5kaWdvIGNvbG9yIFxcblB1cnBsZUBwdXJwbGUgY29sb3JcXG5QaW5rQHBpbmsgY29sb3JcXG5cXG4jIyMgSWdub3JpbmcgTWFya2Rvd24gZm9ybWF0dGluZ1xcblxcbllvdSBjYW4gaWdub3JlIChvciBlc2NhcGUpIE1hcmtkb3duIGZvcm1hdHRpbmc6XFxuXFxuYGBgYmFzaFxcblxcXFwqIHRoaXMgYWxsIHRleHQgaXMgIyMjIHVubWFya2FibGVcXFxcKlxcbnRoaXMgaXMgXFxcXCp1bm1hcmthYmxlXFxcXCogdGV4dFxcbkFib3V0IFxcXFwqdGhpcyA+UXVvdGVcXFxcKlxcbmBgYFxcblxcbmluIG91dDpcXG5cXFxcKiB0aGlzIGFsbCB0ZXh0IGlzICMjIyB1bm1hcmthYmxlXFxcXCpcXG50aGlzIGlzIFxcXFwqdW5tYXJrYWJsZVxcXFwqIHRleHRcXG5BYm91dCBcXFxcKnRoaXMgPlF1b3RlXFxcXCpcXG5cXG4jIyMgSW1hZ2VzXFxuXFxuYGBgYmFzaFxcbiAgICAhW0dpdGh1Yl9pbWFnZV0oLi9pbWFnZXMvZ2l0aHViLnBuZylcXG5gYGBcXG5cXG5pbiBvdXQ6XFxuXFxuIVtHaXRodWIgaW1hZ2VdKC4vaW1hZ2VzL2dpdGh1Yi5wbmcpXFxuXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICAgICAgICAgICAgICAgICAgICAgICAgXyAgICAgICBfXG5cdCAgXyBfXyBfX18gICBfXyBfIF8gX198IHwgX19fX3wgfCBfX19fXyAgICAgIF9fXyBfX1xuXHQgfCAnXyBgIF8gXFwgLyBfYCB8ICdfX3wgfC8gLyBfYCB8LyBfIFxcIFxcIC9cXCAvIC8gJ18gXFxcblx0IHwgfCB8IHwgfCB8IChffCB8IHwgIHwgICA8IChffCB8IChfKSBcXCBWICBWIC98IHwgfCB8XG5cdCB8X3wgfF98IHxffFxcX18sX3xffCAgfF98XFxfXFxfXyxffFxcX19fLyBcXF8vXFxfLyB8X3wgfF98XG5cblx0XHRcdFx0XHRcdFx0XHRcdCBfIF9cblx0XHRcdF9fXyBfX18gIF8gX18gX19fICBfIF9fIChfKSB8IF9fXyBfIF9fXG5cdFx0ICAgLyBfXy8gXyBcXHwgJ18gYCBfIFxcfCAnXyBcXHwgfCB8LyBfIFxcICdfX3xcblx0XHQgIHwgKF98IChfKSB8IHwgfCB8IHwgfCB8XykgfCB8IHwgIF9fLyB8XG5cdFx0ICAgXFxfX19cXF9fXy98X3wgfF98IHxffCAuX18vfF98X3xcXF9fX3xffFxuXHRcdFx0XHRcdFx0XHQgIHxffFxuICovXG5cbi8qKlxuICogV2UncmUgZ29pbmcgdG8gd3JpdGUgYSBzbWFsbCBtYXJrZG93biBjb21waWxlciB0b2dldGhlciBhbmRcbiAqIGhhdmUgc29tZSBzdHJpbmdzIHRvIGNvbnZlcnQgaW4gSFRNTCB0YWdzLiBcbiAqIFdlIHdhbnQgdG8gc2hhcmUgaXQgd2l0aCBvdXIgZnJpZW5kcyBvciBvdGhlciBwZW9wbGUuXG4gKiBTbywgb3VyIHRhc2sgbG9va3MgbGlrZSB0aGlzOlxuICpcbiAqICAgTUFSS0RPV04gICAgICBIVE1MXG4gKlxuICogICAqKioqIEFCQ0QgICAgIDxoND5BQkNEPC9oND5cbiAqICAgKnRleHQqICAgICAgICA8c3Ryb25nPnRleHQ8L3N0cm9uZz5cbiAqXG4gKiBBbmQgZXRjLiBMb29rcyBpdCBlYXN5PyBZZWEhIFxuICogU291bmRzIGdvb2QhIExldCdzIGdvLi4uXG5cbiAgLyoqXG4gKiBcbiAqICAgMS4gaW5wdXQgID0+IHRva2VuaXplciAgID0+IHRva2Vuc1xuICogICAyLiB0b2tlbnMgPT4gcGFyc2VyICAgICAgPT4gYXN0XG4gKiAgIDIuMSB2aXN1YWxpemF0aW9uIGFzdCB0byBET00gZWxlbWVudHNcbiAqICAgMy4gYXN0ICAgID0+IHRyYW5zZm9ybWVyID0+IG5ld0FzdG5vZGVcbiAqICAgNC4gbmV3QXN0ID0+IGdlbmVyYXRvciAgID0+IG91dHB1dFxuICovXG5cblxuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tIFwiLi9QYXJzZXJcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG5pbXBvcnQgXCIuL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBUZXh0IGZyb20gJ3Jhdy1sb2FkZXIhLi4vY29udGVudC9hcnRpY2xlcy9ob3ctdG8td3JpdGUtdGV4dC5tZCc7XG5cblxuLy9wdXQgdGV4dCBpbnRvIHRoZSB0ZXh0YXJlYVxuY29uc3QgdGV4dGFyZWE6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0YXJlYVwiKTtcblxuLy9jb25zb2xlLmxvZyh0ZXh0YXJlYSlcbnRleHRhcmVhLmlubmVySFRNTCA9IFRleHQ7XG5cblxuY29uc3QgY29udmVydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29udmVydCcpO1xuY29uc3QgZGVmYXVsdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tZGVmYXVsdCcpO1xuXG5jb252ZXJ0QnRuLmNsYXNzTGlzdCA9IFwiYmctdHJhbnNwYXJlbnQgaG92ZXI6YmctcmVkLTUwMCB0ZXh0LXJlZC03MDAgZm9udC1zZW1pYm9sZCBob3Zlcjp0ZXh0LXdoaXRlIHB5LTIgcHgtNCBib3JkZXIgaG92ZXI6Ym9yZGVyLXRyYW5zcGFyZW50IHJvdW5kZWRcIjtcbmRlZmF1bHRCdG4uY2xhc3NMaXN0ID0gXCJiZy10cmFuc3BhcmVudCBob3ZlcjpiZy1ibHVlLTUwMCB0ZXh0LWJsdWUtNzAwIGZvbnQtc2VtaWJvbGQgaG92ZXI6dGV4dC13aGl0ZSBweS0yIHB4LTQgYm9yZGVyIGhvdmVyOmJvcmRlci10cmFuc3BhcmVudCByb3VuZGVkXCI7XG5cbmRlZmF1bHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcblxuXHR0ZXh0YXJlYS52YWx1ZSA9IFwiXCI7XG5cdGFwcC5pbm5lckhUTUwgPSBcIlwiO1xuXHR0ZXh0YXJlYS52YWx1ZSA9IFRleHQ7XG5cblx0Y29uc3QgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcihUZXh0KTtcblx0Y29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih0b2tlbml6ZXIudG9rZW5zKTtcblx0bmV3IFZpZXcocGFyc2VyLmFzdCk7XG5cbn0pO1xuXG5jb252ZXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG5cblx0Ly9jbGVhciBvbGQgXG5cdGxldCBhcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0YXBwLmlubmVySFRNTCA9IFwiXCI7XG5cblx0Y29uc3QgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih0ZXh0YXJlYS52YWx1ZSk7XG5cdGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodG9rZW5pemVyLnRva2Vucyk7XG5cdG5ldyBWaWV3KHBhcnNlci5hc3QpO1xuXG59KTtcblxuY29uc3QgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcihUZXh0KTtcbi8vY29uc29sZS5sb2codG9rZW5pemVyLnRva2VucylcbmNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodG9rZW5pemVyLnRva2Vucyk7XG4vL2NvbnNvbGUubG9nKHBhcnNlci5hc3QpXG5uZXcgVmlldyhwYXJzZXIuYXN0KTtcblxuXG5cdC8vbGV0IG5ld0FzdCA9IHRyYW5zZm9ybWVyKGFzdCk7XG5cdC8vbGV0IG91dHB1dCA9IGNvZGVHZW5lcmF0b3IobmV3QXN0KTtcblxuIl0sIm5hbWVzIjpbIkdyYW1tYXIiLCJUb2tlblR5cGUiLCJDYXB0aW9uIiwidGV4dCIsImNhcHRpb24iLCJtYXRjaCIsIkJMT0NLUyIsIkNBUFRJT04iLCJ0b2tlbiIsInR5cGUiLCJyb3ciLCJkYXRlIiwidGl0bGUiLCJ0ZW1wbGF0ZSIsInRodW1ibmFpbCIsInNsdWciLCJjYXRlZ29yaWVzIiwidGFncyIsInJlcGxhY2UiLCJIRUFESU5HIiwiU1BBQ0UiLCJMSU5FIiwiQ09MT1IiLCJCQURHRSIsIkxJU1QiLCJDT0RFX0JMT0NLIiwiQ09ERV9JTl9DT0RFIiwiSU5MSU5FX0NPREUiLCJRVU9URSIsIkxJTksiLCJJTUFHRSIsIlVOREVSX0xJTkUiLCJVTk1BUktBQkxFIiwiU1RST05HIiwiX1RBQkxFIiwiVEFCTEUiLCJQYXJzZXIiLCJ0b2tlbnMiLCJhc3QiLCJjaGlsZHJlbiIsImluaXQiLCJ0b2tlbl9udW1iZXIiLCJpc1BhcmFncmFwaCIsImxlbmd0aCIsImNhcHRpb25FbGVtZW50IiwicHVzaCIsIkhFQURJTkdfRklSU1QiLCJoZWFkRWxlbWVudCIsImRlcHQiLCJ2YWx1ZSIsIlRFWFQiLCJIRUFESU5HX1NFQ09ORCIsIkhFQURJTkdfVEhJUkQiLCJIRUFESU5HX0ZPUlRIIiwiSEVBRElOR19GSUZUSCIsImNvZGVJbkNvZGVFbGVtZW50IiwibGFuZ3VhZ2UiLCJjb2RlIiwiY29kZUJsb2NrRWxlbWVudCIsInF1b3RlRWxlbWVudCIsInF1b3RlIiwiYXV0aG9yIiwibGlzdEVsZW1lbnQiLCJhdHRyaWJ1dGUiLCJ0YWJsZUVsZW1lbnQiLCJQQVJBR1JBUEhfU1RBUlQiLCJwYXJhZ3JhcGhTdGFydEVsZW1lbnQiLCJQQVJBR1JBUEgiLCJQQVJBR1JBUEhfRU5EIiwibGlua0VsZW1lbnQiLCJuYW1lIiwidXJsIiwiaW1hZ2VUb2tlbiIsImFsdCIsInRleHRUb2tlbiIsInVubWFya2FibGVUZXh0VG9rZW4iLCJzdHJvbmdUZXh0VG9rZW4iLCJjb2xvclRleHRUb2tlbiIsImNvbG9yIiwiYmFkZ2VUb2tlbiIsIkNPREVfSU5MSU5FIiwiaW5saW5lQ29kZUVsZW1lbnQiLCJ1bmRlckxpbmVFbGVtZW50IiwiVG9rZW5pemVyIiwiZ2V0Iiwid29yZHMiLCJzcGxpdCIsIm91dCIsIndvcmRfbnVtYmVyIiwibG9vcF93b3JkIiwiVU5LTk9XTl9URVhUIiwicmVzdCIsImFyciIsInVua25vd25Ub2tlbiIsImNvZGVUb2tlbiIsInVua25vd25UZXh0VG9rZW4iLCJxdW90ZVRva2VuIiwiaXRva2VucyIsImZvckVhY2giLCJzdHJva2UiLCJwYXJhZ3JhcGhTdGFydFRva2VuIiwidGV4dEJlZm9yZVRva2VuIiwidGV4dEFmdGVyVG9rZW4iLCJwYXJhZ3JhcGhFbmRUb2tlbiIsImxpbmtUb2tlbiIsInVuZGVyTGluZVRva2VuIiwiY29kZUlubGluZVRva2VuIiwidW5tYXJrYWJsZVRva2VuIiwibGlzdFRva2VuIiwidGFibGVSb3dUb2tlbiIsIlRBQkxFX1JPVyIsInRhYmxlVG9rZW4iLCJ0eXBlcyIsIml0eXBlIiwiaGVhZFRva2VuIiwiQ2FwdGlvbkhUTUwiLCJIZWFkZXJIVE1MIiwiUGFyYWdyYXBoSFRNTCIsIkNvZGVCbG9ja0hUTUwiLCJRdW90ZUhUTUwiLCJMaXN0SFRNTCIsIlRhYmxlSFRNTCIsIlZpZXciLCJyZW5kZXIiLCJoZWFkZXIiLCJjb2RlYmxvY2siLCJsaXN0IiwidGFibGUiLCJwYXJhZ3JhcGgiLCJEb21VdGlsaXRlcyIsInRhZ3NCbG9jayIsInRvU3RyaW5nIiwibWFwIiwidGFnIiwiY2F0ZWdvcmllc0Jsb2NrIiwiQ2FwdGlvbkJsb2NrIiwic2xpY2UiLCJjYXB0aW9uTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kQ2hpbGQiLCJQcmlzbSIsImNvZGVCbG9jayIsIkNvZGVCbG9ja05vZGUiLCJjbGFzc05hbWUiLCJoaWdobGlnaHRBbGwiLCJsYXN0Q2hpbGQiLCJnZXRSb290Iiwibm9kZU5hbWUiLCJxdWVyeVNlbGVjdG9yIiwiZWxlbWVudCIsIkhlYWRlck5vZGUiLCJsYXN0RWxlbWVudENoaWxkIiwibGlzdEJsb2NrIiwibGlzdEJsb2NrTm9kZSIsIlBhcmFncmFwaE5vZGUiLCJjaGlsZCIsImNvbG9yVGV4dCIsImNvbG9yQmFkZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiU3RyaW5nIiwicXVvdGVCbG9jayIsInF1b3RlQmxvY2tOb2RlIiwidGFibGVOb2RlIiwidGFibGVIZWFkIiwidGFibGVCb2R5IiwiaGVhZEFycmF5IiwiYm9keUFycmF5IiwiaSIsInBvcCIsInNoaWZ0IiwiaGVhZCIsImJvZHkiLCJwYXJhZ3JhcGhOb2RlIiwiVGV4dCIsInRleHRhcmVhIiwiY29udmVydEJ0biIsImRlZmF1bHRCdG4iLCJjbGFzc0xpc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xpY2siLCJhcHAiLCJ0b2tlbml6ZXIiLCJwYXJzZXIiXSwic291cmNlUm9vdCI6IiJ9