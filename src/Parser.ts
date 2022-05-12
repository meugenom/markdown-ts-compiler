import { IToken } from "./IToken";


type AST = {
	type: string,
	children?: any[]
}

type element = {
	type: string,
	depth?: number,
	value?: string,
	body?: string,
	url?: string,
	alt?: string,
	children?: any[],
	row: string,
	language?: string,
	quote?: string,
	author?: string,
	name? : string
}

export class Parser {

	public tokens: IToken[];
	public ast: AST;

	constructor(tokens: IToken[]) {
		this.tokens = tokens;
		this.ast = {
			type: "Document",
			children: []
		};
		this.init();
	}

	init = () => {

		let token_number: number = 0;
		let isParagraph: boolean = false;

		while (token_number < this.tokens.length) {

			let token = this.tokens[token_number];
			
			if (token.type === "Caption") {
				let el: element = {
					type: "Caption", depth: 1, children: [
						{
							value: token.value,
							type: "Caption",
							date: token.date,
							title: token.title,
							template: token.template,
							thumbnail: token.thumbnail,
							slug: token.slug,
							categories: token.categories,
							tags: token.tags
						}
					], row: "# " + token.value
				}
				this.ast.children.push(el);
			}


			if (token.type === "HeadingFirst") {
				let el: element = {
					type: "Header", depth: 1, children: [
						{
							type: "Text",
							value: token.value,
						}
					], row: "# " + token.value
				}
				this.ast.children.push(el);
			}


			if (token.type === "HeadingSecond") {
				let el: element = {
					type: "Header", depth: 2, children: [
						{
							type: "Text",
							value: token.value,
						}
					], row: "# " + token.value
				}
				this.ast.children.push(el);
			}
			if (token.type === "HeadingThird") {
				let el: element = {
					type: "Header", depth: 3, children: [
						{
							type: "Text",
							value: token.value,
						}
					], row: "### " + token.value
				}
				this.ast.children.push(el);
			}
			if (token.type === "HeadingForth") {
				let el: element = {
					type: "Header", depth: 4, children: [
						{
							type: "Text",
							value: token.value,
						}
					], row: "#### " + token.value
				}
				this.ast.children.push(el);
			}
			if (token.type === "HeadingFifth") {
				let el: element = {
					type: "Header", depth: 5, children: [
						{
							type: "Text",
							value: token.value,
						}
					], row: "##### " + token.value
				}
				this.ast.children.push(el);
			}

			//CodeBlock
			if (token.type == "CodeBlock") {
				let el: element = { type: "CodeBlock", value: token.value, language: token.language, row: "```" + token.language + "\n" + token.value + "\n```" }
				this.ast.children.push(el)
			}

			//Code
			if (token.type == "Code") {
				let el: element = { type: "Code", value: token.value, language: token.language, row: "```" + token.language + "\n" + token.value + "\n```" }
				this.ast.children.push(el)
			}

			//Code
			if (token.type == "Quote") {
				let el: element = {
					type: "Quote", value: token.value,
					quote: token.quote,
					author: token.author,
					row: ">" + token.quote + "\n> <cite> - " + token.author + "</cite>"
				}
				this.ast.children.push(el)
			}

			//List
			if (token.type == "List") {
				let el: element = { type: "List", value: token.value, name: token.name, row: token.name + " " + token.value + "\n" }
				this.ast.children.push(el)
			}


			//Start all that in the paragraph can use

			if (token.type == "ParagraphStart") {
				let el: element = { type: "Paragraph", children: [], row: "" }
				this.ast.children.push(el);
				isParagraph = true;
			}

			if (token.type == "ParagraphEnd") {
				isParagraph = false;
			}

			//Link
			if (token.type == "Link" && isParagraph == true) {
				let el: element = { type: "Link", alt: token.value, url: token.body, row: "[" + token.value + "](" + token.body + ")" }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + "[" + token.value + "](" + token.body + ")"
			}

			if (token.type == "Link" && isParagraph == false) {
				let el: element = { type: "Link", alt: token.value, url: token.body, row: "[" + token.value + "](" + token.body + ")" }
				this.ast.children.push(el)
			}

			//Image
			if (token.type == "Image" && isParagraph == true) {
				let el: element = { type: "Image", alt: token.value, url: token.body, row: "[" + token.value + "](" + token.body + ")" }
				this.ast.children[this.ast.children.length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + "[" + token.value + "](" + token.body + ")"
				
			}

			if (token.type == "Image" && isParagraph == false) {
				let el: element = { type: "Image", alt: token.value, url: token.body, row: "[" + token.value + "](" + token.body + ")" }
				this.ast.children.push(el)
				
			}

			// Text
			if (token.type == "Text" && isParagraph == true) {
				let el: element = { type: "Text", value: token.value, row: token.value }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value
			}

			if (token.type == "Text" && isParagraph == false) {
				let el: element = { type: "Text", value: token.value, row: token.value }
				this.ast.children.push(el)
			}

			// Unmarkable
			if (token.type == "Unmarkable" && isParagraph == true) {
				let el: element = { type: "Unmarkable", value: token.value, row: token.value }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value
			}

			if (token.type == "Unmarkable" && isParagraph == false) {
				let el: element = { type: "Unmarkable", value: token.value, row: token.value }
				this.ast.children.push(el)
			}

			// Strong
			if (token.type == "Strong" && isParagraph == true) {
				let el: element = { type: "Strong", value: token.value, row: token.value }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value
			}

			if (token.type == "Strong" && isParagraph == false) {
				let el: element = { type: "Strong", value: token.value, row: token.value }
				this.ast.children.push(el)
			}

			// Color text
			if (token.type == "Color" && isParagraph == true) {
				let el: element = { type: "Color", value: token.value, name: token.name, row: token.value +"." + token.name}
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value +"."+token.name 
			}

			if (token.type == "Color" && isParagraph == false) {
				let el: element = { type: "Color", value: token.value, name: token.name, row: token.value +"." + token.name}
				this.ast.children.push(el)
			}

			// Color badge
			if (token.type == "Badge" && isParagraph == true) {
				let el: element = { type: "Badge", value: token.value, name: token.name, row: token.value +"." + token.name}
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value +"."+token.name 
			}

			if (token.type == "Badge" && isParagraph == false) {
				let el: element = { type: "Badge", value: token.value, name: token.name, row: token.value +"." + token.name}
				this.ast.children.push(el)
			}

			// InlineCode
			if (token.type == "InlineCode" && isParagraph == true) {
				let el: element = { type: "InlineCode", value: token.value, row: token.value }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value
			}

			if (token.type == "InlineCode" && isParagraph == false) {
				let el: element = { type: "InlineCode", value: token.value, row: token.value }
				this.ast.children.push(el)
			}

			// UnderDash
			if (token.type == "UnderDash" && isParagraph == true) {
				let el: element = { type: "UnderDash", value: token.value, row: token.value }
				this.ast.children[(this.ast.children).length - 1].children.push(el)
				this.ast.children[(this.ast.children).length - 1].row =
					this.ast.children[(this.ast.children).length - 1].row + token.value
			}

			if (token.type == "UnderDash" && isParagraph == false) {
				let el: element = { type: "UnderDash", value: token.value, row: token.value }
				this.ast.children.push(el)
			}


			token_number++;

		}
	}
}
