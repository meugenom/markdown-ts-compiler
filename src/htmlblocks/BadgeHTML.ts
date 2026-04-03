'use strict'

/**
 * Returns an html element <span> for badge
 * @param line as block of the text
 * @return dom element for badge <span> ...</span>
 */

export class BadgeHTML {

	private token: any;

	constructor(token: any) {
		this.token = token;
	}

	renderAsElement(): HTMLElement {

		const BadgeNode = document.createElement("span")		

		let text = "";
		let colorBadge: string | undefined;

		switch (this.token.color) {
				case "blue":
					colorBadge = '<span class="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">' + this.token.value + '</span>';
					break;
				case "gray":
					colorBadge = '<span class="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">' + this.token.value + '</span>';
					break;
				case "red":
					colorBadge = '<span class="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">' + this.token.value + '</span>';
					break;
				case "green":
					colorBadge = '<span class="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">' + this.token.value + '</span>';
					break;
				case "yellow":
					colorBadge = '<span class="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">' + this.token.value + '</span>';
					break;
				case "purple":
					colorBadge = '<span class="bg-purple-100 text-purple-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">' + this.token.value + '</span>';
					break;
				case "pink":
					colorBadge = '<span class="bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">' + this.token.value + '</span>';
					break;
				case "indigo":
					colorBadge = '<span class="bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">' + this.token.value + '</span>';
					break;
				default:
					colorBadge = '<span class="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">' + this.token.value + '</span>';
		}

		
        if(colorBadge != undefined){
			text = text + " " + colorBadge;
		}

		BadgeNode.innerHTML = text;		
		return BadgeNode;
	}
}