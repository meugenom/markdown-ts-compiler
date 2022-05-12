'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import { IToken } from "../IToken";
import { DomUtilites } from "./DomUtilites";

export class ParagraphHTML {

	private DomUtilites;
	private token: IToken;

	constructor(token: IToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {

		const ParagraphNode = this.DomUtilites.createElement("p")
		ParagraphNode.className = "block leading-7 font-mono";

		let text = "";
		this.token.children.forEach((child: { type: string; value: string; alt: string, url: string }) => {
			if (child.type == "Text") {
				text = text + " " + child.value
			}

			if (child.type == "Image") {
				text = text + `
				<div class="flex flex-wrap justify-center">
					<div class="w-6/12 sm:w-4/12 px-4 pb-20">
						<img src="${child.url}" alt="${child.alt}" class="shadow rounded max-w-full h-auto allign-middle border-none">
					</div>
				</div>
				`
			}

			if (child.type == "Link") {
				text = text + `<a href="${child.url}" class="text-blue-500">
					${child.alt}
					<a/>`
			}

			if (child.type == "Strong") {
				text = text + " " + `
				<strong>${child.value}</strong>
				`
			}

			if (child.type == "InlineCode") {
				text = text + " " + `
				<code class="inline-block py-1 px-2 bg-gray-300 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400">
					${child.value}
				</code>
				`
			}

			if (child.type == "Color") {

				let colorText: string;

				if(child.name == "blue"){
					colorText = '<a class="underline decoration-blue-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "gray"){
					colorText = '<a class="underline decoration-gray-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "red"){
					colorText = '<a class="underline decoration-red-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "green"){
					colorText = '<a class="underline decoration-green-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "yellow"){
					colorText = '<a class="underline decoration-yellow-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "purple"){
					colorText = '<a class="underline decoration-purple-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "pink"){
					colorText = '<a class="underline decoration-pink-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}else if(child.name == "indigo"){
					colorText = '<a class="underline decoration-indigo-500 md:decoration-solid decoration-4">' + child.value + '</a>'
				}
				
				text = text + " " + colorText;
			}

			if (child.type == "UnderDash") {
				text = text + " " + `
				<span class="underline decoration-sky-500 text-slate-500">
					${child.value}
				</span>
				`
			}

			if (child.type == "Unmarkable") {
				//JSON.stringify(String(str)) for unmarkable text usage
				text = text + " " + `
				<span class="text-orange-900">${JSON.stringify(String(child.value))}</span>
				`
			}
		})

		ParagraphNode.innerHTML = text;

		let container:HTMLElement;
		if(document.getElementById("app")?.children.length != 0){

			 container = document.getElementById("app")?.lastChild;

		}else{
			 container = document.getElementById("app");
		}
		
		container?.appendChild(ParagraphNode);
	}
}
