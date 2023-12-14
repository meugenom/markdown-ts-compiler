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
        var CaptionBlock = "\t\n\t\t\t\t  <img src= ".concat(this.token.children[0].thumbnail, " class=\"float-left p-8\"/>\n                        <h3 class=\"text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600\">\n\t\t\t\t\t\t\t").concat(this.token.children[0].title.slice(2, this.token.children[0].title.length - 1), "</h3>\n\t\t\t\t\t\t<time class=\"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1\">\n                            ").concat(this.token.children[0].date, "\n                        </time> \n                        <div class=\"tag-container py-1\">\n\t\t\t\t\t\t\t").concat(tagsBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"categories-container py-1\">\n\t\t\t\t\t\t\t").concat(categoriesBlock, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t");
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
                text = text + "\n\t\t\t\t<div class=\"flex flex-wrap justify-center\">\n\t\t\t\t\t<div class=\"w-6/12 sm:w-4/12 px-4 pb-20\">\n\t\t\t\t\t\t<img src=\"".concat(child.url, "\" alt=\"").concat(child.alt, "\" class=\"shadow rounded max-w-full h-auto allign-middle border-none\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t");
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
var how_to_write_text_md_1 = __importDefault(__webpack_require__(/*! raw-loader!./content/articles/how-to-write-text.md */ "./node_modules/raw-loader/dist/cjs.js!./src/content/articles/how-to-write-text.md"));
var htmlOutput = document.createElement('div');
htmlOutput.id = "app";
function convertMDtoHTML(text) {
    var tokenizer = new Tokenizer_1.Tokenizer(text);
    var parser = new Parser_1.Parser(tokenizer.tokens);
    console.log(parser.ast);
    var output = new View_1.View(parser.ast, htmlOutput).init();
    console.log(output);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvcHJpc20uY3NzP2RlYTciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvcXVvdGUuY3NzPzBhZjQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL3N0YXRpYy9zdHlsZXMvc3R5bGUuY3NzPzg1ODciLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcHJpc20uanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2NvbnRlbnQvYXJ0aWNsZXMvaG93LXRvLXdyaXRlLXRleHQubWQiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL0NhcHRpb24udHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL0dyYW1tYXIudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL1BhcnNlci50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvVG9rZW5pemVyLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9UeXBlcy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvVmlldy50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9DYXB0aW9uSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9Db2RlQmxvY2tIVE1MLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0RvbVV0aWxpdGVzLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9odG1sYmxvY2tzL0hlYWRlckhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvTGlzdEhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvUGFyYWdyYXBoSFRNTC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9zcmMvaHRtbGJsb2Nrcy9RdW90ZUhUTUwudHMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vc3JjL2h0bWxibG9ja3MvVGFibGVIVE1MLnRzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL21kNS5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3BhcnNlLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zaGExLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YxLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92My5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjM1LmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjUuanMiLCJ3ZWJwYWNrOi8vbWFya2Rvd24tdGFpbHdpbmQtY3NzLWNvbXBpbGVyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYXJrZG93bi10YWlsd2luZC1jc3MtY29tcGlsZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL21hcmtkb3duLXRhaWx3aW5kLWNzcy1jb21waWxlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNvcmUuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiV2ViV29ya2VyXCIvPlxuXG52YXIgX3NlbGYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cdD8gd2luZG93ICAgLy8gaWYgaW4gYnJvd3NlclxuXHQ6IChcblx0XHQodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpXG5cdFx0XHQ/IHNlbGYgLy8gaWYgaW4gd29ya2VyXG5cdFx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqXG4gKiBAbGljZW5zZSBNSVQgPGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuICogQGF1dGhvciBMZWEgVmVyb3UgPGh0dHBzOi8vbGVhLnZlcm91Lm1lPlxuICogQG5hbWVzcGFjZVxuICogQHB1YmxpY1xuICovXG52YXIgUHJpc20gPSAoZnVuY3Rpb24gKF9zZWxmKSB7XG5cblx0Ly8gUHJpdmF0ZSBoZWxwZXIgdmFyc1xuXHR2YXIgbGFuZyA9IC8oPzpefFxccylsYW5nKD86dWFnZSk/LShbXFx3LV0rKSg/PVxcc3wkKS9pO1xuXHR2YXIgdW5pcXVlSWQgPSAwO1xuXG5cdC8vIFRoZSBncmFtbWFyIG9iamVjdCBmb3IgcGxhaW50ZXh0XG5cdHZhciBwbGFpblRleHRHcmFtbWFyID0ge307XG5cblxuXHR2YXIgXyA9IHtcblx0XHQvKipcblx0XHQgKiBCeSBkZWZhdWx0LCBQcmlzbSB3aWxsIGF0dGVtcHQgdG8gaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIChieSBjYWxsaW5nIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGx9KSBvbiB0aGVcblx0XHQgKiBjdXJyZW50IHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgZmluaXNoZWQgbG9hZGluZy4gVGhpcyBtaWdodCBiZSBhIHByb2JsZW0gaWYgZS5nLiB5b3Ugd2FudGVkIHRvIGFzeW5jaHJvbm91c2x5IGxvYWRcblx0XHQgKiBhZGRpdGlvbmFsIGxhbmd1YWdlcyBvciBwbHVnaW5zIHlvdXJzZWxmLlxuXHRcdCAqXG5cdFx0ICogQnkgc2V0dGluZyB0aGlzIHZhbHVlIHRvIGB0cnVlYCwgUHJpc20gd2lsbCBub3QgYXV0b21hdGljYWxseSBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgb24gdGhlIHBhZ2UuXG5cdFx0ICpcblx0XHQgKiBZb3Ugb2J2aW91c2x5IGhhdmUgdG8gY2hhbmdlIHRoaXMgdmFsdWUgYmVmb3JlIHRoZSBhdXRvbWF0aWMgaGlnaGxpZ2h0aW5nIHN0YXJ0ZWQuIFRvIGRvIHRoaXMsIHlvdSBjYW4gYWRkIGFuXG5cdFx0ICogZW1wdHkgUHJpc20gb2JqZWN0IGludG8gdGhlIGdsb2JhbCBzY29wZSBiZWZvcmUgbG9hZGluZyB0aGUgUHJpc20gc2NyaXB0IGxpa2UgdGhpczpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogd2luZG93LlByaXNtID0gd2luZG93LlByaXNtIHx8IHt9O1xuXHRcdCAqIFByaXNtLm1hbnVhbCA9IHRydWU7XG5cdFx0ICogLy8gYWRkIGEgbmV3IDxzY3JpcHQ+IHRvIGxvYWQgUHJpc20ncyBzY3JpcHRcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdG1hbnVhbDogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuXHRcdC8qKlxuXHRcdCAqIEJ5IGRlZmF1bHQsIGlmIFByaXNtIGlzIGluIGEgd2ViIHdvcmtlciwgaXQgYXNzdW1lcyB0aGF0IGl0IGlzIGluIGEgd29ya2VyIGl0IGNyZWF0ZWQgaXRzZWxmLCBzbyBpdCB1c2VzXG5cdFx0ICogYGFkZEV2ZW50TGlzdGVuZXJgIHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCBpbnN0YW5jZS4gSG93ZXZlciwgaWYgeW91J3JlIHVzaW5nIFByaXNtIG1hbnVhbGx5IGluIHlvdXJcblx0XHQgKiBvd24gd29ya2VyLCB5b3UgZG9uJ3Qgd2FudCBpdCB0byBkbyB0aGlzLlxuXHRcdCAqXG5cdFx0ICogQnkgc2V0dGluZyB0aGlzIHZhbHVlIHRvIGB0cnVlYCwgUHJpc20gd2lsbCBub3QgYWRkIGl0cyBvd24gbGlzdGVuZXJzIHRvIHRoZSB3b3JrZXIuXG5cdFx0ICpcblx0XHQgKiBZb3Ugb2J2aW91c2x5IGhhdmUgdG8gY2hhbmdlIHRoaXMgdmFsdWUgYmVmb3JlIFByaXNtIGV4ZWN1dGVzLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIgPSB0cnVlO1xuXHRcdCAqIC8vIExvYWQgUHJpc20ncyBzY3JpcHRcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcjogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyLFxuXG5cdFx0LyoqXG5cdFx0ICogQSBuYW1lc3BhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcy5cblx0XHQgKlxuXHRcdCAqIEFsbCBmdW5jdGlvbiBpbiB0aGlzIG5hbWVzcGFjZSB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBtYXJrZWQgYXMgX3B1YmxpY18gYXJlIGZvciBfX2ludGVybmFsIHVzZSBvbmx5X18gYW5kIG1heVxuXHRcdCAqIGNoYW5nZSBvciBkaXNhcHBlYXIgYXQgYW55IHRpbWUuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICovXG5cdFx0dXRpbDoge1xuXHRcdFx0ZW5jb2RlOiBmdW5jdGlvbiBlbmNvZGUodG9rZW5zKSB7XG5cdFx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIGVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbnMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoZW5jb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIHRoZSBnaXZlbiB2YWx1ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge2FueX0gb1xuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiB0eXBlKG51bGwpICAgICAgPT09ICdOdWxsJ1xuXHRcdFx0ICogdHlwZSh1bmRlZmluZWQpID09PSAnVW5kZWZpbmVkJ1xuXHRcdFx0ICogdHlwZSgxMjMpICAgICAgID09PSAnTnVtYmVyJ1xuXHRcdFx0ICogdHlwZSgnZm9vJykgICAgID09PSAnU3RyaW5nJ1xuXHRcdFx0ICogdHlwZSh0cnVlKSAgICAgID09PSAnQm9vbGVhbidcblx0XHRcdCAqIHR5cGUoWzEsIDJdKSAgICA9PT0gJ0FycmF5J1xuXHRcdFx0ICogdHlwZSh7fSkgICAgICAgID09PSAnT2JqZWN0J1xuXHRcdFx0ICogdHlwZShTdHJpbmcpICAgID09PSAnRnVuY3Rpb24nXG5cdFx0XHQgKiB0eXBlKC9hYmMrLykgICAgPT09ICdSZWdFeHAnXG5cdFx0XHQgKi9cblx0XHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIGEgdW5pcXVlIG51bWJlciBmb3IgdGhlIGdpdmVuIG9iamVjdC4gTGF0ZXIgY2FsbHMgd2lsbCBzdGlsbCByZXR1cm4gdGhlIHNhbWUgbnVtYmVyLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0XHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdFx0XHQgKi9cblx0XHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19pZCcsIHsgdmFsdWU6ICsrdW5pcXVlSWQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBtYWluIGludGVuZGVkIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNsb25lIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7VH0gb1xuXHRcdFx0ICogQHBhcmFtIHtSZWNvcmQ8bnVtYmVyLCBhbnk+fSBbdmlzaXRlZF1cblx0XHRcdCAqIEByZXR1cm5zIHtUfVxuXHRcdFx0ICogQHRlbXBsYXRlIFRcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmU6IGZ1bmN0aW9uIGRlZXBDbG9uZShvLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBjbG9uZTsgdmFyIGlkO1xuXHRcdFx0XHRzd2l0Y2ggKF8udXRpbC50eXBlKG8pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb25lID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBkZWVwQ2xvbmUob1trZXldLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IFtdO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0KC8qKiBAdHlwZSB7QXJyYXl9ICovKC8qKiBAdHlwZSB7YW55fSAqLyhvKSkpLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVbaV0gPSBkZWVwQ2xvbmUodiwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBvO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIFByaXNtIGxhbmd1YWdlIG9mIHRoZSBnaXZlbiBlbGVtZW50IHNldCBieSBhIGBsYW5ndWFnZS14eHh4YCBvciBgbGFuZy14eHh4YCBjbGFzcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBubyBsYW5ndWFnZSBpcyBzZXQgZm9yIHRoZSBlbGVtZW50IG9yIHRoZSBlbGVtZW50IGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgYG5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRnZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0d2hpbGUgKGVsZW1lbnQpIHtcblx0XHRcdFx0XHR2YXIgbSA9IGxhbmcuZXhlYyhlbGVtZW50LmNsYXNzTmFtZSk7XG5cdFx0XHRcdFx0aWYgKG0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBtWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICdub25lJztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0cyB0aGUgUHJpc20gYGxhbmd1YWdlLXh4eHhgIGNsYXNzIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG5cdFx0XHQgKiBAcmV0dXJucyB7dm9pZH1cblx0XHRcdCAqL1xuXHRcdFx0c2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50LCBsYW5ndWFnZSkge1xuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGBsYW5ndWFnZS14eHh4YCBjbGFzc2VzXG5cdFx0XHRcdC8vICh0aGlzIG1pZ2h0IGxlYXZlIGJlaGluZCBhIGxlYWRpbmcgc3BhY2UpXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAobGFuZywgJ2dpJyksICcnKTtcblxuXHRcdFx0XHQvLyBhZGQgdGhlIG5ldyBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Ncblx0XHRcdFx0Ly8gKHVzaW5nIGBjbGFzc0xpc3RgIHdpbGwgYXV0b21hdGljYWxseSBjbGVhbiB1cCBzcGFjZXMgZm9yIHVzKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLScgKyBsYW5ndWFnZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIHNjcmlwdCBlbGVtZW50IHRoYXQgaXMgY3VycmVudGx5IGV4ZWN1dGluZy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGRvZXMgX19ub3RfXyB3b3JrIGZvciBsaW5lIHNjcmlwdCBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtIVE1MU2NyaXB0RWxlbWVudCB8IG51bGx9XG5cdFx0XHQgKi9cblx0XHRcdGN1cnJlbnRTY3JpcHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJ2N1cnJlbnRTY3JpcHQnIGluIGRvY3VtZW50ICYmIDEgPCAyIC8qIGhhY2sgdG8gdHJpcCBUUycgZmxvdyBhbmFseXNpcyAqLykge1xuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUUxMSB3b3JrYXJvdW5kXG5cdFx0XHRcdC8vIHdlJ2xsIGdldCB0aGUgc3JjIG9mIHRoZSBjdXJyZW50IHNjcmlwdCBieSBwYXJzaW5nIElFMTEncyBlcnJvciBzdGFjayB0cmFjZVxuXHRcdFx0XHQvLyB0aGlzIHdpbGwgbm90IHdvcmsgZm9yIGlubGluZSBzY3JpcHRzXG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IGZpbGUgc3JjIHVybCBmcm9tIHN0YWNrLiBTcGVjaWZpY2FsbHkgd29ya3Mgd2l0aCB0aGUgZm9ybWF0IG9mIHN0YWNrIHRyYWNlcyBpbiBJRS5cblx0XHRcdFx0XHQvLyBBIHN0YWNrIHdpbGwgbG9vayBsaWtlIHRoaXM6XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBFcnJvclxuXHRcdFx0XHRcdC8vICAgIGF0IF8udXRpbC5jdXJyZW50U2NyaXB0IChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczoxMTk6NSlcblx0XHRcdFx0XHQvLyAgICBhdCBHbG9iYWwgY29kZSAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6NjA2OjEpXG5cblx0XHRcdFx0XHR2YXIgc3JjID0gKC9hdCBbXihcXHJcXG5dKlxcKCguKik6W146XSs6W146XStcXCkkL2kuZXhlYyhlcnIuc3RhY2spIHx8IFtdKVsxXTtcblx0XHRcdFx0XHRpZiAoc3JjKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgaW4gc2NyaXB0cykge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NyaXB0c1tpXS5zcmMgPT0gc3JjKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNjcmlwdHNbaV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gY2xhc3MgaXMgYWN0aXZlIGZvciBgZWxlbWVudGAuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIGNsYXNzIGNhbiBiZSBhY3RpdmF0ZWQgaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIGl0IGNhbiBiZSBkZWFjdGl2YXRlZFxuXHRcdFx0ICogaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBjbGFzcy4gVGhlIF9uZWdhdGVkIHZlcnNpb25fIG9mIHRoZVxuXHRcdFx0ICogZ2l2ZW4gY2xhc3MgaXMganVzdCB0aGUgZ2l2ZW4gY2xhc3Mgd2l0aCBhIGBuby1gIHByZWZpeC5cblx0XHRcdCAqXG5cdFx0XHQgKiBXaGV0aGVyIHRoZSBjbGFzcyBpcyBhY3RpdmUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiBgZWxlbWVudGAgKHdoZXJlIGBlbGVtZW50YCBpdHNlbGYgaXNcblx0XHRcdCAqIGNsb3Nlc3QgYW5jZXN0b3IpIHRoYXQgaGFzIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LiBJZiBuZWl0aGVyIGBlbGVtZW50YCBub3IgYW55IG9mIGl0c1xuXHRcdFx0ICogYW5jZXN0b3JzIGhhdmUgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQsIHRoZW4gdGhlIGRlZmF1bHQgYWN0aXZhdGlvbiB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEluIHRoZSBwYXJhZG94aWNhbCBzaXR1YXRpb24gd2hlcmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgY29udGFpbnMgX19ib3RoX18gdGhlIGdpdmVuIGNsYXNzIGFuZCB0aGUgbmVnYXRlZFxuXHRcdFx0ICogdmVyc2lvbiBvZiBpdCwgdGhlIGNsYXNzIGlzIGNvbnNpZGVyZWQgYWN0aXZlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFufSBbZGVmYXVsdEFjdGl2YXRpb249ZmFsc2VdXG5cdFx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0XHRcdCAqL1xuXHRcdFx0aXNBY3RpdmU6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGRlZmF1bHRBY3RpdmF0aW9uKSB7XG5cdFx0XHRcdHZhciBubyA9ICduby0nICsgY2xhc3NOYW1lO1xuXG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMobm8pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICEhZGVmYXVsdEFjdGl2YXRpb247XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgbmFtZXNwYWNlIGNvbnRhaW5zIGFsbCBjdXJyZW50bHkgbG9hZGVkIGxhbmd1YWdlcyBhbmQgdGhlIHNvbWUgaGVscGVyIGZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIG1vZGlmeSBsYW5ndWFnZXMuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGxhbmd1YWdlczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgZ3JhbW1hciBmb3IgcGxhaW4sIHVuZm9ybWF0dGVkIHRleHQuXG5cdFx0XHQgKi9cblx0XHRcdHBsYWluOiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0cGxhaW50ZXh0OiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0dGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHR4dDogcGxhaW5UZXh0R3JhbW1hcixcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjb3B5IG9mIHRoZSBsYW5ndWFnZSB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgYXBwZW5kcyB0aGUgZ2l2ZW4gdG9rZW5zLlxuXHRcdFx0ICpcblx0XHRcdCAqIElmIGEgdG9rZW4gaW4gYHJlZGVmYCBhbHNvIGFwcGVhcnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSwgdGhlbiB0aGUgZXhpc3RpbmcgdG9rZW4gaW4gdGhlIGNvcGllZCBsYW5ndWFnZVxuXHRcdFx0ICogd2lsbCBiZSBvdmVyd3JpdHRlbiBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb24uXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgQmVzdCBwcmFjdGljZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBTaW5jZSB0aGUgcG9zaXRpb24gb2Ygb3ZlcndyaXRpbmcgdG9rZW5zICh0b2tlbiBpbiBgcmVkZWZgIHRoYXQgb3ZlcndyaXRlIHRva2VucyBpbiB0aGUgY29waWVkIGxhbmd1YWdlKVxuXHRcdFx0ICogZG9lc24ndCBtYXR0ZXIsIHRoZXkgY2FuIHRlY2huaWNhbGx5IGJlIGluIGFueSBvcmRlci4gSG93ZXZlciwgdGhpcyBjYW4gYmUgY29uZnVzaW5nIHRvIG90aGVycyB0aGF0IHRyeWluZyB0b1xuXHRcdFx0ICogdW5kZXJzdGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBiZWNhdXNlLCBub3JtYWxseSwgdGhlIG9yZGVyIG9mIHRva2VucyBtYXR0ZXJzIGluIFByaXNtIGdyYW1tYXJzLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZXJlZm9yZSwgaXQgaXMgZW5jb3VyYWdlZCB0byBvcmRlciBvdmVyd3JpdGluZyB0b2tlbnMgYWNjb3JkaW5nIHRvIHRoZSBwb3NpdGlvbnMgb2YgdGhlIG92ZXJ3cml0dGVuIHRva2Vucy5cblx0XHRcdCAqIEZ1cnRoZXJtb3JlLCBhbGwgbm9uLW92ZXJ3cml0aW5nIHRva2VucyBzaG91bGQgYmUgcGxhY2VkIGFmdGVyIHRoZSBvdmVyd3JpdGluZyBvbmVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGxhbmd1YWdlIHRvIGV4dGVuZC4gVGhpcyBoYXMgdG8gYmUgYSBrZXkgaW4gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IHJlZGVmIFRoZSBuZXcgdG9rZW5zIHRvIGFwcGVuZC5cblx0XHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGxhbmd1YWdlIGNyZWF0ZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzWydjc3Mtd2l0aC1jb2xvcnMnXSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcblx0XHRcdCAqICAgICAvLyBQcmlzbS5sYW5ndWFnZXMuY3NzIGFscmVhZHkgaGFzIGEgJ2NvbW1lbnQnIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgb3ZlcndyaXRlIENTUycgJ2NvbW1lbnQnIHRva2VuXG5cdFx0XHQgKiAgICAgLy8gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uXG5cdFx0XHQgKiAgICAgJ2NvbW1lbnQnOiB7IC4uLiB9LFxuXHRcdFx0ICogICAgIC8vIENTUyBkb2Vzbid0IGhhdmUgYSAnY29sb3InIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgYmUgYXBwZW5kZWRcblx0XHRcdCAqICAgICAnY29sb3InOiAvXFxiKD86cmVkfGdyZWVufGJsdWUpXFxiL1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKi9cblx0XHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbGFuZztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW5zZXJ0cyB0b2tlbnMgX2JlZm9yZV8gYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGRlZmluaXRpb24gb3IgYW55IG90aGVyIGdyYW1tYXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgVXNhZ2Vcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGhlbHBlciBtZXRob2QgbWFrZXMgaXQgZWFzeSB0byBtb2RpZnkgZXhpc3RpbmcgbGFuZ3VhZ2VzLiBGb3IgZXhhbXBsZSwgdGhlIENTUyBsYW5ndWFnZSBkZWZpbml0aW9uXG5cdFx0XHQgKiBub3Qgb25seSBkZWZpbmVzIENTUyBoaWdobGlnaHRpbmcgZm9yIENTUyBkb2N1bWVudHMsIGJ1dCBhbHNvIG5lZWRzIHRvIGRlZmluZSBoaWdobGlnaHRpbmcgZm9yIENTUyBlbWJlZGRlZFxuXHRcdFx0ICogaW4gSFRNTCB0aHJvdWdoIGA8c3R5bGU+YCBlbGVtZW50cy4gVG8gZG8gdGhpcywgaXQgbmVlZHMgdG8gbW9kaWZ5IGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBhbmQgYWRkIHRoZVxuXHRcdFx0ICogYXBwcm9wcmlhdGUgdG9rZW5zLiBIb3dldmVyLCBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgaXMgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0IGxpdGVyYWwsIHNvIGlmIHlvdSBkb1xuXHRcdFx0ICogdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5zdHlsZSA9IHtcblx0XHRcdCAqICAgICAvLyB0b2tlblxuXHRcdFx0ICogfTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqIHRoZW4gdGhlIGBzdHlsZWAgdG9rZW4gd2lsbCBiZSBhZGRlZCAoYW5kIHByb2Nlc3NlZCkgYXQgdGhlIGVuZC4gYGluc2VydEJlZm9yZWAgYWxsb3dzIHlvdSB0byBpbnNlcnQgdG9rZW5zXG5cdFx0XHQgKiBiZWZvcmUgZXhpc3RpbmcgdG9rZW5zLiBGb3IgdGhlIENTUyBleGFtcGxlIGFib3ZlLCB5b3Ugd291bGQgdXNlIGl0IGxpa2UgdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywge1xuXHRcdFx0ICogICAgICdzdHlsZSc6IHtcblx0XHRcdCAqICAgICAgICAgLy8gdG9rZW5cblx0XHRcdCAqICAgICB9XG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFNwZWNpYWwgY2FzZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBJZiB0aGUgZ3JhbW1hcnMgb2YgYGluc2lkZWAgYW5kIGBpbnNlcnRgIGhhdmUgdG9rZW5zIHdpdGggdGhlIHNhbWUgbmFtZSwgdGhlIHRva2VucyBpbiBgaW5zaWRlYCdzIGdyYW1tYXJcblx0XHRcdCAqIHdpbGwgYmUgaWdub3JlZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGJlaGF2aW9yIGNhbiBiZSB1c2VkIHRvIGluc2VydCB0b2tlbnMgYWZ0ZXIgYGJlZm9yZWA6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50Jywge1xuXHRcdFx0ICogICAgICdjb21tZW50JzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5jb21tZW50LFxuXHRcdFx0ICogICAgIC8vIHRva2VucyBhZnRlciAnY29tbWVudCdcblx0XHRcdCAqIH0pO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgTGltaXRhdGlvbnNcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBwcm9ibGVtIGBpbnNlcnRCZWZvcmVgIGhhcyB0byBzb2x2ZSBpcyBpdGVyYXRpb24gb3JkZXIuIFNpbmNlIEVTMjAxNSwgdGhlIGl0ZXJhdGlvbiBvcmRlciBmb3Igb2JqZWN0XG5cdFx0XHQgKiBwcm9wZXJ0aWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgdGhlIGluc2VydGlvbiBvcmRlciAoZXhjZXB0IGZvciBpbnRlZ2VyIGtleXMpIGJ1dCBzb21lIGJyb3dzZXJzIGJlaGF2ZVxuXHRcdFx0ICogZGlmZmVyZW50bHkgd2hlbiBrZXlzIGFyZSBkZWxldGVkIGFuZCByZS1pbnNlcnRlZC4gU28gYGluc2VydEJlZm9yZWAgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgYnkgdGVtcG9yYXJpbHlcblx0XHRcdCAqIGRlbGV0aW5nIHByb3BlcnRpZXMgd2hpY2ggaXMgbmVjZXNzYXJ5IHRvIGluc2VydCBhdCBhcmJpdHJhcnkgcG9zaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRvIHNvbHZlIHRoaXMgcHJvYmxlbSwgYGluc2VydEJlZm9yZWAgZG9lc24ndCBhY3R1YWxseSBpbnNlcnQgdGhlIGdpdmVuIHRva2VucyBpbnRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHRcdFx0ICogSW5zdGVhZCwgaXQgd2lsbCBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCByZXBsYWNlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIG5ldyBvbmUuIFRoaXNcblx0XHRcdCAqIGNhbiBiZSBkb25lIHdpdGhvdXQgdGVtcG9yYXJpbHkgZGVsZXRpbmcgcHJvcGVydGllcywgc28gdGhlIGl0ZXJhdGlvbiBvcmRlciBpcyB3ZWxsLWRlZmluZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogSG93ZXZlciwgb25seSByZWZlcmVuY2VzIHRoYXQgY2FuIGJlIHJlYWNoZWQgZnJvbSBgUHJpc20ubGFuZ3VhZ2VzYCBvciBgaW5zZXJ0YCB3aWxsIGJlIHJlcGxhY2VkLiBJLmUuIGlmXG5cdFx0XHQgKiB5b3UgaG9sZCB0aGUgdGFyZ2V0IG9iamVjdCBpbiBhIHZhcmlhYmxlLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGUgd2lsbCBub3QgY2hhbmdlLlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiB2YXIgb2xkTWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0XHRcdCAqIHZhciBuZXdNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHsgLi4uIH0pO1xuXHRcdFx0ICpcblx0XHRcdCAqIGFzc2VydChvbGRNYXJrdXAgIT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYXNzZXJ0KG5ld01hcmt1cCA9PT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaW5zaWRlIFRoZSBwcm9wZXJ0eSBvZiBgcm9vdGAgKGUuZy4gYSBsYW5ndWFnZSBpZCBpbiBgUHJpc20ubGFuZ3VhZ2VzYCkgdGhhdCBjb250YWlucyB0aGVcblx0XHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBpbnNlcnQgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlycyB0byBiZSBpbnNlcnRlZC5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW3Jvb3RdIFRoZSBvYmplY3QgY29udGFpbmluZyBgaW5zaWRlYCwgaS5lLiB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogRGVmYXVsdHMgdG8gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBncmFtbWFyIG9iamVjdC5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0XHRyb290ID0gcm9vdCB8fCAvKiogQHR5cGUge2FueX0gKi8gKF8ubGFuZ3VhZ2VzKTtcblx0XHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHRcdC8qKiBAdHlwZSB7R3JhbW1hcn0gKi9cblx0XHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIERvIG5vdCBpbnNlcnQgdG9rZW4gd2hpY2ggYWxzbyBvY2N1ciBpbiBpbnNlcnQuIFNlZSAjMTUyNVxuXHRcdFx0XHRcdFx0aWYgKCFpbnNlcnQuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb2xkID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHRyb290W2luc2lkZV0gPSByZXQ7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gb2xkICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRcdERGUzogZnVuY3Rpb24gREZTKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBvYmpJZCA9IF8udXRpbC5vYmpJZDtcblxuXHRcdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBvW2ldO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5VHlwZSA9IF8udXRpbC50eXBlKHByb3BlcnR5KTtcblxuXHRcdFx0XHRcdFx0aWYgKHByb3BlcnR5VHlwZSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBudWxsLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlUeXBlID09PSAnQXJyYXknICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgaSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgbW9zdCBoaWdoLWxldmVsIGZ1bmN0aW9uIGluIFByaXNt4oCZcyBBUEkuXG5cdFx0ICogSXQgZmV0Y2hlcyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHMge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uXG5cdFx0ICogZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byBgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjaylgLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbiAoYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHRfLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGZXRjaGVzIGFsbCB0aGUgZGVzY2VuZGFudHMgb2YgYGNvbnRhaW5lcmAgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxsc1xuXHRcdCAqIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvbiBlYWNoIG9uZSBvZiB0aGVtLlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLWhpZ2hsaWdodGFsbGBcblx0XHQgKiAyLiBgYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHRgXG5cdFx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBmb3IgZWFjaCBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBjb250YWluZXIgVGhlIHJvb3QgZWxlbWVudCwgd2hvc2UgZGVzY2VuZGFudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyB3aWxsIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIGVhY2ggZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vycy5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGFmdGVyIGl0cyBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsVW5kZXI6IGZ1bmN0aW9uIChjb250YWluZXIsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRjb250YWluZXI6IGNvbnRhaW5lcixcblx0XHRcdFx0c2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcblx0XHRcdH07XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVudi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChlbnYuc2VsZWN0b3IpKTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IChlbGVtZW50ID0gZW52LmVsZW1lbnRzW2krK10pOykge1xuXHRcdFx0XHRfLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCwgYXN5bmMgPT09IHRydWUsIGVudi5jYWxsYmFjayk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEhpZ2hsaWdodHMgdGhlIGNvZGUgaW5zaWRlIGEgc2luZ2xlIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtc2FuaXR5LWNoZWNrYFxuXHRcdCAqIDIuIGBiZWZvcmUtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0fS4gVGhlc2UgaG9va3Mgd2lsbCBiZSBydW4gYnkgYW4gYXN5bmNocm9ub3VzIHdvcmtlciBpZiBgYXN5bmNgIGlzIGB0cnVlYC5cblx0XHQgKiA0LiBgYmVmb3JlLWluc2VydGBcblx0XHQgKiA1LiBgYWZ0ZXItaGlnaGxpZ2h0YFxuXHRcdCAqIDYuIGBjb21wbGV0ZWBcblx0XHQgKlxuXHRcdCAqIFNvbWUgdGhlIGFib3ZlIGhvb2tzIHdpbGwgYmUgc2tpcHBlZCBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gYW55IHRleHQgb3IgdGhlcmUgaXMgbm8gZ3JhbW1hciBsb2FkZWQgZm9yXG5cdFx0ICogdGhlIGVsZW1lbnQncyBsYW5ndWFnZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb2RlLlxuXHRcdCAqIEl0IG11c3QgaGF2ZSBhIGNsYXNzIG9mIGBsYW5ndWFnZS14eHh4YCB0byBiZSBwcm9jZXNzZWQsIHdoZXJlIGB4eHh4YCBpcyBhIHZhbGlkIGxhbmd1YWdlIGlkZW50aWZpZXIuXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnNcblx0XHQgKiB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZCBhdm9pZCBibG9ja2luZyB0aGUgVUkgd2hlbiBoaWdobGlnaHRpbmcgdmVyeSBsYXJnZSBjaHVua3Mgb2YgY29kZS4gVGhpcyBvcHRpb24gaXNcblx0XHQgKiBbZGlzYWJsZWQgYnkgZGVmYXVsdF0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9mYXEuaHRtbCN3aHktaXMtYXN5bmNocm9ub3VzLWhpZ2hsaWdodGluZy1kaXNhYmxlZC1ieS1kZWZhdWx0KS5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IEFsbCBsYW5ndWFnZSBkZWZpbml0aW9ucyByZXF1aXJlZCB0byBoaWdobGlnaHQgdGhlIGNvZGUgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgbWFpbiBgcHJpc20uanNgIGZpbGUgZm9yXG5cdFx0ICogYXN5bmNocm9ub3VzIGhpZ2hsaWdodGluZyB0byB3b3JrLiBZb3UgY2FuIGJ1aWxkIHlvdXIgb3duIGJ1bmRsZSBvbiB0aGVcblx0XHQgKiBbRG93bmxvYWQgcGFnZV0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9kb3dubG9hZC5odG1sKS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHRcdCAqIE1vc3RseSB1c2VmdWwgd2hlbiBgYXN5bmNgIGlzIGB0cnVlYCwgc2luY2UgaW4gdGhhdCBjYXNlLCB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHRcdHZhciBsYW5ndWFnZSA9IF8udXRpbC5nZXRMYW5ndWFnZShlbGVtZW50KTtcblx0XHRcdHZhciBncmFtbWFyID0gXy5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRfLnV0aWwuc2V0TGFuZ3VhZ2UoZWxlbWVudCwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJykge1xuXHRcdFx0XHRfLnV0aWwuc2V0TGFuZ3VhZ2UocGFyZW50LCBsYW5ndWFnZSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRjb2RlOiBjb2RlXG5cdFx0XHR9O1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRIaWdobGlnaHRlZENvZGUoaGlnaGxpZ2h0ZWRDb2RlKSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRcdC8vIHBsdWdpbnMgbWF5IGNoYW5nZS9hZGQgdGhlIHBhcmVudC9lbGVtZW50XG5cdFx0XHRwYXJlbnQgPSBlbnYuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScgJiYgIXBhcmVudC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcblx0XHRcdFx0cGFyZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoZXZ0LmRhdGEpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0XHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdFx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdFx0fTtcblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBsYW5ndWFnZSBcIicgKyBlbnYubGFuZ3VhZ2UgKyAnXCIgaGFzIG5vIGdyYW1tYXIuJyk7XG5cdFx0XHR9XG5cdFx0XHRlbnYudG9rZW5zID0gXy50b2tlbml6ZShlbnYuY29kZSwgZW52LmdyYW1tYXIpO1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLXRva2VuaXplJywgZW52KTtcblx0XHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZShlbnYudG9rZW5zKSwgZW52Lmxhbmd1YWdlKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgaGVhcnQgb2YgUHJpc20sIGFuZCB0aGUgbW9zdCBsb3ctbGV2ZWwgZnVuY3Rpb24geW91IGNhbiB1c2UuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHRcdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSB0b2tlbml6ZWQgY29kZS5cblx0XHQgKlxuXHRcdCAqIFdoZW4gdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gaW5jbHVkZXMgbmVzdGVkIHRva2VucywgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCByZWN1cnNpdmVseSBvbiBlYWNoIG9mIHRoZXNlIHRva2Vucy5cblx0XHQgKlxuXHRcdCAqIFRoaXMgbWV0aG9kIGNvdWxkIGJlIHVzZWZ1bCBpbiBvdGhlciBjb250ZXh0cyBhcyB3ZWxsLCBhcyBhIHZlcnkgY3J1ZGUgcGFyc2VyLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcmV0dXJucyB7VG9rZW5TdHJlYW19IEFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHRva2VucywgYSB0b2tlbiBzdHJlYW0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogbGV0IGNvZGUgPSBgdmFyIGZvbyA9IDA7YDtcblx0XHQgKiBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQpO1xuXHRcdCAqIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcblx0XHQgKiAgICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUHJpc20uVG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHQgKiAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBudW1lcmljIGxpdGVyYWw6ICR7dG9rZW4uY29udGVudH1gKTtcblx0XHQgKiAgICAgfVxuXHRcdCAqIH0pO1xuXHRcdCAqL1xuXHRcdHRva2VuaXplOiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hcikge1xuXHRcdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cdFx0XHRpZiAocmVzdCkge1xuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2tlbkxpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuXHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCB0b2tlbkxpc3QuaGVhZCwgdGV4dCk7XG5cblx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHRva2VuTGlzdC5oZWFkLCAwKTtcblxuXHRcdFx0cmV0dXJuIHRvQXJyYXkodG9rZW5MaXN0KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRob29rczoge1xuXHRcdFx0YWxsOiB7fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBZGRzIHRoZSBnaXZlbiBjYWxsYmFjayB0byB0aGUgbGlzdCBvZiBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBob29rLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaG9vayBpdCBpcyByZWdpc3RlcmVkIGZvciBpcyBydW4uXG5cdFx0XHQgKiBIb29rcyBhcmUgdXN1YWxseSBkaXJlY3RseSBydW4gYnkgYSBoaWdobGlnaHQgZnVuY3Rpb24gYnV0IHlvdSBjYW4gYWxzbyBydW4gaG9va3MgeW91cnNlbGYuXG5cdFx0XHQgKlxuXHRcdFx0ICogT25lIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbiBiZSByZWdpc3RlcmVkIHRvIG11bHRpcGxlIGhvb2tzIGFuZCB0aGUgc2FtZSBob29rIG11bHRpcGxlIHRpbWVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtIb29rQ2FsbGJhY2t9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJ1bnMgYSBob29rIGludm9raW5nIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQ2FsbGJhY2tzIHdpbGwgYmUgaW52b2tlZCBzeW5jaHJvbm91c2x5IGFuZCBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rIHBhc3NlZCB0byBhbGwgY2FsbGJhY2tzIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgY2FsbGJhY2s7IChjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdKTspIHtcblx0XHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdFRva2VuOiBUb2tlblxuXHR9O1xuXHRfc2VsZi5QcmlzbSA9IF87XG5cblxuXHQvLyBUeXBlc2NyaXB0IG5vdGU6XG5cdC8vIFRoZSBmb2xsb3dpbmcgY2FuIGJlIHVzZWQgdG8gaW1wb3J0IHRoZSBUb2tlbiB0eXBlIGluIEpTRG9jOlxuXHQvL1xuXHQvLyAgIEB0eXBlZGVmIHtJbnN0YW5jZVR5cGU8aW1wb3J0KFwiLi9wcmlzbS1jb3JlXCIpW1wiVG9rZW5cIl0+fSBUb2tlblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IHRva2VuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBTZWUge0BsaW5rIFRva2VuI3R5cGUgdHlwZX1cblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlblN0cmVhbX0gY29udGVudCBTZWUge0BsaW5rIFRva2VuI2NvbnRlbnQgY29udGVudH1cblx0ICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbbWF0Y2hlZFN0cj1cIlwiXSBBIGNvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbS5cblx0ICogQGNsYXNzXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0ZnVuY3Rpb24gVG9rZW4odHlwZSwgY29udGVudCwgYWxpYXMsIG1hdGNoZWRTdHIpIHtcblx0XHQvKipcblx0XHQgKiBUaGUgdHlwZSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGtleSBvZiBhIHBhdHRlcm4gaW4gYSB7QGxpbmsgR3JhbW1hcn0uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHN0cmluZ3Mgb3IgdG9rZW5zIGNvbnRhaW5lZCBieSB0aGlzIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyB3aWxsIGJlIGEgdG9rZW4gc3RyZWFtIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZWQgYWxzbyBkZWZpbmVkIGFuIGBpbnNpZGVgIGdyYW1tYXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19XG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdFx0LyoqXG5cdFx0ICogVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfHN0cmluZ1tdfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuYWxpYXMgPSBhbGlhcztcblx0XHQvLyBDb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb21cblx0XHR0aGlzLmxlbmd0aCA9IChtYXRjaGVkU3RyIHx8ICcnKS5sZW5ndGggfCAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgdG9rZW4gc3RyZWFtIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHtAbGluayBUb2tlbiBUb2tlbn0gb2JqZWN0cy5cblx0ICpcblx0ICogVG9rZW4gc3RyZWFtcyBoYXZlIHRvIGZ1bGZpbGwgYSBmZXcgcHJvcGVydGllcyB0aGF0IGFyZSBhc3N1bWVkIGJ5IG1vc3QgZnVuY3Rpb25zIChtb3N0bHkgaW50ZXJuYWwgb25lcykgdGhhdCBwcm9jZXNzXG5cdCAqIHRoZW0uXG5cdCAqXG5cdCAqIDEuIE5vIGFkamFjZW50IHN0cmluZ3MuXG5cdCAqIDIuIE5vIGVtcHR5IHN0cmluZ3MuXG5cdCAqXG5cdCAqICAgIFRoZSBvbmx5IGV4Y2VwdGlvbiBoZXJlIGlzIHRoZSB0b2tlbiBzdHJlYW0gdGhhdCBvbmx5IGNvbnRhaW5zIHRoZSBlbXB0eSBzdHJpbmcgYW5kIG5vdGhpbmcgZWxzZS5cblx0ICpcblx0ICogQHR5cGVkZWYge0FycmF5PHN0cmluZyB8IFRva2VuPn0gVG9rZW5TdHJlYW1cblx0ICogQGdsb2JhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGFuIEhUTUwgcmVwcmVzZW50YXRpb24uXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuIHwgVG9rZW5TdHJlYW19IG8gVGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBiZSBjb252ZXJ0ZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiBjdXJyZW50IGxhbmd1YWdlLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtLlxuXHQgKiBAbWVtYmVyb2YgVG9rZW5cblx0ICogQHN0YXRpY1xuXHQgKi9cblx0VG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG8sIGxhbmd1YWdlKSB7XG5cdFx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRvLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cyArPSBzdHJpbmdpZnkoZSwgbGFuZ3VhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0dHlwZTogby50eXBlLFxuXHRcdFx0Y29udGVudDogc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UpLFxuXHRcdFx0dGFnOiAnc3BhbicsXG5cdFx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0fTtcblxuXHRcdHZhciBhbGlhc2VzID0gby5hbGlhcztcblx0XHRpZiAoYWxpYXNlcykge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZW52LmNsYXNzZXMucHVzaChhbGlhc2VzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0XHR2YXIgYXR0cmlidXRlcyA9ICcnO1xuXHRcdGZvciAodmFyIG5hbWUgaW4gZW52LmF0dHJpYnV0ZXMpIHtcblx0XHRcdGF0dHJpYnV0ZXMgKz0gJyAnICsgbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuXHRcdH1cblxuXHRcdHJldHVybiAnPCcgKyBlbnYudGFnICsgJyBjbGFzcz1cIicgKyBlbnYuY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwb3Ncblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcblx0ICogQHBhcmFtIHtib29sZWFufSBsb29rYmVoaW5kXG5cdCAqIEByZXR1cm5zIHtSZWdFeHBFeGVjQXJyYXkgfCBudWxsfVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCkge1xuXHRcdHBhdHRlcm4ubGFzdEluZGV4ID0gcG9zO1xuXHRcdHZhciBtYXRjaCA9IHBhdHRlcm4uZXhlYyh0ZXh0KTtcblx0XHRpZiAobWF0Y2ggJiYgbG9va2JlaGluZCAmJiBtYXRjaFsxXSkge1xuXHRcdFx0Ly8gY2hhbmdlIHRoZSBtYXRjaCB0byByZW1vdmUgdGhlIHRleHQgbWF0Y2hlZCBieSB0aGUgUHJpc20gbG9va2JlaGluZCBncm91cFxuXHRcdFx0dmFyIGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRtYXRjaC5pbmRleCArPSBsb29rYmVoaW5kTGVuZ3RoO1xuXHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShsb29rYmVoaW5kTGVuZ3RoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG1hdGNoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxzdHJpbmcgfCBUb2tlbj59IHRva2VuTGlzdFxuXHQgKiBAcGFyYW0ge2FueX0gZ3JhbW1hclxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPHN0cmluZyB8IFRva2VuPn0gc3RhcnROb2RlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFBvc1xuXHQgKiBAcGFyYW0ge1JlbWF0Y2hPcHRpb25zfSBbcmVtYXRjaF1cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqIEBwcml2YXRlXG5cdCAqXG5cdCAqIEB0eXBlZGVmIFJlbWF0Y2hPcHRpb25zXG5cdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXVzZVxuXHQgKiBAcHJvcGVydHkge251bWJlcn0gcmVhY2hcblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHN0YXJ0Tm9kZSwgc3RhcnRQb3MsIHJlbWF0Y2gpIHtcblx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZiAoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRwYXR0ZXJucyA9IEFycmF5LmlzQXJyYXkocGF0dGVybnMpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlbWF0Y2guY2F1c2UgPT0gdG9rZW4gKyAnLCcgKyBqKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHBhdHRlcm5PYmogPSBwYXR0ZXJuc1tqXTtcblx0XHRcdFx0dmFyIGluc2lkZSA9IHBhdHRlcm5PYmouaW5zaWRlO1xuXHRcdFx0XHR2YXIgbG9va2JlaGluZCA9ICEhcGF0dGVybk9iai5sb29rYmVoaW5kO1xuXHRcdFx0XHR2YXIgZ3JlZWR5ID0gISFwYXR0ZXJuT2JqLmdyZWVkeTtcblx0XHRcdFx0dmFyIGFsaWFzID0gcGF0dGVybk9iai5hbGlhcztcblxuXHRcdFx0XHRpZiAoZ3JlZWR5ICYmICFwYXR0ZXJuT2JqLnBhdHRlcm4uZ2xvYmFsKSB7XG5cdFx0XHRcdFx0Ly8gV2l0aG91dCB0aGUgZ2xvYmFsIGZsYWcsIGxhc3RJbmRleCB3b24ndCB3b3JrXG5cdFx0XHRcdFx0dmFyIGZsYWdzID0gcGF0dGVybk9iai5wYXR0ZXJuLnRvU3RyaW5nKCkubWF0Y2goL1tpbXN1eV0qJC8pWzBdO1xuXHRcdFx0XHRcdHBhdHRlcm5PYmoucGF0dGVybiA9IFJlZ0V4cChwYXR0ZXJuT2JqLnBhdHRlcm4uc291cmNlLCBmbGFncyArICdnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiogQHR5cGUge1JlZ0V4cH0gKi9cblx0XHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuT2JqLnBhdHRlcm4gfHwgcGF0dGVybk9iajtcblxuXHRcdFx0XHRmb3IgKCAvLyBpdGVyYXRlIHRoZSB0b2tlbiBsaXN0IGFuZCBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHRva2VuL3N0cmluZyBwb3NpdGlvblxuXHRcdFx0XHRcdHZhciBjdXJyZW50Tm9kZSA9IHN0YXJ0Tm9kZS5uZXh0LCBwb3MgPSBzdGFydFBvcztcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSAhPT0gdG9rZW5MaXN0LnRhaWw7XG5cdFx0XHRcdFx0cG9zICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aCwgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG5cdFx0XHRcdCkge1xuXG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcG9zID49IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBzdHIgPSBjdXJyZW50Tm9kZS52YWx1ZTtcblxuXHRcdFx0XHRcdGlmICh0b2tlbkxpc3QubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlQ291bnQgPSAxOyAvLyB0aGlzIGlzIHRoZSB0byBwYXJhbWV0ZXIgb2YgcmVtb3ZlQmV0d2VlblxuXHRcdFx0XHRcdHZhciBtYXRjaDtcblxuXHRcdFx0XHRcdGlmIChncmVlZHkpIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ID49IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdFx0dmFyIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR2YXIgcCA9IHBvcztcblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBtYXRjaFxuXHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoZnJvbSA+PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcblx0XHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBhZGp1c3QgcG9zIChhbmQgcClcblx0XHRcdFx0XHRcdHAgLT0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0cG9zID0gcDtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIGN1cnJlbnQgbm9kZSBpcyBhIFRva2VuLCB0aGVuIHRoZSBtYXRjaCBzdGFydHMgaW5zaWRlIGFub3RoZXIgVG9rZW4sIHdoaWNoIGlzIGludmFsaWRcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Tm9kZS52YWx1ZSBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBmaW5kIHRoZSBsYXN0IG5vZGUgd2hpY2ggaXMgYWZmZWN0ZWQgYnkgdGhpcyBtYXRjaFxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIGsgPSBjdXJyZW50Tm9kZTtcblx0XHRcdFx0XHRcdFx0ayAhPT0gdG9rZW5MaXN0LnRhaWwgJiYgKHAgPCB0byB8fCB0eXBlb2Ygay52YWx1ZSA9PT0gJ3N0cmluZycpO1xuXHRcdFx0XHRcdFx0XHRrID0gay5uZXh0XG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQrKztcblx0XHRcdFx0XHRcdFx0cCArPSBrLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJlbW92ZUNvdW50LS07XG5cblx0XHRcdFx0XHRcdC8vIHJlcGxhY2Ugd2l0aCB0aGUgbmV3IG1hdGNoXG5cdFx0XHRcdFx0XHRzdHIgPSB0ZXh0LnNsaWNlKHBvcywgcCk7XG5cdFx0XHRcdFx0XHRtYXRjaC5pbmRleCAtPSBwb3M7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIDAsIHN0ciwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdHZhciBtYXRjaFN0ciA9IG1hdGNoWzBdO1xuXHRcdFx0XHRcdHZhciBiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSk7XG5cdFx0XHRcdFx0dmFyIGFmdGVyID0gc3RyLnNsaWNlKGZyb20gKyBtYXRjaFN0ci5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0dmFyIHJlYWNoID0gcG9zICsgc3RyLmxlbmd0aDtcblx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSByZWFjaDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlRnJvbSA9IGN1cnJlbnROb2RlLnByZXY7XG5cblx0XHRcdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVGcm9tID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCBiZWZvcmUpO1xuXHRcdFx0XHRcdFx0cG9zICs9IGJlZm9yZS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVtb3ZlUmFuZ2UodG9rZW5MaXN0LCByZW1vdmVGcm9tLCByZW1vdmVDb3VudCk7XG5cblx0XHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlID8gXy50b2tlbml6ZShtYXRjaFN0ciwgaW5zaWRlKSA6IG1hdGNoU3RyLCBhbGlhcywgbWF0Y2hTdHIpO1xuXHRcdFx0XHRcdGN1cnJlbnROb2RlID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCB3cmFwcGVkKTtcblxuXHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCBjdXJyZW50Tm9kZSwgYWZ0ZXIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZW1vdmVDb3VudCA+IDEpIHtcblx0XHRcdFx0XHRcdC8vIGF0IGxlYXN0IG9uZSBUb2tlbiBvYmplY3Qgd2FzIHJlbW92ZWQsIHNvIHdlIGhhdmUgdG8gZG8gc29tZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0XHQvLyB0aGlzIGNhbiBvbmx5IGhhcHBlbiBpZiB0aGUgY3VycmVudCBwYXR0ZXJuIGlzIGdyZWVkeVxuXG5cdFx0XHRcdFx0XHQvKiogQHR5cGUge1JlbWF0Y2hPcHRpb25zfSAqL1xuXHRcdFx0XHRcdFx0dmFyIG5lc3RlZFJlbWF0Y2ggPSB7XG5cdFx0XHRcdFx0XHRcdGNhdXNlOiB0b2tlbiArICcsJyArIGosXG5cdFx0XHRcdFx0XHRcdHJlYWNoOiByZWFjaFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIGN1cnJlbnROb2RlLnByZXYsIHBvcywgbmVzdGVkUmVtYXRjaCk7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSByZWFjaCBtaWdodCBoYXZlIGJlZW4gZXh0ZW5kZWQgYmVjYXVzZSBvZiB0aGUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgbmVzdGVkUmVtYXRjaC5yZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IG5lc3RlZFJlbWF0Y2gucmVhY2g7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIExpbmtlZExpc3ROb2RlXG5cdCAqIEBwcm9wZXJ0eSB7VH0gdmFsdWVcblx0ICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IHByZXYgVGhlIHByZXZpb3VzIG5vZGUuXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBuZXh0IFRoZSBuZXh0IG5vZGUuXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciBoZWFkID0geyB2YWx1ZTogbnVsbCwgcHJldjogbnVsbCwgbmV4dDogbnVsbCB9O1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dmFyIHRhaWwgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBoZWFkLCBuZXh0OiBudWxsIH07XG5cdFx0aGVhZC5uZXh0ID0gdGFpbDtcblxuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dGhpcy5oZWFkID0gaGVhZDtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMudGFpbCA9IHRhaWw7XG5cdFx0dGhpcy5sZW5ndGggPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBuZXcgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgbGlzdC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtUfSB2YWx1ZVxuXHQgKiBAcmV0dXJucyB7TGlua2VkTGlzdE5vZGU8VD59IFRoZSBhZGRlZCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gYWRkQWZ0ZXIobGlzdCwgbm9kZSwgdmFsdWUpIHtcblx0XHQvLyBhc3N1bWVzIHRoYXQgbm9kZSAhPSBsaXN0LnRhaWwgJiYgdmFsdWVzLmxlbmd0aCA+PSAwXG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cblx0XHR2YXIgbmV3Tm9kZSA9IHsgdmFsdWU6IHZhbHVlLCBwcmV2OiBub2RlLCBuZXh0OiBuZXh0IH07XG5cdFx0bm9kZS5uZXh0ID0gbmV3Tm9kZTtcblx0XHRuZXh0LnByZXYgPSBuZXdOb2RlO1xuXHRcdGxpc3QubGVuZ3RoKys7XG5cblx0XHRyZXR1cm4gbmV3Tm9kZTtcblx0fVxuXHQvKipcblx0ICogUmVtb3ZlcyBgY291bnRgIG5vZGVzIGFmdGVyIHRoZSBnaXZlbiBub2RlLiBUaGUgZ2l2ZW4gbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gY291bnRcblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHJlbW92ZVJhbmdlKGxpc3QsIG5vZGUsIGNvdW50KSB7XG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAmJiBuZXh0ICE9PSBsaXN0LnRhaWw7IGkrKykge1xuXHRcdFx0bmV4dCA9IG5leHQubmV4dDtcblx0XHR9XG5cdFx0bm9kZS5uZXh0ID0gbmV4dDtcblx0XHRuZXh0LnByZXYgPSBub2RlO1xuXHRcdGxpc3QubGVuZ3RoIC09IGk7XG5cdH1cblx0LyoqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcmV0dXJucyB7VFtdfVxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG5cdFx0dmFyIGFycmF5ID0gW107XG5cdFx0dmFyIG5vZGUgPSBsaXN0LmhlYWQubmV4dDtcblx0XHR3aGlsZSAobm9kZSAhPT0gbGlzdC50YWlsKSB7XG5cdFx0XHRhcnJheS5wdXNoKG5vZGUudmFsdWUpO1xuXHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHR9XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblxuXHRpZiAoIV9zZWxmLmRvY3VtZW50KSB7XG5cdFx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHQvLyBpbiBOb2RlLmpzXG5cdFx0XHRyZXR1cm4gXztcblx0XHR9XG5cblx0XHRpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG5cdFx0XHQvLyBJbiB3b3JrZXJcblx0XHRcdF9zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSk7XG5cdFx0XHRcdHZhciBsYW5nID0gbWVzc2FnZS5sYW5ndWFnZTtcblx0XHRcdFx0dmFyIGNvZGUgPSBtZXNzYWdlLmNvZGU7XG5cdFx0XHRcdHZhciBpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG5cblx0XHRcdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRcdFx0aWYgKGltbWVkaWF0ZUNsb3NlKSB7XG5cdFx0XHRcdFx0X3NlbGYuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHJldHVybiBfO1xuXHR9XG5cblx0Ly8gR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcblx0dmFyIHNjcmlwdCA9IF8udXRpbC5jdXJyZW50U2NyaXB0KCk7XG5cblx0aWYgKHNjcmlwdCkge1xuXHRcdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdFx0aWYgKHNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRcdF8ubWFudWFsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2soKSB7XG5cdFx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGwoKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIV8ubWFudWFsKSB7XG5cdFx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwibG9hZGluZ1wiLCB0aGVuIHdlJ2xsIHVzZSBET01Db250ZW50TG9hZGVkLlxuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImludGVyYWN0aXZlXCIgYW5kIHRoZSBwcmlzbS5qcyBzY3JpcHQgaXMgZGVmZXJyZWQsIHRoZW4gd2UnbGwgYWxzbyB1c2UgdGhlXG5cdFx0Ly8gRE9NQ29udGVudExvYWRlZCBldmVudCBiZWNhdXNlIHRoZXJlIG1pZ2h0IGJlIHNvbWUgcGx1Z2lucyBvciBsYW5ndWFnZXMgd2hpY2ggaGF2ZSBhbHNvIGJlZW4gZGVmZXJyZWQgYW5kIHRoZXlcblx0XHQvLyBtaWdodCB0YWtlIGxvbmdlciBvbmUgYW5pbWF0aW9uIGZyYW1lIHRvIGV4ZWN1dGUgd2hpY2ggY2FuIGNyZWF0ZSBhIHJhY2UgY29uZGl0aW9uIHdoZXJlIG9ubHkgc29tZSBwbHVnaW5zIGhhdmVcblx0XHQvLyBiZWVuIGxvYWRlZCB3aGVuIFByaXNtLmhpZ2hsaWdodEFsbCgpIGlzIGV4ZWN1dGVkLCBkZXBlbmRpbmcgb24gaG93IGZhc3QgcmVzb3VyY2VzIGFyZSBsb2FkZWQuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2lzc3Vlcy8yMTAyXG5cdFx0dmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuXHRcdGlmIChyZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiBzY3JpcHQgJiYgc2NyaXB0LmRlZmVyKSB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrLCAxNik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIF87XG5cbn0oX3NlbGYpKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cbi8vIGhhY2sgZm9yIGNvbXBvbmVudHMgdG8gd29yayBjb3JyZWN0bHkgaW4gbm9kZS5qc1xuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdGdsb2JhbC5QcmlzbSA9IFByaXNtO1xufVxuXG4vLyBzb21lIGFkZGl0aW9uYWwgZG9jdW1lbnRhdGlvbi90eXBlc1xuXG4vKipcbiAqIFRoZSBleHBhbnNpb24gb2YgYSBzaW1wbGUgYFJlZ0V4cGAgbGl0ZXJhbCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgcHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiBHcmFtbWFyVG9rZW5cbiAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwYXR0ZXJuIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gb2YgdGhlIHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbbG9va2JlaGluZD1mYWxzZV0gSWYgYHRydWVgLCB0aGVuIHRoZSBmaXJzdCBjYXB0dXJpbmcgZ3JvdXAgb2YgYHBhdHRlcm5gIHdpbGwgKGVmZmVjdGl2ZWx5KVxuICogYmVoYXZlIGFzIGEgbG9va2JlaGluZCBncm91cCBtZWFuaW5nIHRoYXQgdGhlIGNhcHR1cmVkIHRleHQgd2lsbCBub3QgYmUgcGFydCBvZiB0aGUgbWF0Y2hlZCB0ZXh0IG9mIHRoZSBuZXcgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtncmVlZHk9ZmFsc2VdIFdoZXRoZXIgdGhlIHRva2VuIGlzIGdyZWVkeS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIEFuIG9wdGlvbmFsIGFsaWFzIG9yIGxpc3Qgb2YgYWxpYXNlcy5cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW2luc2lkZV0gVGhlIG5lc3RlZCBncmFtbWFyIG9mIHRoaXMgdG9rZW4uXG4gKlxuICogVGhlIGBpbnNpZGVgIGdyYW1tYXIgd2lsbCBiZSB1c2VkIHRvIHRva2VuaXplIHRoZSB0ZXh0IHZhbHVlIG9mIGVhY2ggdG9rZW4gb2YgdGhpcyBraW5kLlxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbWFrZSBuZXN0ZWQgYW5kIGV2ZW4gcmVjdXJzaXZlIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuICpcbiAqIE5vdGU6IFRoaXMgY2FuIGNhdXNlIGluZmluaXRlIHJlY3Vyc2lvbi4gQmUgY2FyZWZ1bCB3aGVuIHlvdSBlbWJlZCBkaWZmZXJlbnQgbGFuZ3VhZ2VzIG9yIGV2ZW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaW50b1xuICogZWFjaCBhbm90aGVyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYgR3JhbW1hclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFJlZ0V4cCB8IEdyYW1tYXJUb2tlbiB8IEFycmF5PFJlZ0V4cCB8IEdyYW1tYXJUb2tlbj4+fVxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbcmVzdF0gQW4gb3B0aW9uYWwgZ3JhbW1hciBvYmplY3QgdGhhdCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgZ3JhbW1hci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBpbnZva2VkIGFmdGVyIGFuIGVsZW1lbnQgd2FzIHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqXG4gKiBAY2FsbGJhY2sgSGlnaGxpZ2h0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBIb29rQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2suXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tbWFya3VwLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC88IS0tKD86KD8hPCEtLSlbXFxzXFxTXSkqPy0tPi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdwcm9sb2cnOiB7XG5cdFx0cGF0dGVybjogLzxcXD9bXFxzXFxTXSs/XFw/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdkb2N0eXBlJzoge1xuXHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94bWwvI05ULWRvY3R5cGVkZWNsXG5cdFx0cGF0dGVybjogLzwhRE9DVFlQRSg/OltePlwiJ1tcXF1dfFwiW15cIl0qXCJ8J1teJ10qJykrKD86XFxbKD86W148XCInXFxdXXxcIlteXCJdKlwifCdbXiddKid8PCg/ISEtLSl8PCEtLSg/OlteLV18LSg/IS0+KSkqLS0+KSpcXF1cXHMqKT8+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2ludGVybmFsLXN1YnNldCc6IHtcblx0XHRcdFx0cGF0dGVybjogLyheW15cXFtdKlxcWylbXFxzXFxTXSsoPz1cXF0+JCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL148IXw+JHxbW1xcXV0vLFxuXHRcdFx0J2RvY3R5cGUtdGFnJzogL15ET0NUWVBFL2ksXG5cdFx0XHQnbmFtZSc6IC9bXlxcczw+J1wiXSsvXG5cdFx0fVxuXHR9LFxuXHQnY2RhdGEnOiB7XG5cdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3BlY2lhbC1hdHRyJzogW10sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXihcXHMqKVtcIiddfFtcIiddJC8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcblx0XHRcdGFsaWFzOiAnbmFtZWQtZW50aXR5J1xuXHRcdH0sXG5cdFx0LyYjeD9bXFxkYS1mXXsxLDh9Oy9pXG5cdF1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cblx0aWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkSW5saW5lZCcsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gaW5saW5lZCBsYW5ndWFnZSB0byBtYXJrdXAuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgPHN0eWxlPmAgdGFncy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuXHRcdHZhciBpbmNsdWRlZENkYXRhSW5zaWRlID0ge307XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2NkYXRhJ10gPSAvXjwhXFxbQ0RBVEFcXFt8XFxdXFxdPiQvaTtcblxuXHRcdHZhciBpbnNpZGUgPSB7XG5cdFx0XHQnaW5jbHVkZWQtY2RhdGEnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRcdFx0aW5zaWRlOiBpbmNsdWRlZENkYXRhSW5zaWRlXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXG5cdFx0dmFyIGRlZiA9IHt9O1xuXHRcdGRlZlt0YWdOYW1lXSA9IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRhZ05hbWU7IH0pLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZTogaW5zaWRlXG5cdFx0fTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIGRlZik7XG5cdH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkQXR0cmlidXRlJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBwYXR0ZXJuIHRvIGhpZ2hsaWdodCBsYW5ndWFnZXMgZW1iZWRkZWQgaW4gSFRNTCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYHN0eWxlYCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gKGF0dHJOYW1lLCBsYW5nKSB7XG5cdFx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlWydzcGVjaWFsLWF0dHInXS5wdXNoKHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdFx0LyhefFtcIidcXHNdKS8uc291cmNlICsgJyg/OicgKyBhdHRyTmFtZSArICcpJyArIC9cXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSkvLnNvdXJjZSxcblx0XHRcdFx0J2knXG5cdFx0XHQpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzogL15bXlxccz1dKy8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC89W1xcc1xcU10rLyxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd2YWx1ZSc6IHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhePVxccyooW1wiJ118KD8hW1wiJ10pKSlcXFNbXFxzXFxTXSooPz1cXDIkKS8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiBbbGFuZywgJ2xhbmd1YWdlLScgKyBsYW5nXSxcblx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLnhtbCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcblByaXNtLmxhbmd1YWdlcy5zc21sID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5hdG9tID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5yc3MgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tY3NzLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHR2YXIgc3RyaW5nID0gLyg/OlwiKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W15cIlxcXFxcXHJcXG5dKSpcInwnKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W14nXFxcXFxcclxcbl0pKicpLztcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuXHRcdCdjb21tZW50JzogL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLFxuXHRcdCdhdHJ1bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ0BbXFxcXHctXSg/OicgKyAvW147e1xcc1wiJ118XFxzKyg/IVxccykvLnNvdXJjZSArICd8JyArIHN0cmluZy5zb3VyY2UgKyAnKSo/JyArIC8oPzo7fCg/PVxccypcXHspKS8uc291cmNlKSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQncnVsZSc6IC9eQFtcXHctXSsvLFxuXHRcdFx0XHQnc2VsZWN0b3ItZnVuY3Rpb24tYXJndW1lbnQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhcXGJzZWxlY3RvclxccypcXChcXHMqKD8hW1xccyldKSkoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0YWxpYXM6ICdzZWxlY3Rvcidcblx0XHRcdFx0fSxcblx0XHRcdFx0J2tleXdvcmQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhefFteXFx3LV0pKD86YW5kfG5vdHxvbmx5fG9yKSg/IVtcXHctXSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3VybCc6IHtcblx0XHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXFxcXGJ1cmxcXFxcKCg/OicgKyBzdHJpbmcuc291cmNlICsgJ3wnICsgLyg/OlteXFxcXFxcclxcbigpXCInXXxcXFxcW1xcc1xcU10pKi8uc291cmNlICsgJylcXFxcKScsICdpJyksXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2Z1bmN0aW9uJzogL151cmwvaSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC8sXG5cdFx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHN0cmluZy5zb3VyY2UgKyAnJCcpLFxuXHRcdFx0XHRcdGFsaWFzOiAndXJsJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnc2VsZWN0b3InOiB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJyhefFt7fVxcXFxzXSlbXnt9XFxcXHNdKD86W157fTtcIlxcJ1xcXFxzXXxcXFxccysoPyFbXFxcXHN7XSl8JyArIHN0cmluZy5zb3VyY2UgKyAnKSooPz1cXFxccypcXFxceyknKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiBzdHJpbmcsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdCdwcm9wZXJ0eSc6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi1cXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpWy1fYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnaW1wb3J0YW50JzogLyFpbXBvcnRhbnRcXGIvaSxcblx0XHQnZnVuY3Rpb24nOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tYS16MC05XSlbLWEtejAtOV0rKD89XFwoKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3B1bmN0dWF0aW9uJzogL1soKXt9OzosXS9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5jc3M7XG5cblx0dmFyIG1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdGlmIChtYXJrdXApIHtcblx0XHRtYXJrdXAudGFnLmFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHRcdG1hcmt1cC50YWcuYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcblx0fVxuXG59KFByaXNtKSk7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jbGlrZS5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG5cdCdjb21tZW50JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLyhcXGIoPzpjbGFzc3xleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxpbnRlcmZhY2V8bmV3fHRyYWl0KVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bLlxcXFxdL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKD86YnJlYWt8Y2F0Y2h8Y29udGludWV8ZG98ZWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxpZnxpbnxpbnN0YW5jZW9mfG5ld3xudWxsfHJldHVybnx0aHJvd3x0cnl8d2hpbGUpXFxiLyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuXHQnZnVuY3Rpb24nOiAvXFxiXFx3Kyg/PVxcKCkvLFxuXHQnbnVtYmVyJzogL1xcYjB4W1xcZGEtZl0rXFxifCg/OlxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzplWystXT9cXGQrKT8vaSxcblx0J29wZXJhdG9yJzogL1s8Pl09P3xbIT1dPT89P3wtLT98XFwrXFwrP3wmJj98XFx8XFx8P3xbPyovfl4lXS8sXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbn07XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1qYXZhc2NyaXB0LmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdjbGFzcy1uYW1lJzogW1xuXHRcdFByaXNtLmxhbmd1YWdlcy5jbGlrZVsnY2xhc3MtbmFtZSddLFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpW18kQS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFwuKD86Y29uc3RydWN0b3J8cHJvdG90eXBlKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J2tleXdvcmQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpefFxcfSlcXHMqKWNhdGNoXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi5dfFxcLlxcLlxcLlxccyopXFxiKD86YXN8YXNzZXJ0KD89XFxzKlxceyl8YXN5bmMoPz1cXHMqKD86ZnVuY3Rpb25cXGJ8XFwofFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGF3YWl0fGJyZWFrfGNhc2V8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHkoPz1cXHMqKD86XFx7fCQpKXxmb3J8ZnJvbSg/PVxccyooPzpbJ1wiXXwkKSl8ZnVuY3Rpb258KD86Z2V0fHNldCkoPz1cXHMqKD86WyNcXFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRdLFxuXHQvLyBBbGxvdyBmb3IgYWxsIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIChTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjAwODQ0NClcblx0J2Z1bmN0aW9uJzogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyooPzpcXC5cXHMqKD86YXBwbHl8YmluZHxjYWxsKVxccyopP1xcKCkvLFxuXHQnbnVtYmVyJzoge1xuXHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdC8oXnxbXlxcdyRdKS8uc291cmNlICtcblx0XHRcdCcoPzonICtcblx0XHRcdChcblx0XHRcdFx0Ly8gY29uc3RhbnRcblx0XHRcdFx0L05hTnxJbmZpbml0eS8uc291cmNlICtcblx0XHRcdFx0J3wnICtcblx0XHRcdFx0Ly8gYmluYXJ5IGludGVnZXJcblx0XHRcdFx0LzBbYkJdWzAxXSsoPzpfWzAxXSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBvY3RhbCBpbnRlZ2VyXG5cdFx0XHRcdC8wW29PXVswLTddKyg/Ol9bMC03XSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBoZXhhZGVjaW1hbCBpbnRlZ2VyXG5cdFx0XHRcdC8wW3hYXVtcXGRBLUZhLWZdKyg/Ol9bXFxkQS1GYS1mXSspKm4/Ly5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBkZWNpbWFsIGJpZ2ludFxuXHRcdFx0XHQvXFxkKyg/Ol9cXGQrKSpuLy5zb3VyY2UgK1xuXHRcdFx0XHQnfCcgK1xuXHRcdFx0XHQvLyBkZWNpbWFsIG51bWJlciAoaW50ZWdlciBvciBmbG9hdCkgYnV0IG5vIGJpZ2ludFxuXHRcdFx0XHQvKD86XFxkKyg/Ol9cXGQrKSooPzpcXC4oPzpcXGQrKD86X1xcZCspKik/KT98XFwuXFxkKyg/Ol9cXGQrKSopKD86W0VlXVsrLV0/XFxkKyg/Ol9cXGQrKSopPy8uc291cmNlXG5cdFx0XHQpICtcblx0XHRcdCcpJyArXG5cdFx0XHQvKD8hW1xcdyRdKS8uc291cmNlXG5cdFx0KSxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdvcGVyYXRvcic6IC8tLXxcXCtcXCt8XFwqXFwqPT98PT58JiY9P3xcXHxcXHw9P3xbIT1dPT18PDw9P3w+Pj4/PT98Wy0rKi8lJnxeIT08Pl09P3xcXC57M318XFw/XFw/PT98XFw/XFwuP3xbfjpdL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydjbGFzcy1uYW1lJ11bMF0ucGF0dGVybiA9IC8oXFxiKD86Y2xhc3N8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8aW50ZXJmYWNlfG5ldylcXHMrKVtcXHcuXFxcXF0rLztcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogUmVnRXhwKFxuXHRcdFx0Ly8gbG9va2JlaGluZFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1kdXBlLWNoYXJhY3RlcnMtY2hhcmFjdGVyLWNsYXNzXG5cdFx0XHQvKCg/Ol58W14kXFx3XFx4QTAtXFx1RkZGRi5cIidcXF0pXFxzXXxcXGIoPzpyZXR1cm58eWllbGQpKVxccyopLy5zb3VyY2UgK1xuXHRcdFx0Ly8gUmVnZXggcGF0dGVybjpcblx0XHRcdC8vIFRoZXJlIGFyZSAyIHJlZ2V4IHBhdHRlcm5zIGhlcmUuIFRoZSBSZWdFeHAgc2V0IG5vdGF0aW9uIHByb3Bvc2FsIGFkZGVkIHN1cHBvcnQgZm9yIG5lc3RlZCBjaGFyYWN0ZXJcblx0XHRcdC8vIGNsYXNzZXMgaWYgdGhlIGB2YCBmbGFnIGlzIHByZXNlbnQuIFVuZm9ydHVuYXRlbHksIG5lc3RlZCBDQ3MgYXJlIGJvdGggY29udGV4dC1mcmVlIGFuZCBpbmNvbXBhdGlibGVcblx0XHRcdC8vIHdpdGggdGhlIG9ubHkgc3ludGF4LCBzbyB3ZSBoYXZlIHRvIGRlZmluZSAyIGRpZmZlcmVudCByZWdleCBwYXR0ZXJucy5cblx0XHRcdC9cXC8vLnNvdXJjZSArXG5cdFx0XHQnKD86JyArXG5cdFx0XHQvKD86XFxbKD86W15cXF1cXFxcXFxyXFxuXXxcXFxcLikqXFxdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZGdpbXl1c117MCw3fS8uc291cmNlICtcblx0XHRcdCd8JyArXG5cdFx0XHQvLyBgdmAgZmxhZyBzeW50YXguIFRoaXMgc3VwcG9ydHMgMyBsZXZlbHMgb2YgbmVzdGVkIGNoYXJhY3RlciBjbGFzc2VzLlxuXHRcdFx0Lyg/OlxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwufFxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwufFxcWyg/OlteW1xcXVxcXFxcXHJcXG5dfFxcXFwuKSpcXF0pKlxcXSkqXFxdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZGdpbXl1c117MCw3fXZbZGdpbXl1c117MCw3fS8uc291cmNlICtcblx0XHRcdCcpJyArXG5cdFx0XHQvLyBsb29rYWhlYWRcblx0XHRcdC8oPz0oPzpcXHN8XFwvXFwqKD86W14qXXxcXCooPyFcXC8pKSpcXCpcXC8pKig/OiR8W1xcclxcbiwuOzp9KVxcXV18XFwvXFwvKSkvLnNvdXJjZVxuXHRcdCksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncmVnZXgtc291cmNlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXihcXC8pW1xcc1xcU10rKD89XFwvW2Etel0qJCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRhbGlhczogJ2xhbmd1YWdlLXJlZ2V4Jyxcblx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMucmVnZXhcblx0XHRcdH0sXG5cdFx0XHQncmVnZXgtZGVsaW1pdGVyJzogL15cXC98XFwvJC8sXG5cdFx0XHQncmVnZXgtZmxhZ3MnOiAvXlthLXpdKyQvLFxuXHRcdH1cblx0fSxcblx0Ly8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGJlZm9yZSBrZXl3b3JkIGJlY2F1c2Ugd2UgdXNlIFwiZnVuY3Rpb25cIiBpbnNpZGUgdGhlIGxvb2stZm9yd2FyZFxuXHQnZnVuY3Rpb24tdmFyaWFibGUnOiB7XG5cdFx0cGF0dGVybjogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccypbPTpdXFxzKig/OmFzeW5jXFxzKik/KD86XFxiZnVuY3Rpb25cXGJ8KD86XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCl8KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKilcXHMqPT4pKS8sXG5cdFx0YWxpYXM6ICdmdW5jdGlvbidcblx0fSxcblx0J3BhcmFtZXRlcic6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKGZ1bmN0aW9uKD86XFxzKyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopP1xccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJGEtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo9PikvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKFxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccyo9PikvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XFxifFxcc3xeKSg/ISg/OmFzfGFzeW5jfGF3YWl0fGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHl8Zm9yfGZyb218ZnVuY3Rpb258Z2V0fGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c2V0fHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKSg/IVskXFx3XFx4QTAtXFx1RkZGRl0pKSg/Oig/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSpcXHMqKVxcKFxccyp8XFxdXFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccypcXHspLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fVxuXHRdLFxuXHQnY29uc3RhbnQnOiAvXFxiW0EtWl0oPzpbQS1aX118XFxkeD8pKlxcYi9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ3N0cmluZycsIHtcblx0J2hhc2hiYW5nJzoge1xuXHRcdHBhdHRlcm46IC9eIyEuKi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGFsaWFzOiAnY29tbWVudCdcblx0fSxcblx0J3RlbXBsYXRlLXN0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFxbXFxzXFxTXXxcXCRcXHsoPzpbXnt9XXxcXHsoPzpbXnt9XXxcXHtbXn1dKlxcfSkqXFx9KStcXH18KD8hXFwkXFx7KVteXFxcXGBdKSpgLyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGVtcGxhdGUtcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eYHxgJC8sXG5cdFx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdFx0fSxcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopXFwkXFx7KD86W157fV18XFx7KD86W157fV18XFx7W159XSpcXH0pKlxcfSkrXFx9Lyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2ludGVycG9sYXRpb24tcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxcJFxce3xcXH0kLyxcblx0XHRcdFx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IC9bXFxzXFxTXSsvXG5cdFx0fVxuXHR9LFxuXHQnc3RyaW5nLXByb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oKD86XnxbLHtdKVsgXFx0XSopKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMilbXlxcXFxcXHJcXG5dKSpcXDIoPz1cXHMqOikvbSxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRhbGlhczogJ3Byb3BlcnR5J1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdvcGVyYXRvcicsIHtcblx0J2xpdGVyYWwtcHJvcGVydHknOiB7XG5cdFx0cGF0dGVybjogLygoPzpefFsse10pWyBcXHRdKikoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRhbGlhczogJ3Byb3BlcnR5J1xuXHR9LFxufSk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmFkZElubGluZWQoJ3NjcmlwdCcsICdqYXZhc2NyaXB0Jyk7XG5cblx0Ly8gYWRkIGF0dHJpYnV0ZSBzdXBwb3J0IGZvciBhbGwgRE9NIGV2ZW50cy5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzI1N0YW5kYXJkX2V2ZW50c1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRBdHRyaWJ1dGUoXG5cdFx0L29uKD86YWJvcnR8Ymx1cnxjaGFuZ2V8Y2xpY2t8Y29tcG9zaXRpb24oPzplbmR8c3RhcnR8dXBkYXRlKXxkYmxjbGlja3xlcnJvcnxmb2N1cyg/OmlufG91dCk/fGtleSg/OmRvd258dXApfGxvYWR8bW91c2UoPzpkb3dufGVudGVyfGxlYXZlfG1vdmV8b3V0fG92ZXJ8dXApfHJlc2V0fHJlc2l6ZXxzY3JvbGx8c2VsZWN0fHNsb3RjaGFuZ2V8c3VibWl0fHVubG9hZHx3aGVlbCkvLnNvdXJjZSxcblx0XHQnamF2YXNjcmlwdCdcblx0KTtcbn1cblxuUHJpc20ubGFuZ3VhZ2VzLmpzID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQ7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1maWxlLWhpZ2hsaWdodC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG5cdGlmICh0eXBlb2YgUHJpc20gPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9tYXRjaGVzI1BvbHlmaWxsXG5cdGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuXHRcdEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG5cdH1cblxuXHR2YXIgTE9BRElOR19NRVNTQUdFID0gJ0xvYWRpbmfigKYnO1xuXHR2YXIgRkFJTFVSRV9NRVNTQUdFID0gZnVuY3Rpb24gKHN0YXR1cywgbWVzc2FnZSkge1xuXHRcdHJldHVybiAn4pyWIEVycm9yICcgKyBzdGF0dXMgKyAnIHdoaWxlIGZldGNoaW5nIGZpbGU6ICcgKyBtZXNzYWdlO1xuXHR9O1xuXHR2YXIgRkFJTFVSRV9FTVBUWV9NRVNTQUdFID0gJ+KcliBFcnJvcjogRmlsZSBkb2VzIG5vdCBleGlzdCBvciBpcyBlbXB0eSc7XG5cblx0dmFyIEVYVEVOU0lPTlMgPSB7XG5cdFx0J2pzJzogJ2phdmFzY3JpcHQnLFxuXHRcdCdweSc6ICdweXRob24nLFxuXHRcdCdyYic6ICdydWJ5Jyxcblx0XHQncHMxJzogJ3Bvd2Vyc2hlbGwnLFxuXHRcdCdwc20xJzogJ3Bvd2Vyc2hlbGwnLFxuXHRcdCdzaCc6ICdiYXNoJyxcblx0XHQnYmF0JzogJ2JhdGNoJyxcblx0XHQnaCc6ICdjJyxcblx0XHQndGV4JzogJ2xhdGV4J1xuXHR9O1xuXG5cdHZhciBTVEFUVVNfQVRUUiA9ICdkYXRhLXNyYy1zdGF0dXMnO1xuXHR2YXIgU1RBVFVTX0xPQURJTkcgPSAnbG9hZGluZyc7XG5cdHZhciBTVEFUVVNfTE9BREVEID0gJ2xvYWRlZCc7XG5cdHZhciBTVEFUVVNfRkFJTEVEID0gJ2ZhaWxlZCc7XG5cblx0dmFyIFNFTEVDVE9SID0gJ3ByZVtkYXRhLXNyY106bm90KFsnICsgU1RBVFVTX0FUVFIgKyAnPVwiJyArIFNUQVRVU19MT0FERUQgKyAnXCJdKSdcblx0XHQrICc6bm90KFsnICsgU1RBVFVTX0FUVFIgKyAnPVwiJyArIFNUQVRVU19MT0FESU5HICsgJ1wiXSknO1xuXG5cdC8qKlxuXHQgKiBMb2FkcyB0aGUgZ2l2ZW4gZmlsZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNyYyBUaGUgVVJMIG9yIHBhdGggb2YgdGhlIHNvdXJjZSBmaWxlIHRvIGxvYWQuXG5cdCAqIEBwYXJhbSB7KHJlc3VsdDogc3RyaW5nKSA9PiB2b2lkfSBzdWNjZXNzXG5cdCAqIEBwYXJhbSB7KHJlYXNvbjogc3RyaW5nKSA9PiB2b2lkfSBlcnJvclxuXHQgKi9cblx0ZnVuY3Rpb24gbG9hZEZpbGUoc3JjLCBzdWNjZXNzLCBlcnJvcikge1xuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcblx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPCA0MDAgJiYgeGhyLnJlc3BvbnNlVGV4dCkge1xuXHRcdFx0XHRcdHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG5cdFx0XHRcdFx0XHRlcnJvcihGQUlMVVJFX01FU1NBR0UoeGhyLnN0YXR1cywgeGhyLnN0YXR1c1RleHQpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXJyb3IoRkFJTFVSRV9FTVBUWV9NRVNTQUdFKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHhoci5zZW5kKG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlcyB0aGUgZ2l2ZW4gcmFuZ2UuXG5cdCAqXG5cdCAqIFRoaXMgcmV0dXJucyBhIHJhbmdlIHdpdGggaW5jbHVzaXZlIGVuZHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gcmFuZ2Vcblx0ICogQHJldHVybnMge1tudW1iZXIsIG51bWJlciB8IHVuZGVmaW5lZF0gfCB1bmRlZmluZWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBwYXJzZVJhbmdlKHJhbmdlKSB7XG5cdFx0dmFyIG0gPSAvXlxccyooXFxkKylcXHMqKD86KCwpXFxzKig/OihcXGQrKVxccyopPyk/JC8uZXhlYyhyYW5nZSB8fCAnJyk7XG5cdFx0aWYgKG0pIHtcblx0XHRcdHZhciBzdGFydCA9IE51bWJlcihtWzFdKTtcblx0XHRcdHZhciBjb21tYSA9IG1bMl07XG5cdFx0XHR2YXIgZW5kID0gbVszXTtcblxuXHRcdFx0aWYgKCFjb21tYSkge1xuXHRcdFx0XHRyZXR1cm4gW3N0YXJ0LCBzdGFydF07XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWVuZCkge1xuXHRcdFx0XHRyZXR1cm4gW3N0YXJ0LCB1bmRlZmluZWRdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtzdGFydCwgTnVtYmVyKGVuZCldO1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0UHJpc20uaG9va3MuYWRkKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGVudi5zZWxlY3RvciArPSAnLCAnICsgU0VMRUNUT1I7XG5cdH0pO1xuXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLXNhbml0eS1jaGVjaycsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHR2YXIgcHJlID0gLyoqIEB0eXBlIHtIVE1MUHJlRWxlbWVudH0gKi8gKGVudi5lbGVtZW50KTtcblx0XHRpZiAocHJlLm1hdGNoZXMoU0VMRUNUT1IpKSB7XG5cdFx0XHRlbnYuY29kZSA9ICcnOyAvLyBmYXN0LXBhdGggdGhlIHdob2xlIHRoaW5nIGFuZCBnbyB0byBjb21wbGV0ZVxuXG5cdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfTE9BRElORyk7IC8vIG1hcmsgYXMgbG9hZGluZ1xuXG5cdFx0XHQvLyBhZGQgY29kZSBlbGVtZW50IHdpdGggbG9hZGluZyBtZXNzYWdlXG5cdFx0XHR2YXIgY29kZSA9IHByZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDT0RFJykpO1xuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IExPQURJTkdfTUVTU0FHRTtcblxuXHRcdFx0dmFyIHNyYyA9IHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cblx0XHRcdHZhciBsYW5ndWFnZSA9IGVudi5sYW5ndWFnZTtcblx0XHRcdGlmIChsYW5ndWFnZSA9PT0gJ25vbmUnKSB7XG5cdFx0XHRcdC8vIHRoZSBsYW5ndWFnZSBtaWdodCBiZSAnbm9uZScgYmVjYXVzZSB0aGVyZSBpcyBubyBsYW5ndWFnZSBzZXQ7XG5cdFx0XHRcdC8vIGluIHRoaXMgY2FzZSwgd2Ugd2FudCB0byB1c2UgdGhlIGV4dGVuc2lvbiBhcyB0aGUgbGFuZ3VhZ2Vcblx0XHRcdFx0dmFyIGV4dGVuc2lvbiA9ICgvXFwuKFxcdyspJC8uZXhlYyhzcmMpIHx8IFssICdub25lJ10pWzFdO1xuXHRcdFx0XHRsYW5ndWFnZSA9IEVYVEVOU0lPTlNbZXh0ZW5zaW9uXSB8fCBleHRlbnNpb247XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBsYW5ndWFnZSBjbGFzc2VzXG5cdFx0XHRQcmlzbS51dGlsLnNldExhbmd1YWdlKGNvZGUsIGxhbmd1YWdlKTtcblx0XHRcdFByaXNtLnV0aWwuc2V0TGFuZ3VhZ2UocHJlLCBsYW5ndWFnZSk7XG5cblx0XHRcdC8vIHByZWxvYWQgdGhlIGxhbmd1YWdlXG5cdFx0XHR2YXIgYXV0b2xvYWRlciA9IFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlcjtcblx0XHRcdGlmIChhdXRvbG9hZGVyKSB7XG5cdFx0XHRcdGF1dG9sb2FkZXIubG9hZExhbmd1YWdlcyhsYW5ndWFnZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxvYWQgZmlsZVxuXHRcdFx0bG9hZEZpbGUoXG5cdFx0XHRcdHNyYyxcblx0XHRcdFx0ZnVuY3Rpb24gKHRleHQpIHtcblx0XHRcdFx0XHQvLyBtYXJrIGFzIGxvYWRlZFxuXHRcdFx0XHRcdHByZS5zZXRBdHRyaWJ1dGUoU1RBVFVTX0FUVFIsIFNUQVRVU19MT0FERUQpO1xuXG5cdFx0XHRcdFx0Ly8gaGFuZGxlIGRhdGEtcmFuZ2Vcblx0XHRcdFx0XHR2YXIgcmFuZ2UgPSBwYXJzZVJhbmdlKHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFuZ2UnKSk7XG5cdFx0XHRcdFx0aWYgKHJhbmdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KC9cXHJcXG4/fFxcbi9nKTtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIHJhbmdlIGlzIG9uZS1iYXNlZCBhbmQgaW5jbHVzaXZlIG9uIGJvdGggZW5kc1xuXHRcdFx0XHRcdFx0dmFyIHN0YXJ0ID0gcmFuZ2VbMF07XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gcmFuZ2VbMV0gPT0gbnVsbCA/IGxpbmVzLmxlbmd0aCA6IHJhbmdlWzFdO1xuXG5cdFx0XHRcdFx0XHRpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGxpbmVzLmxlbmd0aDsgfVxuXHRcdFx0XHRcdFx0c3RhcnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzdGFydCAtIDEsIGxpbmVzLmxlbmd0aCkpO1xuXHRcdFx0XHRcdFx0aWYgKGVuZCA8IDApIHsgZW5kICs9IGxpbmVzLmxlbmd0aDsgfVxuXHRcdFx0XHRcdFx0ZW5kID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZW5kLCBsaW5lcy5sZW5ndGgpKTtcblxuXHRcdFx0XHRcdFx0dGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLmpvaW4oJ1xcbicpO1xuXG5cdFx0XHRcdFx0XHQvLyBhZGQgZGF0YS1zdGFydCBmb3IgbGluZSBudW1iZXJzXG5cdFx0XHRcdFx0XHRpZiAoIXByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSkge1xuXHRcdFx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0JywgU3RyaW5nKHN0YXJ0ICsgMSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGhpZ2hsaWdodCBjb2RlXG5cdFx0XHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IHRleHQ7XG5cdFx0XHRcdFx0UHJpc20uaGlnaGxpZ2h0RWxlbWVudChjb2RlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdFx0Ly8gbWFyayBhcyBmYWlsZWRcblx0XHRcdFx0XHRwcmUuc2V0QXR0cmlidXRlKFNUQVRVU19BVFRSLCBTVEFUVVNfRkFJTEVEKTtcblxuXHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdH0pO1xuXG5cdFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodCA9IHtcblx0XHQvKipcblx0XHQgKiBFeGVjdXRlcyB0aGUgRmlsZSBIaWdobGlnaHQgcGx1Z2luIGZvciBhbGwgbWF0Y2hpbmcgYHByZWAgZWxlbWVudHMgdW5kZXIgdGhlIGdpdmVuIGNvbnRhaW5lci5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IEVsZW1lbnRzIHdoaWNoIGFyZSBhbHJlYWR5IGxvYWRlZCBvciBjdXJyZW50bHkgbG9hZGluZyB3aWxsIG5vdCBiZSB0b3VjaGVkIGJ5IHRoaXMgbWV0aG9kLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBbY29udGFpbmVyPWRvY3VtZW50XVxuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24gaGlnaGxpZ2h0KGNvbnRhaW5lcikge1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGNvbnRhaW5lciB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVsZW1lbnRzW2krK10pOykge1xuXHRcdFx0XHRQcmlzbS5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR2YXIgbG9nZ2VkID0gZmFsc2U7XG5cdC8qKiBAZGVwcmVjYXRlZCBVc2UgYFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodC5oaWdobGlnaHRgIGluc3RlYWQuICovXG5cdFByaXNtLmZpbGVIaWdobGlnaHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCFsb2dnZWQpIHtcblx0XHRcdGNvbnNvbGUud2FybignUHJpc20uZmlsZUhpZ2hsaWdodCBpcyBkZXByZWNhdGVkLiBVc2UgYFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodC5oaWdobGlnaHRgIGluc3RlYWQuJyk7XG5cdFx0XHRsb2dnZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRQcmlzbS5wbHVnaW5zLmZpbGVIaWdobGlnaHQuaGlnaGxpZ2h0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG5cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBcIi0tLVxcbmRhdGU6IDIwMTktMDgtMzBcXG50aXRsZTogJ0hvdyB0byBXcml0ZSBUZXh0J1xcbnRlbXBsYXRlOiBwb3N0XFxudGh1bWJuYWlsOiAnLi90aHVtYm5haWxzL3dyaXRpbmcucG5nJ1xcbnNsdWc6IGhvdy10by13cml0ZS10ZXh0XFxuY2F0ZWdvcmllczogaGVscGluZyB0byB3cml0ZSB0ZXh0XFxudGFnczogaW5zdHJ1Y3Rpb24gdGV4dGVyIHdyaXRlclxcbi0tLVxcblxcbiMjIEZvcm1hdHRpbmcgc3ludGF4XFxuXFxuVGhpcyBpcyBhIHNtYWxsIGd1aWRlLiBcXFwiSG93IHRvIHdyaXRlIG1hcmtkb3duIHRleHQgYW5kIGdldCBIVE1MIGRvY3VtZW50IG91dFxcXCIuIFNlZSBjb2RlIG9uIG15IEdpdEh1YjogW21hcmthYmxlIHBhcnNlcl0oaHR0cHM6Ly9naXRodWIuY29tL21ldWdlbm9tL21hcmthYmxlLXRvLWh0bWwpXFxuXFxuIyMgQ2FwdGlvbiBCbG9jayBhYm91dCBhcnRpY2xlXFxuXFxuSG93IHRvIHVzZTogd3JpdGUgY2FwdGlvbiBibG9jayBsaWtlIHRoZSBleGFtcGxlIGJlbG93Olxcbjxici8+XFxuXFxcXCpcXG4tLS1cXG5kYXRlOiAyMDE5LTA4LTMwXFxudGl0bGU6ICdJbnN0cnVjdGlvbiB0byBXcml0ZSBUZXh0J1xcbnRlbXBsYXRlOiBwb3N0XFxudGh1bWJuYWlsOiAnLi90aHVtYm5haWxzL3dyaXRpbmcucG5nJ1xcbnNsdWc6IGluc3RydWN0aW9uLXRvLXdyaXRlLXRleHRcXG5jYXRlZ29yaWVzOiBcXG50YWdzOiBpbnN0cnVjdGlvbiB0ZXh0ZXIgd3JpdGVyIFxcbi0tLVxcblxcXFwqXFxuXFxuIyMgSGVhZGluZ3NcXG5cXG5Ib3cgdG8gdXNlOlxcblxcXFwqXFxuIyBUaGUgaDEgaGVhZGluZ1xcbiMjIFRoZSBoMiBoZWFkaW5nXFxuIyMjIFRoZSBoMyBoZWFkaW5nXFxuIyMjIyBUaGUgaDQgaGVhZGluZ1xcbiMjIyMjIFRoZSBoNSBoZWFkaW5nXFxuXFxcXCogXFxuPGJyLz5cXG4jIFRoZSBoMSBoZWFkaW5nXFxuIyMgVGhlIGgyIGhlYWRpbmdcXG4jIyMgVGhlIGgzIGhlYWRpbmdcXG4jIyMjIFRoZSBoNCBoZWFkaW5nXFxuIyMjIyMgVGhlIGg1IGhlYWRpbmdcXG5cXG4jIyBTdHlsaW5nIGJvbGQgdGV4dFxcblxcbkhvdyB0byB1c2U6IFRoaXMgd29yZCBpcyBcXFxcKiAqKnN0cm9uZyoqIGFuZCAqKnVua25vd24gZm9yIG1lKiogXFxcXCpcXG5pbiBvdXQ6IFRoaXMgd29yZCBpcyAqKnN0cm9uZyoqIGFuZCAqKnVua25vd24gZm9yIG1lKiouXFxuXFxuIyMgQ29kZSBCbG9jazogXFxuXFxuXFxcXCpcXHRcXHRcXG5gYGBiYXNoXFxuICBcXHRsZXQgZ2V0TWluID0gYXN5bmMgKG1pbik9PiB7XFxuXFx0XFx0cmV0dXJuIGBcXG4gICAgXFx0XFx0bWluaW1hbCB2YWx1ZSBpcyAke21pbn1cXG4gICAgXFx0YFxcblxcdH3igJpcXG5gYGBcXG5cXFxcKiBcXG5cXG5gYGBiYXNoXFxuXFx0bGV0IGdldE1pbiA9IGFzeW5jIChtaW4pPT4ge1xcblxcdFxcdHJldHVybiBgXFxuICAgIFxcdFxcdG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuICAgIFxcdFxcdGBcXG5cXHR9XFxuYGBgXFxuXFxuIyMgQ29kZSBJbiBDb2RlIEJsb2NrXFxuXFxuXFxcXCpcXG5cXHRgYGBiYXNoXFxuXFx0XFx0YGBgamF2YXNjcmlwdFxcblxcdFxcdFxcdGxldCBnZXRNaW4gPSBhc3luYyAobWluKT0+IHtcXG5cXHRcXHRcXHRcXHRyZXR1cm4gYFxcblxcdFxcdFxcdFxcdFxcdG1pbmltYWwgdmFsdWUgaXMgJHttaW59XFxuXFx0XFx0XFx0XFx0XFx0YFxcblxcdFxcdFxcdH1cXG5cXHRcXHRgYGBcXG5cXHRgYGBcXG5cXFxcKlxcblxcbmBgYGJhc2hcXG5cXHRgYGBqYXZhc2NyaXB0XFxuXFx0XFx0bGV0IGdldE1pbiA9IGFzeW5jIChtaW4pPT4ge1xcblxcdFxcdFxcdHJldHVybiBgXFxuXFx0XFx0XFx0XFx0bWluaW1hbCB2YWx1ZSBpcyAke21pbn1cXG5cXHRcXHRcXHRcXHRgXFxuXFx0XFx0fVxcblxcdGBgYFxcbmBgYFxcblxcbiMjIENvZGUgSW5saW5lXFxuXFxuXFxcXCpcXG4gICAgYHRlc3QgaXMgYSBvbmUgb2YgbW9yZSBvdGhlciBvcHRpb25zYFxcblxcXFwqIFxcblxcbmluIG91dDpcXG5gdGVzdCBpcyBhIG9uZSBvZiBtb3JlIG90aGVyIG9wdGlvbnNgXFxuXFxuIyMgTGlzdHNcXG5cXG5cXFxcKlxcblxcdExpc3QgMSA6XFxuXFx0ICAtIG9uZVxcblxcdCAgLSB0d29cXG5cXHQgIC0gdGhyZWUgYW5kIG1vcmVcXG5cXG5cXHRMaXN0IDIgOlxcblxcdCAgW10gb25lXFxuXFx0ICBbXSB0d29cXG5cXHQgIFtdIHRocmVlIGFuZCBtb3JlXFxuXFxuXFx0TGlzdCAgc2ltcGxlIDM6XFxuXFx0ICBbeF0gb25lXFxuXFx0ICBbeF0gdHdvXFxuXFx0ICBbeF0gdGhyZWUgYW5kIG1vcmVcXG5cXG5cXHRMaXN0IDQgd2l0aCBtaXhlZCBhdHRyaWJ1dGVzOlxcblxcdCAgIC0gb25lXFxuXFx0ICBbXSB0d29cXG5cXHQgIFt4XSB0aHJlZSBhbmQgbW9yZVxcblxcblxcXFwqXFxuPGJyLz5cXG5pbiBvdXQ6XFxuPGJyLz5cXG5MaXN0IDE6XFxuXFx0LSBvbmVcXG5cXHQtIHR3b1xcblxcdC0gdGhyZWUgYW5kIG1vcmVcXG48YnIvPlxcbkxpc3QgMjpcXG5cXHRbXSBvbmVcXG5cXHRbXSB0d29cXG5cXHRbXSB0aHJlZSBhbmQgbW9yZVxcbjxici8+XFxuTGlzdCAzOlxcblxcdFt4XSBvbmVcXG5cXHRbeF0gdHdvXFxuXFx0W3hdIHRocmVlIGFuZCBtb3JlXFxuPGJyLz5cXG5MaXN0IDQgd2l0aCBtaXhlZCBhdHRyaWJ1dGVzOlxcblxcdC0gb25lXFxuXFx0W10gdHdvXFxuXFx0W3hdIHRocmVlIGFuZCBtb3JlXFxuXFxuXFxuIyMgVGFibGVcXG5cXG5cXFxcKlxcbnwgTmFtZSB8IEFnZSB8IEF1dG8gfCBUb3duIHwgUGV0IHxcXG58IEJvYiB8IDE3IHwgQk1XIHwgQmFrdSB8IEZpc2ggfFxcbnwgSm9obiB8IDUyIHwgRmlhdCB8IEJlcmxpbiB8IERvZyB8XFxufCBMaXNhIHwgMzIgfCBUb3lvdGEgfCBGcmFua2Z1cnQgfCBTbmFrZSB8XFxufCBFdWdlbiB8IDQ1IHwgTWF6ZGEgfCBEcmVzZGVuIHwgQ2F0IHwgXFxuXFxcXCpcXG5cXG48YnIvPlxcblxcbnwgTmFtZSB8IEFnZSB8IEF1dG8gfCBUb3duIHwgUGV0IHxcXG58IEJvYiB8IDE3IHwgQk1XIHwgQmFrdSB8IEZpc2ggfFxcbnwgSm9obiB8IDUyIHwgRmlhdCB8IEJlcmxpbiB8IERvZyB8XFxufCBMaXNhIHwgMzIgfCBUb3lvdGEgfCBGcmFua2Z1cnQgfCBTbmFrZSB8XFxufCBFdWdlbiB8IDQ1IHwgTWF6ZGEgfCBEcmVzZGVuIHwgQ2F0IHxcXG5cXG5cXG4jIyBRdW90aW5nIHRleHRcXG5cXG5cXFxcKlxcbiAgICA+IFF1b3RlXFxuICAgID4gPGNpdGU+IC0gQXV0aG9yIDwvY2l0ZT5cXG5cXFxcKiBcXG5cXG5pbiBvdXQ6XFxuXFxuPiBFeGFtcGxlIFF1b3RlXFxuPiA8Y2l0ZT4gLSBBbGJlcnQgUm91Z2UgPC9jaXRlPlxcblxcbiMjIExpbmtzXFxuXFxuWW91IGNhbiBjcmVhdGUgYW4gaW5saW5lIGxpbmsgYnkgd3JhcHBpbmcgbGluayB0ZXh0IGluIGJyYWNrZXRzLCBhbmQgdGhlbiB3cmFwcGluZyB0aGUgVVJMIGluIHBhcmVudGhlc2VzOlxcblxcblxcXFwqXFxuXFx0VGhpcyBzaXRlIHdhcyBidWlsdCB1c2luZyBbSmF2YXNjcmlwdCBFUzZdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0VDTUFTY3JpcHQpICBhbmQgaXQncyBhbiBleGFtcGxlLlxcblxcXFwqIFxcblxcbmluIG91dDpcXG5cXG5UaGlzIHNpdGUgd2FzIGJ1aWx0IHVzaW5nIFtKYXZhc2NyaXB0IEVTNl0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRUNNQVNjcmlwdCkgYW5kIGl0J3MgYW4gZXhhbXBsZS5cXG5cXG5bSG93IHRvIGRlZmluZSB0eXBlcyBmb3IgcHJvY2VzcyBlbnZpcm9ubWVudF0oaHR0cHM6Ly9tZXVnZW5vbS5jb20vIy9hcnRpY2xlL2hvdy10by1kZWZpbmUtdHlwZXMtZm9yLXByb2Nlc3MtZW52aXJvbm1lbnQpXFxuXFxuXFxuIyMgU2ltcGxlIFVuZGVybGluZSBkZWNvcmF0aW9uXFxuXFxuLyogX3VuZGVyZGFzaF8gLypcXG5cXG5pbiBvdXQ6XFxuXFxuX3VuZGVyZGFzaF9cXG5cXG4jIyBDb2xvciBVbmRlcmxpbmUgZGVjb3JhdGlvblxcblxcblxcXFwqXFxuXFx0Qmx1ZS5ibHVlIGNvbG9yXFxuXFx0R3JheS5ncmF5IGNvbG9yXFxuXFx0UmVkLnJlZCBjb2xvclxcblxcdEdyZWVuLmdyZWVuIGNvbG9yXFxuXFx0WWVsbG93LnllbGxvdyBjb2xvclxcblxcdEluZGlnby5pbmRpZ28gY29sb3IgXFxuXFx0UHVycGxlLnB1cnBsZSBjb2xvclxcblxcdFBpbmsucGluayBjb2xvclxcblxcXFwqXFxuXFxuaW4gb3V0OlxcblxcbkxvcmVtLmdyZWVuIGlwc3VtLmluZGlnbyBkb2xvci5yZWQgc2l0IGFtZXQucHVycGxlICwgY29uc2VjdGV0dXIucGluayBhZGlwaXNpY2luZy55ZWxsb3cgZWxpdC4gXFxuXFxuIyMgQ29sb3IgQmFkZ2VzXFxuXFxuXFxcXCpcXG5cXHRCbHVlQGJsdWUgY29sb3JcXG5cXHRHcmF5QGdyYXkgY29sb3JcXG5cXHRSZWRAcmVkIGNvbG9yXFxuXFx0R3JlZW5AZ3JlZW4gY29sb3JcXG5cXHRZZWxsb3dAeWVsbG93IGNvbG9yXFxuXFx0SW5kaWdvQGluZGlnbyBjb2xvciBcXG5cXHRQdXJwbGVAcHVycGxlIGNvbG9yXFxuXFx0UGlua0BwaW5rIGNvbG9yXFxuXFxcXCogXFxuXFxuaW4gb3V0OlxcblxcbkxvcmVtQGdyZWVuIGlwc3VtQGluZGlnbyBkb2xvckByZWQgc2l0IGFtZXRAcHVycGxlICwgY29uc2VjdGV0dXJAcGluayBhZGlwaXNpY2luZ0B5ZWxsb3cgZWxpdC5cXG5cXG4jIyBJZ25vcmluZyBNYXJrZG93biBmb3JtYXR0aW5nXFxuXFxuWW91IGNhbiBpZ25vcmUgKG9yIGVzY2FwZSkgTWFya2Rvd24gZm9ybWF0dGluZzpcXG48YnIvPlxcblxcXFwqIHRoaXMgKiphbGwqKiogdGV4dCBpcyAjIyMgdW5tYXJrYWJsZSBcXFxcKlxcbnRoaXMgaXMgXFxcXCogdW5tYXJrYWJsZSBcXFxcKiB0ZXh0XFxuQWJvdXQgXFxcXCogdGhpcyA+UXVvdGUgXFxcXCpcXG5cXG4jIyBJbWFnZXNcXG5cXG5cXFxcKiAhW0dpdGh1Yl9pbWFnZV0oLi9pbWFnZXMvZ2l0aHViLnBuZykgXFxcXCpcXG5cXG5pbiBvdXQ6XFxuXFxuVGhpcyBpcyBhbiAhW0dpdGh1YiBpbWFnZV0oLi9pbWFnZXMvZ2l0aHViLnBuZylcXG5cIjsiLCIvKipcbiAqIEF1dGhvcjogbWV1Z2Vub20uY29tXG4gKiBEYXRlOiAxOS4wMy4yMDIzXG4gKiBSZWZhY3RvcmVkOiAxOS4wMy4yMDIzIFxuICovXG5cbmltcG9ydCB7IEdyYW1tYXIgfSBmcm9tIFwiLi9HcmFtbWFyXCJcbmltcG9ydCB7IGNhcHRpb25Ub2tlbiB9IGZyb20gXCIuL1Rva2VuXCI7XG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FwdGlvbiB7XG5cblx0cHVibGljIHRleHQ6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcpIHtcblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHR9XG5cblx0cHVibGljIGdldCgpOiBjYXB0aW9uVG9rZW4ge1xuXG5cdFx0Y29uc3QgbWF0Y2ggPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ0FQVElPTik7XG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjYXB0aW9uIGZvcm1hdFwiKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXG5cdFx0XHQsIC8vIElnbm9yZSB0aGUgZmlyc3QgZWxlbWVudFxuXHRcdFx0cm93LFxuXHRcdFx0ZGF0ZSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0LFxuXHRcdFx0dGVtcGxhdGUsXG5cdFx0XHQsXG5cdFx0XHR0aHVtYm5haWwsXG5cdFx0XHQsXG5cdFx0XHRzbHVnLFxuXHRcdFx0LFxuXHRcdFx0Y2F0ZWdvcmllcyxcblx0XHRcdCxcblx0XHRcdHRhZ3MsXG5cdFx0XSA9IG1hdGNoO1xuXG5cdFx0Y29uc3QgdG9rZW46IGNhcHRpb25Ub2tlbiA9IHtcblx0XHRcdHR5cGU6IFRva2VuVHlwZS5DQVBUSU9OLFxuXHRcdFx0cm93LFxuXHRcdFx0ZGF0ZTogZGF0ZSBhcyBzdHJpbmcsXG5cdFx0XHR0aXRsZTogdGl0bGUgYXMgc3RyaW5nLFxuXHRcdFx0dGVtcGxhdGU6IHRlbXBsYXRlIGFzIHN0cmluZyxcblx0XHRcdHRodW1ibmFpbDogdGh1bWJuYWlsIGFzIHN0cmluZyxcblx0XHRcdHNsdWc6IHNsdWcgYXMgc3RyaW5nLFxuXHRcdFx0Y2F0ZWdvcmllczogY2F0ZWdvcmllcyBhcyBzdHJpbmcsXG5cdFx0XHR0YWdzOiB0YWdzIGFzIHN0cmluZyxcblx0XHR9O1xuXHRcdFxuXHRcdC8vcmVtb3ZlIGNhcHRpb24gZnJvbSB0ZXh0XG5cdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoR3JhbW1hci5CTE9DS1MuQ0FQVElPTiwgXCJcIik7XG5cblx0XHRyZXR1cm4gdG9rZW47XG5cblx0fVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogR3JhbW1hclxuICogVGhpcyBpcyBhIGNsYXNzIHRoYXQgY29udGFpbnMgYWxsIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIHVzZWQgaW4gdGhlIHBhcnNlci5cbiAqIFxuICovXG5leHBvcnQgY2xhc3MgR3JhbW1hciB7XG5cblx0cHVibGljIHN0YXRpYyBCTE9DS1MgPSB7XG5cblx0XHQvLyBoZWFkaW5n4oCaXG5cdFx0SEVBRElORzogL1teXFxTXSgjezEsNn0pKFteXFxuXFwpXFwvXSspL2csXG5cdFx0SEVBRElOR19MRVZFTDogLygjezEsNX0pL2csXG5cblx0XHQvLyBjYXB0aW9uXG5cdFx0Q0FQVElPTjogL14tLS1cXHNkYXRlOigoLiopKVxcc3RpdGxlOigoLiopKVxcc3RlbXBsYXRlOigoLiopKVxcc3RodW1ibmFpbDooKC4qKSlcXHNzbHVnOigoLiopKVxcc2NhdGVnb3JpZXM6KCguKikpXFxzdGFnczooKC4qKSlcXHMtLS0vLFxuXG5cdFx0U1BBQ0U6IC8gLyxcblx0XHRMSU5FOiAvXFxuLyxcblxuXHRcdC8vIGNvbG9yIGxpbmUgXG5cdFx0Q09MT1I6IC8oKC4/KVteXFxzXSspXFwuKGJsdWV8Z3JheXxyZWR8Z3JlZW58eWVsbG93fGluZGlnb3xwdXJwbGV8cGluaykvZyxcblxuXHRcdC8vIGJhZGdlXG5cdFx0QkFER0U6IC8oKC4/KVteXFxzXSspXFxAKGJsdWV8Z3JheXxyZWR8Z3JlZW58eWVsbG93fGluZGlnb3xwdXJwbGV8cGluaykvZyxcblxuXHRcdC8vIGxpc3RcdFx0XG5cdFx0TElTVDogL1xcUy4qOlxcbihcXHMqKC18XFxbXFxdfFxcWy5cXF0pXFxzKlxcUy4qKXsxLDIwfS9nLFxuXG5cdFx0TElTVF9BVFRSSUJVVEU6IC8oLXxcXFtcXF18XFxbeFxcXSkvZyxcblxuXG5cdFx0Ly8gY29kZSBibG9ja1xuXHRcdENPREVfQkxPQ0s6IC9cXGBcXGBcXGAocHl0aG9ufGJhc2h8amF2YXxqYXZhc2NyaXB0fHR5cGVzY3JpcHR8c3dpZnQpKFteKFxcYCl7M31dLipcXG4pezEsMjAwfVxcYFxcYFxcYC9nLFxuXHRcdENPREVfQkxPQ0tfTEFORzogL1teXFxgXFxgXFxgXShcXHcrKVxcbi9ncyxcblx0XHRDT0RFX0JMT0NLX0JPRFk6IC9cXG4oW1xcc1xcU10rKVteXFxgXFxgXFxgXS9ncyxcblxuXHRcdC8vIGNvZGUgaW4gY29kZSBibG9ja1xuXHRcdENPREVfSU5fQ09ERTogL1xcYFxcYFxcYChweXRob258YmFzaHxqYXZhfGphdmFzY3JpcHR8dHlwZXNjcmlwdHxzd2lmdClcXG4oW15cXGBcXGBcXGBdKylcXGBcXGBcXGAocHl0aG9ufGJhc2h8amF2YXxqYXZhc2NyaXB0fHR5cGVzY3JpcHR8c3dpZnQpXFxuKFteXFxgXFxgXFxgXSspXFxgXFxgXFxgXFxuXFxgXFxgXFxgXFxuL2csXG5cdFx0SU5MSU5FX0NPREU6IC8oW15cXGBcXGBcXGBdKykvZ3MsXG5cdFx0SU5MSU5FX0NPREVfUEFSQU1TOiAvKFteXFxuXSspL3NnLFxuXG5cdFx0Ly8gaW5saW5lIGNvZGVcblx0XHRJTkxJTkVfQ09ERV9CTE9DSzogL1xcYChcXFMpLipbXlxcYF1cXGAvZyxcblxuXHRcdC8vIHF1b3RlXG5cdFx0UVVPVEU6IC8+W15cXG5dLipcXG4oXFxzKXswLDEwfT4gPGNpdGU+IC0gW15cXG5dKy9nLFxuXHRcdFFVT1RFX1BBUkFNUzogL1tePD5dKy9nLFxuXG5cdFx0Ly8gbGlua3Ncblx0XHRMSU5LOiAvW14hXVxcWyhbXildXFxTLispXFxdXFwoaHR0cHM6XFwvXFwvXFxTLitcXCkvZyxcblx0XHRMSU5LX05BTUU6IC9cXFtcXFMuK1xcXS9nLFxuXHRcdExJTktfVVJMOiAvXFwoXFxTLitcXCkvZyxcblxuXHRcdC8vIGltYWdlc1xuXHRcdElNQUdFOiAvIVxcWyhbXildKylcXF1cXChcXFMrXFwpL2csXG5cdFx0SU1BR0VfTkFNRTogLyFcXFtcXFMuK1xcXS9nLFxuXHRcdElNQUdFX1VSTDogL1xcKFxcUy4rXFwpL2csXG5cblx0XHQvLyBob3Jpem9udGFsIGxpbmVcblx0XHRVTkRFUl9MSU5FOiAvKF97MX0pKFteXy5dKykoX3sxfSkvZyxcblxuXHRcdFVOTUFSS0FCTEU6IC9cXFxcXFwqXFxzW15cXFxcXStcXFxcXFwqL2csXG5cblx0XHQvLyBib2xkIHRleHRcblx0XHRTVFJPTkc6IC9cXCpcXCooW1xcd3xcXHNdKylcXCpcXCovZyxcblx0XHRTVFJPTkdfVEVYVDogL1teXFwqXSsvZyxcblxuXG5cdFx0Ly8gdGFibGVcblx0XHRUQUJMRTogLygoXFx8W1xcd1xcZFxcc10rKStcXHwpL2csXG5cblx0XHRQQVJBR1JBUEg6IC8oW15cXG5dKykvZyxcblxuXHRcdFRPS0VOOiAvXFwkdG9rZW4uKFxcU3szNX1bXlxcc1xcLlxcKlxcYF0pL2csXG5cblx0XHRUWFRfVE9LRU46IC9bXlxcJHRva2VuLlxcd1xcYi1dKFxcdykrL2csXG5cdH1cbn1cbiIsImltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuL1Rva2VuXCI7XG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXIge1xuXG5cdHB1YmxpYyB0b2tlbnMgPSAgW10gYXMgKFRva2VuLmJhZ2RlVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5jYXB0aW9uVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5jb2RlQmxvY2tUb2tlbiB8XG5cdFx0XHRcdFx0VG9rZW4uY29kZUlubGluZVRva2VuIHwgXG5cdFx0XHRcdFx0VG9rZW4uY29sb3JUZXh0VG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5oZWFkVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5pbWFnZVRva2VuIHxcblx0XHRcdFx0XHRUb2tlbi5saW5rVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5saXN0VG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5wYXJhZ3JhcGhFbmRUb2tlbiB8IFxuXHRcdFx0XHRcdFRva2VuLnBhcmFncmFwaFN0YXJ0VG9rZW4gfFxuXHRcdFx0XHRcdFRva2VuLnF1b3RlVG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi5zdHJvbmdUZXh0VG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi50ZXh0VG9rZW4gfCBcblx0XHRcdFx0XHRUb2tlbi51bmRlckxpbmVUb2tlbiB8XG5cdFx0XHRcdFx0VG9rZW4udW5rbm93blRleHRUb2tlbiB8IFxuXHRcdFx0XHRcdFRva2VuLmNvZGVJbkNvZGVUb2tlbiB8IFxuXHRcdFx0XHRcdFRva2VuLnRhYmxlVG9rZW5cblx0XHRcdFx0KVtdO1xuXHRcblx0cHVibGljIGFzdDogQVNUO1xuXG5cdGNvbnN0cnVjdG9yKHRva2VucyA6IGFueSkge1xuXG5cdFx0dGhpcy50b2tlbnMgPSB0b2tlbnM7XG5cdFx0dGhpcy5hc3QgPSB7XG5cdFx0XHR0eXBlOiBcIkRvY3VtZW50XCIsXG5cdFx0XHRjaGlsZHJlbjogW11cblx0XHR9O1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpOnZvaWQge1xuXG5cdFx0bGV0IHRva2VuX251bWJlcjogbnVtYmVyO1xuXHRcdHRva2VuX251bWJlciA9IDA7XG5cdFx0bGV0IGlzUGFyYWdyYXBoOiBib29sZWFuO1xuXHRcdGlzUGFyYWdyYXBoID0gZmFsc2U7XG5cdFx0XG5cdFx0Y29uc3QgY2hpbGRyZW4gOiBhbnkgPSB0aGlzLmFzdC5jaGlsZHJlbjtcblxuXHRcdHdoaWxlICh0b2tlbl9udW1iZXIgPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcblxuXHRcdFx0Y29uc3QgdG9rZW4gOiBhbnkgPSB0aGlzLnRva2Vuc1t0b2tlbl9udW1iZXJdO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0b2tlbilcblxuXHRcdFx0Ly8gQ2FwdGlvblxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5DQVBUSU9OKSB7XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QgY2FwdGlvbkVsZW1lbnQgPSAge30gYXMgVG9rZW4uY2FwdGlvblRva2VuO1xuXHRcdFx0XHRjYXB0aW9uRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkNBUFRJT047IFxuXHRcdFx0XHRjYXB0aW9uRWxlbWVudC5yb3cgPSB0b2tlbi5yb3c7XG5cdFx0XHRcdGNhcHRpb25FbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiQ2FwdGlvblwiLFxuXHRcdFx0XHRcdFx0ZGF0ZTogdG9rZW4uZGF0ZSxcblx0XHRcdFx0XHRcdHRpdGxlOiB0b2tlbi50aXRsZSxcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiB0b2tlbi50ZW1wbGF0ZSxcblx0XHRcdFx0XHRcdHRodW1ibmFpbDogdG9rZW4udGh1bWJuYWlsLFxuXHRcdFx0XHRcdFx0c2x1ZzogdG9rZW4uc2x1Zyxcblx0XHRcdFx0XHRcdGNhdGVnb3JpZXM6IHRva2VuLmNhdGVnb3JpZXMsXG5cdFx0XHRcdFx0XHR0YWdzOiB0b2tlbi50YWdzXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdO1x0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjYXB0aW9uRWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vICMgZGVwdD0xXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gVG9rZW5UeXBlLkhFQURJTkdfRklSU1QpIHtcblx0XHRcdFx0Y29uc3QgaGVhZEVsZW1lbnQgPSAge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRoZWFkRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkhFQURJTkc7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmRlcHQgPSAxO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5yb3cgPSBcIiNcIiArIHRva2VuLnZhbHVlO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5jaGlsZHJlbiA9IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogVG9rZW5UeXBlLlRFWFQsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbi52YWx1ZSxcblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGhlYWRFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIyMgZGVwdCA9IDJcblx0XHRcdGlmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuSEVBRElOR19TRUNPTkQpIHtcblx0XHRcdFx0Y29uc3QgaGVhZEVsZW1lbnQgPSAge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRoZWFkRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkhFQURJTkc7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmRlcHQgPSAyO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5yb3cgPSBcIiMjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vICMjIyBkZXB0ID0gM1xuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX1RISVJEKSB7XG5cblx0XHRcdFx0Y29uc3QgaGVhZEVsZW1lbnQgPSAge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRoZWFkRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkhFQURJTkc7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmRlcHQgPSAzO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5yb3cgPSBcIiMjI1wiICsgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmNoaWxkcmVuID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBUb2tlblR5cGUuVEVYVCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLnZhbHVlLFxuXHRcdFx0XHRcdFx0fV1cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGhlYWRFbGVtZW50KTtcdFx0XHRcblx0XHRcdH1cblxuXHRcdFx0Ly8gIyMjIyBkZXB0ID0gNFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5IRUFESU5HX0ZPUlRIKSB7XG5cdFx0XHRcdGNvbnN0IGhlYWRFbGVtZW50ID0gIHt9IGFzIFRva2VuLmhlYWRUb2tlbjtcblx0XHRcdFx0aGVhZEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5IRUFESU5HO1xuXHRcdFx0XHRoZWFkRWxlbWVudC5kZXB0ID0gNDtcblx0XHRcdFx0aGVhZEVsZW1lbnQucm93ID0gXCIjIyMjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vICMjIyMjIGRlcHQgPSA1XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PT0gVG9rZW5UeXBlLkhFQURJTkdfRklGVEgpIHtcblx0XHRcdFx0Y29uc3QgaGVhZEVsZW1lbnQgPSAge30gYXMgVG9rZW4uaGVhZFRva2VuO1xuXHRcdFx0XHRoZWFkRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkhFQURJTkc7XG5cdFx0XHRcdGhlYWRFbGVtZW50LmRlcHQgPSA1O1xuXHRcdFx0XHRoZWFkRWxlbWVudC5yb3cgPSBcIiMjIyMjXCIgKyB0b2tlbi52YWx1ZTtcblx0XHRcdFx0aGVhZEVsZW1lbnQuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFRva2VuVHlwZS5URVhULFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdG9rZW4udmFsdWUsXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChoZWFkRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdFxuXG5cdFx0XHQvL0NvZGVJbkNvZGVcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOX0NPREUpIHtcblxuXHRcdFx0XHRjb25zdCBjb2RlSW5Db2RlRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5jb2RlSW5Db2RlVG9rZW47XG5cdFx0XHRcdGNvZGVJbkNvZGVFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuQ09ERV9JTl9DT0RFO1xuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC5yb3cgPSBcImBgYFwiK3Rva2VuLmxhbmd1YWdlICsgXCJcXG5cIiArIHRva2VuLmNvZGUgKyBcIlxcbmBgYFwiO1xuXG5cdFx0XHRcdGNvZGVJbkNvZGVFbGVtZW50LmNvZGUgPSB0b2tlbi5jb2RlO1xuXHRcdFx0XHRjb2RlSW5Db2RlRWxlbWVudC5sYW5ndWFnZSA9IHRva2VuLmxhbmd1YWdlXHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGNvZGVJbkNvZGVFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly9Db2RlQmxvY2tcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0JMT0NLKSB7XG5cblx0XHRcdFx0Y29uc3QgY29kZUJsb2NrRWxlbWVudCA9ICB7fSBhcyBUb2tlbi5jb2RlQmxvY2tUb2tlbjtcblx0XHRcdFx0Y29kZUJsb2NrRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkNPREVfQkxPQ0s7XG5cdFx0XHRcdGNvZGVCbG9ja0VsZW1lbnQucm93ID0gXCJgYGBcIit0b2tlbi5sYW5ndWFnZSArIFwiXFxuXCIgKyB0b2tlbi5jb2RlICsgXCJcXG5gYGBcIjtcblx0XHRcdFx0Y29kZUJsb2NrRWxlbWVudC5jb2RlID0gdG9rZW4uY29kZTtcblx0XHRcdFx0Y29kZUJsb2NrRWxlbWVudC5sYW5ndWFnZSA9IHRva2VuLmxhbmd1YWdlXG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGNvZGVCbG9ja0VsZW1lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcblxuXHRcdFx0Ly9RdW90ZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlFVT1RFKSB7XG5cblx0XHRcdFx0Y29uc3QgcXVvdGVFbGVtZW50ID0gIHt9IGFzIFRva2VuLnF1b3RlVG9rZW47XG5cdFx0XHRcdHF1b3RlRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLlFVT1RFO1xuXHRcdFx0XHRxdW90ZUVsZW1lbnQucm93ID0gXCI+XCIgKyB0b2tlbi5xdW90ZSArIFwiXFxuPiA8Y2l0ZT4gLSBcIiArIHRva2VuLmF1dGhvciArIFwiPC9jaXRlPlwiO1xuXHRcdFx0XHRxdW90ZUVsZW1lbnQucXVvdGUgPSB0b2tlbi5xdW90ZTtcblx0XHRcdFx0cXVvdGVFbGVtZW50LmF1dGhvciA9IHRva2VuLmF1dGhvcjtcblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2gocXVvdGVFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly9MaXN0XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuTElTVCkge1xuXHRcdFx0XHRjb25zdCBsaXN0RWxlbWVudCA9ICB7fSBhcyBUb2tlbi5saXN0VG9rZW47XG5cdFx0XHRcdGxpc3RFbGVtZW50LnR5cGUgPSBUb2tlblR5cGUuTElTVDtcblx0XHRcdFx0bGlzdEVsZW1lbnQuYXR0cmlidXRlID0gdG9rZW4uYXR0cmlidXRlO1xuXHRcdFx0XHRsaXN0RWxlbWVudC5yb3cgPSB0b2tlbi5hdHRyaWJ1dGUgKyBcIiBcIit0b2tlbi52YWx1ZTtcblx0XHRcdFx0bGlzdEVsZW1lbnQudmFsdWUgPSB0b2tlbi52YWx1ZTsgXG5cdFx0XHRcdFxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGxpc3RFbGVtZW50KVxuXHRcdFx0fVxuXG5cdFx0XHQvL1RhYmxlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVEFCTEUpIHtcblx0XHRcdFx0Y29uc3QgdGFibGVFbGVtZW50ID0gIHt9IGFzIFRva2VuLnRhYmxlVG9rZW47XG5cdFx0XHRcdHRhYmxlRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLlRBQkxFO1xuXHRcdFx0XHR0YWJsZUVsZW1lbnQucm93ID0gdG9rZW4ucm93O1xuXHRcdFx0XHR0YWJsZUVsZW1lbnQuY2hpbGRyZW4gPSB0b2tlbi5jaGlsZHJlbjtcblxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKHRhYmxlRWxlbWVudClcblx0XHRcdH1cblxuXG5cdFx0XHQvL1N0YXJ0IGFsbCB0aGF0IGluIHRoZSBwYXJhZ3JhcGggY2FuIHVzZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSF9TVEFSVCkge1xuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhTdGFydEVsZW1lbnQgPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuO1xuXHRcdFx0XHRwYXJhZ3JhcGhTdGFydEVsZW1lbnQudHlwZSA9IFRva2VuVHlwZS5QQVJBR1JBUEg7XG5cdFx0XHRcdHBhcmFncmFwaFN0YXJ0RWxlbWVudC5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0XHRwYXJhZ3JhcGhTdGFydEVsZW1lbnQucm93ID0gXCJcIjtcblx0XHRcdFx0XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2gocGFyYWdyYXBoU3RhcnRFbGVtZW50KTtcblx0XHRcdFx0aXNQYXJhZ3JhcGggPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuUEFSQUdSQVBIX0VORCkge1xuXHRcdFx0XHRpc1BhcmFncmFwaCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0xpbmtcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5MSU5LKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtFbGVtZW50ID0ge30gYXMgVG9rZW4ubGlua1Rva2VuO1xuXHRcdFx0XHRsaW5rRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkxJTks7XG5cdFx0XHRcdGxpbmtFbGVtZW50Lm5hbWUgPSB0b2tlbi5uYW1lO1xuXHRcdFx0XHRsaW5rRWxlbWVudC51cmwgPSB0b2tlbi51cmw7XG5cdFx0XHRcdGxpbmtFbGVtZW50LnJvdyA9IFwiW1wiICsgdG9rZW4ubmFtZSArIFwiXShcIiArIHRva2VuLnVybCArIFwiKVwiXG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChsaW5rRWxlbWVudClcblx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgPSBjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyArIFwiW1wiICsgdG9rZW4ubmFtZSArIFwiXShcIiArIHRva2VuLnVybCArIFwiKVwiXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGRyZW4ucHVzaChsaW5rRWxlbWVudClcblx0XHRcdFx0fVx0XG5cdFx0XHR9XG5cblx0XHRcdC8vSW1hZ2Vcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiSW1hZ2VcIiAmJiBpc1BhcmFncmFwaCA9PSB0cnVlKSB7XG5cdFx0XHRcdGNvbnN0IGltYWdlVG9rZW4gPSB7fSBhcyBUb2tlbi5pbWFnZVRva2VuO1xuXHRcdFx0XHRpbWFnZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuSU1BR0U7XG5cdFx0XHRcdGltYWdlVG9rZW4uYWx0ID0gdG9rZW4uYWx0O1xuXHRcdFx0XHRpbWFnZVRva2VuLnVybCA9IHRva2VuLnVybDtcblx0XHRcdFx0aW1hZ2VUb2tlbi5yb3cgPSBcIiFbXCIgKyB0b2tlbi5hbHQgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goaW1hZ2VUb2tlbilcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgXCJbXCIgKyB0b2tlbi5hbHQgKyBcIl0oXCIgKyB0b2tlbi51cmwgKyBcIilcIlxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2goaW1hZ2VUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUZXh0XG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVEVYVCkge1xuXHRcdFx0XHRjb25zdCB0ZXh0VG9rZW4gPSB7fSBhcyBUb2tlbi50ZXh0VG9rZW47XG5cdFx0XHRcdHRleHRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlRFWFQ7XG5cdFx0XHRcdHRleHRUb2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlO1xuXHRcdFx0XHR0ZXh0VG9rZW4ucm93ID0gdG9rZW4udmFsdWVcblxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2godGV4dFRva2VuKVxuXHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2godGV4dFRva2VuKVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVbm1hcmthYmxlXG5cdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVU5NQVJLQUJMRSkge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRva2VuKVxuXHRcdFx0XHRjb25zdCB1bm1hcmthYmxlVGV4dFRva2VuID0ge30gYXMgVG9rZW4udW5tYXJrYWJsZVRva2VuO1xuXHRcdFx0XHR1bm1hcmthYmxlVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuVU5NQVJLQUJMRTtcblx0XHRcdFx0dW5tYXJrYWJsZVRleHRUb2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlO1xuXHRcdFx0XHR1bm1hcmthYmxlVGV4dFRva2VuLnJvdyA9IFwiXFxcXFwiICsgdG9rZW4udmFsdWUgKyBcIlxcXFxcIjtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaCh1bm1hcmthYmxlVGV4dFRva2VuKVxuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2godW5tYXJrYWJsZVRleHRUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH1cblxuXHRcblx0XHRcdC8vIFN0cm9uZ1xuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlNUUk9ORykge1xuXHRcdFx0XHRjb25zdCBzdHJvbmdUZXh0VG9rZW4gPSB7fSBhcyBUb2tlbi5zdHJvbmdUZXh0VG9rZW5cblx0XHRcdFx0c3Ryb25nVGV4dFRva2VuLnR5cGUgPSBUb2tlblR5cGUuU1RST05HO1xuXHRcdFx0XHRzdHJvbmdUZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0c3Ryb25nVGV4dFRva2VuLnJvdyA9IFwiKipcIiArIHRva2VuLnZhbHVlICsgXCIqKlwiXG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc1BhcmFncmFwaCA9PSB0cnVlKXtcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLmNoaWxkcmVuLnB1c2goc3Ryb25nVGV4dFRva2VuKVxuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2goc3Ryb25nVGV4dFRva2VuKVxuXHRcdFx0XHR9XG5cdFx0XHR9XHRcblxuXHRcdFx0Ly8gQ29sb3IgdGV4dFxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gXCJDb2xvclwiKSB7XG5cblx0XHRcdFx0Y29uc3QgY29sb3JUZXh0VG9rZW4gPSB7fSBhcyBUb2tlbi5jb2xvclRleHRUb2tlbjtcblx0XHRcdFx0Y29sb3JUZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0xPUjtcblx0XHRcdFx0Y29sb3JUZXh0VG9rZW4uY29sb3IgPSB0b2tlbi5jb2xvcjtcblx0XHRcdFx0Y29sb3JUZXh0VG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0Y29sb3JUZXh0VG9rZW4ucm93ID0gdG9rZW4udmFsdWUgKyBcIi5cIiArIHRva2VuLmNvbG9yO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNQYXJhZ3JhcGggPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0Y2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5jaGlsZHJlbi5wdXNoKGNvbG9yVGV4dFRva2VuKVxuXHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWUgK1wiLlwiK3Rva2VuLmNvbG9yIFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2goY29sb3JUZXh0VG9rZW4pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29sb3IgYmFkZ2Vcblx0XHRcdGlmICh0b2tlbi50eXBlID09IFwiQmFkZ2VcIikge1xuXG5cdFx0XHRcdGNvbnN0IGJhZGdlVG9rZW4gPSB7fSBhcyBUb2tlbi5iYWdkZVRva2VuO1xuXHRcdFx0XHRiYWRnZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuQkFER0U7XG5cdFx0XHRcdGJhZGdlVG9rZW4uY29sb3IgPSB0b2tlbi5jb2xvcjtcblx0XHRcdFx0YmFkZ2VUb2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlO1xuXHRcdFx0XHRiYWRnZVRva2VuLnJvdyA9IHRva2VuLnZhbHVlICsgXCJAXCIgKyB0b2tlbi5jb2xvcjtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChiYWRnZVRva2VuKVxuXHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWUgK1wiQFwiK3Rva2VuLmNvbG9yIFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2goYmFkZ2VUb2tlbilcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5saW5lQ29kZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkNPREVfSU5MSU5FKSB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2codG9rZW4pXG5cdFx0XHRcdGNvbnN0IGlubGluZUNvZGVFbGVtZW50ID0ge30gYXMgVG9rZW4uY29kZUlubGluZVRva2VuO1xuXHRcdFx0XHRpbmxpbmVDb2RlRWxlbWVudC50eXBlID0gVG9rZW5UeXBlLkNPREVfSU5MSU5FO1xuXHRcdFx0XHRpbmxpbmVDb2RlRWxlbWVudC52YWx1ZSA9IHRva2VuLnZhbHVlO1xuXHRcdFx0XHRpbmxpbmVDb2RlRWxlbWVudC5yb3cgPSB0b2tlbi52YWx1ZTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaChpbmxpbmVDb2RlRWxlbWVudClcblx0XHRcdFx0XHRjaGlsZHJlblsoY2hpbGRyZW4pLmxlbmd0aCAtIDFdLnJvdyA9IGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ICsgdG9rZW4udmFsdWVcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkcmVuLnB1c2goaW5saW5lQ29kZUVsZW1lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVuZGVyTGluZVxuXHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlVOREVSX0xJTkUpIHtcblx0XHRcdFx0Y29uc3QgdW5kZXJMaW5lRWxlbWVudCA9IHt9IGFzIFRva2VuLnVuZGVyTGluZVRva2VuO1xuXHRcdFx0XHR1bmRlckxpbmVFbGVtZW50LnR5cGUgPSAgVG9rZW5UeXBlLlVOREVSX0xJTkU7XG5cdFx0XHRcdHVuZGVyTGluZUVsZW1lbnQudmFsdWUgPSAgdG9rZW4udmFsdWU7XG5cdFx0XHRcdGlmKGlzUGFyYWdyYXBoID09IHRydWUpe1xuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0uY2hpbGRyZW4ucHVzaCh1bmRlckxpbmVFbGVtZW50KVxuXHRcdFx0XHRcdGNoaWxkcmVuWyhjaGlsZHJlbikubGVuZ3RoIC0gMV0ucm93ID0gY2hpbGRyZW5bKGNoaWxkcmVuKS5sZW5ndGggLSAxXS5yb3cgKyB0b2tlbi52YWx1ZVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHVuZGVyTGluZUVsZW1lbnQpXG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidG9rZW4gbnVtYmVyXCIsIHRva2VuX251bWJlcilcblx0XHRcdC8vY29uc29sZS5sb2coY2hpbGRyZW4pXG5cblx0XHRcdHRva2VuX251bWJlcisrO1xuXG5cdFx0fVxuXG5cblx0fVxufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHsgR3JhbW1hciB9IGZyb20gXCIuL0dyYW1tYXJcIlxuaW1wb3J0IHsgQ2FwdGlvbiB9IGZyb20gXCIuL0NhcHRpb25cIlxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4vVG9rZW5cIjtcbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBcbiAqL1xuXG5leHBvcnQgY2xhc3MgVG9rZW5pemVyIHtcblxuXHRwdWJsaWMgdG9rZW5zID0gW10gYXMgKFRva2VuLmJhZ2RlVG9rZW5cblx0XHR8IFRva2VuLmNhcHRpb25Ub2tlblxuXHRcdHwgVG9rZW4uY29kZUJsb2NrVG9rZW5cblx0XHR8IFRva2VuLmNvZGVJbmxpbmVUb2tlblxuXHRcdHwgVG9rZW4uY29sb3JUZXh0VG9rZW5cblx0XHR8IFRva2VuLmhlYWRUb2tlblxuXHRcdHwgVG9rZW4uaW1hZ2VUb2tlblxuXHRcdHwgVG9rZW4ubGlua1Rva2VuXG5cdFx0fCBUb2tlbi5saXN0VG9rZW5cblx0XHR8IFRva2VuLnBhcmFncmFwaEVuZFRva2VuXG5cdFx0fCBUb2tlbi5wYXJhZ3JhcGhTdGFydFRva2VuXG5cdFx0fCBUb2tlbi5xdW90ZVRva2VuXG5cdFx0fCBUb2tlbi5zdHJvbmdUZXh0VG9rZW5cblx0XHR8IFRva2VuLnRleHRUb2tlblxuXHRcdHwgVG9rZW4udW5kZXJMaW5lVG9rZW5cblx0XHR8IFRva2VuLnVua25vd25UZXh0VG9rZW5cblx0XHR8IFRva2VuLmNvZGVJbkNvZGVUb2tlblxuXHRcdHwgVG9rZW4udW5tYXJrYWJsZVRva2VuXG5cdFx0fCBUb2tlbi50YWJsZVRva2VuXG5cdClbXTtcblxuXHRwdWJsaWMgdGV4dDogc3RyaW5nO1x0XG5cdHByaXZhdGUgdG9rZW5zTWFwOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xuXG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcblxuXHRcdHRoaXMudG9rZW5zID0gW107XHRcdFxuXHRcdHRoaXMudG9rZW5zTWFwID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMudG9rZW5pemUoKTtcblx0fVxuXG5cdHRva2VuaXplKCkge1xuXG5cdFx0dGhpcy5maW5kQ2FwdGlvbigpO1xuXHRcdHRoaXMuZmluZFVubWFya2FibGUoKTtcblx0XHR0aGlzLmZpbmRDb2RlSW5Db2RlKCk7XG5cdFx0dGhpcy5maW5kQ29kZUJsb2NrKCk7XG5cdFx0dGhpcy5maW5kSGVhZGluZ3MoKTtcblx0XHR0aGlzLmZpbmRRdW90ZXMoKTtcblx0XHR0aGlzLmZpbmRTdHJvbmcoKTtcblx0XHR0aGlzLmZpbmRMaW5rcygpO1xuXHRcdHRoaXMuZmluZEltYWdlcygpO1xuXHRcdHRoaXMuZmluZFVuZGVybGluZXMoKTtcblx0XHR0aGlzLmZpbmRDb2xvcnMoKTtcblx0XHR0aGlzLmZpbmRCYWRnZXMoKTtcblx0XHR0aGlzLmZpbmRMaXN0cygpO1xuXHRcdHRoaXMuZmluZFRhYmxlcygpO1xuXHRcdHRoaXMuaW5pdCgpO1xuXG5cdH1cblxuXHRwcml2YXRlIGZpbmRDYXB0aW9uKCkge1xuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQ0FQVElPTikgIT0gbnVsbCkge1xuXHRcdFx0Y29uc3QgY2FwdGlvbiA9IG5ldyBDYXB0aW9uKHRoaXMudGV4dCk7XG5cdFx0XHRsZXQgdG9rZW4gPSB7fSBhcyBUb2tlbi5jYXB0aW9uVG9rZW47XG5cdFx0XHR0b2tlbiA9IGNhcHRpb24uZ2V0KCk7XG5cdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHR0aGlzLnRleHQgPSBcIiR0b2tlbi5cIiArIHV1aWQgKyBcIlxcblwiICsgY2FwdGlvbi50ZXh0O1xuXHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgdG9rZW4pO1xuXHRcdH1cblx0fVxuXG5cdC8vdW5tYXJrYWJsZVxuXHRwcml2YXRlIGZpbmRVbm1hcmthYmxlKCk6IHZvaWQge1xuXHRcdC8vaWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTk1BUktBQkxFKT8ubGVuZ3RoICE9IG51bGwpIHtcdFx0XHRcblxuXHRcdGNvbnN0IHVubWFya2FibGVzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOTUFSS0FCTEUpO1xuXG5cdFx0dW5tYXJrYWJsZXM/LmZvckVhY2goKHVubWFya2FibGU6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRjb25zdCBtYXRjaFJlc3VsdCA9IHVubWFya2FibGUubWF0Y2goR3JhbW1hci5CTE9DS1MuVU5NQVJLQUJMRSk7XG5cblx0XHRcdGlmIChtYXRjaFJlc3VsdCkge1xuXHRcdFx0XHRjb25zdCBib2R5ID0gbWF0Y2hSZXN1bHRbMF0/LnN1YnN0cmluZygyLCBtYXRjaFJlc3VsdFswXS5sZW5ndGggLSAyKTtcblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXG5cdFx0XHRcdGNvbnN0IHVubWFya2FibGVUb2tlbiA9IHt9IGFzIFRva2VuLnVubWFya2FibGVUb2tlbjtcblx0XHRcdFx0dW5tYXJrYWJsZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuVU5NQVJLQUJMRTtcblx0XHRcdFx0dW5tYXJrYWJsZVRva2VuLnZhbHVlID0gYm9keTtcblxuXHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZSh1bm1hcmthYmxlLCBgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCB1bm1hcmthYmxlVG9rZW4pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vfVxuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIGNvZGUgaW4gY29kZSBibG9ja3Ncblx0cHJpdmF0ZSBmaW5kQ29kZUluQ29kZSgpOiB2b2lkIHtcblxuXHRcdGNvbnN0IGNvZGVJbkNvZGVzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfSU5fQ09ERSk7XG5cblx0XHRjb2RlSW5Db2Rlcz8uZm9yRWFjaCgoY29kZUluQ29kZTogc3RyaW5nKSA9PiB7XG5cblx0XHRcdGNvbnN0IGxhbmd1YWdlTWF0Y2hSZXN1bHQgPSBjb2RlSW5Db2RlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklOTElORV9DT0RFKTtcblx0XHRcdGNvbnN0IGJvZHlNYXRjaFJlc3VsdCA9IGNvZGVJbkNvZGUubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREUpO1xuXG5cdFx0XHRpZiAobGFuZ3VhZ2VNYXRjaFJlc3VsdCAmJiBib2R5TWF0Y2hSZXN1bHQpIHtcblxuXHRcdFx0XHRjb25zdCBsYW5ndWFnZSA9IGxhbmd1YWdlTWF0Y2hSZXN1bHRbMF07XG5cdFx0XHRcdGNvbnN0IGJvZHkgPSBib2R5TWF0Y2hSZXN1bHRbMV0gPz8gJyc7IC8vIEFkZCBudWxsaXNoIGNvYWxlc2Npbmcgb3BlcmF0b3IgdG8gYXNzaWduIGEgbm9uLW51bGwgdmFsdWUgdG8gJ2JvZHknXG5cblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRjb25zdCBjb2RlVG9rZW4gPSB7fSBhcyBUb2tlbi5jb2RlSW5Db2RlVG9rZW47XG5cdFx0XHRcdGNvZGVUb2tlbi50eXBlID0gVG9rZW5UeXBlLkNPREVfSU5fQ09ERTtcblx0XHRcdFx0Y29kZVRva2VuLmNvZGUgPSBib2R5O1xuXHRcdFx0XHRjb2RlVG9rZW4ubGFuZ3VhZ2UgPSBsYW5ndWFnZSBhcyBzdHJpbmc7XG5cdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGNvZGVUb2tlbik7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoY29kZUluQ29kZSwgYCAkdG9rZW4uJHt1dWlkfWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBzaW1wbGUgY29kZSBibG9ja3Ncblx0cHJpdmF0ZSBmaW5kQ29kZUJsb2NrKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGJsb2NrcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0RFX0JMT0NLKTtcblx0XHRcdGJsb2Nrcz8uZm9yRWFjaCgoYmxvY2s6IHN0cmluZykgPT4ge1xuXG5cblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2VNYXRjaFJlc3VsdCA9IGJsb2NrLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0tfTEFORyk7XG5cdFx0XHRcdGNvbnN0IGJvZHlNYXRjaFJlc3VsdCA9IGJsb2NrLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPREVfQkxPQ0tfQk9EWSk7XG5cblx0XHRcdFx0aWYgKGxhbmd1YWdlTWF0Y2hSZXN1bHQgJiYgYm9keU1hdGNoUmVzdWx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2UgPSBsYW5ndWFnZU1hdGNoUmVzdWx0WzBdO1xuXHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBib2R5TWF0Y2hSZXN1bHRbMF07XG5cdFx0XHRcdFx0Y29uc3QgY29kZVRva2VuID0ge30gYXMgVG9rZW4uY29kZUJsb2NrVG9rZW47XG5cdFx0XHRcdFx0Y29kZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuQ09ERV9CTE9DSztcblx0XHRcdFx0XHRjb2RlVG9rZW4uY29kZSA9IGJvZHkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdGNvZGVUb2tlbi5sYW5ndWFnZSA9IGxhbmd1YWdlIGFzIHN0cmluZztcblxuXHRcdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBjb2RlVG9rZW4pO1xuXG5cdFx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoYmxvY2ssXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9YCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHQvL2ZpbmQgaGVhZGluZ3Ncblx0ZmluZEhlYWRpbmdzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5IRUFESU5HKSAhPSBudWxsKSB7XG5cdFx0XHRjb25zdCBoZWFkaW5ncyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5IRUFESU5HKTtcblx0XHRcdGhlYWRpbmdzPy5mb3JFYWNoKChoZWFkaW5nOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBsZXZlbE1hdGNoUmVzdWx0ID0gaGVhZGluZy5tYXRjaChHcmFtbWFyLkJMT0NLUy5IRUFESU5HX0xFVkVMKTtcblxuXHRcdFx0XHRpZiAobGV2ZWxNYXRjaFJlc3VsdCkge1xuXHRcdFx0XHRcdGNvbnN0IGxldmVsID0gbGV2ZWxNYXRjaFJlc3VsdFswXTtcblx0XHRcdFx0XHQvL2ZpbmQgYm9keSBmcm9tIGhlYWRpbmcgd2hlcmUgc2F0cnQgaXMgbGV2ZWwgKyAxIGFuZCBlbmQgaXMgXFxuXG5cdFx0XHRcdFx0Ly9wcml2YXRlIGNhc2Vcblx0XHRcdFx0XHRpZighbGV2ZWwgfHwgbGV2ZWwubGVuZ3RoID4gaGVhZGluZy5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCBib2R5ID0gaGVhZGluZy5zbGljZShsZXZlbC5sZW5ndGggKyAxLCBoZWFkaW5nLmxlbmd0aCk7XG5cblx0XHRcdFx0XHRjb25zdCB0eXBlcyA6IGFueSA9IFtcblx0XHRcdFx0XHRcdFRva2VuVHlwZS5IRUFESU5HX0ZJUlNULFxuXHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfU0VDT05ELFxuXHRcdFx0XHRcdFx0VG9rZW5UeXBlLkhFQURJTkdfVEhJUkQsXG5cdFx0XHRcdFx0XHRUb2tlblR5cGUuSEVBRElOR19GT1JUSCxcblx0XHRcdFx0XHRcdFRva2VuVHlwZS5IRUFESU5HX0ZJRlRIXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vcHJpdmF0ZSBjYXNlXG5cdFx0XHRcdFx0aWYgKCFsZXZlbCB8fCBsZXZlbC5sZW5ndGggPiB0eXBlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y29uc3QgaXR5cGU6IG51bWJlciA9IGxldmVsLmxlbmd0aCAtIDE7XG5cblx0XHRcdFx0XHRjb25zdCBoZWFkVG9rZW4gPSB7fSBhcyBUb2tlbi5oZWFkVG9rZW47XG5cdFx0XHRcdFx0aGVhZFRva2VuLnR5cGUgPSB0eXBlc1tpdHlwZV07XG5cdFx0XHRcdFx0aGVhZFRva2VuLnZhbHVlID0gYm9keTtcblx0XHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgaGVhZFRva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGhlYWRpbmcsXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIHF1b3Rlc1xuXHRmaW5kUXVvdGVzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5RVU9URSkgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCBxdW90ZXMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuUVVPVEUpO1xuXG5cdFx0XHRxdW90ZXM/LmZvckVhY2goKHF1b3RlOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBtYXRjaFJlc3VsdCA9IHF1b3RlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlFVT1RFX1BBUkFNUyk7XG5cdFx0XHRcdGlmKG1hdGNoUmVzdWx0KXtcblx0XHRcdFx0XHRjb25zdCBhdXRob3IgOiBhbnkgPSBtYXRjaFJlc3VsdFszXTtcblx0XHRcdFx0XHRjb25zdCB0ZXh0ID0gbWF0Y2hSZXN1bHRbMF07XG5cblx0XHRcdFx0XHRjb25zdCBxdW90ZVRva2VuID0ge30gYXMgVG9rZW4ucXVvdGVUb2tlbjtcblx0XHRcdFx0XHRxdW90ZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuUVVPVEU7XG5cdFx0XHRcdFx0cXVvdGVUb2tlbi5xdW90ZSA9IHRleHQgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdHF1b3RlVG9rZW4uYXV0aG9yID0gYXV0aG9yO1xuXG5cdFx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIHF1b3RlVG9rZW4pO1xuXG5cdFx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UocXVvdGUsXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIGJvbGQgdGV4dFxuXHRmaW5kU3Ryb25nKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3Qgc3Ryb25ncyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkcpO1xuXG5cdFx0XHRzdHJvbmdzPy5mb3JFYWNoKChzdHJvbmc6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGJvZHlNYXRjaFJlc3VsdCA9IHN0cm9uZy5tYXRjaChHcmFtbWFyLkJMT0NLUy5TVFJPTkdfVEVYVCk7XG5cblx0XHRcdFx0aWYoYm9keU1hdGNoUmVzdWx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgYm9keSA9IGJvZHlNYXRjaFJlc3VsdFswXTtcblx0XHRcdFx0XHRjb25zdCBzdHJvbmdUb2tlbiA9IHt9IGFzIFRva2VuLnN0cm9uZ1RleHRUb2tlbjtcblx0XHRcdFx0XHRzdHJvbmdUb2tlbi50eXBlID0gVG9rZW5UeXBlLlNUUk9ORztcblx0XHRcdFx0XHRzdHJvbmdUb2tlbi52YWx1ZSA9IGJvZHk7XG5cblx0XHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgc3Ryb25nVG9rZW4pO1xuXG5cdFx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2Uoc3Ryb25nLFxuXHRcdFx0XHRcdFx0YCAkdG9rZW4uJHt1dWlkfSBgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZmluZCBsaW5rc1xuXHRmaW5kTGlua3MoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJTkspICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgbGlua3MgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOSyk7XG5cblx0XHRcdGxpbmtzPy5mb3JFYWNoKChsaW5rOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0Y29uc3QgbmFtZU1hdGNoUmVzdWx0ID0gbGluay5tYXRjaChHcmFtbWFyLkJMT0NLUy5MSU5LX05BTUUpO1xuXHRcdFx0XHRjb25zdCB1cmxNYXRjaFJlc3VsdCA9IGxpbmsubWF0Y2goR3JhbW1hci5CTE9DS1MuTElOS19VUkwpO1xuXHRcdFx0XHRpZihuYW1lTWF0Y2hSZXN1bHQgJiYgdXJsTWF0Y2hSZXN1bHQgJiYgbmFtZU1hdGNoUmVzdWx0WzBdICYmIHVybE1hdGNoUmVzdWx0WzBdKXtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gbmFtZU1hdGNoUmVzdWx0WzBdLnN1YnN0cmluZygxLCBuYW1lTWF0Y2hSZXN1bHRbMF0ubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdFx0Y29uc3QgdXJsID0gdXJsTWF0Y2hSZXN1bHRbMF0uc3Vic3RyaW5nKDEsIHVybE1hdGNoUmVzdWx0WzBdLmxlbmd0aCAtIDEpO1xuXG5cdFx0XHRcdFx0Y29uc3QgbGlua1Rva2VuID0ge30gYXMgVG9rZW4ubGlua1Rva2VuO1xuXHRcdFx0XHRcdGxpbmtUb2tlbi50eXBlID0gVG9rZW5UeXBlLkxJTks7XG5cdFx0XHRcdFx0bGlua1Rva2VuLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdGxpbmtUb2tlbi51cmwgPSB1cmw7XG5cblx0XHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgbGlua1Rva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGxpbmssXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIGltYWdlc1xuXHRmaW5kSW1hZ2VzKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5JTUFHRSkgIT0gbnVsbCkge1xuXG5cdFx0XHRjb25zdCBpbWFnZXMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSU1BR0UpO1xuXG5cdFx0XHRpbWFnZXM/LmZvckVhY2goKGltYWdlOiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBhbHRNYXRjaFJlc3VsdCA9IGltYWdlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFX05BTUUpO1xuXHRcdFx0XHRjb25zdCB1cmxNYXRjaFJlc3VsdCA9IGltYWdlLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLklNQUdFX1VSTCk7XG5cblx0XHRcdFx0aWYoYWx0TWF0Y2hSZXN1bHQgJiYgdXJsTWF0Y2hSZXN1bHQgJiYgYWx0TWF0Y2hSZXN1bHRbMF0gJiYgdXJsTWF0Y2hSZXN1bHRbMF0pe1xuXHRcdFx0XHRcdGNvbnN0IGFsdCA9IGFsdE1hdGNoUmVzdWx0WzBdLnN1YnN0cmluZygyLCBhbHRNYXRjaFJlc3VsdFswXS5sZW5ndGggLSAxKTtcblx0XHRcdFx0XHRjb25zdCB1cmwgPSB1cmxNYXRjaFJlc3VsdFswXS5zdWJzdHJpbmcoMSwgdXJsTWF0Y2hSZXN1bHRbMF0ubGVuZ3RoIC0gMSk7XHRcblxuXHRcdFx0XHRcdGNvbnN0IGltYWdlVG9rZW4gPSB7fSBhcyBUb2tlbi5pbWFnZVRva2VuO1xuXHRcdFx0XHRcdGltYWdlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5JTUFHRTtcblx0XHRcdFx0XHRpbWFnZVRva2VuLmFsdCA9IGFsdDtcblx0XHRcdFx0XHRpbWFnZVRva2VuLnVybCA9IHVybDtcblxuXHRcdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBpbWFnZVRva2VuKTtcblxuXG5cdFx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoaW1hZ2UsXG5cdFx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9maW5kIHVuZGVybGluZXNcblx0ZmluZFVuZGVybGluZXMoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlVOREVSX0xJTkUpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgdW5kZXJsaW5lcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9MSU5FKTtcblxuXHRcdFx0dW5kZXJsaW5lcz8uZm9yRWFjaCgodW5kZXJsaW5lOiBzdHJpbmcpID0+IHtcdFx0XHRcdFxuXG5cdFx0XHRcdGNvbnN0IGJvZHlNYXRjaFJlc3VsdCA9IHVuZGVybGluZS5tYXRjaChHcmFtbWFyLkJMT0NLUy5VTkRFUl9MSU5FKTtcblxuXHRcdFx0XHRpZihib2R5TWF0Y2hSZXN1bHQgJiYgYm9keU1hdGNoUmVzdWx0WzBdKXtcblx0XHRcdFx0XHRjb25zdCBib2R5ID0gYm9keU1hdGNoUmVzdWx0WzBdLnN1YnN0cmluZygxLCBib2R5TWF0Y2hSZXN1bHRbMF0ubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdFx0Y29uc3QgdW5kZXJsaW5lVG9rZW4gPSB7fSBhcyBUb2tlbi51bmRlckxpbmVUb2tlbjtcblx0XHRcdFx0XHR1bmRlcmxpbmVUb2tlbi50eXBlID0gVG9rZW5UeXBlLlVOREVSX0xJTkU7XG5cdFx0XHRcdFx0dW5kZXJsaW5lVG9rZW4udmFsdWUgPSBib2R5O1xuXG5cdFx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIHVuZGVybGluZVRva2VuKTtcblxuXHRcdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKHVuZGVybGluZSxcblx0XHRcdFx0XHRcdGAgJHRva2VuLiR7dXVpZH0gYCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHQvL2ZpbmQgY29sb3JzXG5cdGZpbmRDb2xvcnMoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkNPTE9SKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IGNvbG9ycyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5DT0xPUik7XG5cblx0XHRcdGNvbG9ycz8uZm9yRWFjaCgoY29sb3I6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGJvZHkgPSBjb2xvci5zcGxpdChcIi5cIilbMF07XG5cdFx0XHRcdGNvbnN0IGNvbG9yTmFtZSA6IGFueSA9IGNvbG9yLnNwbGl0KFwiLlwiKVsxXTtcblxuXG5cdFx0XHRcdGNvbnN0IGNvbG9yVG9rZW4gPSB7fSBhcyBUb2tlbi5jb2xvclRleHRUb2tlbjtcblx0XHRcdFx0Y29sb3JUb2tlbi50eXBlID0gVG9rZW5UeXBlLkNPTE9SO1xuXHRcdFx0XHRjb2xvclRva2VuLnZhbHVlID0gYm9keTtcblx0XHRcdFx0Y29sb3JUb2tlbi5jb2xvciA9IGNvbG9yTmFtZTtcblxuXHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGNvbG9yVG9rZW4pO1xuXG5cdFx0XHRcdHRoaXMudGV4dCA9IHRoaXMudGV4dC5yZXBsYWNlKGNvbG9yLFxuXHRcdFx0XHRcdGAgJHRva2VuLiR7dXVpZH1gKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cblxuXHQvL2ZpbmQgYmFnZXNcblx0ZmluZEJhZGdlcygpOiB2b2lkIHtcblxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuQkFER0UpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgYmFkZ2VzID0gdGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkJBREdFKTtcblxuXHRcdFx0YmFkZ2VzPy5mb3JFYWNoKChiYWRnZTogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgYm9keSA9IGJhZGdlLnNwbGl0KFwiQFwiKVswXTtcblx0XHRcdFx0Y29uc3QgY29sb3JOYW1lOiBhbnkgPSBiYWRnZS5zcGxpdChcIkBcIilbMV07XG5cblx0XHRcdFx0Y29uc3QgYmFkZ2VUb2tlbiA9IHt9IGFzIFRva2VuLmJhZ2RlVG9rZW47XG5cdFx0XHRcdGJhZGdlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5CQURHRTtcblx0XHRcdFx0YmFkZ2VUb2tlbi52YWx1ZSA9IGJvZHk7XG5cdFx0XHRcdGJhZGdlVG9rZW4uY29sb3IgPSBjb2xvck5hbWU7XG5cblx0XHRcdFx0Y29uc3QgdXVpZCA9IHV1aWR2NCgpO1xuXHRcdFx0XHR0aGlzLnRva2Vuc01hcC5zZXQoXCIkdG9rZW4uXCIgKyB1dWlkLCBiYWRnZVRva2VuKTtcblxuXHRcdFx0XHR0aGlzLnRleHQgPSB0aGlzLnRleHQucmVwbGFjZShiYWRnZSxcblx0XHRcdFx0XHRgICR0b2tlbi4ke3V1aWR9IGApO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fVxuXG5cdC8vZmluZCBsaXN0c1xuXHRmaW5kTGlzdHMoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLkxJU1QpICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgbGlzdHMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuTElTVCk7XG5cblx0XHRcdGxpc3RzPy5mb3JFYWNoKChsaXN0OiBzdHJpbmcpID0+IHtcblxuXHRcdFx0XHRjb25zdCBib2R5ID0gbGlzdDtcblxuXHRcdFx0XHRjb25zdCBsaXN0VG9rZW4gPSB7fSBhcyBUb2tlbi5saXN0VG9rZW47XG5cdFx0XHRcdGxpc3RUb2tlbi50eXBlID0gVG9rZW5UeXBlLkxJU1Q7XHRcdFx0XHRcblx0XHRcdFx0bGlzdFRva2VuLnZhbHVlID0gYm9keTtcblxuXHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGxpc3RUb2tlbik7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UobGlzdCwgYCAkdG9rZW4uJHt1dWlkfWApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cblxuXHQvL2ZpbmQgdGFibGVzXG5cdGZpbmRUYWJsZXMoKTogdm9pZCB7XG5cblx0XHRpZiAodGhpcy50ZXh0Lm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlRBQkxFKSAhPSBudWxsKSB7XG5cblx0XHRcdGNvbnN0IHRhYmxlcyA9IHRoaXMudGV4dC5tYXRjaChHcmFtbWFyLkJMT0NLUy5UQUJMRSk7XG5cblx0XHRcdHRhYmxlcz8uZm9yRWFjaCgodGFibGU6IHN0cmluZykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IHRhYmxlVG9rZW4gPSB7fSBhcyBUb2tlbi50YWJsZVRva2VuO1xuXHRcdFx0XHR0YWJsZVRva2VuLnR5cGUgPSBUb2tlblR5cGUuVEFCTEU7XG5cdFx0XHRcdHRhYmxlVG9rZW4ucm93ID0gdGFibGU7XG5cdFx0XHRcdHRhYmxlVG9rZW4uY2hpbGRyZW4gPSBbXSBhcyBUb2tlbi50YWJsZVJvd1Rva2VuW107XG5cblx0XHRcdFx0Ly9hZGQgY2hpbGRyZW5cblx0XHRcdFx0Y29uc3Qgcm93cyA9IHRhYmxlLnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0XHRyb3dzLmZvckVhY2goKHJvdzogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3Qgcm93VG9rZW4gPSB7fSBhcyBUb2tlbi50YWJsZVJvd1Rva2VuO1xuXHRcdFx0XHRcdHJvd1Rva2VuLnR5cGUgPSBUb2tlblR5cGUuVEFCTEVfUk9XO1xuXHRcdFx0XHRcdHJvd1Rva2VuLnZhbHVlID0gcm93O1xuXHRcdFx0XHRcdHRhYmxlVG9rZW4uY2hpbGRyZW4ucHVzaChyb3dUb2tlbik7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNvbnN0IHV1aWQgPSB1dWlkdjQoKTtcblx0XHRcdFx0dGhpcy50b2tlbnNNYXAuc2V0KFwiJHRva2VuLlwiICsgdXVpZCwgdGFibGVUb2tlbik7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UodGFibGUsIGAgJHRva2VuLiR7dXVpZH1gKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly9pbmxpbmUgY29kZVxuXHRcdGlmICh0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREVfQkxPQ0spICE9IG51bGwpIHtcblxuXHRcdFx0Y29uc3QgaW5saW5lQ29kZXMgPSB0aGlzLnRleHQubWF0Y2goR3JhbW1hci5CTE9DS1MuSU5MSU5FX0NPREVfQkxPQ0spO1xuXG5cdFx0XHRpbmxpbmVDb2Rlcz8uZm9yRWFjaCgoaW5saW5lQ29kZTogc3RyaW5nKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgaW5saW5lQ29kZVRva2VuID0ge30gYXMgVG9rZW4uY29kZUlubGluZVRva2VuO1xuXHRcdFx0XHRpbmxpbmVDb2RlVG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT0RFX0lOTElORTtcblx0XHRcdFx0aW5saW5lQ29kZVRva2VuLnZhbHVlID0gaW5saW5lQ29kZTtcblxuXHRcdFx0XHRjb25zdCB1dWlkID0gdXVpZHY0KCk7XG5cdFx0XHRcdHRoaXMudG9rZW5zTWFwLnNldChcIiR0b2tlbi5cIiArIHV1aWQsIGlubGluZUNvZGVUb2tlbik7XG5cblx0XHRcdFx0dGhpcy50ZXh0ID0gdGhpcy50ZXh0LnJlcGxhY2UoaW5saW5lQ29kZSwgYCAkdG9rZW4uJHt1dWlkfWApO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cblx0aW5pdCA9ICgpOiB2b2lkID0+IHtcblxuXHRcdC8vbmVlZCB0byBmaW5kIGFsbCBwYXJhZ3JhcGhzIGluIHRoZSBhcnRpY2xlIGFuZCBjaGFuZ2UgdGhlbSB0byB0b2tlbnNcblx0XHRjb25zdCBwYXJhZ3JhcGhTdGFydFRva2VuID0ge30gYXMgVG9rZW4ucGFyYWdyYXBoU3RhcnRUb2tlbjtcblx0XHRwYXJhZ3JhcGhTdGFydFRva2VuLnR5cGUgPSBUb2tlblR5cGUuUEFSQUdSQVBIX1NUQVJUO1xuXG5cdFx0Y29uc3QgcGFyYWdyYXBoRW5kVG9rZW4gPSB7fSBhcyBUb2tlbi5wYXJhZ3JhcGhFbmRUb2tlbjtcblx0XHRwYXJhZ3JhcGhFbmRUb2tlbi50eXBlID0gVG9rZW5UeXBlLlBBUkFHUkFQSF9FTkQ7XG5cblx0XHQvL2NvbnNvbGUubG9nKHRoaXMudGV4dCk7XG5cblx0XHQvL2NvbnNvbGUubG9nKHRoaXMudG9rZW5zTWFwKTtcblxuXHRcdHRoaXMudGV4dC5zcGxpdChcIlxcblwiKS5mb3JFYWNoKChwYXJhZ3JhcGg6IHN0cmluZykgPT4ge1xuXHRcdFx0aWYgKHBhcmFncmFwaC5sZW5ndGggIT0gMFxuXHRcdFx0XHQmJiBwYXJhZ3JhcGggIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCYmIHBhcmFncmFwaC50cmltKCkgIT0gXCIgXCIpIHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhwYXJhZ3JhcGgpO1xuXHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHBhcmFncmFwaFN0YXJ0VG9rZW4pO1xuXHRcdFx0XHRwYXJhZ3JhcGguc3BsaXQoXCIgXCIpLmZvckVhY2goKHdvcmQ6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHdvcmRNYXRjaFJlc3VsdCA9IHdvcmQubWF0Y2goR3JhbW1hci5CTE9DS1MuVE9LRU4pO1xuXHRcdFx0XHRcdGlmICh3b3JkTWF0Y2hSZXN1bHQgJiYgd29yZE1hdGNoUmVzdWx0WzBdKSB7XG5cdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKFwid29yZDogXCIgKyB3b3JkICsgXCIgPSBcIiArIHRoaXMudG9rZW5zTWFwLmdldCh3b3JkLm1hdGNoKEdyYW1tYXIuQkxPQ0tTLlRPS0VOKVswXSkpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dGhpcy50b2tlbnMucHVzaCh0aGlzLnRva2Vuc01hcC5nZXQod29yZE1hdGNoUmVzdWx0WzBdKSk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHdvcmQpO1xuXHRcdFx0XHRcdFx0aWYgKHdvcmQubGVuZ3RoICE9IDBcblx0XHRcdFx0XHRcdFx0JiYgd29yZCAhPSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dFRva2VuID0ge30gYXMgVG9rZW4udGV4dFRva2VuO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udHlwZSA9IFRva2VuVHlwZS5URVhUO1xuXHRcdFx0XHRcdFx0XHR0ZXh0VG9rZW4udmFsdWUgPSB3b3JkO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHdvcmQpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnRva2Vucy5wdXNoKHRleHRUb2tlbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy50b2tlbnMucHVzaChwYXJhZ3JhcGhFbmRUb2tlbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL2NvbnNvbGUubG9nKHRoaXMudG9rZW5zKTtcblx0XHR0aGlzLnRva2VucztcblxuXHR9XG59IiwiLyoqXG4gKiBBdXRob3I6IG1ldWdlbm9tLmNvbVxuICogRGF0ZTogMTkuMDMuMjAyM1xuICogUmVmYWN0b3JlZDogMTkuMDMuMjAyMyBcbiAqL1xuXG5leHBvcnQgZW51bSBUb2tlblR5cGUge1xuXHRCQURHRSA9IFwiQmFkZ2VcIiwgLy8gQSBiYWRnZSBmb3IgZGlzcGxheWluZyBleHRyYSBpbmZvcm1hdGlvblxuXHRDQVBUSU9OID0gXCJDYXB0aW9uXCIsIC8vIEEgY2FwdGlvbiBmb3IgYW4gaW1hZ2Ugb3IgdmlkZW9cblx0Q09ERV9CTE9DSyA9IFwiQ29kZUJsb2NrXCIsIC8vIEEgYmxvY2sgb2YgY29kZVxuXHRDT0RFX0lOX0NPREUgPSBcIkNvZGVJbkNvZGVcIiwgLy8gQSBjb2RlIHNuaXBwZXQgaW5zaWRlIGEgY29kZSBibG9ja1xuXHRDT0RFX0lOTElORSA9IFwiQ29kZUlubGluZVwiLCAvLyBBbiBpbmxpbmUgY29kZSBzbmlwcGV0XG5cdENPTE9SID0gXCJDb2xvclwiLCAvLyBBIGNvbG9yIHZhbHVlXG5cdERPQ1VNRU5UID0gXCJEb2N1bWVudFwiLCAvLyBBIGRvY3VtZW50IGNvbnRhaW5pbmcgdmFyaW91cyBlbGVtZW50c1xuXHRIRUFESU5HID0gXCJIZWFkaW5nXCIsIC8vIEEgaGVhZGluZyBlbGVtZW50XG5cdEhFQURJTkdfRklSU1QgPSBcIkhlYWRpbmdGaXJzdFwiLCAvLyBBIGZpcnN0LWxldmVsIGhlYWRpbmcgZWxlbWVudFxuXHRIRUFESU5HX1NFQ09ORCA9IFwiSGVhZGluZ1NlY29uZFwiLCAvLyBBIHNlY29uZC1sZXZlbCBoZWFkaW5nIGVsZW1lbnRcblx0SEVBRElOR19USElSRCA9IFwiSGVhZGluZ1RoaXJkXCIsIC8vIEEgdGhpcmQtbGV2ZWwgaGVhZGluZyBlbGVtZW50XG5cdEhFQURJTkdfRk9SVEggPSBcIkhlYWRpbmdGb3J0aFwiLCAvLyBBIGZvdXJ0aC1sZXZlbCBoZWFkaW5nIGVsZW1lbnRcblx0SEVBRElOR19GSUZUSCA9IFwiSGVhZGluZ0ZpZnRoXCIsIC8vIEEgZmlmdGgtbGV2ZWwgaGVhZGluZyBlbGVtZW50XG5cdElNQUdFID0gXCJJbWFnZVwiLCAvLyBBbiBpbWFnZSBlbGVtZW50XG5cdExJTksgPSBcIkxpbmtcIiwgLy8gQSBoeXBlcmxpbmsgZWxlbWVudFxuXHRMSVNUID0gXCJMaXN0XCIsIC8vIEEgbGlzdCBlbGVtZW50XG5cdFBBUkFHUkFQSCA9IFwiUGFyYWdyYXBoXCIsIC8vIEEgcGFyYWdyYXBoIGVsZW1lbnRcblx0UEFSQUdSQVBIX1NUQVJUID0gXCJQYXJhZ3JhcGhTdGFydFwiLCAvLyBUaGUgc3RhcnQgb2YgYSBwYXJhZ3JhcGggZWxlbWVudFxuXHRQQVJBR1JBUEhfRU5EID0gXCJQYXJhZ3JhcGhFbmRcIiwgLy8gVGhlIGVuZCBvZiBhIHBhcmFncmFwaCBlbGVtZW50XG5cdFFVT1RFID0gXCJRdW90ZVwiLCAvLyBBIGJsb2NrcXVvdGUgZWxlbWVudFxuXHRTVFJPTkcgPSBcIlN0cm9uZ1wiLCAvLyBBIHN0cm9uZyBvciBib2xkIHRleHQgZWxlbWVudFxuXHRUQUJMRSA9IFwiVGFibGVcIiwgLy8gQSB0YWJsZSBlbGVtZW50XG5cdFRBQkxFX1JPVyA9IFwiVGFibGVSb3dcIiwgLy8gQSB0YWJsZSByb3cgZWxlbWVudFxuXHRURVhUID0gXCJUZXh0XCIsIC8vIEEgcGxhaW4gdGV4dCBlbGVtZW50XG5cdFVOREVSX0xJTkUgPSBcIlVuZGVyTGluZVwiLCAvLyBBbiB1bmRlcmxpbmVkIHRleHQgZWxlbWVudFxuXHRVTktOT1dOX1RFWFQgPSBcIlVua25vd25UZXh0XCIsIC8vIEFuIHVua25vd24gb3IgdW5yZWNvZ25pemVkIHRleHQgZWxlbWVudFxuXHRVTk1BUktBQkxFID0gXCJVbm1hcmthYmxlXCIsIC8vIEFuIGVsZW1lbnQgdGhhdCBzaG91bGQgbm90IGJlIG1hcmtlZCB1cFxuICB9ICAiLCJpbXBvcnQgeyBDYXB0aW9uSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ2FwdGlvbkhUTUxcIlxuaW1wb3J0IHsgSGVhZGVySFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvSGVhZGVySFRNTFwiO1xuaW1wb3J0IHtQYXJhZ3JhcGhIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL1BhcmFncmFwaEhUTUxcIlxuaW1wb3J0IHsgQ29kZUJsb2NrSFRNTCB9IGZyb20gXCIuL2h0bWxibG9ja3MvQ29kZUJsb2NrSFRNTFwiO1xuaW1wb3J0IHtRdW90ZUhUTUx9IGZyb20gXCIuL2h0bWxibG9ja3MvUXVvdGVIVE1MXCI7XG5pbXBvcnQge0xpc3RIVE1MfSBmcm9tIFwiLi9odG1sYmxvY2tzL0xpc3RIVE1MXCI7XG5pbXBvcnQgeyBUYWJsZUhUTUwgfSBmcm9tIFwiLi9odG1sYmxvY2tzL1RhYmxlSFRNTFwiO1xuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuXG50eXBlIEFTVCA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRjaGlsZHJlbj86IGFueVtdXG59XG5cblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG5cdHByaXZhdGUgYXN0IDogQVNUO1xuXHRwdWJsaWMgaHRtbE91dHB1dCA6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihhc3QgOiBBU1QsIGh0bWxPdXRwdXQgOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcblx0XHR0aGlzLmFzdCA9IGFzdFxuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdH1cblxuXHRpbml0KCkge1xuXG5cdFx0Y29uc3QgY2hpbGRyZW4gID0gdGhpcy5hc3QuY2hpbGRyZW47XG5cblx0XHRpZihjaGlsZHJlbikge1xuXHRcdFx0Y2hpbGRyZW4uZm9yRWFjaCgodG9rZW4pID0+IHtcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkNBUFRJT04pIHtcblx0XHRcdFx0XHRpZiAodGhpcy5odG1sT3V0cHV0KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjYXB0aW9uID0gbmV3IENhcHRpb25IVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0Y2FwdGlvbi5yZW5kZXIoKTtcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5IRUFESU5HKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaGVhZGVyID0gbmV3IEhlYWRlckhUTUwodG9rZW4sIHRoaXMuaHRtbE91dHB1dCk7XG5cdFx0XHRcdFx0XHRoZWFkZXIucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdGlmICh0b2tlbi50eXBlID09IFRva2VuVHlwZS5DT0RFX0JMT0NLIHx8IHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLkNPREVfSU5fQ09ERSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmh0bWxPdXRwdXQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGNvZGVibG9jayA9IG5ldyBDb2RlQmxvY2tIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0Y29kZWJsb2NrLnJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlFVT1RFKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcXVvdGUgPSBuZXcgUXVvdGVIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1xuXHRcdFx0XHRcdFx0cXVvdGUucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuTElTVCkge1x0XG5cdFx0XHRcdFx0aWYgKHRoaXMuaHRtbE91dHB1dCkge1x0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gbmV3IExpc3RIVE1MKHRva2VuLCB0aGlzLmh0bWxPdXRwdXQpO1x0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGxpc3QucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRpZiAodG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVEFCTEUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5odG1sT3V0cHV0KSB7XHRcblx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlSFRNTCh0b2tlbiwgdGhpcy5odG1sT3V0cHV0KTtcblx0XHRcdFx0XHRcdHRhYmxlLnJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgPT0gVG9rZW5UeXBlLlBBUkFHUkFQSCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmh0bWxPdXRwdXQpe1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gbmV3IFBhcmFncmFwaEhUTUwodG9rZW4sIHRoaXMuaHRtbE91dHB1dCk7XG5cdFx0XHRcdFx0XHR0aGlzLmh0bWxPdXRwdXQgPSBwYXJhZ3JhcGgucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSlcblx0XHR9XHRcblx0XHRcblx0XHRyZXR1cm4gdGhpcy5odG1sT3V0cHV0O1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSAnLi9Eb21VdGlsaXRlcydcblxuXG5leHBvcnQgY2xhc3MgQ2FwdGlvbkhUTUwge1xuXG5cdHByaXZhdGUgRG9tVXRpbGl0ZXM6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4uY2FwdGlvblRva2VuO1xuXHRwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKHRva2VuOiBUb2tlbi5jYXB0aW9uVG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6IHZvaWQge1xuXG5cdFx0bGV0IHRhZ3NCbG9jayA9IFwiXCI7XG5cdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS50YWdzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpLm1hcCgodGFnOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmICh0YWcubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0YWdzQmxvY2sgPSB0YWdzQmxvY2sgK1xuXHRcdFx0XHRcdCc8YSBocmVmPVwiIy90YWdzLycgKyB0YWcgKyAnXCIgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLW9yYW5nZS00MDAgIGhvdmVyOmJnLW9yYW5nZS01MDAgdXBwZXJjYXNlIGxhc3Q6bXItMCBtci0xXCI+JyArXG5cdFx0XHRcdFx0dGFnICtcblx0XHRcdFx0XHRcIjwvYT5cIlxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IGNhdGVnb3JpZXNCbG9jayA9IFwiXCI7XG5cdFx0aWYgKHRoaXMudG9rZW4uY2hpbGRyZW5bMF0uY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjYXRlZ29yaWVzQmxvY2sgPVxuXHRcdFx0XHQnPGEgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWdyYXktNDAwICBob3ZlcjpiZy1ncmF5LTUwMCB1cHBlcmNhc2UgbGFzdDptci0wIG1yLTFcIj4nICtcblx0XHRcdFx0dGhpcy50b2tlbi5jaGlsZHJlblswXS5jYXRlZ29yaWVzICtcblx0XHRcdFx0XCI8L2E+XCJcblx0XHR9XG5cblx0XHRjb25zdCBDYXB0aW9uQmxvY2sgPVxuXHRcdFx0YFx0XG5cdFx0XHRcdCAgPGltZyBzcmM9ICR7dGhpcy50b2tlbi5jaGlsZHJlblswXS50aHVtYm5haWx9IGNsYXNzPVwiZmxvYXQtbGVmdCBwLThcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0ZXh0LTN4bCBmb250LW5vcm1hbCBsZWFkaW5nLW5vcm1hbCBtdC0wIG1iLTIgdGV4dC1ncmF5LTYwMFwiPlxuXHRcdFx0XHRcdFx0XHQke3RoaXMudG9rZW4uY2hpbGRyZW5bMF0udGl0bGUuc2xpY2UoMiwgdGhpcy50b2tlbi5jaGlsZHJlblswXS50aXRsZS5sZW5ndGggLSAxKX08L2gzPlxuXHRcdFx0XHRcdFx0PHRpbWUgY2xhc3M9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgaW5saW5lLWJsb2NrIHB5LTEgcHgtMiB1cHBlcmNhc2Ugcm91bmRlZCB0ZXh0LXdoaXRlIGJnLWJsdWUtNDAwIHVwcGVyY2FzZSBsYXN0Om1yLTAgbXItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50b2tlbi5jaGlsZHJlblswXS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aW1lPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWctY29udGFpbmVyIHB5LTFcIj5cblx0XHRcdFx0XHRcdFx0JHt0YWdzQmxvY2t9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXRlZ29yaWVzLWNvbnRhaW5lciBweS0xXCI+XG5cdFx0XHRcdFx0XHRcdCR7Y2F0ZWdvcmllc0Jsb2NrfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdGA7XG5cblx0XHQvL2FkZCBjYXB0aW9uIHRvIGh0bWxPdXRwdXRcblx0XHRjb25zdCBjYXB0aW9uTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudCgncCcpXG5cdFx0Y2FwdGlvbk5vZGUuaW5uZXJIVE1MID0gQ2FwdGlvbkJsb2NrO1xuXHRcdHRoaXMuaHRtbE91dHB1dC5hcHBlbmRDaGlsZChjYXB0aW9uTm9kZSk7XG5cdFx0XG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgaWYgbGluZSBpcyBjb2RlIGJsb2NrXG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBhcyBjb2RlIGJsb2NrXG4gKi9cblxuXG5pbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSBcIi4vRG9tVXRpbGl0ZXNcIjtcbmltcG9ydCBcIi4uL3N0YXRpYy9zdHlsZXMvcHJpc20uY3NzXCJcblxuLy8gaW1wb3J0IHByaXNtanNcbmltcG9ydCAqIGFzIFByaXNtIGZyb20gJ3ByaXNtanMnO1xuXG5cblxuZXhwb3J0IGNsYXNzIENvZGVCbG9ja0hUTUwge1xuICBcblx0cHJpdmF0ZSBEb21VdGlsaXRlcyA6IGFueTtcblx0cHJpdmF0ZSB0b2tlbjogVG9rZW4uY29kZUJsb2NrVG9rZW47XG5cdHByaXZhdGUgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQ7XG5cdFxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogVG9rZW4uY29kZUJsb2NrVG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cbiAgcmVuZGVyICgpIDogdm9pZCB7XG5cblxuXHRjb25zdCBjb2RlQmxvY2sgOiBhbnkgPSBgXG5cdFx0XHQ8Y29kZSBjbGFzcz1cImxhbmd1YWdlLSR7dGhpcy50b2tlbi5sYW5ndWFnZX1cIj5cblx0XHQgXHRcdCR7dGhpcy50b2tlbi5jb2RlfVxuXHRcdFx0PC9jb2RlPmBcblx0XHRcblx0XHRjb25zdCBDb2RlQmxvY2tOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuXHRcdENvZGVCbG9ja05vZGUuY2xhc3NOYW1lID0gYGxhbmd1YWdlLSR7dGhpcy50b2tlbi5sYW5ndWFnZX1cImAgO1xuXG5cdFx0UHJpc20uaGlnaGxpZ2h0QWxsKGNvZGVCbG9jayk7XG5cblx0XHRDb2RlQmxvY2tOb2RlLmlubmVySFRNTCA9IGNvZGVCbG9jaztcblx0XHRcblx0XHRjb25zdCBhcHAgPSB0aGlzLmh0bWxPdXRwdXQ7XG5cdFx0Y29uc3QgZWxlbUNoaWxkcmVuID0gYXBwPy5jaGlsZHJlbjtcblx0XHRpZiAoZWxlbUNoaWxkcmVuKSB7XG5cdFx0XHRpZihlbGVtQ2hpbGRyZW4ubGVuZ3RoID4gMCl7XG5cdFx0XHRcdGFwcD8ubGFzdENoaWxkPy5hcHBlbmRDaGlsZChDb2RlQmxvY2tOb2RlKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRhcHAuYXBwZW5kQ2hpbGQoQ29kZUJsb2NrTm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIFJldHVybnMgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aCBkb20gZWxlbWVudHMgaW4gZG9jdW1lbnRcbiAqL1xuXG5leHBvcnQgY2xhc3MgRG9tVXRpbGl0ZXMge1xuXG4gIGdldExhc3ROb2RlICgpIDogQ2hpbGROb2RlIHwgbnVsbHtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSB0aGlzLmdldFJvb3QoKVxuICAgIHJldHVybiBsYXN0Q2hpbGQubGFzdENoaWxkXG4gIH1cblxuICBnZXRMYXN0Tm9kZU5hbWUgKCkgOiBzdHJpbmcge1xuICAgIGNvbnN0IGxhc3RDaGlsZCA9IHRoaXMuZ2V0Um9vdCgpXG4gICAgcmV0dXJuIGxhc3RDaGlsZC5sYXN0Q2hpbGQubm9kZU5hbWVcbiAgfVxuXG4gIGdldFJvb3QgKCkgOiBhbnkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhcnRpY2xlJylcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQgKGVsZW1lbnQgOiBzdHJpbmcpIDogSFRNTEVsZW1lbnQgeyAgICBcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgPGg+XG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBmb3IgaGVhZFR5cGUgPGg/Lz4gZm9yIGV4YW1wbGUgPGg/PiAuLi48aD8+XG4gKi9cblxuaW1wb3J0ICogYXMgVG9rZW4gZnJvbSBcIi4uL1Rva2VuXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJIVE1MIHtcblxuXHRwcml2YXRlIERvbVV0aWxpdGVzOiBhbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLmhlYWRUb2tlbjtcblx0cHJpdmF0ZSBodG1sT3V0cHV0OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3Rvcih0b2tlbjogVG9rZW4uaGVhZFRva2VuLCBodG1sT3V0cHV0OiBIVE1MRWxlbWVudCkge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLmh0bWxPdXRwdXQgPSBodG1sT3V0cHV0O1xuXHRcdHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcblx0fVxuXG5cdHJlbmRlcigpOiB2b2lkIHtcblxuXHRcdGNvbnN0IEhlYWRlck5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoJ2gnICsgdGhpcy50b2tlbi5kZXB0KVxuXG5cdFx0SGVhZGVyTm9kZS5jbGFzc05hbWUgPSBcInRleHQtXCIgKyB0aGlzLnRva2VuLmRlcHQgKyBcInhsIG10LTAgbWItMiB0ZXh0LWdyYXktODAwIHByLTEwIHB0LTEwIG5vLWluaGVyaXQtZm9udC1zaXplXCI7XG5cblx0XHRpZiAodGhpcy50b2tlbi5jaGlsZHJlblswXSkge1xuXG5cdFx0XHRIZWFkZXJOb2RlLmlubmVySFRNTCA9IHRoaXMudG9rZW4uY2hpbGRyZW5bMF0udmFsdWU7XG5cblx0XHRcdGNvbnN0IGFwcCA9IHRoaXMuaHRtbE91dHB1dDtcblx0XHRcdGNvbnN0IGVsZW1DaGlsZHJlbiA9IGFwcD8uY2hpbGRyZW5cblxuXHRcdFx0aWYgKGVsZW1DaGlsZHJlbikge1xuXHRcdFx0XHRpZiAoZWxlbUNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRhcHA/Lmxhc3RFbGVtZW50Q2hpbGQ/LmFwcGVuZENoaWxkKEhlYWRlck5vZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFwcC5hcHBlbmRDaGlsZChIZWFkZXJOb2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsImltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdEhUTUwge1xuICAgIHByaXZhdGUgRG9tVXRpbGl0ZXM6IERvbVV0aWxpdGVzO1xuICAgIHByaXZhdGUgdG9rZW46IFRva2VuLmxpc3RUb2tlbjtcbiAgICBwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IodG9rZW46IFRva2VuLmxpc3RUb2tlbiwgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgICAgICB0aGlzLmh0bWxPdXRwdXQgPSBodG1sT3V0cHV0O1xuICAgICAgICB0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaXN0SXRlbShpdGVtOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAnJztcbiAgICAgICAgaWYgKGl0ZW0uaW5jbHVkZXMoXCJbXVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJsaXN0LW5vbmUgbWwtNVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgYXBwZWFyYW5jZS1ub25lIGgtNCB3LTQgYm9yZGVyLXNvbGlkIGJvcmRlci1ncmF5LTIwMCBib3JkZXItc29saWQgYm9yZGVyLTIgcm91bmRlZC1zbSBkaXNhYmxlZDpiZy13aGl0ZSBkaXNhYmxlZDpib3JkZXItYmx1ZS02MDAgbXQtMSBhbGlnbi10b3AgYmctbm8tcmVwZWF0IGJnLWNlbnRlciBiZy1jb250YWluIGZsb2F0LWxlZnQgbXItMlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgaWQ9XCJmbGV4Q2hlY2tEaXNhYmxlZFwiIGRpc2FibGVkPlx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIGlubGluZS1ibG9jayB0ZXh0LWdyYXktODAwIG9wYWNpdHktMTAwXCIgZm9yPVwiZmxleENoZWNrRGlzYWJsZWRcIj4ke2l0ZW0ucmVwbGFjZShcIltdXCIsIFwiXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pbmNsdWRlcyhcIlt4XVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJsaXN0LW5vbmUgbWwtNVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgYXBwZWFyYW5jZS1ub25lIGgtNCB3LTQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLXNtIGJnLXdoaXRlIGNoZWNrZWQ6YmctYmx1ZS02MDAgY2hlY2tlZDpib3JkZXItYmx1ZS02MDAgZm9jdXM6b3V0bGluZS1ub25lIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIG10LTEgYWxpZ24tdG9wIGJnLW5vLXJlcGVhdCBiZy1jZW50ZXIgYmctY29udGFpbiBmbG9hdC1sZWZ0IG1yLTJcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIGlkPVwiZmxleENoZWNrQ2hlY2tlZERpc2FibGVkXCIgY2hlY2tlZCBkaXNhYmxlZD5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIGlubGluZS1ibG9jayB0ZXh0LWdyYXktODAwIG9wYWNpdHktMTAwXCIgZm9yPVwiZmxleENoZWNrQ2hlY2tlZERpc2FibGVkXCI+JHtpdGVtLnJlcGxhY2UoXCJbeF1cIiwgXCJcIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJsaXN0LW5vbmUgbWwtNSB0ZXh0LXNreS03MDBcIj4ke2l0ZW19PC9saT5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJsaXN0LW5vbmUgbWwtNVwiPiR7aXRlbX08L2xpPmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKTogRWxlbWVudCB8IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudG9rZW4udmFsdWU7XG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgICAgICBsZXQgbGlzdCA9IHZhbHVlLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICBsZXQgbGlzdEJsb2NrTm9kZSA9IHRoaXMuRG9tVXRpbGl0ZXMuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBsaXN0LnNoaWZ0KCk7XG5cbiAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGlzdEJsb2NrID0gYDxkaXYgY2xhc3M9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgPHA+JHt0aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY2hlY2tcIj4ke2xpc3QubWFwKHRoaXMuY3JlYXRlTGlzdEl0ZW0pLmpvaW4oXCJcIil9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgbGlzdEJsb2NrTm9kZS5pbm5lckhUTUwgPSBsaXN0QmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcHAgPSB0aGlzLmh0bWxPdXRwdXQ7XG4gICAgICAgIGFwcD8ubGFzdENoaWxkPy5hcHBlbmRDaGlsZChsaXN0QmxvY2tOb2RlKTtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmV0dXJucyBhbiBodG1sIGVsZW1lbnQgPGg+XG4gKiBAcGFyYW0gbGluZSBhcyBibG9jayBvZiB0aGUgdGV4dFxuICogQHJldHVybiBkb20gZWxlbWVudCBmb3IgaGVhZFR5cGUgPGg/Lz4gZm9yIGV4YW1wbGUgPGg/PiAuLi48aD8+XG4gKi9cblxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5pbXBvcnQgeyBEb21VdGlsaXRlcyB9IGZyb20gXCIuL0RvbVV0aWxpdGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXJhZ3JhcGhIVE1MIHtcblxuXHRwcml2YXRlIERvbVV0aWxpdGVzIDogYW55O1xuXHRwcml2YXRlIHRva2VuOiBhbnk7XG5cdHByaXZhdGUgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IodG9rZW46IGFueSwgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQpIHtcblx0XHR0aGlzLnRva2VuID0gdG9rZW47XG5cdFx0dGhpcy5odG1sT3V0cHV0ID0gaHRtbE91dHB1dDtcblx0XHR0aGlzLkRvbVV0aWxpdGVzID0gbmV3IERvbVV0aWxpdGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKTogYW55IHtcblxuXHRcdGNvbnN0IFBhcmFncmFwaE5vZGUgPSB0aGlzLkRvbVV0aWxpdGVzLmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG5cdFx0UGFyYWdyYXBoTm9kZS5jbGFzc05hbWUgPSBcImJsb2NrIGxlYWRpbmctNyBmb250LW1vbm8gbXQtMlwiO1xuXG5cdFx0bGV0IHRleHQgPSBcIlwiO1xuXHRcdFxuXHRcdHRoaXMudG9rZW4uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuVEVYVCkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgY2hpbGQudmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gVG9rZW5UeXBlLklNQUdFKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidy02LzEyIHNtOnctNC8xMiBweC00IHBiLTIwXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7Y2hpbGQudXJsfVwiIGFsdD1cIiR7Y2hpbGQuYWx0fVwiIGNsYXNzPVwic2hhZG93IHJvdW5kZWQgbWF4LXctZnVsbCBoLWF1dG8gYWxsaWduLW1pZGRsZSBib3JkZXItbm9uZVwiPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuTElOSykge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIGA8YSBocmVmPVwiJHtjaGlsZC51cmx9XCIgY2xhc3M9XCJ0ZXh0LWJsdWUtNTAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC5uYW1lfVxuXHRcdFx0XHRcdDxhLz5gXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5TVFJPTkcpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQgKyBcIiBcIiArIGBcblx0XHRcdFx0PHN0cm9uZz4ke2NoaWxkLnZhbHVlfTwvc3Ryb25nPlxuXHRcdFx0XHRgXG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5DT0RFX0lOTElORSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFxuXHRcdFx0XHQ8Y29kZSBjbGFzcz1cImlubGluZS1ibG9jayBweS0xIHB4LTIgYmctZ3JheS0zMDAgdGV4dC1ncmF5LTgwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctZ3JheS03MDAgZGFyazp0ZXh0LWdyYXktNDAwXCI+XG5cdFx0XHRcdFx0JHtjaGlsZC52YWx1ZS5zdWJzdHJpbmcoMSwgY2hpbGQudmFsdWUubGVuZ3RoIC0gMSl9XG5cdFx0XHRcdDwvY29kZT5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuQ09MT1IpIHtcblxuXHRcdFx0XHRsZXQgY29sb3JUZXh0OiBzdHJpbmd8dW5kZWZpbmVkO1xuXG5cdFx0XHRcdGlmKGNoaWxkLmNvbG9yID09IFwiYmx1ZVwiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi1ibHVlLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcImdyYXlcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tZ3JheS01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJyZWRcIil7XG5cdFx0XHRcdFx0Y29sb3JUZXh0ID0gJzxhIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tcmVkLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcImdyZWVuXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLWdyZWVuLTUwMCBtZDpkZWNvcmF0aW9uLXNvbGlkIGRlY29yYXRpb24tNFwiPicgKyBjaGlsZC52YWx1ZSArICc8L2E+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInllbGxvd1wiKXtcblx0XHRcdFx0XHRjb2xvclRleHQgPSAnPGEgY2xhc3M9XCJ1bmRlcmxpbmUgZGVjb3JhdGlvbi15ZWxsb3ctNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwicHVycGxlXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXB1cnBsZS01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwaW5rXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLXBpbmstNTAwIG1kOmRlY29yYXRpb24tc29saWQgZGVjb3JhdGlvbi00XCI+JyArIGNoaWxkLnZhbHVlICsgJzwvYT4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiaW5kaWdvXCIpe1xuXHRcdFx0XHRcdGNvbG9yVGV4dCA9ICc8YSBjbGFzcz1cInVuZGVybGluZSBkZWNvcmF0aW9uLWluZGlnby01MDAgbWQ6ZGVjb3JhdGlvbi1zb2xpZCBkZWNvcmF0aW9uLTRcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9hPidcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihjb2xvclRleHQpe1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBjb2xvclRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKGNoaWxkLnR5cGUgPT0gXCJCYWRnZVwiKSB7XG5cblx0XHRcdFx0bGV0IGNvbG9yQmFkZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZihjaGlsZC5jb2xvciA9PSBcImJsdWVcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLWJsdWUtMTAwIHRleHQtYmx1ZS04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctYmx1ZS0yMDAgZGFyazp0ZXh0LWJsdWUtODAwXCI+JyArIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiZ3JheVwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctZ3JheS0xMDAgdGV4dC1ncmF5LTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1ncmF5LTcwMCBkYXJrOnRleHQtZ3JheS0zMDBcIj4nICsgY2hpbGQudmFsdWUrICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcInJlZFwiKXtcblx0XHRcdFx0XHRjb2xvckJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmctcmVkLTEwMCB0ZXh0LXJlZC04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctcmVkLTIwMCBkYXJrOnRleHQtcmVkLTkwMFwiPicgKyBjaGlsZC52YWx1ZSArICc8L3NwYW4+J1xuXHRcdFx0XHR9ZWxzZSBpZihjaGlsZC5jb2xvciA9PSBcImdyZWVuXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi04MDAgdGV4dC1zbSBmb250LXNlbWlib2xkIG1yLTIgcHgtMi41IHB5LTAuNSByb3VuZGVkIGRhcms6YmctZ3JlZW4tMjAwIGRhcms6dGV4dC1ncmVlbi05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJ5ZWxsb3dcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLXllbGxvdy0xMDAgdGV4dC15ZWxsb3ctODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXllbGxvdy0yMDAgZGFyazp0ZXh0LXllbGxvdy05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwdXJwbGVcIil7XG5cdFx0XHRcdFx0Y29sb3JCYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXB1cnBsZS0yMDAgZGFyazp0ZXh0LXB1cnBsZS05MDBcIj4nICsgY2hpbGQudmFsdWUgKyAnPC9zcGFuPidcblx0XHRcdFx0fWVsc2UgaWYoY2hpbGQuY29sb3IgPT0gXCJwaW5rXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1waW5rLTEwMCB0ZXh0LXBpbmstODAwIHRleHQtc20gZm9udC1zZW1pYm9sZCBtci0yIHB4LTIuNSBweS0wLjUgcm91bmRlZCBkYXJrOmJnLXBpbmstMjAwIGRhcms6dGV4dC1waW5rLTkwMFwiPicrIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1lbHNlIGlmKGNoaWxkLmNvbG9yID09IFwiaW5kaWdvXCIpe1xuXHRcdFx0XHRcdGNvbG9yQmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiZy1pbmRpZ28tMTAwIHRleHQtaW5kaWdvLTgwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgbXItMiBweC0yLjUgcHktMC41IHJvdW5kZWQgZGFyazpiZy1pbmRpZ28tMjAwIGRhcms6dGV4dC1pbmRpZ28tOTAwXCI+JyArIGNoaWxkLnZhbHVlICsgJzwvc3Bhbj4nXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoY29sb3JCYWRnZSAhPSB1bmRlZmluZWQpe1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBjb2xvckJhZGdlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC50eXBlID09IFRva2VuVHlwZS5VTkRFUl9MSU5FKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0ICsgXCIgXCIgKyBgXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidW5kZXJsaW5lIGRlY29yYXRpb24tc2t5LTUwMCB0ZXh0LXNsYXRlLTUwMFwiPlxuXHRcdFx0XHRcdCR7Y2hpbGQudmFsdWV9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0YFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQudHlwZSA9PSBUb2tlblR5cGUuVU5NQVJLQUJMRSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IHVubWFya2FibGUgPSBjaGlsZC52YWx1ZTtcblx0XHRcdFx0Y29uc3QgdW5tYXJrYWJsZVRleHQgPSB1bm1hcmthYmxlLnN1YnN0cmluZygxLCB1bm1hcmthYmxlLmxlbmd0aCAtIDEpO1x0XHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHR0ZXh0ID0gdGV4dCArIFwiIFwiICsgYFx0XHRcdFx0XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LW9yYW5nZS05MDBcIj5cblx0XHRcdFx0XHQke3VubWFya2FibGVUZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdGBcdFx0XHRcdFxuXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdFBhcmFncmFwaE5vZGUuaW5uZXJIVE1MID0gdGV4dDtcblxuXHRcdC8vbGV0IGNvbnRhaW5lciA6IGFueTtcblx0XHRjb25zdCBhcHAgPSB0aGlzLmh0bWxPdXRwdXQ7XHRcdFxuXHRcdGlmKGFwcD8uY2hpbGRyZW4ubGVuZ3RoICE9IDApe1xuXHRcdFx0IGFwcD8ubGFzdENoaWxkPy5hcHBlbmRDaGlsZChQYXJhZ3JhcGhOb2RlKTtcblx0XHR9ZWxzZXtcblx0XHRcdCBhcHAuYXBwZW5kQ2hpbGQoUGFyYWdyYXBoTm9kZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaHRtbE91dHB1dDtcblx0fVxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBSZXR1cm5zIGFuIGh0bWwgZWxlbWVudCBpZiBsaW5lIGlzIGNvZGUgYmxvY2tcbiAqIEBwYXJhbSBsaW5lIGFzIGJsb2NrIG9mIHRoZSB0ZXh0XG4gKiBAcmV0dXJuIGRvbSBlbGVtZW50IGFzIGNvZGUgYmxvY2tcbiAqL1xuXG5cbmltcG9ydCAqIGFzIFRva2VuIGZyb20gXCIuLi9Ub2tlblwiO1xuaW1wb3J0IHsgRG9tVXRpbGl0ZXMgfSBmcm9tIFwiLi9Eb21VdGlsaXRlc1wiO1xuaW1wb3J0IFwiLi4vc3RhdGljL3N0eWxlcy9xdW90ZS5jc3NcIjtcblxuXG5leHBvcnQgY2xhc3MgUXVvdGVIVE1MIHtcblxuXHRwcml2YXRlIERvbVV0aWxpdGVzOiBhbnk7XG5cdHByaXZhdGUgdG9rZW46IFRva2VuLnF1b3RlVG9rZW47XG5cdHByaXZhdGUgaHRtbE91dHB1dDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IodG9rZW46IFRva2VuLnF1b3RlVG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy50b2tlbiA9IHRva2VuO1xuXHRcdHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG5cdFx0dGhpcy5Eb21VdGlsaXRlcyA9IG5ldyBEb21VdGlsaXRlcygpO1xuXHR9XG5cblx0cmVuZGVyKCk6IHZvaWQge1xuXG5cdFx0aWYgKHRoaXMudG9rZW4ucXVvdGUgJiYgdGhpcy50b2tlbi5hdXRob3IpIHtcblx0XHRcdGNvbnN0IHF1b3RlQmxvY2sgPSBgXHRcdFxuXHRcdDxkaXY+XG5cdFx0XHQ8cCBjbGFzc25hbWU9XCJtYi0yXCI+IFxuXHRcdFx0XHQke3RoaXMudG9rZW4ucXVvdGV9XG5cdFx0XHQ8L3A+XG5cdFx0XHQ8Y2l0ZT4gJHt0aGlzLnRva2VuLmF1dGhvcn0gPC9jaXRlPlxuXHRcdDwvZGl2PlxuXHRgXG5cblx0XHRcdGNvbnN0IHF1b3RlQmxvY2tOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwiYmxvY2txdW90ZVwiKTtcblx0XHRcdHF1b3RlQmxvY2tOb2RlLmlubmVySFRNTCA9IHF1b3RlQmxvY2s7XG5cblxuXHRcdFx0Y29uc3QgYXBwID0gdGhpcy5odG1sT3V0cHV0O1xuXHRcdFx0Y29uc3QgZWxlbUNoaWxkcmVuID0gYXBwPy5jaGlsZHJlbjtcblx0XHRcdGlmIChlbGVtQ2hpbGRyZW4pIHtcblx0XHRcdFx0aWYgKGVsZW1DaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0YXBwPy5sYXN0Q2hpbGQ/LmFwcGVuZENoaWxkKHF1b3RlQmxvY2tOb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcHAuYXBwZW5kQ2hpbGQocXVvdGVCbG9ja05vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbn0iLCJpbXBvcnQgKiBhcyBUb2tlbiBmcm9tIFwiLi4vVG9rZW5cIjtcbmltcG9ydCB7IERvbVV0aWxpdGVzIH0gZnJvbSBcIi4vRG9tVXRpbGl0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhYmxlSFRNTCB7XG4gICAgcHJpdmF0ZSBEb21VdGlsaXRlczogRG9tVXRpbGl0ZXM7XG4gICAgcHJpdmF0ZSB0b2tlbjogVG9rZW4udGFibGVUb2tlbjtcbiAgICBwcml2YXRlIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IodG9rZW46IFRva2VuLnRhYmxlVG9rZW4sIGh0bWxPdXRwdXQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcdFx0XG4gICAgICAgIHRoaXMuaHRtbE91dHB1dCA9IGh0bWxPdXRwdXQ7XG4gICAgICAgIHRoaXMuRG9tVXRpbGl0ZXMgPSBuZXcgRG9tVXRpbGl0ZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRhYmxlSGVhZChoZWFkQXJyYXk6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHRhYmxlSGVhZCA9IFwiPHRoZWFkPjx0cj5cIjtcbiAgICAgICAgaGVhZEFycmF5LmZvckVhY2goaGVhZCA9PiB7XG4gICAgICAgICAgICB0YWJsZUhlYWQgKz0gYDx0aCBjbGFzcz1cImJnLWJsdWUtMTAwIGJvcmRlciB0ZXh0LWxlZnQgcHgtOCBweS00XCI+JHtoZWFkfTwvdGg+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YWJsZUhlYWQgKyAnPC90cj48L3RoZWFkPic7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUYWJsZUJvZHkoYm9keUFycmF5OiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCB0YWJsZUJvZHkgPSBcIjx0cj5cIjtcbiAgICAgICAgYm9keUFycmF5LmZvckVhY2goYm9keSA9PiB7XG4gICAgICAgICAgICB0YWJsZUJvZHkgKz0gYDx0ZCBjbGFzcz1cImJvcmRlciBweC04IHB5LTRcIj4ke2JvZHl9PC90ZD5gO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhYmxlQm9keSArICc8L3RyPic7XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMudG9rZW4uY2hpbGRyZW47XG4gICAgICAgIGxldCB0YWJsZSA9ICcnO1xuICAgICAgICBsZXQgdGFibGVOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gICAgICAgIHRhYmxlTm9kZS5jbGFzc05hbWUgPSBcInNoYWRvdy1sZyBiZy13aGl0ZSBtYi00XCI7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvd0FycmF5ID0gY2hpbGRyZW5baV0udmFsdWUuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgcm93QXJyYXkucG9wKCk7XG4gICAgICAgICAgICByb3dBcnJheS5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGFibGUgKz0gdGhpcy5jcmVhdGVUYWJsZUhlYWQocm93QXJyYXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJsZSArPSB0aGlzLmNyZWF0ZVRhYmxlQm9keShyb3dBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZU5vZGUuaW5uZXJIVE1MID0gYDx0Ym9keT4ke3RhYmxlfTwvdGJvZHk+YDtcblxuICAgICAgICBjb25zdCBwYXJhZ3JhcGhOb2RlID0gdGhpcy5Eb21VdGlsaXRlcy5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcGFyYWdyYXBoTm9kZS5hcHBlbmRDaGlsZCh0YWJsZU5vZGUpO1xuXG4gICAgICAgIGNvbnN0IGFwcCA9IHRoaXMuaHRtbE91dHB1dDtcbiAgICAgICAgYXBwPy5sYXN0Q2hpbGQ/LmFwcGVuZENoaWxkKHBhcmFncmFwaE5vZGUpO1xuICAgIH1cbn0iLCIvKipcbiAqIEF1dGhvcjogbWV1Z2Vub20uY29tXG4gKiBEYXRlOiAxMy4xMi4yMDIzXG4gKiBSZWZhY3RvcmVkOiAxOS4wMy4yMDIzXG4gKiBFbnRyeSBwb2ludCBvZiB0aGUgYXBwbGljYXRpb25cbiAqXG4gKiBtYXJrZG93biBjb21waWxlciBBU0NJSSBhcnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgXHRfICAgICAgIF9cbiAqICAgICAgICAgXyBfXyBfX18gIOKAmiBfXyBfIF8gX198IHwgX19fX3wgfCBfX19fXyAgICAgIF9fXyBfX1xuICogICAgICAgIHwgJ18gYCBfIFxcIC8gX2AgfCAnX198IHwvIC8gX2AgfC8gXyBcXCBcXCAvXFwgLyAvICdfIFxcXG4gKiAgICAgICAgfCB8IHwgfCB8IHwgKF98IHwgfCAgfCAgIDwgKF98IHwgKF8pIFxcIFYgIFYgL3wgfCB8IHxcbiAqICAgICAgICB8X3wgfF98IHxffFxcX18sX3xffCAgfF98XFxfXFxfXyxffFxcX19fLyBcXF8vXFxfLyB8X3wgfF98XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfIF9cbiAqICAgICAgICAgICAgICAgICBfX18gX19fICBfIF9fIF9fXyAgXyBfXyAoXykgfCBfX18gXyBfX1xuICogICAgICAgICAgICAgICAgLyBfXy8gXyBcXHwgJ18gYCBfIFxcfCAnXyBcXHwgfCB8LyBfIFxcICdfX3xcbiAqICAgICAgICAgICAgICAgfCAoX3wgKF8pIHwgfCB8IHwgfCB8IHxfKSB8IHwgfCAgX18vIHxcbiAqICAgICAgICAgICAgICAgIFxcX19fXFxfX18vfF98IHxffCB8X3wgLl9fL3xffF98XFxfX198X3xcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8X3xcbiAqL1xuXG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IFBhcnNlciB9IGZyb20gXCIuL1BhcnNlclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcbmltcG9ydCBcIi4vc3RhdGljL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IGV4YW1wbGUgZnJvbSAncmF3LWxvYWRlciEuL2NvbnRlbnQvYXJ0aWNsZXMvaG93LXRvLXdyaXRlLXRleHQubWQnO1xuXG5cbi8vY3JlYXRlIGEgZG9jdW1lbnQgd2l0aCBhIGRpdiB3aXRoIGlkIGFwcFxuY29uc3QgaHRtbE91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuaHRtbE91dHB1dC5pZCA9IFwiYXBwXCI7XG5cblxuZnVuY3Rpb24gY29udmVydE1EdG9IVE1MKHRleHQ6IGFueSl7XG4gICAgbGV0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIodGV4dCk7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih0b2tlbml6ZXIudG9rZW5zKTtcbiAgICBjb25zb2xlLmxvZyhwYXJzZXIuYXN0KVxuICAgIGNvbnN0IG91dHB1dCA6IGFueSA9IG5ldyBWaWV3KHBhcnNlci5hc3QsIGh0bWxPdXRwdXQpLmluaXQoKTtcbiAgICBjb25zb2xlLmxvZyhvdXRwdXQpXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG4vL0FQSSB0byBjb252ZXJ0IG1hcmtkb3duIHRvIEFTVFxuZnVuY3Rpb24gY29udmVydE1EdG9BU1QodGV4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIodGV4dCk7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih0b2tlbml6ZXIudG9rZW5zKTtcbiAgICByZXR1cm4gcGFyc2VyLmFzdDtcbn1cblxuLy9BUEkgdG8gY29udmVydCBtYXJrZG93biB0byB0b2tlbnNcbmZ1bmN0aW9uIGNvbnZlcnRNRHRvVG9rZW5zKHRleHQ6IHN0cmluZykge1xuICAgIGxldCB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHRleHQpO1xuICAgIHJldHVybiB0b2tlbml6ZXIudG9rZW5zO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29udmVydE1EdG9IVE1MLFxuICAgIGNvbnZlcnRNRHRvQVNULFxuICAgIGNvbnZlcnRNRHRvVG9rZW5zXG4gIH07XG4gIFxuXG4vL3Nob3cgZXhhbXBsZVxuZnVuY3Rpb24gc2hvd0V4YW1wbGUoKXsgICAgXG4gICAgLy8gcmVuZGVyIHRoZSBodG1sIG5vZGUgdG8gdGhlIERPTVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykgIT0gbnVsbCAmJiBleGFtcGxlICE9IHVuZGVmaW5lZCl7ICAgIFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpPy5hcHBlbmRDaGlsZChjb252ZXJ0TUR0b0hUTUwoZXhhbXBsZSkpO1xuICAgIH1cbn1cblxuXG4vL3J1biB0aGUgZXhhbXBsZVxuc2hvd0V4YW1wbGUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTklMXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9uaWwuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcGFyc2UuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFsaWRhdGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZhbGlkYXRlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmVyc2lvblwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdmVyc2lvbi5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MS5qc1wiKSk7XG5cbnZhciBfdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzLmpzXCIpKTtcblxudmFyIF92MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjQuanNcIikpO1xuXG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG5cbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIikpO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8qXG4gKiBCcm93c2VyLWNvbXBhdGlibGUgSmF2YVNjcmlwdCBNRDVcbiAqXG4gKiBNb2RpZmljYXRpb24gb2YgSmF2YVNjcmlwdCBNRDVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cbmZ1bmN0aW9uIG1kNShieXRlcykge1xuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlc1tpXSA9IG1zZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZDVUb0hleEVuY29kZWRBcnJheSh3b3Jkc1RvTWQ1KGJ5dGVzVG9Xb3JkcyhieXRlcyksIGJ5dGVzLmxlbmd0aCAqIDgpKTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYW4gYXJyYXkgb2YgYnl0ZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuICBjb25zdCBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyO1xuICBjb25zdCBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgY29uc3QgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgY29uc3QgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldE91dHB1dExlbmd0aChpbnB1dExlbmd0aDgpIHtcbiAgcmV0dXJuIChpbnB1dExlbmd0aDggKyA2NCA+Pj4gOSA8PCA0KSArIDE0ICsgMTtcbn1cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICovXG5cblxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICBsZXQgYSA9IDE3MzI1ODQxOTM7XG4gIGxldCBiID0gLTI3MTczMzg3OTtcbiAgbGV0IGMgPSAtMTczMjU4NDE5NDtcbiAgbGV0IGQgPSAyNzE3MzM4Nzg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgIGNvbnN0IG9sZGEgPSBhO1xuICAgIGNvbnN0IG9sZGIgPSBiO1xuICAgIGNvbnN0IG9sZGMgPSBjO1xuICAgIGNvbnN0IG9sZGQgPSBkO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICBhID0gc2FmZUFkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZUFkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZUFkZChkLCBvbGRkKTtcbiAgfVxuXG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBieXRlcyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJ5dGVzVG9Xb3JkcyhpbnB1dCkge1xuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgobGVuZ3RoOCkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0W2kgLyA4XSAmIDB4ZmYpIDw8IGkgJSAzMjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHNhZmVBZGQoeCwgeSkge1xuICBjb25zdCBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZik7XG4gIGNvbnN0IG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBtZDU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgbGV0IHY7XG4gIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG52YXIgX2RlZmF1bHQgPSBwYXJzZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0gL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBybmc7XG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgY29uc3QgSyA9IFsweDVhODI3OTk5LCAweDZlZDllYmExLCAweDhmMWJiY2RjLCAweGNhNjJjMWQ2XTtcbiAgY29uc3QgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICBjb25zdCBsID0gYnl0ZXMubGVuZ3RoIC8gNCArIDI7XG4gIGNvbnN0IE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgY29uc3QgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgIGFycltqXSA9IGJ5dGVzW2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tpICogNjQgKyBqICogNCArIDJdIDw8IDggfCBieXRlc1tpICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1baV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgKytpKSB7XG4gICAgY29uc3QgVyA9IG5ldyBVaW50MzJBcnJheSg4MCk7XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDE2OyArK3QpIHtcbiAgICAgIFdbdF0gPSBNW2ldW3RdO1xuICAgIH1cblxuICAgIGZvciAobGV0IHQgPSAxNjsgdCA8IDgwOyArK3QpIHtcbiAgICAgIFdbdF0gPSBST1RMKFdbdCAtIDNdIF4gV1t0IC0gOF0gXiBXW3QgLSAxNF0gXiBXW3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIGxldCBhID0gSFswXTtcbiAgICBsZXQgYiA9IEhbMV07XG4gICAgbGV0IGMgPSBIWzJdO1xuICAgIGxldCBkID0gSFszXTtcbiAgICBsZXQgZSA9IEhbNF07XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDgwOyArK3QpIHtcbiAgICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKHQgLyAyMCk7XG4gICAgICBjb25zdCBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbdF0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxudmFyIF9kZWZhdWx0ID0gc2hhMTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy51bnNhZmVTdHJpbmdpZnkgPSB1bnNhZmVTdHJpbmdpZnk7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbnZhciBfZGVmYXVsdCA9IHN0cmluZ2lmeTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcbmxldCBfbm9kZUlkO1xuXG5sZXQgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG5sZXQgX2xhc3RNU2VjcyA9IDA7XG5sZXQgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGxldCBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICBjb25zdCBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsZXQgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBsZXQgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICBjb25zdCBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgbGV0IG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICBsZXQgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICBjb25zdCBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIGNvbnN0IHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShiKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdjE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2MyA9ICgwLCBfdi5kZWZhdWx0KSgndjMnLCAweDMwLCBfbWQuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2MztcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIGNvbnN0IGJ5dGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuY29uc3QgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLkROUyA9IEROUztcbmNvbnN0IFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5VUkwgPSBVUkw7XG5cbmZ1bmN0aW9uIHYzNShuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgX25hbWVzcGFjZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHN0cmluZ1RvQnl0ZXModmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmICgoKF9uYW1lc3BhY2UgPSBuYW1lc3BhY2UpID09PSBudWxsIHx8IF9uYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9uYW1lc3BhY2UubGVuZ3RoKSAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX25hdGl2ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbmF0aXZlLmpzXCIpKTtcblxudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAoX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBfbmF0aXZlLmRlZmF1bHQucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkocm5kcyk7XG59XG5cbnZhciBfZGVmYXVsdCA9IHY0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2NSA9ICgwLCBfdi5kZWZhdWx0KSgndjUnLCAweDUwLCBfc2hhLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9yZWdleCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcmVnZXguanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmFsaWRhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2ZXJzaW9uKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxNSksIDE2KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmVyc2lvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=