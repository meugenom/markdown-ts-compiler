'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/quote.css";


export class QuoteHTML {

	private DomUtilites: any;
	private token: Token.quoteToken;
	private htmlOutput: HTMLElement;

	constructor(token: Token.quoteToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {

		if (this.token.quote && this.token.author) {
			const quoteBlock = `		
		<div>
			<p classname="mb-2"> 
				${this.token.quote}
			</p>
			<cite> ${this.token.author} </cite>
		</div>
	`

			const quoteBlockNode = this.DomUtilites.createElement("blockquote");
			quoteBlockNode.innerHTML = quoteBlock;


			const app = this.htmlOutput;
			const elemChildren = app?.children;
			if (elemChildren) {
				if (elemChildren.length > 0) {
					app?.lastChild?.appendChild(quoteBlockNode);
				} else {
					app.appendChild(quoteBlockNode);
				}
			}
		}
	}

}