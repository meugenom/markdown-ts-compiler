'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/prism.css"

// import prismjs
import * as Prism from 'prismjs';



export class CodeBlockHTML {
  
	private DomUtilites : any;
	private token: Token.codeBlockToken;
	private htmlOutput: HTMLElement;
	
	constructor(token: Token.codeBlockToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {


	const codeBlock : any = `
			<code class="language-${this.token.language}">
		 		${this.token.code}
			</code>`
		
		const CodeBlockNode = this.DomUtilites.createElement("pre");
		CodeBlockNode.className = `language-${this.token.language}"` ;

		Prism.highlightAll(codeBlock);

		CodeBlockNode.innerHTML = codeBlock;
		
		const app = this.htmlOutput;
		const elemChildren = app?.children;
		if (elemChildren) {
			if(elemChildren.length > 0){
				app?.lastChild?.appendChild(CodeBlockNode);
			}else{
				app.appendChild(CodeBlockNode);
			}
		}
  }
}