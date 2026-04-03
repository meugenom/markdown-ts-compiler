'use strict'

/**
 * Returns an html element <span> for badge
 * @param line as block of the text
 * @return dom element for badge <span> ...</span>
 */

export class CodeInlineHTML {

	private token: any;

	constructor(token: any) {
		this.token = token;
	}

	renderAsElement(): HTMLElement {

		const CodeInlineNode = document.createElement("span")		

		let text = "";
        
        text = `
				<code class="inline-block py-1 px-2 bg-gray-300 dark:bg-gray-500 dark:text-slate-200 text-sm font-mono font-medium rounded">
					${this.token.value}
				</code>
				`

		CodeInlineNode.innerHTML = text;		
		return CodeInlineNode;
	}
}