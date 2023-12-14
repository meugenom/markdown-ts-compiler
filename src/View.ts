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
	public htmlOutput : HTMLElement | null;

	constructor(ast : AST, htmlOutput : HTMLElement | null) {
		this.ast = ast
		this.htmlOutput = htmlOutput;
	}

	init() {

		const children  = this.ast.children;

		if(children) {
			children.forEach((token) => {
				if (token.type == TokenType.CAPTION) {
					if (this.htmlOutput) {
						const caption = new CaptionHTML(token, this.htmlOutput);
						caption.render();				
					}
				}

				if (token.type == TokenType.HEADING) {
					if (this.htmlOutput) {
						const header = new HeaderHTML(token, this.htmlOutput);
						header.render();
					}				
				}
	
				if (token.type == TokenType.CODE_BLOCK || token.type == TokenType.CODE_IN_CODE) {
					if (this.htmlOutput) {
						const codeblock = new CodeBlockHTML(token, this.htmlOutput);
						codeblock.render();
					}
				}
	
				if (token.type == TokenType.QUOTE) {
					if (this.htmlOutput) {
						const quote = new QuoteHTML(token, this.htmlOutput);
						quote.render();
					}
				}
	
				if (token.type == TokenType.LIST) {	
					if (this.htmlOutput) {				
						const list = new ListHTML(token, this.htmlOutput);					
						list.render();
					}
				}
	
				if (token.type == TokenType.TABLE) {
					if (this.htmlOutput) {	
						const table = new TableHTML(token, this.htmlOutput);
						table.render();
					}
				}
	
				if (token.type == TokenType.PARAGRAPH) {
					if (this.htmlOutput){
						const paragraph = new ParagraphHTML(token, this.htmlOutput);
						this.htmlOutput = paragraph.render();
					}
				}
				
			})
		}	
		
		return this.htmlOutput;
	}
}