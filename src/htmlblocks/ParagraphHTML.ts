'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import * as katex from 'katex';
import { TokenType } from "../Types";
import { DomUtilites } from "./DomUtilites";

export class ParagraphHTML {

	private DomUtilites : any;
	private token: any;
	private htmlOutput: HTMLElement;

	constructor(token: any, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

	render(): any {

		const ParagraphNode = this.DomUtilites.createElement("p")
		ParagraphNode.className = "block leading-7 font-mono mt-4";

		let text = "";
		
		this.token.children.forEach((child: any) => {
			
			if (child.type == TokenType.TEXT) {
				text = text + " " + child.value
			}

			if (child.type == TokenType.IMAGE) {
				const imgSrc = ('/' + child.url.replace(/^\.?\//, ''));
				text = text + `
				<figure class="flex flex-col items-center my-5">
					<img data-src="${imgSrc}" alt="${child.alt}" class="lazy shadow-md rounded-md max-w-full h-auto w-full sm:w-10/12 border border-gray-200">
					${child.alt ? `<figcaption class="mt-2 text-[12px] font-mono text-slate-400 text-center">${child.alt}</figcaption>` : ''}
				</figure>
				`
			}

			if (child.type == TokenType.LINK) {
				text = text + `<a href="${child.url}" class="text-blue-500">
					${child.name}
					</a>`
			}

			if (child.type == TokenType.STRONG) {
				text = text + " " + `
				<strong>${child.value}</strong>
				`
			}

			if (child.type == TokenType.CODE_INLINE) {
				text = text + " " + `
				<code class="inline-block py-1 px-2 bg-blue-200 dark:bg-blue-800 text-sm font-mono font-medium rounded">
					${child.value.substring(1, child.value.length - 1)}
				</code>
				`
			}

			if (child.type === TokenType.FORMULA_INLINE) {
				try {
					text = text + ' ' + katex.renderToString(child.formula, {
						displayMode: false,
						throwOnError: false
					});
				} catch (e) {
					text = text + ' $' + child.formula + '$';
				}
			}

			if (child.type == TokenType.COLOR) {

				let colorText: string|undefined;

				if(child.color == "blue"){
					colorText = '<a class="underline decoration-blue-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "gray"){
					colorText = '<a class="underline decoration-gray-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "red"){
					colorText = '<a class="underline decoration-red-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "green"){
					colorText = '<a class="underline decoration-green-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "yellow"){
					colorText = '<a class="underline decoration-yellow-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "purple"){
					colorText = '<a class="underline decoration-purple-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "pink"){
					colorText = '<a class="underline decoration-pink-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.color == "indigo"){
					colorText = '<a class="underline decoration-indigo-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}
				if(colorText){
					text = text + " " + colorText;
				}
				
			}


			if (child.type == "Badge") {

				let colorBadge: string | undefined;

				if(child.color == "blue"){
					colorBadge = '<span class="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">' + child.value + '</span>'
				}else if(child.color == "gray"){
					colorBadge = '<span class="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">' + child.value+ '</span>'
				}else if(child.color == "red"){
					colorBadge = '<span class="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">' + child.value + '</span>'
				}else if(child.color == "green"){
					colorBadge = '<span class="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">' + child.value + '</span>'
				}else if(child.color == "yellow"){
					colorBadge = '<span class="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">' + child.value + '</span>'
				}else if(child.color == "purple"){
					colorBadge = '<span class="bg-purple-100 text-purple-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">' + child.value + '</span>'
				}else if(child.color == "pink"){
					colorBadge = '<span class="bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">'+ child.value + '</span>'
				}else if(child.color == "indigo"){
					colorBadge = '<span class="bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">' + child.value + '</span>'
				}
				if(colorBadge != undefined){
					text = text + " " + colorBadge;
				}
			}

			if (child.type == TokenType.UNDER_LINE) {
				text = text + " " + `
				<span class="underline decoration-sky-500">
					${child.value}
				</span>
				`
			}

			if (child.type == TokenType.UNMARKABLE) {
												
				const unmarkable = child.value;
				const unmarkableText = unmarkable.substring(1, unmarkable.length - 1);								

				text = text + " " + `				
				<div class="italic text-sm">
					${unmarkableText.replace(/\n/g, '<br/>')}
				</div>
				`				

			}
		})

		ParagraphNode.innerHTML = text;

		//let container : any;
		const app = this.htmlOutput;		
		if(app?.children.length != 0){
			 app?.lastChild?.appendChild(ParagraphNode);
		}else{
			 app.appendChild(ParagraphNode);
		}

		return this.htmlOutput;
	}
}