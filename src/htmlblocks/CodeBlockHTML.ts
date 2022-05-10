'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import { IToken } from "../IToken";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/prism.css"

// import prismjs
import * as Prism from 'prismjs';



export class CodeBlockHTML {
  
	private DomUtilites;
	private token: IToken;
	
	constructor(token: IToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {

	const codeBlock : any = `
			<code class="language-${this.token.language}">
		 		${this.token.value}
			</code>`
		
		const CodeBlockNode = this.DomUtilites.createElement("pre");
		CodeBlockNode.className = `language-${this.token.language}"` ;

		Prism.highlightAll(codeBlock);

		CodeBlockNode.innerHTML = codeBlock;

		let container:HTMLElement;
		
		if(document.getElementById("app")?.children.length > 0){
			 container = document.getElementById("app")?.lastChild;
		}else{
			 container = document.getElementById("app");
		}
		
		container?.appendChild(CodeBlockNode);

		
  }

}
