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


import { Tokenizer } from "./Tokenizer";
import { Parser } from "./Parser";
import { View } from "./View";
import "./static/styles/style.css";

import Text from 'raw-loader!../content/articles/how-to-write-text.md';


//put text into the textarea
const textarea: HTMLElement = document.getElementById("textarea");

//console.log(textarea)
textarea.innerHTML = Text;


const convertBtn = document.getElementById('btn-convert');
const defaultBtn = document.getElementById('btn-default');

convertBtn.classList = "bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded";
defaultBtn.classList = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded";

defaultBtn.addEventListener('click', function handleClick() {

	textarea.value = "";
	app.innerHTML = "";
	textarea.value = Text;

	const tokenizer = new Tokenizer(Text);
	const parser = new Parser(tokenizer.tokens);
	new View(parser.ast);

});

convertBtn.addEventListener('click', function handleClick() {

	//clear old 
	let app = document.getElementById("app");
	app.innerHTML = "";

	const tokenizer = new Tokenizer(textarea.value);
	const parser = new Parser(tokenizer.tokens);
	new View(parser.ast);

});

const tokenizer = new Tokenizer(Text);
//console.log(tokenizer.tokens)
const parser = new Parser(tokenizer.tokens);
//console.log(parser.ast)
new View(parser.ast);


	//let newAst = transformer(ast);
	//let output = codeGenerator(newAst);

