'use strict'

/**
 * Returns an HTML string for a badge
 * @param token block
 * @return HTML string for the badge
 */

interface BadgeToken {
    color: string;
    value: string;
}

export class BadgeHTML {

	private token: BadgeToken;

	constructor(token: BadgeToken) {
		this.token = token;
	}

	render(): string {

		const color = this.token.color || 'gray'; // by default is gray

		// Return the HTML string for the badge
		return `<span class="md-badge md-badge-${color}">${this.token.value}</span>`;
    }
}	