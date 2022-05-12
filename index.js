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

      if (this.text.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION) != null) {
        this.token = {
          value: caption[0],
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.CAPTION,
          date: caption[2],
          title: caption[4],
          template: caption[6],
          thumbnail: caption[8],
          slug: caption[10],
          categories: caption[12],
          tags: caption[14],
          row_number: 0,
          word_number: 0
        }; //remove caption from the text

        this.text = this.text.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION, "");
        return this.token;
      }
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
  LIST: /(\-|\[\]|\[\x\])\s((.*))/,
  CODE: /```(bash|javascript)([\s\S]*?\s)```/,
  CODE_BLOCK: /```(bash|javascript)((\s[\s\S]*)```)\s*```\s/,
  QUOTE: />(.*)\s>.<cite>(.*)<\/cite>/,
  LINK: /(.*)[^!]\[(.*?)\]\((.*)\)(.*)/,
  IMAGE: /(.*)!\[(.*?)\]\((.*)\)(.*)/,
  UNDER_DASH: /(.*)\_(.*)\_(.*)/,
  UNMARKABLE: /(.*)\\\*(.*)\\\*(.*)/,
  STRONG: /(.*)\*\*(.*)\*\*(.*)/,
  INLINE_CODE: /(.*)\`(.*)\`(.*)/
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
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Parser = /*#__PURE__*/_createClass(function Parser(tokens) {
  var _this = this;

  _classCallCheck(this, Parser);

  _defineProperty(this, "init", function () {
    var token_number = 0;
    var isParagraph = false;

    while (token_number < _this.tokens.length) {
      var token = _this.tokens[token_number];

      if (token.type === "Caption") {
        var el = {
          type: "Caption",
          depth: 1,
          children: [{
            value: token.value,
            type: "Caption",
            date: token.date,
            title: token.title,
            template: token.template,
            thumbnail: token.thumbnail,
            slug: token.slug,
            categories: token.categories,
            tags: token.tags
          }],
          row: "# " + token.value
        };

        _this.ast.children.push(el);
      }

      if (token.type === "HeadingFirst") {
        var _el = {
          type: "Header",
          depth: 1,
          children: [{
            type: "Text",
            value: token.value
          }],
          row: "# " + token.value
        };

        _this.ast.children.push(_el);
      }

      if (token.type === "HeadingSecond") {
        var _el2 = {
          type: "Header",
          depth: 2,
          children: [{
            type: "Text",
            value: token.value
          }],
          row: "# " + token.value
        };

        _this.ast.children.push(_el2);
      }

      if (token.type === "HeadingThird") {
        var _el3 = {
          type: "Header",
          depth: 3,
          children: [{
            type: "Text",
            value: token.value
          }],
          row: "### " + token.value
        };

        _this.ast.children.push(_el3);
      }

      if (token.type === "HeadingForth") {
        var _el4 = {
          type: "Header",
          depth: 4,
          children: [{
            type: "Text",
            value: token.value
          }],
          row: "#### " + token.value
        };

        _this.ast.children.push(_el4);
      }

      if (token.type === "HeadingFifth") {
        var _el5 = {
          type: "Header",
          depth: 5,
          children: [{
            type: "Text",
            value: token.value
          }],
          row: "##### " + token.value
        };

        _this.ast.children.push(_el5);
      } //CodeBlock


      if (token.type == "CodeBlock") {
        var _el6 = {
          type: "CodeBlock",
          value: token.value,
          language: token.language,
          row: "```" + token.language + "\n" + token.value + "\n```"
        };

        _this.ast.children.push(_el6);
      } //Code


      if (token.type == "Code") {
        var _el7 = {
          type: "Code",
          value: token.value,
          language: token.language,
          row: "```" + token.language + "\n" + token.value + "\n```"
        };

        _this.ast.children.push(_el7);
      } //Code


      if (token.type == "Quote") {
        var _el8 = {
          type: "Quote",
          value: token.value,
          quote: token.quote,
          author: token.author,
          row: ">" + token.quote + "\n> <cite> - " + token.author + "</cite>"
        };

        _this.ast.children.push(_el8);
      } //List


      if (token.type == "List") {
        var _el9 = {
          type: "List",
          value: token.value,
          name: token.name,
          row: token.name + " " + token.value + "\n"
        };

        _this.ast.children.push(_el9);
      } //Start all that in the paragraph can use


      if (token.type == "ParagraphStart") {
        var _el10 = {
          type: "Paragraph",
          children: [],
          row: ""
        };

        _this.ast.children.push(_el10);

        isParagraph = true;
      }

      if (token.type == "ParagraphEnd") {
        isParagraph = false;
      } //Link


      if (token.type == "Link" && isParagraph == true) {
        var _el11 = {
          type: "Link",
          alt: token.value,
          url: token.body,
          row: "[" + token.value + "](" + token.body + ")"
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el11);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + "[" + token.value + "](" + token.body + ")";
      }

      if (token.type == "Link" && isParagraph == false) {
        var _el12 = {
          type: "Link",
          alt: token.value,
          url: token.body,
          row: "[" + token.value + "](" + token.body + ")"
        };

        _this.ast.children.push(_el12);
      } //Image


      if (token.type == "Image" && isParagraph == true) {
        var _el13 = {
          type: "Image",
          alt: token.value,
          url: token.body,
          row: "[" + token.value + "](" + token.body + ")"
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el13);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + "[" + token.value + "](" + token.body + ")";
      }

      if (token.type == "Image" && isParagraph == false) {
        var _el14 = {
          type: "Image",
          alt: token.value,
          url: token.body,
          row: "[" + token.value + "](" + token.body + ")"
        };

        _this.ast.children.push(_el14);
      } // Text


      if (token.type == "Text" && isParagraph == true) {
        var _el15 = {
          type: "Text",
          value: token.value,
          row: token.value
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el15);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + token.value;
      }

      if (token.type == "Text" && isParagraph == false) {
        var _el16 = {
          type: "Text",
          value: token.value,
          row: token.value
        };

        _this.ast.children.push(_el16);
      } // Unmarkable


      if (token.type == "Unmarkable" && isParagraph == true) {
        var _el17 = {
          type: "Unmarkable",
          value: token.value,
          row: token.value
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el17);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + token.value;
      }

      if (token.type == "Unmarkable" && isParagraph == false) {
        var _el18 = {
          type: "Unmarkable",
          value: token.value,
          row: token.value
        };

        _this.ast.children.push(_el18);
      } // Strong


      if (token.type == "Strong" && isParagraph == true) {
        var _el19 = {
          type: "Strong",
          value: token.value,
          row: token.value
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el19);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + token.value;
      }

      if (token.type == "Strong" && isParagraph == false) {
        var _el20 = {
          type: "Strong",
          value: token.value,
          row: token.value
        };

        _this.ast.children.push(_el20);
      } // InlineCode


      if (token.type == "InlineCode" && isParagraph == true) {
        var _el21 = {
          type: "InlineCode",
          value: token.value,
          row: token.value
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el21);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + token.value;
      }

      if (token.type == "InlineCode" && isParagraph == false) {
        var _el22 = {
          type: "InlineCode",
          value: token.value,
          row: token.value
        };

        _this.ast.children.push(_el22);
      } // UnderDash


      if (token.type == "UnderDash" && isParagraph == true) {
        var _el23 = {
          type: "UnderDash",
          value: token.value,
          row: token.value
        };

        _this.ast.children[_this.ast.children.length - 1].children.push(_el23);

        _this.ast.children[_this.ast.children.length - 1].row = _this.ast.children[_this.ast.children.length - 1].row + token.value;
      }

      if (token.type == "UnderDash" && isParagraph == false) {
        var _el24 = {
          type: "UnderDash",
          value: token.value,
          row: token.value
        };

        _this.ast.children.push(_el24);
      }

      token_number++;
    }
  });

  this.tokens = tokens;
  this.ast = {
    type: "Document",
    children: []
  };
  this.init();
});

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
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/Types.ts");
/* harmony import */ var _Caption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Caption */ "./src/Caption.ts");


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Tokenizer = /*#__PURE__*/_createClass(function Tokenizer(_text) {
  var _this = this;

  _classCallCheck(this, Tokenizer);

  _defineProperty(this, "init", function () {
    //add caption
    if (_this.text.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CAPTION) != null) {
      var caption = new _Caption__WEBPACK_IMPORTED_MODULE_2__.Caption(_this.text);
      var token = caption.get();
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
     */

    _this.word_number = 0;

    loop_word: while (_this.word_number < _this.words.length) {
      out = out + " " + _this.words[_this.word_number]; //in the end of article

      if (_this.word_number == _this.words.length - 1) {
        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNKNOWN_TEXT,
          value: out
        });

        _this.word_number++;
        continue loop_word;
      } //CODE_BLOCK


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK) != null) {
        var rest = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK, "&codeblock&");
        var arr = rest.split("&codeblock&");

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNKNOWN_TEXT,
          value: arr[0]
        });

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.CODE_BLOCK,
          value: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK)[2],
          language: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE_BLOCK)[1]
        });

        out = arr[1];
        _this.word_number++;
        continue loop_word;
      } //CODE


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE) != null && out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE)[2].length > 5 //because value is not less then 5 symbols...its CODEBLOCK
      ) {
        var _rest = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE, "&code&");

        var _arr = _rest.split("&code&");

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNKNOWN_TEXT,
          value: _arr[0]
        });

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.CODE,
          value: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE)[2],
          language: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.CODE)[1]
        });

        out = _arr[1];
        _this.word_number++;
        continue loop_word;
      } //QUOTE


      if (out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE) != null) {
        var _rest2 = out.replace(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE, "&quote&");

        var _arr2 = _rest2.split("&quote&");

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNKNOWN_TEXT,
          value: _arr2[0]
        });

        _this.tokens.push({
          type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.QUOTE,
          value: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[0],
          quote: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[1],
          author: out.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.QUOTE)[2]
        });

        out = _arr2[1];
        _this.word_number++;
        continue loop_word;
      }

      _this.word_number++;
    } // LOOPS UNKNOWN_TEXT TO DEFINE OTHER TOKENS:


    var itokens = [];

    _this.tokens.forEach(function (token) {
      if (token.type == _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNKNOWN_TEXT) {
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
             * - Underdash
             */
            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.IMAGE,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[2],
                body: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.IMAGE)[4]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.LINK,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[2],
                body: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LINK)[4]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_DASH) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_DASH)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNDER_DASH,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_DASH)[2]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNDER_DASH)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.INLINE_CODE,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[2]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.INLINE_CODE)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.STRONG,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[2]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.STRONG)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            } // Unmarkable text


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[1]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.UNMARKABLE,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[2]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.UNMARKABLE)[3]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            } // LIST						


            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST) != null) {
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
                value: ""
              });
              console.log(stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST));
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.LIST,
                name: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST)[1],
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.LIST)[2]
              });
              itokens.push({
                type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
                value: ""
              });
              return;
            }

            if (stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING) != null) {
              var types = [_Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.HEADING_FIRST, _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.HEADING_SECOND, _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.HEADING_THIRD, _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.HEADING_FORTH, _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.HEADING_FIFTH];
              var itype = stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING)[1].length - 1;
              itokens.push({
                type: types[itype],
                value: stroke.match(_Grammar__WEBPACK_IMPORTED_MODULE_0__.Grammar.BLOCKS.HEADING)[2]
              });
              return;
            } // for other unknown text						


            itokens.push({
              type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_START,
              value: ""
            });
            itokens.push({
              type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.TEXT,
              value: stroke
            });
            itokens.push({
              type: _Types__WEBPACK_IMPORTED_MODULE_1__.TokensType.PARAGRAPH_END,
              value: ""
            });
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
/* harmony export */   "TokensType": () => (/* binding */ TokensType)
/* harmony export */ });
var TokensType;

(function (TokensType) {
  TokensType["CAPTION"] = "Caption";
  TokensType["CODE"] = "Code";
  TokensType["CODE_BLOCK"] = "CodeBlock";
  TokensType["DOCUMENT"] = "Document";
  TokensType["IMAGE"] = "Image";
  TokensType["HEADING_FIRST"] = "HeadingFirst";
  TokensType["HEADING_SECOND"] = "HeadingSecond";
  TokensType["HEADING_THIRD"] = "HeadingThird";
  TokensType["HEADING_FORTH"] = "HeadingForth";
  TokensType["HEADING_FIFTH"] = "HeadingFifth";
  TokensType["HEADING"] = "Heading";
  TokensType["INLINE_CODE"] = "InlineCode";
  TokensType["LINK"] = "Link";
  TokensType["LIST"] = "List";
  TokensType["PARAGRAPH_START"] = "ParagraphStart";
  TokensType["PARAGRAPH_END"] = "ParagraphEnd";
  TokensType["QUOTE"] = "Quote";
  TokensType["STRONG"] = "Strong";
  TokensType["TEXT"] = "Text";
  TokensType["UNDER_DASH"] = "UnderDash";
  TokensType["UNKNOWN_TEXT"] = "UnknownText";
  TokensType["UNMARKABLE"] = "Unmarkable";
})(TokensType || (TokensType = {}));

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
      //console.log(ast);
      var children = this.ast.children;
      children.forEach(function (token) {
        if (token.type == "Caption") {
          var caption = new _htmlblocks_CaptionHTML__WEBPACK_IMPORTED_MODULE_0__.CaptionHTML(token);
          caption.render();
        }

        if (token.type == "Header") {
          var header = new _htmlblocks_HeaderHTML__WEBPACK_IMPORTED_MODULE_1__.HeaderHTML(token);
          header.render();
        }

        if (token.type == "CodeBlock" || token.type == "Code") {
          var codeblock = new _htmlblocks_CodeBlockHTML__WEBPACK_IMPORTED_MODULE_3__.CodeBlockHTML(token);
          codeblock.render();
        }

        if (token.type == "Quote") {
          var quote = new _htmlblocks_QuoteHTML__WEBPACK_IMPORTED_MODULE_4__.QuoteHTML(token);
          quote.render();
        }

        if (token.type == "List") {
          var list = new _htmlblocks_ListHTML__WEBPACK_IMPORTED_MODULE_5__.ListHTML(token);
          list.render();
        }

        if (token.type == "Paragraph") {
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


/**
 * Returns an html block for head of chapter
 * @param line as block of the text
 * @return dom element for info about article
 */

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

      var CaptionBlock = "\t<div>\n\t\t\t\t  <img src= ".concat(this.token.children[0].thumbnail, " class=\"float-left p-8\"/>\n                        <h3 class=\"text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600\">\n\t\t\t\t\t\t\t").concat(this.token.children[0].title.slice(2, this.token.children[0].title.length - 1), "</h3>\n\t\t\t\t\t\t<time class=\"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1\">\n                            ").concat(this.token.children[0].date, "\n                        </time> \n                        <div class=\"tag-container py-1\">\n\t\t\t\t\t\t\t").concat(tagsBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"categories-container py-1\">\n\t\t\t\t\t\t\t").concat(categoriesBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t</div>");
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

      var codeBlock = "\n\t\t\t<code class=\"language-".concat(this.token.language, "\">\n\t\t \t\t").concat(this.token.value, "\n\t\t\t</code>");
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
      return document.querySelector('app');
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

      var HeaderNode = this.DomUtilites.createElement('h' + this.token.depth);
      HeaderNode.className = "text-".concat(this.token.depth, "xl mt-0 mb-2 text-gray-800 pr-10 pt-10");
      HeaderNode.innerHTML = this.token.children[0].value;
      var container;

      if (((_document$getElementB = document.getElementById("app")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children.length) > 0) {
        var _document$getElementB2;

        container = (_document$getElementB2 = document.getElementById("app")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.lastElementChild;
      } else {
        //container = document.getElementById("app");
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
      listBlockNode = this.DomUtilites.createElement("ul"); //console.log(this.token)

      if (this.token.name == "[]") {
        listBlockNode = this.DomUtilites.createElement("div");
        listBlock = "\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm disabled:bg-gray-200 disabled:border-gray-600 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\n\t\t\t\t\t<label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckDisabled\">\n\t\t\t  \t\t".concat(this.token.value, "\n\t\t\t\t\t</label>\n\t  \t\t</div>\n\t\t");
      }

      if (this.token.name == "[x]") {
        listBlockNode = this.DomUtilites.createElement("div");
        listBlock = "\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n\t\t\t\t\t<label class=\"form-check-label inline-block text-gray-800 opacity-100\" for=\"flexCheckCheckedDisabled\">\n\t\t\t  \t\t\t".concat(this.token.value, "\n\t\t\t\t\t</label>\n\t  \t\t</div>\n\t\t");
      }

      if (this.token.name == "-") {
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
/* harmony import */ var _DomUtilites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");

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
    this.DomUtilites = new _DomUtilites__WEBPACK_IMPORTED_MODULE_0__.DomUtilites();
  }

  _createClass(ParagraphHTML, [{
    key: "render",
    value: function render() {
      var _document$getElementB, _container;

      var ParagraphNode = this.DomUtilites.createElement("p");
      ParagraphNode.className = "block leading-7 font-mono";
      var text = "";
      this.token.children.forEach(function (child) {
        if (child.type == "Text") {
          text = text + " " + child.value;
        }

        if (child.type == "Image") {
          text = text + "\n\t\t\t\t<div class=\"flex flex-wrap justify-center\">\n\t\t\t\t\t<div class=\"w-6/12 sm:w-4/12 px-4 pb-20\">\n\t\t\t\t\t\t<img src=\"".concat(child.url, "\" alt=\"").concat(child.alt, "\" class=\"shadow rounded max-w-full h-auto allign-middle border-none\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t");
        }

        if (child.type == "Link") {
          text = text + "<a href=\"".concat(child.url, "\" class=\"text-blue-500\">\n\t\t\t\t\t").concat(child.alt, "\n\t\t\t\t\t<a/>");
        }

        if (child.type == "Strong") {
          text = text + " " + "\n\t\t\t\t<strong>".concat(child.value, "</strong>\n\t\t\t\t");
        }

        if (child.type == "InlineCode") {
          text = text + " " + "\n\t\t\t\t<code>".concat(child.value, "</code>\n\t\t\t\t");
        }

        if (child.type == "UnderDash") {
          text = text + " " + "\n\t\t\t\t<span class=\"underline decoration-sky-500 text-slate-500\">".concat(child.value, "</span>\n\t\t\t\t");
        }

        if (child.type == "Unmarkable") {
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
      var quoteBlockNode = this.DomUtilites.createElement("blockquote"); //quoteBlockNode.className = `p-4 italic border-l-8 bg-neutral-200 text-neutral-600 border-orange-500 quote`;

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("---\ndate: 2019-08-30\ntitle: 'How to Write Text'\ntemplate: post\nthumbnail: './thumbnails/writing.png'\nslug: how-to-write-text\ncategories: helping to write text\ntags: instruction texter writer\n---\n\n### Formatting syntax\n\nThis example is a small guide. \"How to write markdown text and get HTML document out\". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)\n\n### Caption\n\nHow to use: write this block like the example below\n\n```bash\n1  ---\n2  date: 2019-08-30\n3  title: 'Instruction to Write Text'\n4  template: post\n5  thumbnail: './thumbnails/writing.png'\n6  slug: instruction-to-write-text\n7  categories: \n8  tags: instruction texter writer \n9  ---\n```\n\n### Headings\n\nHow to use:\n```bash\n1  # The h1 heading\n2  ## The h2 heading\n3  ### The h3 heading\n4  #### The h4 heading\n5  ##### The h5 heading\n```\n\n### Strong text\n\nHow to use: This word is `**strong**`\n\nin out:\nThis word is **strong**\n\n### Code Block\n\n```bash\n\t```javascript\n    let getMin = async (min)=> {\n    return `\n        minimal value is ${min}\n        `\n    }\n\t```\n```\nin out:\n\n```javascript\n    let getMin = async (min)=> {\n    return `\n        minimal value is ${min}\n        `\n    }\n```\n\n### Code Inline\n\n```bash\n    `test` - test option\n```\n\nin out:\n`test` - test option\n\n### Lists\n\n```bash\n\t- select point 1\n\t[] select point 2\n\t[x] select point 3\n```\n\nin out:\n\n- select point 1\n[] select point 2\n[x] select point 3\n\n### Quoting text\n\n```bash\n    > Quote\n    > <cite> - Author </cite>\n```\n\nin out:\n> Example Quote\n> <cite> - Albert Rouge </cite>\n\n### Links\n\nYou can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:\n\n```bash\n\tThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015)  and it's an example.\n```\n\nin out:\nThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015) and it's an example.\n\n### Underdash word\n\n```bash\n    _underdash_\n```\n\nin out:\n\n_underdash_\n\n### Ignoring Markdown formatting\n\nYou can ignore (or escape) Markdown formatting:\n\n```bash\n\\* this all text is ### unmarkable\\*\nthis is \\*unmarkable\\* text\nAbout \\*this >Quote\\*\n```\n\nin out:\n\\* this all text is ### unmarkable\\*\nthis is \\*unmarkable\\* text\nAbout \\*this >Quote\\*\n\n### Images\n\n```bash\n    ![Github_image](./images/github.png)\n```\n\nin out:\n\n![Github image](./images/github.png)\n");

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
var tokenizer = new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__.Tokenizer(raw_loader_content_articles_how_to_write_text_md__WEBPACK_IMPORTED_MODULE_4__["default"]);
var parser = new _Parser__WEBPACK_IMPORTED_MODULE_1__.Parser(tokenizer.tokens);
new _View__WEBPACK_IMPORTED_MODULE_2__.View(parser.ast); //let newAst = transformer(ast);
//let output = codeGenerator(newAst);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFWO0VBQ0E4QixHQUFHLENBQUNqQyxTQUFKLEdBQWdCLEVBQWhCO0VBRUEsSUFBTWtDLFNBQVMsR0FBRyxJQUFJaEYsaURBQUosQ0FBY3lFLFFBQVEsQ0FBQ3JILEtBQXZCLENBQWxCO0VBQ0EsSUFBTTZILE1BQU0sR0FBRyxJQUFJcEcsMkNBQUosQ0FBV21HLFNBQVMsQ0FBQ2xHLE1BQXJCLENBQWY7RUFDQSxJQUFJZ0QsdUNBQUosQ0FBU21ELE1BQU0sQ0FBQzNGLEdBQWhCO0FBRUEsQ0FWRDtBQVlBLElBQU0wRixTQUFTLEdBQUcsSUFBSWhGLGlEQUFKLENBQWN3RSx3RkFBZCxDQUFsQjtBQUNBLElBQU1TLE1BQU0sR0FBRyxJQUFJcEcsMkNBQUosQ0FBV21HLFNBQVMsQ0FBQ2xHLE1BQXJCLENBQWY7QUFDQSxJQUFJZ0QsdUNBQUosQ0FBU21ELE1BQU0sQ0FBQzNGLEdBQWhCLEdBR0M7QUFDQSxxQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL0NhcHRpb24udHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvR3JhbW1hci50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9QYXJzZXIudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvVG9rZW5pemVyLnRzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9DYXB0aW9uSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0NvZGVCbG9ja0hUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9Eb21VdGlsaXRlcy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0hlYWRlckhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9MaXN0SFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9RdW90ZUhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9zcmMvc3RhdGljL3N0eWxlcy9wcmlzbS5jc3M/ZGVhNyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL3NyYy9zdGF0aWMvc3R5bGVzL3F1b3RlLmNzcz8wYWY0Iiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzPzg1ODciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci8uL2NvbnRlbnQvYXJ0aWNsZXMvaG93LXRvLXdyaXRlLXRleHQubWQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdHMtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXJrZG93bi10cy1jb21waWxlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hcmtkb3duLXRzLWNvbXBpbGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwic3RyaW5nXCJcblxuaW1wb3J0IHsgR3JhbW1hciB9IGZyb20gXCIuL0dyYW1tYXJcIlxuaW1wb3J0IHsgVG9rZW5zVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi9JVG9rZW5cIjtcblxuZXhwb3J0IGNsYXNzIENhcHRpb24ge1xuXG5cdHByaXZhdGUgdG9rZW46IElUb2tlbiB8IHVuZGVmaW5lZDtcblx0cHVibGljIHRleHQ6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcpIHtcblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHR9XG5cblx0cHVibGljIGdldCgpOiBJVG9rZW4ge1xuXG5cdFx0Y29uc3QgY2FwdGlvbiA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DQVBUSU9OKTtcblxuXHRcdGlmKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DQVBUSU9OKSAhPSBudWxsKSB7XG5cdFx0XG5cdFx0XHR0aGlzLnRva2VuID0ge1xuXHRcdFx0XHR2YWx1ZTogY2FwdGlvblswXSxcblx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5DQVBUSU9OLFxuXHRcdFx0XHRkYXRlOiBjYXB0aW9uWzJdLFxuXHRcdFx0XHR0aXRsZTogY2FwdGlvbls0XSxcblx0XHRcdFx0dGVtcGxhdGU6IGNhcHRpb25bNl0sXG5cdFx0XHRcdHRodW1ibmFpbDogY2FwdGlvbls4XSxcblx0XHRcdFx0c2x1ZzogY2FwdGlvblsxMF0sXG5cdFx0XHRcdGNhdGVnb3JpZXM6IGNhcHRpb25bMTJdLFxuXHRcdFx0XHR0YWdzOiBjYXB0aW9uWzE0XSxcblx0XHRcdFx0cm93X251bWJlcjogMCxcblx0XHRcdFx0d29yZF9udW1iZXI6IDBcblx0XHRcdH1cblxuXHRcdFx0Ly9yZW1vdmUgY2FwdGlvbiBmcm9tIHRoZSB0ZXh0XG5cdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZShHcmFtbWFyLkJMT0NLUy5DQVBUSU9OLCBcIlwiKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMudG9rZW47XG5cdFx0fVxuXHR9XG5cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIEdyYW1tYXJ7XG5cblx0cHVibGljIHN0YXRpYyBCTE9DS1MgPSB7XG5cdFx0XG5cdFx0SEVBRElORyA6IC8oI3sxLDV9KSgoLio/KSspLyxcblxuXHRcdENBUFRJT04gOiAvXi0tLVxcc2RhdGU6KCguKikpXFxzdGl0bGU6KCguKikpXFxzdGVtcGxhdGU6KCguKikpXFxzdGh1bWJuYWlsOigoLiopKVxcc3NsdWc6KCguKikpXFxzY2F0ZWdvcmllczooKC4qKSlcXHN0YWdzOigoLiopKVxccy0tLS8sXG5cdFx0XG5cdFx0U1BBQ0UgOiAvIC8sXG5cdFx0TElORSA6IC9cXG4vLFxuXG5cdFx0TElTVCA6IC8oXFwtfFxcW1xcXXxcXFtcXHhcXF0pXFxzKCguKikpLyxcblx0XHRcblx0XHRDT0RFIDogL2BgYChiYXNofGphdmFzY3JpcHQpKC4qP1xccylgYGAvcyxcblx0XHRDT0RFX0JMT0NLIDogL2BgYChiYXNofGphdmFzY3JpcHQpKChcXHMuKilgYGApXFxzKmBgYFxccy9zLFxuXG5cdFx0UVVPVEU6IC8+KC4qKVxccz4uPGNpdGU+KC4qKTxcXC9jaXRlPi8sXG5cdFx0XG5cdFx0TElOSyA6IC8oLiopW14hXVxcWyguKj8pXFxdXFwoKC4qKVxcKSguKikvLFxuXHRcdElNQUdFIDogLyguKikhXFxbKC4qPylcXF1cXCgoLiopXFwpKC4qKS8sXG5cblx0XHRVTkRFUl9EQVNIIDogLyguKilcXF8oLiopXFxfKC4qKS8sXG5cdFx0VU5NQVJLQUJMRSA6IC8oLiopXFxcXFxcKiguKilcXFxcXFwqKC4qKS8sXG5cdFx0U1RST05HIDogLyguKilcXCpcXCooLiopXFwqXFwqKC4qKS8sXG5cdFx0SU5MSU5FX0NPREUgOiAvKC4qKVxcYCguKilcXGAoLiopL1xuXHR9XG59XG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi9JVG9rZW5cIjtcblxuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cbnR5cGUgZWxlbWVudCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRkZXB0aD86IG51bWJlcixcblx0dmFsdWU/OiBzdHJpbmcsXG5cdGJvZHk/OiBzdHJpbmcsXG5cdHVybD86IHN0cmluZyxcblx0YWx0Pzogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdLFxuXHRyb3c6IHN0cmluZyxcblx0bGFuZ3VhZ2U/OiBzdHJpbmcsXG5cdHF1b3RlPzogc3RyaW5nLFxuXHRhdXRob3I/OiBzdHJpbmcsXG5cdG5hbWU/IDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXIge1xuXG5cdHB1YmxpYyB0b2tlbnM6IElUb2tlbltdO1xuXHRwdWJsaWMgYXN0OiBBU1Q7XG5cblx0Y29uc3RydWN0b3IodG9rZW5zOiBJVG9rZW5bXSkge1xuXHRcdHRoaXMudG9rZW5zID0gdG9rZW5zO1xuXHRcdHRoaXMuYXN0ID0ge1xuXHRcdFx0dHlwZTogXCJEb2N1bWVudFwiLFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cdFx0fTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQgPSAoKSA9PiB7XG5cblx0XHRsZXQgdG9rZW5fbnVtYmVyOiBudW1iZXIgPSAwO1xuXHRcdGxldCBpc1BhcmFncmFwaDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0d2hpbGUgKHRva2VuX251bWJlciA8IHRoaXMudG9rZW5zLmxlbmd0aCkge1xuXG5cdFx0XHRsZXQgdG9rZW4gPSB0aGlzLnRva2Vuc1t0b2tlbl9udW1iZXJdO1xuXHRcdFx0XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gXCJDYXB0aW9uXCIpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiQ2FwdGlvblwiLCBkZXB0aDogMSwgY2hpbGRyZW46IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkNhcHRpb25cIixcblx0XHRcdFx0XHRcdFx0ZGF0ZTogdG9rZW4uZGF0ZSxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRva2VuLnRpdGxlLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZTogdG9rZW4udGVtcGxhdGUsXG5cdFx0XHRcdFx0XHRcdHRodW1ibmFpbDogdG9rZW4udGh1bWJuYWlsLFxuXHRcdFx0XHRcdFx0XHRzbHVnOiB0b2tlbi5zbHVnLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yaWVzOiB0b2tlbi5jYXRlZ29yaWVzLFxuXHRcdFx0XHRcdFx0XHR0YWdzOiB0b2tlbi50YWdzXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XSwgcm93OiBcIiMgXCIgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuLnB1c2goZWwpO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBcIkhlYWRpbmdGaXJzdFwiKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHtcblx0XHRcdFx0XHR0eXBlOiBcIkhlYWRlclwiLCBkZXB0aDogMSwgY2hpbGRyZW46IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdLCByb3c6IFwiIyBcIiArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbCk7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFwiSGVhZGluZ1NlY29uZFwiKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHtcblx0XHRcdFx0XHR0eXBlOiBcIkhlYWRlclwiLCBkZXB0aDogMiwgY2hpbGRyZW46IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJUZXh0XCIsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdLCByb3c6IFwiIyBcIiArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gXCJIZWFkaW5nVGhpcmRcIikge1xuXHRcdFx0XHRsZXQgZWw6IGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJIZWFkZXJcIiwgZGVwdGg6IDMsIGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XSwgcm93OiBcIiMjIyBcIiArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gXCJIZWFkaW5nRm9ydGhcIikge1xuXHRcdFx0XHRsZXQgZWw6IGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJIZWFkZXJcIiwgZGVwdGg6IDQsIGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dFwiLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XSwgcm93OiBcIiMjIyMgXCIgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuLnB1c2goZWwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFwiSGVhZGluZ0ZpZnRoXCIpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiSGVhZGVyXCIsIGRlcHRoOiA1LCBjaGlsZHJlbjogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIlRleHRcIixcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF0sIHJvdzogXCIjIyMjIyBcIiArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vQ29kZUJsb2NrXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkNvZGVCbG9ja1wiKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHsgdHlwZTogXCJDb2RlQmxvY2tcIiwgdmFsdWU6IHRva2VuLnZhbHVlLCBsYW5ndWFnZTogdG9rZW4ubGFuZ3VhZ2UsIHJvdzogXCJgYGBcIiArIHRva2VuLmxhbmd1YWdlICsgXCJcXG5cIiArIHRva2VuLnZhbHVlICsgXCJcXG5gYGBcIiB9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuLnB1c2goZWwpXG5cdFx0XHR9XG5cblx0XHRcdC8vQ29kZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJDb2RlXCIpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIkNvZGVcIiwgdmFsdWU6IHRva2VuLnZhbHVlLCBsYW5ndWFnZTogdG9rZW4ubGFuZ3VhZ2UsIHJvdzogXCJgYGBcIiArIHRva2VuLmxhbmd1YWdlICsgXCJcXG5cIiArIHRva2VuLnZhbHVlICsgXCJcXG5gYGBcIiB9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuLnB1c2goZWwpXG5cdFx0XHR9XG5cblx0XHRcdC8vQ29kZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJRdW90ZVwiKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHtcblx0XHRcdFx0XHR0eXBlOiBcIlF1b3RlXCIsIHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRxdW90ZTogdG9rZW4ucXVvdGUsXG5cdFx0XHRcdFx0YXV0aG9yOiB0b2tlbi5hdXRob3IsXG5cdFx0XHRcdFx0cm93OiBcIj5cIiArIHRva2VuLnF1b3RlICsgXCJcXG4+IDxjaXRlPiAtIFwiICsgdG9rZW4uYXV0aG9yICsgXCI8L2NpdGU+XCJcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cdFx0XHQvL0xpc3Rcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiTGlzdFwiKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHsgdHlwZTogXCJMaXN0XCIsIHZhbHVlOiB0b2tlbi52YWx1ZSwgbmFtZTogdG9rZW4ubmFtZSwgcm93OiB0b2tlbi5uYW1lICsgXCIgXCIgKyB0b2tlbi52YWx1ZSArIFwiXFxuXCIgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cblx0XHRcdC8vU3RhcnQgYWxsIHRoYXQgaW4gdGhlIHBhcmFncmFwaCBjYW4gdXNlXG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiUGFyYWdyYXBoU3RhcnRcIikge1xuXHRcdFx0XHRsZXQgZWw6IGVsZW1lbnQgPSB7IHR5cGU6IFwiUGFyYWdyYXBoXCIsIGNoaWxkcmVuOiBbXSwgcm93OiBcIlwiIH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbCk7XG5cdFx0XHRcdGlzUGFyYWdyYXBoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJQYXJhZ3JhcGhFbmRcIikge1xuXHRcdFx0XHRpc1BhcmFncmFwaCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0xpbmtcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiTGlua1wiICYmIGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIkxpbmtcIiwgYWx0OiB0b2tlbi52YWx1ZSwgdXJsOiB0b2tlbi5ib2R5LCByb3c6IFwiW1wiICsgdG9rZW4udmFsdWUgKyBcIl0oXCIgKyB0b2tlbi5ib2R5ICsgXCIpXCIgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goZWwpXG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID1cblx0XHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIFwiW1wiICsgdG9rZW4udmFsdWUgKyBcIl0oXCIgKyB0b2tlbi5ib2R5ICsgXCIpXCJcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJMaW5rXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIkxpbmtcIiwgYWx0OiB0b2tlbi52YWx1ZSwgdXJsOiB0b2tlbi5ib2R5LCByb3c6IFwiW1wiICsgdG9rZW4udmFsdWUgKyBcIl0oXCIgKyB0b2tlbi5ib2R5ICsgXCIpXCIgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cdFx0XHQvL0ltYWdlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkltYWdlXCIgJiYgaXNQYXJhZ3JhcGggPT0gdHJ1ZSkge1xuXHRcdFx0XHRsZXQgZWw6IGVsZW1lbnQgPSB7IHR5cGU6IFwiSW1hZ2VcIiwgYWx0OiB0b2tlbi52YWx1ZSwgdXJsOiB0b2tlbi5ib2R5LCByb3c6IFwiW1wiICsgdG9rZW4udmFsdWUgKyBcIl0oXCIgKyB0b2tlbi5ib2R5ICsgXCIpXCIgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblt0aGlzLmFzdC5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9XG5cdFx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW5bKHRoaXMuYXN0LmNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyBcIltcIiArIHRva2VuLnZhbHVlICsgXCJdKFwiICsgdG9rZW4uYm9keSArIFwiKVwiXG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkltYWdlXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIkltYWdlXCIsIGFsdDogdG9rZW4udmFsdWUsIHVybDogdG9rZW4uYm9keSwgcm93OiBcIltcIiArIHRva2VuLnZhbHVlICsgXCJdKFwiICsgdG9rZW4uYm9keSArIFwiKVwiIH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbClcblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRleHRcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiVGV4dFwiICYmIGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlRleHRcIiwgdmFsdWU6IHRva2VuLnZhbHVlLCByb3c6IHRva2VuLnZhbHVlIH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW5bKHRoaXMuYXN0LmNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9XG5cdFx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW5bKHRoaXMuYXN0LmNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlRleHRcIiAmJiBpc1BhcmFncmFwaCA9PSBmYWxzZSkge1xuXHRcdFx0XHRsZXQgZWw6IGVsZW1lbnQgPSB7IHR5cGU6IFwiVGV4dFwiLCB2YWx1ZTogdG9rZW4udmFsdWUsIHJvdzogdG9rZW4udmFsdWUgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVbm1hcmthYmxlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlVubWFya2FibGVcIiAmJiBpc1BhcmFncmFwaCA9PSB0cnVlKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHsgdHlwZTogXCJVbm1hcmthYmxlXCIsIHZhbHVlOiB0b2tlbi52YWx1ZSwgcm93OiB0b2tlbi52YWx1ZSB9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChlbClcblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW5bKHRoaXMuYXN0LmNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPVxuXHRcdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJVbm1hcmthYmxlXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlVubWFya2FibGVcIiwgdmFsdWU6IHRva2VuLnZhbHVlLCByb3c6IHRva2VuLnZhbHVlIH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbClcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3Ryb25nXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlN0cm9uZ1wiICYmIGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlN0cm9uZ1wiLCB2YWx1ZTogdG9rZW4udmFsdWUsIHJvdzogdG9rZW4udmFsdWUgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goZWwpXG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID1cblx0XHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlXG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiU3Ryb25nXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlN0cm9uZ1wiLCB2YWx1ZTogdG9rZW4udmFsdWUsIHJvdzogdG9rZW4udmFsdWUgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmxpbmVDb2RlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIklubGluZUNvZGVcIiAmJiBpc1BhcmFncmFwaCA9PSB0cnVlKSB7XG5cdFx0XHRcdGxldCBlbDogZWxlbWVudCA9IHsgdHlwZTogXCJJbmxpbmVDb2RlXCIsIHZhbHVlOiB0b2tlbi52YWx1ZSwgcm93OiB0b2tlbi52YWx1ZSB9XG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChlbClcblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW5bKHRoaXMuYXN0LmNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPVxuXHRcdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJJbmxpbmVDb2RlXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIklubGluZUNvZGVcIiwgdmFsdWU6IHRva2VuLnZhbHVlLCByb3c6IHRva2VuLnZhbHVlIH1cblx0XHRcdFx0dGhpcy5hc3QuY2hpbGRyZW4ucHVzaChlbClcblx0XHRcdH1cblxuXHRcdFx0Ly8gVW5kZXJEYXNoXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlVuZGVyRGFzaFwiICYmIGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlVuZGVyRGFzaFwiLCB2YWx1ZTogdG9rZW4udmFsdWUsIHJvdzogdG9rZW4udmFsdWUgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goZWwpXG5cdFx0XHRcdHRoaXMuYXN0LmNoaWxkcmVuWyh0aGlzLmFzdC5jaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID1cblx0XHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlblsodGhpcy5hc3QuY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlXG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiVW5kZXJEYXNoXCIgJiYgaXNQYXJhZ3JhcGggPT0gZmFsc2UpIHtcblx0XHRcdFx0bGV0IGVsOiBlbGVtZW50ID0geyB0eXBlOiBcIlVuZGVyRGFzaFwiLCB2YWx1ZTogdG9rZW4udmFsdWUsIHJvdzogdG9rZW4udmFsdWUgfVxuXHRcdFx0XHR0aGlzLmFzdC5jaGlsZHJlbi5wdXNoKGVsKVxuXHRcdFx0fVxuXG5cblx0XHRcdHRva2VuX251bWJlcisrO1xuXG5cdFx0fVxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgR3JhbW1hciB9IGZyb20gXCIuL0dyYW1tYXJcIlxuaW1wb3J0IHsgVG9rZW5zVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi9JVG9rZW5cIjtcbmltcG9ydCB7IENhcHRpb24gfSBmcm9tIFwiLi9DYXB0aW9uXCJcblxuXG5leHBvcnQgY2xhc3MgVG9rZW5pemVyIHtcblxuXHRwdWJsaWMgdG9rZW5zOiBJVG9rZW5bXTtcblx0cHVibGljIHRleHQ6IHN0cmluZztcblx0cHVibGljIHdvcmRzOiBBcnJheTxzdHJpbmc+O1xuXG5cdHByaXZhdGUgd29yZF9udW1iZXI6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0IDogc3RyaW5nKSB7XG5cblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdHRoaXMudG9rZW5zID0gW107XG5cdFx0dGhpcy53b3JkX251bWJlciA9IDA7XG5cdFx0dGhpcy53b3JkcyA9IFtdO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblxuXHRwcml2YXRlIGluaXQgPSAoKTogdm9pZCA9PiB7XG5cblx0XHQvL2FkZCBjYXB0aW9uXG5cdFx0aWYodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNBUFRJT04pIT1udWxsKXtcblx0XHRcdGNvbnN0IGNhcHRpb24gPSBuZXcgQ2FwdGlvbih0aGlzLnRleHQpO1xuXHRcdFx0Y29uc3QgdG9rZW46IElUb2tlbiA9IGNhcHRpb24uZ2V0KCk7XG5cdFx0XHR0aGlzLnRleHQgPSBjYXB0aW9uLnRleHQ7XHQvL3JlbW92ZSBjYXB0aW9uIGZyb20gYXJ0aWNsZVxuXHRcdFx0dGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0fVxuXHRcdFxuXG5cdFx0Ly9zcGxpdCBieSBzcGFjZVxuXHRcdHRoaXMud29yZHMgPSB0aGlzLnRleHQuc3BsaXQoR3JhbW1hci5CTE9DS1MuU1BBQ0UpO1xuXG5cdFx0bGV0IG91dCA9IFwiXCI7XG5cblx0XHQvKipcblx0XHQgKiBMT09QUyBmb3IgbXVsdGlwbGUgbGluZSBibG9ja3M6XG5cdFx0ICogIC0gQ09ERUJMT0NLXG5cdFx0ICogIC0gQ09ERVxuXHRcdCAqICAtIFFVT1RFXG5cdFx0ICovXG5cblx0XHR0aGlzLndvcmRfbnVtYmVyID0gMDtcblxuXHRcdGxvb3Bfd29yZDogd2hpbGUgKHRoaXMud29yZF9udW1iZXIgPCB0aGlzLndvcmRzLmxlbmd0aCkge1xuXG5cdFx0XHRvdXQgPSBvdXQgKyBcIiBcIiArICh0aGlzLndvcmRzW3RoaXMud29yZF9udW1iZXJdKTtcblxuXHRcdFx0Ly9pbiB0aGUgZW5kIG9mIGFydGljbGVcblx0XHRcdGlmICh0aGlzLndvcmRfbnVtYmVyID09IHRoaXMud29yZHMubGVuZ3RoIC0gMSkge1xuXG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVU5LTk9XTl9URVhULFxuXHRcdFx0XHRcdHZhbHVlOiBvdXRcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy53b3JkX251bWJlcisrO1xuXHRcdFx0XHRjb250aW51ZSBsb29wX3dvcmQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vQ09ERV9CTE9DS1xuXG5cdFx0XHRpZiAob3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0spICE9IG51bGwpIHtcblxuXHRcdFx0XHRjb25zdCByZXN0OiBzdHJpbmcgPSBvdXQucmVwbGFjZShHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLLCBcIiZjb2RlYmxvY2smXCIpO1xuXHRcdFx0XHRjb25zdCBhcnIgPSByZXN0LnNwbGl0KFwiJmNvZGVibG9jayZcIilcblxuXG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVU5LTk9XTl9URVhULFxuXHRcdFx0XHRcdHZhbHVlOiBhcnJbMF0sXG5cblx0XHRcdFx0fSlcblxuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLkNPREVfQkxPQ0ssXG5cdFx0XHRcdFx0dmFsdWU6IG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLKVsyXSxcblx0XHRcdFx0XHRsYW5ndWFnZTogb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0spWzFdLFxuXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0b3V0ID0gYXJyWzFdO1xuXHRcdFx0XHR0aGlzLndvcmRfbnVtYmVyKys7XG5cdFx0XHRcdGNvbnRpbnVlIGxvb3Bfd29yZDtcblx0XHRcdH1cblxuXG5cdFx0XHQvL0NPREVcblx0XHRcdGlmIChvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERSkgIT0gbnVsbCAmJlxuXHRcdFx0XHRvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERSlbMl0ubGVuZ3RoID4gNSAvL2JlY2F1c2UgdmFsdWUgaXMgbm90IGxlc3MgdGhlbiA1IHN5bWJvbHMuLi5pdHMgQ09ERUJMT0NLXG5cdFx0XHQpIHtcblxuXHRcdFx0XHRjb25zdCByZXN0OiBzdHJpbmcgPSBvdXQucmVwbGFjZShHcmFtbWFyLkJMT0NLUy5DT0RFLCBcIiZjb2RlJlwiKTtcblx0XHRcdFx0Y29uc3QgYXJyID0gcmVzdC5zcGxpdChcIiZjb2RlJlwiKVxuXG5cblx0XHRcdFx0dGhpcy50b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5VTktOT1dOX1RFWFQsXG5cdFx0XHRcdFx0dmFsdWU6IGFyclswXSxcblxuXHRcdFx0XHR9KVxuXG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuQ09ERSxcblx0XHRcdFx0XHR2YWx1ZTogb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREUpWzJdLFxuXHRcdFx0XHRcdGxhbmd1YWdlOiBvdXQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERSlbMV0sXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0b3V0ID0gYXJyWzFdO1xuXHRcdFx0XHR0aGlzLndvcmRfbnVtYmVyKys7XG5cdFx0XHRcdGNvbnRpbnVlIGxvb3Bfd29yZDtcblx0XHRcdH1cblxuXHRcdFx0Ly9RVU9URVxuXHRcdFx0aWYgKG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URSkgIT0gbnVsbCkge1xuXG5cdFx0XHRcdGNvbnN0IHJlc3Q6IHN0cmluZyA9IG91dC5yZXBsYWNlKEdyYW1tYXIuQkxPQ0tTLlFVT1RFLCBcIiZxdW90ZSZcIik7XG5cdFx0XHRcdGNvbnN0IGFyciA9IHJlc3Quc3BsaXQoXCImcXVvdGUmXCIpXG5cblxuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlVOS05PV05fVEVYVCxcblx0XHRcdFx0XHR2YWx1ZTogYXJyWzBdLFxuXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0dGhpcy50b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5RVU9URSxcblx0XHRcdFx0XHR2YWx1ZTogb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlFVT1RFKVswXSxcblx0XHRcdFx0XHRxdW90ZTogb3V0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlFVT1RFKVsxXSxcblx0XHRcdFx0XHRhdXRob3I6IG91dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URSlbMl0sXG5cblx0XHRcdFx0fSlcblxuXHRcdFx0XHRvdXQgPSBhcnJbMV07XG5cdFx0XHRcdHRoaXMud29yZF9udW1iZXIrKztcblx0XHRcdFx0Y29udGludWUgbG9vcF93b3JkO1xuXG5cdFx0XHR9XG5cblxuXHRcdFx0dGhpcy53b3JkX251bWJlcisrO1xuXG5cdFx0fVxuXG5cblx0XHQvLyBMT09QUyBVTktOT1dOX1RFWFQgVE8gREVGSU5FIE9USEVSIFRPS0VOUzpcblxuXHRcdGxldCBpdG9rZW5zOiBBcnJheTxJVG9rZW4+ID0gW107XG5cblx0XHR0aGlzLnRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5zVHlwZS5VTktOT1dOX1RFWFQpIHtcblxuXHRcdFx0XHRjb25zdCB0ZXh0ID0gdG9rZW4udmFsdWUuc3BsaXQoXCJcXG5cIilcblxuXG5cdFx0XHRcdHRleHQuZm9yRWFjaChzdHJva2UgPT4ge1xuXG5cblx0XHRcdFx0XHRpZiAoc3Ryb2tlICE9ICcnICYmIHN0cm9rZSAhPSAnICcpIHtcblxuXG5cblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogU2VhcmNoIG90aGVyIHRva2Vuczpcblx0XHRcdFx0XHRcdCAqIFxuXHRcdFx0XHRcdFx0ICogLSBJbWFnZVxuXHRcdFx0XHRcdFx0ICogLSBMaW5rXG5cdFx0XHRcdFx0XHQgKiAtIElubGluZUNvZGVcblx0XHRcdFx0XHRcdCAqICAtIFN0cm9uZ1xuXHRcdFx0XHRcdFx0ICogLSBVbm1hcmthYmxlXG5cdFx0XHRcdFx0XHQgKiAtIEhlYWRpbmdcblx0XHRcdFx0XHRcdCAqIC0gVW5kZXJkYXNoXG5cdFx0XHRcdFx0XHQgKi9cblxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlBBUkFHUkFQSF9TVEFSVCxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJcIlxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKVsxXVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuSU1BR0UsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTUFHRSlbMl0sXG5cdFx0XHRcdFx0XHRcdFx0Ym9keTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKVszXVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKVs0XVxuXHRcdFx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfRU5ELFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTkspICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuUEFSQUdSQVBIX1NUQVJULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSylbMV1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLkxJTkssXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSU5LKVsyXSxcblx0XHRcdFx0XHRcdFx0XHRib2R5OiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSylbM11cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSU5LKVs0XVxuXHRcdFx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfRU5ELFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOREVSX0RBU0gpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuUEFSQUdSQVBIX1NUQVJULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5ERVJfREFTSClbMV1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlVOREVSX0RBU0gsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9EQVNIKVsyXVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOREVSX0RBU0gpWzNdXG5cdFx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlBBUkFHUkFQSF9FTkQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTkxJTkVfQ09ERSkgIT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfU1RBUlQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTkxJTkVfQ09ERSlbMV1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLklOTElORV9DT0RFLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREUpWzJdXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREUpWzNdXG5cdFx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlBBUkFHUkFQSF9FTkQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSk7XG5cblxuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlNUUk9ORykgIT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfU1RBUlQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpWzFdXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5TVFJPTkcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpWzJdXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HKVszXVxuXHRcdFx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfRU5ELFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBVbm1hcmthYmxlIHRleHRcblx0XHRcdFx0XHRcdGlmIChzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSkgIT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfU1RBUlQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0aXRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTk1BUktBQkxFKVsxXVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuVU5NQVJLQUJMRSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOTUFSS0FCTEUpWzJdXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSlbM11cblx0XHRcdFx0XHRcdFx0fSlcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuUEFSQUdSQVBIX0VORCxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJcIlxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBMSVNUXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRpZiAoc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJU1QpICE9IG51bGwpIHtcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuUEFSQUdSQVBIX1NUQVJULFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSVNUKSlcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuTElTVCxcblx0XHRcdFx0XHRcdFx0XHRuYW1lOiBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuTElTVClbMV0sXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSVNUKVsyXVxuXHRcdFx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5zVHlwZS5QQVJBR1JBUEhfRU5ELFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0fVxuXG5cblxuXHRcdFx0XHRcdFx0aWYgKHN0cm9rZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5IRUFESU5HKSAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgdHlwZXMgPSBbXG5cdFx0XHRcdFx0XHRcdFx0VG9rZW5zVHlwZS5IRUFESU5HX0ZJUlNULFxuXHRcdFx0XHRcdFx0XHRcdFRva2Vuc1R5cGUuSEVBRElOR19TRUNPTkQsXG5cdFx0XHRcdFx0XHRcdFx0VG9rZW5zVHlwZS5IRUFESU5HX1RISVJELFxuXHRcdFx0XHRcdFx0XHRcdFRva2Vuc1R5cGUuSEVBRElOR19GT1JUSCxcblx0XHRcdFx0XHRcdFx0XHRUb2tlbnNUeXBlLkhFQURJTkdfRklGVEhcblx0XHRcdFx0XHRcdFx0XVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGl0eXBlOiBudW1iZXIgPSBzdHJva2UubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElORylbMV0ubGVuZ3RoIC0gMTtcblxuXHRcdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IHR5cGVzW2l0eXBlXSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3Ryb2tlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkhFQURJTkcpWzJdXG5cdFx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBmb3Igb3RoZXIgdW5rbm93biB0ZXh0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlBBUkFHUkFQSF9TVEFSVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRpdG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlbnNUeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBzdHJva2Vcblx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdGl0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2Vuc1R5cGUuUEFSQUdSQVBIX0VORCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdFx0XHRcdH0pXG5cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLnRva2VucyA9IGl0b2tlbnM7XG5cdFx0XG5cdH1cbn0iLCJleHBvcnQgZW51bSBUb2tlbnNUeXBlIHtcblxuXHRDQVBUSU9OID0gXCJDYXB0aW9uXCIsXG5cdENPREUgPSBcIkNvZGVcIixcblx0Q09ERV9CTE9DSyA9IFwiQ29kZUJsb2NrXCIsXG5cdERPQ1VNRU5UID0gXCJEb2N1bWVudFwiLFxuXHRJTUFHRSA9IFwiSW1hZ2VcIixcblx0SEVBRElOR19GSVJTVCA9IFwiSGVhZGluZ0ZpcnN0XCIsXG5cdEhFQURJTkdfU0VDT05EID0gXCJIZWFkaW5nU2Vjb25kXCIsXG5cdEhFQURJTkdfVEhJUkQgPSBcIkhlYWRpbmdUaGlyZFwiLFxuXHRIRUFESU5HX0ZPUlRIID0gXCJIZWFkaW5nRm9ydGhcIixcblx0SEVBRElOR19GSUZUSCA9IFwiSGVhZGluZ0ZpZnRoXCIsXG5cdEhFQURJTkcgPSBcIkhlYWRpbmdcIixcblx0SU5MSU5FX0NPREUgPSBcIklubGluZUNvZGVcIixcblx0TElOSyA9IFwiTGlua1wiLFxuXHRMSVNUID0gXCJMaXN0XCIsXG5cdFBBUkFHUkFQSF9TVEFSVCA9IFwiUGFyYWdyYXBoU3RhcnRcIixcblx0UEFSQUdSQVBIX0VORCA9IFwiUGFyYWdyYXBoRW5kXCIsXG5cdFFVT1RFID0gXCJRdW90ZVwiLFxuXHRTVFJPTkcgPSBcIlN0cm9uZ1wiLFxuXHRURVhUID0gXCJUZXh0XCIsXG5cdFVOREVSX0RBU0ggPSBcIlVuZGVyRGFzaFwiLFxuXHRVTktOT1dOX1RFWFQgPSBcIlVua25vd25UZXh0XCIsXG5cdFVOTUFSS0FCTEUgPSBcIlVubWFya2FibGVcIlxuXHRcbn0iLCJpbXBvcnQgeyBDYXB0aW9uSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ2FwdGlvbkhUTUxcIlxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSBcIi4vSVRva2VuXCI7XG5pbXBvcnQgeyBIZWFkZXJIVE1MIH0gZnJvbSBcIi4vaHRtbGJsb2Nrcy9IZWFkZXJIVE1MXCI7XG5pbXBvcnQge1BhcmFncmFwaEhUTUx9IGZyb20gXCIuL2h0bWxibG9ja3MvUGFyYWdyYXBoSFRNTFwiXG5pbXBvcnQgeyBDb2RlQmxvY2tIVE1MIH0gZnJvbSBcIi4vaHRtbGJsb2Nrcy9Db2RlQmxvY2tIVE1MXCI7XG5pbXBvcnQge1F1b3RlSFRNTH0gZnJvbSBcIi4vaHRtbGJsb2Nrcy9RdW90ZUhUTUxcIjtcbmltcG9ydCB7TGlzdEhUTUx9IGZyb20gXCIuL2h0bWxibG9ja3MvTGlzdEhUTUxcIjtcblxuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG5cdHByaXZhdGUgYXN0IDogQVNUO1xuXG5cdGNvbnN0cnVjdG9yKGFzdCA6IEFTVCkge1xuXHRcdHRoaXMuYXN0ID0gYXN0XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCkge1xuXG5cdFx0Ly9jb25zb2xlLmxvZyhhc3QpO1xuXG5cdFx0Y29uc3QgY2hpbGRyZW4gID0gdGhpcy5hc3QuY2hpbGRyZW47XG5cblx0XHRjaGlsZHJlbi5mb3JFYWNoKCh0b2tlbjogSVRva2VuKSA9PiB7XG5cblx0XHRcdFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJDYXB0aW9uXCIpIHtcblxuXHRcdFx0XHRjb25zdCBjYXB0aW9uID0gbmV3IENhcHRpb25IVE1MKHRva2VuKTtcblx0XHRcdFx0Y2FwdGlvbi5yZW5kZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJIZWFkZXJcIikge1xuXHRcdFx0XHRjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVySFRNTCh0b2tlbik7XG5cdFx0XHRcdGhlYWRlci5yZW5kZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJDb2RlQmxvY2tcIiB8fCB0b2tlbi50eXBlID09IFwiQ29kZVwiKSB7XG5cdFx0XHRcdGNvbnN0IGNvZGVibG9jayA9IG5ldyBDb2RlQmxvY2tIVE1MKHRva2VuKTtcblx0XHRcdFx0Y29kZWJsb2NrLnJlbmRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlF1b3RlXCIpIHtcblx0XHRcdFx0Y29uc3QgcXVvdGUgPSBuZXcgUXVvdGVIVE1MKHRva2VuKTtcblx0XHRcdFx0cXVvdGUucmVuZGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiTGlzdFwiKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBuZXcgTGlzdEhUTUwodG9rZW4pO1xuXHRcdFx0XHRsaXN0LnJlbmRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIlBhcmFncmFwaFwiKSB7XG5cdFx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IG5ldyBQYXJhZ3JhcGhIVE1MKHRva2VuKTtcblx0XHRcdFx0cGFyYWdyYXBoLnJlbmRlcigpO1xuXHRcdFx0fVxuXG5cdFx0fSlcblx0fVxufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSAnLi4vSVRva2VuJztcbmltcG9ydCB7RG9tVXRpbGl0ZXN9IGZyb20gJy4vRG9tVXRpbGl0ZXMnXG5cbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGJsb2NrIGZvciBoZWFkIG9mIGNoYXB0ZXJcbiAqIEBwYXJhbSBsaW5lIGFzIGJsb2NrIG9mIHRoZSB0ZXh0XG4gKiBAcmV0dXJuIGRvbSBlbGVtZW50IGZvciBpbmZvIGFib3V0IGFydGljbGVcbiAqL1xuXG5leHBvcnQgY2xhc3MgQ2FwdGlvbkhUTUwge1xuXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXM7XG5cdHByaXZhdGUgdG9rZW46IElUb2tlbjtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogSVRva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG5cdHJlbmRlcigpOnZvaWR7XG5cblx0XHRsZXQgdGFnc0Jsb2NrICA9IFwiXCI7XG5cdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS50YWdzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpLm1hcCggKHRhZzogc3RyaW5nKSA9PiB7XHRcdFx0XG5cdFx0XHRpZih0YWcubGVuZ3RoID4wKXtcblx0XHRcdFx0dGFnc0Jsb2NrID0gdGFnc0Jsb2NrICsgXG5cdFx0XHRcdCc8YSBocmVmPVwiIy90YWdzLycgKyB0YWcgKyAnXCIgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLW9yYW5nZS00MDAgIGhvdmVyOmJnLW9yYW5nZS01MDAgdXBwZXJjYXNlIGxhc3Q6bXItMCBtci0xXCI+Jytcblx0XHRcdFx0XHR0YWcgKyBcblx0XHRcdFx0XCI8L2E+XCIgXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgY2F0ZWdvcmllc0Jsb2NrICA9IFwiXCI7XG5cdFx0XHRpZih0aGlzLnRva2VuLmNoaWxkcmVuWzBdLmNhdGVnb3JpZXMubGVuZ3RoID4gMCl7XG5cdFx0XHRjYXRlZ29yaWVzQmxvY2sgID0gXG5cdFx0XHQnPGEgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWdyYXktNDAwICBob3ZlcjpiZy1ncmF5LTUwMCB1cHBlcmNhc2UgbGFzdDptci0wIG1yLTFcIj4nK1xuXHRcdFx0XHR0aGlzLnRva2VuLmNoaWxkcmVuWzBdLmNhdGVnb3JpZXMgK1xuXHRcdFx0XCI8L2E+XCIgXG5cdFx0XHR9XG5cblx0XHRjb25zdCBDYXB0aW9uQmxvY2sgPVxuXHRcdFx0YFx0PGRpdj5cblx0XHRcdFx0ICA8aW1nIHNyYz0gJHt0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnRodW1ibmFpbH0gY2xhc3M9XCJmbG9hdC1sZWZ0IHAtOFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInRleHQtM3hsIGZvbnQtbm9ybWFsIGxlYWRpbmctbm9ybWFsIG10LTAgbWItMiB0ZXh0LWdyYXktNjAwXCI+XG5cdFx0XHRcdFx0XHRcdCR7dGhpcy50b2tlbi5jaGlsZHJlblswXS50aXRsZS5zbGljZSgyLCB0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnRpdGxlLmxlbmd0aC0xKX08L2gzPlxuXHRcdFx0XHRcdFx0PHRpbWUgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWJsdWUtNDAwIHVwcGVyY2FzZSBsYXN0Om1yLTAgbXItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50b2tlbi5jaGlsZHJlblswXS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aW1lPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWctY29udGFpbmVyIHB5LTFcIj5cblx0XHRcdFx0XHRcdFx0JHt0YWdzQmxvY2t9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXRlZ29yaWVzLWNvbnRhaW5lciBweS0xXCI+XG5cdFx0XHRcdFx0XHRcdCR7Y2F0ZWdvcmllc0Jsb2NrfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdDwvZGl2PmA7XG5cblx0XHRjb25zdCBjYXB0aW9uTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudCgncCcpXG5cdFx0Y2FwdGlvbk5vZGUuaW5uZXJIVE1MID0gQ2FwdGlvbkJsb2NrO1xuXG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cdFx0Y29udGFpbmVyPy5hcHBlbmRDaGlsZChjYXB0aW9uTm9kZSk7XG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgaWYgbGluZSBpcyBjb2RlIGJsb2NrXG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBhcyBjb2RlIGJsb2NrXG4gKi9cblxuXG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi4vSVRva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3ByaXNtLmNzc1wiXG5cbi8vIGltcG9ydCBwcmlzbWpzXG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuXG5cbmV4cG9ydCBjbGFzcyBDb2RlQmxvY2tIVE1MIHtcbiAgXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXM7XG5cdHByaXZhdGUgdG9rZW46IElUb2tlbjtcblx0XG5cdGNvbnN0cnVjdG9yKHRva2VuOiBJVG9rZW4pIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cbiAgcmVuZGVyICgpIDogdm9pZCB7XG5cblx0Y29uc3QgY29kZUJsb2NrIDogYW55ID0gYFxuXHRcdFx0PGNvZGUgY2xhc3M9XCJsYW5ndWFnZS0ke3RoaXMudG9rZW4ubGFuZ3VhZ2V9XCI+XG5cdFx0IFx0XHQke3RoaXMudG9rZW4udmFsdWV9XG5cdFx0XHQ8L2NvZGU+YFxuXHRcdFxuXHRcdGNvbnN0IENvZGVCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG5cdFx0Q29kZUJsb2NrTm9kZS5jbGFzc05hbWUgPSBgbGFuZ3VhZ2UtJHt0aGlzLnRva2VuLmxhbmd1YWdlfVwiYCA7XG5cblx0XHRQcmlzbS5oaWdobGlnaHRBbGwoY29kZUJsb2NrKTtcblxuXHRcdENvZGVCbG9ja05vZGUuaW5uZXJIVE1MID0gY29kZUJsb2NrO1xuXG5cdFx0bGV0IGNvbnRhaW5lcjpIVE1MRWxlbWVudDtcblx0XHRcblx0XHRpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8uY2hpbGRyZW4ubGVuZ3RoID4gMCl7XG5cdFx0XHQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/Lmxhc3RDaGlsZDtcblx0XHR9ZWxzZXtcblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0XHR9XG5cdFx0XG5cdFx0Y29udGFpbmVyPy5hcHBlbmRDaGlsZChDb2RlQmxvY2tOb2RlKTtcblxuXHRcdFxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBSZXR1cm5zIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGggZG9tIGVsZW1lbnRzIGluIGRvY3VtZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIERvbVV0aWxpdGVzIHtcblxuICBnZXRMYXN0Tm9kZSAoKSA6IENoaWxkTm9kZSB8IG51bGx7XG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRSb290KClcbiAgICByZXR1cm4gbGFzdENoaWxkLmxhc3RDaGlsZFxuICB9XG5cbiAgZ2V0TGFzdE5vZGVOYW1lICgpIHtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSB0aGlzLmdldFJvb3QoKVxuICAgIHJldHVybiBsYXN0Q2hpbGQubGFzdENoaWxkLm5vZGVOYW1lXG4gIH1cblxuICBnZXRSb290ICgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXBwJylcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQgKGVsZW1lbnQgOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgPGg+XG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBmb3IgaGVhZFR5cGUgPGg/Lz4gZm9yIGV4YW1wbGUgPGg/PiAuLi48aD8+XG4gKi9cblxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSBcIi4uL0lUb2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgSGVhZGVySFRNTCB7XG4gIFxuXHRwcml2YXRlIERvbVV0aWxpdGVzO1xuXHRwcml2YXRlIHRva2VuOiBJVG9rZW47XG5cblx0Y29uc3RydWN0b3IodG9rZW46IElUb2tlbikge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKTp2b2lke1xuXG5cdFx0Y29uc3QgSGVhZGVyTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudCgnaCcrIHRoaXMudG9rZW4uZGVwdGgpXG5cblx0XHRIZWFkZXJOb2RlLmNsYXNzTmFtZSA9IGB0ZXh0LSR7dGhpcy50b2tlbi5kZXB0aH14bCBtdC0wIG1iLTIgdGV4dC1ncmF5LTgwMCBwci0xMCBwdC0xMGA7XG5cdFx0XG5cdFx0SGVhZGVyTm9kZS5pbm5lckhUTUwgPSB0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnZhbHVlO1xuXG5cdFx0bGV0IGNvbnRhaW5lciA6IEhUTUxFbGVtZW50OyBcblx0XHRcblx0XHRpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8uY2hpbGRyZW4ubGVuZ3RoID4gMCl7XG5cdFx0XHRcblx0XHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/Lmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0fWVsc2V7XG5cdFx0XHQgLy9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblx0XHRcdCBcblx0XHR9XG5cblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKEhlYWRlck5vZGUpO1xuXHRcdFxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgaWYgbGluZSBpcyBjb2RlIGJsb2NrXG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBhcyBsaXN0XG4gKi9cblxuXG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi4vSVRva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0SFRNTCB7XG4gIFxuXHRwcml2YXRlIERvbVV0aWxpdGVzO1xuXHRwcml2YXRlIHRva2VuOiBJVG9rZW47XG5cdFxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogSVRva2VuKSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG4gIHJlbmRlciAoKSA6IHZvaWQge1xuXG5cdGxldCBsaXN0QmxvY2sgOiBzdHJpbmcgO1xuXHRsZXQgbGlzdEJsb2NrTm9kZSA6IEVsZW1lbnQ7XG5cdGxpc3RCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuXHQvL2NvbnNvbGUubG9nKHRoaXMudG9rZW4pXG5cblx0aWYodGhpcy50b2tlbi5uYW1lID09IFwiW11cIil7XG5cdFx0bGlzdEJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcdFxuXHRcdGxpc3RCbG9jayA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+XG5cdFx0XHRcdDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgYXBwZWFyYW5jZS1ub25lIGgtNCB3LTQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLXNtIGRpc2FibGVkOmJnLWdyYXktMjAwIGRpc2FibGVkOmJvcmRlci1ncmF5LTYwMCBtdC0xIGFsaWduLXRvcCBiZy1uby1yZXBlYXQgYmctY2VudGVyIGJnLWNvbnRhaW4gZmxvYXQtbGVmdCBtci0yXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0Rpc2FibGVkXCIgZGlzYWJsZWQ+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbCBpbmxpbmUtYmxvY2sgdGV4dC1ncmF5LTgwMCBvcGFjaXR5LTEwMFwiIGZvcj1cImZsZXhDaGVja0Rpc2FibGVkXCI+XG5cdFx0XHQgIFx0XHQke3RoaXMudG9rZW4udmFsdWV9XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0ICBcdFx0PC9kaXY+XG5cdFx0YFxuXHR9XG5cblx0aWYodGhpcy50b2tlbi5uYW1lID09IFwiW3hdXCIpe1xuXHRcdGxpc3RCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHRcblx0XHRsaXN0QmxvY2sgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1jaGVja1wiPlxuXHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0IGFwcGVhcmFuY2Utbm9uZSBoLTQgdy00IGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1zbSBiZy13aGl0ZSBjaGVja2VkOmJnLWJsdWUtNjAwIGNoZWNrZWQ6Ym9yZGVyLWJsdWUtNjAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGR1cmF0aW9uLTIwMCBtdC0xIGFsaWduLXRvcCBiZy1uby1yZXBlYXQgYmctY2VudGVyIGJnLWNvbnRhaW4gZmxvYXQtbGVmdCBtci0yXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiIGNoZWNrZWQgZGlzYWJsZWQ+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbCBpbmxpbmUtYmxvY2sgdGV4dC1ncmF5LTgwMCBvcGFjaXR5LTEwMFwiIGZvcj1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiPlxuXHRcdFx0ICBcdFx0XHQke3RoaXMudG9rZW4udmFsdWV9XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0ICBcdFx0PC9kaXY+XG5cdFx0YFxuXHRcdH1cblxuXHRcdGlmKHRoaXMudG9rZW4ubmFtZSA9PSBcIi1cIil7XG5cdFx0XHRsaXN0QmxvY2sgPSBgXG5cdFx0XHRcdDxsaSBjbGFzcz1cInRleHQtc2t5LTcwMFwiPlxuXHRcdFx0XHRcdCR7dGhpcy50b2tlbi52YWx1ZX1cblx0XHRcdFx0PC9saT5cblx0XHRcdGBcblx0XHRcdGxpc3RCbG9ja05vZGUuY2xhc3NOYW1lID0gYGxpc3QtZGlzYyBtbC01YDtcblx0XHR9XG5cblx0XHRcblx0XHRsaXN0QmxvY2tOb2RlLmlubmVySFRNTCA9IGxpc3RCbG9jaztcblxuXHRcdGxldCBjb250YWluZXI6SFRNTEVsZW1lbnQ7XG5cdFx0aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/LmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5sYXN0Q2hpbGQ7XG5cdFx0fWVsc2V7XG5cdFx0XHQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cdFx0fVxuXHRcdGNvbnRhaW5lcj8uYXBwZW5kQ2hpbGQobGlzdEJsb2NrTm9kZSk7XG5cbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGh0bWwgZWxlbWVudCA8aD5cbiAqIEBwYXJhbSBsaW5lIGFzIGJsb2NrIG9mIHRoZSB0ZXh0XG4gKiBAcmV0dXJuIGRvbSBlbGVtZW50IGZvciBoZWFkVHlwZSA8aD8vPiBmb3IgZXhhbXBsZSA8aD8+IC4uLjxoPz5cbiAqL1xuXG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi4vSVRva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXJhZ3JhcGhIVE1MIHtcblxuXHRwcml2YXRlIERvbVV0aWxpdGVzO1xuXHRwcml2YXRlIHRva2VuOiBJVG9rZW47XG5cblx0Y29uc3RydWN0b3IodG9rZW46IElUb2tlbikge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKTogdm9pZCB7XG5cblx0XHRjb25zdCBQYXJhZ3JhcGhOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwicFwiKVxuXHRcdFBhcmFncmFwaE5vZGUuY2xhc3NOYW1lID0gXCJibG9jayBsZWFkaW5nLTcgZm9udC1tb25vXCI7XG5cblx0XHRsZXQgdGV4dCA9IFwiXCI7XG5cdFx0dGhpcy50b2tlbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogeyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IGFsdDogc3RyaW5nLCB1cmw6IHN0cmluZyB9KSA9PiB7XG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBcIlRleHRcIikge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgY2hpbGQudmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJJbWFnZVwiKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidy02LzEyIHNtOnctNC8xMiBweC00IHBiLTIwXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7Y2hpbGQudXJsfVwiIGFsdD1cIiR7Y2hpbGQuYWx0fVwiIGNsYXNzPVwic2hhZG93IHJvdW5kZWQgbWF4LXctZnVsbCBoLWF1dG8gYWxsaWduLW1pZGRsZSBib3JkZXItbm9uZVwiPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBcIkxpbmtcIikge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIGA8YSBocmVmPVwiJHtjaGlsZC51cmx9XCIgY2xhc3M9XCJ0ZXh0LWJsdWUtNTAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC5hbHR9XG5cdFx0XHRcdFx0PGEvPmBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJTdHJvbmdcIikge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8c3Ryb25nPiR7Y2hpbGQudmFsdWV9PC9zdHJvbmc+XG5cdFx0XHRcdGBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJJbmxpbmVDb2RlXCIpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGBcblx0XHRcdFx0PGNvZGU+JHtjaGlsZC52YWx1ZX08L2NvZGU+XG5cdFx0XHRcdGBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJVbmRlckRhc2hcIikge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXNreS01MDAgdGV4dC1zbGF0ZS01MDBcIj4ke2NoaWxkLnZhbHVlfTwvc3Bhbj5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBcIlVubWFya2FibGVcIikge1xuXHRcdFx0XHQvL0pTT04uc3RyaW5naWZ5KFN0cmluZyhzdHIpKSBmb3IgdW5tYXJrYWJsZSB0ZXh0IHVzYWdlXG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBgXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidGV4dC1vcmFuZ2UtOTAwXCI+JHtKU09OLnN0cmluZ2lmeShTdHJpbmcoY2hpbGQudmFsdWUpKX08L3NwYW4+XG5cdFx0XHRcdGBcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0UGFyYWdyYXBoTm9kZS5pbm5lckhUTUwgPSB0ZXh0O1xuXG5cdFx0bGV0IGNvbnRhaW5lcjpIVE1MRWxlbWVudDtcblx0XHRpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8uY2hpbGRyZW4ubGVuZ3RoICE9IDApe1xuXG5cdFx0XHQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik/Lmxhc3RDaGlsZDtcblxuXHRcdH1lbHNle1xuXHRcdFx0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuXHRcdH1cblx0XHRcblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKFBhcmFncmFwaE5vZGUpO1xuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgaWYgbGluZSBpcyBjb2RlIGJsb2NrXG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBhcyBjb2RlIGJsb2NrXG4gKi9cblxuXG5pbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi4vSVRva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3F1b3RlLmNzc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUhUTUwge1xuICBcblx0cHJpdmF0ZSBEb21VdGlsaXRlcztcblx0cHJpdmF0ZSB0b2tlbjogSVRva2VuO1xuXHRcblx0Y29uc3RydWN0b3IodG9rZW46IElUb2tlbikge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuICByZW5kZXIgKCkgOiB2b2lkIHtcblxuXG5cdGNvbnN0IHF1b3RlQmxvY2sgPSBgXHRcdFxuXHRcdDxkaXY+XG5cdFx0XHQ8cCBjbGFzc25hbWU9XCJtYi0yXCI+IFxuXHRcdFx0XHQke3RoaXMudG9rZW4ucXVvdGV9XG5cdFx0XHQ8L3A+XG5cdFx0XHQ8Y2l0ZT4gJHt0aGlzLnRva2VuLmF1dGhvcn0gPC9jaXRlPlxuXHRcdDwvZGl2PlxuXHRgXG5cdFx0XG5cdFx0Y29uc3QgcXVvdGVCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJibG9ja3F1b3RlXCIpO1xuXHRcdC8vcXVvdGVCbG9ja05vZGUuY2xhc3NOYW1lID0gYHAtNCBpdGFsaWMgYm9yZGVyLWwtOCBiZy1uZXV0cmFsLTIwMCB0ZXh0LW5ldXRyYWwtNjAwIGJvcmRlci1vcmFuZ2UtNTAwIHF1b3RlYDtcblx0XHRxdW90ZUJsb2NrTm9kZS5pbm5lckhUTUwgPSBxdW90ZUJsb2NrO1xuXG5cblx0XHRsZXQgY29udGFpbmVyOkhUTUxFbGVtZW50O1xuXHRcdGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpPy5jaGlsZHJlbi5sZW5ndGggPiAwKXtcblx0XHRcdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKT8ubGFzdENoaWxkO1xuXHRcdH1lbHNle1xuXHRcdFx0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuXHRcdH1cblx0XHRjb250YWluZXI/LmFwcGVuZENoaWxkKHF1b3RlQmxvY2tOb2RlKTtcblxuICB9XG5cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jb3JlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZikge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvKD86XnxcXHMpbGFuZyg/OnVhZ2UpPy0oW1xcdy1dKykoPz1cXHN8JCkvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdFx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdFx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHRcdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHQvKipcblx0XHQgKiBCeSBkZWZhdWx0LCBpZiBQcmlzbSBpcyBpbiBhIHdlYiB3b3JrZXIsIGl0IGFzc3VtZXMgdGhhdCBpdCBpcyBpbiBhIHdvcmtlciBpdCBjcmVhdGVkIGl0c2VsZiwgc28gaXQgdXNlc1xuXHRcdCAqIGBhZGRFdmVudExpc3RlbmVyYCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgaW5zdGFuY2UuIEhvd2V2ZXIsIGlmIHlvdSdyZSB1c2luZyBQcmlzbSBtYW51YWxseSBpbiB5b3VyXG5cdFx0ICogb3duIHdvcmtlciwgeW91IGRvbid0IHdhbnQgaXQgdG8gZG8gdGhpcy5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGFkZCBpdHMgb3duIGxpc3RlbmVycyB0byB0aGUgd29ya2VyLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSBQcmlzbSBleGVjdXRlcy4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0XHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdFx0ICogUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyID0gdHJ1ZTtcblx0XHQgKiAvLyBMb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHRcdC8qKlxuXHRcdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdFx0ICpcblx0XHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0XHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqL1xuXHRcdHV0aWw6IHtcblx0XHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdFx0ICovXG5cdFx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdFx0ICovXG5cdFx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgY2xvbmU7IHZhciBpZDtcblx0XHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIG0gPSBsYW5nLmV4ZWMoZWxlbWVudC5jbGFzc05hbWUpO1xuXHRcdFx0XHRcdGlmIChtKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAnbm9uZSc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHMgdGhlIFByaXNtIGBsYW5ndWFnZS14eHh4YCBjbGFzcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuXHRcdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0XHQgKi9cblx0XHRcdHNldExhbmd1YWdlOiBmdW5jdGlvbiAoZWxlbWVudCwgbGFuZ3VhZ2UpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIGFsbCBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Nlc1xuXHRcdFx0XHQvLyAodGhpcyBtaWdodCBsZWF2ZSBiZWhpbmQgYSBsZWFkaW5nIHNwYWNlKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKGxhbmcsICdnaScpLCAnJyk7XG5cblx0XHRcdFx0Ly8gYWRkIHRoZSBuZXcgYGxhbmd1YWdlLXh4eHhgIGNsYXNzXG5cdFx0XHRcdC8vICh1c2luZyBgY2xhc3NMaXN0YCB3aWxsIGF1dG9tYXRpY2FsbHkgY2xlYW4gdXAgc3BhY2VzIGZvciB1cylcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsYW5ndWFnZS0nICsgbGFuZ3VhZ2UpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdFx0ICovXG5cdFx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOlteOl0rOlteOl0rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHRcdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHRcdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24gKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0XHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdFx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbiAoY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0XHR9O1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0XHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdFx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdFx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0XHQgKiA2LiBgY29tcGxldGVgXG5cdFx0ICpcblx0XHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHRcdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0XHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdFx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdFx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHRcdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdFx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKGVsZW1lbnQsIGxhbmd1YWdlKTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKHBhcmVudCwgbGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdFx0Y29kZTogY29kZVxuXHRcdFx0fTtcblxuXHRcdFx0ZnVuY3Rpb24gaW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGhpZ2hsaWdodGVkQ29kZSkge1xuXHRcdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBlbnYpO1xuXG5cdFx0XHQvLyBwbHVnaW5zIG1heSBjaGFuZ2UvYWRkIHRoZSBwYXJlbnQvZWxlbWVudFxuXHRcdFx0cGFyZW50ID0gZW52LmVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnICYmICFwYXJlbnQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKSB7XG5cdFx0XHRcdHBhcmVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8udXRpbC5lbmNvZGUoZW52LmNvZGUpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG5cdFx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGV2dC5kYXRhKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdFx0Y29kZTogZW52LmNvZGUsXG5cdFx0XHRcdFx0aW1tZWRpYXRlQ2xvc2U6IHRydWVcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIExvdy1sZXZlbCBmdW5jdGlvbiwgb25seSB1c2UgaWYgeW91IGtub3cgd2hhdCB5b3XigJlyZSBkb2luZy4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdFx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGEgc3RyaW5nIHdpdGggdGhlIEhUTUwgcHJvZHVjZWQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtdG9rZW5pemVgXG5cdFx0ICogMi4gYGFmdGVyLXRva2VuaXplYFxuXHRcdCAqIDMuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gcGFzc2VkIHRvIGBncmFtbWFyYC5cblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgaGlnaGxpZ2h0ZWQgSFRNTC5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBQcmlzbS5oaWdobGlnaHQoJ3ZhciBmb28gPSB0cnVlOycsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LCAnamF2YXNjcmlwdCcpO1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRjb2RlOiB0ZXh0LFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHRcdH07XG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXRva2VuaXplJywgZW52KTtcblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgbGFuZ3VhZ2UgXCInICsgZW52Lmxhbmd1YWdlICsgJ1wiIGhhcyBubyBncmFtbWFyLicpO1xuXHRcdFx0fVxuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblx0X3NlbGYuUHJpc20gPSBfO1xuXG5cblx0Ly8gVHlwZXNjcmlwdCBub3RlOlxuXHQvLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcblx0Ly9cblx0Ly8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG5cdCAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG5cdCAqIEBjbGFzc1xuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdFx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdFx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG5cdCAqXG5cdCAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuXHQgKiB0aGVtLlxuXHQgKlxuXHQgKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuXHQgKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuXHQgKlxuXHQgKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG5cdCAqXG5cdCAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFRva2VuXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRcdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdHR5cGU6IG8udHlwZSxcblx0XHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHRcdHRhZzogJ3NwYW4nLFxuXHRcdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cblx0XHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdFx0aWYgKGFsaWFzZXMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0XHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuXHQgKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3Rcblx0ICogQHBhcmFtIHthbnl9IGdyYW1tYXJcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3Ncblx0ICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2Vcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal07XG5cdFx0XHRcdHZhciBpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZTtcblx0XHRcdFx0dmFyIGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZDtcblx0XHRcdFx0dmFyIGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHk7XG5cdFx0XHRcdHZhciBhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCA+PSB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgbWF0Y2hTdHIgPSBtYXRjaFswXTtcblx0XHRcdFx0XHR2YXIgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pO1xuXHRcdFx0XHRcdHZhciBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblxuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtSZW1hdGNoT3B0aW9uc30gKi9cblx0XHRcdFx0XHRcdHZhciBuZXN0ZWRSZW1hdGNoID0ge1xuXHRcdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIG5lc3RlZFJlbWF0Y2gpO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcmVhY2ggbWlnaHQgaGF2ZSBiZWVuIGV4dGVuZGVkIGJlY2F1c2Ugb2YgdGhlIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIG5lc3RlZFJlbWF0Y2gucmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSBuZXN0ZWRSZW1hdGNoLnJlYWNoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuXHQgKiBAcHJvcGVydHkge1R9IHZhbHVlXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRcdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLnRhaWwgPSB0YWlsO1xuXHRcdHRoaXMubGVuZ3RoID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7VH0gdmFsdWVcblx0ICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdFx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdFx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRcdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdFx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0XHRsaXN0Lmxlbmd0aCsrO1xuXG5cdFx0cmV0dXJuIG5ld05vZGU7XG5cdH1cblx0LyoqXG5cdCAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdFx0fVxuXHRcdG5vZGUubmV4dCA9IG5leHQ7XG5cdFx0bmV4dC5wcmV2ID0gbm9kZTtcblx0XHRsaXN0Lmxlbmd0aCAtPSBpO1xuXHR9XG5cdC8qKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHJldHVybnMge1RbXX1cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHRcdHZhciBhcnJheSA9IFtdO1xuXHRcdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdFx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cblx0aWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRcdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdFx0cmV0dXJuIF87XG5cdFx0fVxuXG5cdFx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdFx0Ly8gSW4gd29ya2VyXG5cdFx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuXHRcdFx0XHR2YXIgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2U7XG5cdFx0XHRcdHZhciBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXHRcdFx0XHR2YXIgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdC8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG5cdHZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5cdGlmIChzY3JpcHQpIHtcblx0XHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRcdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRcdGlmICghXy5tYW51YWwpIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHRcdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdFx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdFx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHRcdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0XHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfO1xuXG59KF9zZWxmKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLW1hcmt1cC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvPCEtLSg/Oig/ITwhLS0pW1xcc1xcU10pKj8tLT4vLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQncHJvbG9nJzoge1xuXHRcdHBhdHRlcm46IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnZG9jdHlwZSc6IHtcblx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIveG1sLyNOVC1kb2N0eXBlZGVjbFxuXHRcdHBhdHRlcm46IC88IURPQ1RZUEUoPzpbXj5cIidbXFxdXXxcIlteXCJdKlwifCdbXiddKicpKyg/OlxcWyg/OltePFwiJ1xcXV18XCJbXlwiXSpcInwnW14nXSonfDwoPyEhLS0pfDwhLS0oPzpbXi1dfC0oPyEtPikpKi0tPikqXFxdXFxzKik/Pi9pLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdpbnRlcm5hbC1zdWJzZXQnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oXlteXFxbXSpcXFspW1xcc1xcU10rKD89XFxdPiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IG51bGwgLy8gc2VlIGJlbG93XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL1wiW15cIl0qXCJ8J1teJ10qJy8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePCF8PiR8W1tcXF1dLyxcblx0XHRcdCdkb2N0eXBlLXRhZyc6IC9eRE9DVFlQRS9pLFxuXHRcdFx0J25hbWUnOiAvW15cXHM8PidcIl0rL1xuXHRcdH1cblx0fSxcblx0J2NkYXRhJzoge1xuXHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3RhZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPSQ8JV0rKD86XFxzKD86XFxzKlteXFxzPlxcLz1dKyg/Olxccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKXwoPz1bXFxzLz5dKSkpKyk/XFxzKlxcLz8+Lyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGFnJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXjxcXC8/W15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3NwZWNpYWwtYXR0cic6IFtdLFxuXHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC89XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSspLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXC8/Pi8sXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyZbXFxkYS16XXsxLDh9Oy9pLFxuXHRcdFx0YWxpYXM6ICduYW1lZC1lbnRpdHknXG5cdFx0fSxcblx0XHQvJiN4P1tcXGRhLWZdezEsOH07L2lcblx0XVxufTtcblxuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsndGFnJ10uaW5zaWRlWydhdHRyLXZhbHVlJ10uaW5zaWRlWydlbnRpdHknXSA9XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2VudGl0eSddO1xuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZG9jdHlwZSddLmluc2lkZVsnaW50ZXJuYWwtc3Vic2V0J10uaW5zaWRlID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uIChlbnYpIHtcblxuXHRpZiAoZW52LnR5cGUgPT09ICdlbnRpdHknKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3RpdGxlJ10gPSBlbnYuY29udGVudC5yZXBsYWNlKC8mYW1wOy8sICcmJyk7XG5cdH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRJbmxpbmVkJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBpbmxpbmVkIGxhbmd1YWdlIHRvIG1hcmt1cC5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGA8c3R5bGU+YCB0YWdzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcblx0ICogY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cblx0ICogQGV4YW1wbGVcblx0ICogYWRkSW5saW5lZCgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gYWRkSW5saW5lZCh0YWdOYW1lLCBsYW5nKSB7XG5cdFx0dmFyIGluY2x1ZGVkQ2RhdGFJbnNpZGUgPSB7fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvKF48IVxcW0NEQVRBXFxbKVtcXHNcXFNdKz8oPz1cXF1cXF0+JCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnY2RhdGEnXSA9IC9ePCFcXFtDREFUQVxcW3xcXF1cXF0+JC9pO1xuXG5cdFx0dmFyIGluc2lkZSA9IHtcblx0XHRcdCdpbmNsdWRlZC1jZGF0YSc6IHtcblx0XHRcdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdFx0XHRpbnNpZGU6IGluY2x1ZGVkQ2RhdGFJbnNpZGVcblx0XHRcdH1cblx0XHR9O1xuXHRcdGluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogL1tcXHNcXFNdKy8sXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cblx0XHR2YXIgZGVmID0ge307XG5cdFx0ZGVmW3RhZ05hbWVdID0ge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKC8oPF9fW14+XSo+KSg/OjwhXFxbQ0RBVEFcXFsoPzpbXlxcXV18XFxdKD8hXFxdPikpKlxcXVxcXT58KD8hPCFcXFtDREFUQVxcWylbXFxzXFxTXSkqPyg/PTxcXC9fXz4pLy5zb3VyY2UucmVwbGFjZSgvX18vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFnTmFtZTsgfSksICdpJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBpbnNpZGVcblx0XHR9O1xuXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywgZGVmKTtcblx0fVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRBdHRyaWJ1dGUnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIHBhdHRlcm4gdG8gaGlnaGxpZ2h0IGxhbmd1YWdlcyBlbWJlZGRlZCBpbiBIVE1MIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgc3R5bGVgIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcblx0ICogY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cblx0ICogQGV4YW1wbGVcblx0ICogYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiAoYXR0ck5hbWUsIGxhbmcpIHtcblx0XHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVbJ3NwZWNpYWwtYXR0ciddLnB1c2goe1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKFxuXHRcdFx0XHQvKF58W1wiJ1xcc10pLy5zb3VyY2UgKyAnKD86JyArIGF0dHJOYW1lICsgJyknICsgL1xccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKS8uc291cmNlLFxuXHRcdFx0XHQnaSdcblx0XHRcdCksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdhdHRyLW5hbWUnOiAvXlteXFxzPV0rLyxcblx0XHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLz1bXFxzXFxTXSsvLFxuXHRcdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdFx0J3ZhbHVlJzoge1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvKF49XFxzKihbXCInXXwoPyFbXCInXSkpKVxcU1tcXHNcXFNdKig/PVxcMiQpLyxcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0YWxpYXM6IFtsYW5nLCAnbGFuZ3VhZ2UtJyArIGxhbmddLFxuXHRcdFx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaHRtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMubWF0aG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5zdmcgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG5QcmlzbS5sYW5ndWFnZXMueG1sID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnbWFya3VwJywge30pO1xuUHJpc20ubGFuZ3VhZ2VzLnNzbWwgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLmF0b20gPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLnJzcyA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jc3MuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuKGZ1bmN0aW9uIChQcmlzbSkge1xuXG5cdHZhciBzdHJpbmcgPSAvKD86XCIoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXlwiXFxcXFxcclxcbl0pKlwifCcoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXidcXFxcXFxyXFxuXSkqJykvO1xuXG5cdFByaXNtLmxhbmd1YWdlcy5jc3MgPSB7XG5cdFx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy8sXG5cdFx0J2F0cnVsZSc6IHtcblx0XHRcdHBhdHRlcm46IC9AW1xcdy1dKD86W147e1xcc118XFxzKyg/IVtcXHN7XSkpKig/Ojt8KD89XFxzKlxceykpLyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQncnVsZSc6IC9eQFtcXHctXSsvLFxuXHRcdFx0XHQnc2VsZWN0b3ItZnVuY3Rpb24tYXJndW1lbnQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhcXGJzZWxlY3RvclxccypcXChcXHMqKD8hW1xccyldKSkoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0YWxpYXM6ICdzZWxlY3Rvcidcblx0XHRcdFx0fSxcblx0XHRcdFx0J2tleXdvcmQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhefFteXFx3LV0pKD86YW5kfG5vdHxvbmx5fG9yKSg/IVtcXHctXSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3VybCc6IHtcblx0XHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXFxcXGJ1cmxcXFxcKCg/OicgKyBzdHJpbmcuc291cmNlICsgJ3wnICsgLyg/OlteXFxcXFxcclxcbigpXCInXXxcXFxcW1xcc1xcU10pKi8uc291cmNlICsgJylcXFxcKScsICdpJyksXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2Z1bmN0aW9uJzogL151cmwvaSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC8sXG5cdFx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHN0cmluZy5zb3VyY2UgKyAnJCcpLFxuXHRcdFx0XHRcdGFsaWFzOiAndXJsJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnc2VsZWN0b3InOiB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJyhefFt7fVxcXFxzXSlbXnt9XFxcXHNdKD86W157fTtcIlxcJ1xcXFxzXXxcXFxccysoPyFbXFxcXHN7XSl8JyArIHN0cmluZy5zb3VyY2UgKyAnKSooPz1cXFxccypcXFxceyknKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiBzdHJpbmcsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdCdwcm9wZXJ0eSc6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi1cXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpWy1fYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnaW1wb3J0YW50JzogLyFpbXBvcnRhbnRcXGIvaSxcblx0XHQnZnVuY3Rpb24nOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tYS16MC05XSlbLWEtejAtOV0rKD89XFwoKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3B1bmN0dWF0aW9uJzogL1soKXt9OzosXS9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5jc3M7XG5cblx0dmFyIG1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdGlmIChtYXJrdXApIHtcblx0XHRtYXJrdXAudGFnLmFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHRcdG1hcmt1cC50YWcuYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcblx0fVxuXG59KFByaXNtKSk7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jbGlrZS5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG5cdCdjb21tZW50JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLyhcXGIoPzpjbGFzc3xleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxpbnRlcmZhY2V8bmV3fHRyYWl0KVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bLlxcXFxdL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKD86YnJlYWt8Y2F0Y2h8Y29udGludWV8ZG98ZWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxpZnxpbnxpbnN0YW5jZW9mfG5ld3xudWxsfHJldHVybnx0aHJvd3x0cnl8d2hpbGUpXFxiLyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuXHQnZnVuY3Rpb24nOiAvXFxiXFx3Kyg/PVxcKCkvLFxuXHQnbnVtYmVyJzogL1xcYjB4W1xcZGEtZl0rXFxifCg/OlxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzplWystXT9cXGQrKT8vaSxcblx0J29wZXJhdG9yJzogL1s8Pl09P3xbIT1dPT89P3wtLT98XFwrXFwrP3wmJj98XFx8XFx8P3xbPyovfl4lXS8sXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbn07XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1qYXZhc2NyaXB0LmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdjbGFzcy1uYW1lJzogW1xuXHRcdFByaXNtLmxhbmd1YWdlcy5jbGlrZVsnY2xhc3MtbmFtZSddLFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpW18kQS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFwuKD86Y29uc3RydWN0b3J8cHJvdG90eXBlKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J2tleXdvcmQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpefFxcfSlcXHMqKWNhdGNoXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi5dfFxcLlxcLlxcLlxccyopXFxiKD86YXN8YXNzZXJ0KD89XFxzKlxceyl8YXN5bmMoPz1cXHMqKD86ZnVuY3Rpb25cXGJ8XFwofFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGF3YWl0fGJyZWFrfGNhc2V8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHkoPz1cXHMqKD86XFx7fCQpKXxmb3J8ZnJvbSg/PVxccyooPzpbJ1wiXXwkKSl8ZnVuY3Rpb258KD86Z2V0fHNldCkoPz1cXHMqKD86WyNcXFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRdLFxuXHQvLyBBbGxvdyBmb3IgYWxsIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIChTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjAwODQ0NClcblx0J2Z1bmN0aW9uJzogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyooPzpcXC5cXHMqKD86YXBwbHl8YmluZHxjYWxsKVxccyopP1xcKCkvLFxuXHQnbnVtYmVyJzoge1xuXHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdC8oXnxbXlxcdyRdKS8uc291cmNlICtcblx0XHRcdCcoPzonICtcblx0XHRcdChcblx0XHRcdFx0Ly8gY29uc3RhbnRcblx0XHRcdFx0L05hTnxJbmZpbml0eS8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gYmluYXJ5IGludGVnZXJcblx0XHRcdFx0LzBbYkJdWzAxXSsoPzpfWzAxXSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBvY3RhbCBpbnRlZ2VyXG5cdFx0XHRcdC8wW29PXVswLTddKyg/Ol9bMC03XSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBoZXhhZGVjaW1hbCBpbnRlZ2VyXG5cdFx0XHRcdC8wW3hYXVtcXGRBLUZhLWZdKyg/Ol9bXFxkQS1GYS1mXSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBkZWNpbWFsIGJpZ2ludFxuXHRcdFx0XHQvXFxkKyg/Ol9cXGQrKSpuLy5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBkZWNpbWFsIG51bWJlciAoaW50ZWdlciBvciBmbG9hdCkgYnV0IG5vIGJpZ2ludFxuXHRcdFx0XHQvKD86XFxkKyg/Ol9cXGQrKSooPzpcXC4oPzpcXGQrKD86X1xcZCspKik/KT98XFwuXFxkKyg/Ol9cXGQrKSopKD86W0VlXVsrLV0/XFxkKyg/Ol9cXGQrKSopPy8uc291cmNlXG5cdFx0XHQpICtcblx0XHRcdCcpJyArXG5cdFx0XHQvKD8hW1xcdyRdKS8uc291cmNlXG5cdFx0KSxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdvcGVyYXRvcic6IC8tLXxcXCtcXCt8XFwqXFwqPT98PT58JiY9P3xcXHxcXHw9P3xbIT1dPT18PDw9P3w+Pj4/PT98Wy0rKi8lJnxeIT08Pl09P3xcXC57M318XFw/XFw/PT98XFw/XFwuP3xbfjpdL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydjbGFzcy1uYW1lJ11bMF0ucGF0dGVybiA9IC8oXFxiKD86Y2xhc3N8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8aW50ZXJmYWNlfG5ldylcXHMrKVtcXHcuXFxcXF0rLztcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogUmVnRXhwKFxuXHRcdFx0Ly8gbG9va2JlaGluZFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1kdXBlLWNoYXJhY3RlcnMtY2hhcmFjdGVyLWNsYXNzXG5cdFx0XHQvKCg/Ol58W14kXFx3XFx4QTAtXFx1RkZGRi5cIidcXF0pXFxzXXxcXGIoPzpyZXR1cm58eWllbGQpKVxccyopLy5zb3VyY2UgK1xuXHRcdFx0Ly8gUmVnZXggcGF0dGVybjpcblx0XHRcdC8vIFRoZXJlIGFyZSAyIHJlZ2V4IHBhdHRlcm5zIGhlcmUuIFRoZSBSZWdFeHAgc2V0IG5vdGF0aW9uIHByb3Bvc2FsIGFkZGVkIHN1cHBvcnQgZm9yIG5lc3RlZCBjaGFyYWN0ZXJcblx0XHRcdC8vIGNsYXNzZXMgaWYgdGhlIGB2YCBmbGFnIGlzIHByZXNlbnQuIFVuZm9ydHVuYXRlbHksIG5lc3RlZCBDQ3MgYXJlIGJvdGggY29udGV4dC1mcmVlIGFuZCBpbmNvbXBhdGlibGVcblx0XHRcdC8vIHdpdGggdGhlIG9ubHkgc3ludGF4LCBzbyB3ZSBoYXZlIHRvIGRlZmluZSAyIGRpZmZlcmVudCByZWdleCBwYXR0ZXJucy5cblx0XHRcdC9cXC8vLnNvdXJjZSArXG5cdFx0XHQnKD86JyArXG5cdFx0XHQvKD86XFxbKD86W15cXF1cXFxcXFxyXFxuXXxcXFxcLikqXFxdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZGdpbXl1c117MCw3fS8uc291cmNlICtcblx0XHRcdCd8JyArXG5cdFx0XHQvLyBgdmAgZmxhZyBzeW50YXguIFRoaXMgc3VwcG9ydHMgMyBsZXZlbHMgb2YgbmVzdGVkIGNoYXJhY3RlciBjbGFzc2VzLlxuXHRcdFx0Lyg/OlxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwufFxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwufFxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwuKSpcXF0pKlxcXSkqXFxdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZGdpbXl1c117MCw3fXZbZGdpbXl1c117MCw3fS8uc291cmNlICtcblx0XHRcdCcpJyArXG5cdFx0XHQvLyBsb29rYWhlYWRcblx0XHRcdC8oPz0oPzpcXHN8XFwvXFwqKD86W14qXXxcXCooPyFcXC8pKSpcXCpcXC8pKig/OiR8W1xcclxcbiwuOzp9KVxcXV18XFwvXFwvKSkvLnNvdXJjZVxuXHRcdCksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncmVnZXgtc291cmNlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXihcXC8pW1xcc1xcU10rKD89XFwvW2Etel0qJCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRhbGlhczogJ2xhbmd1YWdlLXJlZ2V4Jyxcblx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMucmVnZXhcblx0XHRcdH0sXG5cdFx0XHQncmVnZXgtZGVsaW1pdGVyJzogL15cXC98XFwvJC8sXG5cdFx0XHQncmVnZXgtZmxhZ3MnOiAvXlthLXpdKyQvLFxuXHRcdH1cblx0fSxcblx0Ly8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGJlZm9yZSBrZXl3b3JkIGJlY2F1c2Ugd2UgdXNlIFwiZnVuY3Rpb25cIiBpbnNpZGUgdGhlIGxvb2stZm9yd2FyZFxuXHQnZnVuY3Rpb24tdmFyaWFibGUnOiB7XG5cdFx0cGF0dGVybjogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccypbPTpdXFxzKig/OmFzeW5jXFxzKik/KD86XFxiZnVuY3Rpb25cXGJ8KD86XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCl8KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKilcXHMqPT4pKS8sXG5cdFx0YWxpYXM6ICdmdW5jdGlvbidcblx0fSxcblx0J3BhcmFtZXRlcic6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKGZ1bmN0aW9uKD86XFxzKyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopP1xccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJGEtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo9PikvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKFxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccyo9PikvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XFxifFxcc3xeKSg/ISg/OmFzfGFzeW5jfGF3YWl0fGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHl8Zm9yfGZyb218ZnVuY3Rpb258Z2V0fGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c2V0fHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKSg/IVskXFx3XFx4QTAtXFx1RkZGRl0pKSg/Oig/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSpcXHMqKVxcKFxccyp8XFxdXFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccypcXHspLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fVxuXHRdLFxuXHQnY29uc3RhbnQnOiAvXFxiW0EtWl0oPzpbQS1aX118XFxkeD8pKlxcYi9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ3N0cmluZycsIHtcblx0J2hhc2hiYW5nJzoge1xuXHRcdHBhdHRlcm46IC9eIyEuKi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGFsaWFzOiAnY29tbWVudCdcblx0fSxcblx0J3RlbXBsYXRlLXN0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFxbXFxzXFxTXXxcXCRcXHsoPzpbXnt9XXxcXHsoPzpbXnt9XXxcXHtbXn1dKlxcfSkqXFx9KStcXH18KD8hXFwkXFx7KVteXFxcXGBdKSpgLyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGVtcGxhdGUtcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eYHxgJC8sXG5cdFx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdFx0fSxcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopXFwkXFx7KD86W157fV18XFx7KD86W157fV18XFx7W159XSpcXH0pKlxcfSkrXFx9Lyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2ludGVycG9sYXRpb24tcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxcJFxce3xcXH0kLyxcblx0XHRcdFx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IC9bXFxzXFxTXSsvXG5cdFx0fVxuXHR9LFxuXHQnc3RyaW5nLXByb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oKD86XnxbLHtdKVsgXFx0XSopKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMilbXlxcXFxcXHJcXG5dKSpcXDIoPz1cXHMqOikvbSxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRhbGlhczogJ3Byb3BlcnR5J1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdvcGVyYXRvcicsIHtcblx0J2xpdGVyYWwtcHJvcGVydHknOiB7XG5cdFx0cGF0dGVybjogLygoPzpefFsse10pWyBcXHRdKikoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRhbGlhczogJ3Byb3BlcnR5J1xuXHR9LFxufSk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmFkZElubGluZWQoJ3NjcmlwdCcsICdqYXZhc2NyaXB0Jyk7XG5cblx0Ly8gYWRkIGF0dHJpYnV0ZSBzdXBwb3J0IGZvciBhbGwgRE9NIGV2ZW50cy5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzI1N0YW5kYXJkX2V2ZW50c1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRBdHRyaWJ1dGUoXG5cdFx0L29uKD86YWJvcnR8Ymx1cnxjaGFuZ2V8Y2xpY2t8Y29tcG9zaXRpb24oPzplbmR8c3RhcnR8dXBkYXRlKXxkYmxjbGlja3xlcnJvcnxmb2N1cyg/OmlufG91dCk/fGtleSg/OmRvd258dXApfGxvYWR8bW91c2UoPzpkb3dufGVudGVyfGxlYXZlfG1vdmV8b3V0fG92ZXJ8dXApfHJlc2V0fHJlc2l6ZXxzY3JvbGx8c2VsZWN0fHNsb3RjaGFuZ2V8c3VibWl0fHVubG9hZHx3aGVlbCkvLnNvdXJjZSxcblx0XHQnamF2YXNjcmlwdCdcblx0KTtcbn1cblxuUHJpc20ubGFuZ3VhZ2VzLmpzID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQ7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1maWxlLWhpZ2hsaWdodC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG5cdGlmICh0eXBlb2YgUHJpc20gPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9tYXRjaGVzI1BvbHlmaWxsXG5cdGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuXHRcdEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG5cdH1cblxuXHR2YXIgTE9BRElOR19NRVNTQUdFID0gJ0xvYWRpbmfigKYnO1xuXHR2YXIgRkFJTFVSRV9NRVNTQUdFID0gZnVuY3Rpb24gKHN0YXR1cywgbWVzc2FnZSkge1xuXHRcdHJldHVybiAn4pyWIEVycm9yICcgKyBzdGF0dXMgKyAnIHdoaWxlIGZldGNoaW5nIGZpbGU6ICcgKyBtZXNzYWdlO1xuXHR9O1xuXHR2YXIgRkFJTFVSRV9FTVBUWV9NRVNTQUdFID0gJ+KcliBFcnJvcjogRmlsZSBkb2VzIG5vdCBleGlzdCBvciBpcyBlbXB0eSc7XG5cblx0dmFyIEVYVEVOU0lPTlMgPSB7XG5cdFx0J2pzJzogJ2phdmFzY3JpcHQnLFxuXHRcdCdweSc6ICdweXRob24nLFxuXHRcdCdyYic6ICdydWJ5Jyxcblx0XHQncHMxJzogJ3Bvd2Vyc2hlbGwnLFxuXHRcdCdwc20xJzogJ3Bvd2Vyc2hlbGwnLFxuXHRcdCdzaCc6ICdiYXNoJyxcblx0XHQnYmF0JzogJ2JhdGNoJyxcblx0XHQnaCc6ICdjJyxcblx0XHQndGV4JzogJ2xhdGV4J1xuXHR9O1xuXG5cdHZhciBTVEFUVVNfQVRUUiA9ICdkYXRhLXNyYy1zdGF0dXMnO1xuXHR2YXIgU1RBVFVTX0xPQURJTkcgPSAnbG9hZGluZyc7XG5cdHZhciBTVEFUVVNfTE9BREVEID0gJ2xvYWRlZCc7XG5cdHZhciBTVEFUVVNfRkFJTEVEID0gJ2ZhaWxlZCc7XG5cblx0dmFyIFNFTEVDVE9SID0gJ3ByZVtkYXRhLXNyY106bm90KFsnICsgU1RBVFVTX0FUVFIgKyAnPVwiJyArIFNUQVRVU19MT0FERUQgKyAnXCJdKSdcblx0XHQrICc6bm90KFsnICsgU1RBVFVTX0FUVFIgKyAnPVwiJyArIFNUQVRVU19MT0FESU5HICsgJ1wiXSknO1xuXG5cdC8qKlxuXHQgKiBMb2FkcyB0aGUgZ2l2ZW4gZmlsZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNyYyBUaGUgVVJMIG9yIHBhdGggb2YgdGhlIHNvdXJjZSBmaWxlIHRvIGxvYWQuXG5cdCAqIEBwYXJhbSB7KHJlc3VsdDogc3RyaW5nKSA9PiB2b2lkfSBzdWNjZXNzXG5cdCAqIEBwYXJhbSB7KHJlYXNvbjogc3RyaW5nKSA9PiB2b2lkfSBlcnJvclxuXHQgKi9cblx0ZnVuY3Rpb24gbG9hZEZpbGUoc3JjLCBzdWNjZXNzLCBlcnJvcikge1xuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcblx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPCA0MDAgJiYgeGhyLnJlc3BvbnNlVGV4dCkge1xuXHRcdFx0XHRcdHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG5cdFx0XHRcdFx0XHRlcnJvcihGQUlMVVJFX01FU1NBR0UoeGhyLnN0YXR1cywgeGhyLnN0YXR1c1RleHQpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXJyb3IoRkFJTFVSRV9FTVBUWV9NRVNTQUdFKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHhoci5zZW5kKG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlcyB0aGUgZ2l2ZW4gcmFuZ2UuXG5cdCAqXG5cdCAqIFRoaXMgcmV0dXJucyBhIHJhbmdlIHdpdGggaW5jbHVzaXZlIGVuZHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gcmFuZ2Vcblx0ICogQHJldHVybnMge1tudW1iZXIsIG51bWJlciB8IHVuZGVmaW5lZF0gfCB1bmRlZmluZWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBwYXJzZVJhbmdlKHJhbmdlKSB7XG5cdFx0dmFyIG0gPSAvXlxccyooXFxkKylcXHMqKD86KCwpXFxzKig/OihcXGQrKVxccyopPyk/JC8uZXhlYyhyYW5nZSB8fCAnJyk7XG5cdFx0aWYgKG0pIHtcblx0XHRcdHZhciBzdGFydCA9IE51bWJlcihtWzFdKTtcblx0XHRcdHZhciBjb21tYSA9IG1bMl07XG5cdFx0XHR2YXIgZW5kID0gbVszXTtcblxuXHRcdFx0aWYgKCFjb21tYSkge1xuXHRcdFx0XHRyZXR1cm4gW3N0YXJ0LCBzdGFydF07XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWVuZCkge1xuXHRcdFx0XHRyZXR1cm4gW3N0YXJ0LCB1bmRlZmluZWRdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtzdGFydCwgTnVtYmVyKGVuZCldO1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0UHJpc20uaG9va3MuYWRkKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGVudi5zZWxlY3RvciArPSAnLCAnICsgU0VMRUNUT1I7XG5cdH0pO1xuXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLXNhbml0eS1jaGVjaycsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHR2YXIgcHJlID0gLyoqIEB0eXBlIHtIVE1MUHJlRWxlbWVudH0gKi8gKGVudi5lbGVtZW50KTtcblx0XHRpZiAocHJlLm1hdGNoZXMoU0VMRUNUT1IpKSB7XG5cdFx0XHRlbnYuY29kZSA9ICcnOyAvLyBmYXN0LXBhdGggdGhlIHdob2xlIHRoaW5nIGFuZCBnbyB0byBjb21wbGV0ZVxuXG5cdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfTE9BRElORyk7IC8vIG1hcmsgYXMgbG9hZGluZ1xuXG5cdFx0XHQvLyBhZGQgY29kZSBlbGVtZW50IHdpdGggbG9hZGluZyBtZXNzYWdlXG5cdFx0XHR2YXIgY29kZSA9IHByZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDT0RFJykpO1xuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IExPQURJTkdfTUVTU0FHRTtcblxuXHRcdFx0dmFyIHNyYyA9IHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cblx0XHRcdHZhciBsYW5ndWFnZSA9IGVudi5sYW5ndWFnZTtcblx0XHRcdGlmIChsYW5ndWFnZSA9PT0gJ25vbmUnKSB7XG5cdFx0XHRcdC8vIHRoZSBsYW5ndWFnZSBtaWdodCBiZSAnbm9uZScgYmVjYXVzZSB0aGVyZSBpcyBubyBsYW5ndWFnZSBzZXQ7XG5cdFx0XHRcdC8vIGluIHRoaXMgY2FzZSwgd2Ugd2FudCB0byB1c2UgdGhlIGV4dGVuc2lvbiBhcyB0aGUgbGFuZ3VhZ2Vcblx0XHRcdFx0dmFyIGV4dGVuc2lvbiA9ICgvXFwuKFxcdyspJC8uZXhlYyhzcmMpIHx8IFssICdub25lJ10pWzFdO1xuXHRcdFx0XHRsYW5ndWFnZSA9IEVYVEVOU0lPTlNbZXh0ZW5zaW9uXSB8fCBleHRlbnNpb247XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBsYW5ndWFnZSBjbGFzc2VzXG5cdFx0XHRQcmlzbS51dGlsLnNldExhbmd1YWdlKGNvZGUsIGxhbmd1YWdlKTtcblx0XHRcdFByaXNtLnV0aWwuc2V0TGFuZ3VhZ2UocHJlLCBsYW5ndWFnZSk7XG5cblx0XHRcdC8vIHByZWxvYWQgdGhlIGxhbmd1YWdlXG5cdFx0XHR2YXIgYXV0b2xvYWRlciA9IFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlcjtcblx0XHRcdGlmIChhdXRvbG9hZGVyKSB7XG5cdFx0XHRcdGF1dG9sb2FkZXIubG9hZExhbmd1YWdlcyhsYW5ndWFnZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxvYWQgZmlsZVxuXHRcdFx0bG9hZEZpbGUoXG5cdFx0XHRcdHNyYyxcblx0XHRcdFx0ZnVuY3Rpb24gKHRleHQpIHtcblx0XHRcdFx0XHQvLyBtYXJrIGFzIGxvYWRlZFxuXHRcdFx0XHRcdHByZS5zZXRBdHRyaWJ1dGUoU1RBVFVTX0FUVFIsIFNUQVRVU19MT0FERUQpO1xuXG5cdFx0XHRcdFx0Ly8gaGFuZGxlIGRhdGEtcmFuZ2Vcblx0XHRcdFx0XHR2YXIgcmFuZ2UgPSBwYXJzZVJhbmdlKHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFuZ2UnKSk7XG5cdFx0XHRcdFx0aWYgKHJhbmdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KC9cXHJcXG4/fFxcbi9nKTtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIHJhbmdlIGlzIG9uZS1iYXNlZCBhbmQgaW5jbHVzaXZlIG9uIGJvdGggZW5kc1xuXHRcdFx0XHRcdFx0dmFyIHN0YXJ0ID0gcmFuZ2VbMF07XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gcmFuZ2VbMV0gPT0gbnVsbCA/IGxpbmVzLmxlbmd0aCA6IHJhbmdlWzFdO1xuXG5cdFx0XHRcdFx0XHRpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGxpbmVzLmxlbmd0aDsgfVxuXHRcdFx0XHRcdFx0c3RhcnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzdGFydCAtIDEsIGxpbmVzLmxlbmd0aCkpO1xuXHRcdFx0XHRcdFx0aWYgKGVuZCA8IDApIHsgZW5kICs9IGxpbmVzLmxlbmd0aDsgfVxuXHRcdFx0XHRcdFx0ZW5kID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZW5kLCBsaW5lcy5sZW5ndGgpKTtcblxuXHRcdFx0XHRcdFx0dGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLmpvaW4oJ1xcbicpO1xuXG5cdFx0XHRcdFx0XHQvLyBhZGQgZGF0YS1zdGFydCBmb3IgbGluZSBudW1iZXJzXG5cdFx0XHRcdFx0XHRpZiAoIXByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSkge1xuXHRcdFx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0JywgU3RyaW5nKHN0YXJ0ICsgMSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGhpZ2hsaWdodCBjb2RlXG5cdFx0XHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IHRleHQ7XG5cdFx0XHRcdFx0UHJpc20uaGlnaGxpZ2h0RWxlbWVudChjb2RlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdFx0Ly8gbWFyayBhcyBmYWlsZWRcblx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfRkFJTEVEKTtcblxuXHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdH0pO1xuXG5cdFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodCA9IHtcblx0XHQvKipcblx0XHQgKiBFeGVjdXRlcyB0aGUgRmlsZSBIaWdobGlnaHQgcGx1Z2luIGZvciBhbGwgbWF0Y2hpbmcgYHByZWAgZWxlbWVudHMgdW5kZXIgdGhlIGdpdmVuIGNvbnRhaW5lci5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IEVsZW1lbnRzIHdoaWNoIGFyZSBhbHJlYWR5IGxvYWRlZCBvciBjdXJyZW50bHkgbG9hZGluZyB3aWxsIG5vdCBiZSB0b3VjaGVkIGJ5IHRoaXMgbWV0aG9kLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBbY29udGFpbmVyPWRvY3VtZW50XVxuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24gaGlnaGxpZ2h0KGNvbnRhaW5lcikge1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGNvbnRhaW5lciB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVsZW1lbnRzW2krK10pOykge1xuXHRcdFx0XHRQcmlzbS5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR2YXIgbG9nZ2VkID0gZmFsc2U7XG5cdC8qKiBAZGVwcmVjYXRlZCBVc2UgYFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodC5oaWdobGlnaHRgIGluc3RlYWQuICovXG5cdFByaXNtLmZpbGVIaWdobGlnaHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCFsb2dnZWQpIHtcblx0XHRcdGNvbnNvbGUud2FybignUHJpc20uZmlsZUhpZ2hsaWdodCBpcyBkZXByZWNhdGVkLiBVc2UgYFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodC5oaWdobGlnaHRgIGluc3RlYWQuJyk7XG5cdFx0XHRsb2dnZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG5cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBcIi0tLVxcbmRhdGU6IDIwMTktMDgtMzBcXG50aXRsZTogJ0hvdyB0byBXcml0ZSBUZXh0J1xcbnRlbXBsYXRlOiBwb3N0XFxudGh1bWJuYWlsOiAnLi4vdGh1bWJuYWlscy93cml0aW5nLnBuZydcXG5zbHVnOiBob3ctdG8td3JpdGUtdGV4dFxcbmNhdGVnb3JpZXM6IGhlbHBpbmcgdG8gd3JpdGUgdGV4dFxcbnRhZ3M6IGluc3RydWN0aW9uIHRleHRlciB3cml0ZXJcXG4tLS1cXG5cXG4jIyMgRm9ybWF0dGluZyBzeW50YXhcXG5cXG5UaGlzIGV4YW1wbGUgaXMgYSBzbWFsbCBndWlkZS4gXFxcIkhvdyB0byB3cml0ZSBtYXJrZG93biB0ZXh0IGFuZCBnZXQgSFRNTCBkb2N1bWVudCBvdXRcXFwiLiBTZWUgY29kZSBvbiBteSBHaXRIdWI6IFttYXJrYWJsZSBwYXJzZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tZXVnZW5vbS9tYXJrYWJsZS10by1odG1sKVxcblxcbiMjIyBDYXB0aW9uXFxuXFxuSG93IHRvIHVzZTogd3JpdGUgdGhpcyBibG9jayBsaWtlIHRoZSBleGFtcGxlIGJlbG93XFxuXFxuYGBgYmFzaFxcbjEgIC0tLVxcbjIgIGRhdGU6IDIwMTktMDgtMzBcXG4zICB0aXRsZTogJ0luc3RydWN0aW9uIHRvIFdyaXRlIFRleHQnXFxuNCAgdGVtcGxhdGU6IHBvc3RcXG41ICB0aHVtYm5haWw6ICcuLi90aHVtYm5haWxzL3dyaXRpbmcucG5nJ1xcbjYgIHNsdWc6IGluc3RydWN0aW9uLXRvLXdyaXRlLXRleHRcXG43ICBjYXRlZ29yaWVzOiBcXG44ICB0YWdzOiBpbnN0cnVjdGlvbiB0ZXh0ZXIgd3JpdGVyIFxcbjkgIC0tLVxcbmBgYFxcblxcbiMjIyBIZWFkaW5nc1xcblxcbkhvdyB0byB1c2U6XFxuYGBgYmFzaFxcbjEgICMgVGhlIGgxIGhlYWRpbmdcXG4yICAjIyBUaGUgaDIgaGVhZGluZ1xcbjMgICMjIyBUaGUgaDMgaGVhZGluZ1xcbjQgICMjIyMgVGhlIGg0IGhlYWRpbmdcXG41ICAjIyMjIyBUaGUgaDUgaGVhZGluZ1xcbmBgYFxcblxcbiMjIyBTdHJvbmcgdGV4dFxcblxcbkhvdyB0byB1c2U6IFRoaXMgd29yZCBpcyBgKipzdHJvbmcqKmBcXG5cXG5pbiBvdXQ6XFxuVGhpcyB3b3JkIGlzICoqc3Ryb25nKipcXG5cXG4jIyMgQ29kZSBCbG9ja1xcblxcbmBgYGJhc2hcXG5cXHRgYGBqYXZhc2NyaXB0XFxuICAgIGxldCBnZXRNaW4gPSBhc3luYyAobWluKT0+IHtcXG4gICAgcmV0dXJuIGBcXG4gICAgICAgIG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuICAgICAgICBgXFxuICAgIH1cXG5cXHRgYGBcXG5gYGBcXG5pbiBvdXQ6XFxuXFxuYGBgamF2YXNjcmlwdFxcbiAgICBsZXQgZ2V0TWluID0gYXN5bmMgKG1pbik9PiB7XFxuICAgIHJldHVybiBgXFxuICAgICAgICBtaW5pbWFsIHZhbHVlIGlzICR7bWlufVxcbiAgICAgICAgYFxcbiAgICB9XFxuYGBgXFxuXFxuIyMjIENvZGUgSW5saW5lXFxuXFxuYGBgYmFzaFxcbiAgICBgdGVzdGAgLSB0ZXN0IG9wdGlvblxcbmBgYFxcblxcbmluIG91dDpcXG5gdGVzdGAgLSB0ZXN0IG9wdGlvblxcblxcbiMjIyBMaXN0c1xcblxcbmBgYGJhc2hcXG5cXHQtIHNlbGVjdCBwb2ludCAxXFxuXFx0W10gc2VsZWN0IHBvaW50IDJcXG5cXHRbeF0gc2VsZWN0IHBvaW50IDNcXG5gYGBcXG5cXG5pbiBvdXQ6XFxuXFxuLSBzZWxlY3QgcG9pbnQgMVxcbltdIHNlbGVjdCBwb2ludCAyXFxuW3hdIHNlbGVjdCBwb2ludCAzXFxuXFxuIyMjIFF1b3RpbmcgdGV4dFxcblxcbmBgYGJhc2hcXG4gICAgPiBRdW90ZVxcbiAgICA+IDxjaXRlPiAtIEF1dGhvciA8L2NpdGU+XFxuYGBgXFxuXFxuaW4gb3V0Olxcbj4gRXhhbXBsZSBRdW90ZVxcbj4gPGNpdGU+IC0gQWxiZXJ0IFJvdWdlIDwvY2l0ZT5cXG5cXG4jIyMgTGlua3NcXG5cXG5Zb3UgY2FuIGNyZWF0ZSBhbiBpbmxpbmUgbGluayBieSB3cmFwcGluZyBsaW5rIHRleHQgaW4gYnJhY2tldHMsIGFuZCB0aGVuIHdyYXBwaW5nIHRoZSBVUkwgaW4gcGFyZW50aGVzZXM6XFxuXFxuYGBgYmFzaFxcblxcdFRoaXMgc2l0ZSB3YXMgYnVpbHQgdXNpbmcgW0phdmFzY3JpcHQgRVM2XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FQ01BU2NyaXB0I0VTMjAxNSkgIGFuZCBpdCdzIGFuIGV4YW1wbGUuXFxuYGBgXFxuXFxuaW4gb3V0OlxcblRoaXMgc2l0ZSB3YXMgYnVpbHQgdXNpbmcgW0phdmFzY3JpcHQgRVM2XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FQ01BU2NyaXB0I0VTMjAxNSkgYW5kIGl0J3MgYW4gZXhhbXBsZS5cXG5cXG4jIyMgVW5kZXJkYXNoIHdvcmRcXG5cXG5gYGBiYXNoXFxuICAgIF91bmRlcmRhc2hfXFxuYGBgXFxuXFxuaW4gb3V0Olxcblxcbl91bmRlcmRhc2hfXFxuXFxuIyMjIElnbm9yaW5nIE1hcmtkb3duIGZvcm1hdHRpbmdcXG5cXG5Zb3UgY2FuIGlnbm9yZSAob3IgZXNjYXBlKSBNYXJrZG93biBmb3JtYXR0aW5nOlxcblxcbmBgYGJhc2hcXG5cXFxcKiB0aGlzIGFsbCB0ZXh0IGlzICMjIyB1bm1hcmthYmxlXFxcXCpcXG50aGlzIGlzIFxcXFwqdW5tYXJrYWJsZVxcXFwqIHRleHRcXG5BYm91dCBcXFxcKnRoaXMgPlF1b3RlXFxcXCpcXG5gYGBcXG5cXG5pbiBvdXQ6XFxuXFxcXCogdGhpcyBhbGwgdGV4dCBpcyAjIyMgdW5tYXJrYWJsZVxcXFwqXFxudGhpcyBpcyBcXFxcKnVubWFya2FibGVcXFxcKiB0ZXh0XFxuQWJvdXQgXFxcXCp0aGlzID5RdW90ZVxcXFwqXFxuXFxuIyMjIEltYWdlc1xcblxcbmBgYGJhc2hcXG4gICAgIVtHaXRodWJfaW1hZ2VdKC4uL2ltYWdlcy9naXRodWIucG5nKVxcbmBgYFxcblxcbmluIG91dDpcXG5cXG4hW0dpdGh1YiBpbWFnZV0oLi4vaW1hZ2VzL2dpdGh1Yi5wbmcpXFxuXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqICAgICAgICAgICAgICAgICAgICAgICAgXyAgICAgICBfXG5cdCAgXyBfXyBfX18gICBfXyBfIF8gX198IHwgX19fX3wgfCBfX19fXyAgICAgIF9fXyBfX1xuXHQgfCAnXyBgIF8gXFwgLyBfYCB8ICdfX3wgfC8gLyBfYCB8LyBfIFxcIFxcIC9cXCAvIC8gJ18gXFxcblx0IHwgfCB8IHwgfCB8IChffCB8IHwgIHwgICA8IChffCB8IChfKSBcXCBWICBWIC98IHwgfCB8XG5cdCB8X3wgfF98IHxffFxcX18sX3xffCAgfF98XFxfXFxfXyxffFxcX19fLyBcXF8vXFxfLyB8X3wgfF98XG5cblx0XHRcdFx0XHRcdFx0XHRcdCBfIF9cblx0XHRcdF9fXyBfX18gIF8gX18gX19fICBfIF9fIChfKSB8IF9fXyBfIF9fXG5cdFx0ICAgLyBfXy8gXyBcXHwgJ18gYCBfIFxcfCAnXyBcXHwgfCB8LyBfIFxcICdfX3xcblx0XHQgIHwgKF98IChfKSB8IHwgfCB8IHwgfCB8XykgfCB8IHwgIF9fLyB8XG5cdFx0ICAgXFxfX19cXF9fXy98X3wgfF98IHxffCAuX18vfF98X3xcXF9fX3xffFxuXHRcdFx0XHRcdFx0XHQgIHxffFxuICovXG5cbi8qKlxuICogV2UncmUgZ29pbmcgdG8gd3JpdGUgYSBzbWFsbCBtYXJrZG93biBjb21waWxlciB0b2dldGhlciBhbmRcbiAqIGhhdmUgc29tZSBzdHJpbmdzIHRvIGNvbnZlcnQgaW4gSFRNTCB0YWdzLiBcbiAqIFdlIHdhbnQgdG8gc2hhcmUgaXQgd2l0aCBvdXIgZnJpZW5kcyBvciBvdGhlciBwZW9wbGUuXG4gKiBTbywgb3VyIHRhc2sgbG9va3MgbGlrZSB0aGlzOlxuICpcbiAqICAgTUFSS0RPV04gICAgICBIVE1MXG4gKlxuICogICAqKioqIEFCQ0QgICAgIDxoND5BQkNEPC9oND5cbiAqICAgKnRleHQqICAgICAgICA8c3Ryb25nPnRleHQ8L3N0cm9uZz5cbiAqXG4gKiBBbmQgZXRjLiBMb29rcyBpdCBlYXN5PyBZZWEhIFxuICogU291bmRzIGdvb2QhIExldCdzIGdvLi4uXG5cbiAgLyoqXG4gKiBcbiAqICAgMS4gaW5wdXQgID0+IHRva2VuaXplciAgID0+IHRva2Vuc1xuICogICAyLiB0b2tlbnMgPT4gcGFyc2VyICAgICAgPT4gYXN0XG4gKiAgIDIuMSB2aXN1YWxpemF0aW9uIGFzdCB0byBET00gZWxlbWVudHNcbiAqICAgMy4gYXN0ICAgID0+IHRyYW5zZm9ybWVyID0+IG5ld0FzdG5vZGVcbiAqICAgNC4gbmV3QXN0ID0+IGdlbmVyYXRvciAgID0+IG91dHB1dFxuICovXG5cblxuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tIFwiLi9QYXJzZXJcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG5pbXBvcnQgXCIuL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBUZXh0IGZyb20gJ3Jhdy1sb2FkZXIhLi4vY29udGVudC9hcnRpY2xlcy9ob3ctdG8td3JpdGUtdGV4dC5tZCc7XG5cbi8vcHV0IHRleHQgaW50byB0aGUgdGV4dGFyZWFcbmNvbnN0IHRleHRhcmVhOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dGFyZWFcIik7XG5cbi8vY29uc29sZS5sb2codGV4dGFyZWEpXG50ZXh0YXJlYS5pbm5lckhUTUwgPSBUZXh0O1xuXG5cbmNvbnN0IGNvbnZlcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbnZlcnQnKTtcbmNvbnN0IGRlZmF1bHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWRlZmF1bHQnKTtcblxuY29udmVydEJ0bi5jbGFzc0xpc3QgPSBcImJnLXRyYW5zcGFyZW50IGhvdmVyOmJnLXJlZC01MDAgdGV4dC1yZWQtNzAwIGZvbnQtc2VtaWJvbGQgaG92ZXI6dGV4dC13aGl0ZSBweS0yIHB4LTQgYm9yZGVyIGhvdmVyOmJvcmRlci10cmFuc3BhcmVudCByb3VuZGVkXCI7XG5kZWZhdWx0QnRuLmNsYXNzTGlzdCA9IFwiYmctdHJhbnNwYXJlbnQgaG92ZXI6YmctYmx1ZS01MDAgdGV4dC1ibHVlLTcwMCBmb250LXNlbWlib2xkIGhvdmVyOnRleHQtd2hpdGUgcHktMiBweC00IGJvcmRlciBob3Zlcjpib3JkZXItdHJhbnNwYXJlbnQgcm91bmRlZFwiO1xuXG5kZWZhdWx0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG5cblx0dGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuXHRhcHAuaW5uZXJIVE1MID0gXCJcIjtcblx0dGV4dGFyZWEudmFsdWUgPSBUZXh0O1xuXG5cdGNvbnN0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoVGV4dCk7XG5cdGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodG9rZW5pemVyLnRva2Vucyk7XG5cdG5ldyBWaWV3KHBhcnNlci5hc3QpO1xuXG59KTtcblxuY29udmVydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKCkge1xuXG5cdC8vY2xlYXIgb2xkIFxuXHRsZXQgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cdGFwcC5pbm5lckhUTUwgPSBcIlwiO1xuXG5cdGNvbnN0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIodGV4dGFyZWEudmFsdWUpO1xuXHRjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHRva2VuaXplci50b2tlbnMpO1xuXHRuZXcgVmlldyhwYXJzZXIuYXN0KTtcblxufSk7XG5cbmNvbnN0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoVGV4dCk7XG5jb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHRva2VuaXplci50b2tlbnMpO1xubmV3IFZpZXcocGFyc2VyLmFzdCk7XG5cblxuXHQvL2xldCBuZXdBc3QgPSB0cmFuc2Zvcm1lcihhc3QpO1xuXHQvL2xldCBvdXRwdXQgPSBjb2RlR2VuZXJhdG9yKG5ld0FzdCk7XG5cbiJdLCJuYW1lcyI6WyJHcmFtbWFyIiwiVG9rZW5zVHlwZSIsIkNhcHRpb24iLCJ0ZXh0IiwiY2FwdGlvbiIsIm1hdGNoIiwiQkxPQ0tTIiwiQ0FQVElPTiIsInRva2VuIiwidmFsdWUiLCJ0eXBlIiwiZGF0ZSIsInRpdGxlIiwidGVtcGxhdGUiLCJ0aHVtYm5haWwiLCJzbHVnIiwiY2F0ZWdvcmllcyIsInRhZ3MiLCJyb3dfbnVtYmVyIiwid29yZF9udW1iZXIiLCJyZXBsYWNlIiwiSEVBRElORyIsIlNQQUNFIiwiTElORSIsIkxJU1QiLCJDT0RFIiwiQ09ERV9CTE9DSyIsIlFVT1RFIiwiTElOSyIsIklNQUdFIiwiVU5ERVJfREFTSCIsIlVOTUFSS0FCTEUiLCJTVFJPTkciLCJJTkxJTkVfQ09ERSIsIlBhcnNlciIsInRva2VucyIsInRva2VuX251bWJlciIsImlzUGFyYWdyYXBoIiwibGVuZ3RoIiwiZWwiLCJkZXB0aCIsImNoaWxkcmVuIiwicm93IiwiYXN0IiwicHVzaCIsImxhbmd1YWdlIiwicXVvdGUiLCJhdXRob3IiLCJuYW1lIiwiYWx0IiwidXJsIiwiYm9keSIsImluaXQiLCJUb2tlbml6ZXIiLCJnZXQiLCJ3b3JkcyIsInNwbGl0Iiwib3V0IiwibG9vcF93b3JkIiwiVU5LTk9XTl9URVhUIiwicmVzdCIsImFyciIsIml0b2tlbnMiLCJmb3JFYWNoIiwic3Ryb2tlIiwiUEFSQUdSQVBIX1NUQVJUIiwiVEVYVCIsIlBBUkFHUkFQSF9FTkQiLCJjb25zb2xlIiwibG9nIiwidHlwZXMiLCJIRUFESU5HX0ZJUlNUIiwiSEVBRElOR19TRUNPTkQiLCJIRUFESU5HX1RISVJEIiwiSEVBRElOR19GT1JUSCIsIkhFQURJTkdfRklGVEgiLCJpdHlwZSIsIkNhcHRpb25IVE1MIiwiSGVhZGVySFRNTCIsIlBhcmFncmFwaEhUTUwiLCJDb2RlQmxvY2tIVE1MIiwiUXVvdGVIVE1MIiwiTGlzdEhUTUwiLCJWaWV3IiwicmVuZGVyIiwiaGVhZGVyIiwiY29kZWJsb2NrIiwibGlzdCIsInBhcmFncmFwaCIsIkRvbVV0aWxpdGVzIiwidGFnc0Jsb2NrIiwidG9TdHJpbmciLCJtYXAiLCJ0YWciLCJjYXRlZ29yaWVzQmxvY2siLCJDYXB0aW9uQmxvY2siLCJzbGljZSIsImNhcHRpb25Ob2RlIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsIlByaXNtIiwiY29kZUJsb2NrIiwiQ29kZUJsb2NrTm9kZSIsImNsYXNzTmFtZSIsImhpZ2hsaWdodEFsbCIsImxhc3RDaGlsZCIsImdldFJvb3QiLCJub2RlTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJlbGVtZW50IiwiSGVhZGVyTm9kZSIsImxhc3RFbGVtZW50Q2hpbGQiLCJsaXN0QmxvY2siLCJsaXN0QmxvY2tOb2RlIiwiUGFyYWdyYXBoTm9kZSIsImNoaWxkIiwiSlNPTiIsInN0cmluZ2lmeSIsIlN0cmluZyIsInF1b3RlQmxvY2siLCJxdW90ZUJsb2NrTm9kZSIsIlRleHQiLCJ0ZXh0YXJlYSIsImNvbnZlcnRCdG4iLCJkZWZhdWx0QnRuIiwiY2xhc3NMaXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsaWNrIiwiYXBwIiwidG9rZW5pemVyIiwicGFyc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==