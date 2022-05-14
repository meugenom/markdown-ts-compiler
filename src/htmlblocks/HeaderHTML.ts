'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";

export class HeaderHTML {
  
	private DomUtilites : any;
	private token: Token.headToken;

	constructor(token: Token.headToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

	render():void{

		const HeaderNode = this.DomUtilites.createElement('h'+ this.token.dept)

		HeaderNode.className = `text-${this.token.dept}xl mt-0 mb-2 text-gray-800 pr-10 pt-10`;
		
		HeaderNode.innerHTML = this.token.children[0].value;

		let container : ChildNode; 
		
		if(document.getElementById("app")?.children.length > 0){
			
				container = document.getElementById("app")?.lastElementChild;
			
		}else{
			 
			 container = document.getElementById("app");
		}

		container?.appendChild(HeaderNode);
		
	}
}