'use strict'
import { Grammar } from "./Grammar"
import * as Token from "./Token";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";
import { ValidateCaption } from "./validation/validateCaption";


export class Tokenizer {

	public tokens = [] as ( Token.bagdeToken
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
		| Token.tableHeadRowToken
		| Token.tableBodyRowToken
		| Token.tableCellToken
		| Token.formulaBlockToken
		| Token.formulaInlineToken
		| Token.paragraphTextToken
	)[];

	private ast : ASTNode = {
		type: "Root",
		token: null,
		raw:  "",					
		children: []
	};
	


	private text: string;

	constructor(text: string) {

		this.text = text;
		this.tokens = [];		

		
		// first going through text and finding all block level tokens and removing them from text and adding to ast
		this.putRootChildren();

		// second recursively find inline tokens in the remaining text and replace them with token placeholders and add to ast		
		this.ast.children.forEach(node => this.putInlineChildren(node)); // start from root's children
	}

	getAST() {
		return this.ast;
	}

	putRootChildren() {
		
		//this.init();

		while (this.text.length > 0) {
			
			let match: RegExpMatchArray | null = null;

			// if text is empty, break			
			if (this.text.length === 0) break;

			// remove leading whitespace
			const whitespace = this.text.match(/^\s+/);
			let hadBlankLine = false;
    		if (whitespace) {

				// any leading newline as a new paragraph
        		hadBlankLine = /\n/.test(whitespace[0]);
        		this.text = this.text.slice(whitespace[0].length);
        		if (this.text.length === 0) break; 
    		}


			// 1. Find CAPTION
			if(this.text.match(Grammar.BLOCKS.CAPTION_PARAMETER)!== null 				
			){
				
				match = this.text.match(Grammar.BLOCKS.CAPTION_PARAMETER);			
				
				if (match != null) {												
					const fullBlock = match[0];

					//console.log(`Found caption block: ${fullBlock}`);

					const dateMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_DATE);
					const titleMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_TITLE);
					const templateMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_TEMPLATE);
					const thumbnailMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_THUMBNAIL);
					const slugMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_SLUG);
					const tagsMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_TAGS);
					const clusterMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_CLUSTER);
					const orderMatch = fullBlock.match(Grammar.BLOCKS.CAPTION_FIND_ORDER);

					//console.log(dateMatch, titleMatch, templateMatch, thumbnailMatch, slugMatch, tagsMatch, clusterMatch, orderMatch);

					let captionToken = {} as Token.captionToken;										
					captionToken.date = dateMatch ? dateMatch[1].trim() : "";
					captionToken.title = titleMatch ? titleMatch[1].trim() : "";
					captionToken.template = templateMatch ? templateMatch[1].trim() : "";
					captionToken.thumbnail = thumbnailMatch ? thumbnailMatch[1].trim() : "";
					captionToken.slug = slugMatch ? slugMatch[1].trim() : "";
					captionToken.tags = tagsMatch ? tagsMatch[1].trim() : "";
					captionToken.cluster = clusterMatch ? clusterMatch[1].trim() : "";
					captionToken.order = orderMatch ? orderMatch[1].trim() : "";
					
					//console.log(`Extracted caption token: ${JSON.stringify(captionToken)}`);										
					captionToken = ValidateCaption.validate(captionToken); // validate the caption token and set error messages for incorrect fields

					//console.log(`Extracted caption token: ${JSON.stringify(captionToken)}`);

					// Case format is correct but user can see error messages about incorrect fields
					this.text = this.text.replace(Grammar.BLOCKS.CAPTION, ""); // Remove the caption block from the text

					//add to the astNode		
					this.ast.children.push({
						type: TokenType.CAPTION,
						token: captionToken,
    					raw: "",  
    					children: []
					})						

					//continue;
			
				} else {

					// Case is broken, return UNMARKABLE_BLOCK with error message about missing fields	
					this.text = this.text.replace(Grammar.BLOCKS.CAPTION, ""); 

					let unmarkableToken = {} as Token.unmarkableToken;
					unmarkableToken.type = TokenType.UNMARKABLE;
					unmarkableToken.value = "\n\\* \n Error: Incorrectly formatted Caption block. Please check the format. \n\\* \n";

					this.ast.children.push({
						type: TokenType.UNMARKABLE,
						token: unmarkableToken,
						raw: unmarkableToken.value,
						children: []
					})

					continue;
				}				
			}				

    		// 2. Find UNMARKABLE_BLOCK
			match = this.text.match(Grammar.BLOCKS.UNMARKABLE_BLOCK);
			if (match) {				
									
				const unmarkableToken = {} as Token.unmarkableToken;
				unmarkableToken.type = TokenType.UNMARKABLE;
				unmarkableToken.value = match[1];				

				//add to the astNode		
				this.ast.children.push({
					type: TokenType.UNMARKABLE,
					token: unmarkableToken,
    				raw: match[0],
    				children: []
					});

				// remove unmarkable block from text
				this.text = this.text.slice(match[0].length);							
				continue;				
			}
				


			// 3. Find CODE_IN_CODE
			match = this.text.match(Grammar.BLOCKS.CODE_IN_CODE);
			if (match) {
				

					const languageMatchResult = match[2];
					const bodyMatchResult = match[3];

					

					if (languageMatchResult && bodyMatchResult) {

						const language = languageMatchResult;
						const body = bodyMatchResult ?? ''; // Add nullish coalescing operator to assign a non-null value to 'body'						
					
						const codeToken = {} as Token.codeInCodeToken;
						codeToken.type = TokenType.CODE_IN_CODE;
						codeToken.code = body; 
						codeToken.language = language as string;				 

						//add to the astNode		
						this.ast.children.push ({
							type: TokenType.CODE_IN_CODE,
							token: codeToken,
    						raw: body, // <- put in next raw clear value
    						children: [],					
						})
						// remove code in code block from text
						this.text = this.text.slice(match[0].length); // slice dirty value						

					}
				
				continue;	
			}

			// 4. Find formula blocks
			match = this.text.match(Grammar.BLOCKS.FORMULA_BLOCK);
			if(match) {				

					const inner = match[0].slice(2, match[0].length - 2).trim();
					const token = {} as Token.formulaBlockToken;
					token.type = TokenType.FORMULA_BLOCK;
					token.formula = inner; 
			
					//add to the astNode		
					this.ast.children.push({
						type: TokenType.FORMULA_BLOCK,
						token: token,
    					raw: match[0],
    					children: []
					});
			
					
					// remove formula block from text
					this.text = this.text.slice(match[0].length);
				
				continue;
			}


			// 5. Find code blocks
			match = this.text.match(Grammar.BLOCKS.CODE_BLOCK);
				if (match) {					
						const languageMatchResult = match[0].match(Grammar.BLOCKS.CODE_BLOCK_LANG);
						const bodyMatchResult = match[0].match(Grammar.BLOCKS.CODE_BLOCK_BODY);

						if (bodyMatchResult) {
							const language = languageMatchResult ? languageMatchResult[0].trim() : '';
							const body = bodyMatchResult[0];
							const codeToken = {} as Token.codeBlockToken;
							codeToken.type = TokenType.CODE_BLOCK;
							codeToken.code = body as string;
							codeToken.language = language as string;

							//add to the astNode		
							let node : ASTNode = {
								type: TokenType.CODE_BLOCK,
								token: codeToken,
    							raw: body, // <- put in next raw clear value
    							children: []
							}
			
							this.ast.children.push(node);
							// remove code block from text
							this.text = this.text.slice(match[0].length); // slice dirty value

						}
					
				continue;
			}


			// 6. Find headings
			match = this.text.match(Grammar.BLOCKS.HEADING);
			if (match) {

				const levelMatchResult = match[0].match(Grammar.BLOCKS.HEADING_LEVEL);

				if (levelMatchResult) {
					const level = levelMatchResult[0];
					//find body from heading where satrt is level + 1 and end is \n
					//private case
					if(!level || level.length > match[0].length){
						return;
					}
					const body = match[0].slice(level.length + 1, match[0].length);

					const types : any = [
						TokenType.HEADING_FIRST,
						TokenType.HEADING_SECOND,
						TokenType.HEADING_THIRD,
						TokenType.HEADING_FOURTH,
						TokenType.HEADING_FIFTH
					]

					//console.log(`Found heading: ${match[0]} with level: ${level.length} and body: ${body}`);
					const contentOnly = match[0].replace(/^#{1,6}\s+/, '').replace(/\n$/, '');
					//console.log(`Content only for heading: ${contentOnly}`);
					
					//private case
					if (!level || level.length > types.length) {
						return;
					}
					
					const itype: number = level.length - 1;

					const headToken = {} as Token.headToken;
					headToken.type = types[itype];
					headToken.value = contentOnly;

				    //add to the astNode		
					this.ast.children.push({
						type: headToken.type,
						token: headToken,
    					raw: contentOnly,  
    					children: []
					});

					// remove heading from text
					this.text = this.text.slice(match[0].length);

				}
				continue;
			}

			// 7. Find images			
			match = this.text.match(Grammar.BLOCKS.IMAGE);
			if (match) {
				
				const altMatchResult = match[0].match(Grammar.BLOCKS.IMAGE_NAME);
				const urlMatchResult = match[0].match(Grammar.BLOCKS.IMAGE_URL);

				if(altMatchResult && urlMatchResult && altMatchResult[0] && urlMatchResult[0]){
					const alt = altMatchResult[0].substring(2, altMatchResult[0].length - 1);
					const url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);

					const imageToken = {} as Token.imageToken;
					imageToken.type = TokenType.IMAGE;
					imageToken.alt = alt;
					imageToken.url = url;

					//add to the astNode
					this.ast.children.push({
						type: TokenType.IMAGE,
						token: imageToken,
						raw: match[0],  
						children: []
					});
					
					// remove image from text
					this.text = this.text.slice(match[0].length);
				}
				
				continue;
			}


			// 8. Find Lists
			match = this.text.match(Grammar.BLOCKS.LIST);
			if (match) {
    			const rawBlock = match[0];
    
    			// FIX: cases - remove leading and trailing list markers and trim whitespace
    			const cleanBlock = rawBlock.replace(/^\s*\\\*\s*|\s*\\\*\s*$/g, '');
    			
				const lines = cleanBlock.split('\n').filter(l => l.trim() !== '');
 
    			// FIX: Check if the first line is a title (does not start with list marker) and extract it
    			const firstLine = lines[0];
    			const hasTitle = !firstLine.trim().match(/^\s*(-|\[\]|\[x\])/);
    			const title = hasTitle ? firstLine.trim().replace(/:$/, '') : undefined;
    			const itemLines = hasTitle ? lines.slice(1) : lines;
 
    			const listNode: ASTNode = {
        			type: TokenType.LIST,
        				token: {
            			type: TokenType.LIST,
            			title: title,  // FIX: Title is now correctly extracted
            			value: cleanBlock
        				},
        			raw: cleanBlock,
        			children: []
    			};

				// List Item-Nodes
    			itemLines.forEach(line => {
        			const trimmed = line.trim();
					// need replace -, [ ], [x] with empty string for raw value, but keep them in token value for later use in render
					const rawValue = trimmed.replace(/^\s*(-|\[\s?\]|\[x\])\s*/, '').trim();
        			if (trimmed.length > 0) {
            			listNode.children.push({
                			type: TokenType.LIST_ITEM,
                			token: {
                    			type: TokenType.LIST_ITEM,
                    			value: trimmed
                			},
                			raw: rawValue,  // FIX: raw enthält den kompletten Text für Inline-Parsing
                			children: []   // Wird später durch putInlineChildren gefüllt
            			});
        			}
    			});
 
    			this.ast.children.push(listNode);

				 
				// FIX: Quickly parse inline tokens in list items to avoid issues with remaining text parsing
				listNode.children.forEach(itemNode => {
    				this.putInlineChildren(itemNode);
				});
 

    			this.text = this.text.slice(match[0].length);
    			continue;
			}

		
			// 9. Find Quotes
			match = this.text.match(Grammar.BLOCKS.QUOTE);				
			if(match) {								
	
				const quoteToken = {} as Token.quoteToken;
				quoteToken.type = TokenType.QUOTE;
				
				
				const cleanContent = match[0].replace(/^>\s?/gm, "\n"); // Remove leading '>' and optional space from each line
				quoteToken.value = cleanContent;						


				//add to the astNode
				this.ast.children.push({
					type: TokenType.QUOTE,
					token: quoteToken,
					raw: cleanContent, // for next step level raw is clean content 
					children: []
					});
						
					// remove quote from text
					this.text = this.text.slice(match[0].length);
						
				continue;
			}

			
			// 10. Find Tables
			match = this.text.match(Grammar.BLOCKS.TABLE);
			if(match) {					

				//console.log(`Found table: ${match[0]}`);

				// match[0] -- whole table
				const tableBlock = match[0].trim(); // Remove leading/trailing whitespace
				const rows = tableBlock.split('\n');

				//find components of the table
				const rawHeader = rows[0];
				const rawSeparator = rows[1]; // often contains --- | :--- | ---: etc. for alignment, but we can ignore it for now
				const rawBody = rows.slice(2);
																														
				const headRowToken = {} as Token.tableHeadRowToken;
				headRowToken.type = TokenType.TABLE_HEAD_ROW;
				headRowToken.value = rawHeader;
				headRowToken.row = rawHeader; // <- null while we implemented children 

				const headCell = rawHeader.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
				const headCellArray : ASTNode[] = [];

				// we put cell text as UNKNOWN_TEXT to parse inline tokens
				headCell.forEach(cell => {
					const cellToken = {} as Token.tableCellToken;
					cellToken.type = TokenType.UNKNOWN_TEXT; // We will parse inline tokens in header cells in the next step, so we set type to UNKNOWN_TEXT for now
					cellToken.value = cell;						
					headCellArray.push({
						type: TokenType.UNKNOWN_TEXT,
						token: cellToken,
						raw: cell,
						children: [] // Initialize children array for potential inline tokens in header cells
					});						
				});
					
				const headRowAST : ASTNode = {
					type: TokenType.TABLE_HEAD_ROW,
					token: headRowToken,
					raw: "",
					children: [...headCellArray] // Will be filled with table cell nodes in the next step
				}					

				// table body rows
				const bodyArray : ASTNode[] = [];
				rawBody.forEach((bodyRow: string) => {
					const bodyRowToken = {} as Token.tableBodyRowToken;
					bodyRowToken.type = TokenType.TABLE_BODY_ROW;
					bodyRowToken.value = bodyRow;
					bodyRowToken.row = bodyRow; // <- null while we implemented children 
					bodyRowToken.children = []; // Initialize children array for potential inline tokens in body cells
						
					const bodyCellArray : ASTNode[] = [];
					bodyRow.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0).forEach(cell => {
						const cellToken = {} as Token.tableCellToken;
						cellToken.type = TokenType.UNKNOWN_TEXT;
						cellToken.value = cell;
						bodyCellArray.push({
							type: TokenType.UNKNOWN_TEXT,
							token: cellToken,
							raw: cell,
							children: [] // Initialize children array for potential inline tokens in body cells
						});
					});

					const bodyRowAST : ASTNode = {
						type: TokenType.TABLE_BODY_ROW,
						token: bodyRowToken,
						raw: "", // for next step level raw is body row
						children: [...bodyCellArray] // Will be filled with table cell nodes in the next step
					}
					bodyArray.push(bodyRowAST);
				});

					

				this.ast.children.push({
					type: TokenType.TABLE,
					token: {
						type: TokenType.TABLE,
						value: tableBlock,
						row: "", // <- null while we implemented children 
						children: [] // Initialize children array for potential inline tokens in table rows
					},
					raw: "",   
					children: [headRowAST, ...bodyArray]
				});
				
				// remove table from text
				this.text = this.text.slice(match[0].length);
								
				continue;
			}
			


			// ANY OTHER UNKNOWN BLOCK - FALL BACK TO TEXT
			const nextNewline = this.text.indexOf('\n');
            const end = nextNewline === -1 ? this.text.length : nextNewline + 1;
            const chunk = this.text.slice(0, end);

            //each line becomes its own paragraph
			this.ast.children.push({
				type: TokenType.PARAGRAPH,						
				raw: chunk,
				token: {
					type: TokenType.PARAGRAPH,
					value: chunk
				},  
				children: []
			});
            

            this.text = this.text.slice(end);		

		} // end of while loop	

}


	putInlineChildren(node: ASTNode) {
  		// 1. Test current node for inline tokens and replace them with token placeholders and add to ast
  		//console.log(`Checking node: ${node.type}`);
  
  		// Logic to find inline tokens in node.raw and replace them with token placeholders and add to ast
  		if (node.type === TokenType.QUOTE 
			//|| node.type === TokenType.LIST
			|| node.type === TokenType.LIST_ITEM		
			|| node.type === TokenType.UNKNOWN_TEXT			
			|| node.type === TokenType.PARAGRAPH
			|| node.type === TokenType.HEADING_FIRST
			|| node.type === TokenType.HEADING_SECOND
			|| node.type === TokenType.HEADING_THIRD
			|| node.type === TokenType.HEADING_FOURTH
			|| node.type === TokenType.HEADING_FIFTH		
		) {
    					
			//console.log(`Checking node: ${node.type}`);

			
			while (node.raw.length > 0) {
			
			let match: RegExpMatchArray | null = null;

			// if text is empty, break			
			if (node.raw.length === 0) break;

			// remove leading whitespace
			const whitespace = node.raw.match(/^\s+/);
    		if (whitespace) {
        		//node.raw = node.raw.slice(whitespace[0].length); //TODO: we should not remove leading whitespaces
        		if (node.raw.length === 0) break;
    		}



			// hier logic to find inline tokens in node.raw and replace them with token placeholders and add to ast

			// STRONG TEXT
			match = node.raw.match(Grammar.BLOCKS.STRONG_TEXT);
			if (match) {			
									
					const strongToken = {} as Token.strongTextToken;
					strongToken.type = TokenType.STRONG;					
					strongToken.value = match[1];


					//add to the astNode		
					node.children.push({
						type: TokenType.STRONG,
						token: strongToken,
    					raw: match[1],  // <- put in next raw clear value
    					children: []
					});
			
					// remove strong text from node.raw
					node.raw = node.raw.slice(match[0].length);				
				
				continue;
			}


			
			// LINKS
			match = node.raw.match(Grammar.BLOCKS.LINK);
			if (match) {
    			const fullMatch = match[0];
    			const linkName = match[1];
    			const linkUrl = match[2];

    			//console.log(`Found link: ${fullMatch}`);

    			// create link token
    			const linkToken: Token.linkToken = {
        			type: TokenType.LINK,
        			name: linkName,
        			url: linkUrl
    			};

    			// add to AST
    			node.children.push({
        			type: TokenType.LINK,
        			token: linkToken,
        			raw: fullMatch,
        			children: []
    			});
    
				// remove found link from node.raw
				node.raw = node.raw.slice(fullMatch.length); // remove only the first occurrence
				continue;
			}

			
			
			//INLINE CODE BLOCKS
			match = node.raw.match(Grammar.BLOCKS.INLINE_CODE_BLOCK);
			if(match) {
				const inlineCodeToken = {} as Token.codeInlineToken;
				inlineCodeToken.type = TokenType.CODE_INLINE;
				inlineCodeToken.value = match[1];

				//add to the astNode
				node.children.push({
					type: TokenType.CODE_INLINE,
					token: inlineCodeToken,
					raw: match[0],  
					children: []
				});

				// remove inline code from node.raw
				node.raw = node.raw.slice(match[0].length); // remove only the first occurrence
				continue;
			}


			// FORMULA INLINE
			match = node.raw.match(Grammar.BLOCKS.FORMULA_INLINE);
			if(match) {
				const inner = match[0].slice(1, match[0].length - 1).trim();
				const token = {} as Token.formulaInlineToken;
				token.type = TokenType.FORMULA_INLINE;
				token.formula = inner;

				//add to the astNode		
				node.children.push({
					type: TokenType.FORMULA_INLINE,
					token: token,
					raw: match[0],
					children: []
				});
			
				// remove formula inline from node.raw
				node.raw = node.raw.slice(match[0].length); // remove only the first occurrence
				continue;			
			}

			
			
			
			// UNDERLINES INLINE
			match = node.raw.match(Grammar.BLOCKS.UNDER_LINE);
			if(match) {				

				const body = match[0].substring(1, match[0].length - 1);
				//console.log(`Found underline: ${body}`);
				const token = {} as Token.underLineToken;
				token.type = TokenType.UNDER_LINE;
				token.value = body;
				
				//add to the astNode
				node.children.push({
					type: TokenType.UNDER_LINE,
					token: token,
					raw: body,  
					children: []
				});

				// remove underline from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}


		
			// BADGES INLINE
			match = node.raw.match(Grammar.BLOCKS.BADGE);
			if (match) {

				const body = match[1]; 
				const colorName = match[2];

				const badgeToken = {} as Token.bagdeToken;
				badgeToken.type = TokenType.BADGE;
				badgeToken.value = body;
				badgeToken.color = colorName;

				//add to the astNode
				node.children.push({
					type: TokenType.BADGE,
					token: badgeToken,
					raw: match[0],  
					children: []
				});

				// remove badge from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}

			
			
			// COLOR WORD INLINE
			match = node.raw.match(Grammar.BLOCKS.COLOR);
			if (match) {
				const body = match[1]; 
				const colorName = match[2];
				const colorToken = {} as Token.colorTextToken;
				colorToken.type = TokenType.COLOR;
				colorToken.value = body;
				colorToken.color = colorName;

				//add to the astNode
				node.children.push({
					type: TokenType.COLOR,
					token: colorToken,
					raw: match[0],  
					children: []
				});
				
				// remove color text from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}

			// FALLBACK - ANY OTHER UNKNOWN INLINE - FALL BACK TO TEXT
			// NEXT WORD TO SPECIAL CHARACTER OR END OF STRING
			const specialChars = /[*[$_`#</]/;
			const nextSpecial = node.raw.search(specialChars);

			let end: number;

			if (nextSpecial === 0) {    					
    			end = 1;
			} else if (nextSpecial === -1) {    			
    			end = node.raw.length;
			} else {
    			end = nextSpecial;
			}

			const chunk = node.raw.slice(0, end);

			// 2. Logic to add chunk to ast as text node or append to last text node if it exists
			const lastNode = node.children[node.children.length - 1];
			if (lastNode && lastNode.type === TokenType.TEXT) {
    			lastNode.raw += chunk;
    		if (lastNode.token) 
				lastNode.token.value += chunk;
			} else {
    		
				node.children.push({
        			type: TokenType.TEXT, // 
        			raw: chunk,
        			token: { type: TokenType.TEXT, value: chunk }, 
        			children: []
    			});
			}

			// 3. Remove chunk from node.raw
			node.raw = node.raw.slice(end);
			


			} // end while loop
  		}

  		// 2. If there are children — run the same function on them (recursion)
  		if (node.children && node.children.length > 0) {
    		node.children.forEach(child => this.putInlineChildren(child));
  		}

	} // end of putInlineChildren recursive function

} // end of Tokenizer class