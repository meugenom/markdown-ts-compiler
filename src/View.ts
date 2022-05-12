import { CaptionHTML } from "./htmlblocks/CaptionHTML"
import { IToken } from "./IToken";
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import {ParagraphHTML} from "./htmlblocks/ParagraphHTML"
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import {QuoteHTML} from "./htmlblocks/QuoteHTML";
import {ListHTML} from "./htmlblocks/ListHTML";


type AST = {
	type: string,
	children?: any[]
}


export class View {

	private ast : AST;

	constructor(ast : AST) {
		this.ast = ast
		this.init();
	}

	init() {

		//console.log(ast);

		const children  = this.ast.children;

		children.forEach((token: IToken) => {

			
			if (token.type == "Caption") {

				const caption = new CaptionHTML(token);
				caption.render();
			}

			if (token.type == "Header") {
				const header = new HeaderHTML(token);
				header.render();
			}

			if (token.type == "CodeBlock" || token.type == "Code") {
				const codeblock = new CodeBlockHTML(token);
				codeblock.render();
			}

			if (token.type == "Quote") {
				const quote = new QuoteHTML(token);
				quote.render();
			}

			if (token.type == "List") {
				const list = new ListHTML(token);
				list.render();
			}

			if (token.type == "Paragraph") {
				const paragraph = new ParagraphHTML(token);
				paragraph.render();
			}

		})
	}
}