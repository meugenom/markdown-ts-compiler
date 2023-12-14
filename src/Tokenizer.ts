'use strict'
import { Grammar } from "./Grammar"
import { Caption } from "./Caption"
import * as Token from "./Token";
import { TokenType } from "./Types";
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 */

export class Tokenizer {

	public tokens = [] as (Token.bagdeToken
		| Token.captionToken
		| Token.codeBlockToken
		| Token.codeInlineToken
		| Token.colorTextToken
		| Token.headToken
		| Token.imageToken
		| Token.linkToken
		| Token.listToken
		| Token.paragraphEndToken
		| Token.paragraphStartToken
		| Token.quoteToken
		| Token.strongTextToken
		| Token.textToken
		| Token.underLineToken
		| Token.unknownTextToken
		| Token.codeInCodeToken
		| Token.unmarkableToken
		| Token.tableToken
	)[];

	public text: string;	
	private tokensMap: Map<string, any>;

	constructor(text: string) {

		this.text = text;

		this.tokens = [];		
		this.tokensMap = new Map();
		this.tokenize();
	}

	tokenize() {

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

	}

	private findCaption() {
		if (this.text.match(Grammar.BLOCKS.CAPTION) != null) {
			const caption = new Caption(this.text);
			let token = {} as Token.captionToken;
			token = caption.get();
			const uuid = uuidv4();
			this.text = "$token." + uuid + "\n" + caption.text;
			this.tokensMap.set("$token." + uuid, token);
		}
	}

	//unmarkable
	private findUnmarkable(): void {
		//if (this.text.match(Grammar.BLOCKS.UNMARKABLE)?.length != null) {			

		const unmarkables = this.text.match(Grammar.BLOCKS.UNMARKABLE);

		unmarkables?.forEach((unmarkable: string) => {

			const matchResult = unmarkable.match(Grammar.BLOCKS.UNMARKABLE);

			if (matchResult) {
				const body = matchResult[0]?.substring(2, matchResult[0].length - 2);
				const uuid = uuidv4();

				const unmarkableToken = {} as Token.unmarkableToken;
				unmarkableToken.type = TokenType.UNMARKABLE;
				unmarkableToken.value = body;

				this.text = this.text.replace(unmarkable, ` $token.${uuid} `);
				this.tokensMap.set("$token." + uuid, unmarkableToken);
			}
		});
		//}

		return;
	}

	//find code in code blocks
	private findCodeInCode(): void {

		const codeInCodes = this.text.match(Grammar.BLOCKS.CODE_IN_CODE);

		codeInCodes?.forEach((codeInCode: string) => {

			const languageMatchResult = codeInCode.match(Grammar.BLOCKS.INLINE_CODE);
			const bodyMatchResult = codeInCode.match(Grammar.BLOCKS.INLINE_CODE);

			if (languageMatchResult && bodyMatchResult) {

				const language = languageMatchResult[0];
				const body = bodyMatchResult[1] ?? ''; // Add nullish coalescing operator to assign a non-null value to 'body'

				const uuid = uuidv4();
				const codeToken = {} as Token.codeInCodeToken;
				codeToken.type = TokenType.CODE_IN_CODE;
				codeToken.code = body;
				codeToken.language = language as string;
				this.tokensMap.set("$token." + uuid, codeToken);

				this.text = this.text.replace(codeInCode, ` $token.${uuid}`);
			}
		});
		return;
	}

	//find simple code blocks
	private findCodeBlock(): void {

		if (this.text.match(Grammar.BLOCKS.CODE_BLOCK) != null) {

			const blocks = this.text.match(Grammar.BLOCKS.CODE_BLOCK);
			blocks?.forEach((block: string) => {


				const languageMatchResult = block.match(Grammar.BLOCKS.CODE_BLOCK_LANG);
				const bodyMatchResult = block.match(Grammar.BLOCKS.CODE_BLOCK_BODY);

				if (languageMatchResult && bodyMatchResult) {
					const language = languageMatchResult[0];
					const body = bodyMatchResult[0];
					const codeToken = {} as Token.codeBlockToken;
					codeToken.type = TokenType.CODE_BLOCK;
					codeToken.code = body as string;
					codeToken.language = language as string;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, codeToken);

					this.text = this.text.replace(block,
						` $token.${uuid}`);
				}
			});
		}
		return;
	}

	//find headings
	findHeadings(): void {

		if (this.text.match(Grammar.BLOCKS.HEADING) != null) {
			const headings = this.text.match(Grammar.BLOCKS.HEADING);
			headings?.forEach((heading: string) => {

				const levelMatchResult = heading.match(Grammar.BLOCKS.HEADING_LEVEL);

				if (levelMatchResult) {
					const level = levelMatchResult[0];
					//find body from heading where satrt is level + 1 and end is \n
					//private case
					if(!level || level.length > heading.length){
						return;
					}
					const body = heading.slice(level.length + 1, heading.length);

					const types : any = [
						TokenType.HEADING_FIRST,
						TokenType.HEADING_SECOND,
						TokenType.HEADING_THIRD,
						TokenType.HEADING_FORTH,
						TokenType.HEADING_FIFTH
					]
					
					//private case
					if (!level || level.length > types.length) {
						return;
					}
					
					const itype: number = level.length - 1;

					const headToken = {} as Token.headToken;
					headToken.type = types[itype];
					headToken.value = body;
					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, headToken);

					this.text = this.text.replace(heading,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find quotes
	findQuotes(): void {

		if (this.text.match(Grammar.BLOCKS.QUOTE) != null) {

			const quotes = this.text.match(Grammar.BLOCKS.QUOTE);

			quotes?.forEach((quote: string) => {

				const matchResult = quote.match(Grammar.BLOCKS.QUOTE_PARAMS);
				if(matchResult){
					const author : any = matchResult[3];
					const text = matchResult[0];

					const quoteToken = {} as Token.quoteToken;
					quoteToken.type = TokenType.QUOTE;
					quoteToken.quote = text as string;
					quoteToken.author = author;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, quoteToken);

					this.text = this.text.replace(quote,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find bold text
	findStrong(): void {

		if (this.text.match(Grammar.BLOCKS.STRONG) != null) {

			const strongs = this.text.match(Grammar.BLOCKS.STRONG);

			strongs?.forEach((strong: string) => {

				const bodyMatchResult = strong.match(Grammar.BLOCKS.STRONG_TEXT);

				if(bodyMatchResult) {
					const body = bodyMatchResult[0];
					const strongToken = {} as Token.strongTextToken;
					strongToken.type = TokenType.STRONG;
					strongToken.value = body;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, strongToken);

					this.text = this.text.replace(strong,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find links
	findLinks(): void {

		if (this.text.match(Grammar.BLOCKS.LINK) != null) {

			const links = this.text.match(Grammar.BLOCKS.LINK);

			links?.forEach((link: string) => {
				const nameMatchResult = link.match(Grammar.BLOCKS.LINK_NAME);
				const urlMatchResult = link.match(Grammar.BLOCKS.LINK_URL);
				if(nameMatchResult && urlMatchResult && nameMatchResult[0] && urlMatchResult[0]){
					const name = nameMatchResult[0].substring(1, nameMatchResult[0].length - 1);
					const url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);

					const linkToken = {} as Token.linkToken;
					linkToken.type = TokenType.LINK;
					linkToken.name = name;
					linkToken.url = url;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, linkToken);

					this.text = this.text.replace(link,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find images
	findImages(): void {

		if (this.text.match(Grammar.BLOCKS.IMAGE) != null) {

			const images = this.text.match(Grammar.BLOCKS.IMAGE);

			images?.forEach((image: string) => {

				const altMatchResult = image.match(Grammar.BLOCKS.IMAGE_NAME);
				const urlMatchResult = image.match(Grammar.BLOCKS.IMAGE_URL);

				if(altMatchResult && urlMatchResult && altMatchResult[0] && urlMatchResult[0]){
					const alt = altMatchResult[0].substring(2, altMatchResult[0].length - 1);
					const url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);	

					const imageToken = {} as Token.imageToken;
					imageToken.type = TokenType.IMAGE;
					imageToken.alt = alt;
					imageToken.url = url;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, imageToken);


					this.text = this.text.replace(image,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find underlines
	findUnderlines(): void {

		if (this.text.match(Grammar.BLOCKS.UNDER_LINE) != null) {

			const underlines = this.text.match(Grammar.BLOCKS.UNDER_LINE);

			underlines?.forEach((underline: string) => {				

				const bodyMatchResult = underline.match(Grammar.BLOCKS.UNDER_LINE);

				if(bodyMatchResult && bodyMatchResult[0]){
					const body = bodyMatchResult[0].substring(1, bodyMatchResult[0].length - 1);
					const underlineToken = {} as Token.underLineToken;
					underlineToken.type = TokenType.UNDER_LINE;
					underlineToken.value = body;

					const uuid = uuidv4();
					this.tokensMap.set("$token." + uuid, underlineToken);

					this.text = this.text.replace(underline,
						` $token.${uuid} `);
				}
			});
		}
		return;
	}

	//find colors
	findColors(): void {

		if (this.text.match(Grammar.BLOCKS.COLOR) != null) {

			const colors = this.text.match(Grammar.BLOCKS.COLOR);

			colors?.forEach((color: string) => {

				const body = color.split(".")[0];
				const colorName : any = color.split(".")[1];


				const colorToken = {} as Token.colorTextToken;
				colorToken.type = TokenType.COLOR;
				colorToken.value = body;
				colorToken.color = colorName;

				const uuid = uuidv4();
				this.tokensMap.set("$token." + uuid, colorToken);

				this.text = this.text.replace(color,
					` $token.${uuid}`);

			});
		}

	}

	//find bages
	findBadges(): void {

		if (this.text.match(Grammar.BLOCKS.BADGE) != null) {

			const badges = this.text.match(Grammar.BLOCKS.BADGE);

			badges?.forEach((badge: string) => {

				const body = badge.split("@")[0];
				const colorName: any = badge.split("@")[1];

				const badgeToken = {} as Token.bagdeToken;
				badgeToken.type = TokenType.BADGE;
				badgeToken.value = body;
				badgeToken.color = colorName;

				const uuid = uuidv4();
				this.tokensMap.set("$token." + uuid, badgeToken);

				this.text = this.text.replace(badge,
					` $token.${uuid} `);

			});
		}

	}

	//find lists
	findLists(): void {

		if (this.text.match(Grammar.BLOCKS.LIST) != null) {

			const lists = this.text.match(Grammar.BLOCKS.LIST);

			lists?.forEach((list: string) => {

				const body = list;

				const listToken = {} as Token.listToken;
				listToken.type = TokenType.LIST;				
				listToken.value = body;

				const uuid = uuidv4();
				this.tokensMap.set("$token." + uuid, listToken);

				this.text = this.text.replace(list, ` $token.${uuid}`);
			});
		}

	}

	//find tables
	findTables(): void {

		if (this.text.match(Grammar.BLOCKS.TABLE) != null) {

			const tables = this.text.match(Grammar.BLOCKS.TABLE);

			tables?.forEach((table: string) => {

				const tableToken = {} as Token.tableToken;
				tableToken.type = TokenType.TABLE;
				tableToken.row = table;
				tableToken.children = [] as Token.tableRowToken[];

				//add children
				const rows = table.split("\n");
				rows.forEach((row: string) => {
					const rowToken = {} as Token.tableRowToken;
					rowToken.type = TokenType.TABLE_ROW;
					rowToken.value = row;
					tableToken.children.push(rowToken);
				});

				const uuid = uuidv4();
				this.tokensMap.set("$token." + uuid, tableToken);

				this.text = this.text.replace(table, ` $token.${uuid}`);

			});
		}

		//inline code
		if (this.text.match(Grammar.BLOCKS.INLINE_CODE_BLOCK) != null) {

			const inlineCodes = this.text.match(Grammar.BLOCKS.INLINE_CODE_BLOCK);

			inlineCodes?.forEach((inlineCode: string) => {

				const inlineCodeToken = {} as Token.codeInlineToken;
				inlineCodeToken.type = TokenType.CODE_INLINE;
				inlineCodeToken.value = inlineCode;

				const uuid = uuidv4();
				this.tokensMap.set("$token." + uuid, inlineCodeToken);

				this.text = this.text.replace(inlineCode, ` $token.${uuid}`);

			});
		}
	}



	init = (): void => {

		//need to find all paragraphs in the article and change them to tokens
		const paragraphStartToken = {} as Token.paragraphStartToken;
		paragraphStartToken.type = TokenType.PARAGRAPH_START;

		const paragraphEndToken = {} as Token.paragraphEndToken;
		paragraphEndToken.type = TokenType.PARAGRAPH_END;

		//console.log(this.text);

		//console.log(this.tokensMap);

		this.text.split("\n").forEach((paragraph: string) => {
			if (paragraph.length != 0
				&& paragraph != undefined
				&& paragraph.trim() != " ") {
				//console.log(paragraph);
				this.tokens.push(paragraphStartToken);
				paragraph.split(" ").forEach((word: string) => {
					const wordMatchResult = word.match(Grammar.BLOCKS.TOKEN);
					if (wordMatchResult && wordMatchResult[0]) {
						//console.log("word: " + word + " = " + this.tokensMap.get(word.match(Grammar.BLOCKS.TOKEN)[0]));												
						this.tokens.push(this.tokensMap.get(wordMatchResult[0]));											
					} else {
						//console.log(word);
						if (word.length != 0
							&& word != undefined) {
							const textToken = {} as Token.textToken;
							textToken.type = TokenType.TEXT;
							textToken.value = word;
							//console.log(word);
							this.tokens.push(textToken);
						}
					}
				});
				this.tokens.push(paragraphEndToken);
			}
		});

		//console.log(this.tokens);
		this.tokens;

	}
}