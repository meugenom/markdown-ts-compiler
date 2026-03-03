'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";

export class HeaderHTML {

	private DomUtilites: any;
	private token: Token.headToken;
	private htmlOutput: HTMLElement;

	constructor(token: Token.headToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {

		const HeaderNode = this.DomUtilites.createElement('h' + this.token.dept)

		HeaderNode.className = "text-" + this.token.dept + "xl mt-0 mb-1 pr-10 pt-6 no-inherit-font-size";

		if (this.token.children[0]) {

			const headingText: string = this.token.children[0].value;
			// Generate anchor id: lowercase, spaces → dashes, strip non-alphanumeric
			const headingId = headingText.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
			HeaderNode.setAttribute('id', headingId);
			HeaderNode.innerHTML = headingText;

			const app = this.htmlOutput;
			const elemChildren = app?.children

			if (elemChildren) {
				if (elemChildren.length > 0) {
					app?.lastElementChild?.appendChild(HeaderNode);
				} else {
					app.appendChild(HeaderNode);
				}
			}
		}
	}
}