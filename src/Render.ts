import * as katex from 'katex';

import { CaptionHTML } from "./htmlblocks/CaptionHTML"
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import { CodeInlineHTML } from "./htmlblocks/CodeInlineHTML";
import {QuoteHTML} from "./htmlblocks/QuoteHTML";
import { ImageHTML } from "./htmlblocks/ImageHTML";
import { FormulaHTML } from "./htmlblocks/FormulaHTML";
import { BadgeHTML } from "./htmlblocks/BadgeHTML";
import { ColorTextHTML } from "./htmlblocks/ColorTextHTML";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";

import './static/styles/list.css';
import './static/styles/table.css';



export class Render {

	private ast : ASTNode;
	public htmlOutput : HTMLElement | null;
	private text: string = "";

	constructor(node : ASTNode, htmlOutput : HTMLElement | null) {
		this.ast = node
		this.htmlOutput = htmlOutput;
		this.text="";

		if (this.ast && this.htmlOutput) {
			this.renderNodes(this.ast.children, this.htmlOutput);
		}
	}

	renderNodes(nodes: ASTNode[], container: HTMLElement) {
    
		let element: HTMLElement | Text | null;

		nodes.forEach(node => {

			// every time we start processing a new node, we reset the element variable to null
			element = null;			

			switch (node.type) {
				
				// Block Caption 
				case TokenType.CAPTION:					
					const caption = new CaptionHTML(node.token as any);
					element = caption.renderAsElement();
					//console.log('Rendered Caption:', element);
					break;

				// Block Headers
				case TokenType.HEADING_FIRST:
				case TokenType.HEADING_SECOND:
				case TokenType.HEADING_THIRD:
				case TokenType.HEADING_FOURTH:
				case TokenType.HEADING_FIFTH:
					if(node.children && node.children.length > 0) {
						const header = new HeaderHTML(node.token as any);
						const dept = header.getDept(node.token as any);
						const sizeClass = header.getSizeClass(dept);
						element = document.createElement('h' + dept);
					element.className = `${sizeClass} font-mono font-bold mt-0 mb-3 pr-10 pt-6`;
						this.renderNodes(node.children, element);
					} else {

					const header = new HeaderHTML(node.token as any);
					element = header.renderAsElement();
					}
					
					break;
				
				// Block Code
				case TokenType.CODE_BLOCK:					
					const codeBlock = new CodeBlockHTML(node.token as any);
					element = codeBlock.renderAsElement();					
					// no need to render children
					break;
				
				// Block Code in Code
				case TokenType.CODE_IN_CODE:					
					const codeInCode = new CodeBlockHTML(node.token as any);
					element = codeInCode.renderAsElement();
					// no need to render children
					break;
				
				// Block Code inline
				case TokenType.CODE_INLINE:
					if(node.children && node.children.length > 0) {
						element = document.createElement('div');
						this.renderNodes(node.children, element);
					} else {
						const codeInline = new CodeInlineHTML(node.token as any);
						element = codeInline.renderAsElement();
					}
					break;

				// Block Quote
				case TokenType.QUOTE:
					if(node.children && node.children.length > 0) {
						element = document.createElement('p');
						element.className = "mb-4 leading-7 font-mono text-slate-700 dark:text-slate-300 border-l-4 border-blue-400 pl-4";
						this.renderNodes(node.children, element);
					}else {
						const quote = new QuoteHTML(node.token as any);
						element = quote.renderAsElement();
					}						
					break;
				
				// Formula Block
				case TokenType.FORMULA_BLOCK:
					const formula = new FormulaHTML(node.token as any);
					element = formula.renderAsElement();
					//console.log('Rendered Formula:', element);
					this.renderNodes(node.children, element);					
					break;
				
				// Color Text INLINE
				case TokenType.COLOR:
					const colorText = new ColorTextHTML(node.token as any);
					element = colorText.renderAsElement();
					//console.log('Rendered Color Text Inline:', element);
					this.renderNodes(node.children, element);					
					break;

				// Formula INLINE
				case TokenType.FORMULA_INLINE:
					element = document.createElement('span');
					let text = "";					
					try {
							text = katex.renderToString(node.token.formula, {
								displayMode: false,
								throwOnError: false
								});
						} catch (e) {
							text = ' $' + node.token.formula + '$';
						}
					element.innerHTML = text + " "; // Ensure it's a string and add space after formula
					//console.log('Rendered Formula Inline:', element);
					this.renderNodes(node.children, element);					
					break;
				
				// LIST Block
				case TokenType.LIST:
    				element = document.createElement('div');
    				element.className = "mt-3";
					
					// Title for the list block (if exists)
    				if (node.token && node.token.title) {
        				const titleP = document.createElement('p');
        				titleP.className = "font-mono";
        				titleP.textContent = node.token.title;
        				element.appendChild(titleP);
    				}

					// UL Container for list items
    				const ul = document.createElement('ul');
    				ul.className = "mt-1 ml-2 space-y-1";

    				// Recursively render list items into the UL container
    				this.renderNodes(node.children, ul);
    				element.appendChild(ul);
    				break;

				
				// LIST Items - FIX: Rendert jetzt den raw-Text korrekt
				case TokenType.LIST_ITEM:    				
					const itemText = node.token.value.trim();    									
    				
					if (itemText.startsWith('[]')) {
        				// Checkbox unchecked
        				element = document.createElement('li');
        				element.className = "task-list-item list-none ml-5 flex items-start gap-2";        				

    				} else if (itemText.startsWith('[x]')) {
        				// Checkbox checked
        				element = document.createElement('li');        				
        				element.className = "task-list-item task-list-item-checked list-none ml-5 flex items-start gap-2";        				
						
    				} else {
        				// Normal bullet point
        				element = document.createElement('li');
        				element.className = "list-disc ml-5 font-mono text-sm leading-6";        										
        				
						
    				}

					// FIX: Render inline children (für Links, Bold, etc. im List-Item)
        			if (node.children && node.children.length > 0) {							
            			this.renderNodes(node.children, element); 				
        			}
    				break;
				

				// Table Block
				case TokenType.TABLE:
																																						
						const table = document.createElement('table');
						table.className = "w-full border-collapse border border-slate-300 my-4 text-sm font-mono";
						
						const header = table.createTHead();
						const body = table.createTBody();
						
						// Building Table
						node.children.forEach((rowNode, index) => {
							if(rowNode.type === TokenType.TABLE_HEAD_ROW) {
								const tr = document.createElement('tr');								
								rowNode.children.forEach(headNode => {									
									const th = document.createElement('th');																										
									th.className = "border border-slate-300 p-2 text-center";
									// FIX: Render inline children (für Links, Bold, etc. im Table-Header)
									this.renderNodes(headNode.children, th);																							
									tr.appendChild(th);
								});	
								header.appendChild(tr);																		
							} else if(rowNode.type === TokenType.TABLE_BODY_ROW) {
								if(rowNode.type === TokenType.TABLE_BODY_ROW) {
									const tr = document.createElement('tr');									
									rowNode.children.forEach(bodyNode => {									
										const td = document.createElement('td');																										
										td.className = "border border-slate-300 p-2 text-center";
										// FIX: Render inline children (für Links, Bold, etc. im Table-Body)
										this.renderNodes(bodyNode.children, td);																							
										tr.appendChild(td);
									});	
									body.appendChild(tr);
								}
							}	
						});												
						
						
						element = table;
						//this.renderNodes(node.children, element); // Render body rows and cells					
					
					break;
				
				// Badge Block
				case TokenType.BADGE:
					const badge = new BadgeHTML(node.token as any);
					element = badge.renderAsElement();
					//console.log('Rendered Badge:', element);
					this.renderNodes(node.children, element);					
					break;

				// Image Block
				case TokenType.IMAGE:
					element = document.createElement('img');
					const img = new ImageHTML(node.token as any);
					element = img.renderAsElement();
					//console.log('Rendered Image:', element);
					// No children for images, so we don't call renderNodes here					
					break;
				
				// Link Block
				case TokenType.LINK:
					if(node.children && node.children.length > 0) {
						element = document.createElement('div');						
						this.renderNodes(node.children, element);
					}else {

						element = document.createElement('a');
						element.setAttribute('href', node.token.url);
					element.className = "font-mono text-blue-800 hover:text-blue-500 underline";

						// FIX: Render link text from token or children
						if (node.token.name) {
							element.textContent = node.token.name + " ";
						}
					}
					break;	

				// Strong Text
				case TokenType.STRONG:
					
					element = document.createElement('strong');
					element.className = "font-mono font-bold";
					element.textContent = node.token.value + " "; // Ensure it's a string
					this.renderNodes(node.children, element);
					break;
				
				// Underline Text
				case TokenType.UNDER_LINE:
					if(node.children && node.children.length > 0) {
						element = document.createElement('div');
						this.renderNodes(node.children, element);
					} else {
						element = document.createElement('span');
    					element.className = "underline decoration-sky-500 md:decoration-solid decoration-3";						
    					element.textContent = node.token.value + " "; // Ensure it's a string
					}
					break;

				// Unmarkable inline text
				case TokenType.UNMARKABLE:
					if(node.children && node.children.length > 0) {
						element = document.createElement('div');
						this.renderNodes(node.children, element);					
					} else {	
						element = document.createElement('div');
						element.className = "font-mono italic text-md opacity-50";
						
						// FIX: Proper newline handling ohne concatenation
						//console.log(node.token.value);
						//console.log('Rendering Unmarkable Text:', node);
						const lines = node.token.value.split('\n');
						lines.forEach((line: string, idx: number) => {
							if (idx > 0) element.appendChild(document.createElement('br'));
							element.appendChild(document.createTextNode(line));
						});
					}
					
					break;

				// Plain text node - FIX: Direkt als TextNode ohne Wrapper
				case TokenType.TEXT:
					element = document.createTextNode(node.token.value);
					break;

				// Block Paragraph - default type for text without any specific formatting
            	case TokenType.PARAGRAPH:
					if(node.children && node.children.length > 0) {
						element = document.createElement("p");
						element.className = "block leading-7 font-mono mt-4";
						this.renderNodes(node.children, element);
					} else {	
						const ParagraphNode = document.createElement("p")
						ParagraphNode.className = "block leading-7 font-mono mt-4";
						element = ParagraphNode;
					}
                	break;

				// Block Paragraph - default type for text without any specific formatting
            	default:
					if(node.children && node.children.length > 0) {
						element = document.createElement("p");
						element.className = "block leading-7 font-mono mt-4";
						this.renderNodes(node.children, element);
					} else {	
						const ParagraphNode = document.createElement("p")
						ParagraphNode.className = "block leading-7 font-mono mt-4";
						element = ParagraphNode;
					}

            // ... when something new to add
        }

		if (element) {
            container.appendChild(element);
        }
        	// ... and so on for all types


    	});
	}
}