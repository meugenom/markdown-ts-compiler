'use strict'
import { IToken } from '../IToken';
import {DomUtilites} from './DomUtilites'

/**
 * Returns an html block for head of chapter
 * @param line as block of the text
 * @return dom element for info about article
 */

export class CaptionHTML {

	private DomUtilites;
	private token: IToken;

	constructor(token: IToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

	render():void{

		let tagsBlock  = "";
		this.token.children[0].tags.toString().split(" ").map( (tag: string) => {			
			if(tag.length >0){
				tagsBlock = tagsBlock + 
				'<a href="#/tags/' + tag + '" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400  hover:bg-orange-500 uppercase last:mr-0 mr-1">'+
					tag + 
				"</a>" 
			}
		});

		let categoriesBlock  = "";
			if(this.token.children[0].categories.length > 0){
			categoriesBlock  = 
			'<a class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-400  hover:bg-gray-500 uppercase last:mr-0 mr-1">'+
				this.token.children[0].categories +
			"</a>" 
			}

		const CaptionBlock =
			`	<div>
				  <img src= ${this.token.children[0].thumbnail} class="float-left p-8"/>
                        <h3 class="text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600">
							${this.token.children[0].title.slice(2, this.token.children[0].title.length-1)}</h3>
						<time class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
                            ${this.token.children[0].date}
                        </time> 
                        <div class="tag-container py-1">
							${tagsBlock}
						</div>
						<div class="categories-container py-1">
							${categoriesBlock}
						</div>
						<br/>
					</div>`;

		const captionNode = this.DomUtilites.createElement('p')
		captionNode.innerHTML = CaptionBlock;

		const container = document.getElementById("app");
		container?.appendChild(captionNode);
	}
}