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
  
	private DomUtilites : any;
	private token: Token.quoteToken;
	
	constructor(token: Token.quoteToken) {
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
		quoteBlockNode.innerHTML = quoteBlock;


		let container:ChildNode;
		if(document.getElementById("app")?.children.length > 0){
			 container = document.getElementById("app")?.lastChild;
		}else{
			 container = document.getElementById("app");
		}
		container?.appendChild(quoteBlockNode);

  }

}