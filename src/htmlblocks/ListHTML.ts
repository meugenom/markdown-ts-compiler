'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as list
 */


import { IToken } from "../IToken";
import { DomUtilites } from "./DomUtilites";

export class ListHTML {
  
	private DomUtilites;
	private token: IToken;
	
	constructor(token: IToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {

	let listBlock : string ;
	let listBlockNode : Element;
	listBlockNode = this.DomUtilites.createElement("ul");

	//console.log(this.token)

	if(this.token.name == "[]"){
		listBlockNode = this.DomUtilites.createElement("div");	
		listBlock = `
			<div class="form-check">
				<input class="form-check-input appearance-none h-4 w-4 border-solid border-gray-200 border-solid border-2 rounded-sm disabled:bg-white disabled:border-blue-600 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" value="" id="flexCheckDisabled" disabled>
					<label class="form-check-label inline-block text-gray-800 opacity-100" for="flexCheckDisabled">
			  		${this.token.value}
					</label>
	  		</div>
		`
	}

	if(this.token.name == "[x]"){
		listBlockNode = this.DomUtilites.createElement("div");	
		listBlock = `
			<div class="form-check">
				<input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled>
					<label class="form-check-label inline-block text-gray-800 opacity-100" for="flexCheckCheckedDisabled">
			  			${this.token.value}
					</label>
	  		</div>
		`
		}

		if(this.token.name == "-"){
			listBlock = `
				<li class="text-sky-700">
					${this.token.value}
				</li>
			`
			listBlockNode.className = `list-disc ml-5`;
		}

		
		listBlockNode.innerHTML = listBlock;

		let container:HTMLElement;
		if(document.getElementById("app")?.children.length > 0){
			 container = document.getElementById("app")?.lastChild;
		}else{
			 container = document.getElementById("app");
		}
		container?.appendChild(listBlockNode);

  }

}
