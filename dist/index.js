/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/static/styles/prism.css":
/*!*************************************!*\
  !*** ./src/static/styles/prism.css ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/static/styles/quote.css":
/*!*************************************!*\
  !*** ./src/static/styles/quote.css ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/static/styles/style.css":
/*!*************************************!*\
  !*** ./src/static/styles/style.css ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/prismjs/prism.js":
/*!***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


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
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
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
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/content/articles/how-to-write-text.md":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/content/articles/how-to-write-text.md ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("---\ndate: 2019-08-30\ntitle: 'How to Write Text'\ntemplate: post\nthumbnail: './thumbnails/writing.png'\nslug: how-to-write-text\ncategories: helping to write text\ntags: instruction texter writer\n---\n\n## Formatting syntax\n\nThis is a small guide. \"How to write markdown text and get HTML document out\". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)\n\n## Caption Block about article\n\nHow to use: write caption block like the example below:\n<br/>\n\\*\n---\ndate: 2019-08-30\ntitle: 'Instruction to Write Text'\ntemplate: post\nthumbnail: './thumbnails/writing.png'\nslug: instruction-to-write-text\ncategories: \ntags: instruction texter writer \n---\n\\*\n\n## Headings\n\nHow to use:\n\\*\n# The h1 heading\n## The h2 heading\n### The h3 heading\n#### The h4 heading\n##### The h5 heading\n\\* \n<br/>\n# The h1 heading\n## The h2 heading\n### The h3 heading\n#### The h4 heading\n##### The h5 heading\n\n## Styling bold text\n\nHow to use: This word is \\* **strong** and **unknown for me** \\*\nin out: This word is **strong** and **unknown for me**.\n\n## Code Block: \n\n\\*\t\t\n```bash\n  \tlet getMin = async (min)=> {\n\t\treturn `\n    \t\tminimal value is ${min}\n    \t`\n\t}‚\n```\n\\* \n\n```bash\n\tlet getMin = async (min)=> {\n\t\treturn `\n    \t\tminimal value is ${min}\n    \t\t`\n\t}\n```\n\n## Code In Code Block\n\n\\*\n\t```bash\n\t\t```javascript\n\t\t\tlet getMin = async (min)=> {\n\t\t\t\treturn `\n\t\t\t\t\tminimal value is ${min}\n\t\t\t\t\t`\n\t\t\t}\n\t\t```\n\t```\n\\*\n\n```bash\n\t```javascript\n\t\tlet getMin = async (min)=> {\n\t\t\treturn `\n\t\t\t\tminimal value is ${min}\n\t\t\t\t`\n\t\t}\n\t```\n```\n\n## Code Inline\n\n\\*\n    `test is a one of more other options`\n\\* \n\nin out:\n`test is a one of more other options`\n\n## Lists\n\n\\*\n\tList 1 :\n\t  - one\n\t  - two\n\t  - three and more\n\n\tList 2 :\n\t  [] one\n\t  [] two\n\t  [] three and more\n\n\tList  simple 3:\n\t  [x] one\n\t  [x] two\n\t  [x] three and more\n\n\tList 4 with mixed attributes:\n\t   - one\n\t  [] two\n\t  [x] three and more\n\n\\*\n<br/>\nin out:\n<br/>\nList 1:\n\t- one\n\t- two\n\t- three and more\n<br/>\nList 2:\n\t[] one\n\t[] two\n\t[] three and more\n<br/>\nList 3:\n\t[x] one\n\t[x] two\n\t[x] three and more\n<br/>\nList 4 with mixed attributes:\n\t- one\n\t[] two\n\t[x] three and more\n\n\n## Table\n\n\\*\n| Name | Age | Auto | Town | Pet |\n| Bob | 17 | BMW | Baku | Fish |\n| John | 52 | Fiat | Berlin | Dog |\n| Lisa | 32 | Toyota | Frankfurt | Snake |\n| Eugen | 45 | Mazda | Dresden | Cat | \n\\*\n\n<br/>\n\n| Name | Age | Auto | Town | Pet |\n| Bob | 17 | BMW | Baku | Fish |\n| John | 52 | Fiat | Berlin | Dog |\n| Lisa | 32 | Toyota | Frankfurt | Snake |\n| Eugen | 45 | Mazda | Dresden | Cat |\n\n\n## Quoting text\n\n\\*\n    > Quote\n    > <cite> - Author </cite>\n\\* \n\nin out:\n\n> Example Quote\n> <cite> - Albert Rouge </cite>\n\n## Links\n\nYou can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:\n\n\\*\n\tThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript)  and it's an example.\n\\* \n\nin out:\n\nThis site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript) and it's an example.\n\n[How to define types for process environment](https://meugenom.com/#/article/how-to-define-types-for-process-environment)\n\n\n## Simple Underline decoration\n\n/* _underdash_ /*\n\nin out:\n\n_underdash_\n\n## Color Underline decoration\n\n\\*\n\tBlue.blue color\n\tGray.gray color\n\tRed.red color\n\tGreen.green color\n\tYellow.yellow color\n\tIndigo.indigo color \n\tPurple.purple color\n\tPink.pink color\n\\*\n\nin out:\n\nLorem.green ipsum.indigo dolor.red sit amet.purple , consectetur.pink adipisicing.yellow elit. \n\n## Color Badges\n\n\\*\n\tBlue@blue color\n\tGray@gray color\n\tRed@red color\n\tGreen@green color\n\tYellow@yellow color\n\tIndigo@indigo color \n\tPurple@purple color\n\tPink@pink color\n\\* \n\nin out:\n\nLorem@green ipsum@indigo dolor@red sit amet@purple , consectetur@pink adipisicing@yellow elit.\n\n## Ignoring Markdown formatting\n\nYou can ignore (or escape) Markdown formatting:\n<br/>\n\\* this **all*** text is ### unmarkable \\*\nthis is \\* unmarkable \\* text\nAbout \\* this >Quote \\*\n\n## Images\n\n\\* ![Github_image](./images/github.png) \\*\n\nin out:\n\nThis is an ![Github image](./images/github.png)\n");

/***/ }),

/***/ "./src/Caption.ts":
/*!************************!*\
  !*** ./src/Caption.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Caption = void 0;
var Grammar_1 = __webpack_require__(/*! ./Grammar */ "./src/Grammar.ts");
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var Caption = (function () {
    function Caption(text) {
        this.text = text;
    }
    Caption.prototype.get = function () {
        var match = this.text.match(Grammar_1.Grammar.BLOCKS.CAPTION);
        if (!match) {
            throw new Error("Invalid caption format");
        }
        var row = match[1], date = match[2], title = match[3], template = match[5], thumbnail = match[7], slug = match[9], categories = match[11], tags = match[13];
        var token = {
            type: Types_1.TokenType.CAPTION,
            row: row,
            date: date,
            title: title,
            template: template,
            thumbnail: thumbnail,
            slug: slug,
            categories: categories,
            tags: tags,
        };
        this.text = this.text.replace(Grammar_1.Grammar.BLOCKS.CAPTION, "");
        return token;
    };
    return Caption;
}());
exports.Caption = Caption;


/***/ }),

/***/ "./src/Grammar.ts":
/*!************************!*\
  !*** ./src/Grammar.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Grammar = void 0;
var Grammar = (function () {
    function Grammar() {
    }
    Grammar.BLOCKS = {
        HEADING: /[^\S](#{1,6})([^\n\)\/]+)/g,
        HEADING_LEVEL: /(#{1,5})/g,
        CAPTION: /^---\sdate:((.*))\stitle:((.*))\stemplate:((.*))\sthumbnail:((.*))\sslug:((.*))\scategories:((.*))\stags:((.*))\s---/,
        SPACE: / /,
        LINE: /\n/,
        COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/g,
        BADGE: /((.?)[^\s]+)\@(blue|gray|red|green|yellow|indigo|purple|pink)/g,
        LIST: /\S.*:\n(\s*(-|\[\]|\[.\])\s*\S.*){1,20}/g,
        LIST_ATTRIBUTE: /(-|\[\]|\[x\])/g,
        CODE_BLOCK: /\`\`\`(python|bash|java|javascript|typescript|swift)([^(\`){3}].*\n){1,200}\`\`\`/g,
        CODE_BLOCK_LANG: /[^\`\`\`](\w+)\n/gs,
        CODE_BLOCK_BODY: /\n([\s\S]+)[^\`\`\`]/gs,
        CODE_IN_CODE: /\`\`\`(python|bash|java|javascript|typescript|swift)\n([^\`\`\`]+)\`\`\`(python|bash|java|javascript|typescript|swift)\n([^\`\`\`]+)\`\`\`\n\`\`\`\n/g,
        INLINE_CODE: /([^\`\`\`]+)/gs,
        INLINE_CODE_PARAMS: /([^\n]+)/sg,
        INLINE_CODE_BLOCK: /\`(\S).*[^\`]\`/g,
        QUOTE: />[^\n].*\n(\s){0,10}> <cite> - [^\n]+/g,
        QUOTE_PARAMS: /[^<>]+/g,
        LINK: /[^!]\[([^)]\S.+)\]\(https:\/\/\S.+\)/g,
        LINK_NAME: /\[\S.+\]/g,
        LINK_URL: /\(\S.+\)/g,
        IMAGE: /!\[([^)]+)\]\(\S+\)/g,
        IMAGE_NAME: /!\[\S.+\]/g,
        IMAGE_URL: /\(\S.+\)/g,
        UNDER_LINE: /(_{1})([^_.]+)(_{1})/g,
        UNMARKABLE: /\\\*\s[^\\]+\\\*/g,
        STRONG: /\*\*([\w|\s]+)\*\*/g,
        STRONG_TEXT: /[^\*]+/g,
        TABLE: /((\|[\w\d\s]+)+\|)/g,
        PARAGRAPH: /([^\n]+)/g,
        TOKEN: /\$token.(\S{35}[^\s\.\*\`])/g,
        TXT_TOKEN: /[^\$token.\w\b-](\w)+/g,
    };
    return Grammar;
}());
exports.Grammar = Grammar;


/***/ }),

/***/ "./src/Parser.ts":
/*!***********************!*\
  !*** ./src/Parser.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parser = void 0;
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var Parser = (function () {
    function Parser(tokens) {
        this.tokens = [];
        this.tokens = tokens;
        this.ast = {
            type: "Document",
            children: []
        };
        this.init();
    }
    Parser.prototype.init = function () {
        var token_number;
        token_number = 0;
        var isParagraph;
        isParagraph = false;
        var children = this.ast.children;
        while (token_number < this.tokens.length) {
            var token = this.tokens[token_number];
            if (token.type === Types_1.TokenType.CAPTION) {
                var captionElement = {};
                captionElement.type = Types_1.TokenType.CAPTION;
                captionElement.row = token.row;
                captionElement.children = [
                    {
                        type: "Caption",
                        date: token.date,
                        title: token.title,
                        template: token.template,
                        thumbnail: token.thumbnail,
                        slug: token.slug,
                        categories: token.categories,
                        tags: token.tags
                    }
                ];
                children.push(captionElement);
            }
            if (token.type === Types_1.TokenType.HEADING_FIRST) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 1;
                headElement.row = "#" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value,
                    }
                ];
                children.push(headElement);
            }
            if (token.type === Types_1.TokenType.HEADING_SECOND) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 2;
                headElement.row = "##" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value,
                    }
                ];
                children.push(headElement);
            }
            if (token.type === Types_1.TokenType.HEADING_THIRD) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 3;
                headElement.row = "###" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value,
                    }
                ];
                children.push(headElement);
            }
            if (token.type === Types_1.TokenType.HEADING_FORTH) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 4;
                headElement.row = "####" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value,
                    }
                ];
                children.push(headElement);
            }
            if (token.type === Types_1.TokenType.HEADING_FIFTH) {
                var headElement = {};
                headElement.type = Types_1.TokenType.HEADING;
                headElement.dept = 5;
                headElement.row = "#####" + token.value;
                headElement.children = [
                    {
                        type: Types_1.TokenType.TEXT,
                        value: token.value,
                    }
                ];
                children.push(headElement);
            }
            if (token.type == Types_1.TokenType.CODE_IN_CODE) {
                var codeInCodeElement = {};
                codeInCodeElement.type = Types_1.TokenType.CODE_IN_CODE;
                codeInCodeElement.row = "```" + token.language + "\n" + token.code + "\n```";
                codeInCodeElement.code = token.code;
                codeInCodeElement.language = token.language;
                children.push(codeInCodeElement);
            }
            if (token.type == Types_1.TokenType.CODE_BLOCK) {
                var codeBlockElement = {};
                codeBlockElement.type = Types_1.TokenType.CODE_BLOCK;
                codeBlockElement.row = "```" + token.language + "\n" + token.code + "\n```";
                codeBlockElement.code = token.code;
                codeBlockElement.language = token.language;
                children.push(codeBlockElement);
            }
            if (token.type == Types_1.TokenType.QUOTE) {
                var quoteElement = {};
                quoteElement.type = Types_1.TokenType.QUOTE;
                quoteElement.row = ">" + token.quote + "\n> <cite> - " + token.author + "</cite>";
                quoteElement.quote = token.quote;
                quoteElement.author = token.author;
                children.push(quoteElement);
            }
            if (token.type == Types_1.TokenType.LIST) {
                var listElement = {};
                listElement.type = Types_1.TokenType.LIST;
                listElement.attribute = token.attribute;
                listElement.row = token.attribute + " " + token.value;
                listElement.value = token.value;
                children.push(listElement);
            }
            if (token.type == Types_1.TokenType.TABLE) {
                var tableElement = {};
                tableElement.type = Types_1.TokenType.TABLE;
                tableElement.row = token.row;
                tableElement.children = token.children;
                children.push(tableElement);
            }
            if (token.type == Types_1.TokenType.PARAGRAPH_START) {
                var paragraphStartElement = {};
                paragraphStartElement.type = Types_1.TokenType.PARAGRAPH;
                paragraphStartElement.children = [];
                paragraphStartElement.row = "";
                children.push(paragraphStartElement);
                isParagraph = true;
            }
            if (token.type == Types_1.TokenType.PARAGRAPH_END) {
                isParagraph = false;
            }
            if (token.type == Types_1.TokenType.LINK) {
                var linkElement = {};
                linkElement.type = Types_1.TokenType.LINK;
                linkElement.name = token.name;
                linkElement.url = token.url;
                linkElement.row = "[" + token.name + "](" + token.url + ")";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(linkElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.name + "](" + token.url + ")";
                }
                else {
                    children.push(linkElement);
                }
            }
            if (token.type == "Image" && isParagraph == true) {
                var imageToken = {};
                imageToken.type = Types_1.TokenType.IMAGE;
                imageToken.alt = token.alt;
                imageToken.url = token.url;
                imageToken.row = "![" + token.alt + "](" + token.url + ")";
                if (isParagraph == true) {
                    children[children.length - 1].children.push(imageToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.alt + "](" + token.url + ")";
                }
                else {
                    children.push(imageToken);
                }
            }
            if (token.type == Types_1.TokenType.TEXT) {
                var textToken = {};
                textToken.type = Types_1.TokenType.TEXT;
                textToken.value = token.value;
                textToken.row = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(textToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(textToken);
                }
            }
            if (token.type == Types_1.TokenType.UNMARKABLE) {
                var unmarkableTextToken = {};
                unmarkableTextToken.type = Types_1.TokenType.UNMARKABLE;
                unmarkableTextToken.value = token.value;
                unmarkableTextToken.row = "\\" + token.value + "\\";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(unmarkableTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(unmarkableTextToken);
                }
            }
            if (token.type == Types_1.TokenType.STRONG) {
                var strongTextToken = {};
                strongTextToken.type = Types_1.TokenType.STRONG;
                strongTextToken.value = token.value;
                strongTextToken.row = "**" + token.value + "**";
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(strongTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(strongTextToken);
                }
            }
            if (token.type == "Color") {
                var colorTextToken = {};
                colorTextToken.type = Types_1.TokenType.COLOR;
                colorTextToken.color = token.color;
                colorTextToken.value = token.value;
                colorTextToken.row = token.value + "." + token.color;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(colorTextToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value + "." + token.color;
                }
                else {
                    children.push(colorTextToken);
                }
            }
            if (token.type == "Badge") {
                var badgeToken = {};
                badgeToken.type = Types_1.TokenType.BADGE;
                badgeToken.color = token.color;
                badgeToken.value = token.value;
                badgeToken.row = token.value + "@" + token.color;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(badgeToken);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value + "@" + token.color;
                }
                else {
                    children.push(badgeToken);
                }
            }
            if (token.type == Types_1.TokenType.CODE_INLINE) {
                var inlineCodeElement = {};
                inlineCodeElement.type = Types_1.TokenType.CODE_INLINE;
                inlineCodeElement.value = token.value;
                inlineCodeElement.row = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(inlineCodeElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(inlineCodeElement);
                }
            }
            if (token.type == Types_1.TokenType.UNDER_LINE) {
                var underLineElement = {};
                underLineElement.type = Types_1.TokenType.UNDER_LINE;
                underLineElement.value = token.value;
                if (isParagraph == true) {
                    children[(children).length - 1].children.push(underLineElement);
                    children[(children).length - 1].row = children[(children).length - 1].row + token.value;
                }
                else {
                    children.push(underLineElement);
                }
            }
            token_number++;
        }
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),

/***/ "./src/Tokenizer.ts":
/*!**************************!*\
  !*** ./src/Tokenizer.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tokenizer = void 0;
var Grammar_1 = __webpack_require__(/*! ./Grammar */ "./src/Grammar.ts");
var Caption_1 = __webpack_require__(/*! ./Caption */ "./src/Caption.ts");
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/commonjs-browser/index.js");
var Tokenizer = (function () {
    function Tokenizer(text) {
        var _this = this;
        this.tokens = [];
        this.init = function () {
            var paragraphStartToken = {};
            paragraphStartToken.type = Types_1.TokenType.PARAGRAPH_START;
            var paragraphEndToken = {};
            paragraphEndToken.type = Types_1.TokenType.PARAGRAPH_END;
            _this.text.split("\n").forEach(function (paragraph) {
                if (paragraph.length != 0
                    && paragraph != undefined
                    && paragraph.trim() != " ") {
                    _this.tokens.push(paragraphStartToken);
                    paragraph.split(" ").forEach(function (word) {
                        var wordMatchResult = word.match(Grammar_1.Grammar.BLOCKS.TOKEN);
                        if (wordMatchResult && wordMatchResult[0]) {
                            _this.tokens.push(_this.tokensMap.get(wordMatchResult[0]));
                        }
                        else {
                            if (word.length != 0
                                && word != undefined) {
                                var textToken = {};
                                textToken.type = Types_1.TokenType.TEXT;
                                textToken.value = word;
                                _this.tokens.push(textToken);
                            }
                        }
                    });
                    _this.tokens.push(paragraphEndToken);
                }
            });
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
    Tokenizer.prototype.findUnmarkable = function () {
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
        return;
    };
    Tokenizer.prototype.findCodeInCode = function () {
        var _this = this;
        var codeInCodes = this.text.match(Grammar_1.Grammar.BLOCKS.CODE_IN_CODE);
        codeInCodes === null || codeInCodes === void 0 ? void 0 : codeInCodes.forEach(function (codeInCode) {
            var _a;
            var languageMatchResult = codeInCode.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE);
            var bodyMatchResult = codeInCode.match(Grammar_1.Grammar.BLOCKS.INLINE_CODE);
            if (languageMatchResult && bodyMatchResult) {
                var language = languageMatchResult[0];
                var body = (_a = bodyMatchResult[1]) !== null && _a !== void 0 ? _a : '';
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
    Tokenizer.prototype.findHeadings = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.HEADING) != null) {
            var headings = this.text.match(Grammar_1.Grammar.BLOCKS.HEADING);
            headings === null || headings === void 0 ? void 0 : headings.forEach(function (heading) {
                var levelMatchResult = heading.match(Grammar_1.Grammar.BLOCKS.HEADING_LEVEL);
                if (levelMatchResult) {
                    var level = levelMatchResult[0];
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
    Tokenizer.prototype.findTables = function () {
        var _this = this;
        if (this.text.match(Grammar_1.Grammar.BLOCKS.TABLE) != null) {
            var tables = this.text.match(Grammar_1.Grammar.BLOCKS.TABLE);
            tables === null || tables === void 0 ? void 0 : tables.forEach(function (table) {
                var tableToken = {};
                tableToken.type = Types_1.TokenType.TABLE;
                tableToken.row = table;
                tableToken.children = [];
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


/***/ }),

/***/ "./src/Types.ts":
/*!**********************!*\
  !*** ./src/Types.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["BADGE"] = "Badge";
    TokenType["CAPTION"] = "Caption";
    TokenType["CODE_BLOCK"] = "CodeBlock";
    TokenType["CODE_IN_CODE"] = "CodeInCode";
    TokenType["CODE_INLINE"] = "CodeInline";
    TokenType["COLOR"] = "Color";
    TokenType["DOCUMENT"] = "Document";
    TokenType["HEADING"] = "Heading";
    TokenType["HEADING_FIRST"] = "HeadingFirst";
    TokenType["HEADING_SECOND"] = "HeadingSecond";
    TokenType["HEADING_THIRD"] = "HeadingThird";
    TokenType["HEADING_FORTH"] = "HeadingForth";
    TokenType["HEADING_FIFTH"] = "HeadingFifth";
    TokenType["IMAGE"] = "Image";
    TokenType["LINK"] = "Link";
    TokenType["LIST"] = "List";
    TokenType["PARAGRAPH"] = "Paragraph";
    TokenType["PARAGRAPH_START"] = "ParagraphStart";
    TokenType["PARAGRAPH_END"] = "ParagraphEnd";
    TokenType["QUOTE"] = "Quote";
    TokenType["STRONG"] = "Strong";
    TokenType["TABLE"] = "Table";
    TokenType["TABLE_ROW"] = "TableRow";
    TokenType["TEXT"] = "Text";
    TokenType["UNDER_LINE"] = "UnderLine";
    TokenType["UNKNOWN_TEXT"] = "UnknownText";
    TokenType["UNMARKABLE"] = "Unmarkable";
})(TokenType || (exports.TokenType = TokenType = {}));


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Utils = (function () {
    function Utils() {
    }
    Utils.lazyLoadImage = function (imageElement) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var loaderElement, observer;
            var _this = this;
            return __generator(this, function (_b) {
                loaderElement = document.createElement('div');
                loaderElement.classList.add('imageLoader');
                (_a = imageElement === null || imageElement === void 0 ? void 0 : imageElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(loaderElement, imageElement);
                observer = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                        var img, response, blob, objectURL, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!entry.isIntersecting) return [3, 8];
                                    img = entry.target;
                                    if (!(img.dataset && img.dataset["src"])) return [3, 7];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, 6, 7]);
                                    loaderElement.style.display = 'block';
                                    return [4, fetch(img.dataset["src"])];
                                case 2:
                                    response = _a.sent();
                                    if (!response.ok) return [3, 4];
                                    return [4, response.blob()];
                                case 3:
                                    blob = _a.sent();
                                    objectURL = URL.createObjectURL(blob);
                                    img.src = objectURL;
                                    _a.label = 4;
                                case 4: return [3, 7];
                                case 5:
                                    error_1 = _a.sent();
                                    console.error('Error loading image:', error_1);
                                    return [3, 7];
                                case 6:
                                    loaderElement.style.display = 'none';
                                    return [7];
                                case 7:
                                    observer.unobserve(img);
                                    _a.label = 8;
                                case 8: return [2];
                            }
                        });
                    }); });
                });
                observer.observe(imageElement);
                return [2];
            });
        });
    };
    Utils._lazyLoadImage = function (imageElement) {
        return __awaiter(this, void 0, void 0, function () {
            var observer;
            var _this = this;
            return __generator(this, function (_a) {
                observer = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                        var img, response, blob, objectURL;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!entry.isIntersecting) return [3, 4];
                                    img = entry.target;
                                    if (!img.dataset["src"]) return [3, 3];
                                    return [4, fetch(img.dataset["src"])];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3, 3];
                                    return [4, response.blob()];
                                case 2:
                                    blob = _a.sent();
                                    objectURL = URL.createObjectURL(blob);
                                    img.src = objectURL;
                                    _a.label = 3;
                                case 3:
                                    observer.unobserve(img);
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    }); });
                });
                observer.observe(imageElement);
                return [2];
            });
        });
    };
    return Utils;
}());
exports["default"] = Utils;


/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var CaptionHTML_1 = __webpack_require__(/*! ./htmlblocks/CaptionHTML */ "./src/htmlblocks/CaptionHTML.ts");
var HeaderHTML_1 = __webpack_require__(/*! ./htmlblocks/HeaderHTML */ "./src/htmlblocks/HeaderHTML.ts");
var ParagraphHTML_1 = __webpack_require__(/*! ./htmlblocks/ParagraphHTML */ "./src/htmlblocks/ParagraphHTML.ts");
var CodeBlockHTML_1 = __webpack_require__(/*! ./htmlblocks/CodeBlockHTML */ "./src/htmlblocks/CodeBlockHTML.ts");
var QuoteHTML_1 = __webpack_require__(/*! ./htmlblocks/QuoteHTML */ "./src/htmlblocks/QuoteHTML.ts");
var ListHTML_1 = __webpack_require__(/*! ./htmlblocks/ListHTML */ "./src/htmlblocks/ListHTML.ts");
var TableHTML_1 = __webpack_require__(/*! ./htmlblocks/TableHTML */ "./src/htmlblocks/TableHTML.ts");
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var View = (function () {
    function View(ast, htmlOutput) {
        this.ast = ast;
        this.htmlOutput = htmlOutput;
    }
    View.prototype.init = function () {
        var _this = this;
        var children = this.ast.children;
        if (children) {
            children.forEach(function (token) {
                if (token.type == Types_1.TokenType.CAPTION) {
                    if (_this.htmlOutput) {
                        var caption = new CaptionHTML_1.CaptionHTML(token, _this.htmlOutput);
                        caption.render();
                    }
                }
                if (token.type == Types_1.TokenType.HEADING) {
                    if (_this.htmlOutput) {
                        var header = new HeaderHTML_1.HeaderHTML(token, _this.htmlOutput);
                        header.render();
                    }
                }
                if (token.type == Types_1.TokenType.CODE_BLOCK || token.type == Types_1.TokenType.CODE_IN_CODE) {
                    if (_this.htmlOutput) {
                        var codeblock = new CodeBlockHTML_1.CodeBlockHTML(token, _this.htmlOutput);
                        codeblock.render();
                    }
                }
                if (token.type == Types_1.TokenType.QUOTE) {
                    if (_this.htmlOutput) {
                        var quote = new QuoteHTML_1.QuoteHTML(token, _this.htmlOutput);
                        quote.render();
                    }
                }
                if (token.type == Types_1.TokenType.LIST) {
                    if (_this.htmlOutput) {
                        var list = new ListHTML_1.ListHTML(token, _this.htmlOutput);
                        list.render();
                    }
                }
                if (token.type == Types_1.TokenType.TABLE) {
                    if (_this.htmlOutput) {
                        var table = new TableHTML_1.TableHTML(token, _this.htmlOutput);
                        table.render();
                    }
                }
                if (token.type == Types_1.TokenType.PARAGRAPH) {
                    if (_this.htmlOutput) {
                        var paragraph = new ParagraphHTML_1.ParagraphHTML(token, _this.htmlOutput);
                        _this.htmlOutput = paragraph.render();
                    }
                }
            });
        }
        return this.htmlOutput;
    };
    return View;
}());
exports.View = View;


/***/ }),

/***/ "./src/htmlblocks/CaptionHTML.ts":
/*!***************************************!*\
  !*** ./src/htmlblocks/CaptionHTML.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CaptionHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
var CaptionHTML = (function () {
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
        var CaptionBlock = "\n\t\t<div class = \"flex flex-col md:flex-row\">\n\t\t\t<div class = \"flex-none\">\n\t\t\t\t<img data-src= ".concat(this.token.children[0].thumbnail, " \n\t\t\t\t class=\"lazy float-left object-contain h-64 w-100 mx-2\"/>\n\t\t\t</div>\n\t\t\t<div class=\"flex-auto justify-start\">\n\t\t\t\t<h3 class=\"text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600\">\n\t\t\t\t\t").concat(this.token.children[0].title.slice(2, this.token.children[0].title.length - 1), "</h3>\n\t\t\t\t<time class=\"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1\">\n\t\t\t\t\t").concat(this.token.children[0].date, "\n\t\t\t\t</time> \n\t\t\t\t<div class=\"tag-container py-1\">\n\t\t\t\t\t").concat(tagsBlock, "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"categories-container py-1\">\n\t\t\t\t\t").concat(categoriesBlock, "\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t\t<hr/>\n\t\t<br/>\n\t\t<br/>");
        var captionNode = this.DomUtilites.createElement('p');
        captionNode.innerHTML = CaptionBlock;
        this.htmlOutput.appendChild(captionNode);
    };
    return CaptionHTML;
}());
exports.CaptionHTML = CaptionHTML;


/***/ }),

/***/ "./src/htmlblocks/CodeBlockHTML.ts":
/*!*****************************************!*\
  !*** ./src/htmlblocks/CodeBlockHTML.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeBlockHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
__webpack_require__(/*! ../static/styles/prism.css */ "./src/static/styles/prism.css");
var Prism = __importStar(__webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js"));
var CodeBlockHTML = (function () {
    function CodeBlockHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    CodeBlockHTML.prototype.render = function () {
        var _a;
        var codeBlock = "\n\t\t\t<code class=\"language-".concat(this.token.language, "\">\n\t\t \t\t").concat(this.token.code, "\n\t\t\t</code>");
        var CodeBlockNode = this.DomUtilites.createElement("pre");
        CodeBlockNode.className = "language-".concat(this.token.language, "\"");
        Prism.highlightAll(codeBlock);
        CodeBlockNode.innerHTML = codeBlock;
        var app = this.htmlOutput;
        var elemChildren = app === null || app === void 0 ? void 0 : app.children;
        if (elemChildren) {
            if (elemChildren.length > 0) {
                (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(CodeBlockNode);
            }
            else {
                app.appendChild(CodeBlockNode);
            }
        }
    };
    return CodeBlockHTML;
}());
exports.CodeBlockHTML = CodeBlockHTML;


/***/ }),

/***/ "./src/htmlblocks/DomUtilites.ts":
/*!***************************************!*\
  !*** ./src/htmlblocks/DomUtilites.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomUtilites = void 0;
var DomUtilites = (function () {
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


/***/ }),

/***/ "./src/htmlblocks/HeaderHTML.ts":
/*!**************************************!*\
  !*** ./src/htmlblocks/HeaderHTML.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
var HeaderHTML = (function () {
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


/***/ }),

/***/ "./src/htmlblocks/ListHTML.ts":
/*!************************************!*\
  !*** ./src/htmlblocks/ListHTML.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
var ListHTML = (function () {
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


/***/ }),

/***/ "./src/htmlblocks/ParagraphHTML.ts":
/*!*****************************************!*\
  !*** ./src/htmlblocks/ParagraphHTML.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParagraphHTML = void 0;
var Types_1 = __webpack_require__(/*! ../Types */ "./src/Types.ts");
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
var ParagraphHTML = (function () {
    function ParagraphHTML(token, htmlOutput) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites_1.DomUtilites();
    }
    ParagraphHTML.prototype.render = function () {
        var _a;
        var ParagraphNode = this.DomUtilites.createElement("p");
        ParagraphNode.className = "block leading-7 font-mono mt-2";
        var text = "";
        this.token.children.forEach(function (child) {
            if (child.type == Types_1.TokenType.TEXT) {
                text = text + " " + child.value;
            }
            if (child.type == Types_1.TokenType.IMAGE) {
                text = text + "\n\t\t\t\t<div class=\"flex flex-wrap justify-center\">\n\t\t\t\t\t<div class=\"w-6/12 sm:w-4/12 px-4 pb-20\">\t\t\t\t\t\t\n\t\t\t\t\t\t<img data-src=\"".concat(child.url, "\" alt=\"").concat(child.alt, "\" class=\"lazy shadow rounded max-w-full h-auto allign-middle border-none\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t");
            }
            if (child.type == Types_1.TokenType.LINK) {
                text = text + "<a href=\"".concat(child.url, "\" class=\"text-blue-500\">\n\t\t\t\t\t").concat(child.name, "\n\t\t\t\t\t<a/>");
            }
            if (child.type == Types_1.TokenType.STRONG) {
                text = text + " " + "\n\t\t\t\t<strong>".concat(child.value, "</strong>\n\t\t\t\t");
            }
            if (child.type == Types_1.TokenType.CODE_INLINE) {
                text = text + " " + "\n\t\t\t\t<code class=\"inline-block py-1 px-2 bg-gray-300 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400\">\n\t\t\t\t\t".concat(child.value.substring(1, child.value.length - 1), "\n\t\t\t\t</code>\n\t\t\t\t");
            }
            if (child.type == Types_1.TokenType.COLOR) {
                var colorText = void 0;
                if (child.color == "blue") {
                    colorText = '<a class="underline decoration-blue-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "gray") {
                    colorText = '<a class="underline decoration-gray-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "red") {
                    colorText = '<a class="underline decoration-red-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "green") {
                    colorText = '<a class="underline decoration-green-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "yellow") {
                    colorText = '<a class="underline decoration-yellow-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "purple") {
                    colorText = '<a class="underline decoration-purple-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "pink") {
                    colorText = '<a class="underline decoration-pink-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                else if (child.color == "indigo") {
                    colorText = '<a class="underline decoration-indigo-500 md:decoration-solid decoration-4">' + child.value + '</a>';
                }
                if (colorText) {
                    text = text + " " + colorText;
                }
            }
            if (child.type == "Badge") {
                var colorBadge = void 0;
                if (child.color == "blue") {
                    colorBadge = '<span class="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">' + child.value + '</span>';
                }
                else if (child.color == "gray") {
                    colorBadge = '<span class="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">' + child.value + '</span>';
                }
                else if (child.color == "red") {
                    colorBadge = '<span class="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">' + child.value + '</span>';
                }
                else if (child.color == "green") {
                    colorBadge = '<span class="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">' + child.value + '</span>';
                }
                else if (child.color == "yellow") {
                    colorBadge = '<span class="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">' + child.value + '</span>';
                }
                else if (child.color == "purple") {
                    colorBadge = '<span class="bg-purple-100 text-purple-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">' + child.value + '</span>';
                }
                else if (child.color == "pink") {
                    colorBadge = '<span class="bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">' + child.value + '</span>';
                }
                else if (child.color == "indigo") {
                    colorBadge = '<span class="bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">' + child.value + '</span>';
                }
                if (colorBadge != undefined) {
                    text = text + " " + colorBadge;
                }
            }
            if (child.type == Types_1.TokenType.UNDER_LINE) {
                text = text + " " + "\n\t\t\t\t<span class=\"underline decoration-sky-500 text-slate-500\">\n\t\t\t\t\t".concat(child.value, "\n\t\t\t\t</span>\n\t\t\t\t");
            }
            if (child.type == Types_1.TokenType.UNMARKABLE) {
                var unmarkable = child.value;
                var unmarkableText = unmarkable.substring(1, unmarkable.length - 1);
                text = text + " " + "\t\t\t\t\n\t\t\t\t<div class=\"text-orange-900\">\n\t\t\t\t\t".concat(unmarkableText.replace(/\n/g, '<br/>'), "\n\t\t\t\t</div>\n\t\t\t\t");
            }
        });
        ParagraphNode.innerHTML = text;
        var app = this.htmlOutput;
        if ((app === null || app === void 0 ? void 0 : app.children.length) != 0) {
            (_a = app === null || app === void 0 ? void 0 : app.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(ParagraphNode);
        }
        else {
            app.appendChild(ParagraphNode);
        }
        return this.htmlOutput;
    };
    return ParagraphHTML;
}());
exports.ParagraphHTML = ParagraphHTML;


/***/ }),

/***/ "./src/htmlblocks/QuoteHTML.ts":
/*!*************************************!*\
  !*** ./src/htmlblocks/QuoteHTML.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuoteHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
__webpack_require__(/*! ../static/styles/quote.css */ "./src/static/styles/quote.css");
var QuoteHTML = (function () {
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


/***/ }),

/***/ "./src/htmlblocks/TableHTML.ts":
/*!*************************************!*\
  !*** ./src/htmlblocks/TableHTML.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableHTML = void 0;
var DomUtilites_1 = __webpack_require__(/*! ./DomUtilites */ "./src/htmlblocks/DomUtilites.ts");
var TableHTML = (function () {
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


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Tokenizer_1 = __webpack_require__(/*! ./Tokenizer */ "./src/Tokenizer.ts");
var Parser_1 = __webpack_require__(/*! ./Parser */ "./src/Parser.ts");
var View_1 = __webpack_require__(/*! ./View */ "./src/View.ts");
__webpack_require__(/*! ./static/styles/style.css */ "./src/static/styles/style.css");
var Utils_1 = __importDefault(__webpack_require__(/*! ./Utils */ "./src/Utils.ts"));
var how_to_write_text_md_1 = __importDefault(__webpack_require__(/*! raw-loader!./content/articles/how-to-write-text.md */ "./node_modules/raw-loader/dist/cjs.js!./src/content/articles/how-to-write-text.md"));
var htmlOutput = document.createElement('div');
htmlOutput.id = "app";
function convertMDtoHTML(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    var parser = new Parser_1.Parser(tokenizer.tokens);
    var output = new View_1.View(parser.ast, htmlOutput).init();
    return output;
}
function convertMDtoAST(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    var parser = new Parser_1.Parser(tokenizer.tokens);
    return parser.ast;
}
function convertMDtoTokens(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    return tokenizer.tokens;
}
exports["default"] = {
    convertMDtoHTML: convertMDtoHTML,
    convertMDtoAST: convertMDtoAST,
    convertMDtoTokens: convertMDtoTokens
};
function showExample() {
    var _a;
    if (document.getElementById('content') != null && how_to_write_text_md_1.default != undefined) {
        (_a = document.getElementById('content')) === null || _a === void 0 ? void 0 : _a.appendChild(convertMDtoHTML(how_to_write_text_md_1.default));
    }
}
showExample();
var images = document.querySelectorAll('.lazy');
images.forEach(function (img) {
    Utils_1.default.lazyLoadImage(img);
});


/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/commonjs-browser/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/commonjs-browser/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/commonjs-browser/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/commonjs-browser/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/commonjs-browser/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/commonjs-browser/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/md5.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/native.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/native.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/nil.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/parse.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/regex.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/rng.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!**************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v3.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/commonjs-browser/md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v35.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v4.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/commonjs-browser/native.js"));

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v5.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/commonjs-browser/sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/validate.js":
/*!*************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/commonjs-browser/regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/version.js":
/*!************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/version.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports["default"] = _default;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvcHJpc20uY3NzP2RlYTciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvcXVvdGUuY3NzPzBhZjQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzPzg1ODciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcHJpc20uanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2NvbnRlbnQvYXJ0aWNsZXMvaG93LXRvLXdyaXRlLXRleHQubWQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL0NhcHRpb24udHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL0dyYW1tYXIudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL1BhcnNlci50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvVG9rZW5pemVyLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9UeXBlcy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvQ2FwdGlvbkhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvQ29kZUJsb2NrSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9Eb21VdGlsaXRlcy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9IZWFkZXJIVE1MLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0xpc3RIVE1MLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvUXVvdGVIVE1MLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL1RhYmxlSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9tZDUuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbmlsLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc2hhMS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YzNS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y1LmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jb3JlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZikge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvKD86XnxcXHMpbGFuZyg/OnVhZ2UpPy0oW1xcdy1dKykoPz1cXHN8JCkvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdFx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdFx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHRcdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHQvKipcblx0XHQgKiBCeSBkZWZhdWx0LCBpZiBQcmlzbSBpcyBpbiBhIHdlYiB3b3JrZXIsIGl0IGFzc3VtZXMgdGhhdCBpdCBpcyBpbiBhIHdvcmtlciBpdCBjcmVhdGVkIGl0c2VsZiwgc28gaXQgdXNlc1xuXHRcdCAqIGBhZGRFdmVudExpc3RlbmVyYCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgaW5zdGFuY2UuIEhvd2V2ZXIsIGlmIHlvdSdyZSB1c2luZyBQcmlzbSBtYW51YWxseSBpbiB5b3VyXG5cdFx0ICogb3duIHdvcmtlciwgeW91IGRvbid0IHdhbnQgaXQgdG8gZG8gdGhpcy5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGFkZCBpdHMgb3duIGxpc3RlbmVycyB0byB0aGUgd29ya2VyLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSBQcmlzbSBleGVjdXRlcy4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0XHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdFx0ICogUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyID0gdHJ1ZTtcblx0XHQgKiAvLyBMb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHRcdC8qKlxuXHRcdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdFx0ICpcblx0XHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0XHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqL1xuXHRcdHV0aWw6IHtcblx0XHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdFx0ICovXG5cdFx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdFx0ICovXG5cdFx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgY2xvbmU7IHZhciBpZDtcblx0XHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIG0gPSBsYW5nLmV4ZWMoZWxlbWVudC5jbGFzc05hbWUpO1xuXHRcdFx0XHRcdGlmIChtKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAnbm9uZSc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHMgdGhlIFByaXNtIGBsYW5ndWFnZS14eHh4YCBjbGFzcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuXHRcdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0XHQgKi9cblx0XHRcdHNldExhbmd1YWdlOiBmdW5jdGlvbiAoZWxlbWVudCwgbGFuZ3VhZ2UpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIGFsbCBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Nlc1xuXHRcdFx0XHQvLyAodGhpcyBtaWdodCBsZWF2ZSBiZWhpbmQgYSBsZWFkaW5nIHNwYWNlKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKGxhbmcsICdnaScpLCAnJyk7XG5cblx0XHRcdFx0Ly8gYWRkIHRoZSBuZXcgYGxhbmd1YWdlLXh4eHhgIGNsYXNzXG5cdFx0XHRcdC8vICh1c2luZyBgY2xhc3NMaXN0YCB3aWxsIGF1dG9tYXRpY2FsbHkgY2xlYW4gdXAgc3BhY2VzIGZvciB1cylcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsYW5ndWFnZS0nICsgbGFuZ3VhZ2UpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdFx0ICovXG5cdFx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOlteOl0rOlteOl0rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHRcdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHRcdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24gKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0XHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdFx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbiAoY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0XHR9O1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0XHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdFx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdFx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0XHQgKiA2LiBgY29tcGxldGVgXG5cdFx0ICpcblx0XHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHRcdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0XHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdFx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdFx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHRcdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdFx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKGVsZW1lbnQsIGxhbmd1YWdlKTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKHBhcmVudCwgbGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdFx0Y29kZTogY29kZVxuXHRcdFx0fTtcblxuXHRcdFx0ZnVuY3Rpb24gaW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGhpZ2hsaWdodGVkQ29kZSkge1xuXHRcdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBlbnYpO1xuXG5cdFx0XHQvLyBwbHVnaW5zIG1heSBjaGFuZ2UvYWRkIHRoZSBwYXJlbnQvZWxlbWVudFxuXHRcdFx0cGFyZW50ID0gZW52LmVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnICYmICFwYXJlbnQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKSB7XG5cdFx0XHRcdHBhcmVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8udXRpbC5lbmNvZGUoZW52LmNvZGUpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG5cdFx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGV2dC5kYXRhKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdFx0Y29kZTogZW52LmNvZGUsXG5cdFx0XHRcdFx0aW1tZWRpYXRlQ2xvc2U6IHRydWVcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIExvdy1sZXZlbCBmdW5jdGlvbiwgb25seSB1c2UgaWYgeW91IGtub3cgd2hhdCB5b3XigJlyZSBkb2luZy4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdFx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGEgc3RyaW5nIHdpdGggdGhlIEhUTUwgcHJvZHVjZWQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtdG9rZW5pemVgXG5cdFx0ICogMi4gYGFmdGVyLXRva2VuaXplYFxuXHRcdCAqIDMuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gcGFzc2VkIHRvIGBncmFtbWFyYC5cblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgaGlnaGxpZ2h0ZWQgSFRNTC5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBQcmlzbS5oaWdobGlnaHQoJ3ZhciBmb28gPSB0cnVlOycsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LCAnamF2YXNjcmlwdCcpO1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRjb2RlOiB0ZXh0LFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHRcdH07XG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXRva2VuaXplJywgZW52KTtcblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgbGFuZ3VhZ2UgXCInICsgZW52Lmxhbmd1YWdlICsgJ1wiIGhhcyBubyBncmFtbWFyLicpO1xuXHRcdFx0fVxuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblx0X3NlbGYuUHJpc20gPSBfO1xuXG5cblx0Ly8gVHlwZXNjcmlwdCBub3RlOlxuXHQvLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcblx0Ly9cblx0Ly8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG5cdCAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG5cdCAqIEBjbGFzc1xuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdFx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdFx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG5cdCAqXG5cdCAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuXHQgKiB0aGVtLlxuXHQgKlxuXHQgKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuXHQgKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuXHQgKlxuXHQgKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG5cdCAqXG5cdCAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFRva2VuXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRcdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdHR5cGU6IG8udHlwZSxcblx0XHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHRcdHRhZzogJ3NwYW4nLFxuXHRcdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cblx0XHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdFx0aWYgKGFsaWFzZXMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0XHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuXHQgKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3Rcblx0ICogQHBhcmFtIHthbnl9IGdyYW1tYXJcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3Ncblx0ICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2Vcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal07XG5cdFx0XHRcdHZhciBpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZTtcblx0XHRcdFx0dmFyIGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZDtcblx0XHRcdFx0dmFyIGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHk7XG5cdFx0XHRcdHZhciBhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCA+PSB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgbWF0Y2hTdHIgPSBtYXRjaFswXTtcblx0XHRcdFx0XHR2YXIgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pO1xuXHRcdFx0XHRcdHZhciBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblxuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtSZW1hdGNoT3B0aW9uc30gKi9cblx0XHRcdFx0XHRcdHZhciBuZXN0ZWRSZW1hdGNoID0ge1xuXHRcdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIG5lc3RlZFJlbWF0Y2gpO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcmVhY2ggbWlnaHQgaGF2ZSBiZWVuIGV4dGVuZGVkIGJlY2F1c2Ugb2YgdGhlIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIG5lc3RlZFJlbWF0Y2gucmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSBuZXN0ZWRSZW1hdGNoLnJlYWNoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuXHQgKiBAcHJvcGVydHkge1R9IHZhbHVlXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRcdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLnRhaWwgPSB0YWlsO1xuXHRcdHRoaXMubGVuZ3RoID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7VH0gdmFsdWVcblx0ICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdFx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdFx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRcdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdFx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0XHRsaXN0Lmxlbmd0aCsrO1xuXG5cdFx0cmV0dXJuIG5ld05vZGU7XG5cdH1cblx0LyoqXG5cdCAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdFx0fVxuXHRcdG5vZGUubmV4dCA9IG5leHQ7XG5cdFx0bmV4dC5wcmV2ID0gbm9kZTtcblx0XHRsaXN0Lmxlbmd0aCAtPSBpO1xuXHR9XG5cdC8qKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHJldHVybnMge1RbXX1cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHRcdHZhciBhcnJheSA9IFtdO1xuXHRcdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdFx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cblx0aWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRcdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdFx0cmV0dXJuIF87XG5cdFx0fVxuXG5cdFx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdFx0Ly8gSW4gd29ya2VyXG5cdFx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuXHRcdFx0XHR2YXIgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2U7XG5cdFx0XHRcdHZhciBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXHRcdFx0XHR2YXIgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdC8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG5cdHZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5cdGlmIChzY3JpcHQpIHtcblx0XHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRcdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRcdGlmICghXy5tYW51YWwpIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHRcdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdFx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdFx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHRcdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0XHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfO1xuXG59KF9zZWxmKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLW1hcmt1cC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvPCEtLSg/Oig/ITwhLS0pW1xcc1xcU10pKj8tLT4vLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQncHJvbG9nJzoge1xuXHRcdHBhdHRlcm46IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnZG9jdHlwZSc6IHtcblx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIveG1sLyNOVC1kb2N0eXBlZGVjbFxuXHRcdHBhdHRlcm46IC88IURPQ1RZUEUoPzpbXj5cIidbXFxdXXxcIlteXCJdKlwifCdbXiddKicpKyg/OlxcWyg/OltePFwiJ1xcXV18XCJbXlwiXSpcInwnW14nXSonfDwoPyEhLS0pfDwhLS0oPzpbXi1dfC0oPyEtPikpKi0tPikqXFxdXFxzKik/Pi9pLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdpbnRlcm5hbC1zdWJzZXQnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oXlteXFxbXSpcXFspW1xcc1xcU10rKD89XFxdPiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IG51bGwgLy8gc2VlIGJlbG93XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL1wiW15cIl0qXCJ8J1teJ10qJy8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePCF8PiR8W1tcXF1dLyxcblx0XHRcdCdkb2N0eXBlLXRhZyc6IC9eRE9DVFlQRS9pLFxuXHRcdFx0J25hbWUnOiAvW15cXHM8PidcIl0rL1xuXHRcdH1cblx0fSxcblx0J2NkYXRhJzoge1xuXHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3RhZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPSQ8JV0rKD86XFxzKD86XFxzKlteXFxzPlxcLz1dKyg/Olxccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKXwoPz1bXFxzLz5dKSkpKyk/XFxzKlxcLz8+Lyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGFnJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXjxcXC8/W15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3NwZWNpYWwtYXR0cic6IFtdLFxuXHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC89XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSspLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogL14oXFxzKilbXCInXXxbXCInXSQvLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+Lyxcblx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblx0J2VudGl0eSc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvJltcXGRhLXpdezEsOH07L2ksXG5cdFx0XHRhbGlhczogJ25hbWVkLWVudGl0eSdcblx0XHR9LFxuXHRcdC8mI3g/W1xcZGEtZl17MSw4fTsvaVxuXHRdXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWyd0YWcnXS5pbnNpZGVbJ2F0dHItdmFsdWUnXS5pbnNpZGVbJ2VudGl0eSddID1cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZW50aXR5J107XG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWydkb2N0eXBlJ10uaW5zaWRlWydpbnRlcm5hbC1zdWJzZXQnXS5pbnNpZGUgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG4vLyBQbHVnaW4gdG8gbWFrZSBlbnRpdHkgdGl0bGUgc2hvdyB0aGUgcmVhbCBlbnRpdHksIGlkZWEgYnkgUm9tYW4gS29tYXJvdlxuUHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIGlubGluZWQgbGFuZ3VhZ2UgdG8gbWFya3VwLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYDxzdHlsZT5gIHRhZ3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiBhZGRJbmxpbmVkKHRhZ05hbWUsIGxhbmcpIHtcblx0XHR2YXIgaW5jbHVkZWRDZGF0YUluc2lkZSA9IHt9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC8oXjwhXFxbQ0RBVEFcXFspW1xcc1xcU10rPyg/PVxcXVxcXT4kKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydjZGF0YSddID0gL148IVxcW0NEQVRBXFxbfFxcXVxcXT4kL2k7XG5cblx0XHR2YXIgaW5zaWRlID0ge1xuXHRcdFx0J2luY2x1ZGVkLWNkYXRhJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0XHRcdGluc2lkZTogaW5jbHVkZWRDZGF0YUluc2lkZVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0aW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvW1xcc1xcU10rLyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblxuXHRcdHZhciBkZWYgPSB7fTtcblx0XHRkZWZbdGFnTmFtZV0gPSB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoLyg8X19bXj5dKj4pKD86PCFcXFtDREFUQVxcWyg/OlteXFxdXXxcXF0oPyFcXF0+KSkqXFxdXFxdPnwoPyE8IVxcW0NEQVRBXFxbKVtcXHNcXFNdKSo/KD89PFxcL19fPikvLnNvdXJjZS5yZXBsYWNlKC9fXy9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWdOYW1lOyB9KSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IGluc2lkZVxuXHRcdH07XG5cblx0XHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCBkZWYpO1xuXHR9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZEF0dHJpYnV0ZScsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gcGF0dGVybiB0byBoaWdobGlnaHQgbGFuZ3VhZ2VzIGVtYmVkZGVkIGluIEhUTUwgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGBzdHlsZWAgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIChhdHRyTmFtZSwgbGFuZykge1xuXHRcdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVsnc3BlY2lhbC1hdHRyJ10ucHVzaCh7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoXG5cdFx0XHRcdC8oXnxbXCInXFxzXSkvLnNvdXJjZSArICcoPzonICsgYXR0ck5hbWUgKyAnKScgKyAvXFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpLy5zb3VyY2UsXG5cdFx0XHRcdCdpJ1xuXHRcdFx0KSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2F0dHItbmFtZSc6IC9eW15cXHM9XSsvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvPVtcXHNcXFNdKy8sXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQndmFsdWUnOiB7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC8oXj1cXHMqKFtcIiddfCg/IVtcIiddKSkpXFxTW1xcc1xcU10qKD89XFwyJCkvLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogW2xhbmcsICdsYW5ndWFnZS0nICsgbGFuZ10sXG5cdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5odG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLnN2ZyA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5QcmlzbS5sYW5ndWFnZXMuc3NtbCA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMuYXRvbSA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMucnNzID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNzcy5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG5cblx0dmFyIHN0cmluZyA9IC8oPzpcIig/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteXCJcXFxcXFxyXFxuXSkqXCJ8Jyg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteJ1xcXFxcXHJcXG5dKSonKS87XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0XHQnY29tbWVudCc6IC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvLyxcblx0XHQnYXRydWxlJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdAW1xcXFx3LV0oPzonICsgL1teO3tcXHNcIiddfFxccysoPyFcXHMpLy5zb3VyY2UgKyAnfCcgKyBzdHJpbmcuc291cmNlICsgJykqPycgKyAvKD86O3woPz1cXHMqXFx7KSkvLnNvdXJjZSksXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3J1bGUnOiAvXkBbXFx3LV0rLyxcblx0XHRcdFx0J3NlbGVjdG9yLWZ1bmN0aW9uLWFyZ3VtZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXFxic2VsZWN0b3JcXHMqXFwoXFxzKig/IVtcXHMpXSkpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGFsaWFzOiAnc2VsZWN0b3InXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdrZXl3b3JkJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OmFuZHxub3R8b25seXxvcikoPyFbXFx3LV0pLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHRcdH1cblx0XHR9LFxuXHRcdCd1cmwnOiB7XG5cdFx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ1xcXFxidXJsXFxcXCgoPzonICsgc3RyaW5nLnNvdXJjZSArICd8JyArIC8oPzpbXlxcXFxcXHJcXG4oKVwiJ118XFxcXFtcXHNcXFNdKSovLnNvdXJjZSArICcpXFxcXCknLCAnaScpLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdmdW5jdGlvbic6IC9edXJsL2ksXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFwofFxcKSQvLFxuXHRcdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyBzdHJpbmcuc291cmNlICsgJyQnKSxcblx0XHRcdFx0XHRhbGlhczogJ3VybCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3NlbGVjdG9yJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCcoXnxbe31cXFxcc10pW157fVxcXFxzXSg/Oltee307XCJcXCdcXFxcc118XFxcXHMrKD8hW1xcXFxze10pfCcgKyBzdHJpbmcuc291cmNlICsgJykqKD89XFxcXHMqXFxcXHspJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnc3RyaW5nJzoge1xuXHRcdFx0cGF0dGVybjogc3RyaW5nLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHQncHJvcGVydHknOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVstX2EtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVstXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J2ltcG9ydGFudCc6IC8haW1wb3J0YW50XFxiL2ksXG5cdFx0J2Z1bmN0aW9uJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFteLWEtejAtOV0pWy1hLXowLTldKyg/PVxcKCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdwdW5jdHVhdGlvbic6IC9bKCl7fTs6LF0vXG5cdH07XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuY3NzO1xuXG5cdHZhciBtYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRpZiAobWFya3VwKSB7XG5cdFx0bWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0XHRtYXJrdXAudGFnLmFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdH1cblxufShQcmlzbSkpO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tY2xpa2UuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFw6XSlcXC9cXC8uKi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQnc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC8oW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdjbGFzcy1uYW1lJzoge1xuXHRcdHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8aW50ZXJmYWNlfG5ld3x0cmFpdClcXHMrfFxcYmNhdGNoXFxzK1xcKClbXFx3LlxcXFxdKy9pLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncHVuY3R1YXRpb24nOiAvWy5cXFxcXS9cblx0XHR9XG5cdH0sXG5cdCdrZXl3b3JkJzogL1xcYig/OmJyZWFrfGNhdGNofGNvbnRpbnVlfGRvfGVsc2V8ZmluYWxseXxmb3J8ZnVuY3Rpb258aWZ8aW58aW5zdGFuY2VvZnxuZXd8bnVsbHxyZXR1cm58dGhyb3d8dHJ5fHdoaWxlKVxcYi8sXG5cdCdib29sZWFuJzogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcblx0J2Z1bmN0aW9uJzogL1xcYlxcdysoPz1cXCgpLyxcblx0J251bWJlcic6IC9cXGIweFtcXGRhLWZdK1xcYnwoPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/L2ksXG5cdCdvcGVyYXRvcic6IC9bPD5dPT98WyE9XT0/PT98LS0/fFxcK1xcKz98JiY/fFxcfFxcfD98Wz8qL35eJV0vLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vXG59O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tamF2YXNjcmlwdC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQnY2xhc3MtbmFtZSc6IFtcblx0XHRQcmlzbS5sYW5ndWFnZXMuY2xpa2VbJ2NsYXNzLW5hbWUnXSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJEEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxcLig/OmNvbnN0cnVjdG9yfHByb3RvdHlwZSkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdrZXl3b3JkJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XnxcXH0pXFxzKiljYXRjaFxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14uXXxcXC5cXC5cXC5cXHMqKVxcYig/OmFzfGFzc2VydCg/PVxccypcXHspfGFzeW5jKD89XFxzKig/OmZ1bmN0aW9uXFxifFxcKHxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxhd2FpdHxicmVha3xjYXNlfGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5KD89XFxzKig/Olxce3wkKSl8Zm9yfGZyb20oPz1cXHMqKD86WydcIl18JCkpfGZ1bmN0aW9ufCg/OmdldHxzZXQpKD89XFxzKig/OlsjXFxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XSxcblx0Ly8gQWxsb3cgZm9yIGFsbCBub24tQVNDSUkgY2hhcmFjdGVycyAoU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMDg0NDQpXG5cdCdmdW5jdGlvbic6IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqKD86XFwuXFxzKig/OmFwcGx5fGJpbmR8Y2FsbClcXHMqKT9cXCgpLyxcblx0J251bWJlcic6IHtcblx0XHRwYXR0ZXJuOiBSZWdFeHAoXG5cdFx0XHQvKF58W15cXHckXSkvLnNvdXJjZSArXG5cdFx0XHQnKD86JyArXG5cdFx0XHQoXG5cdFx0XHRcdC8vIGNvbnN0YW50XG5cdFx0XHRcdC9OYU58SW5maW5pdHkvLnNvdXJjZSArXG5cdFx0XHRcdCd8JyArXG5cdFx0XHRcdC8vIGJpbmFyeSBpbnRlZ2VyXG5cdFx0XHRcdC8wW2JCXVswMV0rKD86X1swMV0rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gb2N0YWwgaW50ZWdlclxuXHRcdFx0XHQvMFtvT11bMC03XSsoPzpfWzAtN10rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gaGV4YWRlY2ltYWwgaW50ZWdlclxuXHRcdFx0XHQvMFt4WF1bXFxkQS1GYS1mXSsoPzpfW1xcZEEtRmEtZl0rKSpuPy8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gZGVjaW1hbCBiaWdpbnRcblx0XHRcdFx0L1xcZCsoPzpfXFxkKykqbi8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gZGVjaW1hbCBudW1iZXIgKGludGVnZXIgb3IgZmxvYXQpIGJ1dCBubyBiaWdpbnRcblx0XHRcdFx0Lyg/OlxcZCsoPzpfXFxkKykqKD86XFwuKD86XFxkKyg/Ol9cXGQrKSopPyk/fFxcLlxcZCsoPzpfXFxkKykqKSg/OltFZV1bKy1dP1xcZCsoPzpfXFxkKykqKT8vLnNvdXJjZVxuXHRcdFx0KSArXG5cdFx0XHQnKScgK1xuXHRcdFx0Lyg/IVtcXHckXSkvLnNvdXJjZVxuXHRcdCksXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fD0+fCYmPT98XFx8XFx8PT98WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1xcPz0/fFxcP1xcLj98W346XS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGV4dGVuZHN8aW1wbGVtZW50c3xpbnN0YW5jZW9mfGludGVyZmFjZXxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdC8vIGxvb2tiZWhpbmRcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZHVwZS1jaGFyYWN0ZXJzLWNoYXJhY3Rlci1jbGFzc1xuXHRcdFx0LygoPzpefFteJFxcd1xceEEwLVxcdUZGRkYuXCInXFxdKVxcc118XFxiKD86cmV0dXJufHlpZWxkKSlcXHMqKS8uc291cmNlICtcblx0XHRcdC8vIFJlZ2V4IHBhdHRlcm46XG5cdFx0XHQvLyBUaGVyZSBhcmUgMiByZWdleCBwYXR0ZXJucyBoZXJlLiBUaGUgUmVnRXhwIHNldCBub3RhdGlvbiBwcm9wb3NhbCBhZGRlZCBzdXBwb3J0IGZvciBuZXN0ZWQgY2hhcmFjdGVyXG5cdFx0XHQvLyBjbGFzc2VzIGlmIHRoZSBgdmAgZmxhZyBpcyBwcmVzZW50LiBVbmZvcnR1bmF0ZWx5LCBuZXN0ZWQgQ0NzIGFyZSBib3RoIGNvbnRleHQtZnJlZSBhbmQgaW5jb21wYXRpYmxlXG5cdFx0XHQvLyB3aXRoIHRoZSBvbmx5IHN5bnRheCwgc28gd2UgaGF2ZSB0byBkZWZpbmUgMiBkaWZmZXJlbnQgcmVnZXggcGF0dGVybnMuXG5cdFx0XHQvXFwvLy5zb3VyY2UgK1xuXHRcdFx0Jyg/OicgK1xuXHRcdFx0Lyg/OlxcWyg/OlteXFxdXFxcXFxcclxcbl18XFxcXC4pKlxcXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2RnaW15dXNdezAsN30vLnNvdXJjZSArXG5cdFx0XHQnfCcgK1xuXHRcdFx0Ly8gYHZgIGZsYWcgc3ludGF4LiBUaGlzIHN1cHBvcnRzIDMgbGV2ZWxzIG9mIG5lc3RlZCBjaGFyYWN0ZXIgY2xhc3Nlcy5cblx0XHRcdC8oPzpcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLnxcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLnxcXFsoPzpbXltcXF1cXFxcXFxyXFxuXXxcXFxcLikqXFxdKSpcXF0pKlxcXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2RnaW15dXNdezAsN312W2RnaW15dXNdezAsN30vLnNvdXJjZSArXG5cdFx0XHQnKScgK1xuXHRcdFx0Ly8gbG9va2FoZWFkXG5cdFx0XHQvKD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLy5zb3VyY2Vcblx0XHQpLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3JlZ2V4LXNvdXJjZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL14oXFwvKVtcXHNcXFNdKyg/PVxcL1thLXpdKiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1yZWdleCcsXG5cdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLnJlZ2V4XG5cdFx0XHR9LFxuXHRcdFx0J3JlZ2V4LWRlbGltaXRlcic6IC9eXFwvfFxcLyQvLFxuXHRcdFx0J3JlZ2V4LWZsYWdzJzogL15bYS16XSskLyxcblx0XHR9XG5cdH0sXG5cdC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcblx0J2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuXHRcdHBhdHRlcm46IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqWz06XVxccyooPzphc3luY1xccyopPyg/OlxcYmZ1bmN0aW9uXFxifCg/OlxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpfCg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopXFxzKj0+KSkvLFxuXHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdH0sXG5cdCdwYXJhbWV0ZXInOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhmdW5jdGlvbig/OlxccysoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKT9cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRhLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqPT4pL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqPT4pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/OlxcYnxcXHN8XikoPyEoPzphc3xhc3luY3xhd2FpdHxicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5fGZvcnxmcm9tfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZCkoPyFbJFxcd1xceEEwLVxcdUZGRkZdKSkoPzooPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqXFxzKilcXChcXHMqfFxcXVxccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqXFx7KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0XSxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCdoYXNoYmFuZyc6IHtcblx0XHRwYXR0ZXJuOiAvXiMhLiovLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRhbGlhczogJ2NvbW1lbnQnXG5cdH0sXG5cdCd0ZW1wbGF0ZS1zdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118XFwkXFx7KD86W157fV18XFx7KD86W157fV18XFx7W159XSpcXH0pKlxcfSkrXFx9fCg/IVxcJFxceylbXlxcXFxgXSkqYC8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RlbXBsYXRlLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvLFxuXHRcdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHRcdH0sXG5cdFx0XHQnaW50ZXJwb2xhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFteXFxcXF0pKD86XFxcXHsyfSkqKVxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL15cXCRcXHt8XFx9JC8sXG5cdFx0XHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiAvW1xcc1xcU10rL1xuXHRcdH1cblx0fSxcblx0J3N0cmluZy1wcm9wZXJ0eSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Ol58Wyx7XSlbIFxcdF0qKShbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDIpW15cXFxcXFxyXFxuXSkqXFwyKD89XFxzKjopL20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0YWxpYXM6ICdwcm9wZXJ0eSdcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnb3BlcmF0b3InLCB7XG5cdCdsaXRlcmFsLXByb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oKD86XnxbLHtdKVsgXFx0XSopKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9tLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0YWxpYXM6ICdwcm9wZXJ0eSdcblx0fSxcbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzY3JpcHQnLCAnamF2YXNjcmlwdCcpO1xuXG5cdC8vIGFkZCBhdHRyaWJ1dGUgc3VwcG9ydCBmb3IgYWxsIERPTSBldmVudHMuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cyNTdGFuZGFyZF9ldmVudHNcblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkQXR0cmlidXRlKFxuXHRcdC9vbig/OmFib3J0fGJsdXJ8Y2hhbmdlfGNsaWNrfGNvbXBvc2l0aW9uKD86ZW5kfHN0YXJ0fHVwZGF0ZSl8ZGJsY2xpY2t8ZXJyb3J8Zm9jdXMoPzppbnxvdXQpP3xrZXkoPzpkb3dufHVwKXxsb2FkfG1vdXNlKD86ZG93bnxlbnRlcnxsZWF2ZXxtb3ZlfG91dHxvdmVyfHVwKXxyZXNldHxyZXNpemV8c2Nyb2xsfHNlbGVjdHxzbG90Y2hhbmdlfHN1Ym1pdHx1bmxvYWR8d2hlZWwpLy5zb3VyY2UsXG5cdFx0J2phdmFzY3JpcHQnXG5cdCk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tZmlsZS1oaWdobGlnaHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuXHRpZiAodHlwZW9mIFByaXNtID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvbWF0Y2hlcyNQb2x5ZmlsbFxuXHRpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcblx0XHRFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXHR9XG5cblx0dmFyIExPQURJTkdfTUVTU0FHRSA9ICdMb2FkaW5n4oCmJztcblx0dmFyIEZBSUxVUkVfTUVTU0FHRSA9IGZ1bmN0aW9uIChzdGF0dXMsIG1lc3NhZ2UpIHtcblx0XHRyZXR1cm4gJ+KcliBFcnJvciAnICsgc3RhdHVzICsgJyB3aGlsZSBmZXRjaGluZyBmaWxlOiAnICsgbWVzc2FnZTtcblx0fTtcblx0dmFyIEZBSUxVUkVfRU1QVFlfTUVTU0FHRSA9ICfinJYgRXJyb3I6IEZpbGUgZG9lcyBub3QgZXhpc3Qgb3IgaXMgZW1wdHknO1xuXG5cdHZhciBFWFRFTlNJT05TID0ge1xuXHRcdCdqcyc6ICdqYXZhc2NyaXB0Jyxcblx0XHQncHknOiAncHl0aG9uJyxcblx0XHQncmInOiAncnVieScsXG5cdFx0J3BzMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQncHNtMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQnc2gnOiAnYmFzaCcsXG5cdFx0J2JhdCc6ICdiYXRjaCcsXG5cdFx0J2gnOiAnYycsXG5cdFx0J3RleCc6ICdsYXRleCdcblx0fTtcblxuXHR2YXIgU1RBVFVTX0FUVFIgPSAnZGF0YS1zcmMtc3RhdHVzJztcblx0dmFyIFNUQVRVU19MT0FESU5HID0gJ2xvYWRpbmcnO1xuXHR2YXIgU1RBVFVTX0xPQURFRCA9ICdsb2FkZWQnO1xuXHR2YXIgU1RBVFVTX0ZBSUxFRCA9ICdmYWlsZWQnO1xuXG5cdHZhciBTRUxFQ1RPUiA9ICdwcmVbZGF0YS1zcmNdOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BREVEICsgJ1wiXSknXG5cdFx0KyAnOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BRElORyArICdcIl0pJztcblxuXHQvKipcblx0ICogTG9hZHMgdGhlIGdpdmVuIGZpbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgVGhlIFVSTCBvciBwYXRoIG9mIHRoZSBzb3VyY2UgZmlsZSB0byBsb2FkLlxuXHQgKiBAcGFyYW0geyhyZXN1bHQ6IHN0cmluZykgPT4gdm9pZH0gc3VjY2Vzc1xuXHQgKiBAcGFyYW0geyhyZWFzb246IHN0cmluZykgPT4gdm9pZH0gZXJyb3Jcblx0ICovXG5cdGZ1bmN0aW9uIGxvYWRGaWxlKHNyYywgc3VjY2VzcywgZXJyb3IpIHtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzIDwgNDAwICYmIHhoci5yZXNwb25zZVRleHQpIHtcblx0XHRcdFx0XHRzdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuXHRcdFx0XHRcdFx0ZXJyb3IoRkFJTFVSRV9NRVNTQUdFKHhoci5zdGF0dXMsIHhoci5zdGF0dXNUZXh0KSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVycm9yKEZBSUxVUkVfRU1QVFlfTUVTU0FHRSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR4aHIuc2VuZChudWxsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJzZXMgdGhlIGdpdmVuIHJhbmdlLlxuXHQgKlxuXHQgKiBUaGlzIHJldHVybnMgYSByYW5nZSB3aXRoIGluY2x1c2l2ZSBlbmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IHJhbmdlXG5cdCAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXIgfCB1bmRlZmluZWRdIHwgdW5kZWZpbmVkfVxuXHQgKi9cblx0ZnVuY3Rpb24gcGFyc2VSYW5nZShyYW5nZSkge1xuXHRcdHZhciBtID0gL15cXHMqKFxcZCspXFxzKig/OigsKVxccyooPzooXFxkKylcXHMqKT8pPyQvLmV4ZWMocmFuZ2UgfHwgJycpO1xuXHRcdGlmIChtKSB7XG5cdFx0XHR2YXIgc3RhcnQgPSBOdW1iZXIobVsxXSk7XG5cdFx0XHR2YXIgY29tbWEgPSBtWzJdO1xuXHRcdFx0dmFyIGVuZCA9IG1bM107XG5cblx0XHRcdGlmICghY29tbWEpIHtcblx0XHRcdFx0cmV0dXJuIFtzdGFydCwgc3RhcnRdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFlbmQpIHtcblx0XHRcdFx0cmV0dXJuIFtzdGFydCwgdW5kZWZpbmVkXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbc3RhcnQsIE51bWJlcihlbmQpXTtcblx0XHR9XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRlbnYuc2VsZWN0b3IgKz0gJywgJyArIFNFTEVDVE9SO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0dmFyIHByZSA9IC8qKiBAdHlwZSB7SFRNTFByZUVsZW1lbnR9ICovIChlbnYuZWxlbWVudCk7XG5cdFx0aWYgKHByZS5tYXRjaGVzKFNFTEVDVE9SKSkge1xuXHRcdFx0ZW52LmNvZGUgPSAnJzsgLy8gZmFzdC1wYXRoIHRoZSB3aG9sZSB0aGluZyBhbmQgZ28gdG8gY29tcGxldGVcblxuXHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0xPQURJTkcpOyAvLyBtYXJrIGFzIGxvYWRpbmdcblxuXHRcdFx0Ly8gYWRkIGNvZGUgZWxlbWVudCB3aXRoIGxvYWRpbmcgbWVzc2FnZVxuXHRcdFx0dmFyIGNvZGUgPSBwcmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQ09ERScpKTtcblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBMT0FESU5HX01FU1NBR0U7XG5cblx0XHRcdHZhciBzcmMgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBlbnYubGFuZ3VhZ2U7XG5cdFx0XHRpZiAobGFuZ3VhZ2UgPT09ICdub25lJykge1xuXHRcdFx0XHQvLyB0aGUgbGFuZ3VhZ2UgbWlnaHQgYmUgJ25vbmUnIGJlY2F1c2UgdGhlcmUgaXMgbm8gbGFuZ3VhZ2Ugc2V0O1xuXHRcdFx0XHQvLyBpbiB0aGlzIGNhc2UsIHdlIHdhbnQgdG8gdXNlIHRoZSBleHRlbnNpb24gYXMgdGhlIGxhbmd1YWdlXG5cdFx0XHRcdHZhciBleHRlbnNpb24gPSAoL1xcLihcXHcrKSQvLmV4ZWMoc3JjKSB8fCBbLCAnbm9uZSddKVsxXTtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBFWFRFTlNJT05TW2V4dGVuc2lvbl0gfHwgZXh0ZW5zaW9uO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgbGFuZ3VhZ2UgY2xhc3Nlc1xuXHRcdFx0UHJpc20udXRpbC5zZXRMYW5ndWFnZShjb2RlLCBsYW5ndWFnZSk7XG5cdFx0XHRQcmlzbS51dGlsLnNldExhbmd1YWdlKHByZSwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHQvLyBwcmVsb2FkIHRoZSBsYW5ndWFnZVxuXHRcdFx0dmFyIGF1dG9sb2FkZXIgPSBQcmlzbS5wbHVnaW5zLmF1dG9sb2FkZXI7XG5cdFx0XHRpZiAoYXV0b2xvYWRlcikge1xuXHRcdFx0XHRhdXRvbG9hZGVyLmxvYWRMYW5ndWFnZXMobGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBsb2FkIGZpbGVcblx0XHRcdGxvYWRGaWxlKFxuXHRcdFx0XHRzcmMsXG5cdFx0XHRcdGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0XHRcdFx0Ly8gbWFyayBhcyBsb2FkZWRcblx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfTE9BREVEKTtcblxuXHRcdFx0XHRcdC8vIGhhbmRsZSBkYXRhLXJhbmdlXG5cdFx0XHRcdFx0dmFyIHJhbmdlID0gcGFyc2VSYW5nZShwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXJhbmdlJykpO1xuXHRcdFx0XHRcdGlmIChyYW5nZSkge1xuXHRcdFx0XHRcdFx0dmFyIGxpbmVzID0gdGV4dC5zcGxpdCgvXFxyXFxuP3xcXG4vZyk7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSByYW5nZSBpcyBvbmUtYmFzZWQgYW5kIGluY2x1c2l2ZSBvbiBib3RoIGVuZHNcblx0XHRcdFx0XHRcdHZhciBzdGFydCA9IHJhbmdlWzBdO1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IHJhbmdlWzFdID09IG51bGwgPyBsaW5lcy5sZW5ndGggOiByYW5nZVsxXTtcblxuXHRcdFx0XHRcdFx0aWYgKHN0YXJ0IDwgMCkgeyBzdGFydCArPSBsaW5lcy5sZW5ndGg7IH1cblx0XHRcdFx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc3RhcnQgLSAxLCBsaW5lcy5sZW5ndGgpKTtcblx0XHRcdFx0XHRcdGlmIChlbmQgPCAwKSB7IGVuZCArPSBsaW5lcy5sZW5ndGg7IH1cblx0XHRcdFx0XHRcdGVuZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGVuZCwgbGluZXMubGVuZ3RoKSk7XG5cblx0XHRcdFx0XHRcdHRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5qb2luKCdcXG4nKTtcblxuXHRcdFx0XHRcdFx0Ly8gYWRkIGRhdGEtc3RhcnQgZm9yIGxpbmUgbnVtYmVyc1xuXHRcdFx0XHRcdFx0aWYgKCFwcmUuaGFzQXR0cmlidXRlKCdkYXRhLXN0YXJ0JykpIHtcblx0XHRcdFx0XHRcdFx0cHJlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcsIFN0cmluZyhzdGFydCArIDEpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBoaWdobGlnaHQgY29kZVxuXHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuXHRcdFx0XHRcdFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoY29kZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdC8vIG1hcmsgYXMgZmFpbGVkXG5cdFx0XHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0ZBSUxFRCk7XG5cblx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0gZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQgPSB7XG5cdFx0LyoqXG5cdFx0ICogRXhlY3V0ZXMgdGhlIEZpbGUgSGlnaGxpZ2h0IHBsdWdpbiBmb3IgYWxsIG1hdGNoaW5nIGBwcmVgIGVsZW1lbnRzIHVuZGVyIHRoZSBnaXZlbiBjb250YWluZXIuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBFbGVtZW50cyB3aGljaCBhcmUgYWxyZWFkeSBsb2FkZWQgb3IgY3VycmVudGx5IGxvYWRpbmcgd2lsbCBub3QgYmUgdG91Y2hlZCBieSB0aGlzIG1ldGhvZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gW2NvbnRhaW5lcj1kb2N1bWVudF1cblx0XHQgKi9cblx0XHRoaWdobGlnaHQ6IGZ1bmN0aW9uIGhpZ2hsaWdodChjb250YWluZXIpIHtcblx0XHRcdHZhciBlbGVtZW50cyA9IChjb250YWluZXIgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IpO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgZWxlbWVudDsgKGVsZW1lbnQgPSBlbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0UHJpc20uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0dmFyIGxvZ2dlZCA9IGZhbHNlO1xuXHQvKiogQGRlcHJlY2F0ZWQgVXNlIGBQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0YCBpbnN0ZWFkLiAqL1xuXHRQcmlzbS5maWxlSGlnaGxpZ2h0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghbG9nZ2VkKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ1ByaXNtLmZpbGVIaWdobGlnaHQgaXMgZGVwcmVjYXRlZC4gVXNlIGBQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0YCBpbnN0ZWFkLicpO1xuXHRcdFx0bG9nZ2VkID0gdHJ1ZTtcblx0XHR9XG5cdFx0UHJpc20ucGx1Z2lucy5maWxlSGlnaGxpZ2h0LmhpZ2hsaWdodC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9O1xuXG59KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCItLS1cXG5kYXRlOiAyMDE5LTA4LTMwXFxudGl0bGU6ICdIb3cgdG8gV3JpdGUgVGV4dCdcXG50ZW1wbGF0ZTogcG9zdFxcbnRodW1ibmFpbDogJy4vdGh1bWJuYWlscy93cml0aW5nLnBuZydcXG5zbHVnOiBob3ctdG8td3JpdGUtdGV4dFxcbmNhdGVnb3JpZXM6IGhlbHBpbmcgdG8gd3JpdGUgdGV4dFxcbnRhZ3M6IGluc3RydWN0aW9uIHRleHRlciB3cml0ZXJcXG4tLS1cXG5cXG4jIyBGb3JtYXR0aW5nIHN5bnRheFxcblxcblRoaXMgaXMgYSBzbWFsbCBndWlkZS4gXFxcIkhvdyB0byB3cml0ZSBtYXJrZG93biB0ZXh0IGFuZCBnZXQgSFRNTCBkb2N1bWVudCBvdXRcXFwiLiBTZWUgY29kZSBvbiBteSBHaXRIdWI6IFttYXJrYWJsZSBwYXJzZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tZXVnZW5vbS9tYXJrYWJsZS10by1odG1sKVxcblxcbiMjIENhcHRpb24gQmxvY2sgYWJvdXQgYXJ0aWNsZVxcblxcbkhvdyB0byB1c2U6IHdyaXRlIGNhcHRpb24gYmxvY2sgbGlrZSB0aGUgZXhhbXBsZSBiZWxvdzpcXG48YnIvPlxcblxcXFwqXFxuLS0tXFxuZGF0ZTogMjAxOS0wOC0zMFxcbnRpdGxlOiAnSW5zdHJ1Y3Rpb24gdG8gV3JpdGUgVGV4dCdcXG50ZW1wbGF0ZTogcG9zdFxcbnRodW1ibmFpbDogJy4vdGh1bWJuYWlscy93cml0aW5nLnBuZydcXG5zbHVnOiBpbnN0cnVjdGlvbi10by13cml0ZS10ZXh0XFxuY2F0ZWdvcmllczogXFxudGFnczogaW5zdHJ1Y3Rpb24gdGV4dGVyIHdyaXRlciBcXG4tLS1cXG5cXFxcKlxcblxcbiMjIEhlYWRpbmdzXFxuXFxuSG93IHRvIHVzZTpcXG5cXFxcKlxcbiMgVGhlIGgxIGhlYWRpbmdcXG4jIyBUaGUgaDIgaGVhZGluZ1xcbiMjIyBUaGUgaDMgaGVhZGluZ1xcbiMjIyMgVGhlIGg0IGhlYWRpbmdcXG4jIyMjIyBUaGUgaDUgaGVhZGluZ1xcblxcXFwqIFxcbjxici8+XFxuIyBUaGUgaDEgaGVhZGluZ1xcbiMjIFRoZSBoMiBoZWFkaW5nXFxuIyMjIFRoZSBoMyBoZWFkaW5nXFxuIyMjIyBUaGUgaDQgaGVhZGluZ1xcbiMjIyMjIFRoZSBoNSBoZWFkaW5nXFxuXFxuIyMgU3R5bGluZyBib2xkIHRleHRcXG5cXG5Ib3cgdG8gdXNlOiBUaGlzIHdvcmQgaXMgXFxcXCogKipzdHJvbmcqKiBhbmQgKip1bmtub3duIGZvciBtZSoqIFxcXFwqXFxuaW4gb3V0OiBUaGlzIHdvcmQgaXMgKipzdHJvbmcqKiBhbmQgKip1bmtub3duIGZvciBtZSoqLlxcblxcbiMjIENvZGUgQmxvY2s6IFxcblxcblxcXFwqXFx0XFx0XFxuYGBgYmFzaFxcbiAgXFx0bGV0IGdldE1pbiA9IGFzeW5jIChtaW4pPT4ge1xcblxcdFxcdHJldHVybiBgXFxuICAgIFxcdFxcdG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuICAgIFxcdGBcXG5cXHR94oCaXFxuYGBgXFxuXFxcXCogXFxuXFxuYGBgYmFzaFxcblxcdGxldCBnZXRNaW4gPSBhc3luYyAobWluKT0+IHtcXG5cXHRcXHRyZXR1cm4gYFxcbiAgICBcXHRcXHRtaW5pbWFsIHZhbHVlIGlzICR7bWlufVxcbiAgICBcXHRcXHRgXFxuXFx0fVxcbmBgYFxcblxcbiMjIENvZGUgSW4gQ29kZSBCbG9ja1xcblxcblxcXFwqXFxuXFx0YGBgYmFzaFxcblxcdFxcdGBgYGphdmFzY3JpcHRcXG5cXHRcXHRcXHRsZXQgZ2V0TWluID0gYXN5bmMgKG1pbik9PiB7XFxuXFx0XFx0XFx0XFx0cmV0dXJuIGBcXG5cXHRcXHRcXHRcXHRcXHRtaW5pbWFsIHZhbHVlIGlzICR7bWlufVxcblxcdFxcdFxcdFxcdFxcdGBcXG5cXHRcXHRcXHR9XFxuXFx0XFx0YGBgXFxuXFx0YGBgXFxuXFxcXCpcXG5cXG5gYGBiYXNoXFxuXFx0YGBgamF2YXNjcmlwdFxcblxcdFxcdGxldCBnZXRNaW4gPSBhc3luYyAobWluKT0+IHtcXG5cXHRcXHRcXHRyZXR1cm4gYFxcblxcdFxcdFxcdFxcdG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuXFx0XFx0XFx0XFx0YFxcblxcdFxcdH1cXG5cXHRgYGBcXG5gYGBcXG5cXG4jIyBDb2RlIElubGluZVxcblxcblxcXFwqXFxuICAgIGB0ZXN0IGlzIGEgb25lIG9mIG1vcmUgb3RoZXIgb3B0aW9uc2BcXG5cXFxcKiBcXG5cXG5pbiBvdXQ6XFxuYHRlc3QgaXMgYSBvbmUgb2YgbW9yZSBvdGhlciBvcHRpb25zYFxcblxcbiMjIExpc3RzXFxuXFxuXFxcXCpcXG5cXHRMaXN0IDEgOlxcblxcdCAgLSBvbmVcXG5cXHQgIC0gdHdvXFxuXFx0ICAtIHRocmVlIGFuZCBtb3JlXFxuXFxuXFx0TGlzdCAyIDpcXG5cXHQgIFtdIG9uZVxcblxcdCAgW10gdHdvXFxuXFx0ICBbXSB0aHJlZSBhbmQgbW9yZVxcblxcblxcdExpc3QgIHNpbXBsZSAzOlxcblxcdCAgW3hdIG9uZVxcblxcdCAgW3hdIHR3b1xcblxcdCAgW3hdIHRocmVlIGFuZCBtb3JlXFxuXFxuXFx0TGlzdCA0IHdpdGggbWl4ZWQgYXR0cmlidXRlczpcXG5cXHQgICAtIG9uZVxcblxcdCAgW10gdHdvXFxuXFx0ICBbeF0gdGhyZWUgYW5kIG1vcmVcXG5cXG5cXFxcKlxcbjxici8+XFxuaW4gb3V0Olxcbjxici8+XFxuTGlzdCAxOlxcblxcdC0gb25lXFxuXFx0LSB0d29cXG5cXHQtIHRocmVlIGFuZCBtb3JlXFxuPGJyLz5cXG5MaXN0IDI6XFxuXFx0W10gb25lXFxuXFx0W10gdHdvXFxuXFx0W10gdGhyZWUgYW5kIG1vcmVcXG48YnIvPlxcbkxpc3QgMzpcXG5cXHRbeF0gb25lXFxuXFx0W3hdIHR3b1xcblxcdFt4XSB0aHJlZSBhbmQgbW9yZVxcbjxici8+XFxuTGlzdCA0IHdpdGggbWl4ZWQgYXR0cmlidXRlczpcXG5cXHQtIG9uZVxcblxcdFtdIHR3b1xcblxcdFt4XSB0aHJlZSBhbmQgbW9yZVxcblxcblxcbiMjIFRhYmxlXFxuXFxuXFxcXCpcXG58IE5hbWUgfCBBZ2UgfCBBdXRvIHwgVG93biB8IFBldCB8XFxufCBCb2IgfCAxNyB8IEJNVyB8IEJha3UgfCBGaXNoIHxcXG58IEpvaG4gfCA1MiB8IEZpYXQgfCBCZXJsaW4gfCBEb2cgfFxcbnwgTGlzYSB8IDMyIHwgVG95b3RhIHwgRnJhbmtmdXJ0IHwgU25ha2UgfFxcbnwgRXVnZW4gfCA0NSB8IE1hemRhIHwgRHJlc2RlbiB8IENhdCB8IFxcblxcXFwqXFxuXFxuPGJyLz5cXG5cXG58IE5hbWUgfCBBZ2UgfCBBdXRvIHwgVG93biB8IFBldCB8XFxufCBCb2IgfCAxNyB8IEJNVyB8IEJha3UgfCBGaXNoIHxcXG58IEpvaG4gfCA1MiB8IEZpYXQgfCBCZXJsaW4gfCBEb2cgfFxcbnwgTGlzYSB8IDMyIHwgVG95b3RhIHwgRnJhbmtmdXJ0IHwgU25ha2UgfFxcbnwgRXVnZW4gfCA0NSB8IE1hemRhIHwgRHJlc2RlbiB8IENhdCB8XFxuXFxuXFxuIyMgUXVvdGluZyB0ZXh0XFxuXFxuXFxcXCpcXG4gICAgPiBRdW90ZVxcbiAgICA+IDxjaXRlPiAtIEF1dGhvciA8L2NpdGU+XFxuXFxcXCogXFxuXFxuaW4gb3V0Olxcblxcbj4gRXhhbXBsZSBRdW90ZVxcbj4gPGNpdGU+IC0gQWxiZXJ0IFJvdWdlIDwvY2l0ZT5cXG5cXG4jIyBMaW5rc1xcblxcbllvdSBjYW4gY3JlYXRlIGFuIGlubGluZSBsaW5rIGJ5IHdyYXBwaW5nIGxpbmsgdGV4dCBpbiBicmFja2V0cywgYW5kIHRoZW4gd3JhcHBpbmcgdGhlIFVSTCBpbiBwYXJlbnRoZXNlczpcXG5cXG5cXFxcKlxcblxcdFRoaXMgc2l0ZSB3YXMgYnVpbHQgdXNpbmcgW0phdmFzY3JpcHQgRVM2XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FQ01BU2NyaXB0KSAgYW5kIGl0J3MgYW4gZXhhbXBsZS5cXG5cXFxcKiBcXG5cXG5pbiBvdXQ6XFxuXFxuVGhpcyBzaXRlIHdhcyBidWlsdCB1c2luZyBbSmF2YXNjcmlwdCBFUzZdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0VDTUFTY3JpcHQpIGFuZCBpdCdzIGFuIGV4YW1wbGUuXFxuXFxuW0hvdyB0byBkZWZpbmUgdHlwZXMgZm9yIHByb2Nlc3MgZW52aXJvbm1lbnRdKGh0dHBzOi8vbWV1Z2Vub20uY29tLyMvYXJ0aWNsZS9ob3ctdG8tZGVmaW5lLXR5cGVzLWZvci1wcm9jZXNzLWVudmlyb25tZW50KVxcblxcblxcbiMjIFNpbXBsZSBVbmRlcmxpbmUgZGVjb3JhdGlvblxcblxcbi8qIF91bmRlcmRhc2hfIC8qXFxuXFxuaW4gb3V0Olxcblxcbl91bmRlcmRhc2hfXFxuXFxuIyMgQ29sb3IgVW5kZXJsaW5lIGRlY29yYXRpb25cXG5cXG5cXFxcKlxcblxcdEJsdWUuYmx1ZSBjb2xvclxcblxcdEdyYXkuZ3JheSBjb2xvclxcblxcdFJlZC5yZWQgY29sb3JcXG5cXHRHcmVlbi5ncmVlbiBjb2xvclxcblxcdFllbGxvdy55ZWxsb3cgY29sb3JcXG5cXHRJbmRpZ28uaW5kaWdvIGNvbG9yIFxcblxcdFB1cnBsZS5wdXJwbGUgY29sb3JcXG5cXHRQaW5rLnBpbmsgY29sb3JcXG5cXFxcKlxcblxcbmluIG91dDpcXG5cXG5Mb3JlbS5ncmVlbiBpcHN1bS5pbmRpZ28gZG9sb3IucmVkIHNpdCBhbWV0LnB1cnBsZSAsIGNvbnNlY3RldHVyLnBpbmsgYWRpcGlzaWNpbmcueWVsbG93IGVsaXQuIFxcblxcbiMjIENvbG9yIEJhZGdlc1xcblxcblxcXFwqXFxuXFx0Qmx1ZUBibHVlIGNvbG9yXFxuXFx0R3JheUBncmF5IGNvbG9yXFxuXFx0UmVkQHJlZCBjb2xvclxcblxcdEdyZWVuQGdyZWVuIGNvbG9yXFxuXFx0WWVsbG93QHllbGxvdyBjb2xvclxcblxcdEluZGlnb0BpbmRpZ28gY29sb3IgXFxuXFx0UHVycGxlQHB1cnBsZSBjb2xvclxcblxcdFBpbmtAcGluayBjb2xvclxcblxcXFwqIFxcblxcbmluIG91dDpcXG5cXG5Mb3JlbUBncmVlbiBpcHN1bUBpbmRpZ28gZG9sb3JAcmVkIHNpdCBhbWV0QHB1cnBsZSAsIGNvbnNlY3RldHVyQHBpbmsgYWRpcGlzaWNpbmdAeWVsbG93IGVsaXQuXFxuXFxuIyMgSWdub3JpbmcgTWFya2Rvd24gZm9ybWF0dGluZ1xcblxcbllvdSBjYW4gaWdub3JlIChvciBlc2NhcGUpIE1hcmtkb3duIGZvcm1hdHRpbmc6XFxuPGJyLz5cXG5cXFxcKiB0aGlzICoqYWxsKioqIHRleHQgaXMgIyMjIHVubWFya2FibGUgXFxcXCpcXG50aGlzIGlzIFxcXFwqIHVubWFya2FibGUgXFxcXCogdGV4dFxcbkFib3V0IFxcXFwqIHRoaXMgPlF1b3RlIFxcXFwqXFxuXFxuIyMgSW1hZ2VzXFxuXFxuXFxcXCogIVtHaXRodWJfaW1hZ2VdKC4vaW1hZ2VzL2dpdGh1Yi5wbmcpIFxcXFwqXFxuXFxuaW4gb3V0OlxcblxcblRoaXMgaXMgYW4gIVtHaXRodWIgaW1hZ2VdKC4vaW1hZ2VzL2dpdGh1Yi5wbmcpXFxuXCI7IiwiLyoqXG4gKiBBdXRob3I6IG1ldWdlbm9tLmNvbVxuICogRGF0ZTogMTkuMDMuMjAyM1xuICogUmVmYWN0b3JlZDogMTkuMDMuMjAyMyBcbiAqL1xuXG5pbXBvcnQgeyBHcmFtbWFyIH0gZnJvbSBcIi4vR3JhbW1hclwiXG5pbXBvcnQgeyBjYXB0aW9uVG9rZW4gfSBmcm9tIFwiLi9Ub2tlblwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIENhcHRpb24ge1xuXG5cdHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IodGV4dDogc3RyaW5nKSB7XG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0fVxuXG5cdHB1YmxpYyBnZXQoKTogY2FwdGlvblRva2VuIHtcblxuXHRcdGNvbnN0IG1hdGNoID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNBUFRJT04pO1xuXHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2FwdGlvbiBmb3JtYXRcIik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgW1xuXHRcdFx0LCAvLyBJZ25vcmUgdGhlIGZpcnN0IGVsZW1lbnRcblx0XHRcdHJvdyxcblx0XHRcdGRhdGUsXG5cdFx0XHR0aXRsZSxcblx0XHRcdCxcblx0XHRcdHRlbXBsYXRlLFxuXHRcdFx0LFxuXHRcdFx0dGh1bWJuYWlsLFxuXHRcdFx0LFxuXHRcdFx0c2x1Zyxcblx0XHRcdCxcblx0XHRcdGNhdGVnb3JpZXMsXG5cdFx0XHQsXG5cdFx0XHR0YWdzLFxuXHRcdF0gPSBtYXRjaDtcblxuXHRcdGNvbnN0IHRva2VuOiBjYXB0aW9uVG9rZW4gPSB7XG5cdFx0XHR0eXBlOiBUb2tlblR5cGUuQ0FQVElPTixcblx0XHRcdHJvdyxcblx0XHRcdGRhdGU6IGRhdGUgYXMgc3RyaW5nLFxuXHRcdFx0dGl0bGU6IHRpdGxlIGFzIHN0cmluZyxcblx0XHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZSBhcyBzdHJpbmcsXG5cdFx0XHR0aHVtYm5haWw6IHRodW1ibmFpbCBhcyBzdHJpbmcsXG5cdFx0XHRzbHVnOiBzbHVnIGFzIHN0cmluZyxcblx0XHRcdGNhdGVnb3JpZXM6IGNhdGVnb3JpZXMgYXMgc3RyaW5nLFxuXHRcdFx0dGFnczogdGFncyBhcyBzdHJpbmcsXG5cdFx0fTtcblx0XHRcblx0XHQvL3JlbW92ZSBjYXB0aW9uIGZyb20gdGV4dFxuXHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKEdyYW1tYXIuQkxPQ0tTLkNBUFRJT04sIFwiXCIpO1xuXG5cdFx0cmV0dXJuIHRva2VuO1xuXG5cdH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEdyYW1tYXJcbiAqIFRoaXMgaXMgYSBjbGFzcyB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgcmVndWxhciBleHByZXNzaW9ucyB1c2VkIGluIHRoZSBwYXJzZXIuXG4gKiBcbiAqL1xuZXhwb3J0IGNsYXNzIEdyYW1tYXIge1xuXG5cdHB1YmxpYyBzdGF0aWMgQkxPQ0tTID0ge1xuXG5cdFx0Ly8gaGVhZGluZ+KAmlxuXHRcdEhFQURJTkc6IC9bXlxcU10oI3sxLDZ9KShbXlxcblxcKVxcL10rKS9nLFxuXHRcdEhFQURJTkdfTEVWRUw6IC8oI3sxLDV9KS9nLFxuXG5cdFx0Ly8gY2FwdGlvblxuXHRcdENBUFRJT046IC9eLS0tXFxzZGF0ZTooKC4qKSlcXHN0aXRsZTooKC4qKSlcXHN0ZW1wbGF0ZTooKC4qKSlcXHN0aHVtYm5haWw6KCguKikpXFxzc2x1ZzooKC4qKSlcXHNjYXRlZ29yaWVzOigoLiopKVxcc3RhZ3M6KCguKikpXFxzLS0tLyxcblxuXHRcdFNQQUNFOiAvIC8sXG5cdFx0TElORTogL1xcbi8sXG5cblx0XHQvLyBjb2xvciBsaW5lIFxuXHRcdENPTE9SOiAvKCguPylbXlxcc10rKVxcLihibHVlfGdyYXl8cmVkfGdyZWVufHllbGxvd3xpbmRpZ298cHVycGxlfHBpbmspL2csXG5cblx0XHQvLyBiYWRnZVxuXHRcdEJBREdFOiAvKCguPylbXlxcc10rKVxcQChibHVlfGdyYXl8cmVkfGdyZWVufHllbGxvd3xpbmRpZ298cHVycGxlfHBpbmspL2csXG5cblx0XHQvLyBsaXN0XHRcdFxuXHRcdExJU1Q6IC9cXFMuKjpcXG4oXFxzKigtfFxcW1xcXXxcXFsuXFxdKVxccypcXFMuKil7MSwyMH0vZyxcblxuXHRcdExJU1RfQVRUUklCVVRFOiAvKC18XFxbXFxdfFxcW3hcXF0pL2csXG5cblxuXHRcdC8vIGNvZGUgYmxvY2tcblx0XHRDT0RFX0JMT0NLOiAvXFxgXFxgXFxgKHB5dGhvbnxiYXNofGphdmF8amF2YXNjcmlwdHx0eXBlc2NyaXB0fHN3aWZ0KShbXihcXGApezN9XS4qXFxuKXsxLDIwMH1cXGBcXGBcXGAvZyxcblx0XHRDT0RFX0JMT0NLX0xBTkc6IC9bXlxcYFxcYFxcYF0oXFx3KylcXG4vZ3MsXG5cdFx0Q09ERV9CTE9DS19CT0RZOiAvXFxuKFtcXHNcXFNdKylbXlxcYFxcYFxcYF0vZ3MsXG5cblx0XHQvLyBjb2RlIGluIGNvZGUgYmxvY2tcblx0XHRDT0RFX0lOX0NPREU6IC9cXGBcXGBcXGAocHl0aG9ufGJhc2h8amF2YXxqYXZhc2NyaXB0fHR5cGVzY3JpcHR8c3dpZnQpXFxuKFteXFxgXFxgXFxgXSspXFxgXFxgXFxgKHB5dGhvbnxiYXNofGphdmF8amF2YXNjcmlwdHx0eXBlc2NyaXB0fHN3aWZ0KVxcbihbXlxcYFxcYFxcYF0rKVxcYFxcYFxcYFxcblxcYFxcYFxcYFxcbi9nLFxuXHRcdElOTElORV9DT0RFOiAvKFteXFxgXFxgXFxgXSspL2dzLFxuXHRcdElOTElORV9DT0RFX1BBUkFNUzogLyhbXlxcbl0rKS9zZyxcblxuXHRcdC8vIGlubGluZSBjb2RlXG5cdFx0SU5MSU5FX0NPREVfQkxPQ0s6IC9cXGAoXFxTKS4qW15cXGBdXFxgL2csXG5cblx0XHQvLyBxdW90ZVxuXHRcdFFVT1RFOiAvPlteXFxuXS4qXFxuKFxccyl7MCwxMH0+IDxjaXRlPiAtIFteXFxuXSsvZyxcblx0XHRRVU9URV9QQVJBTVM6IC9bXjw+XSsvZyxcblxuXHRcdC8vIGxpbmtzXG5cdFx0TElOSzogL1teIV1cXFsoW14pXVxcUy4rKVxcXVxcKGh0dHBzOlxcL1xcL1xcUy4rXFwpL2csXG5cdFx0TElOS19OQU1FOiAvXFxbXFxTLitcXF0vZyxcblx0XHRMSU5LX1VSTDogL1xcKFxcUy4rXFwpL2csXG5cblx0XHQvLyBpbWFnZXNcblx0XHRJTUFHRTogLyFcXFsoW14pXSspXFxdXFwoXFxTK1xcKS9nLFxuXHRcdElNQUdFX05BTUU6IC8hXFxbXFxTLitcXF0vZyxcblx0XHRJTUFHRV9VUkw6IC9cXChcXFMuK1xcKS9nLFxuXG5cdFx0Ly8gaG9yaXpvbnRhbCBsaW5lXG5cdFx0VU5ERVJfTElORTogLyhfezF9KShbXl8uXSspKF97MX0pL2csXG5cblx0XHRVTk1BUktBQkxFOiAvXFxcXFxcKlxcc1teXFxcXF0rXFxcXFxcKi9nLFxuXG5cdFx0Ly8gYm9sZCB0ZXh0XG5cdFx0U1RST05HOiAvXFwqXFwqKFtcXHd8XFxzXSspXFwqXFwqL2csXG5cdFx0U1RST05HX1RFWFQ6IC9bXlxcKl0rL2csXG5cblxuXHRcdC8vIHRhYmxlXG5cdFx0VEFCTEU6IC8oKFxcfFtcXHdcXGRcXHNdKykrXFx8KS9nLFxuXG5cdFx0UEFSQUdSQVBIOiAvKFteXFxuXSspL2csXG5cblx0XHRUT0tFTjogL1xcJHRva2VuLihcXFN7MzV9W15cXHNcXC5cXCpcXGBdKS9nLFxuXG5cdFx0VFhUX1RPS0VOOiAvW15cXCR0b2tlbi5cXHdcXGItXShcXHcpKy9nLFxuXHR9XG59XG4iLCJpbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi9Ub2tlblwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxudHlwZSBBU1QgPSB7XG5cdHR5cGU6IHN0cmluZyxcblx0Y2hpbGRyZW4/OiBhbnlbXVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VyIHtcblxuXHRwdWJsaWMgdG9rZW5zID0gIFtdIGFzIChUb2tlbi5iYWdkZVRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uY2FwdGlvblRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uY29kZUJsb2NrVG9rZW4gfFxuXHRcdFx0XHRcdFRva2VuLmNvZGVJbmxpbmVUb2tlbiB8IFxuXHRcdFx0XHRcdFRva2VuLmNvbG9yVGV4dFRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uaGVhZFRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uaW1hZ2VUb2tlbiB8XG5cdFx0XHRcdFx0VG9rZW4ubGlua1Rva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4ubGlzdFRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4ucGFyYWdyYXBoRW5kVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuIHxcblx0XHRcdFx0XHRUb2tlbi5xdW90ZVRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uc3Ryb25nVGV4dFRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4udGV4dFRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4udW5kZXJMaW5lVG9rZW4gfFxuXHRcdFx0XHRcdFRva2VuLnVua25vd25UZXh0VG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5jb2RlSW5Db2RlVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi50YWJsZVRva2VuXG5cdFx0XHRcdClbXTtcblx0XG5cdHB1YmxpYyBhc3Q6IEFTVDtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbnMgOiBhbnkpIHtcblxuXHRcdHRoaXMudG9rZW5zID0gdG9rZW5zO1xuXHRcdHRoaXMuYXN0ID0ge1xuXHRcdFx0dHlwZTogXCJEb2N1bWVudFwiLFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cdFx0fTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKTp2b2lkIHtcblxuXHRcdGxldCB0b2tlbl9udW1iZXI6IG51bWJlcjtcblx0XHR0b2tlbl9udW1iZXIgPSAwO1xuXHRcdGxldCBpc1BhcmFncmFwaDogYm9vbGVhbjtcblx0XHRpc1BhcmFncmFwaCA9IGZhbHNlO1xuXHRcdFxuXHRcdGNvbnN0IGNoaWxkcmVuIDogYW55ID0gdGhpcy5hc3QuY2hpbGRyZW47XG5cblx0XHR3aGlsZSAodG9rZW5fbnVtYmVyIDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG5cblx0XHRcdGNvbnN0IHRva2VuIDogYW55ID0gdGhpcy50b2tlbnNbdG9rZW5fbnVtYmVyXTtcblx0XHRcdC8vY29uc29sZS5sb2codG9rZW4pXG5cblx0XHRcdC8vIENhcHRpb25cblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuQ0FQVElPTikge1x0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGNhcHRpb25FbGVtZW50ID0gIHt9IGFzIFRva2VuLmNhcHRpb25Ub2tlbjtcblx0XHRcdFx0Y2FwdGlvbkVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5DQVBUSU9OOyBcblx0XHRcdFx0Y2FwdGlvbkVsZW1lbnQucm93ID0gdG9rZW4ucm93O1xuXHRcdFx0XHRjYXB0aW9uRWxlbWVudC5jaGlsZHJlbiA9IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkNhcHRpb25cIixcblx0XHRcdFx0XHRcdGRhdGU6IHRva2VuLmRhdGUsXG5cdFx0XHRcdFx0XHR0aXRsZTogdG9rZW4udGl0bGUsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogdG9rZW4udGVtcGxhdGUsXG5cdFx0XHRcdFx0XHR0aHVtYm5haWw6IHRva2VuLnRodW1ibmFpbCxcblx0XHRcdFx0XHRcdHNsdWc6IHRva2VuLnNsdWcsXG5cdFx0XHRcdFx0XHRjYXRlZ29yaWVzOiB0b2tlbi5jYXRlZ29yaWVzLFxuXHRcdFx0XHRcdFx0dGFnczogdG9rZW4udGFnc1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XTtcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goY2FwdGlvbkVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyAjIGRlcHQ9MVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX0ZJUlNUKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gMTtcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vICMjIGRlcHQgPSAyXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gVG9rZW5UeXBlLkhFQURJTkdfU0VDT05EKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gMjtcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjI1wiICsgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlblR5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goaGVhZEVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAjIyMgZGVwdCA9IDNcblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuSEVBRElOR19USElSRCkge1xuXG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gMztcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjIyNcIiArIHRva2VuLnZhbHVlO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5jaGlsZHJlbiA9IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5UeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1dXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdC8vICMjIyMgZGVwdCA9IDRcblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuSEVBRElOR19GT1JUSCkge1xuXHRcdFx0XHRjb25zdCBoZWFkRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5oZWFkVG9rZW47XG5cdFx0XHRcdGhlYWRFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuSEVBRElORztcblx0XHRcdFx0aGVhZEVsZW1lbnQuZGVwdCA9IDQ7XG5cdFx0XHRcdGhlYWRFbGVtZW50LnJvdyA9IFwiIyMjI1wiICsgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlblR5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goaGVhZEVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAjIyMjIyBkZXB0ID0gNVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX0ZJRlRIKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gNTtcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjIyMjI1wiICsgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlblR5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goaGVhZEVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRcblxuXHRcdFx0Ly9Db2RlSW5Db2RlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuQ09ERV9JTl9DT0RFKSB7XG5cblx0XHRcdFx0Y29uc3QgY29kZUluQ29kZUVsZW1lbnQgPSAge30gYXMgVG9rZW4uY29kZUluQ29kZVRva2VuO1xuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkNPREVfSU5fQ09ERTtcblx0XHRcdFx0Y29kZUluQ29kZUVsZW1lbnQucm93ID0gXCJgYGBcIit0b2tlbi5sYW5ndWFnZSArIFwiXFxuXCIgKyB0b2tlbi5jb2RlICsgXCJcXG5gYGBcIjtcblxuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC5jb2RlID0gdG9rZW4uY29kZTtcblx0XHRcdFx0Y29kZUluQ29kZUVsZW1lbnQubGFuZ3VhZ2UgPSB0b2tlbi5sYW5ndWFnZVx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjb2RlSW5Db2RlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vQ29kZUJsb2NrXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuQ09ERV9CTE9DSykge1xuXG5cdFx0XHRcdGNvbnN0IGNvZGVCbG9ja0VsZW1lbnQgPSAge30gYXMgVG9rZW4uY29kZUJsb2NrVG9rZW47XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5DT0RFX0JMT0NLO1xuXHRcdFx0XHRjb2RlQmxvY2tFbGVtZW50LnJvdyA9IFwiYGBgXCIrdG9rZW4ubGFuZ3VhZ2UgKyBcIlxcblwiICsgdG9rZW4uY29kZSArIFwiXFxuYGBgXCI7XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQuY29kZSA9IHRva2VuLmNvZGU7XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQubGFuZ3VhZ2UgPSB0b2tlbi5sYW5ndWFnZVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjb2RlQmxvY2tFbGVtZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XG5cblx0XHRcdC8vUXVvdGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5RVU9URSkge1xuXG5cdFx0XHRcdGNvbnN0IHF1b3RlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5xdW90ZVRva2VuO1xuXHRcdFx0XHRxdW90ZUVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5RVU9URTtcblx0XHRcdFx0cXVvdGVFbGVtZW50LnJvdyA9IFwiPlwiICsgdG9rZW4ucXVvdGUgKyBcIlxcbj4gPGNpdGU+IC0gXCIgKyB0b2tlbi5hdXRob3IgKyBcIjwvY2l0ZT5cIjtcblx0XHRcdFx0cXVvdGVFbGVtZW50LnF1b3RlID0gdG9rZW4ucXVvdGU7XG5cdFx0XHRcdHF1b3RlRWxlbWVudC5hdXRob3IgPSB0b2tlbi5hdXRob3I7XG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKHF1b3RlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vTGlzdFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkxJU1QpIHtcblx0XHRcdFx0Y29uc3QgbGlzdEVsZW1lbnQgPSAge30gYXMgVG9rZW4ubGlzdFRva2VuO1xuXHRcdFx0XHRsaXN0RWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkxJU1Q7XG5cdFx0XHRcdGxpc3RFbGVtZW50LmF0dHJpYnV0ZSA9IHRva2VuLmF0dHJpYnV0ZTtcblx0XHRcdFx0bGlzdEVsZW1lbnQucm93ID0gdG9rZW4uYXR0cmlidXRlICsgXCIgXCIrdG9rZW4udmFsdWU7XG5cdFx0XHRcdGxpc3RFbGVtZW50LnZhbHVlID0gdG9rZW4udmFsdWU7IFxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChsaXN0RWxlbWVudClcblx0XHRcdH1cblxuXHRcdFx0Ly9UYWJsZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlRBQkxFKSB7XG5cdFx0XHRcdGNvbnN0IHRhYmxlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi50YWJsZVRva2VuO1xuXHRcdFx0XHR0YWJsZUVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5UQUJMRTtcblx0XHRcdFx0dGFibGVFbGVtZW50LnJvdyA9IHRva2VuLnJvdztcblx0XHRcdFx0dGFibGVFbGVtZW50LmNoaWxkcmVuID0gdG9rZW4uY2hpbGRyZW47XG5cblx0XHRcdFx0Y2hpbGRyZW4ucHVzaCh0YWJsZUVsZW1lbnQpXG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9TdGFydCBhbGwgdGhhdCBpbiB0aGUgcGFyYWdyYXBoIGNhbiB1c2Vcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5QQVJBR1JBUEhfU1RBUlQpIHtcblx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRFbGVtZW50ID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRcdFx0cGFyYWdyYXBoU3RhcnRFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIO1xuXHRcdFx0XHRwYXJhZ3JhcGhTdGFydEVsZW1lbnQuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0cGFyYWdyYXBoU3RhcnRFbGVtZW50LnJvdyA9IFwiXCI7XG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKHBhcmFncmFwaFN0YXJ0RWxlbWVudCk7XG5cdFx0XHRcdGlzUGFyYWdyYXBoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSF9FTkQpIHtcblx0XHRcdFx0aXNQYXJhZ3JhcGggPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly9MaW5rXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuTElOSykge1xuXHRcdFx0XHRjb25zdCBsaW5rRWxlbWVudCA9IHt9IGFzIFRva2VuLmxpbmtUb2tlbjtcblx0XHRcdFx0bGlua0VsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5MSU5LO1xuXHRcdFx0XHRsaW5rRWxlbWVudC5uYW1lID0gdG9rZW4ubmFtZTtcblx0XHRcdFx0bGlua0VsZW1lbnQudXJsID0gdG9rZW4udXJsO1xuXHRcdFx0XHRsaW5rRWxlbWVudC5yb3cgPSBcIltcIiArIHRva2VuLm5hbWUgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2gobGlua0VsZW1lbnQpXG5cdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyBcIltcIiArIHRva2VuLm5hbWUgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2gobGlua0VsZW1lbnQpXG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXG5cdFx0XHQvL0ltYWdlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkltYWdlXCIgJiYgaXNQYXJhZ3JhcGggPT0gdHJ1ZSkge1xuXHRcdFx0XHRjb25zdCBpbWFnZVRva2VuID0ge30gYXMgVG9rZW4uaW1hZ2VUb2tlbjtcblx0XHRcdFx0aW1hZ2VUb2tlbi50eXBlID0gVG9rZW5UeXBlLklNQUdFO1xuXHRcdFx0XHRpbWFnZVRva2VuLmFsdCA9IHRva2VuLmFsdDtcblx0XHRcdFx0aW1hZ2VUb2tlbi51cmwgPSB0b2tlbi51cmw7XG5cdFx0XHRcdGltYWdlVG9rZW4ucm93ID0gXCIhW1wiICsgdG9rZW4uYWx0ICsgXCJdKFwiICsgdG9rZW4udXJsICsgXCIpXCJcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpIHtcblx0XHRcdFx0XHRjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGltYWdlVG9rZW4pXG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIFwiW1wiICsgdG9rZW4uYWx0ICsgXCJdKFwiICsgdG9rZW4udXJsICsgXCIpXCJcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGltYWdlVG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGV4dFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlRFWFQpIHtcblx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHR0ZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHR0ZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0dGV4dFRva2VuLnJvdyA9IHRva2VuLnZhbHVlXG5cblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKHRleHRUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHRleHRUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH1cblxuXHRcdFx0Ly8gVW5tYXJrYWJsZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlVOTUFSS0FCTEUpIHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0b2tlbilcblx0XHRcdFx0Y29uc3QgdW5tYXJrYWJsZVRleHRUb2tlbiA9IHt9IGFzIFRva2VuLnVubWFya2FibGVUb2tlbjtcblx0XHRcdFx0dW5tYXJrYWJsZVRleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlVOTUFSS0FCTEU7XG5cdFx0XHRcdHVubWFya2FibGVUZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0dW5tYXJrYWJsZVRleHRUb2tlbi5yb3cgPSBcIlxcXFxcIiArIHRva2VuLnZhbHVlICsgXCJcXFxcXCI7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2godW5tYXJrYWJsZVRleHRUb2tlbilcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHVubWFya2FibGVUZXh0VG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XG5cdFx0XHQvLyBTdHJvbmdcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5TVFJPTkcpIHtcblx0XHRcdFx0Y29uc3Qgc3Ryb25nVGV4dFRva2VuID0ge30gYXMgVG9rZW4uc3Ryb25nVGV4dFRva2VuXG5cdFx0XHRcdHN0cm9uZ1RleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlNUUk9ORztcblx0XHRcdFx0c3Ryb25nVGV4dFRva2VuLnZhbHVlID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdHN0cm9uZ1RleHRUb2tlbi5yb3cgPSBcIioqXCIgKyB0b2tlbi52YWx1ZSArIFwiKipcIlxuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKHN0cm9uZ1RleHRUb2tlbilcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHN0cm9uZ1RleHRUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0fVx0XG5cblx0XHRcdC8vIENvbG9yIHRleHRcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiQ29sb3JcIikge1xuXG5cdFx0XHRcdGNvbnN0IGNvbG9yVGV4dFRva2VuID0ge30gYXMgVG9rZW4uY29sb3JUZXh0VG9rZW47XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuQ09MT1I7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLmNvbG9yID0gdG9rZW4uY29sb3I7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnZhbHVlID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdGNvbG9yVGV4dFRva2VuLnJvdyA9IHRva2VuLnZhbHVlICsgXCIuXCIgKyB0b2tlbi5jb2xvcjtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChjb2xvclRleHRUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlICtcIi5cIit0b2tlbi5jb2xvciBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGNvbG9yVGV4dFRva2VuKVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbG9yIGJhZGdlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBcIkJhZGdlXCIpIHtcblxuXHRcdFx0XHRjb25zdCBiYWRnZVRva2VuID0ge30gYXMgVG9rZW4uYmFnZGVUb2tlbjtcblx0XHRcdFx0YmFkZ2VUb2tlbi50eXBlID0gVG9rZW5UeXBlLkJBREdFO1xuXHRcdFx0XHRiYWRnZVRva2VuLmNvbG9yID0gdG9rZW4uY29sb3I7XG5cdFx0XHRcdGJhZGdlVG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0YmFkZ2VUb2tlbi5yb3cgPSB0b2tlbi52YWx1ZSArIFwiQFwiICsgdG9rZW4uY29sb3I7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goYmFkZ2VUb2tlbilcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlICtcIkBcIit0b2tlbi5jb2xvciBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGJhZGdlVG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdC8vIElubGluZUNvZGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOTElORSkge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRva2VuKVxuXHRcdFx0XHRjb25zdCBpbmxpbmVDb2RlRWxlbWVudCA9IHt9IGFzIFRva2VuLmNvZGVJbmxpbmVUb2tlbjtcblx0XHRcdFx0aW5saW5lQ29kZUVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5DT0RFX0lOTElORTtcblx0XHRcdFx0aW5saW5lQ29kZUVsZW1lbnQudmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aW5saW5lQ29kZUVsZW1lbnQucm93ID0gdG9rZW4udmFsdWU7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goaW5saW5lQ29kZUVsZW1lbnQpXG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIHRva2VuLnZhbHVlXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGlubGluZUNvZGVFbGVtZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVbmRlckxpbmVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5VTkRFUl9MSU5FKSB7XG5cdFx0XHRcdGNvbnN0IHVuZGVyTGluZUVsZW1lbnQgPSB7fSBhcyBUb2tlbi51bmRlckxpbmVUb2tlbjtcblx0XHRcdFx0dW5kZXJMaW5lRWxlbWVudC50eXBlID0gIFRva2VuVHlwZS5VTkRFUl9MSU5FO1xuXHRcdFx0XHR1bmRlckxpbmVFbGVtZW50LnZhbHVlID0gIHRva2VuLnZhbHVlO1xuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2godW5kZXJMaW5lRWxlbWVudClcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Y2hpbGRyZW4ucHVzaCh1bmRlckxpbmVFbGVtZW50KVxuXHRcdFx0XHR9XHRcblx0XHRcdH1cblxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcInRva2VuIG51bWJlclwiLCB0b2tlbl9udW1iZXIpXG5cdFx0XHQvL2NvbnNvbGUubG9nKGNoaWxkcmVuKVxuXG5cdFx0XHR0b2tlbl9udW1iZXIrKztcblxuXHRcdH1cblxuXG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7IEdyYW1tYXIgfSBmcm9tIFwiLi9HcmFtbWFyXCJcbmltcG9ydCB7IENhcHRpb24gfSBmcm9tIFwiLi9DYXB0aW9uXCJcbmltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuL1Rva2VuXCI7XG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbi8qKlxuICogXG4gKi9cblxuZXhwb3J0IGNsYXNzIFRva2VuaXplciB7XG5cblx0cHVibGljIHRva2VucyA9IFtdIGFzIChUb2tlbi5iYWdkZVRva2VuXG5cdFx0fCBUb2tlbi5jYXB0aW9uVG9rZW5cblx0XHR8IFRva2VuLmNvZGVCbG9ja1Rva2VuXG5cdFx0fCBUb2tlbi5jb2RlSW5saW5lVG9rZW5cblx0XHR8IFRva2VuLmNvbG9yVGV4dFRva2VuXG5cdFx0fCBUb2tlbi5oZWFkVG9rZW5cblx0XHR8IFRva2VuLmltYWdlVG9rZW5cblx0XHR8IFRva2VuLmxpbmtUb2tlblxuXHRcdHwgVG9rZW4ubGlzdFRva2VuXG5cdFx0fCBUb2tlbi5wYXJhZ3JhcGhFbmRUb2tlblxuXHRcdHwgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlblxuXHRcdHwgVG9rZW4ucXVvdGVUb2tlblxuXHRcdHwgVG9rZW4uc3Ryb25nVGV4dFRva2VuXG5cdFx0fCBUb2tlbi50ZXh0VG9rZW5cblx0XHR8IFRva2VuLnVuZGVyTGluZVRva2VuXG5cdFx0fCBUb2tlbi51bmtub3duVGV4dFRva2VuXG5cdFx0fCBUb2tlbi5jb2RlSW5Db2RlVG9rZW5cblx0XHR8IFRva2VuLnVubWFya2FibGVUb2tlblxuXHRcdHwgVG9rZW4udGFibGVUb2tlblxuXHQpW107XG5cblx0cHVibGljIHRleHQ6IHN0cmluZztcdFxuXHRwcml2YXRlIHRva2Vuc01hcDogTWFwPHN0cmluZywgYW55PjtcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcpIHtcblxuXHRcdHRoaXMudGV4dCA9IHRleHQ7XG5cblx0XHR0aGlzLnRva2VucyA9IFtdO1x0XHRcblx0XHR0aGlzLnRva2Vuc01hcCA9IG5ldyBNYXAoKTtcblx0XHR0aGlzLnRva2VuaXplKCk7XG5cdH1cblxuXHR0b2tlbml6ZSgpIHtcblxuXHRcdHRoaXMuZmluZENhcHRpb24oKTtcblx0XHR0aGlzLmZpbmRVbm1hcmthYmxlKCk7XG5cdFx0dGhpcy5maW5kQ29kZUluQ29kZSgpO1xuXHRcdHRoaXMuZmluZENvZGVCbG9jaygpO1xuXHRcdHRoaXMuZmluZEhlYWRpbmdzKCk7XG5cdFx0dGhpcy5maW5kUXVvdGVzKCk7XG5cdFx0dGhpcy5maW5kU3Ryb25nKCk7XG5cdFx0dGhpcy5maW5kTGlua3MoKTtcblx0XHR0aGlzLmZpbmRJbWFnZXMoKTtcblx0XHR0aGlzLmZpbmRVbmRlcmxpbmVzKCk7XG5cdFx0dGhpcy5maW5kQ29sb3JzKCk7XG5cdFx0dGhpcy5maW5kQmFkZ2VzKCk7XG5cdFx0dGhpcy5maW5kTGlzdHMoKTtcblx0XHR0aGlzLmZpbmRUYWJsZXMoKTtcblx0XHR0aGlzLmluaXQoKTtcblxuXHR9XG5cblx0cHJpdmF0ZSBmaW5kQ2FwdGlvbigpIHtcblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNBUFRJT04pICE9IG51bGwpIHtcblx0XHRcdGNvbnN0IGNhcHRpb24gPSBuZXcgQ2FwdGlvbih0aGlzLnRleHQpO1xuXHRcdFx0bGV0IHRva2VuID0ge30gYXMgVG9rZW4uY2FwdGlvblRva2VuO1xuXHRcdFx0dG9rZW4gPSBjYXB0aW9uLmdldCgpO1xuXHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0dGhpcy50ZXh0ID0gXCIkdG9rZW4uXCIgKyB1dWlkICsgXCJcXG5cIiArIGNhcHRpb24udGV4dDtcblx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIHRva2VuKTtcblx0XHR9XG5cdH1cblxuXHQvL3VubWFya2FibGVcblx0cHJpdmF0ZSBmaW5kVW5tYXJrYWJsZSgpOiB2b2lkIHtcblx0XHQvL2lmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSk/Lmxlbmd0aCAhPSBudWxsKSB7XHRcdFx0XG5cblx0XHRjb25zdCB1bm1hcmthYmxlcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTk1BUktBQkxFKTtcblxuXHRcdHVubWFya2FibGVzPy5mb3JFYWNoKCh1bm1hcmthYmxlOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0Y29uc3QgbWF0Y2hSZXN1bHQgPSB1bm1hcmthYmxlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOTUFSS0FCTEUpO1xuXG5cdFx0XHRpZiAobWF0Y2hSZXN1bHQpIHtcblx0XHRcdFx0Y29uc3QgYm9keSA9IG1hdGNoUmVzdWx0WzBdPy5zdWJzdHJpbmcoMiwgbWF0Y2hSZXN1bHRbMF0ubGVuZ3RoIC0gMik7XG5cdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblxuXHRcdFx0XHRjb25zdCB1bm1hcmthYmxlVG9rZW4gPSB7fSBhcyBUb2tlbi51bm1hcmthYmxlVG9rZW47XG5cdFx0XHRcdHVubWFya2FibGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlVOTUFSS0FCTEU7XG5cdFx0XHRcdHVubWFya2FibGVUb2tlbi52YWx1ZSA9IGJvZHk7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UodW5tYXJrYWJsZSwgYCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgdW5tYXJrYWJsZVRva2VuKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQvL31cblxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBjb2RlIGluIGNvZGUgYmxvY2tzXG5cdHByaXZhdGUgZmluZENvZGVJbkNvZGUoKTogdm9pZCB7XG5cblx0XHRjb25zdCBjb2RlSW5Db2RlcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0lOX0NPREUpO1xuXG5cdFx0Y29kZUluQ29kZXM/LmZvckVhY2goKGNvZGVJbkNvZGU6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRjb25zdCBsYW5ndWFnZU1hdGNoUmVzdWx0ID0gY29kZUluQ29kZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTkxJTkVfQ09ERSk7XG5cdFx0XHRjb25zdCBib2R5TWF0Y2hSZXN1bHQgPSBjb2RlSW5Db2RlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklOTElORV9DT0RFKTtcblxuXHRcdFx0aWYgKGxhbmd1YWdlTWF0Y2hSZXN1bHQgJiYgYm9keU1hdGNoUmVzdWx0KSB7XG5cblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2UgPSBsYW5ndWFnZU1hdGNoUmVzdWx0WzBdO1xuXHRcdFx0XHRjb25zdCBib2R5ID0gYm9keU1hdGNoUmVzdWx0WzFdID8/ICcnOyAvLyBBZGQgbnVsbGlzaCBjb2FsZXNjaW5nIG9wZXJhdG9yIHRvIGFzc2lnbiBhIG5vbi1udWxsIHZhbHVlIHRvICdib2R5J1xuXG5cdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0Y29uc3QgY29kZVRva2VuID0ge30gYXMgVG9rZW4uY29kZUluQ29kZVRva2VuO1xuXHRcdFx0XHRjb2RlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0RFX0lOX0NPREU7XG5cdFx0XHRcdGNvZGVUb2tlbi5jb2RlID0gYm9keTtcblx0XHRcdFx0Y29kZVRva2VuLmxhbmd1YWdlID0gbGFuZ3VhZ2UgYXMgc3RyaW5nO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBjb2RlVG9rZW4pO1xuXG5cdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGNvZGVJbkNvZGUsIGAgJHRva2VuLiR7dXVpZH1gKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvL2ZpbmQgc2ltcGxlIGNvZGUgYmxvY2tzXG5cdHByaXZhdGUgZmluZENvZGVCbG9jaygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERV9CTE9DSykgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCBibG9ja3MgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09ERV9CTE9DSyk7XG5cdFx0XHRibG9ja3M/LmZvckVhY2goKGJsb2NrOiBzdHJpbmcpID0+IHtcblxuXG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlTWF0Y2hSZXN1bHQgPSBibG9jay5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLX0xBTkcpO1xuXHRcdFx0XHRjb25zdCBib2R5TWF0Y2hSZXN1bHQgPSBibG9jay5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLX0JPRFkpO1xuXG5cdFx0XHRcdGlmIChsYW5ndWFnZU1hdGNoUmVzdWx0ICYmIGJvZHlNYXRjaFJlc3VsdCkge1xuXHRcdFx0XHRcdGNvbnN0IGxhbmd1YWdlID0gbGFuZ3VhZ2VNYXRjaFJlc3VsdFswXTtcblx0XHRcdFx0XHRjb25zdCBib2R5ID0gYm9keU1hdGNoUmVzdWx0WzBdO1xuXHRcdFx0XHRcdGNvbnN0IGNvZGVUb2tlbiA9IHt9IGFzIFRva2VuLmNvZGVCbG9ja1Rva2VuO1xuXHRcdFx0XHRcdGNvZGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLkNPREVfQkxPQ0s7XG5cdFx0XHRcdFx0Y29kZVRva2VuLmNvZGUgPSBib2R5IGFzIHN0cmluZztcblx0XHRcdFx0XHRjb2RlVG9rZW4ubGFuZ3VhZ2UgPSBsYW5ndWFnZSBhcyBzdHJpbmc7XG5cblx0XHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgY29kZVRva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGJsb2NrLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIGhlYWRpbmdzXG5cdGZpbmRIZWFkaW5ncygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElORykgIT0gbnVsbCkge1xuXHRcdFx0Y29uc3QgaGVhZGluZ3MgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElORyk7XG5cdFx0XHRoZWFkaW5ncz8uZm9yRWFjaCgoaGVhZGluZzogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgbGV2ZWxNYXRjaFJlc3VsdCA9IGhlYWRpbmcubWF0Y2goR3JhbW1hci5CTE9DS1MuSEVBRElOR19MRVZFTCk7XG5cblx0XHRcdFx0aWYgKGxldmVsTWF0Y2hSZXN1bHQpIHtcblx0XHRcdFx0XHRjb25zdCBsZXZlbCA9IGxldmVsTWF0Y2hSZXN1bHRbMF07XG5cdFx0XHRcdFx0Ly9maW5kIGJvZHkgZnJvbSBoZWFkaW5nIHdoZXJlIHNhdHJ0IGlzIGxldmVsICsgMSBhbmQgZW5kIGlzIFxcblxuXHRcdFx0XHRcdC8vcHJpdmF0ZSBjYXNlXG5cdFx0XHRcdFx0aWYoIWxldmVsIHx8IGxldmVsLmxlbmd0aCA+IGhlYWRpbmcubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgYm9keSA9IGhlYWRpbmcuc2xpY2UobGV2ZWwubGVuZ3RoICsgMSwgaGVhZGluZy5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0Y29uc3QgdHlwZXMgOiBhbnkgPSBbXG5cdFx0XHRcdFx0XHRUb2tlblR5cGUuSEVBRElOR19GSVJTVCxcblx0XHRcdFx0XHRcdFRva2VuVHlwZS5IRUFESU5HX1NFQ09ORCxcblx0XHRcdFx0XHRcdFRva2VuVHlwZS5IRUFESU5HX1RISVJELFxuXHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfRk9SVEgsXG5cdFx0XHRcdFx0XHRUb2tlblR5cGUuSEVBRElOR19GSUZUSFxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL3ByaXZhdGUgY2FzZVxuXHRcdFx0XHRcdGlmICghbGV2ZWwgfHwgbGV2ZWwubGVuZ3RoID4gdHlwZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGNvbnN0IGl0eXBlOiBudW1iZXIgPSBsZXZlbC5sZW5ndGggLSAxO1xuXG5cdFx0XHRcdFx0Y29uc3QgaGVhZFRva2VuID0ge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRcdGhlYWRUb2tlbi50eXBlID0gdHlwZXNbaXR5cGVdO1xuXHRcdFx0XHRcdGhlYWRUb2tlbi52YWx1ZSA9IGJvZHk7XG5cdFx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGhlYWRUb2tlbik7XG5cblx0XHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZShoZWFkaW5nLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBxdW90ZXNcblx0ZmluZFF1b3RlcygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuUVVPVEUpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgcXVvdGVzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlFVT1RFKTtcblxuXHRcdFx0cXVvdGVzPy5mb3JFYWNoKChxdW90ZTogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgbWF0Y2hSZXN1bHQgPSBxdW90ZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URV9QQVJBTVMpO1xuXHRcdFx0XHRpZihtYXRjaFJlc3VsdCl7XG5cdFx0XHRcdFx0Y29uc3QgYXV0aG9yIDogYW55ID0gbWF0Y2hSZXN1bHRbM107XG5cdFx0XHRcdFx0Y29uc3QgdGV4dCA9IG1hdGNoUmVzdWx0WzBdO1xuXG5cdFx0XHRcdFx0Y29uc3QgcXVvdGVUb2tlbiA9IHt9IGFzIFRva2VuLnF1b3RlVG9rZW47XG5cdFx0XHRcdFx0cXVvdGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlFVT1RFO1xuXHRcdFx0XHRcdHF1b3RlVG9rZW4ucXVvdGUgPSB0ZXh0IGFzIHN0cmluZztcblx0XHRcdFx0XHRxdW90ZVRva2VuLmF1dGhvciA9IGF1dGhvcjtcblxuXHRcdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBxdW90ZVRva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKHF1b3RlLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBib2xkIHRleHRcblx0ZmluZFN0cm9uZygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IHN0cm9uZ3MgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HKTtcblxuXHRcdFx0c3Ryb25ncz8uZm9yRWFjaCgoc3Ryb25nOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBib2R5TWF0Y2hSZXN1bHQgPSBzdHJvbmcubWF0Y2goR3JhbW1hci5CTE9DS1MuU1RST05HX1RFWFQpO1xuXG5cdFx0XHRcdGlmKGJvZHlNYXRjaFJlc3VsdCkge1xuXHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBib2R5TWF0Y2hSZXN1bHRbMF07XG5cdFx0XHRcdFx0Y29uc3Qgc3Ryb25nVG9rZW4gPSB7fSBhcyBUb2tlbi5zdHJvbmdUZXh0VG9rZW47XG5cdFx0XHRcdFx0c3Ryb25nVG9rZW4udHlwZSA9IFRva2VuVHlwZS5TVFJPTkc7XG5cdFx0XHRcdFx0c3Ryb25nVG9rZW4udmFsdWUgPSBib2R5O1xuXG5cdFx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIHN0cm9uZ1Rva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKHN0cm9uZyxcblx0XHRcdFx0XHRcdGAgJHRva2VuLiR7dXVpZH0gYCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHQvL2ZpbmQgbGlua3Ncblx0ZmluZExpbmtzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSU5LKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGxpbmtzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTkspO1xuXG5cdFx0XHRsaW5rcz8uZm9yRWFjaCgobGluazogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5hbWVNYXRjaFJlc3VsdCA9IGxpbmsubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOS19OQU1FKTtcblx0XHRcdFx0Y29uc3QgdXJsTWF0Y2hSZXN1bHQgPSBsaW5rLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTktfVVJMKTtcblx0XHRcdFx0aWYobmFtZU1hdGNoUmVzdWx0ICYmIHVybE1hdGNoUmVzdWx0ICYmIG5hbWVNYXRjaFJlc3VsdFswXSAmJiB1cmxNYXRjaFJlc3VsdFswXSl7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG5hbWVNYXRjaFJlc3VsdFswXS5zdWJzdHJpbmcoMSwgbmFtZU1hdGNoUmVzdWx0WzBdLmxlbmd0aCAtIDEpO1xuXHRcdFx0XHRcdGNvbnN0IHVybCA9IHVybE1hdGNoUmVzdWx0WzBdLnN1YnN0cmluZygxLCB1cmxNYXRjaFJlc3VsdFswXS5sZW5ndGggLSAxKTtcblxuXHRcdFx0XHRcdGNvbnN0IGxpbmtUb2tlbiA9IHt9IGFzIFRva2VuLmxpbmtUb2tlbjtcblx0XHRcdFx0XHRsaW5rVG9rZW4udHlwZSA9IFRva2VuVHlwZS5MSU5LO1xuXHRcdFx0XHRcdGxpbmtUb2tlbi5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRsaW5rVG9rZW4udXJsID0gdXJsO1xuXG5cdFx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGxpbmtUb2tlbik7XG5cblx0XHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZShsaW5rLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBpbWFnZXNcblx0ZmluZEltYWdlcygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSU1BR0UpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgaW1hZ2VzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFKTtcblxuXHRcdFx0aW1hZ2VzPy5mb3JFYWNoKChpbWFnZTogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgYWx0TWF0Y2hSZXN1bHQgPSBpbWFnZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTUFHRV9OQU1FKTtcblx0XHRcdFx0Y29uc3QgdXJsTWF0Y2hSZXN1bHQgPSBpbWFnZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTUFHRV9VUkwpO1xuXG5cdFx0XHRcdGlmKGFsdE1hdGNoUmVzdWx0ICYmIHVybE1hdGNoUmVzdWx0ICYmIGFsdE1hdGNoUmVzdWx0WzBdICYmIHVybE1hdGNoUmVzdWx0WzBdKXtcblx0XHRcdFx0XHRjb25zdCBhbHQgPSBhbHRNYXRjaFJlc3VsdFswXS5zdWJzdHJpbmcoMiwgYWx0TWF0Y2hSZXN1bHRbMF0ubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdFx0Y29uc3QgdXJsID0gdXJsTWF0Y2hSZXN1bHRbMF0uc3Vic3RyaW5nKDEsIHVybE1hdGNoUmVzdWx0WzBdLmxlbmd0aCAtIDEpO1x0XG5cblx0XHRcdFx0XHRjb25zdCBpbWFnZVRva2VuID0ge30gYXMgVG9rZW4uaW1hZ2VUb2tlbjtcblx0XHRcdFx0XHRpbWFnZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuSU1BR0U7XG5cdFx0XHRcdFx0aW1hZ2VUb2tlbi5hbHQgPSBhbHQ7XG5cdFx0XHRcdFx0aW1hZ2VUb2tlbi51cmwgPSB1cmw7XG5cblx0XHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgaW1hZ2VUb2tlbik7XG5cblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGltYWdlLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCB1bmRlcmxpbmVzXG5cdGZpbmRVbmRlcmxpbmVzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9MSU5FKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IHVuZGVybGluZXMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5ERVJfTElORSk7XG5cblx0XHRcdHVuZGVybGluZXM/LmZvckVhY2goKHVuZGVybGluZTogc3RyaW5nKSA9PiB7XHRcdFx0XHRcblxuXHRcdFx0XHRjb25zdCBib2R5TWF0Y2hSZXN1bHQgPSB1bmRlcmxpbmUubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5ERVJfTElORSk7XG5cblx0XHRcdFx0aWYoYm9keU1hdGNoUmVzdWx0ICYmIGJvZHlNYXRjaFJlc3VsdFswXSl7XG5cdFx0XHRcdFx0Y29uc3QgYm9keSA9IGJvZHlNYXRjaFJlc3VsdFswXS5zdWJzdHJpbmcoMSwgYm9keU1hdGNoUmVzdWx0WzBdLmxlbmd0aCAtIDEpO1xuXHRcdFx0XHRcdGNvbnN0IHVuZGVybGluZVRva2VuID0ge30gYXMgVG9rZW4udW5kZXJMaW5lVG9rZW47XG5cdFx0XHRcdFx0dW5kZXJsaW5lVG9rZW4udHlwZSA9IFRva2VuVHlwZS5VTkRFUl9MSU5FO1xuXHRcdFx0XHRcdHVuZGVybGluZVRva2VuLnZhbHVlID0gYm9keTtcblxuXHRcdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCB1bmRlcmxpbmVUb2tlbik7XG5cblx0XHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZSh1bmRlcmxpbmUsXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIGNvbG9yc1xuXHRmaW5kQ29sb3JzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0xPUikgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCBjb2xvcnMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ09MT1IpO1xuXG5cdFx0XHRjb2xvcnM/LmZvckVhY2goKGNvbG9yOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBib2R5ID0gY29sb3Iuc3BsaXQoXCIuXCIpWzBdO1xuXHRcdFx0XHRjb25zdCBjb2xvck5hbWUgOiBhbnkgPSBjb2xvci5zcGxpdChcIi5cIilbMV07XG5cblxuXHRcdFx0XHRjb25zdCBjb2xvclRva2VuID0ge30gYXMgVG9rZW4uY29sb3JUZXh0VG9rZW47XG5cdFx0XHRcdGNvbG9yVG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0xPUjtcblx0XHRcdFx0Y29sb3JUb2tlbi52YWx1ZSA9IGJvZHk7XG5cdFx0XHRcdGNvbG9yVG9rZW4uY29sb3IgPSBjb2xvck5hbWU7XG5cblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBjb2xvclRva2VuKTtcblxuXHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZShjb2xvcixcblx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9YCk7XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XG5cblx0Ly9maW5kIGJhZ2VzXG5cdGZpbmRCYWRnZXMoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkJBREdFKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGJhZGdlcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5CQURHRSk7XG5cblx0XHRcdGJhZGdlcz8uZm9yRWFjaCgoYmFkZ2U6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGJvZHkgPSBiYWRnZS5zcGxpdChcIkBcIilbMF07XG5cdFx0XHRcdGNvbnN0IGNvbG9yTmFtZTogYW55ID0gYmFkZ2Uuc3BsaXQoXCJAXCIpWzFdO1xuXG5cdFx0XHRcdGNvbnN0IGJhZGdlVG9rZW4gPSB7fSBhcyBUb2tlbi5iYWdkZVRva2VuO1xuXHRcdFx0XHRiYWRnZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuQkFER0U7XG5cdFx0XHRcdGJhZGdlVG9rZW4udmFsdWUgPSBib2R5O1xuXHRcdFx0XHRiYWRnZVRva2VuLmNvbG9yID0gY29sb3JOYW1lO1xuXG5cdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgYmFkZ2VUb2tlbik7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoYmFkZ2UsXG5cdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cblxuXHQvL2ZpbmQgbGlzdHNcblx0ZmluZExpc3RzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSVNUKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGxpc3RzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJU1QpO1xuXG5cdFx0XHRsaXN0cz8uZm9yRWFjaCgobGlzdDogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgYm9keSA9IGxpc3Q7XG5cblx0XHRcdFx0Y29uc3QgbGlzdFRva2VuID0ge30gYXMgVG9rZW4ubGlzdFRva2VuO1xuXHRcdFx0XHRsaXN0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5MSVNUO1x0XHRcdFx0XG5cdFx0XHRcdGxpc3RUb2tlbi52YWx1ZSA9IGJvZHk7XG5cblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBsaXN0VG9rZW4pO1xuXG5cdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGxpc3QsIGAgJHRva2VuLiR7dXVpZH1gKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XG5cblx0Ly9maW5kIHRhYmxlc1xuXHRmaW5kVGFibGVzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5UQUJMRSkgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCB0YWJsZXMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuVEFCTEUpO1xuXG5cdFx0XHR0YWJsZXM/LmZvckVhY2goKHRhYmxlOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCB0YWJsZVRva2VuID0ge30gYXMgVG9rZW4udGFibGVUb2tlbjtcblx0XHRcdFx0dGFibGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRBQkxFO1xuXHRcdFx0XHR0YWJsZVRva2VuLnJvdyA9IHRhYmxlO1xuXHRcdFx0XHR0YWJsZVRva2VuLmNoaWxkcmVuID0gW10gYXMgVG9rZW4udGFibGVSb3dUb2tlbltdO1xuXG5cdFx0XHRcdC8vYWRkIGNoaWxkcmVuXG5cdFx0XHRcdGNvbnN0IHJvd3MgPSB0YWJsZS5zcGxpdChcIlxcblwiKTtcblx0XHRcdFx0cm93cy5mb3JFYWNoKChyb3c6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHJvd1Rva2VuID0ge30gYXMgVG9rZW4udGFibGVSb3dUb2tlbjtcblx0XHRcdFx0XHRyb3dUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRBQkxFX1JPVztcblx0XHRcdFx0XHRyb3dUb2tlbi52YWx1ZSA9IHJvdztcblx0XHRcdFx0XHR0YWJsZVRva2VuLmNoaWxkcmVuLnB1c2gocm93VG9rZW4pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIHRhYmxlVG9rZW4pO1xuXG5cdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKHRhYmxlLCBgICR0b2tlbi4ke3V1aWR9YCk7XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vaW5saW5lIGNvZGVcblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklOTElORV9DT0RFX0JMT0NLKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGlubGluZUNvZGVzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklOTElORV9DT0RFX0JMT0NLKTtcblxuXHRcdFx0aW5saW5lQ29kZXM/LmZvckVhY2goKGlubGluZUNvZGU6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlubGluZUNvZGVUb2tlbiA9IHt9IGFzIFRva2VuLmNvZGVJbmxpbmVUb2tlbjtcblx0XHRcdFx0aW5saW5lQ29kZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuQ09ERV9JTkxJTkU7XG5cdFx0XHRcdGlubGluZUNvZGVUb2tlbi52YWx1ZSA9IGlubGluZUNvZGU7XG5cblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBpbmxpbmVDb2RlVG9rZW4pO1xuXG5cdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGlubGluZUNvZGUsIGAgJHRva2VuLiR7dXVpZH1gKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdGluaXQgPSAoKTogdm9pZCA9PiB7XG5cblx0XHQvL25lZWQgdG8gZmluZCBhbGwgcGFyYWdyYXBocyBpbiB0aGUgYXJ0aWNsZSBhbmQgY2hhbmdlIHRoZW0gdG8gdG9rZW5zXG5cdFx0Y29uc3QgcGFyYWdyYXBoU3RhcnRUb2tlbiA9IHt9IGFzIFRva2VuLnBhcmFncmFwaFN0YXJ0VG9rZW47XG5cdFx0cGFyYWdyYXBoU3RhcnRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVDtcblxuXHRcdGNvbnN0IHBhcmFncmFwaEVuZFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoRW5kVG9rZW47XG5cdFx0cGFyYWdyYXBoRW5kVG9rZW4udHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEhfRU5EO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnRleHQpO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnRva2Vuc01hcCk7XG5cblx0XHR0aGlzLnRleHQuc3BsaXQoXCJcXG5cIikuZm9yRWFjaCgocGFyYWdyYXBoOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmIChwYXJhZ3JhcGgubGVuZ3RoICE9IDBcblx0XHRcdFx0JiYgcGFyYWdyYXBoICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQmJiBwYXJhZ3JhcGgudHJpbSgpICE9IFwiIFwiKSB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2cocGFyYWdyYXBoKTtcblx0XHRcdFx0dGhpcy50b2tlbnMucHVzaChwYXJhZ3JhcGhTdGFydFRva2VuKTtcblx0XHRcdFx0cGFyYWdyYXBoLnNwbGl0KFwiIFwiKS5mb3JFYWNoKCh3b3JkOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRjb25zdCB3b3JkTWF0Y2hSZXN1bHQgPSB3b3JkLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlRPS0VOKTtcblx0XHRcdFx0XHRpZiAod29yZE1hdGNoUmVzdWx0ICYmIHdvcmRNYXRjaFJlc3VsdFswXSkge1xuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIndvcmQ6IFwiICsgd29yZCArIFwiID0gXCIgKyB0aGlzLnRva2Vuc01hcC5nZXQod29yZC5tYXRjaChHcmFtbWFyLkJMT0NLUy5UT0tFTilbMF0pKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHRoaXMudG9rZW5zLnB1c2godGhpcy50b2tlbnNNYXAuZ2V0KHdvcmRNYXRjaFJlc3VsdFswXSkpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh3b3JkKTtcblx0XHRcdFx0XHRcdGlmICh3b3JkLmxlbmd0aCAhPSAwXG5cdFx0XHRcdFx0XHRcdCYmIHdvcmQgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHRUb2tlbiA9IHt9IGFzIFRva2VuLnRleHRUb2tlbjtcblx0XHRcdFx0XHRcdFx0dGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEVYVDtcblx0XHRcdFx0XHRcdFx0dGV4dFRva2VuLnZhbHVlID0gd29yZDtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh3b3JkKTtcblx0XHRcdFx0XHRcdFx0dGhpcy50b2tlbnMucHVzaCh0ZXh0VG9rZW4pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRoaXMudG9rZW5zLnB1c2gocGFyYWdyYXBoRW5kVG9rZW4pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnRva2Vucyk7XG5cdFx0dGhpcy50b2tlbnM7XG5cblx0fVxufSIsIi8qKlxuICogQXV0aG9yOiBtZXVnZW5vbS5jb21cbiAqIERhdGU6IDE5LjAzLjIwMjNcbiAqIFJlZmFjdG9yZWQ6IDE5LjAzLjIwMjMgXG4gKi9cblxuZXhwb3J0IGVudW0gVG9rZW5UeXBlIHtcblx0QkFER0UgPSBcIkJhZGdlXCIsIC8vIEEgYmFkZ2UgZm9yIGRpc3BsYXlpbmcgZXh0cmEgaW5mb3JtYXRpb25cblx0Q0FQVElPTiA9IFwiQ2FwdGlvblwiLCAvLyBBIGNhcHRpb24gZm9yIGFuIGltYWdlIG9yIHZpZGVvXG5cdENPREVfQkxPQ0sgPSBcIkNvZGVCbG9ja1wiLCAvLyBBIGJsb2NrIG9mIGNvZGVcblx0Q09ERV9JTl9DT0RFID0gXCJDb2RlSW5Db2RlXCIsIC8vIEEgY29kZSBzbmlwcGV0IGluc2lkZSBhIGNvZGUgYmxvY2tcblx0Q09ERV9JTkxJTkUgPSBcIkNvZGVJbmxpbmVcIiwgLy8gQW4gaW5saW5lIGNvZGUgc25pcHBldFxuXHRDT0xPUiA9IFwiQ29sb3JcIiwgLy8gQSBjb2xvciB2YWx1ZVxuXHRET0NVTUVOVCA9IFwiRG9jdW1lbnRcIiwgLy8gQSBkb2N1bWVudCBjb250YWluaW5nIHZhcmlvdXMgZWxlbWVudHNcblx0SEVBRElORyA9IFwiSGVhZGluZ1wiLCAvLyBBIGhlYWRpbmcgZWxlbWVudFxuXHRIRUFESU5HX0ZJUlNUID0gXCJIZWFkaW5nRmlyc3RcIiwgLy8gQSBmaXJzdC1sZXZlbCBoZWFkaW5nIGVsZW1lbnRcblx0SEVBRElOR19TRUNPTkQgPSBcIkhlYWRpbmdTZWNvbmRcIiwgLy8gQSBzZWNvbmQtbGV2ZWwgaGVhZGluZyBlbGVtZW50XG5cdEhFQURJTkdfVEhJUkQgPSBcIkhlYWRpbmdUaGlyZFwiLCAvLyBBIHRoaXJkLWxldmVsIGhlYWRpbmcgZWxlbWVudFxuXHRIRUFESU5HX0ZPUlRIID0gXCJIZWFkaW5nRm9ydGhcIiwgLy8gQSBmb3VydGgtbGV2ZWwgaGVhZGluZyBlbGVtZW50XG5cdEhFQURJTkdfRklGVEggPSBcIkhlYWRpbmdGaWZ0aFwiLCAvLyBBIGZpZnRoLWxldmVsIGhlYWRpbmcgZWxlbWVudFxuXHRJTUFHRSA9IFwiSW1hZ2VcIiwgLy8gQW4gaW1hZ2UgZWxlbWVudFxuXHRMSU5LID0gXCJMaW5rXCIsIC8vIEEgaHlwZXJsaW5rIGVsZW1lbnRcblx0TElTVCA9IFwiTGlzdFwiLCAvLyBBIGxpc3QgZWxlbWVudFxuXHRQQVJBR1JBUEggPSBcIlBhcmFncmFwaFwiLCAvLyBBIHBhcmFncmFwaCBlbGVtZW50XG5cdFBBUkFHUkFQSF9TVEFSVCA9IFwiUGFyYWdyYXBoU3RhcnRcIiwgLy8gVGhlIHN0YXJ0IG9mIGEgcGFyYWdyYXBoIGVsZW1lbnRcblx0UEFSQUdSQVBIX0VORCA9IFwiUGFyYWdyYXBoRW5kXCIsIC8vIFRoZSBlbmQgb2YgYSBwYXJhZ3JhcGggZWxlbWVudFxuXHRRVU9URSA9IFwiUXVvdGVcIiwgLy8gQSBibG9ja3F1b3RlIGVsZW1lbnRcblx0U1RST05HID0gXCJTdHJvbmdcIiwgLy8gQSBzdHJvbmcgb3IgYm9sZCB0ZXh0IGVsZW1lbnRcblx0VEFCTEUgPSBcIlRhYmxlXCIsIC8vIEEgdGFibGUgZWxlbWVudFxuXHRUQUJMRV9ST1cgPSBcIlRhYmxlUm93XCIsIC8vIEEgdGFibGUgcm93IGVsZW1lbnRcblx0VEVYVCA9IFwiVGV4dFwiLCAvLyBBIHBsYWluIHRleHQgZWxlbWVudFxuXHRVTkRFUl9MSU5FID0gXCJVbmRlckxpbmVcIiwgLy8gQW4gdW5kZXJsaW5lZCB0ZXh0IGVsZW1lbnRcblx0VU5LTk9XTl9URVhUID0gXCJVbmtub3duVGV4dFwiLCAvLyBBbiB1bmtub3duIG9yIHVucmVjb2duaXplZCB0ZXh0IGVsZW1lbnRcblx0VU5NQVJLQUJMRSA9IFwiVW5tYXJrYWJsZVwiLCAvLyBBbiBlbGVtZW50IHRoYXQgc2hvdWxkIG5vdCBiZSBtYXJrZWQgdXBcbiAgfSAgIiwiLyoqXG4gKiBAYXV0b3I6IG1ldWdlbm9tXG4gKiBAZGF0ZTogMTQuMTIuMjAyM1xuICovXG5cbmNsYXNzIFV0aWxzIHtcbiAgICBcbiAgICAgIC8vIGxhenkgbG9hZGluZyBpbWFnZXNcbiAgICAgIHN0YXRpYyBhc3luYyBsYXp5TG9hZEltYWdlKGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsb2FkZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ltYWdlTG9hZGVyJyk7XG4gICAgICAgIGltYWdlRWxlbWVudD8ucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGxvYWRlckVsZW1lbnQsIGltYWdlRWxlbWVudCk7XG4gICAgICBcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgZW50cmllcy5mb3JFYWNoKGFzeW5jIChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGltZyA9IGVudHJ5LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgICBpZiAoIGltZy5kYXRhc2V0ICYmIGltZy5kYXRhc2V0W1wic3JjXCJdKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGxvYWRlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vIFNob3cgdGhlIGxvYWRlclxuICAgICAgXG4gICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGltZy5kYXRhc2V0W1wic3JjXCJdKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gb2JqZWN0VVJMO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGltYWdlOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgbG9hZGVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvLyBIaWRlIHRoZSBsb2FkZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaW1hZ2VFbGVtZW50KTtcbiAgICAgIH1cbiAgXG4gICAgICBcbiAgICAgIHN0YXRpYyBhc3luYyBfbGF6eUxvYWRJbWFnZShpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgZW50cmllcy5mb3JFYWNoKGFzeW5jIChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGltZyA9IGVudHJ5LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgICBpZiAoaW1nLmRhdGFzZXRbXCJzcmNcIl0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGltZy5kYXRhc2V0W1wic3JjXCJdKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IG9iamVjdFVSTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaW1hZ2VFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGRlZmF1bHQgVXRpbHMiLCJpbXBvcnQgeyBDYXB0aW9uSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ2FwdGlvbkhUTUxcIlxuaW1wb3J0IHsgSGVhZGVySFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvSGVhZGVySFRNTFwiO1xuaW1wb3J0IHtQYXJhZ3JhcGhIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUxcIlxuaW1wb3J0IHsgQ29kZUJsb2NrSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ29kZUJsb2NrSFRNTFwiO1xuaW1wb3J0IHtRdW90ZUhUTUx9IGZyb20gXCIuL2h0bWxibG9ja3MvUXVvdGVIVE1MXCI7XG5pbXBvcnQge0xpc3RIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL0xpc3RIVE1MXCI7XG5pbXBvcnQgeyBUYWJsZUhUTUwgfSBmcm9tIFwiLi9odG1sYmxvY2tzL1RhYmxlSFRNTFwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG5cdHByaXZhdGUgYXN0IDogQVNUO1xuXHRwdWJsaWMgaHRtbE91dHB1dCA6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihhc3QgOiBBU1QsIGh0bWxPdXRwdXQgOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcblx0XHR0aGlzLmFzdCA9IGFzdFxuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdH1cblxuXHRpbml0KCkge1xuXG5cdFx0Y29uc3QgY2hpbGRyZW4gID0gdGhpcy5hc3QuY2hpbGRyZW47XG5cblx0XHRpZihjaGlsZHJlbikge1xuXHRcdFx0Y2hpbGRyZW4uZm9yRWFjaCgodG9rZW4pID0+IHtcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkNBUFRJT04pIHtcblx0XHRcdFx0XHRpZiAodGhpcy5odG1sT3V0cHV0KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjYXB0aW9uID0gbmV3IENhcHRpb25IVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0Y2FwdGlvbi5yZW5kZXIoKTtcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5IRUFESU5HKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaGVhZGVyID0gbmV3IEhlYWRlckhUTUwodG9rZW4sIHRoaXMuaHRtbE91dHB1dCk7XG5cdFx0XHRcdFx0XHRoZWFkZXIucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0JMT0NLIHx8IHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkNPREVfSU5fQ09ERSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmh0bWxPdXRwdXQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGNvZGVibG9jayA9IG5ldyBDb2RlQmxvY2tIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0Y29kZWJsb2NrLnJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlFVT1RFKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcXVvdGUgPSBuZXcgUXVvdGVIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0cXVvdGUucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuTElTVCkge1x0XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1x0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gbmV3IExpc3RIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1x0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGxpc3QucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVEFCTEUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5odG1sT3V0cHV0KSB7XHRcblx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlSFRNTCh0b2tlbiwgdGhpcy5odG1sT3V0cHV0KTtcblx0XHRcdFx0XHRcdHRhYmxlLnJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmh0bWxPdXRwdXQpe1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gbmV3IFBhcmFncmFwaEhUTUwodG9rZW4sIHRoaXMuaHRtbE91dHB1dCk7XG5cdFx0XHRcdFx0XHR0aGlzLmh0bWxPdXRwdXQgPSBwYXJhZ3JhcGgucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSlcblx0XHR9XHRcblx0XHRcblx0XHRyZXR1cm4gdGhpcy5odG1sT3V0cHV0O1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSAnLi9Eb21VdGlsaXRlcydcblxuXG5leHBvcnQgY2xhc3MgQ2FwdGlvbkhUTUwge1xuXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXM6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4uY2FwdGlvblRva2VuO1xuXHRwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5jYXB0aW9uVG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6IHZvaWQge1xuXG5cdFx0bGV0IHRhZ3NCbG9jayA9IFwiXCI7XG5cdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS50YWdzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpLm1hcCgodGFnOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmICh0YWcubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0YWdzQmxvY2sgPSB0YWdzQmxvY2sgK1xuXHRcdFx0XHRcdCc8YSBocmVmPVwiIy90YWdzLycgKyB0YWcgKyAnXCIgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLW9yYW5nZS00MDAgIGhvdmVyOmJnLW9yYW5nZS01MDAgdXBwZXJjYXNlIGxhc3Q6bXItMCBtci0xXCI+JyArXG5cdFx0XHRcdFx0dGFnICtcblx0XHRcdFx0XHRcIjwvYT5cIlxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IGNhdGVnb3JpZXNCbG9jayA9IFwiXCI7XG5cdFx0aWYgKHRoaXMudG9rZW4uY2hpbGRyZW5bMF0uY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjYXRlZ29yaWVzQmxvY2sgPVxuXHRcdFx0XHQnPGEgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWdyYXktNDAwICBob3ZlcjpiZy1ncmF5LTUwMCB1cHBlcmNhc2UgbGFzdDptci0wIG1yLTFcIj4nICtcblx0XHRcdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS5jYXRlZ29yaWVzICtcblx0XHRcdFx0XCI8L2E+XCJcblx0XHR9XG5cblx0XHRjb25zdCBDYXB0aW9uQmxvY2sgPVxuXHRcdGBcblx0XHQ8ZGl2IGNsYXNzID0gXCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzID0gXCJmbGV4LW5vbmVcIj5cblx0XHRcdFx0PGltZyBkYXRhLXNyYz0gJHt0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnRodW1ibmFpbH0gXG5cdFx0XHRcdCBjbGFzcz1cImxhenkgZmxvYXQtbGVmdCBvYmplY3QtY29udGFpbiBoLTY0IHctMTAwIG14LTJcIi8+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWF1dG8ganVzdGlmeS1zdGFydFwiPlxuXHRcdFx0XHQ8aDMgY2xhc3M9XCJ0ZXh0LTN4bCBmb250LW5vcm1hbCBsZWFkaW5nLW5vcm1hbCBtdC0wIG1iLTIgdGV4dC1ncmF5LTYwMFwiPlxuXHRcdFx0XHRcdCR7dGhpcy50b2tlbi5jaGlsZHJlblswXS50aXRsZS5zbGljZSgyLCB0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnRpdGxlLmxlbmd0aC0xKX08L2gzPlxuXHRcdFx0XHQ8dGltZSBjbGFzcz1cInRleHQteHMgZm9udC1zZW1pYm9sZCBpbmxpbmUtYmxvY2sgcHktMSBweC0yIHVwcGVyY2FzZSByb3VuZGVkIHRleHQtd2hpdGUgYmctYmx1ZS00MDAgdXBwZXJjYXNlIGxhc3Q6bXItMCBtci0xXCI+XG5cdFx0XHRcdFx0JHt0aGlzLnRva2VuLmNoaWxkcmVuWzBdLmRhdGV9XG5cdFx0XHRcdDwvdGltZT4gXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0YWctY29udGFpbmVyIHB5LTFcIj5cblx0XHRcdFx0XHQke3RhZ3NCbG9ja31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXRlZ29yaWVzLWNvbnRhaW5lciBweS0xXCI+XG5cdFx0XHRcdFx0JHtjYXRlZ29yaWVzQmxvY2t9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cblx0XHQ8L2Rpdj5cblx0XHQ8aHIvPlxuXHRcdDxici8+XG5cdFx0PGJyLz5gO1xuXG5cdFx0Ly9hZGQgY2FwdGlvbiB0byBodG1sT3V0cHV0XG5cdFx0Y29uc3QgY2FwdGlvbk5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXHRcdGNhcHRpb25Ob2RlLmlubmVySFRNTCA9IENhcHRpb25CbG9jaztcblx0XHR0aGlzLmh0bWxPdXRwdXQuYXBwZW5kQ2hpbGQoY2FwdGlvbk5vZGUpO1xuXHRcdFxuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IGlmIGxpbmUgaXMgY29kZSBibG9ja1xuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgYXMgY29kZSBibG9ja1xuICovXG5cblxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4uL1Rva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3ByaXNtLmNzc1wiXG5cbi8vIGltcG9ydCBwcmlzbWpzXG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuXG5cbmV4cG9ydCBjbGFzcyBDb2RlQmxvY2tIVE1MIHtcbiAgXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXMgOiBhbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLmNvZGVCbG9ja1Rva2VuO1xuXHRwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXHRcblx0Y29uc3RydWN0b3IodG9rZW46IFRva2VuLmNvZGVCbG9ja1Rva2VuLCBodG1sT3V0cHV0OiBIVE1MRWxlbWVudCkge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLmh0bWxPdXRwdXQgPSBodG1sT3V0cHV0O1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG4gIHJlbmRlciAoKSA6IHZvaWQge1xuXG5cblx0Y29uc3QgY29kZUJsb2NrIDogYW55ID0gYFxuXHRcdFx0PGNvZGUgY2xhc3M9XCJsYW5ndWFnZS0ke3RoaXMudG9rZW4ubGFuZ3VhZ2V9XCI+XG5cdFx0IFx0XHQke3RoaXMudG9rZW4uY29kZX1cblx0XHRcdDwvY29kZT5gXG5cdFx0XG5cdFx0Y29uc3QgQ29kZUJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcInByZVwiKTtcblx0XHRDb2RlQmxvY2tOb2RlLmNsYXNzTmFtZSA9IGBsYW5ndWFnZS0ke3RoaXMudG9rZW4ubGFuZ3VhZ2V9XCJgIDtcblxuXHRcdFByaXNtLmhpZ2hsaWdodEFsbChjb2RlQmxvY2spO1xuXG5cdFx0Q29kZUJsb2NrTm9kZS5pbm5lckhUTUwgPSBjb2RlQmxvY2s7XG5cdFx0XG5cdFx0Y29uc3QgYXBwID0gdGhpcy5odG1sT3V0cHV0O1xuXHRcdGNvbnN0IGVsZW1DaGlsZHJlbiA9IGFwcD8uY2hpbGRyZW47XG5cdFx0aWYgKGVsZW1DaGlsZHJlbikge1xuXHRcdFx0aWYoZWxlbUNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRhcHA/Lmxhc3RDaGlsZD8uYXBwZW5kQ2hpbGQoQ29kZUJsb2NrTm9kZSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0YXBwLmFwcGVuZENoaWxkKENvZGVCbG9ja05vZGUpO1xuXHRcdFx0fVxuXHRcdH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBSZXR1cm5zIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGggZG9tIGVsZW1lbnRzIGluIGRvY3VtZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIERvbVV0aWxpdGVzIHtcblxuICBnZXRMYXN0Tm9kZSAoKSA6IENoaWxkTm9kZSB8IG51bGx7XG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRSb290KClcbiAgICByZXR1cm4gbGFzdENoaWxkLmxhc3RDaGlsZFxuICB9XG5cbiAgZ2V0TGFzdE5vZGVOYW1lICgpIDogc3RyaW5nIHtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSB0aGlzLmdldFJvb3QoKVxuICAgIHJldHVybiBsYXN0Q2hpbGQubGFzdENoaWxkLm5vZGVOYW1lXG4gIH1cblxuICBnZXRSb290ICgpIDogYW55IHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZScpXG4gIH1cblxuICBjcmVhdGVFbGVtZW50IChlbGVtZW50IDogc3RyaW5nKSA6IEhUTUxFbGVtZW50IHsgICAgXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudClcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IDxoPlxuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgZm9yIGhlYWRUeXBlIDxoPy8+IGZvciBleGFtcGxlIDxoPz4gLi4uPGg/PlxuICovXG5cbmltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgSGVhZGVySFRNTCB7XG5cblx0cHJpdmF0ZSBEb21VdGlsaXRlczogYW55O1xuXHRwcml2YXRlIHRva2VuOiBUb2tlbi5oZWFkVG9rZW47XG5cdHByaXZhdGUgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IodG9rZW46IFRva2VuLmhlYWRUb2tlbiwgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQpIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5odG1sT3V0cHV0ID0gaHRtbE91dHB1dDtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKTogdm9pZCB7XG5cblx0XHRjb25zdCBIZWFkZXJOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KCdoJyArIHRoaXMudG9rZW4uZGVwdClcblxuXHRcdEhlYWRlck5vZGUuY2xhc3NOYW1lID0gXCJ0ZXh0LVwiICsgdGhpcy50b2tlbi5kZXB0ICsgXCJ4bCBtdC0wIG1iLTIgdGV4dC1ncmF5LTgwMCBwci0xMCBwdC0xMCBuby1pbmhlcml0LWZvbnQtc2l6ZVwiO1xuXG5cdFx0aWYgKHRoaXMudG9rZW4uY2hpbGRyZW5bMF0pIHtcblxuXHRcdFx0SGVhZGVyTm9kZS5pbm5lckhUTUwgPSB0aGlzLnRva2VuLmNoaWxkcmVuWzBdLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBhcHAgPSB0aGlzLmh0bWxPdXRwdXQ7XG5cdFx0XHRjb25zdCBlbGVtQ2hpbGRyZW4gPSBhcHA/LmNoaWxkcmVuXG5cblx0XHRcdGlmIChlbGVtQ2hpbGRyZW4pIHtcblx0XHRcdFx0aWYgKGVsZW1DaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0YXBwPy5sYXN0RWxlbWVudENoaWxkPy5hcHBlbmRDaGlsZChIZWFkZXJOb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcHAuYXBwZW5kQ2hpbGQoSGVhZGVyTm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSBcIi4vRG9tVXRpbGl0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RIVE1MIHtcbiAgICBwcml2YXRlIERvbVV0aWxpdGVzOiBEb21VdGlsaXRlcztcbiAgICBwcml2YXRlIHRva2VuOiBUb2tlbi5saXN0VG9rZW47XG4gICAgcHJpdmF0ZSBodG1sT3V0cHV0OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5saXN0VG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgdGhpcy5odG1sT3V0cHV0ID0gaHRtbE91dHB1dDtcbiAgICAgICAgdGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGlzdEl0ZW0oaXRlbTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gJyc7XG4gICAgICAgIGlmIChpdGVtLmluY2x1ZGVzKFwiW11cIikpIHtcbiAgICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGlzdC1ub25lIG1sLTVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0IGFwcGVhcmFuY2Utbm9uZSBoLTQgdy00IGJvcmRlci1zb2xpZCBib3JkZXItZ3JheS0yMDAgYm9yZGVyLXNvbGlkIGJvcmRlci0yIHJvdW5kZWQtc20gZGlzYWJsZWQ6Ymctd2hpdGUgZGlzYWJsZWQ6Ym9yZGVyLWJsdWUtNjAwIG10LTEgYWxpZ24tdG9wIGJnLW5vLXJlcGVhdCBiZy1jZW50ZXIgYmctY29udGFpbiBmbG9hdC1sZWZ0IG1yLTJcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIGlkPVwiZmxleENoZWNrRGlzYWJsZWRcIiBkaXNhYmxlZD5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbCBpbmxpbmUtYmxvY2sgdGV4dC1ncmF5LTgwMCBvcGFjaXR5LTEwMFwiIGZvcj1cImZsZXhDaGVja0Rpc2FibGVkXCI+JHtpdGVtLnJlcGxhY2UoXCJbXVwiLCBcIlwiKX08L2xhYmVsPlxuICAgICAgICAgICAgPC9saT5gO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5jbHVkZXMoXCJbeF1cIikpIHtcbiAgICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGlzdC1ub25lIG1sLTVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0IGFwcGVhcmFuY2Utbm9uZSBoLTQgdy00IGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1zbSBiZy13aGl0ZSBjaGVja2VkOmJnLWJsdWUtNjAwIGNoZWNrZWQ6Ym9yZGVyLWJsdWUtNjAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGR1cmF0aW9uLTIwMCBtdC0xIGFsaWduLXRvcCBiZy1uby1yZXBlYXQgYmctY2VudGVyIGJnLWNvbnRhaW4gZmxvYXQtbGVmdCBtci0yXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiIGNoZWNrZWQgZGlzYWJsZWQ+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbCBpbmxpbmUtYmxvY2sgdGV4dC1ncmF5LTgwMCBvcGFjaXR5LTEwMFwiIGZvcj1cImZsZXhDaGVja0NoZWNrZWREaXNhYmxlZFwiPiR7aXRlbS5yZXBsYWNlKFwiW3hdXCIsIFwiXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pbmNsdWRlcyhcIi1cIikpIHtcbiAgICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGlzdC1ub25lIG1sLTUgdGV4dC1za3ktNzAwXCI+JHtpdGVtfTwvbGk+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGlzdC1ub25lIG1sLTVcIj4ke2l0ZW19PC9saT5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IEVsZW1lbnQgfCB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnRva2VuLnZhbHVlO1xuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGxpc3QgPSB2YWx1ZS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgbGV0IGxpc3RCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gbGlzdC5zaGlmdCgpO1xuXG4gICAgICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGxpc3RCbG9jayA9IGA8ZGl2IGNsYXNzPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgIDxwPiR7dGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+JHtsaXN0Lm1hcCh0aGlzLmNyZWF0ZUxpc3RJdGVtKS5qb2luKFwiXCIpfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICAgIGxpc3RCbG9ja05vZGUuaW5uZXJIVE1MID0gbGlzdEJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwID0gdGhpcy5odG1sT3V0cHV0O1xuICAgICAgICBhcHA/Lmxhc3RDaGlsZD8uYXBwZW5kQ2hpbGQobGlzdEJsb2NrTm9kZSk7XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IDxoPlxuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgZm9yIGhlYWRUeXBlIDxoPy8+IGZvciBleGFtcGxlIDxoPz4gLi4uPGg/PlxuICovXG5cbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgUGFyYWdyYXBoSFRNTCB7XG5cblx0cHJpdmF0ZSBEb21VdGlsaXRlcyA6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogYW55O1xuXHRwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBhbnksIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6IGFueSB7XG5cblx0XHRjb25zdCBQYXJhZ3JhcGhOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwicFwiKVxuXHRcdFBhcmFncmFwaE5vZGUuY2xhc3NOYW1lID0gXCJibG9jayBsZWFkaW5nLTcgZm9udC1tb25vIG10LTJcIjtcblxuXHRcdGxldCB0ZXh0ID0gXCJcIjtcblx0XHRcblx0XHR0aGlzLnRva2VuLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLlRFWFQpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGNoaWxkLnZhbHVlXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5JTUFHRSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXggZmxleC13cmFwIGp1c3RpZnktY2VudGVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInctNi8xMiBzbTp3LTQvMTIgcHgtNCBwYi0yMFwiPlx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PGltZyBkYXRhLXNyYz1cIiR7Y2hpbGQudXJsfVwiIGFsdD1cIiR7Y2hpbGQuYWx0fVwiIGNsYXNzPVwibGF6eSBzaGFkb3cgcm91bmRlZCBtYXgtdy1mdWxsIGgtYXV0byBhbGxpZ24tbWlkZGxlIGJvcmRlci1ub25lXCI+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5MSU5LKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgYDxhIGhyZWY9XCIke2NoaWxkLnVybH1cIiBjbGFzcz1cInRleHQtYmx1ZS01MDBcIj5cblx0XHRcdFx0XHQke2NoaWxkLm5hbWV9XG5cdFx0XHRcdFx0PGEvPmBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLlNUUk9ORykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8c3Ryb25nPiR7Y2hpbGQudmFsdWV9PC9zdHJvbmc+XG5cdFx0XHRcdGBcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLkNPREVfSU5MSU5FKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBgXG5cdFx0XHRcdDxjb2RlIGNsYXNzPVwiaW5saW5lLWJsb2NrIHB5LTEgcHgtMiBiZy1ncmF5LTMwMCB0ZXh0LWdyYXktODAwIHRleHQtc20gZm9udC1tZWRpdW0gbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1ncmF5LTcwMCBkYXJrOnRleHQtZ3JheS00MDBcIj5cblx0XHRcdFx0XHQke2NoaWxkLnZhbHVlLnN1YnN0cmluZygxLCBjaGlsZC52YWx1ZS5sZW5ndGggLSAxKX1cblx0XHRcdFx0PC9jb2RlPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5DT0xPUikge1xuXG5cdFx0XHRcdGxldCBjb2xvclRleHQ6IHN0cmluZ3x1bmRlZmluZWQ7XG5cblx0XHRcdFx0aWYoY2hpbGQuY29sb3IgPT0gXCJibHVlXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLWJsdWUtNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiZ3JheVwiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1ncmF5LTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInJlZFwiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1yZWQtNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiZ3JlZW5cIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tZ3JlZW4tNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwieWVsbG93XCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXllbGxvdy01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwdXJwbGVcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tcHVycGxlLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInBpbmtcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tcGluay01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJpbmRpZ29cIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24taW5kaWdvLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGNvbG9yVGV4dCl7XG5cdFx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGNvbG9yVGV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH1cblxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBcIkJhZGdlXCIpIHtcblxuXHRcdFx0XHRsZXQgY29sb3JCYWRnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRcdGlmKGNoaWxkLmNvbG9yID09IFwiYmx1ZVwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1ibHVlLTIwMCBkYXJrOnRleHQtYmx1ZS04MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJncmF5XCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1ncmF5LTEwMCB0ZXh0LWdyYXktODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLWdyYXktNzAwIGRhcms6dGV4dC1ncmF5LTMwMFwiPicgKyBjaGlsZC52YWx1ZSsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwicmVkXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1yZWQtMTAwIHRleHQtcmVkLTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1yZWQtMjAwIGRhcms6dGV4dC1yZWQtOTAwXCI+JyArIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiZ3JlZW5cIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1ncmVlbi0yMDAgZGFyazp0ZXh0LWdyZWVuLTkwMFwiPicgKyBjaGlsZC52YWx1ZSArICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInllbGxvd1wiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmcteWVsbG93LTEwMCB0ZXh0LXllbGxvdy04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmcteWVsbG93LTIwMCBkYXJrOnRleHQteWVsbG93LTkwMFwiPicgKyBjaGlsZC52YWx1ZSArICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInB1cnBsZVwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctcHVycGxlLTEwMCB0ZXh0LXB1cnBsZS04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctcHVycGxlLTIwMCBkYXJrOnRleHQtcHVycGxlLTkwMFwiPicgKyBjaGlsZC52YWx1ZSArICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInBpbmtcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLXBpbmstMTAwIHRleHQtcGluay04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctcGluay0yMDAgZGFyazp0ZXh0LXBpbmstOTAwXCI+JysgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJpbmRpZ29cIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLWluZGlnby0xMDAgdGV4dC1pbmRpZ28tODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLWluZGlnby0yMDAgZGFyazp0ZXh0LWluZGlnby05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihjb2xvckJhZGdlICE9IHVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGNvbG9yQmFkZ2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLlVOREVSX0xJTkUpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGBcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1za3ktNTAwIHRleHQtc2xhdGUtNTAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC52YWx1ZX1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5VTk1BUktBQkxFKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QgdW5tYXJrYWJsZSA9IGNoaWxkLnZhbHVlO1xuXHRcdFx0XHRjb25zdCB1bm1hcmthYmxlVGV4dCA9IHVubWFya2FibGUuc3Vic3RyaW5nKDEsIHVubWFya2FibGUubGVuZ3RoIC0gMSk7XHRcdFx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBgXHRcdFx0XHRcblx0XHRcdFx0PGRpdiBjbGFzcz1cInRleHQtb3JhbmdlLTkwMFwiPlxuXHRcdFx0XHRcdCR7dW5tYXJrYWJsZVRleHQucmVwbGFjZSgvXFxuL2csICc8YnIvPicpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0YFx0XHRcdFx0XG5cblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0UGFyYWdyYXBoTm9kZS5pbm5lckhUTUwgPSB0ZXh0O1xuXG5cdFx0Ly9sZXQgY29udGFpbmVyIDogYW55O1xuXHRcdGNvbnN0IGFwcCA9IHRoaXMuaHRtbE91dHB1dDtcdFx0XG5cdFx0aWYoYXBwPy5jaGlsZHJlbi5sZW5ndGggIT0gMCl7XG5cdFx0XHQgYXBwPy5sYXN0Q2hpbGQ/LmFwcGVuZENoaWxkKFBhcmFncmFwaE5vZGUpO1xuXHRcdH1lbHNle1xuXHRcdFx0IGFwcC5hcHBlbmRDaGlsZChQYXJhZ3JhcGhOb2RlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5odG1sT3V0cHV0O1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIFJldHVybnMgYW4gaHRtbCBlbGVtZW50IGlmIGxpbmUgaXMgY29kZSBibG9ja1xuICogQHBhcmFtIGxpbmUgYXMgYmxvY2sgb2YgdGhlIHRleHRcbiAqIEByZXR1cm4gZG9tIGVsZW1lbnQgYXMgY29kZSBibG9ja1xuICovXG5cblxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4uL1Rva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5pbXBvcnQgXCIuLi9zdGF0aWMvc3R5bGVzL3F1b3RlLmNzc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUhUTUwge1xuXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXM6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4ucXVvdGVUb2tlbjtcblx0cHJpdmF0ZSBodG1sT3V0cHV0OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogVG9rZW4ucXVvdGVUb2tlbiwgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQpIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5odG1sT3V0cHV0ID0gaHRtbE91dHB1dDtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50b2tlbi5xdW90ZSAmJiB0aGlzLnRva2VuLmF1dGhvcikge1xuXHRcdFx0Y29uc3QgcXVvdGVCbG9jayA9IGBcdFx0XG5cdFx0PGRpdj5cblx0XHRcdDxwIGNsYXNzbmFtZT1cIm1iLTJcIj4gXG5cdFx0XHRcdCR7dGhpcy50b2tlbi5xdW90ZX1cblx0XHRcdDwvcD5cblx0XHRcdDxjaXRlPiAke3RoaXMudG9rZW4uYXV0aG9yfSA8L2NpdGU+XG5cdFx0PC9kaXY+XG5cdGBcblxuXHRcdFx0Y29uc3QgcXVvdGVCbG9ja05vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJibG9ja3F1b3RlXCIpO1xuXHRcdFx0cXVvdGVCbG9ja05vZGUuaW5uZXJIVE1MID0gcXVvdGVCbG9jaztcblxuXG5cdFx0XHRjb25zdCBhcHAgPSB0aGlzLmh0bWxPdXRwdXQ7XG5cdFx0XHRjb25zdCBlbGVtQ2hpbGRyZW4gPSBhcHA/LmNoaWxkcmVuO1xuXHRcdFx0aWYgKGVsZW1DaGlsZHJlbikge1xuXHRcdFx0XHRpZiAoZWxlbUNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRhcHA/Lmxhc3RDaGlsZD8uYXBwZW5kQ2hpbGQocXVvdGVCbG9ja05vZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFwcC5hcHBlbmRDaGlsZChxdW90ZUJsb2NrTm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxufSIsImltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgVGFibGVIVE1MIHtcbiAgICBwcml2YXRlIERvbVV0aWxpdGVzOiBEb21VdGlsaXRlcztcbiAgICBwcml2YXRlIHRva2VuOiBUb2tlbi50YWJsZVRva2VuO1xuICAgIHByaXZhdGUgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcih0b2tlbjogVG9rZW4udGFibGVUb2tlbiwgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1x0XHRcbiAgICAgICAgdGhpcy5odG1sT3V0cHV0ID0gaHRtbE91dHB1dDtcbiAgICAgICAgdGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVGFibGVIZWFkKGhlYWRBcnJheTogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgdGFibGVIZWFkID0gXCI8dGhlYWQ+PHRyPlwiO1xuICAgICAgICBoZWFkQXJyYXkuZm9yRWFjaChoZWFkID0+IHtcbiAgICAgICAgICAgIHRhYmxlSGVhZCArPSBgPHRoIGNsYXNzPVwiYmctYmx1ZS0xMDAgYm9yZGVyIHRleHQtbGVmdCBweC04IHB5LTRcIj4ke2hlYWR9PC90aD5gO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhYmxlSGVhZCArICc8L3RyPjwvdGhlYWQ+JztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRhYmxlQm9keShib2R5QXJyYXk6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHRhYmxlQm9keSA9IFwiPHRyPlwiO1xuICAgICAgICBib2R5QXJyYXkuZm9yRWFjaChib2R5ID0+IHtcbiAgICAgICAgICAgIHRhYmxlQm9keSArPSBgPHRkIGNsYXNzPVwiYm9yZGVyIHB4LTggcHktNFwiPiR7Ym9keX08L3RkPmA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFibGVCb2R5ICsgJzwvdHI+JztcbiAgICB9XG5cbiAgICByZW5kZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy50b2tlbi5jaGlsZHJlbjtcbiAgICAgICAgbGV0IHRhYmxlID0gJyc7XG4gICAgICAgIGxldCB0YWJsZU5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgICAgICAgdGFibGVOb2RlLmNsYXNzTmFtZSA9IFwic2hhZG93LWxnIGJnLXdoaXRlIG1iLTRcIjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm93QXJyYXkgPSBjaGlsZHJlbltpXS52YWx1ZS5zcGxpdChcInxcIik7XG4gICAgICAgICAgICByb3dBcnJheS5wb3AoKTtcbiAgICAgICAgICAgIHJvd0FycmF5LnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICB0YWJsZSArPSB0aGlzLmNyZWF0ZVRhYmxlSGVhZChyb3dBcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYmxlICs9IHRoaXMuY3JlYXRlVGFibGVCb2R5KHJvd0FycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlTm9kZS5pbm5lckhUTUwgPSBgPHRib2R5PiR7dGFibGV9PC90Ym9keT5gO1xuXG4gICAgICAgIGNvbnN0IHBhcmFncmFwaE5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBwYXJhZ3JhcGhOb2RlLmFwcGVuZENoaWxkKHRhYmxlTm9kZSk7XG5cbiAgICAgICAgY29uc3QgYXBwID0gdGhpcy5odG1sT3V0cHV0O1xuICAgICAgICBhcHA/Lmxhc3RDaGlsZD8uYXBwZW5kQ2hpbGQocGFyYWdyYXBoTm9kZSk7XG4gICAgfVxufSIsIi8qKlxuICogQXV0aG9yOiBtZXVnZW5vbS5jb21cbiAqIFJlZmFjdG9yZWQ6IDE0LjEyLjIwMjNcbiAqIEVudHJ5IHBvaW50IG9mIHRoZSBhcHBsaWNhdGlvblxuICpcbiAqIG1hcmtkb3duIGNvbXBpbGVyIEFTQ0lJIGFydDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBcdF8gICAgICAgX1xuICogICAgICAgICBfIF9fIF9fXyAg4oCaIF9fIF8gXyBfX3wgfCBfX19ffCB8IF9fX19fICAgICAgX19fIF9fXG4gKiAgICAgICAgfCAnXyBgIF8gXFwgLyBfYCB8ICdfX3wgfC8gLyBfYCB8LyBfIFxcIFxcIC9cXCAvIC8gJ18gXFxcbiAqICAgICAgICB8IHwgfCB8IHwgfCAoX3wgfCB8ICB8ICAgPCAoX3wgfCAoXykgXFwgViAgViAvfCB8IHwgfFxuICogICAgICAgIHxffCB8X3wgfF98XFxfXyxffF98ICB8X3xcXF9cXF9fLF98XFxfX18vIFxcXy9cXF8vIHxffCB8X3xcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8gX1xuICogICAgICAgICAgICAgICAgIF9fXyBfX18gIF8gX18gX19fICBfIF9fIChfKSB8IF9fXyBfIF9fXG4gKiAgICAgICAgICAgICAgICAvIF9fLyBfIFxcfCAnXyBgIF8gXFx8ICdfIFxcfCB8IHwvIF8gXFwgJ19ffFxuICogICAgICAgICAgICAgICB8IChffCAoXykgfCB8IHwgfCB8IHwgfF8pIHwgfCB8ICBfXy8gfFxuICogICAgICAgICAgICAgICAgXFxfX19cXF9fXy98X3wgfF98IHxffCAuX18vfF98X3xcXF9fX3xffFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxffFxuICovXG5cbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSBcIi4vUGFyc2VyXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xuaW1wb3J0IFwiLi9zdGF0aWMvc3R5bGVzL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5cbmltcG9ydCBleGFtcGxlIGZyb20gJ3Jhdy1sb2FkZXIhLi9jb250ZW50L2FydGljbGVzL2hvdy10by13cml0ZS10ZXh0Lm1kJztcblxuXG4vL2NyZWF0ZSBhIERPTSB3aXRoIGEgZGl2IHdpdGggaWQgPSBhcHBcbmNvbnN0IGh0bWxPdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmh0bWxPdXRwdXQuaWQgPSBcImFwcFwiO1xuXG4vLyBBUEkgdG8gY29udmVydCBtYXJrZG93biB0byBIVE1MXG5mdW5jdGlvbiBjb252ZXJ0TUR0b0hUTUwodGV4dDogYW55KXtcbiAgICBsZXQgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih0ZXh0KTtcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHRva2VuaXplci50b2tlbnMpO1xuICAgIGNvbnN0IG91dHB1dCA6IGFueSA9IG5ldyBWaWV3KHBhcnNlci5hc3QsIGh0bWxPdXRwdXQpLmluaXQoKTsgICAgXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG4vL0FQSSB0byBjb252ZXJ0IG1hcmtkb3duIHRvIEFTVFxuZnVuY3Rpb24gY29udmVydE1EdG9BU1QodGV4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIodGV4dCk7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih0b2tlbml6ZXIudG9rZW5zKTtcbiAgICByZXR1cm4gcGFyc2VyLmFzdDtcbn1cblxuLy9BUEkgdG8gY29udmVydCBtYXJrZG93biB0byB0b2tlbnNcbmZ1bmN0aW9uIGNvbnZlcnRNRHRvVG9rZW5zKHRleHQ6IHN0cmluZykge1xuICAgIGxldCB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHRleHQpO1xuICAgIHJldHVybiB0b2tlbml6ZXIudG9rZW5zO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29udmVydE1EdG9IVE1MLFxuICAgIGNvbnZlcnRNRHRvQVNULFxuICAgIGNvbnZlcnRNRHRvVG9rZW5zXG4gIH07XG4gIFxuXG4vL3Nob3cgZXhhbXBsZVxuZnVuY3Rpb24gc2hvd0V4YW1wbGUoKXtcbiAgICAvLyByZW5kZXIgdGhlIGh0bWwgbm9kZSB0byB0aGUgRE9NIGZyb20gZXhpc3RlZCBpbmRleC5odG1sXG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSAhPSBudWxsICYmIGV4YW1wbGUgIT0gdW5kZWZpbmVkKXsgICAgXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk/LmFwcGVuZENoaWxkKGNvbnZlcnRNRHRvSFRNTChleGFtcGxlKSk7XG4gICAgfVxufVxuXG5cbi8vcnVuIHRoZSBleGFtcGxlXG5zaG93RXhhbXBsZSgpO1xuXG5cbi8vIGxhenkgbG9hZCBpbWFnZXNcbmNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXp5Jyk7XG5pbWFnZXMuZm9yRWFjaCgoaW1nKSA9PiB7XG4gICAgVXRpbHMubGF6eUxvYWRJbWFnZShpbWcgYXMgSFRNTEltYWdlRWxlbWVudCk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTklMXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9uaWwuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcGFyc2UuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFsaWRhdGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZhbGlkYXRlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmVyc2lvblwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdmVyc2lvbi5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MS5qc1wiKSk7XG5cbnZhciBfdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzLmpzXCIpKTtcblxudmFyIF92MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjQuanNcIikpO1xuXG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG5cbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIikpO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8qXG4gKiBCcm93c2VyLWNvbXBhdGlibGUgSmF2YVNjcmlwdCBNRDVcbiAqXG4gKiBNb2RpZmljYXRpb24gb2YgSmF2YVNjcmlwdCBNRDVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cbmZ1bmN0aW9uIG1kNShieXRlcykge1xuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlc1tpXSA9IG1zZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZDVUb0hleEVuY29kZWRBcnJheSh3b3Jkc1RvTWQ1KGJ5dGVzVG9Xb3JkcyhieXRlcyksIGJ5dGVzLmxlbmd0aCAqIDgpKTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYW4gYXJyYXkgb2YgYnl0ZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuICBjb25zdCBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyO1xuICBjb25zdCBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgY29uc3QgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgY29uc3QgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldE91dHB1dExlbmd0aChpbnB1dExlbmd0aDgpIHtcbiAgcmV0dXJuIChpbnB1dExlbmd0aDggKyA2NCA+Pj4gOSA8PCA0KSArIDE0ICsgMTtcbn1cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICovXG5cblxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICBsZXQgYSA9IDE3MzI1ODQxOTM7XG4gIGxldCBiID0gLTI3MTczMzg3OTtcbiAgbGV0IGMgPSAtMTczMjU4NDE5NDtcbiAgbGV0IGQgPSAyNzE3MzM4Nzg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgIGNvbnN0IG9sZGEgPSBhO1xuICAgIGNvbnN0IG9sZGIgPSBiO1xuICAgIGNvbnN0IG9sZGMgPSBjO1xuICAgIGNvbnN0IG9sZGQgPSBkO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICBhID0gc2FmZUFkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZUFkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZUFkZChkLCBvbGRkKTtcbiAgfVxuXG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBieXRlcyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJ5dGVzVG9Xb3JkcyhpbnB1dCkge1xuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgobGVuZ3RoOCkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0W2kgLyA4XSAmIDB4ZmYpIDw8IGkgJSAzMjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHNhZmVBZGQoeCwgeSkge1xuICBjb25zdCBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZik7XG4gIGNvbnN0IG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBtZDU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgbGV0IHY7XG4gIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG52YXIgX2RlZmF1bHQgPSBwYXJzZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0gL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBybmc7XG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgY29uc3QgSyA9IFsweDVhODI3OTk5LCAweDZlZDllYmExLCAweDhmMWJiY2RjLCAweGNhNjJjMWQ2XTtcbiAgY29uc3QgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICBjb25zdCBsID0gYnl0ZXMubGVuZ3RoIC8gNCArIDI7XG4gIGNvbnN0IE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgY29uc3QgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgIGFycltqXSA9IGJ5dGVzW2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tpICogNjQgKyBqICogNCArIDJdIDw8IDggfCBieXRlc1tpICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1baV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgKytpKSB7XG4gICAgY29uc3QgVyA9IG5ldyBVaW50MzJBcnJheSg4MCk7XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDE2OyArK3QpIHtcbiAgICAgIFdbdF0gPSBNW2ldW3RdO1xuICAgIH1cblxuICAgIGZvciAobGV0IHQgPSAxNjsgdCA8IDgwOyArK3QpIHtcbiAgICAgIFdbdF0gPSBST1RMKFdbdCAtIDNdIF4gV1t0IC0gOF0gXiBXW3QgLSAxNF0gXiBXW3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIGxldCBhID0gSFswXTtcbiAgICBsZXQgYiA9IEhbMV07XG4gICAgbGV0IGMgPSBIWzJdO1xuICAgIGxldCBkID0gSFszXTtcbiAgICBsZXQgZSA9IEhbNF07XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDgwOyArK3QpIHtcbiAgICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKHQgLyAyMCk7XG4gICAgICBjb25zdCBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbdF0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxudmFyIF9kZWZhdWx0ID0gc2hhMTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy51bnNhZmVTdHJpbmdpZnkgPSB1bnNhZmVTdHJpbmdpZnk7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbnZhciBfZGVmYXVsdCA9IHN0cmluZ2lmeTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcbmxldCBfbm9kZUlkO1xuXG5sZXQgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG5sZXQgX2xhc3RNU2VjcyA9IDA7XG5sZXQgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGxldCBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICBjb25zdCBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsZXQgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBsZXQgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICBjb25zdCBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgbGV0IG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICBsZXQgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICBjb25zdCBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIGNvbnN0IHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShiKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdjE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2MyA9ICgwLCBfdi5kZWZhdWx0KSgndjMnLCAweDMwLCBfbWQuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2MztcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIGNvbnN0IGJ5dGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuY29uc3QgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLkROUyA9IEROUztcbmNvbnN0IFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5VUkwgPSBVUkw7XG5cbmZ1bmN0aW9uIHYzNShuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgX25hbWVzcGFjZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHN0cmluZ1RvQnl0ZXModmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmICgoKF9uYW1lc3BhY2UgPSBuYW1lc3BhY2UpID09PSBudWxsIHx8IF9uYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9uYW1lc3BhY2UubGVuZ3RoKSAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX25hdGl2ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbmF0aXZlLmpzXCIpKTtcblxudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAoX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBfbmF0aXZlLmRlZmF1bHQucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkocm5kcyk7XG59XG5cbnZhciBfZGVmYXVsdCA9IHY0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2NSA9ICgwLCBfdi5kZWZhdWx0KSgndjUnLCAweDUwLCBfc2hhLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9yZWdleCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcmVnZXguanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmFsaWRhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2ZXJzaW9uKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxNSksIDE2KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmVyc2lvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=