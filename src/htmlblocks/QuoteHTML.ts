'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import { IToken } from "../IToken";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/quote.css";


export class QuoteHTML {
  
	private DomUtilites;
	private token: IToken;
	
	constructor(token: IToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {


	const quoteBlock = `		
		<div>
			<p classname="mb-2"> 
				${this.token.quote}
			</p>
			<cite> ${this.token.author} </cite>
		</div>
	`
		
		const quoteBlockNode = this.DomUtilites.createElement("blockquote");
		//quoteBlockNode.className = `p-4 italic border-l-8 bg-neutral-200 text-neutral-600 border-orange-500 quote`;
		quoteBlockNode.innerHTML = quoteBlock;


		let container:HTMLElement;
		if(document.getElementById("app")?.children.length > 0){
			 container = document.getElementById("app")?.lastChild;
		}else{
			 container = document.getElementById("app");
		}
		container?.appendChild(quoteBlockNode);

  }

}
