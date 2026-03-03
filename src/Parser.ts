import * as Token from "./Token";
import { TokenType } from "./Types";

type AST = {
	type: string,
	children?: any[]
}

export class Parser {

	public tokens =  [] as (Token.bagdeToken | 
					Token.captionToken | 
					Token.codeBlockToken |
					Token.codeInlineToken | 
					Token.colorTextToken | 
					Token.headToken | 
					Token.imageToken |
					Token.linkToken | 
					Token.listToken | 
					Token.paragraphEndToken | 
					Token.paragraphStartToken |
					Token.quoteToken | 
					Token.strongTextToken | 
					Token.textToken | 
					Token.underLineToken |
					Token.unknownTextToken | 
					Token.codeInCodeToken | 
					Token.tableToken |
					Token.formulaBlockToken |
					Token.formulaInlineToken
				)[];
	
	public ast: AST;

	constructor(tokens : any) {

		this.tokens = tokens;
		this.ast = {
			type: "Document",
			children: []
		};
		this.init();
	}

	init():void {

		let token_number: number;
		token_number = 0;
		let isParagraph: boolean;
		isParagraph = false;
		
		const children : any = this.ast.children;

		while (token_number < this.tokens.length) {

			const token : any = this.tokens[token_number];
			//console.log(token)

			// Caption
			if (token.type === TokenType.CAPTION) {				
				const captionElement =  {} as Token.captionToken;
				captionElement.type = TokenType.CAPTION; 
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
			
			// # dept=1
			if (token.type === TokenType.HEADING_FIRST) {
				const headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 1;
				headElement.row = "#" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				children.push(headElement);
			}

			// ## dept = 2
			if (token.type === TokenType.HEADING_SECOND) {
				const headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 2;
				headElement.row = "##" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				children.push(headElement);
			}

			// ### dept = 3
			if (token.type === TokenType.HEADING_THIRD) {

				const headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 3;
				headElement.row = "###" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]				
				children.push(headElement);			
			}

			// #### dept = 4
			if (token.type === TokenType.HEADING_FORTH) {
				const headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 4;
				headElement.row = "####" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				children.push(headElement);
			}

			// ##### dept = 5
			if (token.type === TokenType.HEADING_FIFTH) {
				const headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 5;
				headElement.row = "#####" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				children.push(headElement);
			}

			

			//CodeInCode
			if (token.type == TokenType.CODE_IN_CODE) {

				const codeInCodeElement =  {} as Token.codeInCodeToken;
				codeInCodeElement.type = TokenType.CODE_IN_CODE;
				codeInCodeElement.row = "```"+token.language + "\n" + token.code + "\n```";

				codeInCodeElement.code = token.code;
				codeInCodeElement.language = token.language		
				children.push(codeInCodeElement);
			}

			//CodeBlock
			if (token.type == TokenType.CODE_BLOCK) {

				const codeBlockElement =  {} as Token.codeBlockToken;
				codeBlockElement.type = TokenType.CODE_BLOCK;
				codeBlockElement.row = "```"+token.language + "\n" + token.code + "\n```";
				codeBlockElement.code = token.code;
				codeBlockElement.language = token.language
				
				children.push(codeBlockElement);
				}

			// FormulaBlock
			if (token.type === TokenType.FORMULA_BLOCK) {
				const formulaElement = {} as Token.formulaBlockToken;
				formulaElement.type = TokenType.FORMULA_BLOCK;
				formulaElement.formula = (token as any).formula;
				children.push(formulaElement);
			}
			

			//Quote
			if (token.type == TokenType.QUOTE) {

				const quoteElement =  {} as Token.quoteToken;
				quoteElement.type = TokenType.QUOTE;
				quoteElement.row = ">" + token.quote + "\n> <cite> - " + token.author + "</cite>";
				quoteElement.quote = token.quote;
				quoteElement.author = token.author;
				
				children.push(quoteElement);
			}

			//List
			if (token.type == TokenType.LIST) {
				const listElement =  {} as Token.listToken;
				listElement.type = TokenType.LIST;
				listElement.attribute = token.attribute;
				listElement.row = token.attribute + " "+token.value;
				listElement.value = token.value; 
				
				children.push(listElement)
			}

			//Table
			if (token.type == TokenType.TABLE) {
				const tableElement =  {} as Token.tableToken;
				tableElement.type = TokenType.TABLE;
				tableElement.row = token.row;
				tableElement.children = token.children;

				children.push(tableElement)
			}


			//Start all that in the paragraph can use
			if (token.type == TokenType.PARAGRAPH_START) {
				const paragraphStartElement = {} as Token.paragraphStartToken;
				paragraphStartElement.type = TokenType.PARAGRAPH;
				paragraphStartElement.children = [];
				paragraphStartElement.row = "";
				
				children.push(paragraphStartElement);
				isParagraph = true;
			}

			if (token.type == TokenType.PARAGRAPH_END) {
				isParagraph = false;
			}

			//Link
			if (token.type == TokenType.LINK) {
				const linkElement = {} as Token.linkToken;
				linkElement.type = TokenType.LINK;
				linkElement.name = token.name;
				linkElement.url = token.url;
				linkElement.row = "[" + token.name + "](" + token.url + ")"
				if(isParagraph == true){
					children[(children).length - 1].children.push(linkElement)
				children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.name + "](" + token.url + ")"
				} else {
					children.push(linkElement)
				}	
			}

			//Image
			if (token.type == "Image" && isParagraph == true) {
				const imageToken = {} as Token.imageToken;
				imageToken.type = TokenType.IMAGE;
				imageToken.alt = token.alt;
				imageToken.url = token.url;
				imageToken.row = "![" + token.alt + "](" + token.url + ")"
				
				if(isParagraph == true) {
					children[children.length - 1].children.push(imageToken)
					children[(children).length - 1].row = children[(children).length - 1].row + "[" + token.alt + "](" + token.url + ")"
				} else {
					children.push(imageToken)
				}
			}

			// Text
			if (token.type == TokenType.TEXT) {
				const textToken = {} as Token.textToken;
				textToken.type = TokenType.TEXT;
				textToken.value = token.value;
				textToken.row = token.value

				if(isParagraph == true){
					children[(children).length - 1].children.push(textToken)
				children[(children).length - 1].row = children[(children).length - 1].row + token.value
				}else {
					children.push(textToken)
				}
				
			}

			// Unmarkable
			if (token.type == TokenType.UNMARKABLE) {
				//console.log(token)
				const unmarkableTextToken = {} as Token.unmarkableToken;
				unmarkableTextToken.type = TokenType.UNMARKABLE;
				unmarkableTextToken.value = token.value;
				unmarkableTextToken.row = "\\" + token.value + "\\";
				
				if(isParagraph == true){
					children[(children).length - 1].children.push(unmarkableTextToken)
					children[(children).length - 1].row = children[(children).length - 1].row + token.value
				} else {
					children.push(unmarkableTextToken)
				}
				
			}

	
			// Strong
			if (token.type == TokenType.STRONG) {
				const strongTextToken = {} as Token.strongTextToken
				strongTextToken.type = TokenType.STRONG;
				strongTextToken.value = token.value;
				strongTextToken.row = "**" + token.value + "**"
				
				if(isParagraph == true){
					children[(children).length - 1].children.push(strongTextToken)
					children[(children).length - 1].row = children[(children).length - 1].row + token.value
				} else {
					children.push(strongTextToken)
				}
			}	

			// Color text
			if (token.type == "Color") {

				const colorTextToken = {} as Token.colorTextToken;
				colorTextToken.type = TokenType.COLOR;
				colorTextToken.color = token.color;
				colorTextToken.value = token.value;
				colorTextToken.row = token.value + "." + token.color;
				
				if(isParagraph == true){
					children[(children).length - 1].children.push(colorTextToken)
				children[(children).length - 1].row = children[(children).length - 1].row + token.value +"."+token.color 
				} else {
					children.push(colorTextToken)
				}
				

			}

			// Color badge
			if (token.type == "Badge") {

				const badgeToken = {} as Token.bagdeToken;
				badgeToken.type = TokenType.BADGE;
				badgeToken.color = token.color;
				badgeToken.value = token.value;
				badgeToken.row = token.value + "@" + token.color;
				
				if(isParagraph == true){
					children[(children).length - 1].children.push(badgeToken)
				children[(children).length - 1].row = children[(children).length - 1].row + token.value +"@"+token.color 
				} else {
					children.push(badgeToken)
				}
				
			}

			// InlineCode
			if (token.type == TokenType.CODE_INLINE) {
				//console.log(token)
				const inlineCodeElement = {} as Token.codeInlineToken;
				inlineCodeElement.type = TokenType.CODE_INLINE;
				inlineCodeElement.value = token.value;
				inlineCodeElement.row = token.value;
				
				if(isParagraph == true){
					children[(children).length - 1].children.push(inlineCodeElement)
					children[(children).length - 1].row = children[(children).length - 1].row + token.value
				}else {
					children.push(inlineCodeElement);
				}
			}

			// FormulaInline
			if (token.type === TokenType.FORMULA_INLINE) {
				const formulaInlineElement = {} as Token.formulaInlineToken;
				formulaInlineElement.type = TokenType.FORMULA_INLINE;
				formulaInlineElement.formula = (token as any).formula;
				formulaInlineElement.row = '$' + (token as any).formula + '$';
				if (isParagraph === true) {
					children[(children).length - 1].children.push(formulaInlineElement);
					children[(children).length - 1].row += formulaInlineElement.row;
				} else {
					children.push(formulaInlineElement);
				}
			}

			// UnderLine
			if (token.type == TokenType.UNDER_LINE) {
				const underLineElement = {} as Token.underLineToken;
				underLineElement.type =  TokenType.UNDER_LINE;
				underLineElement.value =  token.value;
				if(isParagraph == true){
					children[(children).length - 1].children.push(underLineElement)
					children[(children).length - 1].row = children[(children).length - 1].row + token.value
				}else{
					children.push(underLineElement)
				}	
			}

			//console.log("token number", token_number)
			//console.log(children)

			token_number++;

		}


	}
}