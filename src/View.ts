import { CaptionHTML } from "./htmlblocks/CaptionHTML"
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import {ParagraphHTML} from "./htmlblocks/ParagraphHTML"
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import {QuoteHTML} from "./htmlblocks/QuoteHTML";
import {ListHTML} from "./htmlblocks/ListHTML";
import { TableHTML } from "./htmlblocks/TableHTML";
import { TokenType } from "./Types";


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

		const children  = this.ast.children;

		children.forEach((token) => {

			if (token.type == TokenType.CAPTION) {

				const caption = new CaptionHTML(token);
				caption.render();
			}

			
			if (token.type == TokenType.HEADING) {
				const header = new HeaderHTML(token);
				header.render();
			}

			if (token.type == TokenType.CODE_BLOCK || token.type == TokenType.CODE_IN_CODE) {
				const codeblock = new CodeBlockHTML(token);
				codeblock.render();
			}

			if (token.type == TokenType.QUOTE) {
				const quote = new QuoteHTML(token);
				quote.render();
			}

			if (token.type == TokenType.LIST) {
				const list = new ListHTML(token);
				list.render();
			}

			if (token.type == TokenType.TABLE) {
				const table = new TableHTML(token);
				table.render();
			}

			if (token.type == TokenType.PARAGRAPH) {
				const paragraph = new ParagraphHTML(token);
				paragraph.render();
			}
			
		})
	}
}