'use strict'

/**
 * Returns an html element <span> for badge
 * @param line as block of the text
 * @return dom element for badge <span> ...</span>
 */

export class ColorTextHTML {

	private token: any;

	constructor(token: any) {
		this.token = token;
	}

	renderAsElement(): HTMLElement {		
		let colorTextNode = document.createElement("a");				
		colorTextNode.className = "underline md:decoration-solid decoration-3"; // Base class for all colors, color will be added based on the token value
		let text = "";
		let colorText: string|undefined;

		switch (this.token.color) {
			case "blue":
				colorTextNode.className += " decoration-blue-500";				
				break;
			case "gray":
				colorTextNode.className += " decoration-gray-500";
				break;
			case "red":
				colorTextNode.className += " decoration-red-500";
				break;
			case "green":
				colorTextNode.className += " decoration-green-500";
				break;
			case "yellow":
				colorTextNode.className += " decoration-yellow-500";
				break;
			case "purple":
				colorTextNode.className += " decoration-purple-500";
				break;
			case "pink":
				colorTextNode.className += " decoration-pink-500";
				break;
			case "indigo":
				colorTextNode.className += " decoration-indigo-500";
				break;
		}
		
		colorTextNode.innerHTML = this.token.value + " "; // Ensure it's a string and add a space after the badge		
		return colorTextNode;
	}
}