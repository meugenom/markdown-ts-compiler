/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023
 *
 * ASCII art:
 *                          	_       _
 *         _ __ ___   __ _ _ __| | ____| | _____      ___ __
 *        | '_ ` _ \ / _` | '__| |/ / _` |/ _ \ \ /\ / / '_ \
 *        | | | | | | (_| | |  |   < (_| | (_) \ V  V /| | | |
 *        |_| |_| |_|\__,_|_|  |_|\_\__,_|\___/ \_/\_/ |_| |_|
 *
 *                                          _ _
 *                 ___ ___  _ __ ___  _ __ (_) | ___ _ __
 *                / __/ _ \| '_ ` _ \| '_ \| | |/ _ \ '__|
 *               | (_| (_) | | | | | | |_) | | |  __/ |
 *                \___\___/|_| |_| |_| .__/|_|_|\___|_|
 *                                   |_|
 */

import { Tokenizer } from "./Tokenizer";
import { Parser } from "./Parser";
import { View } from "./View";
import "./static/styles/style.css";
import Article from 'raw-loader!../content/articles/how-to-write-text.md';


const editor = document.getElementById("editor");
const leftSide = document.getElementById('left_side');
const rightSide = document.getElementById('right_side');

const articleLines = Article.split('\n');

articleLines.forEach((line, index) => {
	setTimeout(() => {
		editor.innerHTML += line + '<br>';
		handleEditorInput();

		//set cursor to end of editor
		let range = document.createRange()
		let sel = window.getSelection()

		let numberOfNodes = editor?.childNodes.length
		range.setStart(editor.childNodes[numberOfNodes - 2], 0)

		range.collapse(true)
		sel.removeAllRanges()
		sel.addRange(range)

		//scroll to bottom of editor
		leftSide.scrollTop = editor.scrollHeight;

	}, 1000 * index);
});

// add event listener for input changes in the editor
editor?.addEventListener('input', handleEditorInput);

function handleEditorInput() {
	// clear the app div
	const app = document.getElementById('app');
	app.innerHTML = '';

	// get the text from the editor
	const text = editor?.innerHTML;
	//console.log(text)

	// clean the text to remove HTML tags and newlines
	const cleanedText = cleanText(text);

	// tokenize the cleaned text
	const tokenizer = new Tokenizer(cleanedText);

	// parse the tokens into an abstract syntax tree
	const parser = new Parser(tokenizer.tokens);

	// render the AST as HTML
	new View(parser.ast);

	console.log(parser.ast)

	//scroll to bottom of app part
	rightSide.scrollTop = app?.scrollHeight;


}

// function to clean the text by removing HTML tags and newlines
function cleanText(text: string | null) {
	return text?.replace(/<\/?[a-z][^>]*>|[\n\r]/gi, function (match) {
		if (match === '\n' || match === '</div>') {
			return '\n';
		} else if (match === '<br>') {
			return '\n';
		} else {
			return '';
		}
	});
}



