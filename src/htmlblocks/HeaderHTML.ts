'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import * as Token from "../Token";
import { TokenType } from "../Types";

export class HeaderHTML {

	private token: Token.headToken;
	private dept: number;

	constructor(token: Token.headToken) {
		this.token = token;
		this.dept = 0;
	}

	public getDept(token: Token.headToken): number {
		
		switch (token.type) {
			case TokenType.HEADING_FIRST:
				this.dept = 1;
				break;
			case TokenType.HEADING_SECOND:
				this.dept = 2;
				break;
			case TokenType.HEADING_THIRD:
				this.dept = 3;
				break;
			case TokenType.HEADING_FOURTH:
				this.dept = 4;
				break;
			case TokenType.HEADING_FIFTH:
				this.dept = 5;
				break;
			default:
				this.dept = 6; // Default to h6 if type is unrecognized
		}

		return this.dept;
	}

	public getSizeClass(dept: number): string {
		const sizeMap: string[] = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
		return sizeMap[(dept - 1)] ?? 'text-base';
	}

	public renderAsElement(): HTMLElement {

		// Need to know what the dept is to determine the heading level (h1, h2, etc.)
		const dept = this.getDept(this.token);

		const HeaderNode = document.createElement('h' + dept)

		// h1→h6: one step smaller than browser defaults for compact article layout
		const sizeMap: string[] = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
		const sizeClass = this.getSizeClass(dept);
		HeaderNode.className = `${sizeClass} font-mono font-bold mt-0 mb-3 pr-10 pt-6`;

		

		const headingText: string = this.token.value || this.token.value || '';
		
		// Generate anchor id: lowercase, spaces → dashes, strip non-alphanumeric
		const headingId = headingText.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		HeaderNode.setAttribute('id', headingId);
		HeaderNode.innerHTML = headingText;

		return HeaderNode;
	}
}