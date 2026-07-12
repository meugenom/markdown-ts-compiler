'use strict'
import * as katex from 'katex';

import { CaptionHTML } from "./htmlblocks/CaptionHTML"
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import { CodeInlineHTML } from "./htmlblocks/CodeInlineHTML";
import { QuoteHTML } from "./htmlblocks/QuoteHTML";
import { ImageHTML } from "./htmlblocks/ImageHTML";
import { FormulaHTML } from "./htmlblocks/FormulaHTML";
import { BadgeHTML } from "./htmlblocks/BadgeHTML";
import { ColorTextHTML } from "./htmlblocks/ColorTextHTML";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";


export class Render {

	private ast: ASTNode;

	// Added constructor to initialize the AST node
	constructor(node: ASTNode) {
		this.ast = node;
	}

	/**
	 * Main entry point for rendering the AST into HTML
	 */
	public async html(): Promise<string> {
		if (!this.ast || !this.ast.children) {
			return "";
		}
		return await this.renderNodes(this.ast.children);
	}

	/**
	 * Recursive function to render AST nodes into HTML
	 */
	private async renderNodes(nodes: ASTNode[]): Promise<string> {
		let result = "";

		// We doesnt use forEach here because we need to await inside the loop
		for (const node of nodes) {
			let chunk = "";

			switch (node.type) {
				
				// 1. Caption block
				case TokenType.CAPTION: {
					const caption = new CaptionHTML(node.token as any);
					chunk = caption.render();
					break;
				}

				// 2. H1->H5 headings
				case TokenType.HEADING_FIRST:
				case TokenType.HEADING_SECOND:
				case TokenType.HEADING_THIRD:
				case TokenType.HEADING_FOURTH:
				case TokenType.HEADING_FIFTH: {
					const header = new HeaderHTML(node.token as any);
					const dept = header.getDept(node.token as any);
					const sizeClass = header.getSizeClass(dept);
					const classes = `${sizeClass} font-mono font-bold mt-0 mb-3 pr-10 pt-6`;
					
					const headingText = node.token.value || '';
					const headingId = headingText.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
					
					// Inline content of the heading, if it has children, render them; otherwise, use the heading text
					const content = node.children && node.children.length > 0 
						? await this.renderNodes(node.children) 
						: headingText;

					chunk = `<h${dept} id="${headingId}" class="${classes}">${content}</h${dept}>`;
					break;
				}
				
				// 3. Codeblocks 
				case TokenType.CODE_BLOCK:
				case TokenType.CODE_IN_CODE: {					
					const codeBlock = new CodeBlockHTML(node.token as any);
					chunk = await codeBlock.render();					
					break;
				}
				
				// 4. Inline code
				case TokenType.CODE_INLINE: {
					if (node.children && node.children.length > 0) {
						chunk = `<div>${await this.renderNodes(node.children)}</div>`;
					} else {
						const codeInline = new CodeInlineHTML(node.token as any);
						chunk = codeInline.render();
					}
					break;
				}

				// 5. Quote block
				case TokenType.QUOTE: {
					if (node.children && node.children.length > 0) {
						chunk = 
							`<p class="mb-4 leading-7 font-mono text-slate-700 dark:text-slate-300 border-l-4 border-blue-400 pl-4">
								${await this.renderNodes(node.children)}
							</p>`;
					} else {
						const quote = new QuoteHTML(node.token as any);
						chunk = quote.render();
					}						
					break;
				}
				
				// 6. Large formulas (KaTeX)
				case TokenType.FORMULA_BLOCK: {
					const formula = new FormulaHTML(node.token as any);
					chunk = formula.render();
					if (node.children && node.children.length > 0) {
						chunk += await this.renderNodes(node.children);
					}					
					break;
				}
				
				// 7. Colorful text
				case TokenType.COLOR: {
					const colorText = new ColorTextHTML(node.token as any);
					chunk = colorText.render();
					if (node.children && node.children.length > 0) {
						const childrenHtml = await this.renderNodes(node.children);
						chunk = chunk.replace('</span>', `${childrenHtml}</span>`);
					}					
					break;
				}

				// 8. Inline formulas (KaTeX)
				case TokenType.FORMULA_INLINE: {
					let text = "";					
					try {
						text = katex.renderToString(node.token.formula, {
							displayMode: false,
							throwOnError: false
						});
					} catch (e) {
						text = ` $${node.token.formula}$`;
					}
					const childrenHtml = node.children && node.children.length > 0 ? await this.renderNodes(node.children) : "";
					chunk = `<span>${text} ${childrenHtml}</span>`;					
					break;
				}
				
				// 9. List Block (UL)
				case TokenType.LIST: {
    				const titleHtml = node.token && node.token.title 
						? `<p class="font-mono">${node.token.title}</p>` 
						: "";
    				const ulContent = await this.renderNodes(node.children);
    				chunk = `<div class="mt-3">${titleHtml}<ul class="mt-1 ml-2 space-y-1">${ulContent}</ul></div>`;
    				break;
				}

				// 10. List Item (<li>)
				case TokenType.LIST_ITEM: {    
					const itemText = node.token.value.trim();    									
    				let liClass = "list-disc ml-5 font-mono text-sm leading-6";

					if (itemText.startsWith('[]')) {
        				liClass = "task-list-item list-none ml-5 flex items-start gap-2";        				
    				} else if (itemText.startsWith('[x]')) {
        				liClass = "task-list-item task-list-item-checked list-none ml-5 flex items-start gap-2";        				
    				}

        			const innerContent = node.children && node.children.length > 0 							
            			? await this.renderNodes(node.children)
						: itemText; 				

					chunk = `<li class="${liClass}">${innerContent}</li>`;
    				break;
				}

				// 11. Table Block
				case TokenType.TABLE: {
					let headRowsHtml = "";
					let bodyRowsHtml = "";
						
					// Make table rows
					for (const rowNode of node.children) {
						if (rowNode.type === TokenType.TABLE_HEAD_ROW) {
							let thsHtml = "";
							for (const headNode of rowNode.children) {									
								const cellContent = await this.renderNodes(headNode.children);
								thsHtml += `<th class="border border-slate-300 p-2 text-center">${cellContent}</th>`;
							}	
							headRowsHtml += `<tr>${thsHtml}</tr>`;																		
						} else if (rowNode.type === TokenType.TABLE_BODY_ROW) {
							let tdsHtml = "";									
							for (const bodyNode of rowNode.children) {									
								const cellContent = await this.renderNodes(bodyNode.children);
								tdsHtml += `<td class="border border-slate-300 p-2 text-center">${cellContent}</td>`;
							}	
							bodyRowsHtml += `<tr>${tdsHtml}</tr>`;
						}	
					}												
						
					chunk = `<table class="w-full border-collapse border border-slate-300 my-4 text-sm font-mono"><thead>${headRowsHtml}</thead><tbody>${bodyRowsHtml}</tbody></table>`;
					break;
				}
				
				// 12. Badge block
				case TokenType.BADGE: {
					const badge = new BadgeHTML(node.token as any);
					chunk = badge.render();
					if (node.children && node.children.length > 0) {
						chunk += await this.renderNodes(node.children);
					}					
					break;
				}

				// 13. Image block
				case TokenType.IMAGE: {
					const img = new ImageHTML(node.token as any);
					chunk = img.render();					
					break;
				}
				
				// 14. Links
				case TokenType.LINK: {
					if (node.children && node.children.length > 0) {
						chunk = `<div>${await this.renderNodes(node.children)}</div>`;
					} else {
						const linkName = node.token.name ? `${node.token.name} ` : "";
						chunk = `<a href="${node.token.url}" class="font-mono text-blue-800 hover:text-blue-500 underline">${linkName}</a>`;
					}
					break;	
				}

				// 15. Bold text
				case TokenType.STRONG: {
					const strongContent = node.token.value + " ";
					const strongChildren = node.children && node.children.length > 0 ? await this.renderNodes(node.children) : "";
					chunk = `<strong class="font-mono font-bold">${strongContent}${strongChildren}</strong>`;
					break;
				}
				
				// 16. Underlined text
				case TokenType.UNDER_LINE: {
					if (node.children && node.children.length > 0) {
						chunk = `<div>${await this.renderNodes(node.children)}</div>`;
					} else {
						chunk = `<span><span class="underline decoration-sky-500 md:decoration-solid decoration-3">${node.token.value}</span> </span>`;
					}
					break;
				}

				// 17. Unmarkable text (parsing errors)
				case TokenType.UNMARKABLE: {
					if (node.children && node.children.length > 0) {
						chunk = `<div>${await this.renderNodes(node.children)}</div>`;					
					} else {	
						const lines = node.token.value.split('\n');
						const escapedLines = lines
							.map((line: string) => line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))
							.join('<br/>');
						chunk = `<div class="font-mono italic text-md opacity-50">${escapedLines}</div>`;
					}
					break;
				}

				// 18. Regular flat text (We escape it for safety)
				case TokenType.TEXT: {
					chunk = (node.token.value || "")
						.replace(/&/g, "&amp;")
						.replace(/</g, "&lt;")
						.replace(/>/g, "&gt;");
					break;
				}

				// 19. Default paragraph blocks
            	case TokenType.PARAGRAPH:
            	default: {
					const pContent = node.children && node.children.length > 0 ? await this.renderNodes(node.children) : "";
					chunk = `<p class="block leading-7 font-mono mt-4">${pContent}</p>`;
                	break;
				}
        	}

			// Append the rendered chunk to the result
			result += chunk;
    	}

		// Return the final rendered HTML as a string
		return result;
	}
}