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

			// Outer wrapper — drop shadows (same as code block)
			const OuterNode = this.DomUtilites.createElement("div");
			OuterNode.className = "code-block-outer my-5";

			// Inner wrapper
			const WrapperNode = this.DomUtilites.createElement("div");
			WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10";

			// Header bar
			const HeaderNode = this.DomUtilites.createElement("div");
			HeaderNode.className = "flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
			HeaderNode.innerHTML = `<span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50">Quote</span>`;

			// Body
			const BodyNode = this.DomUtilites.createElement("div");
			BodyNode.className = "px-6 py-4 bg-white dark:bg-gray-900";
			BodyNode.innerHTML = `
				<p class="text-[14px] font-mono leading-7 text-slate-700 dark:text-slate-300 border-l-4 border-amber-400 pl-4">${this.token.quote}</p>
				<cite class="block mt-3 text-[12px] font-mono opacity-50">${this.token.author}</cite>
			`;

			WrapperNode.appendChild(HeaderNode);
			WrapperNode.appendChild(BodyNode);
			OuterNode.appendChild(WrapperNode);

			const app = this.htmlOutput;
			const elemChildren = app?.children;
			if (elemChildren) {
				if (elemChildren.length > 0) {
					app?.lastChild?.appendChild(OuterNode);
				} else {
					app.appendChild(OuterNode);
				}
			}
		}
	}

}